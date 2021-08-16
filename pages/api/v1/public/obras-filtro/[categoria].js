import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";
import { Validacao } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) =>{

        let validar = new Validacao(req, res);
        validar.metodo(["GET"]);
        validar.categoriaExiste();
    
        let categoria = req.query.categoria.toUpperCase();
        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.obras = await prisma.obra.findMany({
            select: {
                id: true,
                numeroLicitacao: true,
                descricao: true,
                categoria: true,
                contratoDataInicio: true,
            },
            where: {
                categoria: categoria,
            }
        });
        resposta.status = CODIGO_STATUS.OBRA.OBRAS_POR_CATEGORIA_SUCESSO;
        res.status(200).json(resposta);
    }
) 