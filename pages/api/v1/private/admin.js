import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import randtoken from 'rand-token';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.tokenAdmin();
        await validar.primeiroAcesso();
        await validar.podeManipularAdmins();
        await validar.corpo(schema.admin);
        await validar.emailNaoCadastrado();

        let resposta = {};
        resposta.dataHora = moment().format();
        let senhaTemporaria = randtoken.generate(8);
        let saltos = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(senhaTemporaria, saltos);
        resposta.primeiroAcesso = {
            email: req.body.email,
            senhaTemporaria: senhaTemporaria
        };
        req.body.senha = hash;
        await prisma.admin.create({data: req.body});
        resposta.status = CODIGO_STATUS.ADMIN.CRIADO_SUCESSO;

        res.status(200).json(resposta);
    }
);
