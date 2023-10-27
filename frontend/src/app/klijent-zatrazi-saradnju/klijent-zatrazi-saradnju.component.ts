import { Component, OnInit } from '@angular/core';
import { Agencija } from '../model/agencija';
import { Objekat } from '../model/objekat';
import { Klijent } from '../model/klijent';
import { ObjekatService } from '../objekat.service';
import { PosloviService } from '../poslovi.service';
import { Router } from '@angular/router';
import { Poslovi } from '../model/poslovi';

@Component({
  selector: 'app-klijent-zatrazi-saradnju',
  templateUrl: './klijent-zatrazi-saradnju.component.html',
  styleUrls: ['./klijent-zatrazi-saradnju.component.css']
})
export class KlijentZatraziSaradnjuComponent implements OnInit {

  constructor(private objekatService: ObjekatService, private posloviService: PosloviService, private router: Router) { }

  ngOnInit(): void {
    this.agencija = JSON.parse(sessionStorage.getItem("agencijaZaSaradnju"));
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "klijent")
    this.router.navigate(['../pocetna']);
    console.log(this.korisnik.username);
    this.posloviService.getActivePoslovi(this.korisnik.username).subscribe((poslovi: Poslovi[])=>{
      console.log("Poslovi:"+poslovi);
      this.objekatService.getObjekat(this.korisnik.username).subscribe((data: Objekat[])=>{
        console.log("Objekti:"+data);
        if(poslovi.length == 0){
          console.log("Nema poslova")
        this.allObjekti = data;
          this.objekat = 0;
          return;
        }
        this.allObjekti = [];
        this.allObjekti.length = data.length;
        this.objekat = 0;
        let j = 0;
        
      for(let k=0;k<data.length;k++){
        let postoji = false
      for(let i=0;i<poslovi.length;i++){
        if(poslovi[i].adresa == data[k].adresa){
          console.log("Postoji:\nPosao:"+poslovi[i]+"\nObjekat"+data[k])
          postoji = true;
          break;
        }
      }
      if(!postoji){
        this.allObjekti[j] = data[k];
        j++
      }
    }
    this.allObjekti.length = j;
      })
    })
    
  }
  korisnik: Klijent;
  agencija: Agencija;
  allObjekti: Objekat[];
  objekat: number;
  datumOd: Date;
  datumDo: Date;
  message: string;

  submit(){
    console.log(this.allObjekti);
    let pick = this.allObjekti[this.objekat];
    this.message = "";
    //console.log(this.datumDo);
    if(this.datumOd==undefined || this.datumDo==undefined){
      this.message = "Datumi moraju biti navedeni"
      return;
    }

    let today = new Date();
    let str = "" + today.getFullYear();
    if(today.getMonth() < 10)
      str += "-0" + today.getMonth();
    else str += "-" + today.getMonth();
    if(today.getDay() < 10)
      str += "-0" + today.getDay();
    else str += "-" + today.getDay();
    console.log(str);
    today = new Date(str);
    console.log("today: "+today);
    console.log(today.valueOf());

    if(this.datumOd.valueOf()>= this.datumDo.valueOf()){
      this.message = "Datum pocetka radova mora biti manji od krajnjeg datuma";
      return;
    }
    if(this.datumOd.valueOf()< today.valueOf()){
      this.message = "Datum pocetka radova mora biti veci od danasnjeg datuma";
      return;
    }
    //if()
    console.log(pick.klijent)
    console.log(pick.adresa)
    this.posloviService.posaljiZahtev(this.agencija.username,pick.klijent,pick.adresa,this.datumOd,this.datumDo).subscribe(resp=>{
      this.message = resp['message'];
      this.router.navigate(['../klijent/agencije']);
    })

  }
}
