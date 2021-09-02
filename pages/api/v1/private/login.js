import { Validacao } from "../../../../services/validacao";
import { schema } from "../../../../services/schemas";
import { STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import randtoken from 'rand-token';
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";
import { PrismaSingleton } from "../../../../services/prisma-singleton";

const prisma = PrismaSingleton.pegarInstancia();

export default capturarExcecoes(
  async (req, res) => {
    let validar = new Validacao(req, res);

    validar.metodo(["POST"]);
    await validar.corpo(schema.login);
    await validar.adminEmail("LOGIN");

    let resposta = {};
    resposta.dataHora = moment().format();

    let admin = await prisma.admin.findUnique({ where: { email: req.body.email } });

    await validar.senhaAdmin(admin.senha);

    resposta.token = randtoken.generate(30);
    await prisma.sessao.updateMany({ where: { adminId: admin.id }, data: { valido: false, dataAtualizacao: resposta.dataHora } });
    await prisma.sessao.create({ data: { token: resposta.token, adminId: admin.id } });
    if (!admin.primeiroAcesso) {
      resposta.status = STATUS.ADMIN.LOGIN_PRIMEIRO_ACESSO;
      resposta.adminId = admin.id;
    } else {
      resposta.status = STATUS.ADMIN.LOGIN_SUCESSO;
    }
    res.status(200).json(resposta);
  }
);


