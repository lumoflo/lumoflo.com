/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stores_username_key" ON "Stores"("username");
