import { Validacao } from "../../../../services/validacao";
import { STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import randtoken from 'rand-token';
import bcrypt from "bcrypt";
import { PrismaSingleton } from "../../../../services/prisma-singleton";

const prisma = PrismaSingleton.pegarInstancia();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.token("ADMIN");
        await validar.primeiroAcesso(false);
        await validar.podeManipularAdmins();
        await validar.corpo(schema.admin);
        await validar.adminEmail("CADASTRO_ADMIN");

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
        resposta.status = STATUS.ADMIN.CRIADO_SUCESSO;

        res.status(200).json(resposta);
    }
);
