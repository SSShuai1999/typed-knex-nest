import { Column, Table } from '@wwwouter/typed-knex';
import { BizStatus, RecentOprType } from '../../constants/enum';

@Table('bom')
export class Bom {
  @Column({ primary: true })
  public id!: number;

  @Column()
  public biz_status!: BizStatus;

  @Column()
  public cde_whse_port!: string;

  @Column()
  public date_created!: Date;

  @Column()
  public date_updated!: Date;

  @Column()
  public des_whse_port!: string;

  @Column()
  public goods_contact_person_cust!: string;

  @Column()
  public goods_contact_person_phone_cust!: string;

  @Column()
  public goods_id_cust!: string;

  @Column()
  public goods_name_cust!: string;

  @Column()
  public id_load!: string;

  @Column()
  public id_matl!: string;

  @Column()
  public name_created!: string;

  @Column()
  public name_line!: string;

  @Column()
  public name_updated!: string;

  @Column({ name: 'order_production' })
  public order_production_id!: number;

  @Column({ name: 'plan_deliver' })
  public plan_deliver_id!: number;

  @Column({ name: 'plan_vehicle' })
  public plan_vehicle_id!: number;

  @Column()
  public receive_date!: Date;

  @Column()
  public receive_truck_no!: string;

  @Column()
  public recent_opr_type!: RecentOprType;

  @Column()
  public user_created!: string;

  @Column()
  public user_updated!: string;

  @Column()
  public wo_code!: string;
}
