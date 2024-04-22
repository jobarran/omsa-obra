/*
  Warnings:

  - Added the required column `installed` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `received` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "installed" TEXT NOT NULL,
ADD COLUMN     "received" TEXT NOT NULL;
