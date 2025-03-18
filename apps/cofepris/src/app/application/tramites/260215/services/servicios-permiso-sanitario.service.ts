import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciosPermisoSanitarioService {
  constructor(private http: HttpClient) {}

  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260215/banco-options.json');
  }
}
