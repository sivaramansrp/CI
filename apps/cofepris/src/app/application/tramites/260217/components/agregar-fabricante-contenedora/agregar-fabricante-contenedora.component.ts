import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260217Store } from '../../estados/tramite260217Store.store';
/**
 * @component AgregarFabricanteContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarFabricanteComponent` 
 * para gestionar la funcionalidad relacionada con los fabricantes. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260217Store`.
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
   * @property {boolean} estaOculto
   * @description Variable booleana que controla la visibilidad del formulario de agregar fabricante.
   * Cuando es `true`, el formulario está oculto; cuando es `false`, el formulario es visible.
   * Se utiliza para implementar la funcionalidad de mostrar/ocultar elementos en la interfaz de usuario.
   * @default true
   * @example
   * // Mostrar el formulario
   * this.estaOculto = false;
   * 
   * // Ocultar el formulario
   * this.estaOculto = true;
   */
  estaOculto: boolean = true;
    
  /**
   * @constructor
   * @description Constructor del componente que inyecta las dependencias necesarias para su funcionamiento.
   * Inicializa el componente con acceso al store del trámite 260217, permitiendo la gestión 
   * centralizada del estado de los fabricantes y demás datos relacionados con el trámite.
   * 
   * @param {Tramite260217Store} tramite260217Store - Instancia del store que administra el estado 
   * global del trámite 260217, incluyendo la gestión de fabricantes, validaciones y flujo de datos.
   * Este store proporciona métodos para crear, actualizar, eliminar y consultar información 
   * relacionada con los fabricantes del trámite.
   * 
   * @public
   * @memberof AgregarFabricanteContenedoraComponent
   * 
   * @example
   * // El constructor se invoca automáticamente por Angular durante la creación del componente
   * // No es necesario llamarlo manualmente
   */
  constructor(
    public tramite260217Store: Tramite260217Store) {
      // No se requiere lógica de inicialización adicional en el constructor.
      // El store se inyecta automáticamente y está disponible para su uso inmediato.
  }

  /**
   * @method updateFabricanteTablaDatos
   * @description Método que actualiza la tabla de datos de fabricantes en el store del trámite.
   * Este método actúa como un puente entre el componente hijo `AgregarFabricanteComponent` 
   * y el store global, propagando los cambios realizados en la lista de fabricantes.
   * 
   * @param {Fabricante[]} event - Array de objetos Fabricante que contiene la lista actualizada 
   * de fabricantes. Cada objeto debe cumplir con la interface Fabricante definida en 
   * terceros-relacionados.model.ts. Este parámetro representa el estado completo actualizado
   * de la tabla de fabricantes después de realizar operaciones como agregar, editar o eliminar.
   * 
   * @returns {void} Este método no retorna ningún valor. Los cambios se reflejan directamente
   * en el estado del store y se propagan automáticamente a todos los componentes suscritos.
   * 
   * @public
   * @memberof AgregarFabricanteContenedoraComponent
   * 
   * @example
   * // Ejemplo de uso desde el template HTML
   * // <app-agregar-fabricante (actualizarFabricantes)="updateFabricanteTablaDatos($event)">
   * 
   * // Ejemplo de llamada programática
   * const fabricantesActualizados: Fabricante[] = [
   *   { id: 1, nombre: 'Fabricante A', direccion: 'Dirección A' },
   *   { id: 2, nombre: 'Fabricante B', direccion: 'Dirección B' }
   * ];
   * this.updateFabricanteTablaDatos(fabricantesActualizados);
   * 
   * @see {@link Tramite260217Store.updateFabricanteTablaDatos} - Método del store que se ejecuta
   * @see {@link Fabricante} - Interface que define la estructura de los objetos fabricante
   */
  updateFabricanteTablaDatos(event: Fabricante[]): void {
    this.tramite260217Store.updateFabricanteTablaDatos(event);
  }
}
