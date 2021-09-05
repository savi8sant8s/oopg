import { PrismaClient } from "@prisma/client";

class PrismaSingleton {
    static instancia;

    static pegarInstancia() {
        if (!this.instancia) {
            this.instancia = new PrismaClient();
        }
        return this.instancia;
    }
};

export default PrismaSingleton.pegarInstancia();