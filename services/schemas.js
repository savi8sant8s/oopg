import * as yup from 'yup';

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
    descricao: yup.string().required(),
    convenioNumeroAno: yup.string().required(),
    convenioConcedente: yup.string().required(),
    convenioRepasse: yup.number().required(),
    convenioContrapartida: yup.number().required(),
    contratadoCpfCnpj: yup.string().required(),
    contratadoRazaoSocial: yup.string().required(),
    contratoNumeroAno: yup.string().required(),
    contratoDataInicio: yup.string().required(),
    contratoPrazo: yup.string().required(),
    contratoValorContratado: yup.number().required(),
    contratoDataConclusao: yup.string().required(),
    aditivoPrazoAditado: yup.string().required(),
    aditivoValorAditado: yup.string().required(),
    execucaoReajuste: yup.number().required(),
    execucaoNaturezaDespesa: yup.string().required(),
    execucaoValorMedidoAcumulado: yup.number().required(),
    execucaoValorPagoAcumuladoPeriodo: yup.number().required(),
    execucaoValorPagoAcumuladoExercicio: yup.number().required(),
    valorPagoAcumulado: yup.number().required(),
    situacao: yup.string().required(),
    categoria: yup.string().required()
  }),
    obras: yup.array().of(yup.object(
      {
        numeroLicitacao: yup.string().required(),
        descricao: yup.string().required(),
        convenioNumeroAno: yup.string().required(),
        convenioConcedente: yup.string().required(),
        convenioRepasse: yup.number().required(),
        convenioContrapartida: yup.number().required(),
        contratadoCpfCnpj: yup.string().required(),
        contratadoRazaoSocial: yup.string().required(),
        contratoNumeroAno: yup.string().required(),
        contratoDataInicio: yup.string().required(),
        contratoPrazo: yup.string().required(),
        contratoValorContratado: yup.number().required(),
        contratoDataConclusao: yup.string().required(),
        aditivoPrazoAditado: yup.string().required(),
        aditivoValorAditado: yup.string().required(),
        execucaoReajuste: yup.number().required(),
        execucaoNaturezaDespesa: yup.string().required(),
        execucaoValorMedidoAcumulado: yup.number().required(),
        execucaoValorPagoAcumuladoPeriodo: yup.number().required(),
        execucaoValorPagoAcumuladoExercicio: yup.number().required(),
        valorPagoAcumulado: yup.number().required(),
        situacao: yup.string().required(),
        categoria: yup.string().required()
      })
    ).required(),
  admin: yup.object({
    nome: yup.string().matches(/^[a-zA-ZàáâãèéêìíîòóôõùúûýçÀÁÂÃÈÉÊÌÍÎÒÓÔÕÙÚÛÝÇ ]{5,50}$/).required(),
    funcao: yup.string().matches(/^(GERAL|SUPORTE)$/).required(),
    email: yup.string().email().required()
  }),
  alteracaoSenha: yup.object({
    senha: yup.string().min(8).max(32).required()
  })
};

