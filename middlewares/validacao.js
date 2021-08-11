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
        } catch (e) {
            res.status(400).json({
                timestamp: timestamp,
                status: CODIGO_STATUS.CORPO.CAMPOS_INCORRETOS
            });
        }
    },
    tokenAdmin: (handler) => async (req, res) => {
        let openSession = await prisma.sessao.findFirst({ where: { token: req.body.token, valido: true } });
        if (openSession) {
            handler(req, res);
        } else {
            res.status(400).json({
                timestamp: timestamp,
                status: CODIGO_STATUS.SESSAO.TOKEN_INVALIDO
            });
        }
    },
    tokenGoogle: (handler) => async (req, res) => {
        client.verifyIdToken({ idToken: req.body.token, audience: CLIENT_ID })
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
