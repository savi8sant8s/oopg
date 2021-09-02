/*
  Warnings:

  - You are about to drop the column `contratadoCpfCcnpj` on the `Obra` table. All the data in the column will be lost.
  - Added the required column `contratadoCpfCnpj` to the `Obra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Obra" DROP COLUMN "contratadoCpfCcnpj",
ADD COLUMN     "contratadoCpfCnpj" TEXT NOT NULL;
