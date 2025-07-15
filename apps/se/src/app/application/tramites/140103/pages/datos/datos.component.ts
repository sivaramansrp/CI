import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud140103Service } from '../../services/service140103.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {

  /**
   * @description
   * Este componente maneja los datos del trámite 140103, permitiendo la visualización y edición de los datos del establecimiento.
   * Utiliza un servicio para obtener y actualizar los datos del formulario.
   */
  @Input() showBuscarError: boolean = false;
  /**
   * @description
   * Evento que se emite al intentar buscar datos.
   * Contiene el estado del formulario (si fue enviado y si es inválido).
   */
  @Output() buscarIntento = new EventEmitter<{ submitted: boolean; invalid: boolean }>();
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Estado de la consulta, utilizado para almacenar y gestionar el estado de la consulta.
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

  /** Inyecta los servicios necesarios para manejar la solicitud y consultar el estado de la sección. */
  constructor(
    private solicitud140103Service: Solicitud140103Service,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

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
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solicitud140103Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitud140103Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  

/**
   * Método que se invoca al intentar buscar datos.
   * Emite un evento con el estado del formulario (si fue enviado y si es inválido).
   *
   * @param event - Objeto que contiene el estado del formulario.
   */
  onBuscarIntento(event: { submitted: boolean; invalid: boolean }): void {
    this.buscarIntento.emit(event);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   *
   * Este método se utiliza para limpiar recursos, específicamente para completar
   * el `Subject` `destroyNotifier$`, el cual es usado en combinación con el operador `takeUntil`
   * para cancelar automáticamente las suscripciones a observables y evitar fugas de memoria.
   *
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

