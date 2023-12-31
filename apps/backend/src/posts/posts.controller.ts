import { Controller, Param } from "@nestjs/common";
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from "@ts-rest/nest";

import { PostsApi } from "../ts-rest/posts";
import { PostsService } from "./posts.service";

const c = nestControllerContract(PostsApi);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class PostsController implements NestControllerInterface<typeof c> {
  constructor(private readonly postsService: PostsService) {}

  @TsRest(c.getSlides)
  async getSlides(@Param("id") id: string) {
    const slides = await this.postsService.getSlides(id);
    return { status: 201 as const, body: slides?.slides ?? [] };
  }
}
