import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.query.obraId) {
        let response = {};
        response.timestamp = moment().locale("pt-br").format();
        response.codeStatus = CODE_STATUS.ALL_CONSTRUCTION_NOTES_SUCCESS;
        response.like = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 1 } });
        response.indifferent = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 0 } });
        response.dislike = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: -1 } });
        res.status(200).json(response);
    }
    else {
        res.status(404).end("Resource not found.");
    }
};
