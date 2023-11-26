/*
  Warnings:

  - You are about to drop the column `auth_id` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_auth_id_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "auth_id";
