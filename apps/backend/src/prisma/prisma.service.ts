import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClientSingleton } from "@lumoflo/db";

@Injectable()
export class PrismaService extends PrismaClientSingleton implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
