export const SCRIPT_UPDATE = {
    CLOSE_SESSION: `UPDATE session SET updated_date = now(), valid = FALSE WHERE id_adm = $1`
};
