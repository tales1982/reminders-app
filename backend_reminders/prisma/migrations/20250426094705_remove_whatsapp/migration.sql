/*
  Warnings:

  - You are about to drop the column `notifyWhats` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "notifyWhats";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "whatsapp";
