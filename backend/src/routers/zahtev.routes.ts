import express from 'express'
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();

zahtevRouter.route('/getAllZahtev').get(
    (req, res)=> new ZahtevController().getAllZahtev(req, res)
)

zahtevRouter.route('/register').post(
    (req, res)=> new ZahtevController().register(req, res)
)

zahtevRouter.route('/novZahtevRadnike').post(
    (req, res)=> new ZahtevController().novZahtevRadnike(req, res)
)

zahtevRouter.route('/updateZahtevRadnike').post(
    (req, res)=> new ZahtevController().updateZahtevRadnike(req, res)
)

zahtevRouter.route('/findZahtevRadnike').post(
    (req, res)=> new ZahtevController().findZahtevRadnike(req, res)
)

zahtevRouter.route('/removeZahtev').post(
    (req, res)=> new ZahtevController().removeZahtev(req, res)
)

zahtevRouter.route('/odbiZahtev').post(
    (req, res)=> new ZahtevController().dodajZabranu(req, res)
)

zahtevRouter.route('/checkForbidden').post(
    (req, res)=> new ZahtevController().checkForbidden(req, res)
)

export default zahtevRouter;