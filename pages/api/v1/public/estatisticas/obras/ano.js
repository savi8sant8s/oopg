import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../../../services/codigo-status";
import {capturarExcecoes} from "../../../../../../middlewares/capturar-excecoes"
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.obrasPorAno = await prisma.$queryRaw(`
            select extract(year from "contratoDataInicio") as ano, count(*) quantidade
            from public."Obra"
            where "contratoDataInicio" is not null
            group by 1`);
          
        resposta.status = CODIGO_STATUS.ESTATISTICA.OBRA_ANO_SUCESSO;
        res.status(200).json(resposta);
    }
)