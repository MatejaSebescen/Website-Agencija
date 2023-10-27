import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllZahtev(){
    return this.http.get(`${this.uri}/zahtev/getAllZahtev`)
  }

  removeZahtev(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/zahtev/removeZahtev`,data)
  }

  checkForbidden(username, email){
    const data = {
      username: username,
      email: email
    }

    return this.http.post(`${this.uri}/zahtev/checkForbidden`,data)
  }

  odbiZahtev(username, email){
    const data = {
      username: username,
      email: email
    }

    return this.http.post(`${this.uri}/zahtev/odbiZahtev`,data)
  }
  register(tip,username, lozinka, kontaktTelefon, email, ime, prezime, naziv, drzava, grad, ulica, maticniBroj, opis, profilna){
    const data = {
      tip: tip,
      username: username,
      lozinka: lozinka,
      kontaktTelefon: kontaktTelefon,
      email: email,
      ime: ime,
      prezime: prezime,
      naziv: naziv,
      drzava: drzava,
      grad: grad,
      ulica: ulica,
      maticniBroj: maticniBroj,
      opis: opis,
      profilna: profilna
    }

    return this.http.post(`${this.uri}/zahtev/register`,data)
  }
  
  novZahtevRadnike(agencija, broj){
    const data = {
      agencija: agencija,
      broj: broj
    }

    return this.http.post(`${this.uri}/zahtev/novZahtevRadnike`, data)
  }
  
  
  findZahtevRadnike(agencija){
    const data = {
      agencija: agencija,
    }

    return this.http.post(`${this.uri}/zahtev/findZahtevRadnike`, data)
  }
  
  updateZahtevRadnike(agencija, broj){
    const data = {
      agencija: agencija,
      broj: broj
    }

    return this.http.post(`${this.uri}/zahtev/updateZahtevRadnike`, data)
  }

}
