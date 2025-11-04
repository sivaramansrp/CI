import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-uso.enum';
import { Tramite260210Store } from '../../estados/tramite260210Store.store';
/**
 * @component AgregarFabricanteContenedoraComponent
 * @description Componente contenedor que actúa como intermediario entre la vista y el estado de la aplicación
 * para la gestión de fabricantes en el trámite 260210. Este componente encapsula la lógica de presentación
 * y delegación de eventos del componente `AgregarFabricanteComponent`, proporcionando una capa de abstracción
 * que facilita la comunicación con el store del trámite.

 * 
 * @example
 * ```html
 * <app-agregar-fabricante-contenedora></app-agregar-fabricante-contenedora>
 * ```
 */
@Component({
  selector: 'app-agregar-fabricante-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFabricanteComponent],
  templateUrl: './agregar-fabricante-contenedora.component.html',
  styleUrl: './agregar-fabricante-contenedora.component.scss',
})
export class AgregarFabricanteContenedoraComponent {
  

    /**
     * @property {string} idProcedimiento
     * @description Identificador del procedimiento, utilizado para la gestión del trámite.
     */
     public readonly idProcedimiento = ID_PROCEDIMIENTO;
     
  /**
   * @property Tramite260210Store
   * @description Store público que gestiona el estado completo del trámite 260214.
   * Esta propiedad proporciona acceso a todas las operaciones de estado relacionadas
   * con el trámite, incluyendo la gestión de fabricantes, datos del formulario,
   * validaciones y persistencia de información.
   * 
   * @type {Tramite260210Store}
   * @readonly
   * @public
   * @memberof AgregarFabricanteContenedoraComponent
   * 
   * @example
   * ```typescript
   * // Acceso al estado actual de fabricantes
   * const fabricantes = this.Tramite260210Store.fabricantes();
   * 
   * // Verificar si hay cambios pendientes
   * const hasChanges = this.Tramite260210Store.hasUnsavedChanges();
   * ```
   */
  public readonly Tramite260210Store: Tramite260210Store;

  /**
   * @constructor
   * @description Constructor del componente que inicializa las dependencias necesarias
   * para el funcionamiento del componente contenedor. Se encarga de inyectar el store
   * del trámite 260214 que permitirá la gestión del estado de los fabricantes.
   * 
   * @param {Tramite260210Store} Tramite260210Store - Instancia del store que administra 
   * el estado del trámite 260214, incluyendo la gestión de fabricantes, validaciones
   * y operaciones CRUD sobre los datos del trámite.
   * 
   * @memberof AgregarFabricanteContenedoraComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // El constructor es invocado automáticamente por Angular durante la creación del componente
   * // No requiere invocación manual
   * ```
   */
  constructor(Tramite260210Store: Tramite260210Store) {
    this.Tramite260210Store = Tramite260210Store;
  }

  /**
   * @method updateFabricanteTablaDatos
   * @description Método público que actúa como manejador de eventos para actualizar
   * la información de fabricantes en el store del trámite. Este método recibe una
   * lista actualizada de fabricantes desde el componente hijo y la propaga al store
   * para mantener sincronizado el estado de la aplicación.
   * 
   * @param {Fabricante[]} event - Array de objetos Fabricante que contiene la información
   * actualizada de todos los fabricantes asociados al trámite. Cada fabricante incluye
   * datos como identificación, nombre, dirección y otros metadatos relevantes.
   * 
   * @returns {void} Este método no retorna ningún valor, ya que su función es únicamente
   * actualizar el estado interno del store.
   * 
   * @throws {Error} Puede lanzar errores si la validación de datos de fabricantes falla
   * o si ocurre un problema durante la actualización del store.
   * 
   * @memberof AgregarFabricanteContenedoraComponent
   * @since 1.0.0
   * @public
   * 
   * @example
   * ```typescript
   * // Ejemplo de uso desde el template HTML
   * // <app-agregar-fabricante 
   * //   (fabricantesUpdated)="updateFabricanteTablaDatos($event)">
   * // </app-agregar-fabricante>
   * 
   * // Ejemplo de invocación programática
   * const nuevosFabricantes: Fabricante[] = [
   *   { id: 1, nombre: 'Fabricante A', direccion: 'Calle 123' },
   *   { id: 2, nombre: 'Fabricante B', direccion: 'Avenida 456' }
   * ];
   * this.updateFabricanteTablaDatos(nuevosFabricantes);
   * ```
   * 
   * @see {@link Fabricante} - Modelo de datos para fabricantes
   * @see {@link Tramite260210Store.updateFabricanteTablaDatos} - Método del store que realiza la actualización
   */
  updateFabricanteTablaDatos(event: Fabricante[]): void {
    this.Tramite260210Store.updateFabricanteTablaDatos(event);
  }
}
