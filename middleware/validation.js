import { CODE_STATUS } from "../services/code-status";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { OAuth2Client } from "google-auth-library";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

export const validateBody = (schema, handler, validateGoogleToken = false) => async (req, res) => {
    if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
        try {
            await schema.validate(req.body);
            if (validateGoogleToken){
                client.verifyIdToken({idToken: req.body.token, audience: CLIENT_ID})
                .then(()=> {
                    handler(req, res);
                }).catch(() => {
                    res.status(400).json({
                        timestamp: moment().locale("pt-br").format(),
                        codeStatus: CODE_STATUS.INVALID_TOKEN
                    });
                });
            }
            else{
                handler(req, res);
            }
        } catch (e) {
            res.status(400).json({
                timestamp: moment().locale("pt-br").format(),
                codeStatus: CODE_STATUS.INCORRECT_FIELDS
            });
        }
    }
    else if (validateGoogleToken) {
        handler(req, res);
    }
    else {
        res.status(404).end("Resource not found.");
    }
};

export const validateToken = (handler) => async (req, res) => {
    if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
        let openSession = await prisma.sessao.findFirst({ where: { token: req.body.token, valido: true } });
        if (openSession) {
            handler(req, res);
        } else {
            res.status(400).json({
                timestamp: moment().locale("pt-br").format(),
                codeStatus: CODE_STATUS.INVALID_TOKEN
            });
        }
    }
    else {
        res.status(404).end("Resource not found.");
    }
};
