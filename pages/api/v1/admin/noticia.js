import { PrismaClient } from "@prisma/client";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "POST") {
            await validar.tokenAdmin(req, res);
            await validar.corpo(schema.noticia, req, res);
            await adicionarNoticia(req, res);
        } else {
            throw mensagemErroPadrao;
        }
    }
);

const adicionarNoticia = async (req, res) => {
    await prisma.noticia.create({ data: req.body });
    res.status(200).json({
        timestamp: moment().format(),
        status: CODIGO_STATUS.NOTICIA.NOTICIA_CRIADA_SUCESSO
    });
};