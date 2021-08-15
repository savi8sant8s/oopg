import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { Validacao } from "../../../../middlewares/validacao";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.tokenAdmin();

        let resposta = {};
        resposta.dataHora = moment().format();

        let token = req.headers.authorization.split(' ')[1];
        await prisma.sessao.update({ where: { token: token }, data: { valido: false, dataAtualizacao: moment().format() } });
        resposta.status = CODIGO_STATUS.ADMIN.LOGOUT_SUCESSO;

        res.status(200).json(resposta);
    }
);

