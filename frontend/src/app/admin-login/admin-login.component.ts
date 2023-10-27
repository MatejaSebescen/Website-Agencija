import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Klijent } from '../model/klijent';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private AdminService: AdminService, private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    //this.commonService.isPrijavljen$.subscribe(res => this.isPrijavljen = res)
    //console.log(btoa("fdsa"));
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.AdminService.login(this.username, this.password).subscribe((AdminFromDB: Klijent)=>{
      console.log(AdminFromDB);
      if(AdminFromDB!=null){
        this.commonService.login(AdminFromDB, "admin");
        this.router.navigate(['admin']);
      }
      else{
        this.message="Error"
      }
    })
    
  }

}
