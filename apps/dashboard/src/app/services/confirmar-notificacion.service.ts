import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmarNotificacionService {
  constructor(public http: HttpClient) {
    //constructor
  }

  getAcuseReciboDatos(): Observable<any> {
    return this.http.get<any>(
      //  D:\VUECEM\frontend\libs\shared\theme\assets\json\confirmar-notificacion\acuseDeRecibo .json
      'assets/json/confirmar-notificacion/acuseDeRecibo.json'
    );
  }

  getFolioDatos(): Observable<any> {
    return this.http.get<any>(
      //D:\VUECEM\frontend\libs\shared\theme\assets\json\confirmar-notificacion\confirmar-notificacion.json
      'assets/json/confirmar-notificacion/confirmar-notificacion.json'
    );
  }
}
