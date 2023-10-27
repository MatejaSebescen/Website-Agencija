import express from 'express'
import AdminModel from '../models/admin'

export class AdminController{

    update = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let email = req.body.email;
        let kontaktTelefon = req.body.kontaktTelefon;
        let profilna = req.body.profilna;
        if(email)
            AdminModel.updateOne({'username': username}, {$set: {'email': email}}, (err, resp)=>{
                console.log("Updateuje Klijent email:" + email);
                if(err) console.log(err)
            })
        if(kontaktTelefon)
            AdminModel.updateOne({'username': username}, {$set: {'kontaktTelefon': kontaktTelefon}}, (err, resp)=>{
                console.log("Updateuje Klijent kontaktTelefon:" + kontaktTelefon);
                if(err) console.log(err)
            })
        if(profilna)
            AdminModel.updateOne({'username': username}, {$set: {'profilna': profilna}}, (err, resp)=>{
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

    promeniLozinkuAdmin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
            AdminModel.updateOne({'username': username}, {$set: {'lozinka': lozinka}}, (err, resp)=>{
                console.log("Promenjena admin lozinka");
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

    getByUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        console.log("usao u check admin");
        AdminModel.findOne({'username': username}, (err, klijent)=>{
            if(err) console.log(err);
            else res.json(klijent)
        })
    }

}