import { $Enums, Orders as PrismaOrder } from "@lumoflo/db";

export class Order implements PrismaOrder {
  id: string;
  order_id: string;
  status: $Enums.Status;
  store_id: string;
  prebook: boolean;
  created_at: Date;
  updated_at: Date;
  customer_id: string;
  length: number;
  breadth: number;
  height: number;
  weight: number;
  awb: string;
  remarks: string;
  courier: $Enums.COURIER;
  shipping_cost: number;
  pickup_id: string;
}
