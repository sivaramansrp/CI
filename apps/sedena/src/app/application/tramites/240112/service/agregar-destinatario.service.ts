import { Tramite240112State, Tramite240112Store } from '../estados/tramite240112Store.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgregarDestinatarioService {

  /**
   * @constructor
   * @param httpClient Servicio HttpClient para realizar peticiones HTTP.
   * @param store Instancia de Tramite240112Store para gestionar el estado de la aplicación.
   * @description Constructor que inicializa el servicio con las dependencias necesarias para manejar destinatarios.
   */
  constructor(private httpClient: HttpClient, private store: Tramite240112Store ) { }

  /**
   * Obtiene los datos del formulario de certificados de origen desde un archivo JSON local.
   * @returns {Observable<DestruccionState>} Observable con el estado del trámite.
   */
  public getAcuiculturaData(): Observable<Tramite240112State> {
    return this.httpClient.get<Tramite240112State>('assets/json/240112/forma.json');
  }

  /**
   * Actualiza el estado completo del formulario en el store de acuicultura.
   * Cada campo del objeto recibido es asignado al store correspondiente.
   * 
   * @param DATOS Objeto de tipo DestruccionState con los datos a actualizar.
   */
  public actualizarEstadoFormulario(DATOS: Tramite240112State): void {
    this.store.updateTabSeleccionado(DATOS.tabSeleccionado ?? 0);
    this.store.updateDatosDelTramiteFormState(DATOS.datosDelTramite);
    this.store.updatePagoDerechosFormState(DATOS.pagoDerechos);
    this.store.updateDestinatarioFinalTablaDatos(DATOS.destinatarioFinalTablaDatos);
    this.store.updateProveedorTablaDatos(DATOS.proveedorTablaDatos);
    this.store.updateMercanciaTablaDatos(DATOS.merccancialTablaDatos);
  }
}
