/**
 * Dispara uma exceção referente ao passo de validação da api.
 */
export default dispararExcecao = (status, erro) => {
    throw {
        status: status,
        erro: erro
    };
}