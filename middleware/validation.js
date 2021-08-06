import { CODE_STATUS } from "../services/code-status";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { OAuth2Client } from "google-auth-library";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

export const validateBody = (schema, handler) => async (req, res) => {
    try {
        await schema.validate(req.body);
        handler(req, res);
    } catch (e) {
        res.status(400).json({
            timestamp: moment().locale("pt-br").format(),
            codeStatus: CODE_STATUS.INCORRECT_FIELDS
        });
    }
};

export const validateAdminToken = (handler) => async (req, res) => {
    let openSession = await prisma.sessao.findFirst({ where: { token: req.body.token, valido: true } });
    if (openSession) {
        handler(req, res);
    } else {
        res.status(400).json({
            timestamp: moment().locale("pt-br").format(),
            codeStatus: CODE_STATUS.INVALID_TOKEN
        });
    }
};

export const validateGoogleToken = (handler) => async (req, res) => {
    client.verifyIdToken({ idToken: req.body.token, audience: CLIENT_ID })
        .then(() => {
            handler(req, res);
        }).catch(() => {
            res.status(400).json({
                timestamp: moment().locale("pt-br").format(),
                codeStatus: CODE_STATUS.INVALID_TOKEN
            });
        });
}