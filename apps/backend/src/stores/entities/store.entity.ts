import { Stores } from "@prisma/client";

export class Store implements Stores {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  instagram_token: string;
  username: string;
  subdomain: string;
  customDomain: string;
}
