import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.tokenAdmin();
        await validar.primeiroAcesso();
        await validar.corpo(schema.obra);

        let resposta = {};
        resposta.dataHora = moment().format();
        req.body.contratoDataInicio = new Date(req.body.contratoDataInicio).toISOString();
        req.body.contratoPrazo = new Date(req.body.contratoPrazo).toISOString();
        req.body.contratoDataConclusao = new Date(req.body.contratoDataConclusao).toISOString();
        await prisma.obra.create({ data: req.body });
        resposta.status = CODIGO_STATUS.OBRA.CRIADA_SUCESSO;

        res.status(201).json(resposta);
    }
);
