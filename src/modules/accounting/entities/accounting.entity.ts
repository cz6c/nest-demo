import { Entity, Column } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';

@Entity('accounting')
export class AccountingEntity extends CommonEntity {
  /** 记账类型 */
  @Column({ default: '' })
  type: string;

  /** 记账名称 */
  @Column({ default: '' })
  title: string;

  /** 记账备注 */
  @Column({ default: '' })
  remark: string;

  /** 金额 */
  @Column({ type: 'float', precision: 2, default: 0 })
  price: number;

  // @ManyToOne(() => FollowEntity, (entity) => entity.memorialDays)
  // follow: FollowEntity;
}
