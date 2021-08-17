import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";
import { Validacao } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["PUT", "DELETE"]);
        await validar.tokenAdmin();
        await validar.primeiroAcesso();
        await validar.obraExiste();

        let resposta = {};
        resposta.dataHora = moment().format();

        let obraId = Number(req.query.obraId);

        if (req.method == "PUT") {
            await validar.corpo(schema.obra);
            req.body.dataAtualizacao = moment().format();
            req.body.contratoDataInicio = new Date(req.body.contratoDataInicio).toISOString();
            req.body.contratoPrazo = new Date(req.body.contratoPrazo).toISOString();
            req.body.contratoDataConclusao = new Date(req.body.contratoDataConclusao).toISOString();
            await prisma.obra.update({ data: req.body, where: { id: obraId } });
            resposta.status = CODIGO_STATUS.OBRA.ALTERADA_SUCESSO;
        } else if (req.method == "DELETE") {
            await prisma.obra.delete({where: {id: obraId}});
            resposta.status = CODIGO_STATUS.OBRA.DELETADA_SUCESSO;
        }

        res.status(200).json(resposta);
    }
);