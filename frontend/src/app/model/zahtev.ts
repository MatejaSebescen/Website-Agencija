import { Komentari } from "./komentari";

export class Zahtev{
    tip: string;
    username: string;
    lozinka: string;
    kontaktTelefon: string;
    email: string;
    ime: string;
    prezime: string;
    naziv: string;
    drzava: string;
    grad: string;
    ulica: string;
    maticniBroj: string;
    opis: string;
    profilna: string;
    komentari: Array<Komentari>
    agencija: string;
    specijalizacija: string;
}
