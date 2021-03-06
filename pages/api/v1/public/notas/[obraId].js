import { Validacao } from "../../../../../services/validacao";
import { STATUS } from "../../../../../services/codigo-status";
import moment from "moment";
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

        resposta.gostou = await prisma.nota.count({ where: { obraId: obraId, nota: 1 } });
        resposta.indiferente = await prisma.nota.count({ where: { obraId: obraId, nota: 2 } });
        resposta.naogostou = await prisma.nota.count({ where: { obraId: obraId, nota: 3 } });
        resposta.status = STATUS.NOTA.SUCESSO;

        res.status(200).json(resposta);
    }
);

