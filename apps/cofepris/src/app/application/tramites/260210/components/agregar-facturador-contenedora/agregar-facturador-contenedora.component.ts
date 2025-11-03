import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-uso.enum';
import { Tramite260210Store } from '../../estados/tramite260210Store.store';

/**
 * @component AgregarFacturadorContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarFacturadorComponent`
 * para gestionar la funcionalidad relacionada con los facturadores.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260210Store`.
 */

@Component({
  selector: 'app-agregar-facturador-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFacturadorComponent],
  templateUrl: './agregar-facturador-contenedora.component.html',
  styleUrl: './agregar-facturador-contenedora.component.scss',
})
export class AgregarFacturadorContenedoraComponent {
  
    /**
     * @property {string} idProcedimiento
     * @description Identificador del procedimiento, utilizado para la gestión del trámite.
     */
     public readonly idProcedimiento = ID_PROCEDIMIENTO;
     
  /**
   * @property Tramite260210Store
   * @description Store público que gestiona el estado completo del trámite 260214.
   * Proporciona acceso a las propiedades y métodos necesarios para administrar
   * la información de facturadores y otros datos relacionados con el trámite.
   * 
   * @type {Tramite260210Store}
   * @public
   * @readonly
   * @since 1.0.0
   */
  public Tramite260210Store: Tramite260210Store;

  /**
   * @constructor
   * @description Constructor que inicializa el componente contenedor e inyecta las dependencias necesarias.
   * Se encarga de configurar el store del trámite 260214 que será utilizado para gestionar
   * el estado de los facturadores y toda la información relacionada con el trámite.
   * 
   * @param {Tramite260210Store} Tramite260210Store - Instancia del store que administra el estado del trámite 260214.
   *                                                   Contiene los métodos y propiedades para manipular
   *                                                   los datos de facturadores, validaciones y estado general.
   * 
   * @example
   * ```typescript
   * // El constructor se ejecuta automáticamente cuando Angular instancia el componente
   * // No es necesario llamarlo manualmente
   * ```
   * 
   * @since 1.0.0
   * @memberof AgregarFacturadorContenedoraComponent
   */
  constructor(Tramite260210Store: Tramite260210Store) {
    this.Tramite260210Store = Tramite260210Store;
  }

  /**
   * @method updateFacturadorTablaDatos
   * @description Método público que actualiza la lista de facturadores en el store del trámite.
   * Este método actúa como intermediario entre el componente hijo `AgregarFacturadorComponent`
   * y el store, propagando los cambios realizados en la tabla de facturadores.
   * 
   * Funcionalidades principales:
   * - Recibe la lista actualizada de facturadores desde el componente hijo
   * - Delega la actualización al método correspondiente del store
   * - Mantiene la sincronización del estado entre componentes
   * - Asegura la consistencia de datos en toda la aplicación
   * 
   * @param {Facturador[]} event - Array de objetos Facturador que contiene la información
   *                               actualizada de todos los facturadores del trámite.
   *                               Cada objeto debe cumplir con la estructura definida
   *                               en el modelo `Facturador`.
   * 
   * @returns {void} Este método no retorna ningún valor, ya que su función es
   *                 únicamente actualizar el estado del store.
   * 
   * @throws {Error} Puede lanzar una excepción si el store no está inicializado
   *                 o si los datos del evento no tienen el formato esperado.
   * 
   * @example
   * ```typescript
   * // Ejemplo de uso desde el template HTML
   * // <app-agregar-facturador (facturadoresUpdated)="updateFacturadorTablaDatos($event)"></app-agregar-facturador>
   * 
   * // Ejemplo de datos que podría recibir el método
   * const facturadoresActualizados: Facturador[] = [
   *   {
   *     id: '12345',
   *     nombre: 'Empresa ABC S.A. de C.V.',
   *     rfc: 'ABC123456789',
   *     // ... otros campos del modelo Facturador
   *   }
   * ];
   * this.updateFacturadorTablaDatos(facturadoresActualizados);
   * ```
   * 
   * @see {@link Facturador} - Modelo de datos para facturadores
   * @see {@link Tramite260210Store} - Store que gestiona el estado del trámite
   * 
   * @since 1.0.0
   * @memberof AgregarFacturadorContenedoraComponent
   * @public
   */
  updateFacturadorTablaDatos(event: Facturador[]): void {
    this.Tramite260210Store.updateFacturadorTablaDatos(event);
  }
}
