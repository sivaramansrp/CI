import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { JSONResponse } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { AcuseYResolucionesFolioTramite } from '../../../models/shared/acuse-y-resoluciones-folio-tramite.model';
import { AcuseYResolucionesFolioTramiteDetalles } from '../../../models/shared/acuse-y-resoluciones-foilio-tramite-detalles.model';

@Injectable({
  providedIn: 'root',
})
export class AcuseYResolucionesFolioTramiteService {
  constructor(private http: HttpClient) {}
 
  getAcuseYResolucionesFolioTramite(): Observable<AcuseYResolucionesFolioTramite[]> {
    return this.http.get<AcuseYResolucionesFolioTramite[]>('./assets/json/shared/acuses-y-resoluciones-folio-tramite.json');
  }

  getAcuseYResolucionesFolioTramiteDeatlles(): Observable<AcuseYResolucionesFolioTramiteDetalles[]> {
    return this.http.get<AcuseYResolucionesFolioTramiteDetalles[]>('./assets/json/shared/acuses-y-resoluciones-folio-tramite-detalles.json');
  }


}
