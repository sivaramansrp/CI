import { Catalogo } from '../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediodetransporteService {
  private readonly url = './assets/json/220401/mediodetransporte.json';

  constructor(private http: HttpClient) {}

  getMedioDeTransporte(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }
}
