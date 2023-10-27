import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.typeOfKorisnik = sessionStorage.getItem("profilna");
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    //console.log(this.korisnik);
  }

  lozinkaControl = new FormControl();

  korisnik;
  stara: string;
  potvrdaLozinke: string;
  lozinka:string;
  message: string;
  messageLozinka: string;
  typeOfKorisnik;

  update(form: NgForm){
    this.message = "";
    this.messageLozinka = "";

    if(!form.valid){
      console.log(form.errors);
      this.message = "Nisu uneti svi podaci";
      return;
    }
    //console.log(this.stara)
    //console.log(this.korisnik.lozinka)
    if(this.stara !== this.korisnik.lozinka){
      this.message = "Pogresno uneta lozinka";
      return; 
    }

    if(this.lozinkaControl.errors){
      this.messageLozinka = "Ne ispravna lozinka";
      return; 
    }

    if(this.stara === this.lozinka){
      this.messageLozinka = "Nova lozinka ne moze biti ista kao stara"
    }
    if(this.typeOfKorisnik === "klijent")
      this.commonService.promeniLozinkuK(this.korisnik.username, this.lozinka).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Lozinka promenjena'
          sessionStorage.clear();
          this.router.navigate(['../login'])
        }
        else{
          this.message = 'Error'
        }
      });
    else if(this.typeOfKorisnik === "agencija"){
      this.commonService.promeniLozinkuA(this.korisnik.username, this.lozinka).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Lozinka promenjena'
          sessionStorage.clear();
          this.router.navigate(['../login'])
        }
        else{
          this.message = 'Error'
        }
      });
    }
    else{
      this.commonService.promeniLozinkuAdmin(this.korisnik.username, this.lozinka).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Lozinka promenjena'
          sessionStorage.clear();
          this.router.navigate(['../login'])
        }
        else{
          this.message = 'Error'
        }
      });
    }
    this.message = "ceka se";
  }
}
