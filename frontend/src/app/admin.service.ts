import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      lozinka: passwordFromForm
    }

    return this.http.post(`${this.uri}/admin/loginAdmin`, data)
  }

  update(username, email, kontaktTelefon, profilna){
    const data = {
      username: username,
      email: email,
      kontaktTelefon: kontaktTelefon,
      profilna: profilna
    }

    return this.http.post(`${this.uri}/admin/update`, data)
  }

  
  getByUsername(usernameFromForm){
    const data = {
      username: usernameFromForm
    }

    return this.http.post(`${this.uri}/admin/getByUsername`, data)
  }
}
