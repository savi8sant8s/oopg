import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET") {
        try {
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.ALL_NEWS_SUCCESS;
            if (req.query.quant) {
                response.news = await prisma.noticia.findMany({ orderBy: { dataCriacao: 'asc' }, take: Number(req.query.quant) });
            }
            else {
                response.news = await prisma.noticia.findMany({ orderBy: { dataCriacao: 'asc' } });
            }
            res.status(200).json(response);
        } catch (error) {
            res.status(400).end(error);
        }
    } else {
        res.status(400).end("Resource not found.");
    }
};
