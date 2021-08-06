import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET") {
        try {
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.ALL_CONSTRUCTIONS_SUCCESS;
            response.constructions = await prisma.obra.findMany();
            response.countConstructions = await prisma.obra.count();
            res.status(200).json(response);
        } catch (error) {
            res.status(400).end(error);
        }
    } else {
        res.status(400).end("Resource not found.");
    }
};

