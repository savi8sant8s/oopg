import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../middlewares/validacao";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "POST") {
            await validar.tokenAdmin(req, res);
            await logout(req, res);
        }
        else {
            throw mensagemErroPadrao;
        }
    }
);

const logout = async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    await prisma.sessao.update({ where: { token: token }, data: { valido: false, dataAtualizacao: moment().format() } });
    res.status(200).json({
        timestamp: moment().format(),
        status: CODIGO_STATUS.ADMIN.LOGOUT_SUCESSO
    });
};
