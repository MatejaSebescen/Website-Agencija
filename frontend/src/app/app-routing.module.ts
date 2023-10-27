import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencijaComponent } from './agencija/agencija.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KlijentComponent } from './klijent/klijent.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AgencijaWebStranicaComponent } from './agencija-web-stranica/agencija-web-stranica.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AgencijaPosloviComponent } from './agencija-poslovi/agencija-poslovi.component';
import { AgencijaProfilComponent } from './agencija-profil/agencija-profil.component';
import { AgencijaRadniciComponent } from './agencija-radnici/agencija-radnici.component';
import { KlijentProfilComponent } from './klijent-profil/klijent-profil.component';
import { KlijentPosloviComponent } from './klijent-poslovi/klijent-poslovi.component';
import { KlijentAgencijeComponent } from './klijent-agencije/klijent-agencije.component';
import { KlijentObjektiComponent } from './klijent-objekti/klijent-objekti.component';
import { KreiranjeObjektaComponent } from './kreiranje-objekta/kreiranje-objekta.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { DodavanjeObjektaComponent } from './dodavanje-objekta/dodavanje-objekta.component';
import { KlijentZatraziSaradnjuComponent } from './klijent-zatrazi-saradnju/klijent-zatrazi-saradnju.component';
import { AdminAgencijeComponent } from './admin-agencije/admin-agencije.component';
import { AdminKlijentiComponent } from './admin-klijenti/admin-klijenti.component';
import { AdminRegistracijeComponent } from './admin-registracije/admin-registracije.component';
import { AdminPosloviComponent } from './admin-poslovi/admin-poslovi.component';
import { AdminProfilComponent } from './admin-profil/admin-profil.component';
import { AdminRegisterKlijentComponent } from './admin-register-klijent/admin-register-klijent.component';
import { AdminRegisterAgencijaComponent } from './admin-register-agencija/admin-register-agencija.component';
import { AgencijaRegistracijaRadnikaComponent } from './agencija-registracija-radnika/agencija-registracija-radnika.component';
import { AdminZahteviRadnikaComponent } from './admin-zahtevi-radnika/admin-zahtevi-radnika.component';

const routes: Routes = [
  {path: "", component: PocetnaComponent},
  {path: "pocetna", component: PocetnaComponent},
  {path: "klijent", component: KlijentComponent,
  children: [{
      path: "",
      component: PromenaLozinkeComponent
    },
    {
      path: "promenaL",
      component: PromenaLozinkeComponent
    },
    {
      path: "profil",
      component: KlijentProfilComponent
    },
    {
      path: "poslovi",
      component: KlijentPosloviComponent
    },
    {
      path: "agencije",
      component: KlijentAgencijeComponent
    },
    {
      path: "objekti",
      component: KlijentObjektiComponent
    },
    {
      path: "kreiranje",
      component: KreiranjeObjektaComponent
    },
    {
      path: "dodavanje",
      component: DodavanjeObjektaComponent
    },
    {
      path: "saradnja",
      component: KlijentZatraziSaradnjuComponent
    }
  ]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'agencija', component: AgencijaComponent,
    children: [{
        path: "",
        component: PromenaLozinkeComponent
      },
      {
        path: "promenaL",
        component: PromenaLozinkeComponent
      },
      {
        path: "profil",
        component: AgencijaProfilComponent
      },
      {
        path: "poslovi",
        component: AgencijaPosloviComponent
      },
      {
        path: "radnici",
        component: AgencijaRadniciComponent
      },
      {
        path: "registerRadnik",
        component: AgencijaRegistracijaRadnikaComponent
      }
    ]},
  {path: 'agencija-web-stranica', component: AgencijaWebStranicaComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin', component: AdminComponent,
    children: [{
      path: "",
      component: PromenaLozinkeComponent
    },
    {
      path: "promenaL",
      component: PromenaLozinkeComponent
    },
    {
      path: "registerAgencija",
      component: AdminRegisterAgencijaComponent
    },
    {
      path: "registerKlijent",
      component: AdminRegisterKlijentComponent
    },
    {
      path: "agencije",
      component: AdminAgencijeComponent
    },
    {
      path: "zahtevRadnika",
      component: AdminZahteviRadnikaComponent
    },
    {
      path: "profil",
      component: AdminProfilComponent
    },
    {
      path: "klijenti",
      component: AdminKlijentiComponent
    },
    {
      path: "registracije",
      component: AdminRegistracijeComponent
    },
    {
      path: "poslovi",
      component: AdminPosloviComponent
    },]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
