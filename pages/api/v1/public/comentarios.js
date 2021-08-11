import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET" && req.query.obraId) {
        try {
            let id = Number(req.query.obraId);
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.ALL_CONSTRUCTION_COMMENTS_SUCCESS;
            response.comments = await prisma.comentario.findMany({ where: { obraId: id } });
            response.countComments = await prisma.comentario.count({ where: { obraId: id } });
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).end(error);
        }
    } else {
        res.status(400).end("Resource not found.");
    }
};
