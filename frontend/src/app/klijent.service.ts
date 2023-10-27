import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      lozinka: passwordFromForm
    }

    return this.http.post(`${this.uri}/klijent/login`, data)
  }

  getAllKlijent(){
    return this.http.get(`${this.uri}/klijent/getAllKlijent`)
  }

  searchKlijent(searchParamNaziv){
    if(!searchParamNaziv)
    searchParamNaziv = ".*"
   const data = {
    searchParamUsername: searchParamNaziv
   }
    return this.http.post(`${this.uri}/klijent/searchKlijent`, data)
  }

  delete(id){
    const data = {
      idN: id
    }

    return this.http.post(`${this.uri}/klijent/delete`, data)
  }

  update(username, ime, prezime, email, kontaktTelefon, profilna){
    const data = {
      username: username,
      ime: ime,
      prezime: prezime,
      email: email,
      kontaktTelefon: kontaktTelefon,
      profilna: profilna
    }

    return this.http.post(`${this.uri}/klijent/update`, data)
  }
}
