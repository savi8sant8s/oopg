import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET" && req.query.obraId) {
        try {
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.ALL_CONSTRUCTION_NOTES_SUCCESS;
            response.like = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 3 } });
            response.indifferent = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 2 } });
            response.dislike = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 1 } });
            res.status(200).json(response);
        } catch (error) {
            res.status(400).end(error);
        }
    } else{
        res.status(400).end("Resource not found.");
    }
};
