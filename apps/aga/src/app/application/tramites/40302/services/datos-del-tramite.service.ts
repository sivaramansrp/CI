import { Solicitud40302State, Solicitud40302Store } from '../estados/tramite40302.store';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Solicitud40302Query} from '../estados/tramite40302.query';

/**
 * ## DatosDelTramiteService
 * 
 * Servicio que gestiona los datos del trámite 40302, interactuando con el almacén de estado (`Store`) y la consulta (`Query`) de Akita.
 * 
 * ### Decorador @Injectable
 * 
 * Este decorador hace que el servicio sea inyectable en la aplicación.
 * 
 * ### Parámetros
 * - **providedIn**: `'root'`  
 *   Indica que el servicio está disponible en el nivel raíz de la aplicación, lo que significa que puede ser inyectado en cualquier componente o servicio sin necesidad de declararlo en un módulo específico.
 */
@Injectable({ providedIn: 'root' })
export class DatosDelTramiteService {
  /**
   * ## Constructor
   * 
   * Inicializa el servicio con las dependencias necesarias.
   * 
   * ### Parámetros
   * - **solicitudStore**: `Solicitud40302Store`  
   *   Almacén de estado para la solicitud 40302.
   * - **solicitudQuery**: `Solicitud40302Query`  
   *   Consulta para obtener el estado de la solicitud 40302.
   */
  constructor(
    private solicitudStore: Solicitud40302Store,
    private solicitudQuery: Solicitud40302Query
  ) {
    // Lógica del constructor aquí
  }

  /**
   * ## setInitialValues
   * 
   * Establece los valores iniciales del estado de la solicitud en el almacén.
   * 
   * ### Funcionalidad
   * Actualiza el estado del almacén con los valores predeterminados.
   */
  setInitialValues(): void {
    this.solicitudStore.update({
      cveFolioCaat: '3L6V',
      descTipoCaat: 'Naviero',
      descTipoAgente: 'Agente Naviero',
      directorGeneralNombre: 'HAZEL',
      primerApellido: 'NAVA',
      segundoApellido: 'AVILA',
    });
  }

  /**
   * ## getSolicitudState
   * 
   * Obtiene el estado actual de la solicitud como un Observable.
   * 
   * ### Retorno
   * Un `Observable` que emite el estado de la solicitud (`Solicitud40302State`).
   * 
   * ### Funcionalidad
   * Utiliza la consulta (`Query`) para seleccionar el estado actual del almacén.
   */
  getSolicitudState(): Observable<Solicitud40302State> {
    return this.solicitudQuery.select();
  }
}
