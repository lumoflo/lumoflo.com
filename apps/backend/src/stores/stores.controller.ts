import { Controller, NotAcceptableException, Query, Req } from "@nestjs/common";
import {
  NestControllerInterface,
  TsRest,
  nestControllerContract,
} from "@ts-rest/nest";
import { StoresApi } from "src/ts-rest/stores";

import { StoresService } from "./stores.service";

const c = nestControllerContract(StoresApi);

@Controller("stores")
export class StoresController implements NestControllerInterface<typeof c> {
  constructor(private readonly storesService: StoresService) {}
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
        ? { subdomain: subdomain}
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
