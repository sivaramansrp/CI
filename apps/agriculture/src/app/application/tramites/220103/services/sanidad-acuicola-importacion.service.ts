import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Mercancia } from "../../220103/modelos/sanidad-acuicola-importacion.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SanidadAcuicolaImportacionService {

    constructor(private http: HttpClient) { }

    getMercancias(): Observable<Mercancia[]> {
        return this.http.get<Mercancia[]>('assets/json/220103/mercancia.json');
    }
}