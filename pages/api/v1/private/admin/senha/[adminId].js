import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../../services/codigo-status";
import { schema } from "../../../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../../../middlewares/capturar-excecoes";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["PATCH"]);
        await validar.tokenAdmin();
        await validar.adminIdExiste();
        await validar.precisaAlterarSenha();
        await validar.corpo(schema.alteracaoSenha);

        let resposta = {};
        resposta.dataHora = moment().format();

        let saltos = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.senha, saltos);

        let adminId = Number(req.query.adminId);

        req.body.dataAtualizacao = moment().format();
        await prisma.admin.update({ data: {senha: hash, primeiroAcesso: true}, where: { id: adminId } });
        resposta.status = CODIGO_STATUS.ADMIN.SENHA_ALTERADA_SUCESSO;


        res.status(200).json(resposta);
    }
);
