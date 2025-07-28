import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-sin-registrar.enum';
import { Tramite260217Store } from '../../estados/tramite260217Store.store';

/**
 * @component AgregarDestinatarioFinalContenedoraComponent
 * @description Componente contenedor Angular standalone que encapsula la funcionalidad para
 * agregar y gestionar destinatarios finales en el trámite 260217 de COFEPRIS.
 * 
 * Este componente actúa como un intermediario entre la interfaz de usuario y el store
 * de estado, proporcionando una capa de abstracción para la gestión de destinatarios
 * finales. Utiliza el patrón de componente contenedor para separar la lógica de
 * presentación de la lógica de negocio.
 * 
 * @example
 * ```html
 * <app-agregar-destinatario-final-contenedora></app-agregar-destinatario-final-contenedora>
 * ```
 * 
 * @version 1.0.0
 * @author Equipo de Desarrollo VUCEM 3.0
 * @since 2025
 */
@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {
  
  /**
   * @property {string} idProcedimiento
   * @description Identificador único del procedimiento administrativo para el trámite 260217.
   * 
   * Esta propiedad es de solo lectura y contiene el identificador constante del
   * procedimiento que se utiliza a lo largo del flujo del trámite para identificar
   * el tipo específico de proceso administrativo que se está gestionando.
   * 
   * @readonly
   * @public
   * @type {string}
   * @see {@link ID_PROCEDIMIENTO} Para ver los valores posibles del identificador
   * @example
   * ```typescript
   * // Acceso al identificador del procedimiento
   * const procId = this.idProcedimiento;
   * ```
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @constructor
   * @description Constructor de la clase que inicializa el componente contenedor e
   * inyecta las dependencias necesarias para el funcionamiento del componente.
   * 
   * El constructor se encarga de inyectar el store del trámite 260217 que será
   * utilizado para gestionar el estado global de la aplicación relacionado con
   * los destinatarios finales y otros datos del trámite.
   * 
   * @param {Tramite260217Store} tramiteStore - Instancia del store que gestiona el estado
   * del trámite 260217, incluyendo los datos de destinatarios finales, validaciones
   * y otros elementos relacionados con el proceso administrativo
   * 
   * @public
   * @memberof AgregarDestinatarioFinalContenedoraComponent
   * 
   * @example
   * ```typescript
   * // El constructor es llamado automáticamente por Angular
   * // No es necesario invocarlo manualmente
   * ```
   */
  constructor(public tramiteStore: Tramite260217Store) {
    // No se requiere lógica de inicialización adicional en el constructor.
    // La inyección de dependencias se maneja automáticamente por Angular.
  }

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description Método público que actualiza la lista de destinatarios finales en el
   * store del trámite. Este método actúa como un puente entre el componente hijo
   * y el store de estado global.
   * 
   * Cuando el componente `AgregarDestinatarioFinalComponent` emite cambios en la
   * lista de destinatarios, este método se encarga de propagar esos cambios al
   * store para mantener sincronizado el estado de la aplicación.
   * 
   * @param {Destinatario[]} event - Array de objetos Destinatario que contiene
   * la lista actualizada de destinatarios finales. Cada objeto debe cumplir
   * con la interfaz Destinatario definida en el modelo.
   * 
   * @returns {void} Este método no retorna ningún valor, ya que su propósito
   * es únicamente actualizar el estado en el store.
   * 
   * @public
   * @memberof AgregarDestinatarioFinalContenedoraComponent
   * 
   * @throws {Error} Puede lanzar errores si la actualización del store falla
   * o si los datos del evento no son válidos.
   * 
   * @example
   * ```typescript
   * // Ejemplo de uso desde el template
   * // <app-agregar-destinatario-final 
   * //   (destinatariosUpdated)="updateDestinatarioFinalTablaDatos($event)">
   * // </app-agregar-destinatario-final>
   * 
   * const nuevosDestinatarios: Destinatario[] = [
   *   { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
   *   { id: 2, nombre: 'María García', email: 'maria@example.com' }
   * ];
   * this.updateDestinatarioFinalTablaDatos(nuevosDestinatarios);
   * ```
   * 
   * @see {@link Destinatario} Para ver la estructura del modelo de destinatario
   * @see {@link Tramite260217Store.updateDestinatarioFinalTablaDatos} Para ver la implementación en el store
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
