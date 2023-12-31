import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}
  create(createStoreDto: CreateStoreDto) {
    return "This action adds a new store";
  }

  findAll(user_id: string) {
    return this.prisma.stores.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
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
