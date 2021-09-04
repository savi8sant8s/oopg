import { Validacao } from "../../../../services/validacao";
import { STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import prisma from "../../../../services/prisma-db";

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.token("ADMIN");
        await validar.primeiroAcesso(false);
        await validar.corpo(schema.noticia);

        let resposta = {};
        resposta.dataHora = moment().format();

        await prisma.noticia.create({ data: req.body });
        resposta.status = STATUS.NOTICIA.CRIADA_SUCESSO;

        res.status(201).json(resposta);
    }
);
