import { Component, OnInit } from '@angular/core';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../model/agencija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent-agencije',
  templateUrl: './klijent-agencije.component.html',
  styleUrls: ['./klijent-agencije.component.css']
})
export class KlijentAgencijeComponent implements OnInit {

  constructor(private agencijaService: AgencijaService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "klijent")
    this.router.navigate(['../pocetna']);
    this.agencijaService.getAllAgencija().subscribe((data: Agencija[])=>{
      this.allAgencija = data;
      //this.allAgencija.sort() ok
    })
    this.row = 1;
  }

  korisnik;
  allAgencija: Agencija[] = [];
  searchParamNaziv: string;
  paramNaziv: string;
  searchParamAdresa: string;
  paramAdresa: string;
  message: string;
  row: number;

  zatraziSaradnju(agencija: Agencija){
    sessionStorage.setItem("agencijaZaSaradnju",JSON.stringify(agencija));
    this.router.navigate(['../klijent/saradnja']);
  }

  search(){
    this.agencijaService.searchAgencija(this.searchParamNaziv, this.searchParamAdresa).subscribe((agencija: Agencija[])=>{
      console.log(agencija);
      if(agencija.length != 0){
        this.allAgencija = agencija;
        this.message = "";
        this.paramAdresa = this.searchParamAdresa;
        this.paramNaziv = this.searchParamNaziv;
      }
      else{
        this.allAgencija = [];
        this.message = "nema rezultata";
      }
    })
  }

  sortByName(){
    if(this.allAgencija.length != 0){
      this.agencijaService.sortByName(this.paramNaziv, this.paramAdresa, this.row).subscribe((agencija: Agencija[])=>{
        this.allAgencija = agencija;
      })
    }
    if(this.row == 1)
    this.row = -1
    else this.row = 1
  }
  sortByAddress(){
    if(this.allAgencija.length != 0){
      this.agencijaService.sortByAddress(this.paramNaziv, this.paramAdresa, this.row).subscribe((agencija: Agencija[])=>{
        this.allAgencija = agencija;
      })
    }
    if(this.row == 1)
    this.row = -1
    else this.row = 1
  }

  navigate(stranica: string){
    sessionStorage.setItem("navigate", stranica);
    this.router.navigate(['../agencija-web-stranica']);
  }
}
