import { Component, OnInit } from '@angular/core';
import { RadniciService } from '../radnici.service';
import { Radnik } from '../model/radnik';
import { zahtevZaRadnike } from '../model/zahtevZaRadnike';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-zahtevi-radnika',
  templateUrl: './admin-zahtevi-radnika.component.html',
  styleUrls: ['./admin-zahtevi-radnika.component.css']
})
export class AdminZahteviRadnikaComponent implements OnInit {

  constructor(private radniciService: RadniciService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "admin")
    this.router.navigate(['../pocetna']);
    this.radniciService.getAllRadniciAdmin().subscribe((radnici: zahtevZaRadnike[])=>{
      console.log(radnici);
      if(radnici.length != 0){
        this.allZahteviRadnika = radnici;
        this.message = "";
      }
      else{
        this.allZahteviRadnika = [];
        this.message = "nema rezultata";
      }
    })
  }

  korisnik;
  allZahteviRadnika: zahtevZaRadnike[];
  message: string;

  odobri(i){
    this.message = ""
    this.radniciService.odobriRadnike(this.allZahteviRadnika[i].agencija, this.allZahteviRadnika[i].broj).subscribe(resp=>{
      this.message = resp['message']
      this.radniciService.getAllRadniciAdmin().subscribe((radnici: zahtevZaRadnike[])=>{
        console.log(radnici);
        if(radnici.length != 0){
          this.allZahteviRadnika = radnici;
        }
        else{
          this.allZahteviRadnika = [];
        }
      })
    })
    this.message = "ceka se..."
  }

  odbi(i){
    this.radniciService.odbiRadnike(this.allZahteviRadnika[i].agencija).subscribe(resp=>{
      this.message = resp['message']
      this.radniciService.getAllRadniciAdmin().subscribe((radnici: zahtevZaRadnike[])=>{
        console.log(radnici);
        if(radnici.length != 0){
          this.allZahteviRadnika = radnici;
        }
        else{
          this.allZahteviRadnika = [];
        }
      })
    })
    this.message = "ceka se..."
  }
}
