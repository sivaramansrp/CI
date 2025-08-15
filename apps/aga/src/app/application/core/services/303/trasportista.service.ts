import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Transportista } from "@libs/shared/data-access-user/src";

@Injectable({
    providedIn: 'root'
})
export class TransportistaService {

    constructor(private http: HttpClient) {
    }

    /**
  * Buscar transportista persona física por RFC
  */
    buscarFisicaPorRFC(rfc: string): Observable<Transportista | undefined> {
        return this.http
            .get<Transportista[]>(`/assets/json/303/consulta-trasportista.json`)
            .pipe(map(list => list.find(t => t.rfc === rfc)));
    }

    /**
     * Buscar transportista persona moral por RFC
     */
    buscarMoralPorRFC(rfc: string): Observable<Transportista | undefined> {
        return this.http
            .get<Transportista[]>(`/assets/json/303/consulta-trasportista.json`)
            .pipe(map(list => list.find(t => t.rfc === rfc)));
    }
}