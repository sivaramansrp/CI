import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Solicitud150101Store } from '../../estados/solicitud150101.store';
import { SolicitudService } from '../../services/registro-solicitud-anual.service';

/**
 * @component
 * @description Componente que maneja los datos del solicitante y la lógica del formulario para el trámite 150101.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss'
})
export class DatosComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    });
  }

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   */
  indice: number = 1;

  /**
 * Indica si la fila de informe está seleccionada.
 */
  estaHabilitado: boolean = false;

  /**
   * Estado de la consulta, utilizado para manejar el estado del formulario.
   */
  public consultaState!: ConsultaioState;

  /** 
   * Datos de respuesta del servidor utilizados para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoUnoComponent.
   * @param consultaQuery consultaQuery para obtener el estado de la consulta.
   * @param solicitud150101Store solicitud150101Store para manejar el estado del trámite.
   * @param solicitudService solicitudService para realizar operaciones relacionadas con la solicitud.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solicitud150101Store: Solicitud150101Store,
    private solicitudService: SolicitudService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * @returns {void}
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
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Método para guardar los datos del formulario.
   * Realiza una llamada al servicio `solicitudService` para obtener los datos del registro de solicitud.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.solicitudService
      .getRegistroSolicitudDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          const RESP_WITH_STRING_EXPORTACIONES = {
            ...resp,
            totalExportaciones:
              resp.totalExportaciones !== undefined &&
              resp.totalExportaciones !== null
                ? String(resp.totalExportaciones)
                : '',
          };
          this.solicitud150101Store.setRegistroSolicitudAnualState(
            RESP_WITH_STRING_EXPORTACIONES
          );
        }
      });
  }

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   * 
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método para obtener el estado de la fila de informe seleccionada.
   * Actualiza el valor de `estaHabilitado` con el valor del evento.
   */
  getFilaDeInformeSeleccionada(evento: boolean): void {
    if (evento) {
      this.estaHabilitado = evento;
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Se utiliza para limpiar los recursos y evitar fugas de memoria.
   * @return {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
