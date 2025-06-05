import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

import { Subject,map, takeUntil } from 'rxjs';

import { Solicitud150103State, Solicitud150103Store } from '../../estados/solicitud150103.store';
import { Solicitud150103Query } from '../../estados/solicitud150103.query';

import { InformeAnualProgramaService } from '../../services/informe-anual-programa.service';
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
  styleUrl: './paso-uno.component.scss',
  
})
export class PasoUnoComponent implements AfterViewInit,OnInit,OnDestroy {

  /**
   * Constructor del componente.
   *
   * Se utiliza para la inyección de dependencias.
   */
  constructor(
    public solicitud150103Store: Solicitud150103Store,
    public solicitud150103Query: Solicitud150103Query,
    public informaAnualPrograma: InformeAnualProgramaService,
    public consultaQuery: ConsultaioQuery,
  ) {
     
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
 * Indica si el botón o funcionalidad está habilitado.
 */
estaHabilitado: boolean = false;
/**
 * @property {boolean} esDatosRespuesta
 * @description Indica si los datos de respuesta están disponibles para el formulario.
 * @default false
 */
public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado de la consulta que se obtiene del store. */
  public consultaState!:ConsultaioState;
  /**
   * Método del ciclo de vida que se ejecuta después de la inicialización de la vista.
   *
   * Inicializa las configuraciones de los formularios dinámicos y establece el tipo de persona
   * en el componente Solicitante.
   */
  ngAfterViewInit(): void {
    // Llama al método del componente Solicitante para establecer el tipo de persona.
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }
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
  guardarDatosFormulario(): void {
    this.informaAnualPrograma
      .getRegistroData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp: Solicitud150103State) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.informaAnualPrograma.actualizarEstadoFormulario(resp);
        }
      });
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
 * Actualiza el estado de habilitación basado en el evento recibido.
 *
 * Este método se ejecuta cuando se selecciona una fila del informe y
 * actualiza la propiedad `estaHabilitado` según el valor del evento.
 *
 * @param evento Valor booleano que indica si la fila ha sido seleccionada.
 */
getFilaDeInformeSeleccionada(evento: boolean): void {
  if (evento) {
    this.estaHabilitado = evento;
  }
}

ngOnDestroy(): void {
  this.destroyNotifier$.next(); 
  this.destroyNotifier$.complete(); 
}
}