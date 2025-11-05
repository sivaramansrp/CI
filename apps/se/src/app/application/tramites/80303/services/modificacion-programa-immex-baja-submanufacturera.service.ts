import { DatosModificacion } from '../../../shared/models/modificacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModificacionDatos } from '../models/modificacion-programa-immex-baja-submanufacturera.model';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Tramite80303Store } from '../estados/tramite80303Store.store';

import { PROC_80303 } from '../servers/api-route';

/**
 * Decorador que marca una clase como un servicio que puede ser inyectado en otros componentes o servicios.
 * 
 * Este servicio está registrado en el nivel raíz de la aplicación, lo que significa que su instancia será única
 * y compartida en toda la aplicación. Esto permite que los datos y métodos del servicio sean accesibles desde
 * cualquier parte de la aplicación sin necesidad de crear múltiples instancias.
 * 
 * @remarks
 * Utilizar el decorador `@Injectable` con el proveedor `providedIn: 'root'` asegura que el servicio sea singleton
 * y esté disponible globalmente en la aplicación Angular.
 */
@Injectable({
  providedIn: 'root',
})
export class ModificacionProgramaImmexBajaSubmanufactureraService {
 
  /**
   * Constructor de la clase ModificacionProgramaImmexBajaSubmanufactureraService.
   *
   * @param httpServicios - Servicio HttpClient para realizar solicitudes HTTP.
   * @param tramite80303Store - Almacén de estado para gestionar los datos relacionados con el trámite 80303.
   */
  constructor(
    public httpServicios: HttpClient,
    public tramite80303Store: Tramite80303Store
  ) {}

  /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   *
   * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
   * @param {string} url - La URL desde la cual se obtendrá la respuesta.
   * @returns {void}
   * @author Muneez
   * @remarks
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
   */
  obtenerRespuestaPorUrl(variable: string, url: string): void {
    if (self && variable && url) {
      this.httpServicios
        .get<RespuestaCatalogos>(`assets/json${url}`)
        .subscribe((resp): void => {
          const VALOR = resp?.code === 200 && resp.data ? resp.data : [];
          this.tramite80303Store.update((state) => ({
            ...state,
            [variable]: VALOR,
          }));
        });
    }
  }
  /**
   * Obtiene los datos de modificación del programa IMMEX baja submanufacturera.
   * Realiza una solicitud HTTP GET a un archivo JSON y actualiza el estado del trámite con los datos obtenidos.
   *
   * @returns {void}
   */
  obtenerModicicacionDatos(): void {
    this.httpServicios
      .get<ModificacionDatos>(
        'assets/json/80303/modificacionProgramaImmexBajaSubmanufacturera.json'
      )
      .subscribe((resp): void => {
        this.tramite80303Store.update((state) => ({
          ...state,
          modificacionDatos: resp,
        }));
      });
  }

  /**
   * Obtiene los datos del formulario de modificación.
   * 
   * @returns {Observable<DatosModificacion>} Observable con los datos de modificación.
   * Obtiene los datos de modificación desde un archivo JSON local.
   */
  obtenerModificacionFormDatos(): Observable<DatosModificacion> {
    return this.httpServicios.get<DatosModificacion>(
      'assets/json/80303/modificacion-datos.json'
    );
  }
 consultarMercanciasImportacion(idSolicitud: string): Observable<any> {
    const url = PROC_80303.CONSULTA_MERCANCIAS_IMPORTACION(idSolicitud);
    return this.httpServicios.get<any>(url);
     }
  consultarProductosExportacion(idSolicitud: string): Observable<any> {
    const url = PROC_80303.CONSULTA_PRODUCTOS_EXPORTACION(idSolicitud);
    return this.httpServicios.get<any>(url);
  }
  consultarFraccionesSensibles(idSolicitud: string): Observable<any> {
    const url = PROC_80303.CONSULTA_FRACCIONES_SENSIBLES(idSolicitud);
    return this.httpServicios.get<any>(url);
  }
  consultarBitacoraImmex(idPrograma: string): Observable<any> {
  const url = PROC_80303.CONSULTAR_BITACORA_IMMEX(idPrograma);
  return this.httpServicios.get<any>(url);
}
  consultarPlantasSubmanufactureras(idSolicitud: string): Observable<any> {
    const url = PROC_80303.CONSULTAR_PLANTAS_SUBMANUFACTURERAS(idSolicitud);
    return this.httpServicios.get<any>(url);
  }
   buscarEmpresaSubmanufacturera(idSolicitud: string): Observable<any> {
    const url = PROC_80303.BUSCAR_EMPRESA_SUBMANUFACTURERA(idSolicitud);
    return this.httpServicios.get<any>(url);
  }
   consultarServiciosImmex(body: any): Observable<any> {
    const url = PROC_80303.CONSULTAR_SERVICIOS;
    return this.httpServicios.post<any>(url, body);
  }
   buscarSocioAccionista(body: any): Observable<any> {
  const url = PROC_80303.BUSCAR_SOCIO_ACCIONISTA;
  return this.httpServicios.post<any>(url, body);
}
 buscarNotariosConsulta(body: any): Observable<any> {
    const url = PROC_80303.BUSCAR_NOTARIOS_CONSULTA;
    return this.httpServicios.post<any>(url, body);
  }
  consultarPlantas(body: any): Observable<any> {
    const url = PROC_80303.CONSULTA_PLANTAS;
    return this.httpServicios.post<any>(url, body);
  }
  buscarEmpresas(body: any): Observable<any> {
  const url = PROC_80303.BUSCAR_EMPRESAS;
  return this.httpServicios.post<any>(url, body);
}
}
