import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import klijentRouter from './routers/klijent.routes';
import agencijaRouter from './routers/agencija.routes';
import objekatRouter from './routers/objekat.routes';
import posloviRouter from './routers/poslovi.routes';
import adminRouter from './routers/admin.routes';
import zahtevRouter from './routers/zahtev.routes';
import radnikRouter from './routers/radnik.routes';

const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/klijent', klijentRouter)
router.use('/agencija', agencijaRouter)
router.use('/admin', adminRouter)
router.use('/objekat', objekatRouter)
router.use('/poslovi', posloviRouter)
router.use('/zahtev', zahtevRouter)
router.use('/forbidden', zahtevRouter)
router.use('/radnik', radnikRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));