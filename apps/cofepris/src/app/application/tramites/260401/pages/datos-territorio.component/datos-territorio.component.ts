
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject, forkJoin, map, takeUntil } from 'rxjs';
import { Solicitud260401Service } from '../../services/service260401.service';

/**
 * Componente DatosTerritorioComponent
 * 
 * Este componente es responsable de manejar los datos del territorio en la solicitud.
 * Permite la navegación entre los pasos de la solicitud y la actualización del índice del paso actual.
 */
@Component({
  selector: 'app-datos-territorio',
  templateUrl: './datos-territorio.component.html',
})
export class DatosTerritorioComponent implements AfterViewInit, OnInit {

  /**
   * Indica si se están mostrando los datos de respuesta.
   */
  public esDatosRespuesta: boolean = false;
  /**
   * Estado actual de la consulta.
   */
  public consultaState!: ConsultaioState;
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
 * Constructor del componente.
 *
 * Se inyectan los siguientes servicios:
 * - `ConsultaioQuery`: Servicio para consultar y acceder al estado de la solicitud desde la capa de estado (por ejemplo, usando Akita).
 * - `Solicitud260401Service`: Servicio que maneja las operaciones relacionadas con la solicitud 260401, como guardar, actualizar o recuperar información.
 *
 * Aunque el constructor está vacío, esta inyección permite el uso de estos servicios en los métodos del componente.
 *
 * @param consultaQuery Servicio para acceder al estado reactivo de la solicitud.
 * @param solicitud260401Service Servicio que gestiona las operaciones del proceso 260401.
 */
  constructor(private consultaQuery: ConsultaioQuery, private solicitud260401Service: Solicitud260401Service) {
    // Constructor del componente, se pueden inyectar servicios aquí si es necesario.
  }

   /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de consulta y, dependiendo de si hay una actualización,
   * guarda los datos del formulario o muestra la respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$))
        .subscribe((seccionState) => {
          this.consultaState = seccionState
          if (this.consultaState.update) {
             this.guardarDatosFormulario()
             } else {
              this.esDatosRespuesta = true;
            }
        })
  }

  /**
   * Método para guardar los datos del formulario.
   * Realiza llamadas a los servicios para obtener los datos de registro y pago de derechos,
   * y actualiza el estado del formulario según la respuesta.
   */
  guardarDatosFormulario(): void {
    forkJoin({
      registro: this.solicitud260401Service.getRegistroTomaMuestrasMercanciasData(),
      permiso: this.solicitud260401Service.getPagoDerechos()
    })
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(({ registro, permiso }) => {
        if (registro) {
          this.esDatosRespuesta = true;
          this.solicitud260401Service.actualizarEstadoFormulario(registro);
        }
        if (permiso) {
          this.solicitud260401Service.actualizarPagoDerechosFormulario(permiso);
        }
      });
  }

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit() :void{
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   */
  indice: number = 1;

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   * 
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
