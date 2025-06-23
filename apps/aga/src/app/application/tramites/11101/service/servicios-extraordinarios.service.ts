import { Tramite11101Store, Tramitenacionales11101State } from '../estados/tramite11101.store';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface JSONResponse {
  id: number;
  descripcion: string;
  codigo: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})

export class TramiteFolioService {
  /**
    * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
    */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private store: Tramite11101Store) { }
 /**
     * Actualiza el estado del formulario en el store con los datos proporcionados.
     * @param DATOS Objeto con los datos del formulario de tipo Solicitud10301State.
     */

  actualizarEstadoFormulario(DATOS: Tramitenacionales11101State): void {
    this.store.setNumeroderegistro(DATOS.numeroderegistro);
    this.store.setNobmreDenominationRazonSocial(DATOS.NobmreDenominationRazonSocial);
    this.store.setRfctaxid(DATOS.rfctaxid);
    this.store.setTelefono(DATOS.Telefono);
    this.store.setCorreoelectronico(DATOS.correoelectronico);
    this.store.setEntidadadfederativa(DATOS.numeroderegistro);
    this.store.setAlcadilamunicipio(DATOS.alcadilamunicipio);
    this.store.setColonia(DATOS.colonia);
    this.store.setCodigopostal(DATOS.codigopostal);
    this.store.setCalle(DATOS.calle);
    this.store.setNumeroletraexterior(DATOS.numeroletraexterior);
    this.store.setNumeroletrainterior(DATOS.numeroletrainterior);
    this.store.setEntrecalle(DATOS.entrecalle);
    this.store.setYcalle(DATOS.ycalle);
  }
  public getDatosDeTrtamitelDoc(): Observable<Tramitenacionales11101State> {
    return this.http.get<Tramitenacionales11101State>(
      '/assets/json/11101/aviso-tramite-data.json'
    );
  }
}



