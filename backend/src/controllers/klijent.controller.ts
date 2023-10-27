import express from 'express'
import KlijentModel from '../models/klijent'
import AdminModel from '../models/admin'
import ObjekatModel from '../models/objekat'
import PosloviModel from '../models/poslovi'

export class KlijentController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
        console.log("usao u login");
        KlijentModel.findOne({'username': username, 'lozinka': lozinka}, (err, klijent)=>{
            if(err) console.log(err);
            else res.json(klijent)
        })
    }

    loginAdmin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
        console.log("usao u loginAdmin");
        AdminModel.findOne({'username': username, 'lozinka': lozinka}, (err, admin)=>{
            if(err) console.log(err);
            else res.json(admin)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let klijent = new KlijentModel({
            username: req.body.username,
            lozinka: req.body.lozinka,
            kontaktTelefon: req.body.kontaktTelefon,
            email: req.body.email,
            ime: req.body.ime,
            prezime: req.body.prezime,
            profilna: req.body.profilna    
        })

        //let user = new UserModel(req.body)

        klijent.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    searchKlijent = (req: express.Request, res: express.Response)=>{
        let searchParamUsername = req.body.searchParamUsername;
        console.log(searchParamUsername);
        KlijentModel.find().and([{'username': {$regex: searchParamUsername}}]).exec(function(err, klijent) {
            if(err) console.log(err)
            else res.json(klijent);
        });
    }

    delete = (req: express.Request, res: express.Response)=>{
        let username = req.body.idN;
        
        KlijentModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else
            {
                ObjekatModel.deleteMany({'klijent': username}, (err, resp)=>{
                    if(err) console.log(err);
                    else {
                        PosloviModel.deleteMany({'agencija': username}, (err, resp)=>{
                            if(err) console.log(err);
                            else res.json({'message': 'ok'})
                        })
                    }
                })
            }
        })
    }

    getAllKlijent = (req: express.Request, res: express.Response)=>{
        KlijentModel.find({}, (err, klijent)=>{
            if(err) console.log(err)
            else res.json(klijent)
        })

    }

    checkUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        console.log("usao u check klijent");
        KlijentModel.findOne({'username': username}, (err, klijent)=>{
            if(err) console.log(err);
            else res.json(klijent)
        })
    }

    checkEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        console.log("usao u check klijent");
        KlijentModel.findOne({'email': email}, (err, klijent)=>{
            if(err) console.log(err);
            else res.json(klijent)
        })
    }
    
    update = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let email = req.body.email;
        let kontaktTelefon = req.body.kontaktTelefon;
        let profilna = req.body.profilna;
        if(ime)
            KlijentModel.updateOne({'username': username}, {$set: {'ime': ime}}, (err, resp)=>{
                console.log("Updateuje Klijent ime:" + ime);
                if(err) console.log(err)
            })
        if(prezime)
            KlijentModel.updateOne({'username': username}, {$set: {'prezime': prezime}}, (err, resp)=>{
                console.log("Updateuje Klijent prezime:" + prezime);
                if(err) console.log(err)
            })
        if(email)
            KlijentModel.updateOne({'username': username}, {$set: {'email': email}}, (err, resp)=>{
                console.log("Updateuje Klijent email:" + email);
                if(err) console.log(err)
            })
        if(kontaktTelefon)
            KlijentModel.updateOne({'username': username}, {$set: {'kontaktTelefon': kontaktTelefon}}, (err, resp)=>{
                console.log("Updateuje Klijent kontaktTelefon:" + kontaktTelefon);
                if(err) console.log(err)
            })
        if(profilna)
            KlijentModel.updateOne({'username': username}, {$set: {'profilna': profilna}}, (err, resp)=>{
                console.log("Updateuje Klijent profilna");
                if(err) console.log(err)
            })
       /* AgencijaModel.updateOne({'id': id}, {$set: {"comments.$[comment].text": "Agencija comment text"}}, {arrayFilters: [{
            "comment.text": "Comment 3"
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })*/
        res.json({'message': 'ok'})
    }

    promeniLozinku = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
            KlijentModel.updateOne({'username': username}, {$set: {'lozinka': lozinka}}, (err, resp)=>{
                console.log("Updateuje Klijent lozinka:" + lozinka);
                if(err) console.log(err)
            })
       /* AgencijaModel.updateOne({'id': id}, {$set: {"comments.$[comment].text": "Agencija comment text"}}, {arrayFilters: [{
            "comment.text": "Comment 3"
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })*/
        res.json({'message': 'ok'})
    }

    promeniLozinkuAdmin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
            AdminModel.updateOne({'username': username}, {$set: {'lozinka': lozinka}}, (err, resp)=>{
                console.log("Updateuje Admin lozinka:" + lozinka);
                if(err) console.log(err)
            })
       /* AgencijaModel.updateOne({'id': id}, {$set: {"comments.$[comment].text": "Agencija comment text"}}, {arrayFilters: [{
            "comment.text": "Comment 3"
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })*/
        res.json({'message': 'ok'})
    }

}