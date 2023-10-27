import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Klijent } from './model/klijent';
import { Agencija } from './model/agencija';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000'
  //private isPrijavljen = new BehaviorSubject('default data');
  //isPrijavljen$ = this.isPrijavljen.asObservable();

  getPrijavljen(){
    if(sessionStorage.getItem("isPrijavljen")) return true;
    else return false;
  }

  getProfil(){
    return sessionStorage.getItem("profilna");
  }

  login(user: any, type: string) {
    sessionStorage.setItem("isPrijavljen", "true");
    sessionStorage.setItem("korisnik", JSON.stringify(user));
    console.log(type);
    if(type === "agencija") sessionStorage.setItem("profilna", "agencija");
    else if(type === "klijent") sessionStorage.setItem("profilna", "klijent");
    else sessionStorage.setItem("profilna", "admin");
  }

  registerK(username, lozinka, kontaktTelefon, email, ime, prezime, profilna){
    
    const data = {
      username: username,
      lozinka: lozinka,
      kontaktTelefon: kontaktTelefon,
      email: email,
      ime: ime,
      prezime: prezime,
      profilna: profilna
    }

    return this.http.post(`${this.uri}/klijent/register`, data)
  }

  registerA(username, lozinka, kontaktTelefon, email, naziv, drzava, grad, ulica, maticniBroj, opis, profilna){
    
    const data = {
      username: username,
      lozinka: lozinka,
      kontaktTelefon: kontaktTelefon,
      email: email,
      naziv: naziv,
      drzava: drzava,
      grad: grad,
      ulica: ulica,
      maticniBroj: maticniBroj,
      opis: opis,
      profilna: profilna
    }

    return this.http.post(`${this.uri}/agencija/register`, data)
  }

  promeniLozinkuK(username, lozinka){
    const data = {
      username: username,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/klijent/promeniLozinku`, data)
  }

  promeniLozinkuA(username, lozinka){
    const data = {
      username: username,
      lozinka: lozinka,
    }

    return this.http.post(`${this.uri}/agencija/promeniLozinku`, data)
  }

  promeniLozinkuAdmin(username, lozinka){
    const data = {
      username: username,
      lozinka: lozinka,
    }

    return this.http.post(`${this.uri}/admin/promeniLozinkuAdmin`, data)
  }

  checkUsernameKlijent(usernameFromForm){
    const data = {
      username: usernameFromForm
    }

    return this.http.post(`${this.uri}/klijent/checkUsername`, data)
    
  }
  
  checkEmailKlijent(email){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/klijent/checkEmail`, data)
    
  }

  checkEmailAgencija(email){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/agencija/checkEmail`, data)
    
  }

  checkUsernameAgencija(usernameFromForm){
    const data = {
      username: usernameFromForm
    }

    return this.http.post(`${this.uri}/agencija/checkUsername`, data)
    
  }

}
