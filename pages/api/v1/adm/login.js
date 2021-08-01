import { PrismaClient } from "@prisma/client";
import { validateBody } from "../../../../middleware/validation";
import { CODE_STATUS } from "../../../../services/code-status";
import { loginSchema } from "../../../../services/schemas";
import moment from "moment";
import bcrypt from "bcrypt";
import randtoken from 'rand-token';

const prisma = new PrismaClient();

export default validateBody(loginSchema, async (req, res) => {
  let response = {};
  response.timestamp = moment().locale("pt-br").format();

  let adm = await prisma.adm.findUnique({ where: { email: req.body.email } });
  if (!adm) {
    response.codeStatus = CODE_STATUS.USER_NOT_EXISTS;
    res.status(200).json(response);
  }

  let passwordValid = await bcrypt.compare(req.body.password, adm.password);
  if (!passwordValid) {
    response.codeStatus = CODE_STATUS.INVALID_CREDENTIALS;
    res.status(200).json(response);
  }

  response.token = randtoken.generate(30);

  let lastSession = await prisma.session.findFirst({where: { admId: adm.id, valid: true}});
  if (lastSession){
    await prisma.session.updateMany({where: {admId: lastSession.admId}, data: {valid: false, updatedDate: response.timestamp}});
  }
  await prisma.session.create({data: { token: response.token, admId: adm.id}});

  response.codeStatus = CODE_STATUS.LOGIN_SUCCESS;
  res.status(200).json(response);
});

