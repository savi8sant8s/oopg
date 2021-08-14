import { PrismaClient } from "@prisma/client";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../middlewares/validacao";
import { schema } from "../../../../services/schemas";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import bcrypt from "bcrypt";
import randtoken from 'rand-token';

const prisma = new PrismaClient();

export default capturarExcecoes(
  async (req, res) => {
    if (req.method == "POST") {
      await validar.corpo(schema.login, res, res);
      await login(req, res);
    } else {
      throw mensagemErroPadrao;
    }
  }
);

const login = async (req, res) => {
  let resposta = {};
  resposta.timestamp = moment().format();

  let admin = await prisma.admin.findUnique({ where: { email: req.body.email } });
  if (!admin) {
    resposta.status = CODIGO_STATUS.ADMIN.LOGIN_USUARIO_INEXISTENTE;
    res.status(200).json(resposta);
  }

  let senhaValida = await bcrypt.compare(req.body.senha, admin.senha);
  if (!senhaValida) {
    resposta.status = CODIGO_STATUS.ADMIN.LOGIN_CREDENCIAIS_INVALIDAS;
    res.status(200).json(resposta);
  }

  resposta.token = randtoken.generate(30);

  let ultimaSessao = await prisma.sessao.findFirst({ where: { adminId: admin.id, valido: true } });
  if (ultimaSessao) {
    await prisma.sessao.updateMany({ where: { adminId: ultimaSessao.adminId }, data: { valido: false, dataAtualizacao: resposta.timestamp } });
  }
  await prisma.sessao.create({ data: { token: resposta.token, adminId: admin.id } });

  resposta.status = CODIGO_STATUS.ADMIN.LOGIN_SUCESSO;
  res.status(200).json(resposta);
};


