import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { schema } from "../../../../services/schemas";
import { validar } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";


const prisma = new PrismaClient();

export default validar.corpo(schema.nota, validar.tokenGoogle(async (req, res) => {
    if (req.method == "POST" && req.query.obraId) {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            let jaVotou = await prisma.nota.findUnique({ where: { email: req.body.email } });
            if (jaVotou) {
                resposta.status = CODIGO_STATUS.OBRA.NOTA_JA_EXISTE;
            }
            else {
                await prisma.nota.create({ data: { email: req.body.email, nota: Number(req.body.nota), obraId: Number(req.query.obraId) } });
                resposta.status = CODIGO_STATUS.OBRA.NOTA_CRIADA_SUCESSO;
            }
            res.status(200).json(resposta);
        } catch (erro) {
            res.status(400).end(erro);;
        }
    } else {
        res.status(400).end("Recurso não encontrado.");
    }
}));
