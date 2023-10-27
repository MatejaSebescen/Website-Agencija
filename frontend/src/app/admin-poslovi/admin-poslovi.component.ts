import { Component, OnInit } from '@angular/core';
import { Poslovi } from '../model/poslovi';
import { PosloviService } from '../poslovi.service';
import { Objekat } from '../model/objekat';
import { ObjekatService } from '../objekat.service';
import { AgencijaService } from '../agencija.service';
import { Router } from '@angular/router';
import { Klijent } from '../model/klijent';

@Component({
  selector: 'app-admin-poslovi',
  templateUrl: './admin-poslovi.component.html',
  styleUrls: ['./admin-poslovi.component.css']
})
export class AdminPosloviComponent implements OnInit {

  constructor(private posloviService: PosloviService,private objekatService: ObjekatService, private agencijaService: AgencijaService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "admin")
    this.router.navigate(['../pocetna']);
    this.posloviService.getAllPoslovi().subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }
  korisnik: Klijent;
  allPoslovi: Poslovi[];
  allObjekti: Objekat[];
  ctx: CanvasRenderingContext2D;
  message: string;

  load(skica: string,brojProstorija:number,k:number){
    console.log(skica);
    var skicaObjekta = JSON.parse(skica);
    console.log(skicaObjekta);
    console.log(brojProstorija);
    let canvas = document.getElementById("canvas"+k) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d');
    this.ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < brojProstorija; i++){
      console.log("entered");
      this.ctx.fillStyle = skicaObjekta[i].boja;
      this.ctx.strokeRect(skicaObjekta[i].x-1, skicaObjekta[i].y-1, skicaObjekta[i].w+2, skicaObjekta[i].h+2);
      this.ctx.fillRect(skicaObjekta[i].x, skicaObjekta[i].y, skicaObjekta[i].w, skicaObjekta[i].h);
      this.drawDoor(this.ctx,skicaObjekta[i].x, skicaObjekta[i].y, skicaObjekta[i].w, skicaObjekta[i].h,skicaObjekta[i].strana);
    }
  }

  drawDoor(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number,strana:string){
    switch(strana){
      case "levo":
        context.beginPath();
        context.arc(x, y + height/2, 6, 0, 0.5 * Math.PI);
        context.moveTo(x, y + height/2);
        context.lineTo(x + 6, y + height/2);
        context.stroke();
        break;
      case "desno":
        context.beginPath();
        context.arc(x + width, y + height/2, 6, 1 * Math.PI, 0.5 * Math.PI, true);
        context.moveTo(x + width, y + height/2);
        context.lineTo(x + width - 6, y + height/2);
        context.stroke();
        break;
      case "gore":
        context.beginPath();
        context.arc(x + width/2, y, 6, 0.5 * Math.PI, 1 * Math.PI);
        context.moveTo(x + width/2, y);
        context.lineTo(x + width/2, y +6);
        context.stroke();
        break;
      case "dole":
        context.beginPath();
        context.arc(x + width/2, y + height, 6, 1.5 * Math.PI, 0 * Math.PI);
        context.moveTo(x + width/2, y + height);
        context.lineTo(x + width/2, y + height - 6);
        context.stroke();
        break;
    }
  
  }

  sortAllJobs(){
    this.posloviService.getAllPoslovi().subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

  sortFinished(){
    this.posloviService.getAllFinishedPoslovi().subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

  sortActive(){
    this.posloviService.getAllActivePoslovi().subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

  sortRequests(){
    this.posloviService.getAllRequestsPoslovi().subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

}
