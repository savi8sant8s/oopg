import express from 'express';
import authRouter from './routers/auth.router';
import pool from './dbconfig/dbconnector';
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import SCRIPT_CREATE from './scripts/create.sql';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 900 });
        this.app.use(limiter);
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan("combined"));
        this.app.use(express.json());
    }

    private dbConnect() {
        pool.connect(async function (err, client, done) {
            if (err) throw new Error(err);
            console.log("POSTGRES CONECTADO...");
            await client.query(SCRIPT_CREATE.TABLE_AUTH);
            await client.query(SCRIPT_CREATE.TABLE_SESSION);
            client.release();
        });
    }

    private routerConfig() {
        this.app.use("/api/v1/adm", authRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;