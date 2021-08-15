import moment from "moment";

/**
 * Responsável por capturar exceções disparadas ou vindas de funções assíncronas.
 */
export const capturarExcecoes = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (erro) {
        res.status(400).json({
            dataHora: moment().format(),
            status: erro.status,
            erro: erro.erro
        });
    }
}
