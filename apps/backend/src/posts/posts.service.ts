import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  getSlides(id: string) {
    return this.prisma.posts.findUnique({
      where: {
        id,
      },
      include: {
        slides: {
          select: {
            id: true,
            slide_image_url: true,
          },
        },
      },
    });
  }
}
