import { Component, OnInit } from '@angular/core';
import { Agencija } from '../model/agencija';
import { FormControl, NgForm } from '@angular/forms';
import { AgencijaService } from '../agencija.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija-profil',
  templateUrl: './agencija-profil.component.html',
  styleUrls: ['./agencija-profil.component.css']
})
export class AgencijaProfilComponent implements OnInit {

  constructor(private agencijaService: AgencijaService, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "agencija")
    this.router.navigate(['../pocetna']);
    this.updating = false;
  }

  kontaktTelefonControl = new FormControl();
  emailControl = new FormControl();

  korisnik: Agencija;
  updating: boolean;

  naziv: string;
  grad: string;
  ulica: string;
  opis: string;
  email: string;
  kontaktTelefon: string;
  message: string;
  profilePicture;
  img;

  updatePress(){
    this.updating = true;
  }

  update(form: NgForm){
    this.message = "";
    if(!this.naziv && !this.grad && !this.ulica && !this.opis && !this.email && !this.kontaktTelefon && !this.profilePicture){
      this.message =  "Morate uneti neki podatak";
      return;
    }
    if(this.email && this.emailControl.errors){
      this.message =  "Ne ispravno unet email";
      return;
    }
    if(this.kontaktTelefon && this.kontaktTelefonControl.errors){
      this.message =  "Ne ispravno unet kontaktni telefon";
      return;
    }
    if(this.img){
      //console.log(this.img.width<100 || this.img.width>300 || this.img.height<100 || this.img.height>300);
      console.log(this.img.width);
      if(this.img.width<100 || this.img.width>300 || this.img.height<100 || this.img.height>300){
        this.message = "slika mora biti min. veličine 100x100px, a maks. veličine 300x300px";
        return;
      }
    }
    console.log(this.naziv);
    console.log(this.korisnik.naziv);
    if(this.naziv === this.korisnik.naziv){
      this.message = "isti naziv";
      this.korisnik.naziv = this.naziv;
      return;
    }
    if(this.grad === this.korisnik.grad){
      this.message = "isti grad";
      this.korisnik.grad = this.grad;
      return;
    }
    if(this.ulica === this.korisnik.ulica){
      this.message = "ista ulica";
      this.korisnik.ulica = this.ulica;
      return;
    }
    if(this.opis === this.korisnik.opis){
      this.message = "isti opis";
    this.korisnik.opis = this.opis;
    return;
  }
    if(this.email === this.korisnik.email){
      this.message = "isti email";
      this.korisnik.email = this.email;
      return;
    }
    if(this.kontaktTelefon === this.korisnik.kontaktTelefon){
      this.message = "isti kontaktTelefon";
      this.korisnik.kontaktTelefon = this.kontaktTelefon;
      return;
    }
    this.agencijaService.update(this.korisnik.username, this.naziv, this.grad, this.ulica, this.opis, this.email, this.kontaktTelefon, this.profilePicture).subscribe(resp=>{
	  this.commonService.checkUsernameAgencija(this.korisnik.username).subscribe((data: Agencija)=>{
        this.korisnik = data;
        this.message = "uspesno";
        this.commonService.login(data, "agencija");
      })
      console.log(resp['message']);
    })
    this.message = "ceka se...";
  }

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

}
