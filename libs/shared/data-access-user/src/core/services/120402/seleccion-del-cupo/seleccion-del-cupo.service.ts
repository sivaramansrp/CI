import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCoreService } from '../../shared/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SeleccionDelCupoService {

  constructor( private http: HttpCoreService) { }

  getSeleccionDelCupo(): Observable<unknown> {
    return this.http.get('assets/json/120402/seleccion-del-cupo.json');
  }

  getRegimen(): Observable<unknown> {
    return this.http.get('assets/json/220201/regimen.json');
  }

  getTratado(): Observable<unknown> {
    return this.http.get('assets/json/110101/tratdos-dropdown.json');
  }

  getProducto(): Observable<unknown> {
    return this.http.get('assets/json/220202/nombre.json');
  }
}
