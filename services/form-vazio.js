/**
 * Verifica se todos os campos do formulário estão preenchidos.
 */
export default formVazio = (form) => {
    for (let campo in form) {
        if (form[campo] == "" ||
            form[campo] == null ||
            form[campo] == undefined) {
            return true;
        }
    }
    return false;
}