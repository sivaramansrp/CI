import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DESTINO_SERVICIO, DestinoInfo, ExportadorInfo } from '../../constantes/acuicola.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EXPORTADOR_SERVICIO } from '../../constantes/acuicola.enum';
import { FitosanitarioService } from '../../service/fitosanitario.service';
import { MANDATORY_INSTRUCTION } from '../../constantes/acuicola.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {

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
  exportadorTabla: ConfiguracionColumna<ExportadorInfo>[] = EXPORTADOR_SERVICIO;

  /**
   * Datos que se muestran en la tabla de exportadores.
   */
  exportadorTableDatos: ExportadorInfo[] = [];

  /**
   * Configuración de las columnas de la tabla para los datos de destinos.
   */
  destinoTabla: ConfiguracionColumna<DestinoInfo>[] = DESTINO_SERVICIO;

  /**
   * Datos que se muestran en la tabla de destinos.
   */
  destinoTableDatos: DestinoInfo[] = [];

  /**
   * Subject utilizado para notificar la destrucción del componente y limpiar suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  constructor(private fitosanitarioService: FitosanitarioService) { 
    // No se necesita lógica de inicialización adicional
  }

   ngOnInit(): void {
      
  
      
      this.getDatos();
     this.getDatosDestinatario();

      
    }
    getDatos(): void {
      this.fitosanitarioService.getDatosExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.exportadorTableDatos = RESPONSE;
        }
      });
    }
    getDatosDestinatario(): void {
      this.fitosanitarioService.getDatosDestinatarioInfo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.destinoTableDatos = RESPONSE;
        }
      });
    }

    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.unsubscribe();
    }

}
