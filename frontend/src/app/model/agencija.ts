import { Komentari } from "./komentari";

export class Agencija{
    username: string;
    lozinka: string;
    kontaktTelefon: string;
    email: string;
    naziv: string;
    drzava: string;
    grad: string;
    ulica: string;
    maticniBroj: string;
    opis: string;
    profilna: string;
    komentari: Array<Komentari>
    slobodnihMesta: number;
}