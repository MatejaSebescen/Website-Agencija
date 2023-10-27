import { Component, OnInit } from '@angular/core';
import { Agencija } from '../model/agencija';
import { RadniciService } from '../radnici.service';
import { Radnik } from '../model/radnik';
import { ZahtevService } from '../zahtev.service';
import { zahtevZaRadnike } from '../model/zahtevZaRadnike';
import { AgencijaService } from '../agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija-radnici',
  templateUrl: './agencija-radnici.component.html',
  styleUrls: ['./agencija-radnici.component.css']
})
export class AgencijaRadniciComponent implements OnInit {

  constructor(private radniciService: RadniciService, private zahtevService: ZahtevService, private agencijaService: AgencijaService,private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "agencija")
    this.router.navigate(['../pocetna']);
    console.log(this.korisnik.slobodnihMesta)
    this.agencijaService.findAgencija(this.korisnik.username).subscribe((agencija: Agencija)=>{
      this.korisnik = agencija;
      sessionStorage.setItem("korisnik", JSON.stringify(agencija));
      this.radniciService.getAllRadnici(this.korisnik.username).subscribe((radnici: Radnik[])=>{
      console.log(radnici);
      if(radnici.length != 0){
        this.allRadnik = radnici;
        this.message = "";
      }
      else{
        this.allRadnik = [];
        this.message = "nema rezultata";
      }
    })
    })
  }

  korisnik: Agencija;
  allRadnik: Radnik[];
  message: string;
  broj: string;

  posaljiZahtev(){
    this.message = "";
    if(Number.isNaN(Number(this.broj)) || Number(this.broj) <= 0){
      this.message = "Broj je ili ne vazeci ili manji od 0";
      return;
    }

    this.zahtevService.findZahtevRadnike(this.korisnik.username).subscribe((zahtev: zahtevZaRadnike)=>{
      if(zahtev){
        console.log(Number(this.broj))
        this.zahtevService.updateZahtevRadnike(this.korisnik.username, Number(this.broj)).subscribe(resp=>{
          this.message = resp['message'];
        })
      }
      else{
        this.zahtevService.novZahtevRadnike(this.korisnik.username, Number(this.broj)).subscribe(resp=>{
          this.message = resp['message'];
        })
      }
    })
    this.message = "ceka se...";
    
  }

  
}
