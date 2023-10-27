import express from 'express'
import { AgencijaController } from '../controllers/agencije.controller';

const agencijaRouter = express.Router();

agencijaRouter.route('/login').post(
    (req, res)=>new AgencijaController().login(req, res)
)

agencijaRouter.route('/getAllAgencija').get(
    (req, res)=> new AgencijaController().getAllAgencija(req, res)
)

agencijaRouter.route('/promeniLozinku').post(
    (req, res)=> new AgencijaController().promeniLozinku(req, res)
)

agencijaRouter.route('/delete').post(
    (req, res)=> new AgencijaController().delete(req, res)
)

agencijaRouter.route('/searchAgencija').post(
    (req, res) => new AgencijaController().searchAgencija(req, res)
)

agencijaRouter.route('/sortByAddress').post(
    (req, res) => new AgencijaController().sortByAddress(req, res)
)

agencijaRouter.route('/sortByName').post(
    (req, res) => new AgencijaController().sortByName(req, res)
)

agencijaRouter.route('/update').post(
    (req, res)=> new AgencijaController().update(req, res)
)

agencijaRouter.route('/register').post(
    (req, res)=>new AgencijaController().register(req, res)
)

agencijaRouter.route('/checkUsername').post(
    (req, res)=>new AgencijaController().checkUsername(req, res)
)

agencijaRouter.route('/findAgencija').post(
    (req, res)=>new AgencijaController().checkUsername(req, res)
)

agencijaRouter.route('/checkEmail').post(
    (req, res)=>new AgencijaController().checkEmail(req, res)
)

agencijaRouter.route('/findKomentar').post(
    (req, res)=>new AgencijaController().findKomentar(req, res)
)

agencijaRouter.route('/updateKomentar').post(
    (req, res)=>new AgencijaController().updateKomentar(req, res)
)

agencijaRouter.route('/addKomentar').post(
    (req, res)=>new AgencijaController().addKomentar(req, res)
)

export default agencijaRouter;