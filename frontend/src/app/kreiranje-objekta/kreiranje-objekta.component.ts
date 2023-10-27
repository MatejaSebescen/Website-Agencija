import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjekatService } from '../objekat.service';
import { Klijent } from '../model/klijent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kreiranje-objekta',
  templateUrl: './kreiranje-objekta.component.html',
  styleUrls: ['./kreiranje-objekta.component.css']
})  

export class KreiranjeObjektaComponent implements OnInit {

  constructor(private objekatService: ObjekatService, private router: Router) { }
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.data = JSON.parse(sessionStorage.getItem("PodaciZaDodavanjeObjekta"));
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || !this.data || sessionStorage.getItem("profilna") !== "klijent")
    this.router.navigate(['../pocetna']);
    //console.log(this.data);
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
    this.drawingReady = false;
    this.brojProstorija = this.data.brojProstorija;
    //console.log(this.brojProstorija);
    this.currentBrojProstorija = 0;
    this.kvadrat = [null,null,null];
    this.isMouseDown = false;
    this.vrata = "levo";
    this.kvadrat[0] = null;
    this.kvadrat[1] = null;
    this.kvadrat[2] = null;
  }
  
  korisnik: Klijent;
  data: any;
  ctx: CanvasRenderingContext2D;
  width: string;
  height: string;
  message: string;
  drawingReady: boolean;
  brojProstorija: number;
  currentBrojProstorija: number;
  kvadrat: Array<prostorija>;
  isMouseDown: boolean;
  currentKvadrat: number;
  isLocked: boolean;
  isLockedOn: number;
  strana: number;
  beforeX: number;
  beforeY: number;
  vrata: string;

  /*     0
      _______
      |     |
      |     |
    3 |     | 1
      |     |
      |_____|
         2
  */

  submit(){
    this.message = "";

    if(this.currentBrojProstorija != this.brojProstorija){
      this.message = "Niste uneli dovoljan broj prostorija";
      return;
    }

    this.save();
    var kvadrati = sessionStorage.getItem("canvas");
    this.objekatService.addObjekat(this.korisnik.username,this.data.tip,this.data.adresa,this.data.brojProstorija,this.data.kvadratura, kvadrati).subscribe(resp=>{
      this.message = resp['message'];
      sessionStorage.removeItem("PodaciZaDodavanjeObjekta");
      this.router.navigate(['../klijent/objekti']);
    })
  }

  draw(){
    this.message = "";
    if(this.currentBrojProstorija == this.brojProstorija){
      this.message = "Maksimalan broj soba je " + this.brojProstorija;
      return;
    }
    if(this.currentBrojProstorija == 3){
      this.message = "Limit je najvise 3 sobe";
      return;
    }
    //console.log(Number(this.width));
    //console.log(Number(this.height));
    if(isNaN(Number(this.width)) || isNaN(Number(this.height))){
      this.message = "Ne pravilan unos velicina";
      return;
    }
    if(Number(this.width)<=10 || Number(this.height)<=10){
      this.message = "Vrednosti ne mogu biti manje od 10";
      return;
    }
    this.drawingReady = true;
    this.message = "soba spremna";
    this.router.navigate["../klijent/objekti"]
  }

  mouseDown(event){
    if(this.isOnKvadrat(event)){
      this.mouseKvadratDown(event);
      return;
    }
    if(this.beforeCollision(event)) return;
    if(!this.drawingReady || this.currentBrojProstorija==3) return;
    this.ctx.strokeStyle = 'black';
    let vadr = this.canvas.nativeElement.getBoundingClientRect();
    this.ctx.fillStyle = "white";
    this.ctx.strokeRect(event.clientX - vadr.x-1, event.clientY - vadr.y-1, Number(this.width)+2,Number(this.height)+2);
    this.ctx.fillRect(event.clientX - vadr.x, event.clientY - vadr.y, Number(this.width), Number(this.height));
    this.drawDoor(event.clientX - vadr.x, event.clientY - vadr.y, Number(this.width), Number(this.height),this.vrata);
    this.kvadrat[this.currentBrojProstorija++] = new prostorija(event.clientX - vadr.x,event.clientY - vadr.y, Number(this.width), Number(this.height), this.vrata, "white");
    this.message = "";
    this.drawingReady = false;
    //console.log(this.kvadrat);
  }

  beforeCollision(event){
    for(let num=0;this.kvadrat[num];num++){
    let vadr = this.canvas.nativeElement.getBoundingClientRect();
    if(event.clientX - vadr.x-1                                          < this.kvadrat[num].x + this.kvadrat[num].width &&   //da li je collision
    event.clientY - vadr.y-1                                             < this.kvadrat[num].y + this.kvadrat[num].height &&
    event.clientX - vadr.x + Number(this.width)+2   > this.kvadrat[num].x &&
    event.clientY - vadr.y + Number(this.height)+2  > this.kvadrat[num].y){
      return true;
     }
    }
    return false;
  }

  drawDoor(x: number, y: number, width: number, height: number,strana:string){
    switch(strana){
      case "levo":
        this.ctx.beginPath();
        this.ctx.arc(x, y + height/2, 6, 0, 0.5 * Math.PI);
        this.ctx.moveTo(x, y + height/2);
        this.ctx.lineTo(x + 6, y + height/2);
        this.ctx.stroke();
        break;
      case "desno":
        this.ctx.beginPath();
        this.ctx.arc(x + width, y + height/2, 6, 1 * Math.PI, 0.5 * Math.PI, true);
        this.ctx.moveTo(x + width, y + height/2);
        this.ctx.lineTo(x + width - 6, y + height/2);
        this.ctx.stroke();
        break;
      case "gore":
        this.ctx.beginPath();
        this.ctx.arc(x + width/2, y, 6, 0.5 * Math.PI, 1 * Math.PI);
        this.ctx.moveTo(x + width/2, y);
        this.ctx.lineTo(x + width/2, y +6);
        this.ctx.stroke();
        break;
      case "dole":
        this.ctx.beginPath();
        this.ctx.arc(x + width/2, y + height, 6, 1.5 * Math.PI, 0 * Math.PI);
        this.ctx.moveTo(x + width/2, y + height);
        this.ctx.lineTo(x + width/2, y + height - 6);
        this.ctx.stroke();
        break;
    }

  }

  mouseKvadratDown(event){
    console.log("mouse down");
    this.isMouseDown = true;
    let vadr = this.canvas.nativeElement.getBoundingClientRect();
    this.beforeX = event.clientX - vadr.x;
    this.beforeY = event.clientY - vadr.y;
    this.drawing();
  }

  _collision(){
    this.collision(0);
    this.collision(1);
    this.collision(2);
  }

  collision(num: number){
    if(!this.kvadrat[num] || num == this.currentKvadrat) return;
    if(this.kvadrat[this.currentKvadrat].x-1                                          < this.kvadrat[num].x + this.kvadrat[num].width &&   //da li je collision
    this.kvadrat[this.currentKvadrat].y-1                                             < this.kvadrat[num].y + this.kvadrat[num].height &&
    this.kvadrat[this.currentKvadrat].x + this.kvadrat[this.currentKvadrat].width+2   > this.kvadrat[num].x &&
    this.kvadrat[this.currentKvadrat].y + this.kvadrat[this.currentKvadrat].height+2  > this.kvadrat[num].y){
     if(this.isLocked){
       switch(this.strana){
         case 0: this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y-1 - this.kvadrat[this.currentKvadrat].height-2; break;
         case 1: this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x + this.kvadrat[num].width+2; break;
         case 2: this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y + this.kvadrat[num].height+2; break;
         case 3: this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x-1 - this.kvadrat[this.currentKvadrat].width-2; break;
       }
     }
     else{
       this.isLocked = true;
       this.isLockedOn = num;
       if(this.beforeY < this.kvadrat[num].y + this.kvadrat[num].height && this.beforeY + this.kvadrat[this.currentKvadrat].height > this.kvadrat[num].y &&
         this.beforeX < this.kvadrat[num].x){
           this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x-1 - this.kvadrat[this.currentKvadrat].width-2;
           this.strana = 3;
           console.log(this.strana);
       }
       else if(this.beforeY < this.kvadrat[num].y + this.kvadrat[num].height && this.beforeY + this.kvadrat[this.currentKvadrat].height > this.kvadrat[num].y &&
         this.beforeX > this.kvadrat[num].x){
           this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x-1 + this.kvadrat[num].width+2;
           this.strana = 1;
           console.log(this.strana);
       }
       else if(this.beforeX < this.kvadrat[num].x + this.kvadrat[num].width && this.beforeX + this.kvadrat[this.currentKvadrat].width > this.kvadrat[num].x &&
         this.beforeY < this.kvadrat[num].y){
           this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y-1 - this.kvadrat[this.currentKvadrat].height-2;
           this.strana = 0;
           console.log(this.strana);
       }
       else if(this.beforeX < this.kvadrat[num].x + this.kvadrat[num].width && this.beforeX + this.kvadrat[this.currentKvadrat].width > this.kvadrat[num].x &&
         this.beforeY > this.kvadrat[num].y){
           this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y-1 + this.kvadrat[num].height+2;
           this.strana = 2;
           console.log(this.strana);
       }
     }
 }
 else {
  if(num == this.isLockedOn)
  this.isLocked = false;
  console.log("not locked")}
  }
