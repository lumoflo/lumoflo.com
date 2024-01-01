import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  getSlides(id: string) {
    return this.prisma.posts.findUnique({
      where: {
        post_link: id,
      },
      select: {
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
