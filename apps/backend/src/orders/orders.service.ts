import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(params: { slides: string[]; prices: string[] }) {
    return this.prisma.$transaction(async (prisma) => {
      // Update slides
      await Promise.all(
        params.slides.map(async (slide, index) => {
          await prisma.slides.updateMany({
            where: {
              id: slide,
            },
            data: {
              price: parseFloat(params.prices[index]),
            },
          });
        }),
      );

      // Create order
      const order = prisma.orders.create({
        data: {
          slides: {
            connect: params.slides.map((id) => ({ id })),
          },
        },
      });
      return order;
    });
  }
}
