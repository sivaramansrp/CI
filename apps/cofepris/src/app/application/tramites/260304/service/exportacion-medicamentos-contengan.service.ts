import { Tramite260304State, Tramite260304Store } from '../estados/tramite260304Store.store';
import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportacionMedicamentosContenganService {

  /**
   * @property {string} jsonUrl
   * Ruta relativa al archivo JSON que contiene los datos del domicilio.
   * Usado para cargar información desde el frontend (assets).
   * @private
   */
  private jsonUrl = 'assets/json/260304/';
  
  constructor(public httpServicios: HttpClient, public store: Tramite260304Store) {
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
   * Obtiene los datos del formulario de certificados de origen desde un archivo JSON local.
   * @returns {Observable<DestruccionState>} Observable con el estado del trámite.
   */
  public getAcuiculturaData(): Observable<Tramite260304State> {
    return this.httpServicios.get<Tramite260304State>('assets/json/260304/forma.json');
  }

  /**
   * Actualiza el estado completo del formulario en el store de acuicultura.
   * Cada campo del objeto recibido es asignado al store correspondiente.
   * 
   * @param DATOS Objeto de tipo DestruccionState con los datos a actualizar.
   */
  public actualizarEstadoFormulario(DATOS: Tramite260304State): void {
    this.store.updateOpcionConfigDatos(DATOS.opcionConfigDatos);
    this.store.updateDestinatarioTablaDatos(DATOS.destinatarioTableDatos);
    this.store.updateOtrosTablaDatos(DATOS.otrosTablaDatos);
    this.store.updateOpcionConfigDatos(DATOS.opcionConfigDatos);
    this.store.updateSeleccionadoOtrosDatos(DATOS.seleccionadoOtrosDatos ?? []);
    this.store.updateSeleccionadoDestinatarioDatos(DATOS.seleccionadoDestinatarioDatos ?? []);
    this.store.updateScianConfigDatos(DATOS.scianConfigDatos);
    this.store.updateTablaMercanciasConfigDatos(DATOS.tablaMercanciasConfigDatos);
    this.store.updatePagoDerechos(DATOS.pagoDerechos);
    this.store.updateTabSeleccionado(DATOS.tabSeleccionado ?? 0);
  }
}
