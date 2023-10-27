import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjekatService } from '../objekat.service';
import { Objekat } from '../model/objekat';
import { Klijent } from '../model/klijent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent-objekti',
  templateUrl: './klijent-objekti.component.html',
  styleUrls: ['./klijent-objekti.component.css']
})
export class KlijentObjektiComponent implements OnInit {

  constructor(private objekatService: ObjekatService,private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(!this.korisnik || sessionStorage.getItem("profilna") !== "klijent")
    this.router.navigate(['../pocetna']);
    this.objekatService.getObjekat(this.korisnik.username).subscribe((data: Objekat[])=>{
      this.allObjekti = data;
      console.log(this.allObjekti);
    })
    this.updating = false;
    this.vrata = "levo";
  }
  korisnik: Klijent;
  allObjekti: Objekat[];
  ctx: CanvasRenderingContext2D;
  updating: boolean;
  currentlyUpdating: Objekat;
  
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

delete(adresa){
  this.objekatService.delete(this.korisnik.username, adresa).subscribe(resp=>{
    this.message = resp['message']
    this.objekatService.getObjekat(this.korisnik.username).subscribe((data: Objekat[])=>{
      this.allObjekti = data;
      
    })
  })
}

update(objekat){
  this.updating = true;
  this.currentlyUpdating = objekat;
  console.log(this.currentlyUpdating.skicaObjekta);
  sessionStorage.removeItem("canvas");
  this.kvadrat = [null,null,null];
  this.currentBrojProstorija = 0;
}

tip: string;
adresa: string;
kvadratura: string;
message: string;
kvadrat: prostorija[];
currentBrojProstorija: number;
updateCanvas: HTMLCanvasElement;
updateCtx: CanvasRenderingContext2D;

updateFinal(){
  this.message = "";
  if(!this.tip && !this.adresa && !this.kvadratura && !this.kvadrat[0]){
    this.message =  "Morate uneti neki podatak";
    return;
  }
  console.log(this.tip)
  if(this.tip && !(this.tip === "stan" || this.tip === "kuca")){
    this.message =  "Ne ispravno unet tip. Uneti ili ''stan'' ili ''kuca''";
    return;
  }
  if(this.kvadratura && !Number(this.kvadratura)){
    this.message =  "Ne ispravno uneta kvadratura";
    return;
  }
  console.log(this.tip)
  console.log(this.currentlyUpdating.tip)
  if(this.tip === this.currentlyUpdating.tip){
    this.message = "isti tip";
    return;
  }
  if(this.adresa === this.currentlyUpdating.adresa){
    this.message = "ista adresa";
    return;
  }
  if(Number(this.kvadratura) == this.currentlyUpdating.kvadratura){
    this.message = "ista kvadratura";
    return;
  }
  this.save();
  var kvadrati = sessionStorage.getItem("canvas");
  this.objekatService.update(this.korisnik.username,this.currentlyUpdating.adresa, this.adresa, this.currentBrojProstorija, this.kvadratura, this.tip, kvadrati).subscribe(resp=>{
    this.objekatService.getObjekat(this.korisnik.username).subscribe((data: Objekat[])=>{
      this.allObjekti = data;
      //this.updating = false;
      this.message = "uspesno";
    })
    console.log(resp['message']);
  })
  this.message = "ceka se...";
}
width:number;
height:number;
drawingReady:boolean;
draw(){
  if(!this.updateCanvas){
  this.updateCanvas = document.getElementById("updateCanvas") as HTMLCanvasElement;
  this.updateCtx = this.updateCanvas.getContext('2d');
  }
  this.message = "";
  //console.log(Number(this.width));
  //console.log(Number(this.height));
  if(isNaN(Number(this.width)) || isNaN(Number(this.height))){
    this.message = "Ne pravilan unos velicina";
    return;
  }
  this.drawingReady = true;
  this.message = "soba spremna";
}
vrata: string;
mouseDown(event){
  if(this.isOnKvadrat(event)){
    this.mouseKvadratDown(event);
    return;
  }
  console.log(this.currentBrojProstorija)
  if(!this.drawingReady || this.currentBrojProstorija == 3) return;
  this.updateCtx.strokeStyle = 'black';
  let vadr = this.updateCanvas.getBoundingClientRect();
  this.updateCtx.strokeRect(event.clientX - vadr.x, event.clientY - vadr.y, Number(this.width), Number(this.height));
  this.drawDoor(this.updateCtx,event.clientX - vadr.x, event.clientY - vadr.y, Number(this.width), Number(this.height),this.vrata);
  this.kvadrat[this.currentBrojProstorija++] = new prostorija(event.clientX - vadr.x,event.clientY - vadr.y, Number(this.width), Number(this.height), this.vrata,"white");
  this.message = "";
  this.drawingReady = false;
  console.log(this.kvadrat);
}
isMouseDown: boolean;
beforeX:number; 
beforeY:number;
mouseKvadratDown(event){
  console.log("mouse down");
  this.isMouseDown = true;
  let vadr = this.updateCanvas.getBoundingClientRect();
  this.beforeX = event.clientX - vadr.x;
  this.beforeY = event.clientY - vadr.y;
  this.drawing();
}

_collision(){
  this.collision(0);
  this.collision(1);
  this.collision(2);
}
isLocked:boolean;
strana: number;
isLockedOn:number;
collision(num: number){
  if(!this.kvadrat[num] || num == this.currentKvadrat) return;
  if(this.kvadrat[this.currentKvadrat].x                                             < this.kvadrat[num].x + this.kvadrat[num].width &&   //da li je collision
  this.kvadrat[this.currentKvadrat].y                                             < this.kvadrat[num].y + this.kvadrat[num].height &&
  this.kvadrat[this.currentKvadrat].x + this.kvadrat[this.currentKvadrat].width   > this.kvadrat[num].x &&
  this.kvadrat[this.currentKvadrat].y + this.kvadrat[this.currentKvadrat].height  > this.kvadrat[num].y){
   if(this.isLocked){
     switch(this.strana){
       case 0: this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y - this.kvadrat[this.currentKvadrat].height; break;
       case 1: this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x + this.kvadrat[num].width; break;
       case 2: this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y + this.kvadrat[num].height; break;
       case 3: this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x - this.kvadrat[this.currentKvadrat].width; break;
     }
   }
   else{
     this.isLocked = true;
     this.isLockedOn = num;
     if(this.beforeY < this.kvadrat[num].y + this.kvadrat[num].height && this.beforeY + this.kvadrat[this.currentKvadrat].height > this.kvadrat[num].y &&
       this.beforeX < this.kvadrat[num].x){
         this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x - this.kvadrat[this.currentKvadrat].width;
         this.strana = 3;
         console.log(this.strana);
     }
     else if(this.beforeY < this.kvadrat[num].y + this.kvadrat[num].height && this.beforeY + this.kvadrat[this.currentKvadrat].height > this.kvadrat[num].y &&
       this.beforeX > this.kvadrat[num].x){
         this.kvadrat[this.currentKvadrat].x = this.kvadrat[num].x + this.kvadrat[num].width;
         this.strana = 1;
         console.log(this.strana);
     }
     else if(this.beforeX < this.kvadrat[num].x + this.kvadrat[num].width && this.beforeX + this.kvadrat[this.currentKvadrat].width > this.kvadrat[num].x &&
       this.beforeY < this.kvadrat[num].y){
         this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y - this.kvadrat[this.currentKvadrat].height;
         this.strana = 0;
         console.log(this.strana);
     }
     else if(this.beforeX < this.kvadrat[num].x + this.kvadrat[num].width && this.beforeX + this.kvadrat[this.currentKvadrat].width > this.kvadrat[num].x &&
       this.beforeY > this.kvadrat[num].y){
         this.kvadrat[this.currentKvadrat].y = this.kvadrat[num].y + this.kvadrat[num].height;
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
 
  onMouseMove(event){
    if(!this.isMouseDown) return;
    let vadr = this.updateCanvas.getBoundingClientRect();
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
    let vadr = this.updateCanvas.getBoundingClientRect();
    let kvadrat = this.kvadrat[0];
    console.log(kvadrat)
    if(kvadrat && !(event.clientX - vadr.x < kvadrat.x || event.clientX - vadr.x > kvadrat.x + kvadrat.width || event.clientY - vadr.y < kvadrat.y || event.clientY - vadr.y > kvadrat.y + kvadrat.height))
      {
        this.currentKvadrat = 0;
        return true;}
    kvadrat = this.kvadrat[1];
    if(kvadrat && !(event.clientX - vadr.x < kvadrat.x || event.clientX - vadr.x > kvadrat.x + kvadrat.width || event.clientY - vadr.y < kvadrat.y || event.clientY - vadr.y > kvadrat.y + kvadrat.height))
    {
      this.currentKvadrat = 1;
      return true;}
    kvadrat = this.kvadrat[2];
    if(kvadrat && !(event.clientX - vadr.x < kvadrat.x || event.clientX - vadr.x > kvadrat.x + kvadrat.width || event.clientY - vadr.y < kvadrat.y || event.clientY - vadr.y > kvadrat.y + kvadrat.height))
    {
      this.currentKvadrat = 2;
      return true;}
    return false;
  }
/*save(){
  if(this.brojProstorija && this.currentBrojProstorija != Number(this.brojProstorija)){
    this.message = "Nije ubaceno dovoljno prostorija.\n Trenutni broj prostorija: "+this.currentBrojProstorija+" od "+ this.brojProstorija;
    return;
  }
  var kvadrati = [
    {"x":0, "y":0, "w":0,"h":0, "strana":"levo"},
    {"x":0, "y":0, "w":0,"h":0, "strana":"levo"},
    {"x":0, "y":0, "w":0,"h":0, "strana":"levo"}
 ];
 if(this.kvadrat[0]){
  kvadrati[0].x = this.kvadrat[0].x;
  kvadrati[0].y = this.kvadrat[0].y;
  kvadrati[0].w = this.kvadrat[0].width;
  kvadrati[0].h = this.kvadrat[0].height;
  kvadrati[0].strana = this.kvadrat[0].strana;
 }
 if(this.kvadrat[1]){
  kvadrati[1].x = this.kvadrat[1].x;
  kvadrati[1].y = this.kvadrat[1].y;
  kvadrati[1].w = this.kvadrat[1].width;
  kvadrati[1].h = this.kvadrat[1].height;
  kvadrati[1].strana = this.kvadrat[1].strana;
 }
 if(this.kvadrat[2]){
  kvadrati[2].x = this.kvadrat[2].x;
  kvadrati[2].y = this.kvadrat[2].y;
  kvadrati[2].w = this.kvadrat[2].width;
  kvadrati[2].h = this.kvadrat[2].height;
  kvadrati[2].strana = this.kvadrat[2].strana;
 }
  sessionStorage.setItem("canvas",JSON.stringify(kvadrati));

}*/

insertSkica(event){
  if(!this.updateCanvas){
  this.updateCanvas = document.getElementById("updateCanvas") as HTMLCanvasElement;
  this.updateCtx = this.updateCanvas.getContext('2d');
  }
  var f = new FileReader();
  const target = event.target as HTMLInputElement;
  const files = target.files as FileList;
  f.readAsText(files[0]);
  f.onload = (par) => {console.log(par.target.result);
  var obj = JSON.parse(String(par.target.result));
  console.log(obj[0].brojProstorija);
  for(let i=0;i<obj[0].brojProstorija;i++){
    if(!this.kvadrat[i]) this.kvadrat[i] = new prostorija(0,0,0,0,"","");
    this.kvadrat[i].x =      obj[0].skicaObjekta[i].x;
    this.kvadrat[i].y =      obj[0].skicaObjekta[i].y;
    this.kvadrat[i].width =  obj[0].skicaObjekta[i].w;
    this.kvadrat[i].height = obj[0].skicaObjekta[i].h;
    this.kvadrat[i].strana = obj[0].skicaObjekta[i].strana;
    this.kvadrat[i].boja = obj[0].skicaObjekta[i].boja;
  }
  this.currentBrojProstorija = obj[0].brojProstorija;
  console.log(this.kvadrat);
}
this.drawing();
}

currentKvadrat: number;
drawing(){
  requestAnimationFrame(this.drawing.bind(this));
  this.updateCtx.clearRect(0,0,this.updateCanvas.width,this.updateCanvas.height);
  if(this.kvadrat[0] && this.currentKvadrat != 0){
    this.updateCtx.strokeRect(this.kvadrat[0].x, this.kvadrat[0].y, this.kvadrat[0].width, this.kvadrat[0].height);
    this.drawDoor(this.updateCtx, this.kvadrat[0].x, this.kvadrat[0].y, this.kvadrat[0].width, this.kvadrat[0].height,this.kvadrat[0].strana);
  }

  if(this.kvadrat[1] && this.currentKvadrat != 1){
    this.updateCtx.strokeRect(this.kvadrat[1].x, this.kvadrat[1].y, this.kvadrat[1].width, this.kvadrat[1].height);
    this.drawDoor(this.updateCtx, this.kvadrat[1].x, this.kvadrat[1].y, this.kvadrat[1].width, this.kvadrat[1].height,this.kvadrat[1].strana);
  }

  if(this.kvadrat[2] && this.currentKvadrat != 2){
    this.updateCtx.strokeRect(this.kvadrat[2].x, this.kvadrat[2].y, this.kvadrat[2].width, this.kvadrat[2].height);
    this.drawDoor(this.updateCtx, this.kvadrat[2].x, this.kvadrat[2].y, this.kvadrat[2].width, this.kvadrat[2].height,this.kvadrat[2].strana);
  }
  if(this.kvadrat[this.currentKvadrat]){
  this.updateCtx.save();
  this.updateCtx.clearRect(this.kvadrat[this.currentKvadrat].x, this.kvadrat[this.currentKvadrat].y, this.kvadrat[this.currentKvadrat].width, this.kvadrat[this.currentKvadrat].height);
  this.updateCtx.strokeRect(this.kvadrat[this.currentKvadrat].x, this.kvadrat[this.currentKvadrat].y, this.kvadrat[this.currentKvadrat].width, this.kvadrat[this.currentKvadrat].height);
  this.drawDoor(this.updateCtx, this.kvadrat[this.currentKvadrat].x, this.kvadrat[this.currentKvadrat].y, this.kvadrat[this.currentKvadrat].width, this.kvadrat[this.currentKvadrat].height,this.kvadrat[this.currentKvadrat].strana);
  this.updateCtx.restore();
  }
}

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