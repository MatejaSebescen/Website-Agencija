import { Component, OnInit } from '@angular/core';
import { Zahtev } from '../model/zahtev';
import { ZahtevService } from '../zahtev.service';
import { KlijentService } from '../klijent.service';
import { AgencijaService } from '../agencija.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-registracije',
  templateUrl: './admin-registracije.component.html',
  styleUrls: ['./admin-registracije.component.css']
})
export class AdminRegistracijeComponent implements OnInit {

  constructor(private zahtevService: ZahtevService,private commonService: CommonService, private klijentService: KlijentService, private agencijaService: AgencijaService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "admin")
    this.router.navigate(['../pocetna']);
    this.zahtevService.getAllZahtev().subscribe((data: Zahtev[])=>{
      this.allZahtevi = data;
      //this.allKlijenti.sort() ok
    })
  }

  korisnik;
  allZahtevi: Zahtev[];
  message: string;

  odbi(username, email){
    this.zahtevService.odbiZahtev(username, email).subscribe(respObj=>{
      this.message = respObj['message']
      this.zahtevService.removeZahtev(username).subscribe(respObj=>{
        this.message = respObj['message']
        this.zahtevService.getAllZahtev().subscribe((data: Zahtev[])=>{
          this.allZahtevi = data;
          //this.allKlijenti.sort() ok
        })
      })
    })
  }

  prihvati(counter){
    this.message = ""
    if(this.allZahtevi[counter].tip === "agencija"){
      let agencija = this.allZahtevi[counter];
    this.commonService.registerA(agencija.username,agencija.lozinka,agencija.kontaktTelefon,agencija.email,agencija.naziv,agencija.drzava,agencija.grad,agencija.ulica,agencija.maticniBroj,agencija.opis,agencija.profilna).subscribe(respObj=>{
      this.message = respObj['message']
      this.zahtevService.removeZahtev(agencija.username).subscribe(respObj=>{
        this.message = respObj['message']
        this.zahtevService.getAllZahtev().subscribe((data: Zahtev[])=>{
          this.allZahtevi = data;
          //this.allKlijenti.sort() ok
        })
      })
    })}
    else{
      let klijent = this.allZahtevi[counter];
      this.commonService.registerK(klijent.username,klijent.lozinka,klijent.kontaktTelefon,klijent.email,klijent.ime,klijent.prezime,klijent.profilna).subscribe(respObj=>{
        this.message = respObj['message']
        this.zahtevService.removeZahtev(klijent.username).subscribe(respObj=>{
          this.message = respObj['message']
          this.zahtevService.getAllZahtev().subscribe((data: Zahtev[])=>{
            this.allZahtevi = data;
            //this.allKlijenti.sort() ok
          })
        })
      })
    }
    this.message = "ceka se..."
  }
}
