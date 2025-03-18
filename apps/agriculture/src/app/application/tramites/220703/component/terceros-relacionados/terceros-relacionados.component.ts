import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DESTINO_SERVICIO, destinoInfo, exportadorInfo } from '../../constantes/acuicola.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EXPORTADOR_SERVICIO } from '../../constantes/acuicola.enum';
import { MANDATORY_INSTRUCTION } from '../../constantes/acuicola.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    AlertComponent,
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss'
})
export class TercerosRelacionadosComponent {

  /**
    * Instrucción que se muestra al usuario para indicar que debe hacer doble clic en un elemento
    * de la tabla para seleccionarlo.
    */
  instruccionDobleClic: string = MANDATORY_INSTRUCTION;

  /**
   * Configuración para la selección de elementos en la tabla mediante checkboxes.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla para los datos de exportadores.
   */
  exportadorTabla: ConfiguracionColumna<exportadorInfo>[] = EXPORTADOR_SERVICIO;

  /**
   * Datos que se muestran en la tabla de exportadores.
   */
  exportadorTableDatos: exportadorInfo[] = [];

  /**
   * Configuración de las columnas de la tabla para los datos de destinos.
   */
  destinoTabla: ConfiguracionColumna<destinoInfo>[] = DESTINO_SERVICIO;

  /**
   * Datos que se muestran en la tabla de destinos.
   */
  destinoTableDatos: destinoInfo[] = [];

  /**
   * Subject utilizado para notificar la destrucción del componente y limpiar suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

}
