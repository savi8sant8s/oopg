import { STATUS } from "../../../../services/codigo-status";
import { Validacao } from "../../../../services/validacao";
import moment from "moment";
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import { PrismaSingleton } from "../../../../services/prisma-singleton";

const prisma = PrismaSingleton.pegarInstancia();

export default capturarExcecoes(
    async (req, res) => {
        let validar = new Validacao(req, res);

        validar.metodo(["POST"]);
        await validar.token("ADMIN");

        let resposta = {};
        resposta.dataHora = moment().format();

        let token = req.headers.authorization.split(' ')[1];
        await prisma.sessao.update({ where: { token: token }, data: { valido: false, dataAtualizacao: moment().format() } });
        resposta.status = STATUS.ADMIN.LOGOUT_SUCESSO;

        res.status(200).json(resposta);
    }
);

