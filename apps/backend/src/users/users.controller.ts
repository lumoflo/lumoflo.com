import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from "@ts-rest/nest";
import { StoresService } from "src/stores/stores.service";
import { UsersApi } from "src/ts-rest/users";

import { UsersService } from "./users.service";

const c = nestControllerContract(UsersApi);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class UsersController implements NestControllerInterface<typeof c> {
  constructor(
    private readonly usersService: UsersService,
    private readonly storesService: StoresService,
  ) {}

  @TsRest(c.getStores)
  async getStores(@Param("id") id: string) {
    const stores = await this.storesService.findAll({
      where: {
        user_id: id,
      },
    });
    return { status: 201 as const, body: stores };
  }

  @TsRest(c.getStores)
  async getDomainSubDomains(@Param("id") id: string) {
    const stores = await this.storesService.findAll({
      where: {
        user_id: id,
        
      },
    });
    return { status: 201 as const, body: stores };
  }
  
}