/*
  if(this.kvadrat[this.currentKvadrat].x                                            < this.kvadrat[2].x + this.kvadrat[2].width &&
    this.kvadrat[this.currentKvadrat].y                                             < this.kvadrat[2].y + this.kvadrat[2].height &&
    this.kvadrat[this.currentKvadrat].x + this.kvadrat[this.currentKvadrat].width   > this.kvadrat[2].x &&
    this.kvadrat[this.currentKvadrat].y + this.kvadrat[this.currentKvadrat].height  > this.kvadrat[2].y)
    this.message = "collision!";
    */
  drawing(){
    requestAnimationFrame(this.drawing.bind(this));
    this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
    for(let i = 0; i<3;i++){
      if(this.kvadrat[i] && this.currentKvadrat != i){
        this.ctx.fillStyle = this.kvadrat[i].boja;
        this.ctx.strokeRect(this.kvadrat[i].x-1, this.kvadrat[i].y-1, this.kvadrat[i].width+2, this.kvadrat[i].height+2);
        this.ctx.fillRect(this.kvadrat[i].x, this.kvadrat[i].y, this.kvadrat[i].width, this.kvadrat[i].height);
        this.drawDoor(this.kvadrat[i].x, this.kvadrat[i].y, this.kvadrat[i].width, this.kvadrat[i].height,this.kvadrat[i].strana);
      }
    }

    if(this.kvadrat[this.currentKvadrat]){
    this.ctx.save();
    this.ctx.fillStyle = this.kvadrat[this.currentKvadrat].boja;
    this.ctx.clearRect(this.kvadrat[this.currentKvadrat].x, this.kvadrat[this.currentKvadrat].y, this.kvadrat[this.currentKvadrat].width, this.kvadrat[this.currentKvadrat].height);
    this.ctx.strokeRect(this.kvadrat[this.currentKvadrat].x-1, this.kvadrat[this.currentKvadrat].y-1, this.kvadrat[this.currentKvadrat].width+2, this.kvadrat[this.currentKvadrat].height+2);
    this.ctx.fillRect(this.kvadrat[this.currentKvadrat].x, this.kvadrat[this.currentKvadrat].y, this.kvadrat[this.currentKvadrat].width, this.kvadrat[this.currentKvadrat].height);
    this.drawDoor(this.kvadrat[this.currentKvadrat].x, this.kvadrat[this.currentKvadrat].y, this.kvadrat[this.currentKvadrat].width, this.kvadrat[this.currentKvadrat].height,this.kvadrat[this.currentKvadrat].strana);
    this.ctx.restore();
    }
  }

  onMouseMove(event){
    if(!this.isMouseDown) return;
    let vadr = this.canvas.nativeElement.getBoundingClientRect();
    this.kvadrat[this.currentKvadrat].x = event.clientX - vadr.x;
    this.kvadrat[this.currentKvadrat].y = event.clientY - vadr.y;
    this._collision();
    this.beforeX = event.clientX - vadr.x;
    this.beforeY = event.clientY - vadr.y;
  }

  onMouseUp(event){
    if(!this.isMouseDown) return;
    console.log("mouse up");
    this.isMouseDown = false;
  }
