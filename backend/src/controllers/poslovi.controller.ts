import express from 'express'
import PosloviModel from '../models/poslovi'

export class PosloviController{

    getPoslovi = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;

        PosloviModel.find({'klijent': klijent}, (err, poslovi)=>{
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    getAllPoslovi = (req: express.Request, res: express.Response)=>{

        PosloviModel.find({}, (err, poslovi)=>{
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    getAllFinishedPoslovi = (req: express.Request, res: express.Response)=>{
        
        PosloviModel.find().or([{'status': "Placen"},{'status': "Odbijen"}]).exec(function(err, poslovi){
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    getAllActivePoslovi = (req: express.Request, res: express.Response)=>{

        PosloviModel.find({'status': "Aktivan"}, (err, poslovi)=>{
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    getAllRequestsPoslovi = (req: express.Request, res: express.Response)=>{
        
        PosloviModel.find().or([{'status': "Ponudjen"},{'status': "Ceka se odgovor"}]).exec(function(err, poslovi){
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    getPosloviAgencije = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;

        PosloviModel.find({'agencija': agencija}, (err, poslovi)=>{
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    getFinishedPoslovi = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;

        PosloviModel.find().and([{'klijent': klijent}]).or([{'status': "Placen"},{'status': "Odbijen"}]).exec(function(err, poslovi){
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    getRequestsPoslovi = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;

        PosloviModel.find().and([{'klijent': klijent}]).or([{'status': "Ponudjen"},{'status': "Ceka se odgovor"}]).exec(function(err, poslovi){
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    sortByRequests = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;
        PosloviModel.find().and([{'agencija': agencija}]).or([{'status': "Ponudjen"},{'status': "Ceka se odgovor"}]).exec(function(err, poslovi1) {
            PosloviModel.find().and([{'agencija': agencija}]).or([{'status': "Aktivan"},{'status': "Placen"},{'status': "Zavrsen"}]).exec(function(err, poslovi2) {
                let poslovi = poslovi1.concat(poslovi2)
                if(err) console.log(err)
            else res.json(poslovi)
            }); 
        });
    }

    platiPosao = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;
        PosloviModel.updateOne({'klijent': klijent, 'agencija': agencija, 'adresa': adresa},{$set: {'status': 'Placen'}}, (err, resp)=>{
            if(err) console.log(err)
                else {
                    res.json({'message': 'Posao placen'})
                }
        })
    }

    finishPosao = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;
        PosloviModel.updateOne({'klijent': klijent, 'agencija': agencija, 'adresa': adresa},{$set: {'status': 'Zavrsen'}}, (err, resp)=>{
            if(err) console.log(err)
                else {
                    res.json({'message': 'Posao zavrsen'})
                }
        })
    }

    prihvatiPonudu = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;
        PosloviModel.updateOne({'klijent': klijent, 'agencija': agencija, 'adresa': adresa},{$set: {'status': 'Aktivan'}}, (err, resp)=>{
            if(err) console.log(err)
                else {
                    res.json({'message': 'Posao aktivan'})
                }
        })
    }

    odbiPonudu = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;
        PosloviModel.deleteOne({'klijent': klijent, 'agencija': agencija, 'adresa': adresa}, (err, resp)=>{
            if(err) console.log(err)
                else {
                    res.json({'message': 'Posao odbijen i obrisan'})
                }
        })
    }

    odbiPosao = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;
        PosloviModel.updateOne({'klijent': klijent, 'agencija': agencija, 'adresa': adresa},{$set: {'status': 'Odbijen'}}, (err, resp)=>{
            if(err) console.log(err)
                else {
                    res.json({'message': 'Posao odbijen'})
                }
        })
    }

    posaljiPonudu = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;
        let cena = req.body.cena;
        console.log("Ponudjen: "+cena)
        PosloviModel.updateOne({'klijent': klijent, 'agencija': agencija, 'adresa': adresa},{$set: {'status': 'Ponudjen', 'nadoknada': cena}}, (err, resp)=>{
            if(err) console.log(err)
                else {
                    res.json({'message': 'Cena posla ponudjena'})
                }
        })
    }

    getActivePoslovi = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        console.log("getActivePoslovi")
        PosloviModel.find({'klijent': klijent, 'status': "Aktivan"}, (err, poslovi)=>{
            if(err) console.log(err)
            else res.json(poslovi)
        })

    }

    posaljiZahtev = (req: express.Request, res: express.Response)=>{
        let poslovi = new PosloviModel({
            agencija:   req.body.agencija,
            klijent:    req.body.klijent,
            adresa:     req.body.adresa,
            datumOd:    req.body.datumOd,
            datumDo:    req.body.datumDo,
            status: "Ceka se odgovor",
            nadoknada: 0
        })
        console.log(poslovi);
        poslovi.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
}