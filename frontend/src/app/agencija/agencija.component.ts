import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija',
  templateUrl: './agencija.component.html',
  styleUrls: ['./agencija.component.css']
})
export class AgencijaComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "agencija")
    this.router.navigate(['../pocetna']);
  }

  korisnik;
/*
  promeni(menu: string){
    switch(menu){
      case 'profil': 
      this.router.navigate(['profil']);
      break;
      case 'radnici': 
      this.router.navigate(['radnici']);
      break;
      case 'poslovi': 
      this.router.navigate(['poslovi']);
      break;
    }
  }
*/
}
