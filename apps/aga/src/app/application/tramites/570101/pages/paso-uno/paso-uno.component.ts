import { Component, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CancelarSolicitudComponent } from '../../components/cancelar-solicitud/cancelar-solicitud.component';
import { CancelarSolicitudService } from '../../service/cancelar-solicitud.service';
import { TramiteFolioService } from '../../service/servicios-extraordinarios.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent implements OnDestroy{
  indice: number = 1;

   /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;
     /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  
  @Output() pestanaCambiado = new EventEmitter<number>();
  @Output() isValid = new EventEmitter<boolean>();
  @ViewChild(CancelarSolicitudComponent) cancelarSolicitudComponent!: CancelarSolicitudComponent

  constructor(
    private consultaQuery: ConsultaioQuery,
    private CancelarSolicitudService: CancelarSolicitudService,
    private TramiteFolioService: TramiteFolioService
  ){
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => { this.consultaState = seccionState;
    })).subscribe();
    if(this.consultaState.update) {
    this.guardarDatosFormulario();
     } else {
        this.esDatosRespuesta = true;
        }

  }

  /**
   * @method seleccionaTab
   * @description
   * Cambia la pestaña activa y emite el nuevo índice seleccionado.
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }

  /**
   * @method isFormValid
   * @description
   * Verifica si el formulario dentro del componente `CancelarSolicitudComponent` es válido.
   * @returns {boolean} `true` si el formulario es válido, `false` en caso contrario.
   */
  isFormValid(): boolean {
    return this.cancelarSolicitudComponent?.formCancelorSolicitud.valid;
  }

  
/**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.CancelarSolicitudService.getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.CancelarSolicitudService.actualizarEstadoFormulario(resp);
        }
      });
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}

