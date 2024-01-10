import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  generateSubdomain(param: { name: string }) {
    return param.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
  }

  create(param: { data: Prisma.StoresCreateArgs["data"] }) {
    return this.prisma.stores.create({
      data: param.data,
    });
  }

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
