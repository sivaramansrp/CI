import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, REGEX_SOLO_DIGITOS, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { Tramite110217State, Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';

/**
 * Componente para gestionar los datos del destinatario.
 * 
 * Este componente permite al usuario ingresar y gestionar información relacionada con el destinatario,
 * como datos personales, direcciones, información representativa y detalles de transporte.
 */
@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TooltipModule
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.scss',
})
export class DestinatarioComponent implements OnInit, OnDestroy {

/**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * Subject para notificar la destrucción del componente.
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  /**
   * Formulario reactivo para gestionar los datos del destinatario.
   */
  registroFormulario!: FormGroup;

  /**
   * Catálogo de opciones de transporte.
   */
  transporte!: CatalogosSelect;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Tramite110217State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indicador para deshabilitar elementos del formulario.
   */
  estaDeshabilitado: boolean = false;

  /**
   * Indicador para verificar si el formulario está vacío.
   */
  estaVacio: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110217Query} query - Query para obtener el estado del trámite.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   */
  constructor(
    public fb: FormBuilder,
    private store: Tramite110217Store,
    private query: Tramite110217Query,
    private validacionesService: ValidacionesFormularioService,
      private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Configura el formulario y suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.donanteDomicilio();


     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.destinatarioFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Configura el formulario del destinatario según el estado de la solicitud.
   *  Si el formulario está en modo solo lectura, deshabilita los campos del formulario.
   *  @returns {void}
   */
    destinatarioFormulario(): void {
    if (this.soloLectura) {
      this.registroFormulario.disable();
    } else {
      this.registroFormulario.enable();
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario con los datos del estado de la solicitud.
   */
  donanteDomicilio(): void {
    this.registroFormulario = this.fb.group({
      grupoReceptor: this.fb.group({
        nombre: [this.solicitudState?.grupoReceptor?.nombre, [Validators.maxLength(250)]],
        apellidoPrimer: [this.solicitudState?.grupoReceptor?.apellidoPrimer, [Validators.maxLength(20)]],
        apellidoSegundo: [this.solicitudState?.grupoReceptor?.apellidoSegundo, [Validators.maxLength(20)]],
        numeroFiscal: [this.solicitudState?.grupoReceptor?.numeroFiscal, [Validators.required, Validators.maxLength(30)]],
        razonSocial: [this.solicitudState?.grupoReceptor?.razonSocial, [Validators.maxLength(70)]],
      }),

      grupoDeDirecciones: this.fb.group({
        ciudad: [this.solicitudState?.grupoDeDirecciones?.ciudad, [Validators.required,Validators.maxLength(50)]],
        calle: [this.solicitudState?.grupoDeDirecciones?.calle, [Validators.required,Validators.maxLength(90)]],
        numeroLetra: [this.solicitudState?.grupoDeDirecciones?.numeroLetra, [Validators.required,Validators.maxLength(30)]],
        lada: [this.solicitudState?.grupoDeDirecciones?.lada, []],
        telefono: [this.solicitudState?.grupoDeDirecciones?.telefono, [Validators.pattern(REGEX_SOLO_DIGITOS),Validators.maxLength(20)]],
        fax: [this.solicitudState?.grupoDeDirecciones?.fax, [Validators.pattern(REGEX_SOLO_DIGITOS)]],
        correoElectronico: [this.solicitudState?.grupoDeDirecciones?.correoElectronico, [Validators.required, Validators.email,Validators.maxLength(70)]],
      }),

      grupoRepresentativo: this.fb.group({
        lugar: [this.solicitudState?.grupoRepresentativo?.lugar, [Validators.required, Validators.maxLength(70)]],
        nombreExportador: [this.solicitudState?.grupoRepresentativo?.nombreExportador, [Validators.required, Validators.maxLength(40)]],
        empresa: [this.solicitudState?.grupoRepresentativo?.empresa, [Validators.required, Validators.maxLength(40)]],
        cargo: [this.solicitudState?.grupoRepresentativo?.cargo, [Validators.required, Validators.maxLength(40)]],
        lada: [this.solicitudState?.grupoRepresentativo?.lada, []],
        telefono: [this.solicitudState?.grupoRepresentativo?.telefono, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
        fax: [this.solicitudState?.grupoRepresentativo?.fax, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
        correoElectronico: [this.solicitudState?.grupoRepresentativo?.correoElectronico, [Validators.required, Validators.email]],
      }),

      grupoDeTransporte: this.fb.group({
        puertoEmbarque: [this.solicitudState?.grupoDeTransporte?.puertoEmbarque, [Validators.maxLength(40)]],
        puertoDesembarque: [this.solicitudState?.grupoDeTransporte?.puertoDesembarque, [Validators.maxLength(40)]],
        puertoTransito: [this.solicitudState?.grupoDeTransporte?.puertoTransito, [Validators.maxLength(30)]],
        nombreEmbarcacion: [this.solicitudState?.grupoDeTransporte?.nombreEmbarcacion, [Validators.maxLength(30)]],
        numeroVuelo: [this.solicitudState?.grupoDeTransporte?.numeroVuelo, [Validators.maxLength(15)]]
      }),
    });
     this.destinatarioFormulario();
  }

  /**
   * Valida el formulario del destinatario.
   * 
   * Si el formulario es inválido, marca todos los campos como tocados.
   */
  validarDestinatarioFormulario(): void {
    this.registroFormulario.markAllAsTouched();
    if (this.registroFormulario.invalid) {
      // formulario válido
    }
  }

  /**
   * Maneja el evento de clic para deshabilitar elementos del formulario.
   */
  onClick(): void {
    this.estaDeshabilitado = true;
  }

 

  /**
   * Valida un campo del formulario.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza el estado del store con el valor seleccionado en el formulario.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110217Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene el grupo de transporte del formulario.
   * 
   * @returns {FormGroup} El grupo de transporte.
   */
  get grupoDeTransporte(): FormGroup {
    return this.registroFormulario.get('grupoDeTransporte') as FormGroup;
  }

  /**
   * Obtiene el grupo receptor del formulario.
   * 
   * @returns {FormGroup} El grupo receptor.
   */
  get grupoReceptor(): FormGroup {
    return this.registroFormulario.get('grupoReceptor') as FormGroup;
  }

  /**
   * Obtiene el grupo de direcciones del formulario.
   * 
   * @returns {FormGroup} El grupo de direcciones.
   */
  get grupoDeDirecciones(): FormGroup {
    return this.registroFormulario.get('grupoDeDirecciones') as FormGroup;
  }

  /**
   * Obtiene el grupo representativo del formulario.
   * 
   * @returns {FormGroup} El grupo representativo.
   */
  get grupoRepresentativo(): FormGroup {
    return this.registroFormulario.get('grupoRepresentativo') as FormGroup;
  }
}