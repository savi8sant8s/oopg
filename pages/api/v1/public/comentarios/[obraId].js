import { PrismaClient } from "@prisma/client";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "GET") {
            await validar.obraExiste(req, res);
            await listaComentarios(req, res);
        } else {
            throw mensagemErroPadrao;
        }
    }
);

const listaComentarios = async (req, res) => {
    let resposta = {};
    resposta.comentarios = await prisma.comentario.findMany({ where: { obraId: Number(req.query.obraId) } });
    resposta.quantComentarios = await prisma.comentario.count({ where: { obraId: Number(req.query.obraId) } });
    resposta.status = CODIGO_STATUS.OBRA.COMENTARIOS_OBRA_SUCESSO;
    resposta.timestamp = moment().format();
    res.status(200).json(resposta);
};
