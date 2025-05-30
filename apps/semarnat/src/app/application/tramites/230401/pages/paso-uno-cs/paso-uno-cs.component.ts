import { Component, OnDestroy } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { PantallasActionService } from '../../services/pantallas-action.service';
import { SECCIONES_TRAMITE_230401 } from '../../enum/pantallas-constante.enum';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';

@Component({
  selector: 'app-paso-uno-cs',
  templateUrl: './paso-uno-cs.component.html',
})
export class PasoUnoCsComponent implements OnDestroy {
  /**
   * Este componente se utiliza para mostrar el subtítulo del asistente - 230401
   * Establecer el índice del subtítulo
   */
  indice: number = 1;

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(private seccionStore: SeccionLibStore,
    private consultaQuery: ConsultaioQuery,
    public pantallasActionService: PantallasActionService
  ){
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState && this.consultaState.procedureId === '230401' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
    this.asignarSecciones();

  }


  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
  * Método para asignar las secciones existentes al stored
  */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_230401
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }

    /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
    guardarDatosFormulario(): void {
      this.pantallasActionService
        .getRegistroTomaMuestrasMercanciasData().pipe(
          takeUntil(this.destroyNotifier$)
        )
        .subscribe((resp) => {
          if(resp){
          this.esDatosRespuesta = true;
          this.pantallasActionService.actualizarEstadoFormulario(resp);
          }
        });
    }

    /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
      ngOnDestroy(): void {
        this.destroyNotifier$.next();
        this.destroyNotifier$.complete();
      }
}
