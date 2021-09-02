import { PrismaClient } from "@prisma/client";

export class PrismaSingleton {
    static instancia;

    static pegarInstancia() {
        if (!this.instancia) {
            this.instancia = new PrismaClient();
        }
        return this.instancia;
    }

};

