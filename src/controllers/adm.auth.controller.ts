import pool from '../dbconfig/dbconnector';
import { SCRIPT_SELECT } from '../scripts/select.sql';
import checkBody from '../services/check-body.service';
import moment from "moment";
import { CODE_STATUS } from '../services/code-status.service';
import bcrypt from "bcrypt";
import randtoken from 'rand-token';
import { SCRIPT_INSERT } from '../scripts/insert.sql';
import { SCRIPT_UPDATE } from '../scripts/update.sql';

export default class AdmAuthController {

    public async login(req, res) {
        const pgClient = await pool.connect();

        try {
            //Verificar os campos
            let checkFields = checkBody(req, res);
            if (checkFields.error){
                return res.send(checkFields.errors);
            }
            let response: any = {};
            response.timestamp = moment().format();                       

            //Verificar se usuário existe
            let checkEmail = await pgClient.query(SCRIPT_SELECT.CHECK_EMAIL, [req.body.email]);
            let credentialsExist = checkEmail.rows[0].result;
            if (!credentialsExist) {
                response.status = CODE_STATUS.USER_NOT_EXISTS;
                return res.send(response);
            }

            //Verificar se senha é válida
            let getHashFromEmail = await pgClient.query(SCRIPT_SELECT.GET_HASH, [req.body.email]);
            let hash = getHashFromEmail.rows[0].password;
            let passwordValid = await bcrypt.compare(req.body.password, hash);
            if (!passwordValid){
                response.status = CODE_STATUS.INVALID_CREDENTIALS;
                return res.send(response);
            }

            //Gerar token e criar sessão para o usuário
            let token = randtoken.generate(28);
            let getId = await pgClient.query(SCRIPT_SELECT.GET_ID, [req.body.email]);
            await pgClient.query(SCRIPT_UPDATE.CLOSE_SESSION, [getId.rows[0].id]);
            await pgClient.query(SCRIPT_INSERT.CREATE_SESSION, [getId.rows[0].id, token]);
            response.status = CODE_STATUS.LOGIN_SUCCESS;
            response.token = token;
            return res.send(response);
        } catch (error) {
            res.status(400).send(error);
        } finally {
            pgClient.release();
        }
    }
}