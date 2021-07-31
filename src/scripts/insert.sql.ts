export const SCRIPT_INSERT = {
    CREATE_SESSION: `INSERT INTO session (creation_date, id_adm, token) VALUES (now(), $1, $2)`
};
