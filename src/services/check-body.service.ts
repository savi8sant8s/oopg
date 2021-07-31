import { validationResult } from "express-validator";

export default function checkBody(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return { error: true, errors: errors };
    }
    return { error: false, errors: []};
}