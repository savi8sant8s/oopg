import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../../../services/codigo-status";
import {capturarExcecoes} from "../../../../../../middlewares/capturar-excecoes"
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.quantConcluidas = await prisma.obra.count({where:{situacao:"CONCLUIDO"}});
        resposta.quantAndamento = await prisma.obra.count({where:{situacao:"ANDAMENTO"}});
        resposta.quantParalizadas = await prisma.obra.count({where:{situacao:"PARALIZADO"}});
    
        resposta.status = CODIGO_STATUS.ESTATISTICA_OBRAS.SITUACAO_SUCESSO;
        res.status(200).json(resposta);
    }
)
