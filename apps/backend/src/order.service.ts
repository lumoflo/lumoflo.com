import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "./prisma.service";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(order: Prisma.OrdersCreateInput) {
    return this.prisma.orders.create({
      data: order,
    });
  }
  async 
}
