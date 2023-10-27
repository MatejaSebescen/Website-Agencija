import express from 'express'
import { ObjekatController } from '../controllers/objekat.controller';

const objekatRouter = express.Router();

objekatRouter.route('/getObjekat').post(
    (req, res)=> new ObjekatController().getObjekat(req, res)
)

objekatRouter.route('/getAllObjekat').get(
    (req, res)=> new ObjekatController().getAllObjekat(req, res)
)

objekatRouter.route('/delete').post(
    (req, res)=> new ObjekatController().delete(req, res)
)

objekatRouter.route('/update').post(
    (req, res)=> new ObjekatController().update(req, res)
)

objekatRouter.route('/findObjekat').post(
    (req, res)=> new ObjekatController().findObjekat(req, res)
)

objekatRouter.route('/addObjekat').post(
    (req, res)=> new ObjekatController().add(req, res)
)

objekatRouter.route('/updateColors').post(
    (req, res)=> new ObjekatController().updateColors(req, res)
)

export default objekatRouter;