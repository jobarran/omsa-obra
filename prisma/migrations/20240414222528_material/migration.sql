-- CreateEnum
CREATE TYPE "MaterialStatus" AS ENUM ('recibido', 'instalado');

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "status" "MaterialStatus" NOT NULL DEFAULT 'recibido';
