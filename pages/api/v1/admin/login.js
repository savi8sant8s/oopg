import { PrismaClient } from "@prisma/client";
import { validateBody } from "../../../../middleware/validation";
import { CODE_STATUS } from "../../../../services/code-status";
import { loginSchema } from "../../../../services/schemas";
import moment from "moment";
import bcrypt from "bcrypt";
import randtoken from 'rand-token';

const prisma = new PrismaClient();

export default validateBody(loginSchema, async (req, res) => {
  if (req.method == "POST") {
    try {
      let response = {};
      response.timestamp = moment().locale("pt-br").format();

      let admin = await prisma.admin.findUnique({ where: { email: req.body.email } });
      if (!admin) {
        response.codeStatus = CODE_STATUS.ADMIN.LOGIN_USER_NOT_EXISTS;
        res.status(200).json(response);
      }

      let passwordValid = await bcrypt.compare(req.body.password, admin.senha);
      if (!passwordValid) {
        response.codeStatus = CODE_STATUS.ADMIN.LOGIN_INVALID_CREDENTIALS;
        res.status(200).json(response);
      }

      response.token = randtoken.generate(30);

      let lastSession = await prisma.sessao.findFirst({ where: { adminId: admin.id, valido: true } });
      if (lastSession) {
        await prisma.sessao.updateMany({ where: { adminId: lastSession.adminId }, data: { valido: false, dataAtualizacao: response.timestamp } });
      }
      await prisma.sessao.create({ data: { token: response.token, adminId: admin.id } });

      response.codeStatus = CODE_STATUS.ADMIN.LOGIN_SUCCESS;
      res.status(200).json(response);
    } catch (error) {
      res.status(400).end(error);
    }

  } else {
    res.status(400).end("Resource not found.");
  }
});

