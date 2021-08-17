import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../../middlewares/validacao";
import moment from "moment";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);
        await validar.obraExiste();

        let resposta = {};
        resposta.dataHora = moment().format();

        let obraId = Number(req.query.obraId);

        resposta.obra = await prisma.obra.findUnique({ where: { id: obraId } });
        resposta.status = CODIGO_STATUS.OBRA.SUCESSO;

        res.status(200).json(resposta);
    }
);

