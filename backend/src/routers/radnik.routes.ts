import express from 'express'
import { RadnikController } from '../controllers/radnik.controller';

const radnikRouter = express.Router();

radnikRouter.route('/getAllRadnici').post(
    (req, res)=> new RadnikController().getAllRadnici(req, res)
)

radnikRouter.route('/getAllRadniciAdmin').get(
    (req, res)=> new RadnikController().getAllRadniciAdmin(req, res)
)

radnikRouter.route('/register').post(
    (req, res)=> new RadnikController().register(req, res)
)

radnikRouter.route('/checkEmail').post(
    (req, res)=> new RadnikController().checkEmail(req, res)
)

radnikRouter.route('/checkImePrezime').post(
    (req, res)=> new RadnikController().checkImePrezime(req, res)
)

radnikRouter.route('/odobriRadnike').post(
    (req, res)=> new RadnikController().odobriRadnike(req, res)
)

radnikRouter.route('/odbiRadnike').post(
    (req, res)=> new RadnikController().odbiRadnike(req, res)
)

export default radnikRouter;