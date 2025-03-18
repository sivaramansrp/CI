import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { URL } from '../../constantes/fitosanitario.enum';

import { Catalogo, RespuestaCatalogos, SeccionLibStore } from '@libs/shared/data-access-user/src';


@Injectable({
  providedIn: 'root'
})
export class DatosMercanciaService {
  url: string = URL;
  constructor(private readonly http: HttpClient,
    private readonly seccionStore: SeccionLibStore,
  ) {
    // Constructor logic can be added here if needed
  }
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }
}
