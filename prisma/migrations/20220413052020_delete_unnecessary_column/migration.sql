/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `places` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "places_attachmentId_key";

-- AlterTable
ALTER TABLE "places" DROP COLUMN "attachmentId";
