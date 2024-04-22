/*
  Warnings:

  - Made the column `installed` on table `Material` required. This step will fail if there are existing NULL values in that column.
  - Made the column `received` on table `Material` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "installed" SET NOT NULL,
ALTER COLUMN "received" SET NOT NULL;
