import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { validar } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";

const prisma = new PrismaClient();

export default validar.tokenAdmin(
    async (req, res) => {
        try {
            await noticiaExiste(req.query.id);
            switch (req.method) {
                case "PUT":
                    await alterarNoticia(req, res);
                    break;
                case "DELETE":
                    await deletarNoticia(req, res);
                    break;
                default:
                    throw "Recurso não encontrado.";
            }
        } catch (erro) {
            res.status(400).json({
                timestamp: moment().format(),
                status: CODIGO_STATUS.ERRO.PROBLEMA_INESPERADO,
                erro: erro
            });
        }

    }
);

const alterarNoticia = (validar.corpo(schema.noticia, async (req, res) => {
    let corpo = req.body;
    corpo.dataAtualizacao = moment().format();
    await prisma.noticia.update({ data: corpo, where: { id: Number(req.query.id) } });
    res.status(200).json({
        timestamp: moment().format(),
        status: CODIGO_STATUS.NOTICIA.NOTICIA_ALTERADA_SUCESSO
    });
}));

const deletarNoticia = async (req, res) => {
    await prisma.noticia.delete({ where: { id: Number(req.query.id) } });
    res.status(200).json({
        timestamp: moment().format(),
        status: CODIGO_STATUS.NOTICIA.NOTICIA_DELETADA_SUCESSO
    });
};

const noticiaExiste = async (id) => {
    let existe = await prisma.noticia.findUnique({ where: { id: Number(id) } });
    if (!existe) {
        throw "Notícia com esse id não existe.";
    }
};