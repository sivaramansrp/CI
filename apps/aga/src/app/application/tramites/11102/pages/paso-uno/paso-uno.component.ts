import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  DatosPasos,
  FormularioDinamico,
  ListaPasosWizard,
  PERSONA_MORAL_NACIONAL,
  SolicitanteComponent,
  TIPO_PERSONA,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { ModificacionDonacionesImmexService } from '../../services/modificacion-donaciones-immex.service';
import { PASOS } from '../../constants/pasos.enum';
import { Solicitud11102StaObjResp } from '../../estados/tramite11102.store';
 
interface AccionBoton {
  /**
   * Acción a realizar (e.g., 'cont' para continuar, 'ant' para retroceder).
   */
  accion: string;
 
  /**
   * Índice del paso al que se desea navegar.
   */
  valor: number;
}
 
/**
 * Componente que representa el paso uno del trámite.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy,AfterViewInit {
 
    constructor(
    private service11102:ModificacionDonacionesImmexService, // Servicio para manejar la solicitud
    private consultaQuery: ConsultaioQuery // Servicio para consultar el estado
  ) { }
 
 
 
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false; // Indica si hay datos de respuesta del servidor
 
/**
 * Subject utilizado para notificar y manejar la destrucción de suscripciones.
 *
 * Se emite y completa en el método `ngOnDestroy` para evitar fugas de memoria
 * al cancelar todas las suscripciones activas del componente.
 */
  private destroyNotifier$: Subject<void> = new Subject(); // Subject para manejar la destrucción de suscripciones
 
  /**
   * Estado de la consulta del trámite.
   * Este estado se utiliza para manejar la información del trámite actual.
   */
  public consultaState!: ConsultaioState; // Estado de la consult
  /**
   * Evento que se emite al continuar con el flujo del trámite.
   */
  @Output() continuarEvento = new EventEmitter<string>();
 
  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
 
  /**
   * Tipo de persona (e.g., física o moral).
   */
  tipoPersona!: number;
 
  /**
   * Datos del formulario dinámico de la persona.
   */
  persona: FormularioDinamico[] = [];
 
  /**
   * Datos del formulario dinámico del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];
 
  /**
   * Índice de la pestaña seleccionada en el wizard.
   */
  indice: number = 1;
 
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;
 
  /**
   * Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
 
  /**
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 *
 * - Se suscribe al observable del estado de consulta (`selectConsultaioState$`) y actualiza la propiedad `consultaState` con el valor recibido.
 * - Utiliza `takeUntil` para cancelar la suscripción automáticamente cuando el componente se destruye, evitando fugas de memoria.
 * - Si el estado indica que está en modo actualización (`update`), llama a `guardarDatosFormulario()` para cargar los datos.
 * - Si no está en modo actualización, activa el modo de solo lectura para mostrar los datos de respuesta.
 */
    ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$), // Se desuscribe al destruir el componente
      map((consultaState) => {
        this.consultaState = consultaState; // Asigna el estado de la consulta
      })
    ).subscribe();
   
    if (this.consultaState?.update) {
      this.guardarDatosFormulario(); // Si está en modo actualización, guarda los datos del formulario
    } else {
      this.esDatosRespuesta = true; // Si no, activa el modo de datos de respuesta
    }
  }
 
      /**
   * Obtiene los datos de la solicitud desde el servicio y actualiza el estado global.
   *
   * Realiza una petición al servicio para obtener los datos de la solicitud.
   * Al recibir la respuesta, marca que existen datos de respuesta y construye un objeto `Solicitud31803State`
   * con los datos recibidos. Luego, actualiza el estado global del formulario utilizando el método
   * `actualizarEstadoFormulario` del servicio.
   * La suscripción se cancela automáticamente al destruir el componente para evitar fugas de memoria.
   */
    guardarDatosFormulario(): void {
    this.service11102
      .getDatosDeTrtamitelDoc().pipe(
        takeUntil(this.destroyNotifier$) // Se desuscribe al destruir el componente
      )
      .subscribe((resp:Solicitud11102StaObjResp) => {
        if (resp) {
          //console.log(resp, typeof resp);
          
          this.esDatosRespuesta = true; // Marca que hay datos de respuesta
          this.service11102.actualizarEstadoFormulario(resp.modificacionDonacionesImmex); // Actualiza el estado del formulario con la respuesta
        }
      });
  }
      /**
   * Método que se ejecuta después de que la vista ha sido inicializada.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL; // Asigna los datos de persona moral nacional
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL; // Asigna los datos de domicilio fiscal
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL); // Llama al método para obtener el tipo de persona en el componente hijo
  }
  /**
   * Datos de configuración para los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
 
  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
 
  /**
   * Emite el evento para continuar con el flujo del trámite.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }
 
  /**
   * Cambia el índice del wizard según la acción recibida.
   * @param e Objeto que contiene la acción ('cont' o 'ant') y el índice del paso.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
/**
 * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 *
 * Este método emite un evento a través de `destroyNotifier$` para notificar a las suscripciones activas
 * que deben cancelarse, evitando fugas de memoria. Luego, completa el subject para liberar recursos.
 */
ngOnDestroy(): void {
  this.destroyNotifier$.next(); // Emite el evento de destrucción
  this.destroyNotifier$.complete(); // Completa el subject para limpiar suscripciones
}
}
 