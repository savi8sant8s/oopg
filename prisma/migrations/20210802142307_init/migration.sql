/*
  Warnings:

  - You are about to drop the `Adm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('SAUDE', 'ASSISTENCIA_SOCIAL', 'URBANISMO', 'EDUCACAO', 'ADMINISTRACAO');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_admId_fkey";

-- DropTable
DROP TABLE "Adm";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),
    "valido" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obra" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),
    "categoria" "Categoria",
    "numeroLicitacao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "convenioNumeroAno" TEXT,
    "convenioConcedente" TEXT,
    "convenioRepasse" DOUBLE PRECISION,
    "convenioContrapartida" DOUBLE PRECISION,
    "contratadoCpfCcnpj" TEXT NOT NULL,
    "contratadoRasaoSocial" TEXT NOT NULL,
    "contratoNumeroAno" TEXT NOT NULL,
    "contratoDataInicio" TEXT NOT NULL,
    "contratoPrazo" TEXT NOT NULL,
    "contratoValorContratado" DOUBLE PRECISION NOT NULL,
    "contratoDataConclusao" TEXT,
    "aditivoPrazoAditado" TEXT,
    "aditivoValorAditadoAcumulado" TEXT,
    "execucaoReajuste" DOUBLE PRECISION,
    "execucaoNaturezaDespesa" TEXT NOT NULL,
    "execucaoValorMedidoAcumulado" DOUBLE PRECISION NOT NULL,
    "execucaoValorPagoAcumuladoPeriodo" DOUBLE PRECISION,
    "execucaoValorPagoAcumuladoExercicio" DOUBLE PRECISION,
    "valorPagoAcumulado" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),
    "token" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "obraId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),
    "token" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "obraId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),
    "token" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin.email_unique" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sessao.token_unique" ON "Sessao"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Obra.numeroLicitacao_unique" ON "Obra"("numeroLicitacao");

-- CreateIndex
CREATE UNIQUE INDEX "Comentario.token_unique" ON "Comentario"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Nota.token_unique" ON "Nota"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Nota.email_unique" ON "Nota"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Noticia.token_unique" ON "Noticia"("token");

-- AddForeignKey
ALTER TABLE "Sessao" ADD FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE CASCADE ON UPDATE CASCADE;
