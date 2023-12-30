import { Controller } from "@nestjs/common";
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from "@ts-rest/nest";

import { OrdersApi } from "@lumoflo/api";

import { OrdersService } from "./orders.service";

const c = nestControllerContract(OrdersApi);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class OrdersController implements NestControllerInterface<typeof c> {
  constructor(private readonly ordersService: OrdersService) {}

  @TsRest(c.createOrder)
  async createOrder(@TsRestRequest() { body }: RequestShapes["createOrder"]) {
    const order = await this.ordersService.create({
      slides: body.slides,
      prices: body.prices,
    });

    return { status: 201 as const, body: order };
  }
}
