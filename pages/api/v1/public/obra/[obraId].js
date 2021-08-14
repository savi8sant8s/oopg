import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../middlewares/validacao";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "GET") {
            await validar.obraExiste(req, res);
            await pegarObra(req, res);
        } else {
            throw mensagemErroPadrao;
        }
    }
);

const pegarObra = async (req, res) => {
    let resposta = {};
    resposta.obra = await prisma.obra.findUnique({ where: { id: Number(req.query.id) } });
    resposta.timestamp = moment().format();
    resposta.status = CODIGO_STATUS.OBRA.OBRA_SUCESSO;
    res.status(200).json(resposta);
};
