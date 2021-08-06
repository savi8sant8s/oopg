import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required()
});

export const logoutSchema = yup.object({
  token: yup.string().min(30).max(30).required()
});

export const noteSchema = yup.object({
  email: yup.string().email().required(),
  note: yup.string().matches(/^[123]{1}$/).required()
});

export const commentSchema = yup.object({
  title: yup.string().min(5).max(20).required(),
  msg: yup.string().min(5).max(50).required(),
  username: yup.string().min(5).max(50).required(),
  imageUrl: yup.string().min(80).max(100).required(),
  email: yup.string().email().required(),
  note: yup.string().matches(/^[123]{1}$/).required()
});