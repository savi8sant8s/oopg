/*
  Warnings:

  - The `contratoDataConclusao` column on the `Obra` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `contratoDataInicio` on the `Obra` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contratoPrazo` on the `Obra` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Obra" DROP COLUMN "contratoDataInicio",
ADD COLUMN     "contratoDataInicio" TIMESTAMP(3) NOT NULL,
DROP COLUMN "contratoPrazo",
ADD COLUMN     "contratoPrazo" TIMESTAMP(3) NOT NULL,
DROP COLUMN "contratoDataConclusao",
ADD COLUMN     "contratoDataConclusao" TIMESTAMP(3);
