/*
  Warnings:

  - You are about to drop the column `schedule_id` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `place_id` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_schedule_id_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "schedule_id",
ADD COLUMN     "place_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
