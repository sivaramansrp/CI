import { Subject } from 'rxjs';

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { map, takeUntil } from 'rxjs';
import { AutorizacionImportacionTemporalService } from '../../services/autorizacion-importacion-temporal.service';


/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  standalone:false,
})
export class PasoUnoComponent implements OnInit,OnDestroy,AfterViewInit {
  /**
     * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
     */
    @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;
  
    /** Subject para notificar la destrucción del componente. */
    private destroyNotifier$: Subject<void> = new Subject();
    public consultaState!:ConsultaioState;
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;
 
  /**
   * Selecciona una pestaña estableciendo su índice.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  constructor(
      private autorizacionImportacionTemporalService: AutorizacionImportacionTemporalService,
      private consultaQuery: ConsultaioQuery,
      private cdr: ChangeDetectorRef
    ) {
  // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
    }
  ngOnInit(): void {
     this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
           this.consultaState = seccionState;
       })).subscribe();
     if(this.consultaState.update) {
       this.guardarDatosFormulario();
     } else {
       this.esDatosRespuesta = true;
     }
   }
 
   /**
    * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
    * Luego reinicializa el formulario con los valores actualizados desde el store.
    */

 guardarDatosFormulario(): void {
    this.autorizacionImportacionTemporalService
    .getRegistroTomaMuestrasMercanciasData()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      this.esDatosRespuesta = true;
      this.autorizacionImportacionTemporalService.actualizarEstadoFormulario(resp);
    });
  }
 
   /**
    * Se ejecuta después de que la vista ha sido inicializada.
    * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
    * para establecer el tipo de persona como MORAL_NACIONAL.
    */
   ngAfterViewInit(): void {
     this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
     this.cdr.detectChanges(); // <-- Agrega esto
    }
 
   ngOnDestroy(): void {
     this.destroyNotifier$.next();
     this.destroyNotifier$.complete();
   }   
}
