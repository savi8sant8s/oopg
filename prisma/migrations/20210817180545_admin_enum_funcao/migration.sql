/*
  Warnings:

  - Added the required column `funcao` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Funcao" AS ENUM ('GERAL', 'SUPORTE');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "funcao" "Funcao" NOT NULL,
ADD COLUMN     "primeiroAcesso" BOOLEAN NOT NULL DEFAULT true;
