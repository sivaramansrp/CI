import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { SolicitudDeRegistroInvocarService } from '../../services/solicitud-de-registro-invocar.service';

/**
 * Componente correspondiente al primer paso del flujo del trámite.
 * Se encarga de gestionar la selección de pestañas y la configuración del solicitante.
 *
 * @export
 * @class PasoUnoComponent
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {

  /**
   * Índice para manejar la pestaña seleccionada.
   * Este valor determina cuál pestaña está activa en la interfaz de usuario.
   *
   * @type {number}
   * @memberof PasoUnoComponent
   */
  indice: number = 1;

  /**
   * Decorador `ViewChild` para acceder a la instancia del componente `SolicitanteComponent`.
   * Este componente se utiliza para gestionar información relacionada con el solicitante.
   *
   * @type {SolicitanteComponent}
   * @memberof PasoUnoComponent
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esFormularioSoloLectura: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /* Estado actual de la consulta cargado desde el store.
   * Contiene datos como modo de solo lectura y valores del formulario.
   */
  public consultaState!: ConsultaioState;

  /**
   * Constructor que inyecta los servicios necesarios para manejar el estado y la consulta.
   * La lógica de inicialización se delega a métodos específicos.
   */
  constructor(
    private solicitudDeRegistroInvocarService: SolicitudDeRegistroInvocarService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * En este método se llama al componente `SolicitanteComponent` para establecer el tipo de persona.
   *
   * @memberof PasoUnoComponent
   */
  ngAfterViewInit(): void {
    // Llama al método para obtener el tipo de persona (en este caso, una persona moral nacional)
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Inicializa el componente suscribiéndose al estado de consulta.
   * Según el estado, carga datos del formulario o marca como respuesta disponible.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
    })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esFormularioSoloLectura = true;
    }
  }
  
  /**
  * Obtiene los datos de la solicitud desde un servicio y actualiza el estado del formulario.  
  * Si la respuesta es válida, activa el indicador de datos cargados.
  */
  guardarDatosFormulario(): void {
    this.solicitudDeRegistroInvocarService
      .getDatosDeLaSolicitud().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esFormularioSoloLectura = true;
        this.solicitudDeRegistroInvocarService.actualizarEstadoFormulario(resp);
        }else {
          this.esFormularioSoloLectura = false;
        }
      });
  }

  /**
   * Permite que el usuario seleccione una pestaña cambiando el valor de `indice`.
   * 
   * @param {number} indice - El índice de la pestaña seleccionada.
   * @memberof PasoUnoComponent
   */
  seleccionaTab(indice: number): void {
    // Establece el índice de la pestaña seleccionada
    this.indice = indice;
  }

  /**
  * Método de limpieza que se ejecuta al destruir el componente.  
  * Finaliza las suscripciones observables utilizando `destroyNotifier$`.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
