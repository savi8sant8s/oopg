import { PrismaClient } from "@prisma/client";
import { validar } from "../../../../middlewares/validacao";
import { schema } from "../../../../services/schemas";
import moment from "moment";
import bcrypt from "bcrypt";
import randtoken from 'rand-token';
import { CODIGO_STATUS } from "../../../../services/codigo-status";

const prisma = new PrismaClient();

export default validar.corpo(schema.login, async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        await login(req, res);
        break;
      default:
        throw "Recurso não encontrado.";
    }
  } catch (erro) {
    res.status(400).json({
      timestamp: moment().format(),
      status: CODIGO_STATUS.ERRO.PROBLEMA_INESPERADO,
      erro: erro
    });
  }
});

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
}


