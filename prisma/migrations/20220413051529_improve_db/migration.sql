/*
  Warnings:

  - You are about to drop the column `schedule_id` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `place_id` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_schedule_id_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "schedule_id",
ADD COLUMN     "place_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
