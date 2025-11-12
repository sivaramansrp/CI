import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TABLA_ORDEN } from '../../constantes/permiso-vegetales-nutrientes.enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';

/**
 * Componente que muestra la sección de Terceros Relacionados.
 * Esta sección es común para todos los trámites.
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

  /**
   * Constante que define el orden de la tabla para los terceros relacionados.
   * Se utiliza para mostrar la tabla en el componente TercerosRelacionadosComponent.
   */
  tablaOrden = TABLA_ORDEN;
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260509;

  /** Ejecuta la validación marcando los campos de terceros relacionados como tocados. */
  validarFormulario(): void {
    this.tercerosRelacionadosComponent.markTouched();
  }

}
