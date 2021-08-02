import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required()
});

export const logoutSchema = yup.object({
  token: yup.string().min(30).max(30).required()
});
