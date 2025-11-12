import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TABLA_ORDEN } from '../../constantes/permiso-sujetos.enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';

/**
 * Componente `TercerosRelacionadosFabricanteComponent`
 *
 * Este componente es responsable de gestionar la interfaz de usuario para mostrar y manejar
 * los datos relacionados con los terceros fabricantes asociados a un trámite.
 *
 * Es un componente independiente (`standalone`) que utiliza el módulo común de Angular (`CommonModule`)
 * y el componente `TercerosRelacionadosComponent` para mostrar información específica de los terceros.
 */
@Component({
  selector: 'app-terceros-relacionados-fabricante',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-fabricante.component.html',
  styleUrl: './terceros-relacionados-fabricante.component.scss',
})
export class TercerosRelacionadosFabricanteComponent {

  /** Referencia al componente 'TercerosRelacionadosComponent' en la plantilla.
   * Proporciona acceso a sus métodos y propiedades.
   */
  @ViewChild('TercerosRelacionadosComponent', { static: false }) tercerosRelacionadosComponent!: TercerosRelacionadosComponent;


  // Propiedad que almacena la constante TABLA_ORDEN para definir el orden de la tabla.
  tablaOrden = TABLA_ORDEN;
  
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260504;

  /** Ejecuta la validación marcando los campos de terceros relacionados como tocados. */
  validarFormulario(): void {
    this.tercerosRelacionadosComponent.markTouched(); 
  }
}
