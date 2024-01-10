import {
  Body,
  Controller,
  NotAcceptableException,
  Query,
  Req,
} from "@nestjs/common";
import {
  NestControllerInterface,
  TsRest,
  nestControllerContract,
} from "@ts-rest/nest";
import { StoresApi } from "src/ts-rest/stores";

import { StoresService } from "./stores.service";

const c = nestControllerContract(StoresApi);

@Controller()
export class StoresController implements NestControllerInterface<typeof c> {
  constructor(private readonly storesService: StoresService) {}

  @TsRest(c.addStore)
  async addStore(
    @Req() req: Request & { user_id: string },
    @Body()
    c: {
      name: string;
      instagram_token: string;
      username: string;
    },
  ) {
    const domain = this.storesService.generateSubdomain({ name: c.name });
    const storeMetaData = await this.storesService.create({
      data: {
        name: c.name,
        subdomain: domain,
        customDomain: domain,
        username: c.username,
        instagram_token: c.instagram_token,
        user_id: req.user_id,
      },
    });
    return { status: 201 as const, body: storeMetaData };
  }

  @TsRest(c.getStores)
  async getStores(@Req() req: Request & { user_id: string }) {
    const storesMetaData = await this.storesService.findAll({
      where: { user_id: req.user_id },
      select: {
        id: true,
        name: true,
        subdomain: true,
        customDomain: true,
        created_at: true,
      },
    });
    return { status: 201 as const, body: storesMetaData };
  }

  @TsRest(c.getADomain)
  async getADomain(
    @Req() req: Request & { user_id: string },
    @Query("subdomain") subdomain: string,
    @Query("customDomain") customDomain: string,
  ) {
    if (!subdomain && !customDomain) {
      throw new NotAcceptableException();
    }
    const storesMetaData = await this.storesService.getADomain({
      where: subdomain
        ? { subdomain: subdomain }
        : { customDomain: customDomain },
    });

    if (storesMetaData) {
      const { instagram_token: _, ...storeDataWithoutTokem } = storesMetaData;
      return { status: 201 as const, body: storeDataWithoutTokem };
    }
    return { status: 201 as const, body: null };
  }

  @TsRest(c.getDomains)
  async getDomains() {
    const domains = await this.storesService.getAllDomains();
    return { status: 201 as const, body: domains };
  }
}
