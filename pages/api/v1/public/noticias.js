import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { CODIGO_STATUS } from "../../../../services/codigo-status";


const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET") {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            resposta.status = CODIGO_STATUS.NOTICIA.NOTICIAS_SUCESSO;
            if (req.query.quant) {
                resposta.noticias = await prisma.noticia.findMany({ orderBy: { dataCriacao: 'asc' }, take: Number(req.query.quant) });
            }
            else {
                resposta.noticias = await prisma.noticia.findMany({ orderBy: { dataCriacao: 'asc' } });
            }
            res.status(200).json(resposta);
        } catch (erro) {
            res.status(400).end(erro);;
        }
    } else {
        res.status(400).end("Recurso não encontrado.");
    }
};
