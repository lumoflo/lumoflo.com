import { Controller, Get, Param, Query } from "@nestjs/common";

import { AppService } from "./app.service";
import { SlideService } from "./slide.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly slideService: SlideService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/slides")
  async getSlidesByPostLink(@Query("post_link") postLink: string) {
    console.log(postLink);
    return this.slideService.slides({
      where: {
        post_link: postLink,
      },
    });
  }
}
