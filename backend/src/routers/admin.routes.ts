import express from 'express'
import { KlijentController } from "../controllers/klijent.controller";
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/loginAdmin').post(
    (req, res)=>new KlijentController().loginAdmin(req, res)
)

adminRouter.route('/update').post(
    (req, res)=>new AdminController().update(req, res)
)

adminRouter.route('/getByUsername').post(
    (req, res)=>new AdminController().getByUsername(req, res)
)

adminRouter.route('/promeniLozinkuAdmin').post(
    (req, res)=>new AdminController().promeniLozinkuAdmin(req, res)
)

export default adminRouter;