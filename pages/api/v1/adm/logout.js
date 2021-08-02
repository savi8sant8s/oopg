import { PrismaClient } from "@prisma/client";
import { validateBody } from "../../../../middleware/validation";
import { CODE_STATUS } from "../../../../services/code-status";
import { logoutSchema } from "../../../../services/schemas";
import moment from "moment";

const prisma = new PrismaClient();

export default validateBody(logoutSchema, async (req, res) => {
    let response = {};
    response.timestamp = moment().locale("pt-br").format();

    let openSession = await prisma.sessao.findFirst({ where: { token: req.body.token, valido: true } });
    if (!openSession) {
        response.codeStatus = CODE_STATUS.INVALID_TOKEN;
    } else {
        await prisma.sessao.update({ where: { token: req.body.token }, data: { valido: false, dataAtualizacao: response.timestamp } });
        response.codeStatus = CODE_STATUS.LOGOUT_SUCCESS;
    }
    res.status(200).json(response);
});