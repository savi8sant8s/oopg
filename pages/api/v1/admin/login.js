import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../middlewares/validacao";
import { schema } from "../../../../services/schemas";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import bcrypt from "bcrypt";
import randtoken from 'rand-token';
import { capturarExcecoes } from "../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
  async (req, res) => {
    let validar = new Validacao(req, res);

    validar.metodo(["POST"]);
    await validar.corpo(schema.login);

    let resposta = {};
    resposta.dataHora = moment().format();

    let adminExistente = await prisma.admin.findUnique({ where: { email: req.body.email } });

    if (!adminExistente) {
      resposta.status = CODIGO_STATUS.ADMIN.LOGIN_CREDENCIAIS_INVALIDAS;
    } else {
      let senhaValida = await bcrypt.compare(req.body.senha, adminExistente.senha);

      if (!senhaValida) {
        resposta.status = CODIGO_STATUS.ADMIN.LOGIN_CREDENCIAIS_INVALIDAS;
      } else {
        resposta.token = randtoken.generate(30);
        let sessaoExistente = await prisma.sessao.findFirst({ where: { adminId: adminExistente.id, valido: true } });
        if (sessaoExistente) {
          await prisma.sessao.updateMany({ where: { adminId: sessaoExistente.adminId }, data: { valido: false, dataAtualizacao: resposta.dataHora } });
        }
        await prisma.sessao.create({ data: { token: resposta.token, adminId: adminExistente.id } });
        resposta.status = CODIGO_STATUS.ADMIN.LOGIN_SUCESSO;
      }

    }

    res.status(200).json(resposta);
  }
);


