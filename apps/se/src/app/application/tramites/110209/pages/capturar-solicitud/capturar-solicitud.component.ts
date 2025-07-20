/**
 * Componente que representa la página para capturar la solicitud.
 */

import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { SgpCertificadoService } from '../../services/sgp-certificado/sgp-certificado.service';

/**
 * Componente que representa la página para capturar la solicitud.
 */

@Component({
  selector: 'app-capturar-solicitud',
  templateUrl: './capturar-solicitud.component.html'
})
/**
 * Componente que representa la página para capturar la solicitud.
 */
export class CapturarSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Índice del tab seleccionado.
   */
  @Input() indice: number = 1;

  /**
   * Evento que se emite cuando se modifica la captura.
   */
  @Output() modificarEventCapturar: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado actual de la consulta obtenido desde el store global.
   * Contiene la información relevante para el flujo del trámite en este paso.
   */
  public consultaState!:ConsultaioState;

  /** Subject para notificar la destrucción del componente. */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param certificadoService Servicio para la gestión de certificados SGP.
   * @param consultaQuery Servicio para consultar el estado global de la solicitud.
   */  
  constructor(
      @Inject(SgpCertificadoService)
      public certificadoService: SgpCertificadoService,
      private consultaQuery: ConsultaioQuery
    ) {
  // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
    }


    /**
     * Método del ciclo de vida que se ejecuta al inicializar el componente.
     *
     * Suscribe al observable `selectConsultaioState$` para obtener el estado actual de la consulta
     * y lo asigna a la propiedad `consultaState`. Dependiendo del valor de `update` en el estado,
     * decide si debe cargar los datos del formulario o marcar que los datos de respuesta están listos.
     *
     * @returns {void}
     */
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
    this.certificadoService
      .getCertificadoDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.certificadoService.actualizarEstadoFormulario(resp);
        }else {
          this.esDatosRespuesta = false;
        }
      });
  }


  /**
   * Selecciona el tab especificado por el índice.
   * @param {number} i - El índice del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones y recursos asociados para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}