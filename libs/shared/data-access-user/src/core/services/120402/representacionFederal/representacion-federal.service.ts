import { HttpCoreService } from '../../shared/http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepresentacionFederalService {
  constructor(private http: HttpCoreService) {
    // Lógica de inicialización si es necesario
  }

  getEntidad(): Observable<unknown> {
    return this.http.get('assets/json/130102/entidad_federativa.json');
  }

  getRepresentacion(): Observable<unknown> {
    return this.http.get('assets/json/130102/representacion_federal.json');
  }
}
