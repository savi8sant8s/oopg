import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);
        await validar.obraExiste();

        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.comentarios = await prisma.comentario.findMany({ where: { obraId: Number(req.query.obraId) } });
        resposta.quantComentarios = await prisma.comentario.count({ where: { obraId: Number(req.query.obraId) } });
        resposta.status = CODIGO_STATUS.COMENTARIO.SUCESSO;
        res.status(200).json(resposta);
    }
);
