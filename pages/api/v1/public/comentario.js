import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { schema } from "../../../../services/schemas";
import { validar } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { respostaPadrao } from "../../../../middlewares/respostas-padrao";

const prisma = new PrismaClient();

export default validar.corpo(schema.comentario, validar.tokenGoogle(async (req, res) => {
    if (req.method == "POST" && req.query.obraId) {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            await prisma.comentario.create({
                data: {
                    imagemUrl: req.body.imageUrl,
                    nomeUsuario: req.body.username,
                    titulo: req.body.title,
                    mensagem: req.body.msg,
                    email: req.body.email,
                    obraId: Number(req.query.obraId)
                }
            });
            resposta.status = CODIGO_STATUS.OBRA.COMENTARIO_CRIADO_SUCESSO;
            res.status(200).json(resposta);
        } catch (erro) {
            respostaPadrao.erroInesperado(res, erro);
        }
    } else {
        respostaPadrao.recursoNaoDisponivel(res);
    }
}));