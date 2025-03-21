import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediodetransporteService {
  private readonly url = './assets/json/220402/mediodetransporte.json';

  constructor(private http: HttpClient) {}

  getMedioDeTransporte(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }
}
