import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import { Validacao } from "../../../../middlewares/validacao";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);

        let resposta = {};
        resposta.dataHora = moment().format();

        let consulta = { orderBy: { dataCriacao: 'asc' } };
        if (req.query.quant) {
            consulta.take = Number(req.query.quant);
        }
        resposta.noticias = await prisma.noticia.findMany(consulta);
        resposta.status = CODIGO_STATUS.NOTICIA.NOTICIAS_SUCESSO;

        res.status(200).json(resposta);
    }
);
