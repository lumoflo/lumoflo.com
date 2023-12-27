import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "./prisma.service";

@Injectable()
export class SlideService {
  constructor(private prisma: PrismaService) {}

  async slides(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SlidesWhereUniqueInput;
    where?: Prisma.SlidesWhereInput;
    orderBy?: Prisma.SlidesOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.slides.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
