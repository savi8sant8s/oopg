import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["PUT", "DELETE"]);
        await validar.tokenAdmin();
        await validar.primeiroAcesso();
        await validar.podeManipularAdmins();
        await validar.adminIdExiste();
        
        let resposta = {};
        resposta.dataHora = moment().format();

        let adminId = Number(req.query.adminId);

        if (req.method == "PUT") {
            await validar.corpo(schema.admin);
            req.body.dataAtualizacao = moment().format();
            await prisma.admin.update({ data: req.body, where: { id: adminId } });
            resposta.status = CODIGO_STATUS.ADMIN.ALTERADO_SUCESSO;
        }
        else if (req.method == "DELETE") {
            await prisma.admin.delete({ where: { id: adminId } });
            resposta.status = CODIGO_STATUS.ADMIN.DELETADO_SUCESSO;
        }

        res.status(200).json(resposta);
    }
);
