import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.query.obraId) {
        let response = {};
        response.timestamp = moment().locale("pt-br").format();
        response.codeStatus = CODE_STATUS.ALL_CONSTRUCTION_COMMENTS_SUCCESS;
        response.comments = await prisma.comentario.findMany({ where: { obraId: Number(req.query.obraId) } });
        response.countComments = await prisma.comentario.count({ where: { obraId: Number(req.query.obraId) } });
        res.status(200).json(response);
    } else {
        res.status(404).end("Resource not found.");
    }
};
