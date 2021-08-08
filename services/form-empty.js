export default function formEmpty(form) {
    for (let field in form) {
        if (form[field] == "" ||
            form[field] == null ||
            form[field] == undefined) {
            return true;
        }
    }
    return false;
}