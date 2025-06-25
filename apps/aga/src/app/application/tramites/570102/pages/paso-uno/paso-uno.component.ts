import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { SolicitanteComponent, } from '@libs/shared/data-access-user/src';
import { Solicitud570102State } from '../../state/Tramite570102.store';
import { SolicitudService } from '../../service/solicitud.service';

/**
 * Componente que representa el primer paso del trámite.
 * Este componente gestiona la lógica y la interfaz de usuario para capturar los datos iniciales del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
   * Evento que emite el índice del paso actual.
   */
  @Output() indiceNombre: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Referencia al componente de solicitante.
   * Se utiliza para interactuar con el componente hijo y obtener datos del solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   * Representa el tipo de persona (moral o física) que realiza el trámite.
   */
  tipoPersona!: number;

  /**
   * Observable para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Configuración del formulario dinámico para la persona.
   * Contiene los campos relacionados con los datos personales del solicitante.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   * Contiene los campos relacionados con el domicilio fiscal del solicitante.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   * Representa el número del paso en el asistente de pasos.
   */
  indice: number = 1;

  /**
   * Formulario reactivo que contiene los campos del paso uno del trámite.
   * Este formulario se utiliza para capturar y validar los datos ingresados por el usuario.
   */
  registroForm!: FormGroup;

  /**
   * Estado global de la solicitud 570102.
   * Contiene los valores actuales del trámite, como renovación, homologación, y otros datos relevantes.
   */
  public solicitudState!: Solicitud570102State;
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
   * Constructor del componente PasoUnoComponent.
   * 
   * @param fb - Servicio FormBuilder utilizado para construir formularios reactivos.
   */
  constructor(public fb: FormBuilder,private consultaQuery: ConsultaioQuery,private solicitud:SolicitudService) {
    // El constructor se utiliza para la inyección de dependencias.
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
    this.solicitud
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitud.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Método que se ejecuta después de que las vistas del componente han sido inicializadas.
   * Configura los formularios dinámicos y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.indiceNombre.emit(this.indice);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}