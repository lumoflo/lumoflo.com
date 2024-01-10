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
//implements NestControllerInterface<typeof c>
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly storesService: StoresService,
  ) {}
}
