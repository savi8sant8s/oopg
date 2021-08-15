import moment from "moment";
import { CODIGO_STATUS } from "../services/codigo-status";

/**
 * Responsável por capturar exceções disparadas ou vindas de funções assíncronas.
 */
export const capturarExcecoes = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (erro) {
        if (erro.status && erro.erro){
            res.status(400).json({
                dataHora: moment().format(),
                status: erro.status,
                erro: erro.erro
            });
        } else{
            console.log(erro);
            res.status(400).json({
                dataHora: moment().format(),
                status: CODIGO_STATUS.ERRO.PROBLEMA_INESPERADO,
                erro: "Contate o mantenedor do observatório."
            });
        }
        
    }
}
