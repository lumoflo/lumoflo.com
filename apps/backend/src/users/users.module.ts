import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoresService } from 'src/stores/stores.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, StoresService],
})
export class UsersModule {}
