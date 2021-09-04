import { Validacao } from "../../../../services/validacao";
import { STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import prisma from "../../../../services/prisma-db";

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.token("ADMIN");
        await validar.primeiroAcesso(false);
        req.body = req.body.obras;
        await validar.corpo(schema.obras);

        let resposta = {};
        resposta.dataHora = moment().format();

        for(let x in req.body){
            let obra = req.body[x];
            obra.contratoDataInicio = new Date(obra.contratoDataInicio).toISOString();
            obra.contratoPrazo = new Date(obra.contratoPrazo).toISOString();
            obra.contratoDataConclusao = new Date(obra.contratoDataConclusao).toISOString();
        }
        await prisma.obra.createMany({ data: req.body, skipDuplicates: true});
        resposta.status = STATUS.OBRA.CRIADAS_SUCESSO;

        res.status(201).json(resposta);
    }
);