/*
  containsPoint = function (rect, x, y) {
    return !(x < rect.x ||
             x > rect.x + rect.width ||
             y < rect.y ||
             y > rect.y + rect.height);
  };
*/
  isOnKvadrat(event){
    let vadr = this.canvas.nativeElement.getBoundingClientRect();
    let kvadrat = this.kvadrat[0];
    let lastKvadrat = this.currentKvadrat;
    //console.log(kvadrat)
    if(kvadrat && !(event.clientX - vadr.x < kvadrat.x || event.clientX - vadr.x > kvadrat.x + kvadrat.width || event.clientY - vadr.y < kvadrat.y || event.clientY - vadr.y > kvadrat.y + kvadrat.height))
      {
        this.currentKvadrat = 0;
        if(this.currentKvadrat != lastKvadrat) this.isLocked = false;
        return true;}
    kvadrat = this.kvadrat[1];
    if(kvadrat && !(event.clientX - vadr.x < kvadrat.x || event.clientX - vadr.x > kvadrat.x + kvadrat.width || event.clientY - vadr.y < kvadrat.y || event.clientY - vadr.y > kvadrat.y + kvadrat.height))
    {
      this.currentKvadrat = 1;
      if(this.currentKvadrat != lastKvadrat) this.isLocked = false;
      return true;}
    kvadrat = this.kvadrat[2];
    if(kvadrat && !(event.clientX - vadr.x < kvadrat.x || event.clientX - vadr.x > kvadrat.x + kvadrat.width || event.clientY - vadr.y < kvadrat.y || event.clientY - vadr.y > kvadrat.y + kvadrat.height))
    {
      this.currentKvadrat = 2;
      if(this.currentKvadrat != lastKvadrat) this.isLocked = false;
      return true;}
    return false;
  }

  insertSkica(event){
    var f = new FileReader();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    f.readAsText(files[0]);
    f.onload = (par) => {console.log(par.target.result);
    var obj = JSON.parse(String(par.target.result));
    console.log(obj[0].brojProstorija);
    this.currentBrojProstorija = obj[0].brojProstorija;
    for(let i=0;i<obj[0].brojProstorija;i++){
      if(!this.kvadrat[i]) this.kvadrat[i] = new prostorija(0,0,0,0,"","");
      this.kvadrat[i].x =      obj[0].skicaObjekta[i].x;
      this.kvadrat[i].y =      obj[0].skicaObjekta[i].y;
      this.kvadrat[i].width =  obj[0].skicaObjekta[i].w;
      this.kvadrat[i].height = obj[0].skicaObjekta[i].h;
      this.kvadrat[i].strana = obj[0].skicaObjekta[i].strana;
      this.kvadrat[i].boja = obj[0].skicaObjekta[i].boja;
    }
    console.log(this.kvadrat);
  }
  this.drawing();
}

  save(){
    var kvadrati = [
      {"x":0, "y":0, "w":0,"h":0, "strana":"levo", "boja": "white"},
      {"x":0, "y":0, "w":0,"h":0, "strana":"levo", "boja": "white"},
      {"x":0, "y":0, "w":0,"h":0, "strana":"levo", "boja": "white"}
   ];
   for(let i =0;i<this.currentBrojProstorija;i++){
    kvadrati[i].x = this.kvadrat[i].x;
    kvadrati[i].y = this.kvadrat[i].y;
    kvadrati[i].w = this.kvadrat[i].width;
    kvadrati[i].h = this.kvadrat[i].height;
    kvadrati[i].strana = this.kvadrat[i].strana;
    kvadrati[i].boja = this.kvadrat[i].boja;
   }
    sessionStorage.setItem("canvas",JSON.stringify(kvadrati));

  }
  /*
  load(){
    console.log(sessionStorage.getItem("canvas"));
    var kvadrati = JSON.parse(sessionStorage.getItem("canvas"));
    if(!kvadrati) return;
    this.brojProstorija = kvadrati[0].brojProstorija;
    console.log(this.brojProstorija);
    console.log(kvadrati);
    if(this.brojProstorija > 0 && kvadrati[0]){
     if(!this.kvadrat[0]) this.kvadrat[0] = new prostorija(0,0,0,0,"","");
     this.kvadrat[0].x =      kvadrati[0].x;
     this.kvadrat[0].y =      kvadrati[0].y;
     this.kvadrat[0].width =  kvadrati[0].w;
     this.kvadrat[0].height = kvadrati[0].h;
     this.kvadrat[0].strana = kvadrati[0].strana;
    }
    else this.kvadrat[0] = null;
    if(this.brojProstorija > 1 && kvadrati[1]){
      if(!this.kvadrat[1]) this.kvadrat[1] = new prostorija(0,0,0,0,"","");
      this.kvadrat[1].x =      kvadrati[1].x;
      this.kvadrat[1].y =      kvadrati[1].y;
      this.kvadrat[1].width =  kvadrati[1].w;
      this.kvadrat[1].height = kvadrati[1].h;
      this.kvadrat[1].strana = kvadrati[1].strana;
    }
    else this.kvadrat[1] = null;
    if(this.brojProstorija == 3 && kvadrati[2]){
      if(!this.kvadrat[2]) this.kvadrat[2] = new prostorija(0,0,0,0,"","");
      this.kvadrat[2].x =      kvadrati[2].x;
      this.kvadrat[2].y =      kvadrati[2].y;
      this.kvadrat[2].width =  kvadrati[2].w;
      this.kvadrat[2].height = kvadrati[2].h;
      this.kvadrat[2].strana = kvadrati[2].strana;
    }
    else this.kvadrat[2] = null;
    this.drawing();
  }*/
  
}

class prostorija{

  constructor(x:number,y:number,w:number,h:number,strana:string, boja:string){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.strana = strana;
    this.boja = boja;
  }
  x: number;
  y: number;
  width: number;
  height: number;
  strana: string;
  boja: string;
}
/*
  //JSON object
  var buildings = [
    {"id":"ID1", "px":10, "py":50,"w":60, "h":60, "bgColor":"black"},
    {"id":"ID2", "px":110, "py":50,"w":60, "h":60, "bgColor":"grey"},
    {"id":"ID3", "px":220, "py":50,"w":60, "h":60, "bgColor":"yellow"}
 ];
 
 for(var i = 0; i < buildings.length ; i++ ){
   var line = buildings[i];
   ctx.fillStyle = line.bgColor;
   ctx.fillRect(line.px,line.py,line.w,line.h);
 }
 */