import { Component, OnInit } from '@angular/core';
import { Klijent } from '../model/klijent';
import { Poslovi } from '../model/poslovi';
import { Objekat } from '../model/objekat';
import { PosloviService } from '../poslovi.service';
import { ObjekatService } from '../objekat.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija-poslovi',
  templateUrl: './agencija-poslovi.component.html',
  styleUrls: ['./agencija-poslovi.component.css']
})
export class AgencijaPosloviComponent implements OnInit {

  constructor(private posloviService: PosloviService, private objekatService: ObjekatService, private commonService: CommonService,private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "agencija")
    this.router.navigate(['../pocetna']);
    this.posloviService.getPosloviAgencije(this.korisnik.username).subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      this.allKlijenti = [];
      this.allKlijenti.length = this.allPoslovi.length;
      this.cena = [];
      this.cena.length = this.allPoslovi.length;
      this.chosenColor = [];
      this.chosenColor.length = this.allPoslovi.length;
      this.canvasLoaded = [];
      this.canvasLoaded.length = this.allPoslovi.length;
      for(let i=0;i<this.allPoslovi.length;i++)
        this.canvasLoaded[i] = false;
        for(let i=0;i<this.allPoslovi.length;i++)
          this.chosenColor[i] = "crvena";
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      this.commonService.checkUsernameKlijent(this.allPoslovi[i].klijent).subscribe((data: Klijent)=>{
        this.allKlijenti[i] = data;
        console.log(this.allObjekti);
      })
      }
    })
  }

  cena: string[];
  korisnik: Klijent;
  allPoslovi: Poslovi[];
  allObjekti: Objekat[];
  allKlijenti: Klijent[];
  ctx: CanvasRenderingContext2D;
  message: string;
  
  mouseDown(skicaObjekta, brojProstorija, event, i){
    if(this.allPoslovi[i].status !== "Aktivan") return;
  if(this.canvasLoaded[i]){
    this.isOnKvadrat(skicaObjekta, brojProstorija, event, i)
    return;
  }
}

currentKvadrat: number;
chosenColor: string[];
canvasLoaded: boolean[];

isOnKvadrat(skicaObjekta, brojProstorija, event, i){
  var kvadrati = JSON.parse(skicaObjekta);
  let canvas = document.getElementById("canvas"+i) as HTMLCanvasElement;
  let vadr = canvas.getBoundingClientRect();
  console.log(kvadrati)
  console.log(brojProstorija)
  console.log("x:"+ (event.clientX - vadr.x)+"\ny:"+(event.clientY - vadr.y))
  for(let k = 0; k < brojProstorija; k++){
    let kvadrat = kvadrati[k];
    console.log(kvadrat.x + "<" + (event.clientX - vadr.x) + "<" + (kvadrat.x + kvadrat.w))
  if(kvadrat && (event.clientX - vadr.x > kvadrat.x && event.clientX - vadr.x < kvadrat.x + kvadrat.w && event.clientY - vadr.y > kvadrat.y && event.clientY - vadr.y < kvadrat.y + kvadrat.h))
    {
      console.log("usao")
      console.log(kvadrat)
      this.currentKvadrat = k;
      if(kvadrat.boja === "red" && this.chosenColor[i] === "zelena")
        kvadrat.boja = "green";
      else if(kvadrat.boja === "white" && this.chosenColor[i] === "crvena")
        kvadrat.boja = "red";
      kvadrati[k] = kvadrat;

      let color = 0;
      for(let j = 0; j < brojProstorija; j++){
        if(kvadrati[j].boja === "green")
          color++;
      }
      console.log("boja: "+color)
      if(color == brojProstorija){
        this.posloviService.finishPosao(this.allPoslovi[i].klijent, this.allPoslovi[i].agencija, this.allPoslovi[i].adresa).subscribe(resp=>{
          console.log(resp['message'])
          this.canvasLoaded[i] = false;
        })
      }
      this.objekatService.updateColors(this.allKlijenti[i].username, this.allObjekti[i].adresa, skicaObjekta, JSON.stringify(kvadrati)).subscribe(resp=>{
        
    this.posloviService.getPosloviAgencije(this.korisnik.username).subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      this.commonService.checkUsernameKlijent(this.allPoslovi[i].klijent).subscribe((data: Klijent)=>{
        this.allKlijenti[i] = data;
        console.log(this.allObjekti);
      })
      }
    })
      })
      return true;}
  }
  return false;
}

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
    if(this.allPoslovi[k].status === "Aktivan")
      this.canvasLoaded[k] =true
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

  odbiPosao(k){
    let posao = this.allPoslovi[k];
    this.posloviService.odbiPosao(posao.klijent,posao.adresa,posao.agencija).subscribe(resp=>{
      this.message = resp['message'];
      this.posloviService.getPosloviAgencije(this.korisnik.username).subscribe((data: Poslovi[])=>{
        this.allPoslovi = data;
        //console.log(this.allObjekti.length);
        for(let i=0;i<this.allPoslovi.length;i++){
          this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
            this.allObjekti[i] = data;
            console.log(this.allObjekti);
        })
        this.commonService.checkUsernameKlijent(this.allPoslovi[i].klijent).subscribe((data: Klijent)=>{
          this.allKlijenti[i] = data;
          console.log(this.allObjekti);
        })
        }
      })
    })
  }
  
  poslatiPonudu(k){
    this.message = ""
    if(Number.isNaN(Number(this.cena[k]))){
      console.log("Ne pravilan unos");
      return;
    } 
    let posao = this.allPoslovi[k];
    this.posloviService.posaljiPonudu(posao.klijent,posao.adresa,posao.agencija, Number(this.cena[k])).subscribe(resp=>{
      this.message = resp['message'];
      this.posloviService.getPosloviAgencije(this.korisnik.username).subscribe((data: Poslovi[])=>{
        this.allPoslovi = data;
        //console.log(this.allObjekti.length);
        for(let i=0;i<this.allPoslovi.length;i++){
          this.objekatService.findObjekat(this.allPoslovi[i].klijent, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
            this.allObjekti[i] = data;
            console.log(this.allObjekti);
        })
        this.commonService.checkUsernameKlijent(this.allPoslovi[i].klijent).subscribe((data: Klijent)=>{
          this.allKlijenti[i] = data;
          console.log(this.allObjekti);
        })
        }
      })
    })
    this.message = "Ceka se..."
  }
}
