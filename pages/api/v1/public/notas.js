import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";
import { validateBody } from "../../../../middleware/validation";
import { noteSchema } from "../../../../services/schemas";

const prisma = new PrismaClient();
const validateGoogleToken = true;

export default validateBody(noteSchema, async (req, res) => {
    if (req.query.obraId) {
        switch (req.method) {
            case "GET":
                let response = {};
                response.timestamp = moment().locale("pt-br").format();
                response.codeStatus = CODE_STATUS.ALL_CONSTRUCTION_NOTES_SUCCESS;
                response.like = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 3 } });
                response.indifferent = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 2 } });
                response.dislike = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 1 } });
                res.status(200).json(response);
                break;
            case "POST":
                let response = {};
                response.timestamp = moment().locale("pt-br").format();
                let noteAlreadyexists = await prisma.nota.findUnique({ where: { email: req.body.email } });
                if (noteAlreadyexists) {
                    response.codeStatus = CODE_STATUS.CONSTRUCTION_NOTE_ALREADY_EXISTS;
                    res.status(200).json(response);
                }
                else {
                    await prisma.nota.create({ data: { email: req.body.email, nota: Number(req.body.note), obraId: Number(req.query.obraId) } });
                    response.codeStatus = CODE_STATUS.CONSTRUCTION_NOTE_ADDED_SUCCESS;
                    res.status(200).json(response);
                }
                break;
        }
    }
    else {
        res.status(404).end("Resource not found.");
    }
}, validateGoogleToken);
