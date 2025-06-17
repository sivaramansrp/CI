import { Tramite260301State, Tramite260301Store } from '../estados/tramite260301Store.store';
import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ImportacionMateriasPrimasService {
  /**
   * @property {string} jsonUrl
   * Ruta relativa al archivo JSON que contiene los datos del domicilio.
   * Usado para cargar información desde el frontend (assets).
   * @private
   */
  private jsonUrl = 'assets/json/260301/';

  constructor(public httpServicios: HttpClient, private store: Tramite260301Store ) {
    // Constructor necesario para inyectar el servicio HttpClient
  }

  /**
   * Método para obtener datos de un "Facturador" desde un archivo JSON remoto.
   * Realiza una solicitud HTTP GET a la URL especificada y devuelve un observable
   * que emite el resultado de la petición.
   * 
   * @returns {Observable<Facturador>} Un observable que emite los datos de un facturador.
   */
  obtenerOstro(): Observable<Facturador> {
    return this.httpServicios.get<Facturador>(
      this.jsonUrl + 'buscar-otros.json'
    );
  }


  /**
   * @desc Obtiene los datos de acuicultura para el trámite 260301.
   * Realiza una petición HTTP para obtener el estado del trámite desde un archivo JSON local.
   * @returns Observable<Tramite260301State> Un observable que emite el estado del trámite 260301.
   * @memberof ImportacionMateriasPrimasService
   */
  public getAcuiculturaData(): Observable<Tramite260301State> {
    return this.httpServicios.get<Tramite260301State>('assets/json/260301/forma.json');
  }

  
  /**
   * @desc Actualiza el estado del formulario con los datos proporcionados.
   * Utiliza el store para actualizar cada parte del estado del trámite 260301.
   * @param {Tramite260301State} DATOS - Objeto que contiene los nuevos datos del estado.
   * @memberof ImportacionMateriasPrimasService
   */
  public actualizarEstadoFormulario(DATOS: Tramite260301State): void {
    this.store.updateDatosSolicitudFormState(DATOS.datosSolicitudFormState);
    this.store.updateFabricanteTablaDatos(DATOS.fabricanteTablaDatos);
    this.store.updateCertificadoTablaDatos(DATOS.certificadoTablaDatos);
    this.store.updateProveedorTablaDatos(DATOS.proveedorTablaDatos);
    this.store.updateFacturadorTablaDatos(DATOS.facturadorTablaDatos);
    this.store.updateOtrosTablaDatos(DATOS.otrosTablaDatos);
    this.store.updateOpcionConfigDatos(DATOS.opcionConfigDatos);
    this.store.updateScianConfigDatos(DATOS.scianConfigDatos);
    this.store.updateTablaMercanciasConfigDatos(DATOS.tablaMercanciasConfigDatos);
    this.store.updatePagoDerechos(DATOS.pagoDerechos);
    this.store.updateTabSeleccionado(DATOS.tabSeleccionado ?? 0);
  }
}
