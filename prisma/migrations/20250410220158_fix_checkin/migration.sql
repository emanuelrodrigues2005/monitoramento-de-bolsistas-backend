/*
  Warnings:

  - You are about to drop the column `date` on the `Checkin` table. All the data in the column will be lost.
  - Added the required column `dateCheckin` to the `Checkin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `howLong` to the `Checkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkin" DROP COLUMN "date",
ADD COLUMN     "dateCheckin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "howLong" DOUBLE PRECISION NOT NULL;
