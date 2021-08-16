import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import { Validacao } from "../../../../middlewares/validacao";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);

        let resposta = {};
        resposta.dataHora = moment().format();
        let consulta = {
            select: {
                id: true,
                numeroLicitacao: true,
                descricao: true,
                categoria: true,
                contratoDataInicio: true
            }
        };
        if(req.query.quantidade){
            validar.quantidadeValida();
            let quantidade = Number(req.query.quantidade);
            consulta.take = quantidade;
        }
        if(req.query.ordenar){
            validar.tipoOrdemExiste();
            let ordenar = req.query.ordenar.toUpperCase();
            let ordem = {
                "RECENTE" : "desc",
                "ANTIGO" : "asc"
            }[ordenar];
            consulta.orderBy = {contratoDataInicio: ordem};
        }
        if(req.query.categoria){
            validar.categoriaExiste();
            let categoria = req.query.categoria.toUpperCase();
            consulta.where = {
                categoria: categoria
            };
        }
        resposta.obras = await prisma.obra.findMany(consulta);
        delete consulta.select;
        resposta.quantObras = await prisma.obra.count(consulta);
        resposta.status = CODIGO_STATUS.OBRA.OBRAS_SUCESSO;

        res.status(200).json(resposta);
    }
);