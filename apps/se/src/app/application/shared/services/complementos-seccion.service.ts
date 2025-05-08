import { Injectable } from "@angular/core"
import { Observable } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { NacionalidadMaxicana } from "../models/complimentos-seccion.model";

@Injectable({
    providedIn: 'root',
  })
export class ComplementosSeccionService {
    constructor(private http: HttpClient) {
        //constructor
      }
    getNacionalidadMaxicanaData(): Observable<NacionalidadMaxicana[]> {
        return this.http.get<NacionalidadMaxicana[]>('assets/json/260401/radioSiNo.json');
      }
      getTipoPersonaData(): Observable<NacionalidadMaxicana[]> {
        return this.http.get<NacionalidadMaxicana[]>('assets/json/80103/tipo_persona.json');
      }

}



