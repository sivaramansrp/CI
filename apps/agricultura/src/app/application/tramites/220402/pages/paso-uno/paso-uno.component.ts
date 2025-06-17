import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


/**
 * Componente para la vista de la paso-uno de la sección de "220402".
 */

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent implements OnInit, OnDestroy {

  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
  * @property {ConsultaioState} consultaDatos
  * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
  */
  consultaDatos!: ConsultaioState;

  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 1;

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(
    private solocitud220402Service: CapturaSolicitudeService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * - Se suscribe al observable `selectConsultaioState$` del servicio `ConsultaioQuery` para obtener el estado actual de la consulta.
   * - Actualiza la propiedad `consultaDatos` con el estado recibido.
   * - Si la propiedad `update` de `consultaDatos` es verdadera, llama al método `guardarDatosFormulario` para cargar y guardar los datos del formulario.
   * - En caso contrario, establece la propiedad `esDatosRespuesta` como verdadera.
   * 
   * Utiliza el operador `takeUntil` para cancelar las suscripciones cuando el componente se destruye, evitando fugas de memoria.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaDatos = seccionState;
    })).subscribe();
    if (this.consultaDatos.update) {
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
    this.solocitud220402Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud220402Service.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
