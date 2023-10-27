import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PosloviService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000'

  platiPosao(klijent, adresa, agencija){
    const data = {
      agencija: agencija,
      klijent: klijent,
      adresa: adresa
    }
    
    return this.http.post(`${this.uri}/poslovi/platiPosao`, data)
  }
  
  finishPosao(klijent, agencija, adresa){
    const data = {
      agencija: agencija,
      klijent: klijent,
      adresa: adresa
    }
    
    return this.http.post(`${this.uri}/poslovi/finishPosao`, data)
  }

  prihvatiPonudu(klijent, adresa, agencija){
    const data = {
      agencija: agencija,
      klijent: klijent,
      adresa: adresa
    }
    
    return this.http.post(`${this.uri}/poslovi/prihvatiPonudu`, data)
  }

  odbiPonudu(klijent, adresa, agencija){
    const data = {
      agencija: agencija,
      klijent: klijent,
      adresa: adresa
    }
    
    return this.http.post(`${this.uri}/poslovi/odbiPonudu`, data)
  }

  odbiPosao(klijent, adresa, agencija){
    const data = {
      agencija: agencija,
      klijent: klijent,
      adresa: adresa
    }
    
    return this.http.post(`${this.uri}/poslovi/odbiPosao`, data)
  }

  posaljiPonudu(klijent, adresa, agencija, cena){
    const data = {
      agencija: agencija,
      klijent: klijent,
      adresa: adresa,
      cena: cena
    }
    console.log(data);
    return this.http.post(`${this.uri}/poslovi/posaljiPonudu`, data)
  }

  posaljiZahtev(agencija,klijent,adresa,datumOd,datumDo){
    const data = {
      agencija: agencija,
      klijent: klijent,
      adresa: adresa,
      datumOd: datumOd,
      datumDo: datumDo
    }
    console.log(data);
    return this.http.post(`${this.uri}/poslovi/posaljiZahtev`, data)
  }

  getPoslovi(username){
    const data = {
      klijent: username
    }

    return this.http.post(`${this.uri}/poslovi/getPoslovi`, data)
  }

  getAllPoslovi(){
    return this.http.get(`${this.uri}/poslovi/getAllPoslovi`)
  }

  getAllFinishedPoslovi(){
    return this.http.get(`${this.uri}/poslovi/getAllFinishedPoslovi`)
  }

  getAllActivePoslovi(){
    return this.http.get(`${this.uri}/poslovi/getAllActivePoslovi`)
  }

  getAllRequestsPoslovi(){
    return this.http.get(`${this.uri}/poslovi/getAllRequestsPoslovi`)
  }

  getPosloviAgencije(username){
    const data = {
      agencija: username
    }

    return this.http.post(`${this.uri}/poslovi/sortByRequests`, data)
  }

  getFinishedPoslovi(username){
    const data = {
      klijent: username
    }

    return this.http.post(`${this.uri}/poslovi/getFinishedPoslovi`, data)
  }
  
  getActivePoslovi(username){
    const data = {
      klijent: username
    }

    return this.http.post(`${this.uri}/poslovi/getActivePoslovi`, data)
  }

  getRequestsPoslovi(username){
    const data = {
      klijent: username
    }

    return this.http.post(`${this.uri}/poslovi/getRequestsPoslovi`, data)
  }
}
