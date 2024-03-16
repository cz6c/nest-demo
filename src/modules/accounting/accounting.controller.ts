import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccountingService } from './accounting.service';
import {
  UpdateAccountingDto,
  AccountingVO,
  AccountingListVO,
  AccountingListParamsDto,
  CreateAccountingBeforeDto,
} from './dto/index.dto';
import { IdDto } from '@/common/common.dto';
import { GetUser } from '@/decorator/getUser.decorator';
import { Public } from '@/decorator/public-auth.decorator';

@ApiTags('记账管理')
@ApiBearerAuth()
@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Public()
  @ApiOperation({ summary: '创建' })
  @Post('create')
  create(@Body() data: CreateAccountingBeforeDto) {
    return this.accountingService.createBefore(data);
  }

  @ApiOperation({ summary: '列表' })
  @ApiOkResponse({ type: AccountingListVO })
  @Get('list')
  async findAll(
    @Query() params: AccountingListParamsDto,
    @GetUser('followId') followId: number,
  ) {
    return await this.accountingService.findAll(params, followId);
  }

  @ApiOperation({ summary: '详情' })
  @ApiOkResponse({ type: AccountingVO })
  @Get('info')
  async findOne(@Query() params: IdDto) {
    return await this.accountingService.findOne(params.id);
  }

  @ApiOperation({ summary: '更新' })
  @Post('update')
  async update(@Body() data: UpdateAccountingDto) {
    return await this.accountingService.update(data);
  }

  @ApiOperation({ summary: '删除' })
  @Post('delete')
  async remove(@Body() data: IdDto) {
    return await this.accountingService.remove(data.id);
  }
}
