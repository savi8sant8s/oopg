import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../../services/validacao";
import { STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["PUT", "DELETE"]);
        await validar.token("ADMIN");
        await validar.primeiroAcesso(false);
        await validar.podeManipularAdmins();
        await validar.adminIdExiste();
        
        let resposta = {};
        resposta.dataHora = moment().format();

        let adminId = Number(req.query.adminId);

        if (req.method == "PUT") {
            await validar.corpo(schema.admin);
            req.body.dataAtualizacao = moment().format();
            await prisma.admin.update({ data: req.body, where: { id: adminId } });
            resposta.status = STATUS.ADMIN.ALTERADO_SUCESSO;
        }
        else if (req.method == "DELETE") {
            await prisma.admin.delete({ where: { id: adminId } });
            resposta.status = STATUS.ADMIN.DELETADO_SUCESSO;
        }

        res.status(200).json(resposta);
    }
);