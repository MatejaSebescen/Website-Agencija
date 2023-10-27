import { Component, OnInit } from '@angular/core';
import { Klijent } from '../model/klijent';
import { Poslovi } from '../model/poslovi';
import { PosloviService } from '../poslovi.service';
import { Objekat } from '../model/objekat';
import { ObjekatService } from '../objekat.service';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../model/agencija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent-poslovi',
  templateUrl: './klijent-poslovi.component.html',
  styleUrls: ['./klijent-poslovi.component.css']
})
export class KlijentPosloviComponent implements OnInit {

  constructor(private posloviService: PosloviService,private objekatService: ObjekatService, private agencijaService: AgencijaService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "klijent")
    this.router.navigate(['../pocetna']);
    this.isKomentarise = false;
    this.posloviService.getPoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      this.canvasLoaded = [];
      this.canvasLoaded.length = this.allPoslovi.length;
      for(let i=0;i<this.allPoslovi.length;i++){
        this.canvasLoaded[i] = false;
      }
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }
  korisnik: Klijent;
  allPoslovi: Poslovi[];
  allObjekti: Objekat[];
  canvasLoaded: boolean[];
  ctx: CanvasRenderingContext2D;
  message: string;

  load(skica: string,brojProstorija:number,k:number){
    if(this.canvasLoaded[k]) return;
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
    this.canvasLoaded[k] = true;
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
    this.posloviService.getPoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

  sortFinished(){
    this.posloviService.getFinishedPoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

  sortActive(){
    this.posloviService.getActivePoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

  sortRequests(){
    this.posloviService.getRequestsPoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
      this.allPoslovi = data;
      console.log(this.allPoslovi);
      this.allObjekti = [];
      this.allObjekti.length = this.allPoslovi.length;
      //console.log(this.allObjekti.length);
      for(let i=0;i<this.allPoslovi.length;i++){
        this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
          this.allObjekti[i] = data;
          console.log(this.allObjekti);
      })
      }
    })
  }

  plati(counter){
    let posao = this.allPoslovi[counter];
    this.posloviService.platiPosao(posao.klijent,posao.adresa,posao.agencija).subscribe(resp=>{
      this.posloviService.getPoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
        this.allPoslovi = data;
        console.log(this.allPoslovi);
        this.allObjekti = [];
        this.allObjekti.length = this.allPoslovi.length;
        //console.log(this.allObjekti.length);
        for(let i=0;i<this.allPoslovi.length;i++){
          this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
            this.allObjekti[i] = data;
            console.log(this.allObjekti);
        })
        }
      this.message = resp['message']
      })
    })
    this.message = "ceka se...";
  }

  isKomentarise: boolean;
  commentedAgencija: string;
  ocena: string;
  komentar: string;

  komentarisi(counter){
    this.commentedAgencija = this.allPoslovi[counter].agencija;
    this.isKomentarise = true;
    this.ocena = '1';
  }

  addComment(){
    this.message = ""
    let o = Number(this.ocena);
    if(!this.komentar){
      this.message = "Morate napisati neki komentar"
    }
    this.agencijaService.findKomentar(this.commentedAgencija, this.korisnik.username).subscribe((agencija: Agencija)=>{
      if(agencija.komentari)
        this.agencijaService.updateKomentar(this.commentedAgencija, this.korisnik.username, this.ocena, this.komentar).subscribe(resp=>{
          this.message = resp['message']
        })
      else
        this.agencijaService.addKomentar(this.commentedAgencija, this.korisnik.username, this.ocena, this.komentar).subscribe(resp=>{
          this.message = resp['message']
        })
    })
    this.message = "ceka se...";
  }

  prihvatiPonudu(k){
    this.message = ""
    let posao = this.allPoslovi[k];
    this.posloviService.prihvatiPonudu(posao.klijent,posao.adresa,posao.agencija).subscribe(resp=>{
      this.message = resp['message'];
      var skicaObjekta = JSON.parse(this.allObjekti[k].skicaObjekta);
      console.log(skicaObjekta);
      console.log(this.allObjekti[k].brojProstorija);
      let canvas = document.getElementById("canvas"+k) as HTMLCanvasElement;
      this.ctx = canvas.getContext('2d');
      this.ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i = 0; i < this.allObjekti[k].brojProstorija; i++){
        console.log("entered");
        this.ctx.fillStyle = "white";
        this.ctx.strokeRect(skicaObjekta[i].x-1, skicaObjekta[i].y-1, skicaObjekta[i].w+2, skicaObjekta[i].h+2);
        this.ctx.fillRect(skicaObjekta[i].x, skicaObjekta[i].y, skicaObjekta[i].w, skicaObjekta[i].h);
        this.drawDoor(this.ctx,skicaObjekta[i].x, skicaObjekta[i].y, skicaObjekta[i].w, skicaObjekta[i].h,skicaObjekta[i].strana);
        skicaObjekta[i].boja = "white";
      }
      console.log("skicaObjekta: "+skicaObjekta)
      this.save(skicaObjekta,k);
      var kvadrati = sessionStorage.getItem("canvas");
      console.log("kvadrati: "+kvadrati)
      this.objekatService.update(this.korisnik.username,this.allObjekti[k].adresa, null, null, null, null, kvadrati).subscribe(resp=>{
        sessionStorage.removeItem("canvas");
        this.posloviService.getPoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
          this.allPoslovi = data;
          console.log(this.allPoslovi);
          //console.log(this.allObjekti.length);
          for(let i=0;i<this.allPoslovi.length;i++){
            this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
              this.allObjekti[i] = data;
              console.log(this.allObjekti);
          })
          }
          for(let i=0;i<this.allPoslovi.length;i++){
            this.canvasLoaded[i] = false;
          }
        this.message = resp['message']
        })
      })
    })
  }

  save(skicaObjekta, k){
    var kvadrati = [
      {"x":0, "y":0, "w":0,"h":0, "strana":"levo", "boja": "white"},
      {"x":0, "y":0, "w":0,"h":0, "strana":"levo", "boja": "white"},
      {"x":0, "y":0, "w":0,"h":0, "strana":"levo", "boja": "white"}
   ];
   for(let i =0;i<this.allObjekti[k].brojProstorija;i++){
    kvadrati[i].x = skicaObjekta[i].x;
    kvadrati[i].y = skicaObjekta[i].y;
    kvadrati[i].w = skicaObjekta[i].w;
    kvadrati[i].h = skicaObjekta[i].h;
    kvadrati[i].strana = skicaObjekta[i].strana;
    kvadrati[i].boja = "white";
   }
    sessionStorage.setItem("canvas",JSON.stringify(kvadrati));
  
  }
  
  odbiPonudu(i){
    this.message = ""
    let posao = this.allPoslovi[i];
    this.posloviService.odbiPonudu(posao.klijent,posao.adresa,posao.agencija).subscribe(resp=>{
      this.message = resp['message'];
      this.posloviService.getPoslovi(this.korisnik.username).subscribe((data: Poslovi[])=>{
        this.allPoslovi = data;
        this.allObjekti = []
        this.allObjekti.length = this.allPoslovi.length;
        console.log(this.allPoslovi);
        //console.log(this.allObjekti.length);
        for(let i=0;i<this.allPoslovi.length;i++){
          this.objekatService.findObjekat(this.korisnik.username, this.allPoslovi[i].adresa).subscribe((data: Objekat)=>{
            this.allObjekti[i] = data;
            console.log(this.allObjekti);
        })
        }
      this.message = resp['message']
      })
    })
  }

}
