import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.tokenAdmin();
        await validar.primeiroAcesso();
        await validar.corpo(schema.noticia);

        let resposta = {};
        resposta.dataHora = moment().format();

        await prisma.noticia.create({ data: req.body });
        resposta.status = CODIGO_STATUS.NOTICIA.CRIADA_SUCESSO;

        res.status(201).json(resposta);
    }
);
