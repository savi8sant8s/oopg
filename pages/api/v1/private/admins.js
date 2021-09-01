import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../services/validacao";
import { STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import randtoken from 'rand-token';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);
        await validar.token("ADMIN");
        await validar.primeiroAcesso(false);

        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.admins = await prisma.admin.findMany({select: {id: true, funcao: true, nome: true, email: true}});
        resposta.status = STATUS.ADMIN.SUCESSO;

        res.status(200).json(resposta);
    }
);