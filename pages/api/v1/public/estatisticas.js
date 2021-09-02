import { PrismaClient } from "@prisma/client";
import { STATUS } from "../../../../services/codigo-status";
import {capturarExcecoes} from "../../../../middlewares/capturar-excecoes"
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
            group by 1 order by ano`);
        resposta.quantObras = await prisma.obra.count();
        resposta.gastoTotal = await prisma.obra.aggregate({
            _sum: {
                valorPagoAcumulado : true
            }
        });
        resposta.quantAdministracao = await prisma.obra.count({where:{categoria:"ADMINISTRACAO"}});
        resposta.quantAssistenciaSocial = await prisma.obra.count({where:{categoria:"ASSISTENCIASOCIAL"}});
        resposta.quantEducacao = await prisma.obra.count({where:{categoria:"EDUCACAO"}});
        resposta.quantSaude = await prisma.obra.count({where:{categoria:"SAUDE"}});
        resposta.quantUrbanismo = await prisma.obra.count({where:{categoria:"URBANISMO"}});
        resposta.gastoTotal = Math.trunc(resposta.gastoTotal._sum.valorPagoAcumulado);
        resposta.gastoAnual = await prisma.$queryRaw(`
            select extract(year from "contratoDataInicio") as ano, trunc(sum("valorPagoAcumulado"))  as somatotal
            from public."Obra"
            where "contratoDataInicio" is not null
            group by 1
        `);
        resposta.quantConcluidas = await prisma.obra.count({where:{situacao:"CONCLUIDO"}});
        resposta.quantAndamento = await prisma.obra.count({where:{situacao:"ANDAMENTO"}});
        resposta.quantParalizadas = await prisma.obra.count({where:{situacao:"PARALIZADO"}});
        resposta.status = STATUS.ESTATISTICA.SUCESSO;
        res.status(200).json(resposta);
    }
)