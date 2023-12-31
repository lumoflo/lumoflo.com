import { WithAuthProp } from "@clerk/clerk-sdk-node";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from "@nestjs/common";

import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { StoresService } from "./stores.service";

@Controller("stores")
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll(@Req() request: WithAuthProp<Request>) {
    const user_id = request.auth?.userId;
    if (!user_id) {
      throw new UnauthorizedException("No user_id");
    }
    return this.storesService.findAll(user_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.storesService.remove(+id);
  }
}