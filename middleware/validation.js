import { CODE_STATUS } from "../services/code-status";

export const validateBody = (schema, handler) => async (req, res) => {
    if (req.method == "POST" || req.method == "PUT") {
        try {
            await schema.validate(req.body);
            handler(req, res);
        } catch (e) {
            res.status(400).json({ codeStatus: CODE_STATUS.INCORRECT_FIELDS, error: e });
        }
    }
    else {
        res.status(404).end("<p>Resource not found.</p>");
    }
};

