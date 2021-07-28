import pool from '../dbconfig/dbconnector';
import SCRIPT_SELECT from '../scripts/select.sql';

class AuthController {

    public async post(req, res) {
        try {
            const pgClient = await pool.connect();
            const adm = req.body;
            const { rows } = await pgClient.query(SCRIPT_SELECT.CHECK_CREDENTIALS, [adm.email, adm.password]);
            const todos = rows;
            pgClient.release();
            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default AuthController;