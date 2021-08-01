-- CreateTable
CREATE TABLE "Adm" (
    "id" SERIAL NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "admId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adm.email_unique" ON "Adm"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("admId") REFERENCES "Adm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
