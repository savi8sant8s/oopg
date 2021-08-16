import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { Validacao } from "../../../../../middlewares/validacao";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";

const prisma = new PrismaClient();
export default capturarExcecoes(
    async (req, res) =>{
        let validar = new Validacao(req, res);
        validar.metodo(["GET"]);
        validar.tipoOrdemExiste();
    
        let ordenar = req.query.ordenar.toUpperCase();
        let resposta = {};
        resposta.dataHora = moment().format();
        let consulta = {
            "RECENTE" : "desc",
            "ANTIGO" : "asc"
        }[ordenar];    
        resposta.obras = await prisma.obra.findMany({
            select: {
                id: true,
                numeroLicitacao: true,
                descricao: true,
                categoria: true,
                contratoDataInicio: true,
            },
            orderBy: {
                contratoDataInicio: consulta,
            }        
        });
    
        resposta.status = CODIGO_STATUS.OBRA.OBRAS_POR_ORDEM_SUCESSO;
        res.status(200).json(resposta);
    }
)