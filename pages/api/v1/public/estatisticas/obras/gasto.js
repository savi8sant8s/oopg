import { PrismaClient } from "@prisma/client";
import { STATUS } from "../../../../../../services/codigo-status";
import { capturarExcecoes } from "../../../../../../middlewares/capturar-excecoes"
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.gastoAnual = await prisma.$queryRaw(`
            select extract(year from "contratoDataInicio") as ano, trunc(sum("valorPagoAcumulado"))  as somatotal
            from public."Obra"
            where "contratoDataInicio" is not null
            group by 1
        `);

        resposta.status = STATUS.ESTATISTICA_OBRAS.GASTO_ANUAL_SUCESSO;
        res.status(200).json(resposta);
    }
)