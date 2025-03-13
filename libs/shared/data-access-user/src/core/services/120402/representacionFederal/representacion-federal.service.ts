import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCoreService } from '../../shared/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class RepresentacionFederalService {
  constructor(private http: HttpCoreService) {}

  getEntidad(): Observable<unknown> {
    return this.http.get('assets/json/130102/entidad_federativa.json');
  }

  getRepresentacion(): Observable<unknown> {
    return this.http.get('assets/json/130102/representacion_federal.json');
  }
}
