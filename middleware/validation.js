import { CODE_STATUS } from "../services/code-status";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const validateBody = (schema, handler) => async (req, res) => {
    if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
        try {
            await schema.validate(req.body);
            handler(req, res);
        } catch (e) {
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.INCORRECT_FIELDS;
            res.status(400).json(response);
        }
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
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.INVALID_TOKEN;
            response.status(200).json(response);
        }
    }
    else {
        res.status(404).end("Resource not found.");
    }
};

export const validateAdminPermission = (handler) => async (req, res) => {
    if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
        let openSession = await prisma.sessao.findFirst({ where: { token: req.body.token, valido: true } });
        if (openSession) {
            handler(req, res);
        } else {
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            response.codeStatus = CODE_STATUS.INVALID_TOKEN;
            response.status(200).json(response);
        }
    }
    else {
        res.status(404).end("Resource not found.");
    }
};