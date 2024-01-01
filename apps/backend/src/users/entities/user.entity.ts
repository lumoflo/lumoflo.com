import { User as PrismaUser } from "@prisma/client";

export class User implements PrismaUser {
  id: string;
  name: string;
  username: string;
  gh_username: string;
  email: string;
  emailVerified: Date;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
