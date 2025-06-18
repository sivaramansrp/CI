import { BehaviorSubject } from 'rxjs';
import { CuposDisponibles, PermisosDatos } from '../models/cancelacion-de-certificados.model';
import { CuposDisponiblesDatos } from '../models/cancelacion-de-certificados.model';
import { DesistimientoStore } from '../estados/desistimiento-de-permiso.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * Servicio que centraliza la comunicación entre componentes a través de mensajes observables.
 * También interactúa con el store para gestionar y actualizar los datos del formulario de desistimiento.
 */
@Injectable({
  providedIn: 'root'
})
export class ServicioDeMensajesService {
  /**
   * Fuente de emisión de mensajes booleanos generales.
   * Utilizado para comunicar cambios de estado entre componentes.
   */
  private fuenteDelMensaje = new BehaviorSubject<boolean>(false);

  /**
   * Fuente de emisión de mensajes específicos para mostrar/ocultar la sección de devolución de facturas.
   */
  private devolverFacturasMensaje = new BehaviorSubject<boolean>(false);

  /**
   * Observable expuesto para suscripción a mensajes generales.
   * Los componentes pueden usarlo para reaccionar ante cambios en el estado.
   */
  mensaje$ = this.fuenteDelMensaje.asObservable();

  /**
   * Observable expuesto para la visualización de la sección de devolución de facturas.
   */
  devolverFacturasMensaje$ = this.devolverFacturasMensaje.asObservable();

  /**
   * Subject que maneja la emisión del estado de los datos de permiso.
   */
  private datosDePermiso = new Subject<boolean>();

  /**
   * Observable que expone el estado actual de los datos de permiso.
   * Indica si los datos del formulario han sido establecidos o no.
   */
  datos$ = this.datosDePermiso.asObservable();

  /**
   * Constructor del servicio.
   * Inyecta el store de desistimiento, encargado de mantener el estado del formulario.
   * 
   * @param desistimientoStore Store para gestionar los datos del formulario de desistimiento.
   */
  constructor(private readonly desistimientoStore: DesistimientoStore, private http: HttpClient) {
    // Constructor is used for dependency injection
  }

  /**
   * Envía un mensaje general a través del observable `mensaje$`.
   * 
   * @param mensaje Valor booleano que será emitido.
   */
  enviarMensaje(mensaje: boolean): void {
    this.fuenteDelMensaje.next(mensaje);
  }

  /**
   * Envía un mensaje para mostrar u ocultar la sección de devolución de facturas.
   * 
   * @param mensaje Valor booleano que será emitido.
   */
  enviarDevolverFacturasMensaje(mensaje: boolean): void {
    this.devolverFacturasMensaje.next(mensaje);
  }

  /**
   * Establece el estado de los datos de permiso.
   * Permite notificar a otros componentes si se ha establecido o limpiado el formulario.
   * 
   * @param valor Valor booleano que indica el estado del formulario de permiso.
   */
  establecerDatosDePermiso(valor: boolean): void {
    this.datosDePermiso.next(valor);
  }

  /**
   * Actualiza los datos del formulario de desistimiento en el store.
   * 
   * @param valor Array de objetos de tipo `CuposDisponibles` que contiene los nuevos datos.
   */
  actualizarDatosForma(valor: CuposDisponibles[]): void {
    this.desistimientoStore.actualizarDatosForma(valor as CuposDisponibles[]);
  }

  /**
   * Obtiene el estado actual del formulario desde el store.
   * 
   * @returns Observable que emite el estado completo del formulario de desistimiento.
   */
  public obtenerDatos(): Observable<CuposDisponiblesDatos> {
    return this.desistimientoStore._select(state => state);
  }

  /**
  Obtiene los datos simulados para el registro de toma de muestras de mercancías.
  Realiza una solicitud HTTP al archivo 'requestCancallar.json' ubicado en la carpeta de assets.
  Devuelve un observable que emite el estado de la solicitud de cancelación.
  @returns {Observable<CancelarSolicitudState>} Observable que emite los datos del estado de la solicitud de cancelación. */
  getRegistroTomaMuestrasMercanciasData(): Observable<PermisosDatos> {
    return this.http.get<PermisosDatos>('assets/json/140104/permisosCancelar.json');
  }

  /**
 * Actualiza el estado del formulario con los datos proporcionados.
 * 
 * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información 
 *                del tipo de solicitud a actualizar en el store.
 */
actualizarEstadoFormulario(DATOS: Partial<CuposDisponiblesDatos>): void {
  this.desistimientoStore.update((state) => ({
    ...state,
    ...DATOS
  }));
}
}
