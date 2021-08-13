import { CODIGO_STATUS } from "../services/codigo-status";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import moment from "moment";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

moment().locale("pt-br");

const timestamp = moment().format();

export const validar = {
    corpo: (schema, handler) => async (req, res) => {
        try {
            await schema.validate(req.body);
            handler(req, res);
        } catch (erro) {
            res.status(400).json({
                timestamp: timestamp,
                status: CODIGO_STATUS.CORPO.CAMPOS_INCORRETOS,
                erro: erro
            });
        }
    },
    tokenAdmin: (handler) => async (req, res) => {
        let token = req.headers.authorization.split(' ')[1];
        let sessaoAberta = await prisma.sessao.findFirst({ where: { token: token, valido: true } });
        if (sessaoAberta) {
            handler(req, res);
        } else {
            res.status(400).json({
                timestamp: timestamp,
                status: CODIGO_STATUS.SESSAO.TOKEN_INVALIDO
            });
        }
    },
    tokenGoogle: (handler) => async (req, res) => {
        let token = req.headers.authorization.split(' ')[1];
        client.verifyIdToken({ idToken: token, audience: CLIENT_ID })
            .then(() => {
                handler(req, res);
            }).catch(() => {
                res.status(400).json({
                    timestamp: timestamp,
                    status: CODIGO_STATUS.SESSAO.TOKEN_INVALIDO
                });
            });
    }
}
