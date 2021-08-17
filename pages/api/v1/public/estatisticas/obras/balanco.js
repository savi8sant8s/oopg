import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../../../services/codigo-status";
import {capturarExcecoes} from "../../../../../../middlewares/capturar-excecoes"
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.quantObras = await prisma.obra.count();
        resposta.gastoTotal = await prisma.obra.aggregate({
            _sum: {
                valorPagoAcumulado : true
            }
        });
        resposta.gastoTotal = Math.trunc(resposta.gastoTotal._sum.valorPagoAcumulado);
        resposta.status = CODIGO_STATUS.ESTATISTICA_OBRAS.BALANCO_SUCESSO;
        res.status(200).json(resposta);
    }
)