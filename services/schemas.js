import * as yup from 'yup';

/**
 * Esquemas de corpo aceitos pela API e formulários das páginas.
 */
export const schema = {
  login: yup.object({
    email: yup.string().email().required(),
    senha: yup.string().min(8).max(32).required()
  }),
  nota: yup.object({
    email: yup.string().email().required(),
    nota: yup.string().matches(/^[123]{1}$/).required()
  }),
  comentario: yup.object({
    titulo: yup.string().min(5).max(20).required(),
    mensagem: yup.string().min(5).max(50).required(),
    nomeUsuario: yup.string().min(5).max(50).required(),
    imagemUrl: yup.string().url().min(80).max(100).required(),
    email: yup.string().email().required()
  }),
  noticia: yup.object({
    titulo: yup.string().min(5).max(20).required(),
    mensagem: yup.string().min(5).max(50).required(),
    link: yup.string().url().min(5).max(100).required(),
    imagemUrl: yup.string().url().min(10).max(100).required()
  }),
  obra: yup.object({
    numeroLicitacao: yup.string().required(),
    descricao: yup.string().min(10).max(100).required(),
    convenioNumeroAno: yup.string().required(),
    convenioConcedente: yup.string().required(),
    convenioRepasse: yup.number().required(),
    convenioContrapartida: yup.number().required(),
    contratadoCpfCcnpj: yup.string().min(11).max(14).required(),
    contratadoRazaoSocial: yup.string().min(5).max(30).required(),
    contratoNumeroAno: yup.string().required(),
    contratoDataInicio: yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/).required(),
    contratoPrazo: yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/).required(),
    contratoValorContratado: yup.number().required(),
    contratoDataConclusao: yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/).required(),
    aditivoPrazoAditado: yup.string().required(),
    aditivoValorAditado: yup.string().required(),
    execucaoReajuste: yup.number().required(),
    execucaoNaturezaDespesa: yup.string().min(5).max(50).required(),
    execucaoValorMedidoAcumulado: yup.number().required(),
    execucaoValorPagoAcumuladoPeriodo: yup.number().required(),
    execucaoValorPagoAcumuladoExercicio: yup.number().required(),
    valorPagoAcumulado: yup.number().required(),
    situacao: yup.string().matches(/^(CONCLUIDO|ANDAMENTO|PARALIZADO)$/).required(),
    categoria: yup.string().matches(/^(SAUDE|EDUCACAO|ASSISTENCIASOCIAL|ADMINISTRACAO|URBANISMO)$/).required()
  })
};

