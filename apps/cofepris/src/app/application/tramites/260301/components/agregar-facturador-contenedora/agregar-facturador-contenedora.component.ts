import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';

/**
 * @component AgregarFacturadorContenedoraComponent
 * @description Componente contenedor que actúa como intermediario entre la vista
 * y la lógica de negocio para la gestión de facturadores en el trámite 260301.
 * 
 * Este componente utiliza el patrón de arquitectura contenedor/presentador (container/presenter)
 * donde el componente contenedor se encarga de:
 * - Gestionar el estado a través del store
 * - Manejar la comunicación con servicios
 * - Proporcionar datos al componente presentador
 * 
 * El componente encapsula la funcionalidad del `AgregarFacturadorComponent` y mantiene
 * la separación de responsabilidades, permitiendo que el componente hijo se enfoque
 * únicamente en la presentación y la interacción del usuario.
 * 
 * @implements {OnInit} - (Futuro) Para inicialización del componente
 * @implements {OnDestroy} - (Futuro) Para limpieza de recursos
 * 
 * @example
 * ```html
 * <app-agregar-facturador-contenedora></app-agregar-facturador-contenedora>
 * ```
 * 
 * @see {@link AgregarFacturadorComponent} - Componente hijo para la presentación
 * @see {@link Tramite260301Store} - Store para el manejo del estado
 * @see {@link Facturador} - Modelo de datos del facturador
 */

@Component({
  selector: 'app-agregar-facturador-contenedora',
  standalone: true,
  imports: [CommonModule,AgregarFacturadorComponent],
  templateUrl: './agregar-facturador-contenedora.component.html',
  styleUrl: './agregar-facturador-contenedora.component.scss',
})
export class AgregarFacturadorContenedoraComponent {
    
  /**
   * @property tramite260301Store
   * @description Instancia pública del store que administra el estado del trámite 260301.
   * Esta propiedad se inyecta a través del constructor y permite el acceso directo
   * desde el template del componente para operaciones de lectura y escritura del estado.
   * 
   * @type {Tramite260301Store}
   * @public
   * @readonly Aunque es public, se recomienda tratar como readonly desde el template
   */
  public tramite260301Store: Tramite260301Store;

  /**
   * @constructor
   * @description Constructor del componente que realiza la inyección de dependencias necesarias.
   * Inicializa el store del trámite 260301 que será utilizado para gestionar el estado
   * de los facturadores y demás datos relacionados con el trámite.
   * 
   * @param {Tramite260301Store} tramite260301Store - Store que administra el estado del trámite 260301.
   *        Contiene los métodos y propiedades necesarios para manejar los datos del formulario
   *        y la lógica de negocio asociada al trámite.
   */
    constructor(
        tramite260301Store: Tramite260301Store){
        this.tramite260301Store = tramite260301Store;
        // Constructor necesario para inyectar el store del trámite
    }

    /**
   * @method updateFacturadorTablaDatos
   * @description Método público que actúa como intermediario entre el componente hijo 
   * `AgregarFacturadorComponent` y el store del trámite. Recibe la lista actualizada
   * de facturadores desde el componente hijo y la propaga al store para mantener
   * la consistencia del estado global de la aplicación.
   * 
   * Este método se ejecuta cuando:
   * - Se agrega un nuevo facturador
   * - Se modifica un facturador existente
   * - Se elimina un facturador de la lista
   * 
   * @param {Facturador[]} event - Array de objetos tipo Facturador que contiene
   *        la lista completa y actualizada de facturadores. Cada elemento del array
   *        debe cumplir con la interfaz Facturador definida en el modelo.
   * 
   * @returns {void} Este método no retorna ningún valor, su función es únicamente
   *          actualizar el estado en el store.
   * 
   * @example
   * ```typescript
   * // Ejemplo de uso desde el template
   * // <app-agregar-facturador (facturadoresActualizados)="updateFacturadorTablaDatos($event)">
   * // </app-agregar-facturador>
   * ```
   * 
   * @see {@link Facturador} - Modelo de datos para el facturador
   * @see {@link Tramite260301Store.updateFacturadorTablaDatos} - Método del store que actualiza los datos
   */
    updateFacturadorTablaDatos(event:Facturador[]): void {
        this.tramite260301Store.updateFacturadorTablaDatos(event);
    }
}
