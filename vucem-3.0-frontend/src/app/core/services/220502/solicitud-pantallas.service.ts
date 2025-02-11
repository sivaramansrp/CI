import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudPantallasService {

  private dataUrl = 'assets/json/220502/solicitud-pantallas-mock-data.json'; 

  constructor(public http: HttpClient) {
    this.getData()
  }

  getData(): Observable<object> {
    return this.http.get<object>(this.dataUrl);
  }
}
