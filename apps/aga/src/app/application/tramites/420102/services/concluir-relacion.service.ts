import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map} from 'rxjs';
import { DatosDelContenedorTabla } from '../models/tramite420102.enum';
import { URL } from '../constantes/concluir-relacion.enum';


@Injectable({
  providedIn: 'root'
})
export class ConcluirRelacionService {

  url: string = URL;

  constructor(private readonly http: HttpClient) { }

  obtenerTablerList(fileName: string): Observable<DatosDelContenedorTabla[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<DatosDelContenedorTabla[]>(BASEURL).pipe(
      map(response => response)
    );
  }
}
