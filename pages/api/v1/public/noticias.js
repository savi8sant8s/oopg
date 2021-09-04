import { STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import { Validacao } from "../../../../services/validacao";
import prisma from "../../../../services/prisma-db";

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);

        let resposta = {};
        resposta.dataHora = moment().format();

        let consulta = { orderBy: { dataCriacao: 'desc' } };
        if (req.query.quant) {
            consulta.take = Number(req.query.quant);
        }
        resposta.noticias = await prisma.noticia.findMany(consulta);
        resposta.status = STATUS.NOTICIA.SUCESSO;

        res.status(200).json(resposta);
    }
);
