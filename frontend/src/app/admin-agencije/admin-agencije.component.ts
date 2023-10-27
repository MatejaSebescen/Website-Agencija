import { Component, OnInit } from '@angular/core';
import { AgencijaService } from '../agencija.service';
import { Router } from '@angular/router';
import { Agencija } from '../model/agencija';
import { FormControl, NgForm } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-admin-agencije',
  templateUrl: './admin-agencije.component.html',
  styleUrls: ['./admin-agencije.component.css']
})
export class AdminAgencijeComponent implements OnInit {

  constructor(private agencijaService: AgencijaService,private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "admin")
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

  delete(username){
    this.agencijaService.delete(username).subscribe(resp=>{
      this.message = resp['message']
      this.agencijaService.getAllAgencija().subscribe((data: Agencija[])=>{
        this.allAgencija = data;
      })
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
  
  updating: boolean;
  counter: number;
  currentlyUpdating: Agencija;
  naziv: string;
  grad: string;
  ulica: string;
  opis: string;
  email: string;
  kontaktTelefon: string;
  profilePicture;
  img;

  kontaktTelefonControl = new FormControl();
  emailControl = new FormControl();


  updatingF(agencija, counter){
    this.updating = true;
    this.counter = counter;
    this.currentlyUpdating = agencija;
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
    console.log(this.currentlyUpdating.naziv);
    if(this.naziv === this.currentlyUpdating.naziv){
      this.message = "isti naziv";
      this.currentlyUpdating.naziv = this.naziv;
      return;
    }
    if(this.grad === this.currentlyUpdating.grad){
      this.message = "isti grad";
      this.currentlyUpdating.grad = this.grad;
      return;
    }
    if(this.ulica === this.currentlyUpdating.ulica){
      this.message = "ista ulica";
      this.currentlyUpdating.ulica = this.ulica;
      return;
    }
    if(this.opis === this.currentlyUpdating.opis){
      this.message = "isti opis";
    this.currentlyUpdating.opis = this.opis;
    return;
  }
    if(this.email === this.currentlyUpdating.email){
      this.message = "isti email";
      this.currentlyUpdating.email = this.email;
      return;
    }
    if(this.kontaktTelefon === this.currentlyUpdating.kontaktTelefon){
      this.message = "isti kontaktTelefon";
      this.currentlyUpdating.kontaktTelefon = this.kontaktTelefon;
      return;
    }
    this.agencijaService.update(this.currentlyUpdating.username, this.naziv, this.grad, this.ulica, this.opis, this.email, this.kontaktTelefon, this.profilePicture).subscribe(resp=>{
	  this.commonService.checkUsernameAgencija(this.currentlyUpdating.username).subscribe((data: Agencija)=>{
        this.allAgencija[this.counter] = data;
        this.message = "uspesno";
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
