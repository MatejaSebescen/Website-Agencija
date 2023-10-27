import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjekatService } from '../objekat.service';
import { Objekat } from '../model/objekat';

@Component({
  selector: 'app-dodavanje-objekta',
  templateUrl: './dodavanje-objekta.component.html',
  styleUrls: ['./dodavanje-objekta.component.css']
})
export class DodavanjeObjektaComponent implements OnInit {

  constructor(private router: Router,private objekatService: ObjekatService) { }

  ngOnInit(): void {
    this.tip = "stan";
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "klijent")
    this.router.navigate(['../pocetna']);
  }

  korisnik;
  tip:string;
  adresa:string;
  brojProstorija: string;
  kvadratura: string;
  message: string;

  dodaj(form: NgForm){
    if(!form.valid){
      this.message = "Morate uneti sve podatke";
      return;
    }
    this.message = "";
    if(Number.isNaN(Number(this.brojProstorija))){
      this.message = "Broj prostorija mora biti broj";
      return;
    }
    if(Number(this.brojProstorija) > 3 || Number(this.brojProstorija) <= 0){
      this.message = "Maksimalan broj prostorija je 3";
      return;
    }
    if(Number.isNaN(Number(this.kvadratura))){
      this.message = "kvadratura mora biti broj";
      return;
    }
    if(Number(this.kvadratura) <= 0){
      this.message = "kvadratura mora biti validan broj";
      return;
    }
    this.objekatService.findObjekat(this.korisnik.username, this.adresa).subscribe((objekat: Objekat)=>{
      if(objekat){
        this.message = "Objekat vec postoji na ovoj adresi";
        return;
      }
      var data = [
        {
          "tip":this.tip, 
          "adresa":this.adresa, 
          "brojProstorija":Number(this.brojProstorija),
          "kvadratura":Number(this.kvadratura)
        }];
  
      sessionStorage.setItem("PodaciZaDodavanjeObjekta",JSON.stringify(data[0]));
      this.router.navigate(["../klijent/kreiranje"]);
    })
  }
}
