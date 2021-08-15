import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import { Validacao } from "../../../../middlewares/validacao";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);

        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.obras = await prisma.obra.findMany({
            select: {
                id: true,
                numeroLicitacao: true,
                descricao: true,
                categoria: true,
                contratoDataInicio: true
            }
        });
        resposta.quantObras = await prisma.obra.count();
        resposta.status = CODIGO_STATUS.OBRA.OBRAS_SUCESSO;

        res.status(200).json(resposta);
    }
);
