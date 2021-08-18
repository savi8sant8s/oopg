export const dispararExcecao = (status, erro) => {
    throw {
        status: status,
        erro: erro
    };
}