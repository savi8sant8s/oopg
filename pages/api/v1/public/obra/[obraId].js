import { Validacao } from "../../../../../services/validacao";
import moment from "moment";
import { STATUS } from "../../../../../services/codigo-status";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";
import prisma from "../../../../../services/prisma-db";

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);
        await validar.obra();

        let resposta = {};
        resposta.dataHora = moment().format();

        let obraId = Number(req.query.obraId);

        resposta.obra = await prisma.obra.findUnique({ where: { id: obraId } });
        resposta.status = STATUS.OBRA.SUCESSO;

        res.status(200).json(resposta);
    }
);

