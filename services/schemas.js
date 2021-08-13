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
};
