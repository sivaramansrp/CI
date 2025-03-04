import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutChoferNacionalService {
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';
  constructor(private http: HttpClient) {}

  getChoferNacionalData(): Observable<any> {
    return this.http.get<any>(this.urlServer);
  }
}
