import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { KlijentComponent } from './klijent/klijent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AgencijaWebStranicaComponent } from './agencija-web-stranica/agencija-web-stranica.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AgencijaRadniciComponent } from './agencija-radnici/agencija-radnici.component';
import { AgencijaPosloviComponent } from './agencija-poslovi/agencija-poslovi.component';
import { AgencijaProfilComponent } from './agencija-profil/agencija-profil.component';
import { KlijentProfilComponent } from './klijent-profil/klijent-profil.component';
import { KlijentObjektiComponent } from './klijent-objekti/klijent-objekti.component';
import { KlijentAgencijeComponent } from './klijent-agencije/klijent-agencije.component';
import { KlijentPosloviComponent } from './klijent-poslovi/klijent-poslovi.component';
import { KreiranjeObjektaComponent } from './kreiranje-objekta/kreiranje-objekta.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { DodavanjeObjektaComponent } from './dodavanje-objekta/dodavanje-objekta.component';
import { KlijentZatraziSaradnjuComponent } from './klijent-zatrazi-saradnju/klijent-zatrazi-saradnju.component';
import { AdminAgencijeComponent } from './admin-agencije/admin-agencije.component';
import { AdminKlijentiComponent } from './admin-klijenti/admin-klijenti.component';
import { AdminRegistracijeComponent } from './admin-registracije/admin-registracije.component';
import { AdminPosloviComponent } from './admin-poslovi/admin-poslovi.component';
import { AdminProfilComponent } from './admin-profil/admin-profil.component';
import { AdminRegisterAgencijaComponent } from './admin-register-agencija/admin-register-agencija.component';
import { AdminRegisterKlijentComponent } from './admin-register-klijent/admin-register-klijent.component';
import { KlijentKomentarComponent } from './klijent-komentar/klijent-komentar.component';
import { AgencijaRegistracijaRadnikaComponent } from './agencija-registracija-radnika/agencija-registracija-radnika.component';
import { AdminZahteviRadnikaComponent } from './admin-zahtevi-radnika/admin-zahtevi-radnika.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgencijaComponent,
    KlijentComponent,
    RegisterComponent,
    PocetnaComponent,
    AgencijaWebStranicaComponent,
    AdminLoginComponent,
    AdminComponent,
    AgencijaRadniciComponent,
    AgencijaPosloviComponent,
    AgencijaProfilComponent,
    KlijentProfilComponent,
    KlijentObjektiComponent,
    KlijentAgencijeComponent,
    KlijentPosloviComponent,
    KreiranjeObjektaComponent,
    PromenaLozinkeComponent,
    DodavanjeObjektaComponent,
    KlijentZatraziSaradnjuComponent,
    AdminAgencijeComponent,
    AdminKlijentiComponent,
    AdminRegistracijeComponent,
    AdminPosloviComponent,
    AdminProfilComponent,
    AdminRegisterAgencijaComponent,
    AdminRegisterKlijentComponent,
    KlijentKomentarComponent,
    AgencijaRegistracijaRadnikaComponent,
    AdminZahteviRadnikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
