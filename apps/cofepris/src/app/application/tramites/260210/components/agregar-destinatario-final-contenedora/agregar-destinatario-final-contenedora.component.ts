import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260214Store } from '../../estados/tramite260210Store.store';

/**
 * @class AgregarDestinatarioFinalContenedoraComponent
 * @description Componente contenedor de Angular standalone que gestiona la funcionalidad
 * relacionada con la adición y administración de destinatarios finales en el sistema VUCEM.
 * 
 * Este componente actúa como una capa contenedora que encapsula el componente reutilizable
 * `AgregarDestinatarioFinalComponent` y proporciona la lógica específica para el trámite 260210.
 * Se encarga de la comunicación bidireccional entre la interfaz de usuario y el estado
 * centralizado del trámite a través del store `Tramite260214Store`.
 * 
 * 
 * @see {@link AgregarDestinatarioFinalComponent} - Componente hijo para la gestión de destinatarios
 * @see {@link Tramite260214Store} - Store para la gestión del estado del trámite
 * @see {@link Destinatario} - Modelo de datos para destinatarios
 */

@Component({
  /**
   * @property selector
   * @type {string}
   * @description Selector CSS del componente utilizado para renderizar la instancia
   * en plantillas HTML. Define el elemento personalizado que representa este componente.
   */
  selector: 'app-agregar-destinatario-final-contenedora',

  /**
   * @property standalone
   * @type {boolean}
   * @description Indica que este es un componente standalone de Angular, lo que significa
   * que no requiere ser declarado en un módulo NgModule para ser utilizado.
   * Permite mayor modularidad y carga bajo demanda.
   */
  standalone: true,

  /**
   * @property imports
   * @type {Array<any>}
   * @description Array de módulos y componentes que este componente standalone necesita
   * para funcionar correctamente. Incluye CommonModule para directivas básicas de Angular
   * y AgregarDestinatarioFinalComponent para la funcionalidad específica de destinatarios.
   */
  imports: [CommonModule, AgregarDestinatarioFinalComponent],

  /**
   * @property templateUrl
   * @type {string}
   * @description Ruta relativa al archivo de plantilla HTML que define la estructura
   * visual del componente. Contiene el markup que será renderizado en el DOM.
   */
  templateUrl: './agregar-destinatario-final-contenedora.component.html',

  /**
   * @property styleUrl
   * @type {string}
   * @description Ruta relativa al archivo de estilos SCSS que define la apariencia
   * visual del componente. Contiene las reglas CSS específicas para este componente.
   */
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {
  
  /**
   * @property tramiteStore
   * @type {Tramite260214Store}
   * @access public
   * @description Store inyectado que administra el estado centralizado del trámite 260210.
   * Proporciona acceso a los métodos y propiedades reactivas para la gestión de datos
   * relacionados con destinatarios finales. Al ser público, está disponible para uso
   * directo en la plantilla del componente.
   * 
   * @example
   * // Acceso desde la plantilla
   * {{ tramiteStore.destinatariosFinal$ | async }}
   */

  /**
   * @constructor
   * @description Constructor de la clase que implementa el patrón de inyección de dependencias
   * de Angular para obtener una instancia del store del trámite. Se ejecuta automáticamente
   * durante la inicialización del componente y configura las dependencias necesarias.
   *
   * @param {Tramite260214Store} tramiteStore - Instancia del store que administra el estado
   * del trámite 260214. Proporciona métodos reactivos para la gestión de destinatarios finales,
   * incluyendo operaciones CRUD y sincronización con el backend.
   * 
   * @example
   * // El constructor se invoca automáticamente por Angular
   * const component = new AgregarDestinatarioFinalContenedoraComponent(tramiteStore);
   */
  constructor(public tramiteStore: Tramite260214Store) {}

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description Método público que actúa como handler de eventos para actualizar
   * la lista de destinatarios finales en el estado del trámite. Recibe un array
   * de destinatarios desde el componente hijo y los propaga al store para mantener
   * la sincronización del estado global.
   * 
   * Este método forma parte del patrón de comunicación padre-hijo en Angular,
   * donde el componente contenedor (padre) maneja los eventos emitidos por
   * el componente funcional (hijo).
   *
   * @param {Destinatario[]} event - Array de objetos de tipo Destinatario que contiene
   * la lista actualizada de destinatarios finales. Cada objeto debe cumplir con la
   * estructura definida en el modelo Destinatario e incluir propiedades como nombre,
   * RFC, dirección, etc.
   * 
   * @returns {void} Este método no retorna ningún valor, pero causa efectos secundarios
   * en el estado de la aplicación a través del store.
   * 
   * @throws {Error} Puede lanzar errores si el store no está inicializado correctamente
   * o si los datos del evento no cumplen con el formato esperado.
   * 
   * @example
   * // Llamada desde la plantilla del componente
   * <app-agregar-destinatario-final 
   *   (destinatariosActualizados)="updateDestinatarioFinalTablaDatos($event)">
   * </app-agregar-destinatario-final>
   * 
   * @example
   * // Llamada programática
   * const nuevosDestinatarios: Destinatario[] = [
   *   { id: 1, nombre: 'Juan Pérez', rfc: 'PEPJ800101XXX' },
   *   { id: 2, nombre: 'María García', rfc: 'GARM850215YYY' }
   * ];
   * component.updateDestinatarioFinalTablaDatos(nuevosDestinatarios);
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
