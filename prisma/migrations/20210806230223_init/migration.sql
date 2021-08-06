/*
  Warnings:

  - You are about to drop the column `aditivoValorAditadoAcumulado` on the `Obra` table. All the data in the column will be lost.
  - You are about to drop the column `contratadoRasaoSocial` on the `Obra` table. All the data in the column will be lost.
  - Added the required column `contratadoRazaoSocial` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `Obra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Obra" DROP COLUMN "aditivoValorAditadoAcumulado",
DROP COLUMN "contratadoRasaoSocial",
ADD COLUMN     "aditivoValorAditado" TEXT,
ADD COLUMN     "contratadoRazaoSocial" TEXT NOT NULL,
ADD COLUMN     "situacao" TEXT NOT NULL;
