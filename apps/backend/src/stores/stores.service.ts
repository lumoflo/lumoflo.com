import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(param: {
    where?: Prisma.StoresWhereInput;
    select?: Prisma.StoresSelect;
  }) {
    return this.prisma.stores.findMany({
      where: param.where,
      select: param.select,
    });
  }
  getAllDomains() {
    return this.prisma.stores.findMany({
      select: {
        subdomain: true,
        customDomain: true,
      },
    });
  }

  getADomain(param: { where: Prisma.StoresFindUniqueArgs["where"] }) {
    return this.prisma.stores.findUnique({
      where: param.where,
    });
  }
}
