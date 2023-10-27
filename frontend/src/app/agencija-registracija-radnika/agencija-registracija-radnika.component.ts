import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { RadniciService } from '../radnici.service';
import { Radnik } from '../model/radnik';
import { Agencija } from '../model/agencija';
import { AgencijaService } from '../agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija-registracija-radnika',
  templateUrl: './agencija-registracija-radnika.component.html',
  styleUrls: ['./agencija-registracija-radnika.component.css']
})
export class AgencijaRegistracijaRadnikaComponent implements OnInit {

  constructor(private radnikService: RadniciService, private agencijaService: AgencijaService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "agencija" || this.korisnik.slobodnihMesta <= 0)
    this.router.navigate(['../pocetna']);
    //if(this.korisnik.slobodnihMesta <= 0)
  }

  kontaktTelefonControl = new FormControl();
  emailControl = new FormControl();

  korisnik: Agencija;
  kontaktTelefon: string;
  email: string;
  ime: string;
  prezime: string;
  message: string;
  messageTelefon: string;
  messageEmail: string;
  isTaken: boolean;
  done: number;
  specijalizacija: string;

   register(){
    if(this.done!=2)
      return;
    else this.done=0;
        this.radnikService.register(this.email, this.ime, this.prezime, this.kontaktTelefon, this.specijalizacija, this.korisnik.username).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.message = 'Radnik added'
            this.agencijaService.findAgencija(this.korisnik.username).subscribe((agencija: Agencija)=>{
              this.korisnik = agencija;
              sessionStorage.setItem("korisnik", JSON.stringify(agencija));
              this.router.navigate(['../agencija/radnici']);
            })
          }
          else{
            this.message = 'Error'
          }
        });
    this.message = "ceka se..."
  }

  userExists(form: NgForm){
    this.done = 0
    this.message = "";
    this.messageEmail = "";
    this.messageTelefon = "";

    if(!form.valid){
      console.log(form.errors);
      this.message = "Nisu uneti svi podaci";
      return;
    }
    
    if(this.emailControl.errors){
      this.messageEmail = "Ne ispravan email";
      return;
    }
    if(this.kontaktTelefonControl.errors){
      this.messageTelefon = "Ne ispravan telefon";
      return;
    }

    this.isTaken = false;

    this.radnikService.checkEmail(this.korisnik.username, this.email).subscribe((radnik: Radnik)=>{
      console.log(radnik);
      if(radnik){
        console.log("proverava email");
        this.isTaken = true;
        this.message = 'Vec postojeci email'
        return;
      }
      this.done++;
      this.register();
    });
    this.radnikService.checkImePrezime(this.korisnik.username, this.ime, this.prezime).subscribe((radnik: Radnik)=>{
      console.log(radnik);
      if(radnik){
        console.log("proverava ime prezime");
        this.isTaken = true;
        this.message = 'Vec postojeci radnik'
        return;
      }
      console.log(this.isTaken);
      this.done++;
      this.register();
    });

  }
}
