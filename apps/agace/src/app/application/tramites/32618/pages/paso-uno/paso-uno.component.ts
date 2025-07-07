import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy{
   /**
     * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
     */
    @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  
    /**
     * Índice utilizado para identificar la pestaña activa dentro del paso.
     * @type {number}
     */
    indice: number = 1;
  
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;
    /** Subject para notificar la destrucción del componente. */
    private destroyNotifier$: Subject<void> = new Subject();
    /** Estado de la consulta que se obtiene del store. */
    public consultaState!: ConsultaioState;
  
    constructor(private consultaQuery: ConsultaioQuery) {
      // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
    }
  
    /**
     * Método que se ejecuta al inicializar el componente.
     */
    ngOnInit(): void {
      this.consultaQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
          })
        )
        .subscribe();
      if (this.consultaState.update) {
      //  this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
    }
  
    /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
    // guardarDatosFormulario(): void {
    //   this.solicitudService
    //     .guardarDatosFormulario()
    //     .pipe(takeUntil(this.destroyNotifier$))
    //     .subscribe((resp: GuardarDatosFormulario) => {
    //       if (resp) {
    //         this.esDatosRespuesta = true;
    //         this.solicitudService.actualizarEstadoFormulario(resp);
    //       }
    //     });
    // }
  
    /**
     * Cambia la pestaña activa según el índice proporcionado.
     * @param i - El índice de la pestaña que se desea activar.
     */
    seleccionaTab(i: number): void {
      this.indice = i;
    }
  
      /**
     * Método que se ejecuta cuando el componente se destruye.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
