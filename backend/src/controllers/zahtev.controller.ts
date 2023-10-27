import express from 'express'
import ZahtevModel from '../models/zahtev'
import ForbiddenModel from '../models/forbidden'
import zahtevZaRadnike from '../models/zahtevZaRadnike'

export class ZahtevController{
    register = (req: express.Request, res: express.Response)=>{
        let zahtev = new ZahtevModel({
            tip: req.body.tip,
            username: req.body.username,
            lozinka: req.body.lozinka,
            kontaktTelefon: req.body.kontaktTelefon,
            email: req.body.email,
            ime: req.body.ime,
            prezime: req.body.prezime,
            profilna: req.body.profilna,
            naziv: req.body.naziv,
            drzava: req.body.drzava,
            grad: req.body.grad,
            ulica: req.body.ulica,
            maticniBroj: req.body.maticniBroj,
            opis: req.body.opis
        })

        //let user = new UserModel(req.body)

        zahtev.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "Zahtev registrovan"})
        })
    }

    novZahtevRadnike = (req: express.Request, res: express.Response)=>{
        let zahtev = new zahtevZaRadnike({
            agencija: req.body.agencija,
            broj: req.body.broj
        })

        //let user = new UserModel(req.body)

        zahtev.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "Zahtev za radnike poslat"})
        })
    }

    updateZahtevRadnike = (req: express.Request, res: express.Response)=>{
            let agencija = req.body.agencija;
            let broj = req.body.broj;
            console.log(agencija+" "+broj)
        zahtevZaRadnike.updateOne({'agencija': agencija}, {$set: {'broj': broj}}, (err, resp)=>{
            console.log("Updateuje zahtev za radnike");
            if(err) console.log(err)
            else res.json({"message": "Zahtev za radnike promenjen"})
        })
    }

    findZahtevRadnike = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;
        console.log(agencija)
        zahtevZaRadnike.findOne({'agencija': agencija}, (err, radnik)=>{
            if(err) console.log(err)
            else res.json(radnik)
        })
    }

    removeZahtev = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        ZahtevModel.deleteMany({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'Zahtev obrisan'})
        })
    }

    dodajZabranu = (req: express.Request, res: express.Response)=>{
        
        let forbidden = new ForbiddenModel({
            username: req.body.username,
            email: req.body.email
        })
        console.log("Zabranjen username: "+forbidden.username)
        console.log("Zabranjen email: "+forbidden.email)
        //let user = new UserModel(req.body)

        forbidden.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "Zabrana dodata"})
        })
    }

    checkForbidden = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let email = req.body.email;
        console.log("Check Forbidden: username: "+username+"\nemail: "+email);
        ForbiddenModel.findOne().or([{'username': username},{'email': email}]).exec(function(err, forbidden){
            if(err) console.log(err)
            else res.json(forbidden)
        })
    }

    getAllZahtev = (req: express.Request, res: express.Response)=>{
        ZahtevModel.find({}, (err, zahtev)=>{
            if(err) console.log(err)
            else res.json(zahtev)
        })

    }

}