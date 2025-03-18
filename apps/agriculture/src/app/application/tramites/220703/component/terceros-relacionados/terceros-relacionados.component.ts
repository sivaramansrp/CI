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

  instruccionDobleClic: string = MANDATORY_INSTRUCTION;

  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  exportadorTabla: ConfiguracionColumna<exportadorInfo>[] = EXPORTADOR_SERVICIO;

  exportadorTableDatos: exportadorInfo[] = [];

  destinoTabla: ConfiguracionColumna<destinoInfo>[] = DESTINO_SERVICIO;

  destinoTableDatos: destinoInfo[] = [];

  destroyNotifier$: Subject<void> = new Subject();

}
