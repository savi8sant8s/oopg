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

        let obraId = Number(req.query.obraId);

        resposta.gostou = await prisma.nota.count({ where: { obraId: obraId, nota: 1 } });
        resposta.indiferente = await prisma.nota.count({ where: { obraId: obraId, nota: 2 } });
        resposta.naogostou = await prisma.nota.count({ where: { obraId: obraId, nota: 3 } });
        resposta.status = CODIGO_STATUS.OBRA.NOTAS_OBRA_SUCESSO;

        res.status(200).json(resposta);
    }
);

