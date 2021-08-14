import { PrismaClient } from "@prisma/client";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "PUT") {
            await validar.noticiaExiste(req, res);
            await validar.tokenAdmin(req, res);
            await validar.corpo(schema.noticia, req, res);
            await alterarNoticia(req, res);
        } else if (req.method == "DELETE") {
            await validar.noticiaExiste(req, res);
            await validar.tokenAdmin(req, res);
            await deletarNoticia(req, res);
        } else {
            throw mensagemErroPadrao;
        }
    }
);

const alterarNoticia = async (req, res) => {
    let corpo = req.body;
    corpo.dataAtualizacao = moment().format();
    await prisma.noticia.update({ data: corpo, where: { id: Number(req.query.noticiaId) } });
    res.status(200).json({
        timestamp: moment().format(),
        status: CODIGO_STATUS.NOTICIA.NOTICIA_ALTERADA_SUCESSO
    });
};

const deletarNoticia = async (req, res) => {
    await prisma.noticia.delete({ where: { id: Number(req.query.noticiaId) } });
    res.status(200).json({
        timestamp: moment().format(),
        status: CODIGO_STATUS.NOTICIA.NOTICIA_DELETADA_SUCESSO
    });
};
