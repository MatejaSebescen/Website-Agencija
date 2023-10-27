import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, private commonService: CommonService) {
    router.events.subscribe((val)=>{
      this.isPrijavljen = commonService.getPrijavljen();
      this.profil = commonService.getProfil();
      //console.log(this.profil);
    })
   }

  ngOnInit() {
  }

  isPrijavljen;
  profil: string;

  logout(){
    sessionStorage.clear()
    //localStorage.clear()
    this.router.navigate([''])
  }
}
