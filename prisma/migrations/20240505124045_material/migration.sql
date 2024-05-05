/*
  Warnings:

  - You are about to drop the column `floor` on the `Material` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[possition]` on the table `Material` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "floor";

-- CreateIndex
CREATE UNIQUE INDEX "Material_possition_key" ON "Material"("possition");
