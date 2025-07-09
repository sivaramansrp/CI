import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Solicitud32513State, Solicitud32513Store } from '../../estados/solicitud32513.store';
import { AvisoComponent } from '../../components/aviso.component';
import { CommonModule } from '@angular/common';
import { Solicitud32513Query } from '../../estados/solicitud32513.query';
import { Subject } from 'rxjs';

/**
 * Componente que representa el primer paso del trámite 32513.
 * Gestiona la visualización y activación de diferentes secciones (tabs) según el tipo de endoso.
 */
@Component({
  selector: 'paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    AvisoComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
export class PasoUnoComponent implements OnInit, OnDestroy {

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud32513State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si los datos de respuesta del servidor están presentes.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Referencia al componente AvisoComponent hijo.
   */
  @ViewChild(AvisoComponent) avisoComponent!: AvisoComponent;

  /**
   * Constructor del componente PasoUnoComponent.
   * Inyecta los servicios y stores necesarios para la gestión del formulario y los datos asociados al trámite 32513.
   * @param fb FormBuilder para la creación del formulario reactivo.
   * @param avisoService Servicio para operaciones relacionadas con el aviso.
   * @param solicitud32513Store Store para el manejo del estado de la solicitud.
   * @param solicitud32513Query Query para consultar el estado de la solicitud.
   */
  constructor(
    private fb: FormBuilder,
    public solicitud32513Store: Solicitud32513Store,
    public solicitud32513Query: Solicitud32513Query,
  ) {}

  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   */
  indice: number = 1;

  /**
   * Formulario reactivo del solicitante.
   */
  solicitanteForm!: FormGroup;

  /**
   * Referencia al componente SolicitanteComponent hijo.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

  /**
   * Datos de la persona (estructura dinámica del formulario).
   */
  persona: FormularioDinamico[] = [];

  /**
   * Datos del domicilio fiscal (estructura dinámica del formulario).
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Determina si la pestaña de modificación de denominación o razón social debe estar habilitada.
   */
  isEnableModificacionTab: boolean = false;

  /**
   * Inicializa el formulario del solicitante y deshabilita el campo 'adace'.
   */
  ngOnInit(): void {
    this.solicitanteForm = this.fb.group({
      adace: [{ value: this.solicitudState?.adace, disabled: true }]
    });
  }

  // /**
  //  * Método del ciclo de vida que se ejecuta después de que la vista ha sido inicializada.
  //  * Inicializa los datos de persona y domicilio fiscal, y obtiene el tipo de persona.
  //  */
  // ngAfterViewInit(): void {
  //   this.persona = PERSONA_MORAL_NACIONAL;
  //   this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  //   this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  // }

  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * @param i - El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Maneja el cambio de tipo de endoso y habilita o deshabilita la pestaña de modificación
   * dependiendo del valor seleccionado.
   * @param evento - El tipo de endoso seleccionado (puede ser string o número).
   */
  tipoDeEndosoChanges(evento: string | number): void {
    if (evento === 3) {
      this.isEnableModificacionTab = true;
    } else {
      this.isEnableModificacionTab = false;
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
