import { PrismaClient } from "@prisma/client";
import { validar } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";


const prisma = new PrismaClient();

export default validar.corpo(schema.logout, validar.tokenAdmin(async (req, res) => {
    if (req.method == "PUT") {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            await prisma.sessao.update({ where: { token: req.body.token }, data: { valido: false, dataAtualizacao: resposta.timestamp } });
            resposta.codeStatus = CODIGO_STATUS.ADMIN.LOGOUT_SUCESSO;
            res.status(200).json(resposta);
        } catch (erro) {
            res.status(400).end(erro);;
        }
    } else {
        res.status(400).end("Recurso não encontrado.");
    }
}));