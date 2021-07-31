import { Router } from 'express';
import AdmAuthController from '../controllers/adm.auth.controller';
import { body } from 'express-validator';

const admAuthController = new AdmAuthController();

export default Router()
                .post(
                    '/login', 
                    body('email').isEmail(),
                    body('password').isLength({ min: 8, max: 32 }),
                    admAuthController.login)
