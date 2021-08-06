/*
  Warnings:

  - You are about to drop the column `token` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Noticia` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Comentario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Comentario.token_unique";

-- DropIndex
DROP INDEX "Nota.token_unique";

-- DropIndex
DROP INDEX "Noticia.token_unique";

-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "Nota" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "Noticia" DROP COLUMN "token";

-- CreateIndex
CREATE UNIQUE INDEX "Comentario.email_unique" ON "Comentario"("email");
