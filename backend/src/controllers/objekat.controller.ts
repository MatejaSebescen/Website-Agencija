import express from 'express'
import ObjekatModel from '../models/objekat'
import PosloviModel from '../models/poslovi'

export class ObjekatController{

    getObjekat = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        console.log("getObjekat")
        ObjekatModel.find({'klijent': username}, (err, objekat)=>{
            if(err) console.log(err)
            else res.json(objekat)
        })

    }
    
    findObjekat = (req: express.Request, res: express.Response)=>{
        let klijent = req.body.klijent;
        let adresa = req.body.adresa;
        //console.log("usao u findObjekat");
        ObjekatModel.findOne({'klijent': klijent, 'adresa': adresa}, (err, objekat)=>{
            if(err) console.log(err)
            else res.json(objekat)
        })

    }

    getAllObjekat = (req: express.Request, res: express.Response)=>{
        ObjekatModel.find({}, (err, objekat)=>{
            if(err) console.log(err)
            else res.json(objekat)
        })

    }

    delete = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let adresa = req.body.adresa;

        ObjekatModel.deleteMany({'klijent': username, 'adresa': adresa}, (err, resp)=>{
            if(err) console.log(err);
            else {
                PosloviModel.deleteMany({'adresa': adresa, 'klijent': username}, (err, resp)=>{
                    if(err) console.log(err);
                    else res.json({"message": "ok"})
                })
            }
        })
    }

    update = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let curAdresa = req.body.curAdresa;
        let adresa = req.body.adresa;
        let brojProstorija = req.body.brojProstorija;
        let kvadratura = req.body.kvadratura;
        let tip = req.body.tip;
        let skicaObjekta = req.body.skicaObjekta;
        console.log(typeof skicaObjekta);
        console.log(skicaObjekta);
        console.log(skicaObjekta[0]);
        if(adresa)
            ObjekatModel.updateOne({'username': username, 'adresa': curAdresa}, {$set: {'adresa': adresa}}, (err, resp)=>{
                console.log("Updateuje Objekat adresa:" + adresa);
                if(err) console.log(err)
            })
        if(brojProstorija)
            ObjekatModel.updateOne({'username': username, 'adresa': curAdresa}, {$set: {'brojProstorija': brojProstorija}}, (err, resp)=>{
                console.log("Updateuje Objekat brojProstorija:" + brojProstorija);
                if(err) console.log(err)
            })
        if(kvadratura)
            ObjekatModel.updateOne({'username': username, 'adresa': curAdresa}, {$set: {'kvadratura': kvadratura}}, (err, resp)=>{
                console.log("Updateuje Objekat kvadratura:" + kvadratura);
                if(err) console.log(err)
            })
        if(tip)
            ObjekatModel.updateOne({'username': username, 'adresa': curAdresa}, {$set: {'tip': tip}}, (err, resp)=>{
                console.log("Updateuje Objekat tip:" + tip);
                if(err) console.log(err)
            })
        if(skicaObjekta[0])
            ObjekatModel.updateOne({'username': username, 'adresa': curAdresa}, {$set: {'skicaObjekta': skicaObjekta}}, (err, resp)=>{
                console.log("Updateuje Objekat skicaObjekta");
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

    updateColors = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let adresa = req.body.adresa;
        let skicaObjekta = req.body.skicaObjekta;
        let novaSkica = req.body.novaSkica
        console.log(typeof skicaObjekta);
        console.log(skicaObjekta);
        console.log(skicaObjekta[0]);

            ObjekatModel.updateOne({'username': username, 'adresa': adresa, 'skicaObjekta': skicaObjekta}, {$set: {'skicaObjekta': novaSkica}}, (err, resp)=>{
                console.log("Updateuje Objekat skicaObjekta");
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

    add = (req: express.Request, res: express.Response)=>{
        let objekat = new ObjekatModel({
            klijent:       req.body.username,
            adresa:         req.body.adresa,
            brojProstorija: req.body.brojProstorija,
            kvadratura:     req.body.kvadratura,
            tip:            req.body.tip,
            skicaObjekta:   req.body.skicaObjekta
        })
          
        //let user = new UserModel(req.body)

        objekat.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

}