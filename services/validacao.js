import { STATUS } from "./codigo-status";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import { dispararExcecao } from "./erro-padrao";

import moment from "moment";
import bcrypt from "bcrypt";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

moment().locale("pt-br");

/**
 * Responsável por disponibilizar algumas validações.
 */
export class Validacao {
    
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    /**
    * Verifica se corpo da requisição está de acordo com o esquema.
    */
    async corpo(schema) {
        await schema.validate(this.req.body).catch((erro) => {
            dispararExcecao(STATUS.CORPO.CAMPOS_INCORRETOS, erro);
        });
    }

    /**
    * Verifica se admin tem permissão de manipular outros admins.
    */
    async podeManipularAdmins() {
        let admin = await pegarAdminViaToken();
        if (admin.funcao == "SUPORTE") {
            dispararExcecao(STATUS.ADMIN.OPERACAO_NAO_PERMITIDA, "Você não tem permissão para criar, alterar ou deletar outros admins.");
        }
    }

    /**
    * Quer saber se admin já realizou primeiro acesso ou não.
    */
    async primeiroAcesso(resposta){
        let admin = await pegarAdminViaToken();
        if (resposta && admin.primeiroAcesso){
            dispararExcecao(STATUS.ADMIN.JA_REALIZOU_PRIMEIRO_ACESSO, "Você já realizou o primeiro acesso.");
        }
        else if (!resposta && !admin.primeiroAcesso){
            dispararExcecao(STATUS.ADMIN.NAO_REALIZOU_PRIMEIRO_ACESSO, "Você ainda não realizou o primeiro acesso.");
        }
    }

    /**
    * Verifica se token é válido.
    */
    async token(usuario) {
        if (!this.req.headers.authorization) {
            dispararExcecao(STATUS.SESSAO.TOKEN_INDEFINIDO, "Token não definido.");
        }
        let token = this.req.headers.authorization.split(' ')[1];
        if (usuario == "ADMIN") {
            let sessaoAberta = await prisma.sessao.findFirst({ where: { token: token, valido: true } });
            if (!sessaoAberta) {
                dispararExcecao(STATUS.SESSAO.TOKEN_INVALIDO, "Token do adminstrador inválido.");
            }
        } else if (usuario == "CLIENTE_GOOGLE") {
            await client.verifyIdToken({ idToken: token, audience: CLIENT_ID }).catch(() => {
                dispararExcecao(STATUS.SESSAO.TOKEN_INVALIDO, "Token google do cliente inválido.");
            });
        }
    }

    /**
     * Verifica se obra existe.
     */
    async obraExiste() {
        let existe = await prisma.obra.findUnique({ where: { id: Number(this.req.query.obraId) } });
        if (!existe) {
            dispararExcecao(STATUS.OBRA.NAO_EXISTE,`Obra com o ID ${this.req.query.obraId} não existe.`);
        }
    }

    /**
     * Verifica se senha do admin informada no login é válida.
     */
    async senhaAdmin(adminSenha) {
        let senhaValida = await bcrypt.compare(this.req.body.senha, adminSenha);
        if (!senhaValida) {
            dispararExcecao(STATUS.ADMIN.LOGIN_CREDENCIAIS_INVALIDAS,`Credenciais inválidas.`);
        }
    }

    /**
     * Quer saber se admin com esse email já existe ou não.
     */
    async adminEmailExiste(rota) {
        let existe = await prisma.admin.findUnique({ where: { email: this.req.body.email } });
        if (rota == "LOGIN" && !existe) {
            dispararExcecao(STATUS.ADMIN.LOGIN_CREDENCIAIS_INVALIDAS, `Credenciais inválidas.`);
        }
        else if (rota == "CADASTRO_ADMIN" && existe) {
            dispararExcecao(STATUS.ADMIN.EMAIL_JA_EXISTE, `O email ${this.req.body.email} já está cadastrado.`);
        }
    }

     /**
     * Verifica se admin com esse id já existe.
     */
      async adminIdExiste() {
        let existe = await prisma.admin.findUnique({ where: { id: Number(this.req.query.adminId) } });
        if (!existe) {
            dispararExcecao(STATUS.ADMIN.NAO_EXISTE,`O Admin com o ID ${this.req.query.adminId} não existe.`);
        }
    }

    /**
     * Verifica se notícia existe.
     */
    async noticiaExiste() {
        let existe = await prisma.noticia.findUnique({ where: { id: Number(this.req.query.noticiaId) } });
        if (!existe) {
            dispararExcecao(STATUS.NOTICIA.NAO_EXISTE,`Notícia com o ID ${this.req.query.noticiaId} não existe.`);
        }
    }

     /**
     * Verifica se a categoria existe.
     */
    categoriaExiste(){
        let categoria = this.req.query.categoria.toUpperCase();
        let regex = new RegExp(/^(SAUDE|EDUCACAO|ASSISTENCIASOCIAL|URBANISMO|ADMINISTRACAO)$/);
        let existe = regex.test(categoria);
        if (!existe){
            dispararExcecao(STATUS.FILTRO_OBRAS.CATEGORIA_NAO_EXISTE,`Categoria ${categoria} não existe.`); 
        }
    }

     /**
     * Verifica se o tipo de ordem existe.
     */
    tipoOrdemExiste(){
        let ordenar = this.req.query.ordenar.toUpperCase();
        let regex = new RegExp(/^(RECENTE|ANTIGO)$/);
        let existe = regex.test(ordenar);
        if(!existe){
            dispararExcecao(STATUS.FILTRO_OBRAS.TIPO_ORDEM_NAO_EXISTE,`Tipo de ordem ${ordenar} não existe.`);
        }
    }

    /**
     * Verifica se o valor informado é um número.
     */
    quantidadeValida(){
        let quantidade = Number(this.req.query.quantidade);
        if(isNaN(quantidade)){
            dispararExcecao(STATUS.FILTRO_OBRAS.QUANTIDADE_INVALIDA,`O valor ${quantidade} informado não é válido.`);
        }
    }

    /**
     * Verifica se método HTTP especificado é o correto e disponível pela api.
     */
    metodo(nomeMetodo) {
        if (!nomeMetodo.includes(this.req.method)) {
            dispararExcecao(STATUS.ERRO.PROBLEMA_INESPERADO, "Recurso não encontrado.");
        }
    }

    async pegarAdminViaToken(){
        let token = this.req.headers.authorization.split(' ')[1];
        let sessaoAberta = await prisma.sessao.findFirst({ where: { token: token, valido: true } });
        let admin = await prisma.admin.findUnique({ where: { id: sessaoAberta.adminId } });
        return admin;
    }
}


