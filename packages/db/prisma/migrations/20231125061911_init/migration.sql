-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'SHIPPED', 'PACKED', 'DELIVERED', 'CANCELLED', 'MANIFESTED', 'OUT_FOR_DELIVERY', 'HOLD', 'RTO');

-- CreateEnum
CREATE TYPE "COURIER" AS ENUM ('DEFAULT', 'DELHIVERY', 'OTHER');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,
    "instagram_token" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "post_link" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "post_created_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "store_id" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slides" (
    "id" TEXT NOT NULL,
    "parent_post_id" TEXT NOT NULL,
    "post_link" TEXT NOT NULL,
    "order_id" TEXT,
    "post_id" TEXT,

    CONSTRAINT "Slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "store_id" TEXT,
    "prebook" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT,
    "length" DOUBLE PRECISION DEFAULT 0.0,
    "breadth" DOUBLE PRECISION DEFAULT 0.0,
    "height" DOUBLE PRECISION DEFAULT 0.0,
    "weight" DOUBLE PRECISION DEFAULT 0.0,
    "awb" TEXT,
    "remarks" TEXT,
    "courier" "COURIER" NOT NULL DEFAULT 'DEFAULT',
    "shipping_cost" DOUBLE PRECISION DEFAULT 0.0,
    "pickup_id" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "landmark" TEXT,
    "locality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "instagram_username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pickups" (
    "id" TEXT NOT NULL,
    "pickup_id" INTEGER NOT NULL,
    "pickup_location" TEXT NOT NULL,
    "pickup_date" TEXT NOT NULL,

    CONSTRAINT "Pickups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users"("id");

-- CreateIndex
CREATE INDEX "Stores_id_idx" ON "Stores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_post_link_key" ON "Posts"("post_link");

-- CreateIndex
CREATE INDEX "Posts_id_post_link_idx" ON "Posts"("id", "post_link");

-- CreateIndex
CREATE UNIQUE INDEX "Slides_parent_post_id_key" ON "Slides"("parent_post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Slides_post_link_key" ON "Slides"("post_link");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_order_id_key" ON "Orders"("order_id");

-- CreateIndex
CREATE INDEX "Orders_customer_id_id_idx" ON "Orders"("customer_id", "id");

-- CreateIndex
CREATE INDEX "Customers_id_idx" ON "Customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pickups_pickup_id_key" ON "Pickups"("pickup_id");

-- CreateIndex
CREATE INDEX "Pickups_id_pickup_date_idx" ON "Pickups"("id", "pickup_date");

-- AddForeignKey
ALTER TABLE "Stores" ADD CONSTRAINT "Stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slides" ADD CONSTRAINT "Slides_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slides" ADD CONSTRAINT "Slides_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_pickup_id_fkey" FOREIGN KEY ("pickup_id") REFERENCES "Pickups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
