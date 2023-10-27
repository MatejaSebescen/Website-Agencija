import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../model/agencija';
import { Klijent } from '../model/klijent';
import { CommonService } from '../common.service';
import { Komentari } from '../model/komentari';

@Component({
  selector: 'app-agencija-web-stranica',
  templateUrl: './agencija-web-stranica.component.html',
  styleUrls: ['./agencija-web-stranica.component.css']
})
export class AgencijaWebStranicaComponent implements OnInit {

  constructor(private router: Router, private agencijaService: AgencijaService, private klijentService: CommonService) { }

  ngOnInit(): void {
    this.komentariKlijent = [];
    let username = sessionStorage.getItem("navigate");
    //console.log(username);
    if(username == null){
      this.router.navigate(['../pocetna']);
    }
    this.agencijaService.findAgencija(username).subscribe((data: Agencija)=>{
      if(!data) this.router.navigate(['../pocetna']);
      this.agencija = data;
      let korisnik = sessionStorage.getItem("profilna");
        for(let i=0;i<this.agencija.komentari.length;i++){
          this.klijentService.checkUsernameKlijent(this.agencija.komentari[i].klijent).subscribe((data: Klijent)=>{
            this.komentariKlijent.push(new komentar(this.agencija.komentari[i],data));
          })
      }
      console.log(this.komentariKlijent)
      if(korisnik === "klijent" || korisnik === "admin"){
        this.isKlijent = true;
      }
      else this.isKlijent = false;
      
    })
  }

  agencija: Agencija;
  isKlijent: boolean;
  komentariKlijent: komentar[];

}

class komentar{

  constructor(komment: Komentari, klijent: Klijent){
    this.komment = komment;
    this.klijent = klijent;
    this.ocena = [];
    this.ocena.length = komment.ocena;
    for(let i=0;i<komment.ocena;i++)
      this.ocena[i] = i
  }
  ocena: Number[];
  komment: Komentari;
  klijent: Klijent;
}