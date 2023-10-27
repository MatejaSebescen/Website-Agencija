import express from 'express'
import RadnikModel from '../models/radnik'
import AgencijaModel from '../models/agencija';
import zahtevZaRadnikeModel from '../models/zahtevZaRadnike';

export class RadnikController{
    
    getAllRadnici = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;
        
        RadnikModel.find({'agencija': agencija}, (err, radnik)=>{
            if(err) console.log(err)
            else res.json(radnik)
        })
    }
    
    
    odobriRadnike = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;
        let broj = req.body.broj;
        
        AgencijaModel.updateOne({'username': agencija},{$set: {'slobodnihMesta': broj}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "Zahtev za radnike odobren"})
        })
        zahtevZaRadnikeModel.deleteOne({'agencija': agencija},(err, resp)=>{
            if(err) console.log(err)
        })
    }
    
    
    odbiRadnike = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;
        
        zahtevZaRadnikeModel.deleteOne({'agencija': agencija},(err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "Zahtev za radnike odbijen"})
        })
    }
    
    getAllRadniciAdmin = (req: express.Request, res: express.Response)=>{
        zahtevZaRadnikeModel.find({}, (err, radnik)=>{
            if(err) console.log(err)
            else res.json(radnik)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let radnik = new RadnikModel({
            kontaktTelefon: req.body.kontaktTelefon,
            email: req.body.email,
            ime: req.body.ime,
            prezime: req.body.prezime,
            agencija: req.body.agencija,
            specijalizacija: req.body.specijalizacija
        })
        let agencija = req.body.agencija
        //let user = new UserModel(req.body)

        radnik.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
        AgencijaModel.updateOne({'username': agencija},{$inc: {'slobodnihMesta': -1}}, (err, resp)=>{
            if(err) console.log(err)
        })
    }

    checkImePrezime = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        console.log("usao u check imeprezime");
        RadnikModel.findOne({'agencija': agencija, 'ime': ime, 'prezime': prezime}, (err, radnik)=>{
            if(err) console.log(err);
            else res.json(radnik)
        })
    }

    checkEmail = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;
        let email = req.body.email;
        console.log("usao u check imeprezime");
        RadnikModel.findOne({'agencija': agencija, 'email': email}, (err, radnik)=>{
            if(err) console.log(err);
            else res.json(radnik)
        })
    }

}