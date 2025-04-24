import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map} from 'rxjs';

import {Catalogo, RespuestaCatalogos} from '@libs/shared/data-access-user/src';
import { URL } from '../constantes/operaciones-de-comercio-exterior.enum';

import { Personas } from '../models/personas.module';


@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  url: string = URL;
  constructor(private readonly http: HttpClient
  ) {
    // Constructor logic can be added here if needed
  }
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }
  obtenerTablerList(fileName: string): Observable<Personas[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<Personas[]>(BASEURL).pipe(
      map(response => response)
    );
  }
}
