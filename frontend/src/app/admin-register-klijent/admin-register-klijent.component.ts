import { Component, OnInit } from '@angular/core';
import { Agencija } from '../model/agencija';
import { Klijent } from '../model/klijent';
import { image } from 'src/assets/defaultPFP';
import { FormControl, NgForm } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Forbidden } from '../model/forbidden';
import { ZahtevService } from '../zahtev.service';

@Component({
  selector: 'app-admin-register-klijent',
  templateUrl: './admin-register-klijent.component.html',
  styleUrls: ['./admin-register-klijent.component.css']
})
export class AdminRegisterKlijentComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router, private zahtevService: ZahtevService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "admin")
    this.router.navigate(['../pocetna']);
  }

  korisnik;
  
  lozinkaControl = new FormControl();
  kontaktTelefonControl = new FormControl();
  emailControl = new FormControl();

  username: string;
  lozinka: string;
  potvrdaLozinke: string;
  kontaktTelefon: string;
  email: string;
  ime: string;
  prezime: string;
  message: string;
  messageLozinka: string;
  messageTelefon: string;
  messageEmail: string;
  isTaken: boolean;
  profilePicture;
  img;
  done: number;

  insertPicture(event){
      var f = new FileReader();
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      console.log(files[0]);
      f.readAsDataURL(files[0]);
      let img = new Image();
      img.onload = function(){
      }
      f.onload = (par) => {
        this.profilePicture = par.target.result;
        img.src = this.profilePicture;
        console.log(this.profilePicture);
        this.img = img;
      }
  }

   register(){
    if(this.done!=5)
      return;
    else this.done=0;
        this.commonService.registerK(this.username, this.lozinka, this.kontaktTelefon, this.email, this.ime, this.prezime, this.profilePicture).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.message = 'Klijent added'
          }
          else{
            this.message = 'Error'
          }
        });
      this.message = 'added'
  }

  userExists(form: NgForm){
    this.done = 0
    this.message = "";
    this.messageLozinka = "";
    this.messageEmail = "";
    this.messageTelefon = "";

    if(!form.valid){
      console.log(form.errors);
      this.message = "Nisu uneti svi podaci";
      return;
    }

    if(this.img){
      console.log(this.img.width<100 || this.img.width>300 || this.img.height<100 || this.img.height>300);
      console.log(this.img.width);
      if(this.img.width<100 || this.img.width>300 || this.img.height<100 || this.img.height>300){
        this.message = "slika mora biti min. veličine 100x100px, a maks. veličine 300x300px";
        return;
      }
    }
    else{
      this.profilePicture = "data:image/jpeg;base64,"+image;
    }

    if(this.lozinkaControl.errors){
      this.messageLozinka = "Ne ispravna lozinka";
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
    if(!this.username || this.username.length < 3){
      this.message = "username je previse kratak";
      return;
    }
    this.commonService.checkUsernameKlijent(this.username).subscribe((klijent: Klijent)=>{
      console.log(klijent);
      if(klijent || this.username === "admin"){
        console.log("usao u K");
        this.isTaken = true;
        this.message = 'Vec postojeci klijent'
        return;
      }
      this.done++;
      this.register();
    });
    this.commonService.checkEmailKlijent(this.email).subscribe((klijent: Klijent)=>{
      console.log(klijent);
      if(klijent){
        console.log("usao u K");
        this.isTaken = true;
        this.message = 'Vec postojeci klijent'
        return;
      }
      this.done++;
      this.register();
    });
    this.commonService.checkEmailAgencija(this.email).subscribe((agencija: Agencija)=>{
      console.log(agencija);
      if(agencija){
        console.log("usao u A");
        this.isTaken = true;
        this.message = 'Vec postojeca agencija'
        return;
      }
      this.done++;
      this.register();
    });
    this.commonService.checkUsernameAgencija(this.username).subscribe((agencija: Agencija)=>{
      console.log(agencija);
      if(agencija){
        console.log("usao u A");
        this.isTaken = true;
        this.message = 'Vec postojeca agencija'
        return;
      }
      console.log(this.isTaken);
      this.done++;
      this.register();
    });
    this.zahtevService.checkForbidden(this.username,this.email).subscribe((forbidden: Forbidden)=>{
      console.log(forbidden);
      if(forbidden){
        console.log("usao u Forbidden");
        this.isTaken = true;
        this.message = 'Zabranjeni username ili email'
        return;
      }
      this.done++;
      this.register();
    });


  }
}
