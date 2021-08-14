import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { capturarExcecoes, mensagemErroPadrao } from "../../../../middlewares/validacao";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "GET") {
            await listarNoticias(req, res);
        } else {
            throw mensagemErroPadrao;
        }
    }
);

const listarNoticias = async (req, res) => {
    let resposta = {};
    let consulta = { orderBy: { dataCriacao: 'asc' } };
    if (req.query.quant) {
        consulta.take = Number(req.query.quant);
    }
    resposta.noticias = await prisma.noticia.findMany(consulta);
    resposta.timestamp = moment().format();
    resposta.status = CODIGO_STATUS.NOTICIA.NOTICIAS_SUCESSO;
    res.status(200).json(resposta);
};
