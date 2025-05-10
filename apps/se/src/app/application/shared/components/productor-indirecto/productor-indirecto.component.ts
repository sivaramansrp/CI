import { Component, Input } from '@angular/core';

import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { ProductorIndirecto } from '../../models/complementaria.model';
import { TABLA_PRODUCTOR_INDIRECTO } from '../../constantes/complementaria.enum';


/**
 * Componente para mostrar la tabla de productores indirectos.
 */
@Component({
  selector: 'app-productor-indirecto',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss'
})
export class ProductorIndirectoComponent {
  /**
   * Lista de productores indirectos obtenidos del servicio
   * @type {ProductorIndirecto[]}
   */
  @Input() productoIndirectoDatos: ProductorIndirecto[] = [];

  /**
   * Configuración de la tabla de productores indirectos
   * @type {ConfiguracionColumna<ProductorIndirecto>[]}
   */
  configuracionTabla = TABLA_PRODUCTOR_INDIRECTO;

  /**
   * Tabla de selección de mercancías
   * @type {TablaSeleccion}
   */
  tablaSeleccion = TablaSeleccion;
}