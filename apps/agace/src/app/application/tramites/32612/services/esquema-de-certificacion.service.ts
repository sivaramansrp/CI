import { ENVIRONMENT, JSONResponse } from '@libs/shared/data-access-user/src';
import { Observable,catchError, throwError } from 'rxjs';
import { Solicitude32612DosState, Tramite32612DosStore } from '../estados/solicitud32612Dos.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tramite32612Store } from '../estados/solicitud32612.store';

@Injectable({
  providedIn: 'root'
})
export class EsquemaDeCertificacionService {

/**
 * La URL del servidor utilizada para operaciones auxiliares con JSON.
 * Este valor se obtiene de la configuración del entorno.
 */
  urlServer = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(
    private http: HttpClient,
    private tramiteStore: Tramite32612Store,
    private tramiteDosStore: Tramite32612DosStore
  ) {
    
  }


    /**
     @description Función para obtener el trámite
     @param id
     @returns JSONResponse
    */
    obtenerTramite(id: number): Observable<JSONResponse> {
      return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    getIndiqueCatalogo(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/catalog-indique.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    getSociedadesTablaDatos(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/socidad-tabla.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    getDatosDeLasInstalaciones(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/datos-instalaciones.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    getConsultaDatosAgenteAduanal(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/consulta-agente-aduanal.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    actualizarEstadoFormulario(campo: string, valor: string | number | boolean): void {
      this.tramiteStore.setDynamicFieldValue(campo, valor);
    }

    getConsultaAgente(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/consulta-aduanal.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    estadoFormulario(DATOS: Solicitude32612DosState): void {
      this.tramiteDosStore.setNumeroPatente(DATOS.numeroPatente);
      this.tramiteDosStore.setNumeroRegistro(DATOS.numeroRegistro);
      this.tramiteDosStore.setNombreAgenteAduanal(DATOS.nombreAgenteAduanal);
      this.tramiteDosStore.setNumeroTrabajadoresIMSS(DATOS.numeroTrabajadoresIMSS);
      this.tramiteDosStore.setNumeroTrabajadoresContratistas(DATOS.numeroTrabajadoresContratistas);
      this.tramiteDosStore.setServiciosAdicionales(DATOS.serviciosAdicionales);
      this.tramiteDosStore.setIndique(DATOS.indique);
    }

    getConsultaPerfiles(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/consulta-perfiles.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    estadoFormularioPerfiles(DATOS: Solicitude32612DosState): void {
      this.tramiteDosStore.setNumeroDeRegistro(DATOS.numeroDeRegistro);
      this.tramiteDosStore.setOrganismoCertificador(DATOS.organismoCertificador);
      this.tramiteDosStore.setNombrePrograma(DATOS.nombrePrograma);
      this.tramiteDosStore.setOpcion(DATOS.opcion);
      this.tramiteDosStore.setSuperficieInstalacion(DATOS.superficieInstalacion);
      this.tramiteDosStore.setNumeroEmpleados(DATOS.numeroEmpleados);
      this.tramiteDosStore.setOperacionesMensualesExp(DATOS.operacionesMensualesExp);
      this.tramiteDosStore.setOperacionesMensualesImp(DATOS.operacionesMensualesImp);
      this.tramiteDosStore.setTiposServicios(DATOS.tiposServicios);
      this.tramiteDosStore.setActividadPreponderante(DATOS.actividadPreponderante);
      this.tramiteDosStore.setAntiguedadInstalacion(DATOS.antiguedadInstalacion);
      this.tramiteDosStore.setTipoInstalacion(DATOS.tipoInstalacion);
      this.tramiteDosStore.setNombreAgenciaAduanal(DATOS.nombreAgenciaAduanal);
    }

    getPrefilesConsultaAccodiane(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/consulta-perfiles-accodiane.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }
}
