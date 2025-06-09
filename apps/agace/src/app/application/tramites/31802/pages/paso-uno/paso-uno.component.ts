import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, TIPO_PERSONA, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { Solicitud31802State, Tramite31802Store } from '../../state/Tramite31802.store';
import { RegistroSolicitudService } from '../../services/registro-solicitud-service.service';
import { SolicitanteComponent, } from '@libs/shared/data-access-user/src';
import { Tramite31802Query } from '../../state/Tramite31802.query';

/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements AfterViewInit,OnInit, OnDestroy {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false; // Indica si hay datos de respuesta del servidor

  private destroyNotifier$: Subject<void> = new Subject(); // Subject para manejar la destrucción de suscripciones
  public consultaState!: ConsultaioState; // Estado de la consulta
  
  /**
  * Referencia al componente de solicitante.
  */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;
  /**
    * Observable para manejar la destrucción del componente.
    * Se utiliza para cancelar suscripciones activas.
    */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  /**
 * Formulario reactivo que contiene los campos del paso uno del trámite.
 * Este formulario se utiliza para capturar y validar los datos ingresados por el usuario.
 */
  registroForm!: FormGroup;
  /**
 * Estado global de la solicitud 31802.
 * Contiene los valores actuales del trámite, como renovación, homologación, y otros datos relevantes.
 */
  public solicitudState!: Solicitud31802State;
/**
 * Constructor del componente PasoUnoComponent.
 * 
 * @param fb - Servicio FormBuilder utilizado para construir formularios reactivos.
 * @param store - Almacén de estado para gestionar y almacenar datos relacionados con el trámite 31802.
 * @param query - Consulta para obtener datos del estado global del trámite 31802.
 * @param validacionesService - Servicio para realizar validaciones personalizadas en los formularios.
 */
  constructor(
    private consultaQuery: ConsultaioQuery, // Servicio para consultar el estado
    public fb: FormBuilder,
    private store: Tramite31802Store,
    private query: Tramite31802Query,
    private validacionesService: ValidacionesFormularioService,
    private solicitud31802Service:RegistroSolicitudService, // Servicio para manejar el estado de la solicitud 31802
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
 
  /**
    * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
    * Configura el formulario, obtiene datos iniciales y suscribe al estado global.
    */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
  }

    guardarDatosFormulario(): void {
    // Método para guardar los datos del formulario
    this.solicitud31802Service
      .getDatosDeAvisoRenovacionDoc().pipe(
        takeUntil(this.destroyNotifier$) // Se desuscribe al destruir el componente
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true; // Marca que hay datos de respuesta
          this.solicitud31802Service.actualizarEstadoFormulario(resp); // Actualiza el estado del formulario con la respuesta
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
 * Establece el valor de renovación en el estado global.
 * @param evento Evento del tipo `Event` que contiene el valor del checkbox.
 */
  establecerRenovacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.store.setRenovacion(VALOR);
  }
  /**
 * Establece el valor de homologación en el estado global.
 * @param evento Evento del tipo `Event` que contiene el valor del checkbox.
 */
  establecerHomologacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.store.setHomologacion(VALOR);
  }
  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
     * Verifica si un campo del formulario es válido.
     *
     * @param form Formulario reactivo.
     * @param field Nombre del campo a validar.
     * @returns `true` si el campo es válido, de lo contrario `false`.
     */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Marca todos los campos del formulario como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   *
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31802Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Inicializa el formulario con los valores actuales del estado.
   */
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      renovacion: [this.solicitudState?.renovacion, [Validators.required]],
      homologacion: [this.solicitudState?.homologacion, [Validators.required]],
    });
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
