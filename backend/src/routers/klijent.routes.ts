import express from 'express'
import { KlijentController } from '../controllers/klijent.controller';

const klijentRouter = express.Router();

klijentRouter.route('/login').post(
    (req, res)=>new KlijentController().login(req, res)
)

klijentRouter.route('/register').post(
    (req, res)=>new KlijentController().register(req, res)
)

klijentRouter.route('/checkUsername').post(
    (req, res)=>new KlijentController().checkUsername(req, res)
)

klijentRouter.route('/checkEmail').post(
    (req, res)=>new KlijentController().checkEmail(req, res)
)

klijentRouter.route('/update').post(
    (req, res)=> new KlijentController().update(req, res)
)

klijentRouter.route('/promeniLozinku').post(
    (req, res)=> new KlijentController().promeniLozinku(req, res)
)

klijentRouter.route('/promeniLozinkuAdmin').post(
    (req, res)=> new KlijentController().promeniLozinkuAdmin(req, res)
)

klijentRouter.route('/delete').post(
    (req, res)=> new KlijentController().delete(req, res)
)

klijentRouter.route('/searchKlijent').post(
    (req, res) => new KlijentController().searchKlijent(req, res)
)

klijentRouter.route('/getAllKlijent').get(
    (req, res)=> new KlijentController().getAllKlijent(req, res)
)

export default klijentRouter;