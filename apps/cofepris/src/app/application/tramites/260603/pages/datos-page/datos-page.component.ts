import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ConsultaioQuery, ConsultaioState, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';

import { DatosServiceService } from '../../../../shared/services/datos-service.service'

import { map, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 110101
 * Establecer el índice del subtítulo
 */
@Component({
  selector: 'app-datos-page',
  templateUrl: './datos-page.component.html',
})
export class DatosPageComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
     * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
     */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {ConsultaioState} consultaState - Estado actual de la consulta.
   * @description
   * Esta variable almacena el estado relacionado con la consulta en el componente.
   * Es utilizada para gestionar y acceder a la información relevante del proceso de consulta.
   */
  public consultaState!: ConsultaioState;
  /**
  * Esta variable se utiliza para almacenar el índice del subtítulo.
  */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(
    public datosservice: DatosServiceService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de consulta y, dependiendo de la propiedad `update`, 
   * guarda los datos del formulario o marca la respuesta como datos.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState.update) {
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
    this.datosservice
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.datosservice.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
 * Se ejecuta después de que la vista ha sido inicializada.
 * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
 * para establecer el tipo de persona como MORAL_NACIONAL.
 */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Utiliza el observable `destroyNotifier$` para notificar y completar las suscripciones,
   * evitando posibles fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
