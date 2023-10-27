import { Component, OnInit } from '@angular/core';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../model/agencija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private agencijaService: AgencijaService, private router: Router) { }

  ngOnInit(): void {
    this.agencijaService.getAllAgencija().subscribe((data: Agencija[])=>{
      this.allAgencija = data;
      //this.allAgencija.sort() ok
    })
    this.row = 1;
   /* var data = [
      {
        "tip":'this.tip', 
        "adresa":'this.adresa', 
        "brojProstorija":'Number(this.brojProstorija)',
        "kvadratura":'Number(this.kvadratura)',
        "skica": ""
      }];
      var skica = [{
        "jedan": "dva",
        "tri": "cdce"
      },{
        "jedan": "23",
        "tri": "cdce"
      },{
        
        "jedan": "54",
        "tri": "cdce"
      }]
    data[0].skica = JSON.stringify(skica[0]);
    console.log(JSON.stringify(data[0]));
    console.log(JSON.parse(JSON.stringify(data[0])));*/
  }

  allAgencija: Agencija[] = [];
  searchParamNaziv: string;
  paramNaziv: string;
  searchParamAdresa: string;
  paramAdresa: string;
  message: string;
  row: number;

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
