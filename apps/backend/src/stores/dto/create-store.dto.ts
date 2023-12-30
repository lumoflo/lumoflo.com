import { Prisma } from "@prisma/client";

export class CreateStoreDto implements Prisma.StoresCreateInput {
    id?: string;
    name: string;
    created_at?: string | Date;
    updated_at?: string | Date;
    instagram_token: string;
    username: string;
    subdomain?: string;
    customDomain?: string;
    user?: Prisma.UserCreateNestedOneWithoutStoresInput;
    posts?: Prisma.PostsCreateNestedManyWithoutStoreInput;
    orders?: Prisma.OrdersCreateNestedManyWithoutStoreInput;
}
