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

    consultaTransportista(rfc: string): Observable<Transportista | undefined> {
        return this.http.get<Transportista[]>(`/assets/json/303/consulta-trasportista.json`).pipe(
            map((transportistas) => {
                return transportistas.find(t => t.rfc === rfc);
            })
        );
    }
}