/*
  Warnings:

  - Added the required column `categoria` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `situacao` on the `Obra` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('CONCLUIDO', 'ANDAMENTO', 'PARALIZADO');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('SAUDE', 'EDUCACAO', 'ASSISTENCIASOCIAL', 'ADMINISTRACAO', 'URBANISMO');

-- AlterTable
ALTER TABLE "Obra" ADD COLUMN     "categoria" "Categoria" NOT NULL,
DROP COLUMN "situacao",
ADD COLUMN     "situacao" "Situacao" NOT NULL;