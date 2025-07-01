import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud260915Service } from '../../services/service260915.service';


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
export class PasoUnoComponent implements AfterViewInit, OnInit {

 /**
   * Indica si se han recibido correctamente los datos desde el servidor.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject utilizado para cancelar suscripciones y evitar fugas de memoria al destruir el componente.
   * Se emite un valor y se completa cuando el componente se destruye.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente.
   * @param consultaQuery Consulta de estado de solo lectura.
   * @param solocitud260915Service Servicio para obtener y actualizar datos del formulario.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud260915Service: Solocitud260915Service,
  ) {}

    /**
   * Hook del ciclo de vida de Angular.
   * Se ejecuta al inicializar el componente y se suscribe al estado del store.
   * Si el estado indica actualización, solicita los datos del formulario.
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
   * Solicita los datos del[] formulario al servicio y actualiza el store si la respuesta es válida.
   * Marca la bandera de datos recibidos si la respuesta es exitosa.
   */
  guardarDatosFormulario(): void {
    this.solocitud260915Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud260915Service.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Referencia al componente de Solicitante.
   *
   * Se utiliza para acceder a métodos y propiedades del SolicitanteComponent.
   */
  @ViewChild(SolicitanteComponent)
  solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   *
   * Representa el tipo de persona (por ejemplo, física o moral) que se selecciona.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   *
   * Es un arreglo de objetos de tipo FormularioDinamico que define los campos y validaciones
   * para el formulario de persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   *
   * Es un arreglo de objetos de tipo FormularioDinamico que define los campos y validaciones
   * para el formulario del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña actual del asistente.
   */
  indice: number = 1;

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
}