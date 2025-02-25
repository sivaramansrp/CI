import { Injectable } from '@angular/core';
import { HttpCoreService } from '../shared/http/http.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AsignacionData } from '../../models/120404/asignacionmodel';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteasigncionserviceService {

  constructor( private http: HttpCoreService) { }

  getAsigncion(): Observable<unknown> {
    return this.http.get('assets/json/120404/asigncionsolicitante.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  getAsigncionsolicitante(): Observable<unknown> {
    return this.http.get('assets/json/120404/getsolicitantetab.json');
  }}
