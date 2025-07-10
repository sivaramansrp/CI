/* eslint-disable @nx/enforce-module-boundaries */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Pantallas301Service } from '../../services/pantallas301.service';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { Solocitud301Service } from '../../services/service301.service';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220401
 * Establecer el índice del subtítulo
 */
@Component({
  selector: 'app-pantalla-datos',
  standalone: false,
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit,OnDestroy,AfterViewInit {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

 /** Identificador de la sección seleccionada para mostrar el componente correspondiente. */
  public seccionSeleccionada!: string;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la consulta obtenido desde el store. */
  public consultaState!:ConsultaioState;
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
  /**
   * Constructor del componente DatosComponent.
   * Inyecta los servicios necesarios para la gestión de pantallas, obtención y actualización de datos,
   * así como la consulta del estado desde el store.
   *
   * @param {Pantallas301Service} pantallasSvc - Servicio para controlar la visibilidad y datos de las pantallas del trámite 301.
   * @param {Solocitud301Service} solocitud301Service - Servicio para obtener y actualizar los datos del formulario del trámite 301.
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado actual desde el store.
   */
  constructor(
    public pantallasSvc: Pantallas301Service,
    private solocitud301Service: Solocitud301Service,
    private consultaQuery: ConsultaioQuery
  ) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

   /**
   * Método del ciclo de vida `ngOnInit`.
   * Inicializa el componente y sus dependencias.
   * Suscribe al observable del estado de consulta para obtener el estado actual desde el store.
   * Si el estado indica que hay una actualización pendiente (`update`), llama al método para guardar los datos del formulario.
   * En caso contrario, activa la bandera para mostrar los datos de respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
        if(this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
    })).subscribe();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud301Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud301Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Actualiza la sección actualmente seleccionada en función del valor emitido por el componente hijo.
   * Este método se ejecuta cuando el componente `app-registro-para-la` emite un evento con la sección seleccionada,
   * y asigna dicho valor a la propiedad `seccionSeleccionada` para controlar la visualización condicional en la vista.
   *
   * @param event - Identificador de la sección seleccionada emitido por el componente hijo.
   */
  actualizarPagina(event: string): void {
    this.seccionSeleccionada = event;
  }

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
  });
  }

  /**
   * Método del ciclo de vida `ngOnDestroy`.
   * Se ejecuta cuando el componente es destruido.
   * Notifica a los observables suscritos que deben finalizar y libera los recursos asociados.
   *
   * @example
   * // Angular llama automáticamente a este método al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}