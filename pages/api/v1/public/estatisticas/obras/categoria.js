import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../../../services/codigo-status";
import {capturarExcecoes} from "../../../../../../middlewares/capturar-excecoes"
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.quantAdministracao = await prisma.obra.count({where:{categoria:"ADMINISTRACAO"}});
        resposta.quantAssistenciaSocial = await prisma.obra.count({where:{categoria:"ASSISTENCIASOCIAL"}});
        resposta.quantEducacao = await prisma.obra.count({where:{categoria:"EDUCACAO"}});
        resposta.quantSaude = await prisma.obra.count({where:{categoria:"SAUDE"}});
        resposta.quantUrbanismo = await prisma.obra.count({where:{categoria:"URBANISMO"}});
    
        resposta.status = CODIGO_STATUS.ESTATISTICA.OBRA_CATEGORIA_SUCESSO;
        res.status(200).json(resposta);
    }
)