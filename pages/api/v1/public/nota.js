import { PrismaClient } from "@prisma/client";
import { CODE_STATUS } from "../../../../services/code-status";
import moment from "moment";
import { validateBody, validateGoogleToken } from "../../../../middleware/validation";
import { noteSchema } from "../../../../services/schemas";

const prisma = new PrismaClient();

export default validateBody(noteSchema, validateGoogleToken(async (req, res) => {
    if (req.method == "POST" && req.query.obraId) {
        try {
            let response = {};
            response.timestamp = moment().locale("pt-br").format();
            let noteAlreadyexists = await prisma.nota.findUnique({ where: { email: req.body.email } });
            if (noteAlreadyexists) {
                response.codeStatus = CODE_STATUS.CONSTRUCTION_NOTE_ALREADY_EXISTS;
            }
            else {
                await prisma.nota.create({ data: { email: req.body.email, nota: Number(req.body.note), obraId: Number(req.query.obraId) } });
                response.codeStatus = CODE_STATUS.CONSTRUCTION_NOTE_ADDED_SUCCESS;
            }
            res.status(200).json(response);
        } catch (error) {
            res.status(400).end(error);
        }
    } else{
        res.status(400).end("Resource not found.");
    }
}));
