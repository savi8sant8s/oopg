const SCRIPT_SELECT = {
    CHECK_CREDENTIALS: `SELECT COALESCE ((SELECT 1 FROM adm WHERE "email" = $1 AND "password" = $2), 0) AS result    ` ,
};

export default SCRIPT_SELECT;