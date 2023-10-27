import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencijaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      lozinka: passwordFromForm
    }

    return this.http.post(`${this.uri}/agencija/login`, data)
  }

  getAllAgencija(){
    return this.http.get(`${this.uri}/agencija/getAllAgencija`)
  }

  findAgencija(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/agencija/findAgencija`, data)
  }

  delete(id){
    const data = {
      idN: id
    }

    return this.http.post(`${this.uri}/agencija/delete`, data)
  }

  searchAgencija(searchParamNaziv, searchParamAdresa){
    if(!searchParamNaziv)
    searchParamNaziv = ".*"
    if(!searchParamAdresa)
    searchParamAdresa = ".*"
   const data = {
    searchParamAdresa: searchParamAdresa,
    searchParamNaziv: searchParamNaziv
   }
    return this.http.post(`${this.uri}/agencija/searchAgencija`, data)
  }

  sortByAddress(searchParamNaziv, searchParamAdresa, row){
    if(!searchParamNaziv)
    searchParamNaziv = ".*"
    if(!searchParamAdresa)
    searchParamAdresa = ".*"
   const data = {
    searchParamAdresa: searchParamAdresa,
    searchParamNaziv: searchParamNaziv,
    row: row
   }
    return this.http.post(`${this.uri}/agencija/sortByAddress`, data)
  }

  sortByName(searchParamNaziv, searchParamAdresa, row){
    if(!searchParamNaziv)
    searchParamNaziv = ".*"
    if(!searchParamAdresa)
    searchParamAdresa = ".*"
   const data = {
    searchParamAdresa: searchParamAdresa,
    searchParamNaziv: searchParamNaziv,
    row: row
   }
    return this.http.post(`${this.uri}/agencija/sortByName`, data)
  }

  update(username, naziv, grad, ulica, opis, email, kontaktTelefon, profilna){
    const data = {
      username: username,
      naziv: naziv,
      grad: grad,
      ulica: ulica,
      opis: opis,
      email: email,
      kontaktTelefon: kontaktTelefon,
      profilna: profilna
    }

    return this.http.post(`${this.uri}/agencija/update`, data)
  }

  findKomentar(agencija, username){
    const data = {
      agencija: agencija,
      klijent: username
    }
    
    return this.http.post(`${this.uri}/agencija/findKomentar`, data)
  }

  updateKomentar(agencija, username, ocena, komentar){
    const data = {
      agencija: agencija,
      klijent: username,
      ocena: ocena,
      komentar: komentar
    }
    
    return this.http.post(`${this.uri}/agencija/updateKomentar`, data)
  }

  addKomentar(agencija, username, ocena, komentar){
    const data = {
      agencija: agencija,
      klijent: username,
      ocena: ocena,
      komentar: komentar
    }
    
    return this.http.post(`${this.uri}/agencija/addKomentar`, data)
  }
}
