import { CODIGO_STATUS } from "../services/codigo-status";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import moment from "moment";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

moment().locale("pt-br");

/**
 * Responsável por disponibilizar alguns middlewares para filtrar requisições.
 */
export const validar = {
     /**
     * Middleware que verifica se corpo da requisição está de acordo com o esquema.
     */
    corpo: async (schema, req, _res) => {
        schema.validate(req.body).catch((erro)=>{
            throw { 
                status: CODIGO_STATUS.CORPO.CAMPOS_INCORRETOS, 
                erro: erro 
            };
        });
    },
     /**
     * Middleware que verifica se token informado pelo admin é válido.
     */
    tokenAdmin: async (req, _res) => {
        let token = req.headers.authorization.split(' ')[1];
        let sessaoAberta = await prisma.sessao.findFirst({ where: { token: token, valido: true } });
        if (!sessaoAberta) {
            throw { 
                status: CODIGO_STATUS.SESSAO.TOKEN_INVALIDO,
                erro: "Token do adminstrador inválido."
            };
        }
    },
    /**
     * Middleware que verifica se token google informado pelo cliente é válido.
     */
    tokenGoogle: async (req, _res) => {
        let token = req.headers.authorization.split(' ')[1];
        client.verifyIdToken({ idToken: token, audience: CLIENT_ID }).catch(() => {
            throw {
                status: CODIGO_STATUS.SESSAO.TOKEN_INVALIDO,
                erro: "Token google do cliente inválido."
            };
        });
    },
    /**
     * Middleware que verifica se obra existe.
     */
    obraExiste: async (req, _res) =>{
        let existe = await prisma.obra.findUnique({ where: { id: Number(req.query.obraId) } });
        if (!existe) {
            throw { 
                status: CODIGO_STATUS.OBRA.OBRA_NAO_EXISTE,
                erro: `Obra com o ID ${req.query.obraId} não existe.` 
            };
        }
    },
    /**
     * Middleware que verifica se noticia existe.
     */
     noticiaExiste: async (req, _res) => {
        let existe = await prisma.noticia.findUnique({ where: { id: Number(req.query.noticiaId) } });
        if (!existe) {
            throw { 
                status: CODIGO_STATUS.NOTICIA.NOTICIA_NAO_EXISTE,
                erro: `Notícia com o ID ${req.query.noticiaId} não existe.` 
            };
        }
    }
}

/**
 * Responsável por capturar exceções disparadas ou vindas de funções assíncronas.
 */
export const capturarExcecoes = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (erro) {
        res.status(400).json({
            timestamp: moment().format(),
            status: erro.status,
            erro: erro.erro
        });
    }
}

/**
 * Mensagem de erro padrão caso o usuário tenha chamado um método HTTP não implementado.
 */

export const mensagemErroPadrao = {
    status: CODIGO_STATUS.ERRO.PROBLEMA_INESPERADO,
    erro: "Recurso não encontrado."
}