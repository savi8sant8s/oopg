/*
  Warnings:

  - You are about to drop the column `categoria` on the `Obra` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Obra" DROP COLUMN "categoria";

-- DropEnum
DROP TYPE "Categoria";
