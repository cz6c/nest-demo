import { Injectable } from '@nestjs/common';
import * as qiniu from 'qiniu';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private mac: qiniu.auth.digest.Mac;
  private config: qiniu.conf.Config;
  private bucketManager: qiniu.rs.BucketManager;

  constructor(private readonly configService: ConfigService) {
    this.mac = new qiniu.auth.digest.Mac(
      this.configService.get('QINIU_ACCESS_KEY'),
      this.configService.get('QINIU_SECRET_KEY'),
    );
    this.config = new qiniu.conf.Config();
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
  }

  async uploadFile(localFilePath: string, key: string): Promise<string> {
    // get token
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: `${this.configService.get('QINIU_BUCKET_NAME')}:${key}`,
    });
    const uploadToken = putPolicy.uploadToken(this.mac);
    // uoload
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((resolve, reject) => {
      formUploader.putFile(
        uploadToken,
        key,
        localFilePath,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          }
          if (respInfo.statusCode === 200) {
            const url = this.pathToPrivateDownloadUrl(respBody.key);
            resolve(url);
          } else {
            reject(respInfo);
          }
        },
      );
    });
  }

  // 文件的存储路径==>私有临时授权访问链接
  pathToPrivateDownloadUrl(path: string) {
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1小时过期
    const privateDownloadUrl = this.bucketManager.privateDownloadUrl(
      this.configService.get('QINIU_HOST'),
      path,
      deadline,
    );
    return privateDownloadUrl;
  }

  // 私有临时授权访问链接==>文件的存储路径
  privateDownloadUrlToPath(url: string) {
    const str = url.replace(this.configService.get('QINIU_HOST'), '');
    return str.split('?')[1];
  }
}
