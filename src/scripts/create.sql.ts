const SCRIPT_CREATE = {
    TABLE_AUTH:
        `CREATE TABLE IF NOT EXISTS adm (
            id_adm SERIAL PRIMARY KEY NOT NULL,
            creation_date DATE NOT NULL,
            updated_date DATE,
            type INTEGER NOT NULL,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(60) NOT NULL
        )` ,
    TABLE_SESSION:
        `CREATE TABLE IF NOT EXISTS session (
            id_session SERIAL PRIMARY KEY NOT NULL,
            creation_date DATE NOT NULL,
            updated_date DATE,
            id_adm BIGINT NOT NULL,
            valid BOOLEAN NOT NULL DEFAULT TRUE,
            token VARCHAR(28) NOT NULL,
            FOREIGN KEY(id_adm) REFERENCES adm(id_adm)
        )` 
};

export default SCRIPT_CREATE;