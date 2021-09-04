import { STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import { Validacao } from "../../../../services/validacao";
import prisma from "../../../../services/prisma-db";

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
            validar.quantidade;
            let quantidade = Number(req.query.quantidade);
            consulta.take = quantidade;
        }
        if(req.query.ordenar && req.query.ordenar != 'undefined'){
            validar.tipoOrdem;
            let ordenar = req.query.ordenar.toUpperCase();
            let ordem = {
                "RECENTE" : "desc",
                "ANTIGO" : "asc"
            }[ordenar];
            consulta.orderBy = {contratoDataInicio: ordem};
        }
        if(req.query.categoria && req.query.categoria != 'undefined'){
            validar.categoria;
            let categoria = req.query.categoria.toUpperCase();
            consulta.where = {
                categoria: categoria
            };
        }
        resposta.obras = await prisma.obra.findMany(consulta);
        delete consulta.select;
        resposta.quantObras = await prisma.obra.count(consulta);
        resposta.status = STATUS.OBRA.SUCESSO;

        res.status(200).json(resposta);
    }
);