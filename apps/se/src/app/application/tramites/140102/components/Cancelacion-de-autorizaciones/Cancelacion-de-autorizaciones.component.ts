import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { CancelacionDeAutorizacionesService } from '../../services/cancelacion-de-autorizaciones.service';
import { CancelacionTabla } from '../../models/Cancelacion-de-autorizaciones';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ProgramaSeleccionadoComponent } from '../programa-seleccionado/programa-seleccionado.component';


@Component({
  selector: 'app-cancelacion-de-autorizaciones',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, TablaDinamicaComponent, ProgramaSeleccionadoComponent],
  templateUrl: './Cancelacion-de-autorizaciones.component.html',
  styleUrl: './Cancelacion-de-autorizaciones.component.scss',
})
export class CancelacionDeAutorizacionesComponent implements OnInit,OnDestroy{
  /**
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();
  
  CancelacionTabladatos: CancelacionTabla[] = [];
    /**
   * Tipo de selección para la tabla de insumos.
   * Por defecto, se utiliza la selección por checkbox.
   */
    public tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;
    
  /**
   * Configuración de las columnas para la tabla de extranjeros.
   */
  public tableHeaderExtranjeros: ConfiguracionColumna<CancelacionTabla>[] = [
    { encabezado: 'Folio de programa', clave: (item) => item.folioDePrograma, orden: 1 },
    { encabezado: 'Selecciona la modalidad', clave: (item) => item.seleccionaLaModalidad, orden: 2 },
    { encabezado: 'Representación federal', clave: (item) => item.representacionFederal, orden: 3 },
    { encabezado: 'Tipo programa', clave: (item) => item.tipoPrograma, orden: 4 },
    { encabezado: 'Estatus', clave: (item) => item.estatus, orden: 5 },
  ];
  constructor( private cancelacionDeAutorizacionesService: CancelacionDeAutorizacionesService)
  {
    // Constructor vacío
  }
  ngOnInit(): void {
    // Método de inicialización
    this.obtenerDatosCancelacionTabla();
  }
   /**  
   * Método que obtiene los datos de la tabla de insumos desde el servicio.
   */
   obtenerDatosCancelacionTabla(): void {
    this.cancelacionDeAutorizacionesService
      .getCancelacionTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: CancelacionTabla[]) => {
        this.CancelacionTabladatos = resp;
      });
  }

    /**
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
