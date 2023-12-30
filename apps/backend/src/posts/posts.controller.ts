import { Controller, Param } from "@nestjs/common";
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from "@ts-rest/nest";

import { OrdersApi } from "@lumoflo/api";

import { PostsService } from "./posts.service";

const c = nestControllerContract(OrdersApi);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class PostsController implements NestControllerInterface<typeof c> {
  constructor(private readonly postsService: PostsService) {}

  @TsRest(c.createOrder)
  async createOrder(@Param("id") id: string) {
    const slides = await this.postsService.getSlides(id);
    return { status: 201 as const, body: slides };
  }
}
