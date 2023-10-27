import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../klijent.service';
import { FormControl, NgForm } from '@angular/forms';
import { Klijent } from '../model/klijent';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent-profil',
  templateUrl: './klijent-profil.component.html',
  styleUrls: ['./klijent-profil.component.css']
})
export class KlijentProfilComponent implements OnInit {

  constructor(private klijentService: KlijentService, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "klijent")
    this.router.navigate(['../pocetna']);
    this.updating = false;
  }

  kontaktTelefonControl = new FormControl();
  emailControl = new FormControl();

  korisnik: Klijent;
  updating: boolean;

  ime: string;
  prezime: string;
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
    if(!this.ime && !this.prezime && !this.email && !this.kontaktTelefon && !this.profilePicture){
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
    console.log(this.ime);
    console.log(this.korisnik.ime);
    if(this.ime === this.korisnik.ime){
      this.message = "isto ime";
      this.korisnik.ime = this.ime;
      return;
    }
    if(this.prezime === this.korisnik.prezime){
      this.message = "isto prezime";
      this.korisnik.prezime = this.prezime;
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
    this.klijentService.update(this.korisnik.username, this.ime, this.prezime, this.email, this.kontaktTelefon, this.profilePicture).subscribe(resp=>{
	  this.commonService.checkUsernameKlijent(this.korisnik.username).subscribe((data: Klijent)=>{
        this.korisnik = data;
        this.message = "uspesno";
        this.commonService.login(data, "klijent");
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
