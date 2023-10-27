import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjekatService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000'

  getObjekat(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/objekat/getObjekat`, data)
  }

  findObjekat(username, adresa){
    const data = {
      klijent: username,
      adresa: adresa
    }
    console.log("usao u findObjekat");
    return this.http.post(`${this.uri}/objekat/findObjekat`, data)
  }
  
  getAllObjekat(){
    return this.http.get(`${this.uri}/objekat/getAllObjekat`)
  }

  delete(username, adresa){
    if(adresa === ""){
      adresa = ".*"
    }
    const data = {
      username: username,
      adresa: adresa
    }

    return this.http.post(`${this.uri}/objekat/delete`, data)
  }
  
  addObjekat(username: string, tip: any, adresa: any, brojProstorija: any, kvadratura: any, skicaObjekta: string) {
    const data = {
      username: username,
      adresa: adresa,
      brojProstorija: brojProstorija,
      kvadratura: kvadratura,
      tip: tip,
      skicaObjekta: skicaObjekta
    }
    
    return this.http.post(`${this.uri}/objekat/addObjekat`, data)
  }
  
  update(username, curAdresa, adresa, brojProstorija, kvadratura, tip, skicaObjekta){
    const data = {
      username: username,
      curAdresa: curAdresa,
      adresa: adresa,
      brojProstorija: brojProstorija,
      kvadratura: kvadratura,
      tip: tip,
      skicaObjekta: skicaObjekta
    }

    return this.http.post(`${this.uri}/objekat/update`, data)
  }

  updateColors(username, adresa, skicaObjekta, novaSkica){
    const data = {
      klijent: username,
      adresa: adresa,
      skicaObjekta: skicaObjekta,
      novaSkica: novaSkica
    }
    
    return this.http.post(`${this.uri}/objekat/updateColors`, data)
  }
}
