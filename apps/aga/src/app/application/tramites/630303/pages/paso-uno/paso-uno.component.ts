/**
 * paso-uno.component.ts
 * Componente que representa el primer paso en un proceso de múltiples pasos para el trámite 630103.
 * Permite inicializar el estado, gestionar la selección de pestañas y actualizar datos del formulario.
 */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { map, takeUntil } from 'rxjs';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Subject } from 'rxjs';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  standalone:false,
})
export class PasoUnoComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Indica si los datos de respuesta del servidor están disponibles para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la consulta actual, obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

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

  /**
   * Constructor del componente.
   * retornoImportacionTemporalService - Servicio para obtener y actualizar datos del formulario.
   * consultaQuery - Query para observar el estado de la consulta.
   */
  constructor(
    private retornoImportacionTemporalService: RetornoImportacionTemporalService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe al estado de la consulta y decide si cargar datos o mostrar respuesta.
   */
 ngOnInit(): void {
  this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    )
    .subscribe({
      next: () => {
        if (this.consultaState?.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      },
      error: () => {
        this.esDatosRespuesta = true;
      }
    });
}


  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.retornoImportacionTemporalService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        this.esDatosRespuesta = true;
        this.retornoImportacionTemporalService.actualizarEstadoFormulario(resp);
      });
  }

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método obtenerTipoPersona del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
 ngAfterViewInit(): void {
  if (this.solicitante?.obtenerTipoPersona) {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }
}

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
