import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { ConsultaService } from '../../service/consulta.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente que representa el primer paso del trámite.
 *
 * Este componente agrupa los subcomponentes de solicitante, datos de la solicitud,
 * pago de derechos, terceros relacionados y trámites asociados, y administra la
 * navegación entre las pestañas del asistente.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements AfterViewInit,OnInit, OnDestroy {
 /**
   * Indica si los datos de respuesta están disponibles.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
   /**
     * Estado de la consulta, utilizado para manejar el estado de la aplicación.
     */
  public consultaState!: ConsultaioState;
  /**
   * Indica si los datos de respuesta están disponibles.
   * Se utiliza para determinar si se deben mostrar los datos del formulario o no.
   */
  public esDatosRespuesta: boolean = false;
  /**
   * Referencia al componente de Solicitante.
   *
   * Se utiliza para acceder a métodos y propiedades del SolicitanteComponent.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   *
   * Representa el tipo de persona (por ejemplo, física o moral) que se selecciona.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona. */
  persona: FormularioDinamico[] = [];

  /*** Configuración del formulario dinámico para el domicilio fiscal.*/
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña actual del asistente.
   */
  indice: number = 1;
  /**
     * Constructor del componente.
     *
     * Se utiliza para la inyección de dependencias.
     */
  constructor(private consultaQuery: ConsultaioQuery,
    private consulta: ConsultaService
  ) {
    // Constructor vacío, no requiere inicialización adicional.
  }
 /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se pueden realizar tareas de configuración inicial, pero en este caso lanza un error indicando que no está implementado.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }

  }
  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormularios(): void {
    this.consulta
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.consulta.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Método del ciclo de vida que se ejecuta después de la inicialización de la vista.
   *
   * Inicializa las configuraciones de los formularios dinámicos y establece el tipo de persona
   * en el componente Solicitante.
   */
  ngAfterViewInit(): void {
    // Asigna las configuraciones de formulario para persona y domicilio fiscal.
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    // Llama al método del componente Solicitante para establecer el tipo de persona.
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   *
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
/**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Aquí se pueden realizar tareas de limpieza, pero en este caso lanza un error indicando que no está implementado.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
