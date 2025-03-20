import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Cancelacion, PermisosDatos } from '../models/cancelacion-de-solicitus.model';
import { DesistimientoStore } from '../estados/desistimiento-de-permiso.store';


@Injectable({
  providedIn: 'root'
})
export class ServicioDeMensajesService {
  private fuenteDelMensaje = new Subject<boolean>();
  mensaje$ = this.fuenteDelMensaje.asObservable();

  private datosDePermiso = new Subject<boolean>();
  datos$ = this.datosDePermiso.asObservable();

  constructor(private readonly desistimientoStore: DesistimientoStore) {

  }

  /**
   * Método para enviar un mensaje de tipo booleano a los suscriptores.
   * Este mensaje puede ser utilizado para comunicar estados o señales dentro de la aplicación.
   * 
   * @param mensaje El valor booleano que se enviará a los suscriptores.
   */
  enviarMensaje(mensaje: boolean) {
    this.fuenteDelMensaje.next(mensaje);
  }

  /**
   * Método para establecer el estado de los datos de permiso.
   * Envía un valor booleano a los suscriptores indicando si los datos de permiso 
   * están disponibles o no.
   * 
   * @param valor El valor booleano que se enviará para indicar el estado de los datos de permiso.
   */
  establecerDatosDePermiso(valor: boolean) {
    this.datosDePermiso.next(valor);
  }

   /**
   * Método para actualizar los datos del formulario de desistimiento en el store.
   * Envía un array de objetos de tipo Cancelacion al store para actualizar el estado 
   * de los datos relacionados.
   * 
   * @param valor Array de objetos de tipo Cancelacion con los nuevos datos del formulario.
   */
  actualizarDatosForma(valor: Cancelacion[]) {
    this.desistimientoStore.actualizarDatosForma(valor as Cancelacion[]);
  }

   /**
   * Método para obtener los datos del store.
   * Devuelve el estado completo de los permisos de desistimiento desde el store.
   * 
   * @returns Un observable que emite el estado completo de los permisos de desistimiento.
   */
  public obtenerDatos(): Observable<PermisosDatos> {
    return this.desistimientoStore._select(state => state); // Devuelve el estado completo
  }
}
