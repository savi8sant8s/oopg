import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET" && req.query.id) {
        try {
            let id = Number(req.query.id);
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.CONSTRUCTION.CONSTRUCTION_SUCCESS;
            response.construction = await prisma.obra.findUnique({ where: {id: id}});
            res.status(200).json(response);
        } catch (error) {
            res.status(400).end(error);
        }
    } else {
        res.status(400).end("Resource not found.");
    }
};
