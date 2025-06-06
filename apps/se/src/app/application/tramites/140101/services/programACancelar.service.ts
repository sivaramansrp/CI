import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProgramaACancelar} from '../../../shared/models/programa-cancelar.model';
import { Programa140101State, Tramite140101Store } from '../../../estados/tramites/tramite140101.store';
// Decorador Injectable que permite que este servicio sea inyectable en cualquier módulo.
/**
 * Servicio para gestionar las operaciones relacionadas con el programa a cancelar.
 * 
 * Este servicio permite obtener los datos del programa a cancelar desde un archivo JSON local.
 * 
 * @providedIn 'any' - Define que este servicio puede ser inyectado en cualquier módulo.
 */
@Injectable({
  providedIn: 'any'
})
export class ProgramaACancelarService {
  /**
   * Constructor del servicio.
   * 
   * @param http - Cliente HTTP utilizado para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient,private tramiteStore: Tramite140101Store) {
     // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los datos del programa a cancelar desde un archivo JSON local.
   * 
   * @returns Observable que emite los datos del programa a cancelar.
   */
  obtenerDatos(): Observable<ProgramaACancelar> {
    return this.http.get<ProgramaACancelar>(`assets/json/140101/Programa.json`);
  }

  /**
   * Obtiene el estado del expediente de certificado.
   *
   * Realiza una solicitud HTTP GET para recuperar los datos del expediente de certificado
   * desde un archivo JSON local ubicado en 'assets/json/120204/expedicion-certificado.json'.
   *
   * @returns Un observable que emite el estado de la expedición del certificado (`Expedicion120204State`).
   */
  getProgramaDatos(): Observable<Programa140101State> {
    return this.http.get<Programa140101State>('assets/json/140101/programa-cancelar.json');
  }

  /**
   * Establece los datos del formulario en el store del trámite.
   *
   * @param datos - Objeto de tipo `Expedicion120204State` que contiene la información a establecer en el store, incluyendo:
   *   - entidadFederativa: La entidad federativa seleccionada.
   *   - representacionFederal: La representación federal correspondiente.
   *   - montoAExpedir: El monto que se va a expedir.
   *   - montoAExpedirCheck: Indicador de validación del monto a expedir.
   *   - montoDisponible: El monto disponible para expedir.
   *   - totalAExpedir: El total a expedir.
   *   - numeraDelicitacion: El número de la licitación.
   *   - fechaDelEventoDelicitacion: La fecha del evento de licitación.
   *   - descripcionDelProducto: Descripción del producto relacionado.
   *
   * Esta función actualiza el estado del store con los valores proporcionados en el objeto `datos`.
   */
  setDatosFormulario(datos: Programa140101State): void {
    this.tramiteStore.setConfirmar(datos.confirmar);
    this.tramiteStore.setSolicitudObservaciones(datos.solicitudObservaciones);
    this.tramiteStore.setPrograma(datos.programaACancelar);
    this.tramiteStore.setRadioSelection(datos.radio);
}
}