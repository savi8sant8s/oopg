export const SCRIPT_SELECT = {
    GET_HASH: `SELECT password FROM adm WHERE "email" = $1`,
    GET_ID: `SELECT id_adm as id FROM adm WHERE "email" = $1` ,
    CHECK_EMAIL: `SELECT COALESCE ((SELECT 1 FROM adm WHERE "email" = $1), 0) AS result` ,
};
