import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Klijent } from '../model/klijent';
import { KlijentService } from '../klijent.service';
import { CommonService } from '../common.service';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../model/agencija';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private KlijentService: KlijentService, private AgencijaService: AgencijaService, private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    //this.commonService.isPrijavljen$.subscribe(res => this.isPrijavljen = res)
    //console.log(btoa("fdsa"));
    this.isKlijent = "true";
  }

  username: string;
  password: string;
  message: string;
  profilePicture;
  isKlijent: string;

  changeB(event){
      var f = new FileReader();
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      f.readAsDataURL(files[0]);
      f.onload = (par) => {
        this.profilePicture = par.target.result;
        console.log(this.profilePicture);
      }
  }

  login(){
    if(this.isKlijent == "true")
    this.KlijentService.login(this.username, this.password).subscribe((KlijentFromDB: Klijent)=>{
      console.log(KlijentFromDB);
      if(KlijentFromDB){
        this.commonService.login(KlijentFromDB, "klijent");
		  //localStorage.setItem(key,value). Slozeni objekti kao value moraju preko JSON.stringify
		  //localStorage.getItem(key). Ako se ocekuje slozen objekat uzima se preko JSON.parse
        this.router.navigate(['klijent']);
      }
      else{
        this.message="Error"
      }
    })
    else
    this.AgencijaService.login(this.username, this.password).subscribe((AgencijaFromDB: Agencija)=>{
      console.log(AgencijaFromDB);
      if(AgencijaFromDB){
        this.commonService.login(AgencijaFromDB, "agencija");
		  //localStorage.setItem(key,value). Slozeni objekti kao value moraju preko JSON.stringify
		  //localStorage.getItem(key). Ako se ocekuje slozen objekat uzima se preko JSON.parse
        this.router.navigate(['agencija']);
      }
      else{
        this.message="Error"
      }
    })
  }

}
