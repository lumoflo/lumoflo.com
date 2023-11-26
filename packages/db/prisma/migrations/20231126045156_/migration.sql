/*
  Warnings:

  - A unique constraint covering the columns `[auth_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "auth_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_auth_id_key" ON "Users"("auth_id");
