import { Validacao } from "../../../../services/validacao";
import { STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import prisma from "../../../../services/prisma-db";

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["GET"]);
        await validar.token("ADMIN");
        await validar.primeiroAcesso(false);

        let resposta = {};
        resposta.dataHora = moment().format();
        resposta.admins = await prisma.admin.findMany({select: {id: true, funcao: true, nome: true, email: true}});
        resposta.status = STATUS.ADMIN.SUCESSO;

        res.status(200).json(resposta);
    }
);