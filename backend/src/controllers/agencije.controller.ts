import express from 'express'
import AgencijaModel from '../models/agencija'
import PosloviModel from '../models/poslovi'
import RadniciModel from '../models/radnik'
import zahtevZaRadnikeModel from '../models/zahtevZaRadnike'

export class AgencijaController{

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
        console.log("usao u login");
        AgencijaModel.findOne({'username': username, 'lozinka': lozinka}, (err, agencija)=>{
            if(err) console.log(err);
            else res.json(agencija)
        })
    }

    getAllAgencija = (req: express.Request, res: express.Response)=>{
        AgencijaModel.find({}, (err, agencija)=>{
            if(err) console.log(err)
            else res.json(agencija)
        })

    }

    promeniLozinku = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
            AgencijaModel.updateOne({'username': username}, {$set: {'lozinka': lozinka}}, (err, resp)=>{
                console.log("Updateuje Agencija lozinka:" + lozinka);
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

    checkUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        console.log("usao u check agencija");
        AgencijaModel.findOne({'username': username}, (err, agencija)=>{
            if(err) console.log(err)
            else res.json(agencija)
        })

    }

    checkEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        console.log("usao u check agencija");
        AgencijaModel.findOne({'email': email}, (err, agencija)=>{
            if(err) console.log(err)
            else res.json(agencija)
        })

    }

    delete = (req: express.Request, res: express.Response)=>{
        let username = req.body.idN;

        AgencijaModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else {
                PosloviModel.deleteMany({'agencija': username}, (err, resp)=>{
                    if(err) console.log(err);
                    else {
                        RadniciModel.deleteMany({'agencija': username}, (err, resp)=>{
                            if(err) console.log(err);
                            else
                            {
                                zahtevZaRadnikeModel.deleteOne({'agencija': username}, (err, resp)=>{
                                    if(err) console.log(err);
                                    else res.json({'message': 'Obrisana agencija'})
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    searchAgencija = (req: express.Request, res: express.Response)=>{
        let searchParamNaziv = req.body.searchParamNaziv;
        let searchParamAdresa = req.body.searchParamAdresa;
        console.log(searchParamNaziv);
        console.log(searchParamAdresa);
        AgencijaModel.find().and([{'naziv': {$regex: searchParamNaziv}},{'ulica': {$regex: searchParamAdresa}}]).exec(function(err, agencija) {
            if(err) console.log(err)
            else res.json(agencija);
        });
    }

    findKomentar = (req: express.Request, res: express.Response)=>{
        let username = req.body.agencija;
        let klijent = req.body.klijent;
        console.log("trazi se komentar")
        AgencijaModel.findOne({'username': username}, (err, agencija)=>{
            if(err) console.log(err)
            else {
                if(!agencija){
                    res.json(agencija);
                return;}
                if(!agencija.komentari){
                    agencija = [];
                    res.json(agencija);
                return;}
                for(let i=0;i<agencija.komentari.length;i++){
                    if(agencija.komentari[i].klijent == klijent){
                        res.json(agencija)
                        return;
                    }
                }
                console.log("Nije nasao komentar klijenta")
                agencija = [];
                res.json(agencija);
            }
        })
    }
    

    addKomentar = (req: express.Request, res: express.Response)=>{
        let username = req.body.agencija;
        let comment = {
            klijent: req.body.klijent,
            ocena: req.body.ocena,
            text: req.body.komentar
        }
        console.log("add komentar")
            AgencijaModel.updateOne({'username': username},{$push: {'komentari': comment}}, (err, resp)=>{
                if(err) console.log(err)
                    else {
                        res.json({'message': 'komentar dodat'})
                    }
            })
    }

    updateKomentar = (req: express.Request, res: express.Response)=>{
        let username = req.body.agencija;
        let klijent = req.body.klijent;
        let comment = {
            klijent: req.body.klijent,
            ocena: req.body.ocena,
            text: req.body.komentar
        }
        console.log("update komentar")
        AgencijaModel.findOne({'username': username}, (err, agencija)=>{
            if(err) console.log(err)
            else {
                console.log(agencija.komentari[0])
                console.log(comment)
                for(let i=0;i<agencija.komentari.length;i++){
                    if(agencija.komentari[i].klijent == klijent){
                        agencija.komentari[i] = comment;
                        break;
                    }
                }
                console.log(agencija.komentari)
                AgencijaModel.updateOne({'username': username},{$set: {'komentari': agencija.komentari}}, (err, resp)=>{
                    if(err) console.log(err)
                        else {
                            res.json({'message': 'komentar promenjen'})
                        }
                })
            }
        })
    }

    sortByAddress = (req: express.Request, res: express.Response)=>{
        let searchParamNaziv = req.body.searchParamNaziv;
        let searchParamAdresa = req.body.searchParamAdresa;
        let row = req.body.row;
        console.log(searchParamNaziv);
        console.log(searchParamAdresa);
        AgencijaModel.find().and([{'naziv': {$regex: searchParamNaziv}},{'ulica': {$regex: searchParamAdresa}}]).sort({'ulica': row}).exec(function(err, agencija) {
            if(err) console.log(err)
            else res.json(agencija);
        });
    }

    sortByName = (req: express.Request, res: express.Response)=>{
        let searchParamNaziv = req.body.searchParamNaziv;
        let searchParamAdresa = req.body.searchParamAdresa;
        let row = req.body.row;
        console.log(searchParamNaziv);
        console.log(searchParamAdresa);
        AgencijaModel.find().and([{'naziv': {$regex: searchParamNaziv}},{'ulica': {$regex: searchParamAdresa}}]).sort({'naziv': row}).exec(function(err, agencija) {
            if(err) console.log(err)
            else res.json(agencija);
        });
    }

    update = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let naziv = req.body.naziv;
        let grad = req.body.grad;
        let ulica = req.body.ulica;
        let opis = req.body.opis;
        let email = req.body.email;
        let kontaktTelefon = req.body.kontaktTelefon;
        let profilna = req.body.profilna;
        if(naziv)
            AgencijaModel.updateOne({'username': username}, {$set: {'naziv': naziv}}, (err, resp)=>{
                console.log("Updateuje Agencija Naziv:" + naziv);
                if(err) console.log(err)
            })
        if(grad)
            AgencijaModel.updateOne({'username': username}, {$set: {'grad': grad}}, (err, resp)=>{
                console.log("Updateuje Agencija grad:" + grad);
                if(err) console.log(err)
            })
        if(ulica)
            AgencijaModel.updateOne({'username': username}, {$set: {'ulica': ulica}}, (err, resp)=>{
                console.log("Updateuje Agencija ulica:" + ulica);
                if(err) console.log(err)
            })
        if(opis)
            AgencijaModel.updateOne({'username': username}, {$set: {'opis': opis}}, (err, resp)=>{
                console.log("Updateuje Agencija opis:" + opis);
                if(err) console.log(err)
            })
        if(email)
            AgencijaModel.updateOne({'username': username}, {$set: {'email': email}}, (err, resp)=>{
                console.log("Updateuje Agencija email:" + email);
                if(err) console.log(err)
            })
        if(kontaktTelefon)
            AgencijaModel.updateOne({'username': username}, {$set: {'kontaktTelefon': kontaktTelefon}}, (err, resp)=>{
                console.log("Updateuje Agencija kontaktTelefon:" + kontaktTelefon);
                if(err) console.log(err)
            })
        if(profilna)
            AgencijaModel.updateOne({'username': username}, {$set: {'profilna': profilna}}, (err, resp)=>{
                console.log("Updateuje Agencija profilna");
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

    register = (req: express.Request, res: express.Response)=>{
        let agencija = new AgencijaModel({
            username: req.body.username,
            lozinka: req.body.lozinka,
            kontaktTelefon: req.body.kontaktTelefon,
            email: req.body.email,
            naziv: req.body.naziv,
            drzava: req.body.drzava,
            grad: req.body.grad,
            ulica: req.body.ulica,
            maticniBroj: req.body.maticniBroj,
            opis: req.body.opis,
            profilna: req.body.profilna,
            slobodnihMesta: 0
        })

        //let user = new UserModel(req.body)

        agencija.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
}