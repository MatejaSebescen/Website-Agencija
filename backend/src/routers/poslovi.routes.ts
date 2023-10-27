import express from 'express'
import { PosloviController } from '../controllers/poslovi.controller';

const posloviRouter = express.Router();

posloviRouter.route('/posaljiZahtev').post(
    (req, res)=> new PosloviController().posaljiZahtev(req, res)
)

posloviRouter.route('/posaljiPonudu').post(
    (req, res)=> new PosloviController().posaljiPonudu(req, res)
)

posloviRouter.route('/getPoslovi').post(
    (req, res)=> new PosloviController().getPoslovi(req, res)
)

posloviRouter.route('/getAllPoslovi').get(
    (req, res)=> new PosloviController().getAllPoslovi(req, res)
)

posloviRouter.route('/getAllFinishedPoslovi').get(
    (req, res)=> new PosloviController().getAllFinishedPoslovi(req, res)
)

posloviRouter.route('/getAllActivePoslovi').get(
    (req, res)=> new PosloviController().getAllActivePoslovi(req, res)
)

posloviRouter.route('/getAllRequestsPoslovi').get(
    (req, res)=> new PosloviController().getAllRequestsPoslovi(req, res)
)

posloviRouter.route('/getPosloviAgencije').post(
    (req, res)=> new PosloviController().getPosloviAgencije(req, res)
)

posloviRouter.route('/getFinishedPoslovi').post(
    (req, res)=> new PosloviController().getFinishedPoslovi(req, res)
)

posloviRouter.route('/getActivePoslovi').post(
    (req, res)=> new PosloviController().getActivePoslovi(req, res)
)

posloviRouter.route('/getRequestsPoslovi').post(
    (req, res)=> new PosloviController().getRequestsPoslovi(req, res)
)

posloviRouter.route('/platiPosao').post(
    (req, res)=> new PosloviController().platiPosao(req, res)
)

posloviRouter.route('/odbiPonudu').post(
    (req, res)=> new PosloviController().odbiPonudu(req, res)
)

posloviRouter.route('/odbiPosao').post(
    (req, res)=> new PosloviController().odbiPosao(req, res)
)

posloviRouter.route('/finishPosao').post(
    (req, res)=> new PosloviController().finishPosao(req, res)
)

posloviRouter.route('/sortByRequests').post(
    (req, res)=> new PosloviController().sortByRequests(req, res)
)

posloviRouter.route('/prihvatiPonudu').post(
    (req, res)=> new PosloviController().prihvatiPonudu(req, res)
)

export default posloviRouter;