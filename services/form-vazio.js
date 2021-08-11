export default function formVazio(form) {
    for (let campo in form) {
        if (form[campo] == "" ||
            form[campo] == null ||
            form[campo] == undefined) {
            return true;
        }
    }
    return false;
}