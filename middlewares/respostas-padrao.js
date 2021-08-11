export const respostaPadrao = {
    erroInesperado: (res, erro) => {
        res.status(400).end(erro);
    },
    recursoNaoDisponivel: (res) => {
        res.status(400).end("Recurso não encontrado.");
    }
}