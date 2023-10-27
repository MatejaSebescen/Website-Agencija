import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadniciService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllRadnici(agencija){
    const data = {
      agencija: agencija
    }
    return this.http.post(`${this.uri}/radnik/getAllRadnici`, data)
  }

  odobriRadnike(agencija, broj){
    const data = {
      agencija: agencija,
      broj: broj
    }
    return this.http.post(`${this.uri}/radnik/odobriRadnike`, data)
  }

  odbiRadnike(agencija){
    const data = {
      agencija: agencija
    }
    return this.http.post(`${this.uri}/radnik/odbiRadnike`, data)
  }

  getAllRadniciAdmin(){
    return this.http.get(`${this.uri}/radnik/getAllRadniciAdmin`)
  }

  register(email, ime, prezime, kontaktTelefon, specijalizacija, agencija){
    const data = {
      agencija: agencija,
      email: email,
      ime: ime,
      prezime: prezime,
      kontaktTelefon: kontaktTelefon,
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/radnik/register`, data)
  }

  checkImePrezime(agencija, ime, prezime){
    const data = {
      agencija: agencija,
      ime: ime,
      prezime: prezime
    }
    return this.http.post(`${this.uri}/radnik/checkImePrezime`, data)
  }

  checkEmail(agencija, email){
    const data = {
      agencija: agencija,
      email: email
    }
    return this.http.post(`${this.uri}/radnik/checkEmail`, data)
  }
}
