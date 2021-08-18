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
        await validar.noticia();
        
        let resposta = {};
        resposta.dataHora = moment().format();

        let noticiaId = Number(req.query.noticiaId);

        if (req.method == "PUT") {
            await validar.corpo(schema.noticia);
            req.body.dataAtualizacao = moment().format();
            await prisma.noticia.update({ data: req.body, where: { id: noticiaId } });
            resposta.status = STATUS.NOTICIA.ALTERADA_SUCESSO;
        }
        else if (req.method == "DELETE") {
            await prisma.noticia.delete({ where: { id: noticiaId } });
            resposta.status = STATUS.NOTICIA.DELETADA_SUCESSO;
        }

        res.status(200).json(resposta);
    }
);
