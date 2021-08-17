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
export class Validacao {
    
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    /**
    * Middleware que verifica se corpo da requisição está de acordo com o esquema.
    */
    async corpo(schema) {
        await schema.validate(this.req.body).catch((erro) => {
            throw {
                status: CODIGO_STATUS.CORPO.CAMPOS_INCORRETOS,
                erro: erro
            };
        });
    }

    /**
    * Middleware que verifica se token informado pelo admin é válido.
    */
    async tokenAdmin() {
        if (!this.req.headers.authorization){
            throw {
                status: CODIGO_STATUS.SESSAO.TOKEN_INDEFINIDO,
                erro: "Token do adminstrador não definido."
            };
        }
        else{
            let token = this.req.headers.authorization.split(' ')[1];
            let sessaoAberta = await prisma.sessao.findFirst({ where: { token: token, valido: true } });
            if (!sessaoAberta) {
                throw {
                    status: CODIGO_STATUS.SESSAO.TOKEN_INVALIDO,
                    erro: "Token do adminstrador inválido."
                };
            }
        } 
    }

    /**
     * Middleware que verifica se token google informado pelo cliente é válido.
     */
    async tokenGoogle() {
        if (!this.req.headers.authorization){
            throw {
                status: CODIGO_STATUS.SESSAO.TOKEN_INDEFINIDO,
                erro: "Token google do cliente não definido."
            };
        } else {
            let token = this.req.headers.authorization.split(' ')[1];
            await client.verifyIdToken({ idToken: token, audience: CLIENT_ID }).catch(() => {
                throw {
                    status: CODIGO_STATUS.SESSAO.TOKEN_INVALIDO,
                    erro: "Token google do cliente inválido."
                };
            });
        } 
    }

    /**
     * Middleware que verifica se obra existe.
     */
    async obraExiste() {
        let existe = await prisma.obra.findUnique({ where: { id: Number(this.req.query.obraId) } });
        if (!existe) {
            throw {
                status: CODIGO_STATUS.OBRA.NAO_EXISTE,
                erro: `Obra com o ID ${this.req.query.obraId} não existe.`
            };
        }
    }

    /**
     * Middleware que verifica se notícia existe.
     */
    async noticiaExiste() {
        let existe = await prisma.noticia.findUnique({ where: { id: Number(this.req.query.noticiaId) } });
        if (!existe) {
            throw {
                status: CODIGO_STATUS.NOTICIA.NAO_EXISTE,
                erro: `Notícia com o ID ${this.req.query.noticiaId} não existe.`
            };
        }
    }
     /**
     * Middleware que verifica se a categoria existe.
     */
    categoriaExiste(){
        let categoria = this.req.query.categoria.toUpperCase();
        let regex = new RegExp(/^(SAUDE|EDUCACAO|ASSISTENCIASOCIAL|URBANISMO|ADMINISTRACAO)$/);
        let existe = regex.test(categoria);
        if (!existe){
            throw {
                status: CODIGO_STATUS.FILTRO_OBRAS.CATEGORIA_NAO_EXISTE,
                erro: `Categoria ${categoria} não existe.`
            }; 
        }
    }

     /**
     * Middleware que verifica se o tipo de ordem existe.
     */
    tipoOrdemExiste(){
        let ordenar = this.req.query.ordenar.toUpperCase();
        let regex = new RegExp(/^(RECENTE|ANTIGO)$/);
        let existe = regex.test(ordenar);
        if(!existe){
            throw{
                status: CODIGO_STATUS.FILTRO_OBRAS.TIPO_ORDEM_NAO_EXISTE,
                erro: `Tipo de ordem ${ordenar} não existe.`
            }
        }
    }
    /**
     * Middleware que verifica se o valor informado é um número.
     */
    quantidadeValida(){
        let quantidade = Number(this.req.query.quantidade);
        if(isNaN(quantidade)){
            throw{
                status: CODIGO_STATUS.FILTRO_OBRAS.QUANTIDADE_INVALIDA,
                erro: `O valor informado ${quantidade} não é válido.`
            }
        }
    }

    /**
     * Middleware para verificar se método HTTP especificado é o correto.
     */
    metodo(nomeMetodo) {
        if (!nomeMetodo.includes(this.req.method)) {
            throw {
                status: CODIGO_STATUS.ERRO.PROBLEMA_INESPERADO,
                erro: "Recurso não encontrado."
            };
        }
    }
}


