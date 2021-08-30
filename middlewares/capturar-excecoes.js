import moment from "moment";
import { STATUS } from "../services/codigo-status";

export const capturarExcecoes = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (erro) {
        if (erro.status && erro.erro){
            res.status(200).json({
                dataHora: moment().format(),
                status: erro.status,
                erro: erro.erro
            });
        } else{
            console.log(erro);
            res.status(500).json({
                dataHora: moment().format(),
                status: STATUS.ERRO.PROBLEMA_INESPERADO,
                erro: "Contate o mantenedor do observatório."
            });
        }
        
    }
}
