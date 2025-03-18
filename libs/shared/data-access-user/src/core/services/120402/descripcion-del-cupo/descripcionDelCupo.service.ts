import { Injectable } from '@angular/core';
import { HttpCoreService } from '../../shared/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescripcionDelCupoService {

  constructor( private http: HttpCoreService) { }

  getDescripcionDelCupo(): Observable<unknown> {
    return this.http.get('assets/json/120402/descripcion-del-cupo.json');
  }

}
