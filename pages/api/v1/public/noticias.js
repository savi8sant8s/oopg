import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { CODIGO_STATUS } from "../../../../services/codigo-status";


const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                await listarNoticias(req, res);
                break;
            default:
                throw "Recurso não encontrado.";
        }
    } catch (erro) {
        res.status(400).json({
            timestamp: moment().format(),
            status: CODIGO_STATUS.ERRO.PROBLEMA_INESPERADO,
            erro: erro
        });
    }

};

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
