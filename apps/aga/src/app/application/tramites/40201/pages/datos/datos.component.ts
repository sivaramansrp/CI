import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``
})
export class DatosComponent implements OnInit, OnDestroy {
  /** 
   * Configuración del formulario para la persona moral 
   */
  persona: FormularioDinamico[] = [];

    /**
     * Índice de la pestaña seleccionada.
     */
    indice: number = 1;
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;

      /** Estado de la consulta, utilizado para determinar si el formulario es de solo lectura. */
    public consultaState!: ConsultaioState;
    /**
     * Selecciona la pestaña especificada.
     * 
     * @param i - El índice de la pestaña a seleccionar.
     */
    /** 
     * Configuración del formulario para el domicilio fiscal 
     */
    domicilioFiscal: FormularioDinamico[] = [];
    /**
     * Notificador para destruir el componente y limpiar sus suscripciones.
     */
    public destroyNotifier$: Subject<void> = new Subject();

    /**
     * Constructor del componente DatosComponent.
     * 
     * @param consultaQuery - Consulta para obtener el estado de la consulta.
     * @param transportacionmaritimaservice - Servicio para gestionar datos de transportación marítima.
     */

    constructor(
      private consultaQuery: ConsultaioQuery,
      private transportacionmaritimaservice: TransportacionMaritimaService
    ) {
      // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
    }
  /**
   * Método que se ejecuta al inicializar el componente.
   */
    ngOnInit(): void {
      this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((seccionState) => {
        this.consultaState = seccionState;

        if (this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      });
      }
/**
 * Selecciona la pestaña especificada.
 *
 * @param i Índice de la pestaña a seleccionar.
 */
 seleccionaTab(i: number): void {
  this.indice = i;
 }


    /**
     * Guarda los datos del formulario obtenidos del servicio de transportación marítima.
     * Este método se suscribe al observable que proporciona los datos del formulario y actualiza el estado del formulario en el servicio.
     */
    guardarDatosFormulario(): void {
      this.transportacionmaritimaservice
        .getRegistroTomaMuestrasMercanciasData()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((resp) => {
          if (resp) {
             this.esDatosRespuesta = true;
            this.transportacionmaritimaservice.actualizarEstadoFormulario(resp);
          }
        });
    }

    /**
     * Método que se ejecuta al destruir el componente.
     * Limpia las suscripciones y libera recursos.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
  }