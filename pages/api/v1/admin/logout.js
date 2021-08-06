import { PrismaClient } from "@prisma/client";
import { validateBody, validateAdminToken } from "../../../../middleware/validation";
import { CODE_STATUS } from "../../../../services/code-status";
import { logoutSchema } from "../../../../services/schemas";
import moment from "moment";

const prisma = new PrismaClient();

export default validateBody(logoutSchema, validateAdminToken(async (req, res) => {
    let response = {};
    response.timestamp = moment().locale("pt-br").format();
    await prisma.sessao.update({ where: { token: req.body.token }, data: { valido: false, dataAtualizacao: response.timestamp } });
    response.codeStatus = CODE_STATUS.LOGOUT_SUCCESS;
    res.status(200).json(response);
}));