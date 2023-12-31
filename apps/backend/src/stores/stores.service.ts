import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}
  create(createStoreDto: CreateStoreDto) {
    return "This action adds a new store";
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

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
