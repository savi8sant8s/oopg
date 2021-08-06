import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";
import { validateBody, validateGoogleToken } from "../../../../middleware/validation";
import { commentSchema } from "../../../../services/schemas";

const prisma = new PrismaClient();

export default validateBody(commentSchema, validateGoogleToken(async (req, res) => {
    if (req.method == "POST" && req.query.obraId) {
        try {
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            let commentAlreadyexists = await prisma.comentario.findUnique({ where: { email: req.body.email } });
            if (commentAlreadyexists) {
                response.codeStatus = CODE_STATUS.CONSTRUCTION_COMMENT_ALREADY_EXISTS;
            }
            else {
                await prisma.comentario.create({ data: { 
                    imagemUrl: req.body.imageUrl,
                    nomeUsuario: req.body.username,
                    titulo: req.body.title,
                    mensagem: req.body.msg,
                    email: req.body.email, 
                    obraId: Number(req.query.obraId) 
                }});
                response.codeStatus = CODE_STATUS.CONSTRUCTION_COMMENT_ADDED_SUCCESS;
            }
            res.status(200).json(response);
        } catch (error) {
            res.status(400).end(error);
        }
    } else{
        res.status(400).end("Resource not found.");
    }
}));