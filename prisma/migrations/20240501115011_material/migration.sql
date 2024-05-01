/*
  Warnings:

  - You are about to drop the column `description` on the `Material` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "MaterialStatus" ADD VALUE 'fabrica';

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "description",
ADD COLUMN     "tracking" TEXT;
