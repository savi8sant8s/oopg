import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.tokenAdmin();
        await validar.primeiroAcesso();
        await validar.corpo(schema.obras);

        let resposta = {};
        resposta.dataHora = moment().format();

        for(let x in req.body.obras){
            let obra = req.body.obras[x];
            obra.contratoDataInicio = new Date(obra.contratoDataInicio).toISOString();
            obra.contratoPrazo = new Date(obra.contratoPrazo).toISOString();
            obra.contratoDataConclusao = new Date(obra.contratoDataConclusao).toISOString();
        }
        
        await prisma.obra.createMany({ data: req.body.obras });
        resposta.status = CODIGO_STATUS.OBRA.CRIADAS_SUCESSO;

        res.status(201).json(resposta);
    }
);
