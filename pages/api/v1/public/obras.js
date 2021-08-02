import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
    let response = {};
    response.timestamp = moment().locale("pt-br").format();
    response.codeStatus = CODE_STATUS.ALL_CONSTRUCTIONS_SUCCESS;
    response.obras = await prisma.obra.findMany();
    res.status(200).json(response);
};
