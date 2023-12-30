import {
  ClerkExpressWithAuth as ClerkMiddleware,
  WithAuthProp,
} from "@clerk/clerk-sdk-node";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  UnauthorizedException,
} from "@nestjs/common";
import { NextFunction } from "express";
import { LoggerModule } from "nestjs-pino";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { OrdersModule } from "src/orders/orders.module";
import { PrismaService } from "src/prisma/prisma.service";

import { OrdersController } from "./orders/orders.controller";
import { OrdersService } from "./orders/orders.service";
import { PostsModule } from "./posts/posts.module";
import { StoresModule } from "./stores/stores.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    OrdersModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            singleLine: true,
          },
        },
        autoLogging: false,
      },
    }),
    StoresModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService, PrismaService, OrdersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ClerkMiddleware({}),
        (
          req: WithAuthProp<Request> & { user_id: string },
          _,
          next: NextFunction,
        ) => {
          if (!req.auth) {
            throw new UnauthorizedException();
          }
          const user_id = req.auth.userId;
          req.user_id = user_id;
          next();
        },
      )
      .forRoutes(OrdersController);
  }
}

// @lumoflo/backend:dev: {
//   @lumoflo/backend:dev:   actor: undefined,
//   @lumoflo/backend:dev:   sessionClaims: {
//   @lumoflo/backend:dev:     azp: 'http://app.localhost:3000',
//   @lumoflo/backend:dev:     exp: 1703705530,
//   @lumoflo/backend:dev:     iat: 1703705470,
//   @lumoflo/backend:dev:     iss: 'https://elegant-gibbon-19.clerk.accounts.dev',
//   @lumoflo/backend:dev:     nbf: 1703705460,
//   @lumoflo/backend:dev:     sid: 'sess_2a8Uz5BolF6mkcOTWqaNFic5yOU',
//   @lumoflo/backend:dev:     sub: 'user_2Z59Lgf9BslzhzEw7CKeWJIbi9Q'
//   @lumoflo/backend:dev:   },
//   @lumoflo/backend:dev:   sessionId: 'sess_2a8Uz5BolF6mkcOTWqaNFic5yOU',
//   @lumoflo/backend:dev:   session: undefined,
//   @lumoflo/backend:dev:   userId: 'user_2Z59Lgf9BslzhzEw7CKeWJIbi9Q',
//   @lumoflo/backend:dev:   user: undefined,
//   @lumoflo/backend:dev:   orgId: undefined,
//   @lumoflo/backend:dev:   orgRole: undefined,
//   @lumoflo/backend:dev:   orgSlug: undefined,
//   @lumoflo/backend:dev:   orgPermissions: undefined,
//   @lumoflo/backend:dev:   organization: undefined,
//   @lumoflo/backend:dev:   getToken: [AsyncFunction (anonymous)],
//   @lumoflo/backend:dev:   has: [Function (anonymous)],
//   @lumoflo/backend:dev:   debug: [Function (anonymous)],
//   @lumoflo/backend:dev:   claims: {
//   @lumoflo/backend:dev:     azp: 'http://app.localhost:3000',
//   @lumoflo/backend:dev:     exp: 1703705530,
//   @lumoflo/backend:dev:     iat: 1703705470,
//   @lumoflo/backend:dev:     iss: 'https://elegant-gibbon-19.clerk.accounts.dev',
//   @lumoflo/backend:dev:     nbf: 1703705460,
//   @lumoflo/backend:dev:     sid: 'sess_2a8Uz5BolF6mkcOTWqaNFic5yOU',
//   @lumoflo/backend:dev:     sub: 'user_2Z59Lgf9BslzhzEw7CKeWJIbi9Q'
//   @lumoflo/backend:dev:
