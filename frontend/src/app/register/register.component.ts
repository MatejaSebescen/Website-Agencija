import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Agencija } from '../model/agencija';
import { Klijent } from '../model/klijent';
import { FormControl, NgForm } from '@angular/forms';
import { image } from 'src/assets/defaultPFP';
import { ZahtevService } from '../zahtev.service';
import { Forbidden } from '../model/forbidden';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private commonService: CommonService,private zahtevService: ZahtevService) { }

  ngOnInit(): void {
    this.isKlijent = "true";
  }

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
  naziv: string;
  drzava: string;
  grad: string;
  ulica: string;
  maticniBroj: string;
  opis: string;
  isKlijent: string;
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
      if(this.isKlijent=="true")
        this.zahtevService.register("klijent",this.username, this.lozinka, this.kontaktTelefon, this.email, this.ime, this.prezime,null,null,null,null,null,null, this.profilePicture).subscribe(respObj=>{
          this.message = respObj['message']
        });
      else{
        this.zahtevService.register("agencija",this.username, this.lozinka, this.kontaktTelefon, this.email,null,null, this.naziv, this.drzava, this.grad, this.ulica, this.maticniBroj, this.opis, this.profilePicture).subscribe(respObj=>{
          this.message = respObj['message']
        });
      }
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
      if(klijent){
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
  //Rad!0V1de0
/*
  handleSubmit(form: NgForm) {
    form
    console.log(`You entered: ${form.value.myField}`);
  }
*/
}

/*
<form #form="ngForm" (ngSubmit)="handleSubmit(form)">
    <input type="text" required name="myField" ngModel />
  
    <ng-container *ngIf="form.valid">
      <button type="submit">Add</button>
    </ng-container>
  </form>
  */