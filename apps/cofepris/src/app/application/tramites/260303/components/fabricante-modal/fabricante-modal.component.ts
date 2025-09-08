import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, REGEX_RFC, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Solicitud260303State, Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { RadioOpcion } from '../../models/certificados-licencias-permisos.model';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import terecerosNacionalidos from '@libs/shared/theme/assets/json/260303/terceros-nacionalidad.json';
import tipoPersona from '@libs/shared/theme/assets/json/260303/tipo-persona.json';
/**
 * FabricanteModalComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-fabricante-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent, TooltipModule, CatalogoSelectComponent],
  templateUrl: './fabricante-modal.component.html',
  styleUrl: './fabricante-modal.component.scss',
})
export class FabricanteModalComponent implements OnInit, OnDestroy {

  @Output() guardarFabricante = new EventEmitter<Record<string, unknown>>();

  /**
   * Representa el título del componente modal.
   */
  titulo: string;
  /**
   * Representa el catálogo de países disponibles para selección.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`.
   */
  public paisCatalogo!: Catalogo[];
  /**
   * Un grupo de formulario reactivo utilizado para gestionar y validar 
   * los datos relacionados con las asociaciones de terceros en el componente.
   */
  public tercerosRelacionadosForm!: FormGroup;
  /**
   * Representa el estado de la Solicitud 260303.
   * Esta propiedad contiene los datos y la gestión del estado para la solicitud actual.
   * Se espera que se inicialice con una instancia de `Solicitud260303State`.
   */
  public solicitudState!: Solicitud260303State;
  /**
   * Notificador para destruir los observables al finalizar.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;

  /** Opciones de nacionalidad para terceros, obtenidas del catálogo correspondiente. */
  public terecerosNacionalidadOpciones: RadioOpcion[] = Array.isArray(terecerosNacionalidos) ? terecerosNacionalidos as RadioOpcion[] : [];

  /** Opciones de tipo de persona, obtenidas del catálogo correspondiente. */
  public tipoPersonaOpciones: RadioOpcion[] = Array.isArray(tipoPersona) ? tipoPersona as RadioOpcion[] : [];

  /**
   * Constructor del componente FabricanteModalComponent.
   * 
   * @param bsModalRef - Referencia a la instancia del modal de Bootstrap.
   * @param fb - Instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
   */
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private tramite260303Store: Tramite260303Store,
    private tramite260303Query: Tramite260303Query,
    private consultaioQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService,
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
  ) {
    this.titulo = '';
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * Este método se utiliza para realizar la lógica de inicialización del componente.
   * En esta implementación, invoca el método `cerrarTercerosRelacionadosForm` para reiniciar o cerrar
   * el formulario relacionado con las asociaciones de terceros.
   */
  ngOnInit(): void {
    this.tramite260303Query.selectSolicitud$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
      .subscribe();
    this.getPaisDatos();
    if (this.titulo === 'Agregar otros') {
      this.cerrarTercerosRelacionadosForm();
    } else {
      this.initializeTercerosRelacionadosForm();
    }
  }

  /**
     * Recupera los datos para la tabla de fabricantes realizando una llamada al servicio.
     * Se suscribe a la respuesta del método `getPaisDatos` del servicio,
     * crea una copia profunda de la respuesta y la asigna a la propiedad `paisDatos`.
     *
     * @returns {void}
     */
  public getPaisDatos(): void {
    this.certificadosLicenciasSvc.getPaisDatos()
      .pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe((response) => {
        this.paisCatalogo = response;
      });
  }

  /**
   * Inicializa el formulario obteniendo el estado actual de la solicitud desde el store.
   * Se suscribe al observable selectSolicitud$ para actualizar la propiedad solicitudState
   * con los datos más recientes de la solicitud.
   */
  inicializarFormulario(): void {
    this.tramite260303Query.selectSolicitud$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
      .subscribe();
  }

  /**
   * Restablece el grupo de formulario `tercerosRelacionadosForm` con valores predeterminados vacíos.
   * Este método inicializa el formulario con controles para varios campos como
   * denominación social, RFC, CURP, detalles de dirección e información de contacto.
   * Cada control se establece con una cadena vacía como su valor predeterminado.
   *
   * @returns {void}
   */
  public cerrarTercerosRelacionadosForm(): void {
    this.tercerosRelacionadosForm = this.fb.group({
      terceroNombre: [this.solicitudState.tercerosRelacionadosTerceroNombre, Validators.required],
      tercerosNacionalidad: [this.solicitudState.tercerosNacionalidad],
      tipoPersona: [this.solicitudState.tipoPersona, Validators.required],
      rfc: [{ value: this.solicitudState.tercerosRelacionadosRfc, disabled: true }, [Validators.required, Validators.maxLength(13), FabricanteModalComponent.validadorRFC]],
      curp: [{ value: this.solicitudState.tercerosRelacionadosCurp, disabled: true }],
      razonSocial: [{ value: this.solicitudState.tercerosRelacionadosRazonSocial, disabled: true }],
      datosPersonalesNombre: [{ value: this.solicitudState.datosPersonalesNombre, disabled: true }],
      datosPersonalesPrimerApellido: [{ value: this.solicitudState.datosPersonalesPrimerApellido, disabled: true }],
      datosPersonalesSegundoApellido: [{ value: this.solicitudState.datosPersonalesSegundoApellido, disabled: true }],
      pais: [{ value: this.solicitudState.tercerosRelacionadosPais, disabled: true }],
      estado: [{ value: this.solicitudState.tercerosRelacionadosEstado, disabled: true }],
      municipio: [{ value: this.solicitudState.tercerosRelacionadosMunicipio, disabled: true }],
      localidad: [{ value: this.solicitudState.tercerosRelacionadosLocalidad, disabled: true }],
      codigoPostal: [{ value: this.solicitudState.tercerosRelacionadosCodigoPostal, disabled: true }],
      colonia: [{ value: this.solicitudState.tercerosRelacionadosColonia, disabled: true }],
      calle: [{ value: this.solicitudState.tercerosRelacionadosCalle, disabled: true }],
      numeroExterior: [{ value: this.solicitudState.tercerosRelacionadosNumeroExterior, disabled: true }],
      numeroInterior: [{ value: this.solicitudState.tercerosRelacionadosNumeroInterior, disabled: true }],
      lada: [{ value: this.solicitudState.tercerosRelacionadosLada, disabled: true }],
      telefono: [{ value: this.solicitudState.tercerosRelacionadosTelefono, disabled: true }],
      correoElectronico: [{ value: this.solicitudState.tercerosRelacionadosCorreoElectronico, disabled: true }],
    });
  }

  /**
   * Restablece el grupo de formulario `tercerosRelacionadosForm` con valores predeterminados vacíos.
   * Este método inicializa el formulario con controles para varios campos como
   * denominación social, RFC, CURP, detalles de dirección e información de contacto.
   * Cada control se establece con una cadena vacía como su valor predeterminado.
   *
   * @returns {void}
   */
  initializeTercerosRelacionadosForm(): void {
    this.tercerosRelacionadosForm = this.fb.group({
      denominacionSocial: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s.,'-]+$"),
        Validators.maxLength(254)
      ]],
      pais: [this.solicitudState.tercerosRelacionadosPais, Validators.required],
      estado: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s.,'-]+$"),
        Validators.maxLength(255)
      ]],
      codigoPostal: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(12)
      ]],
      calle: [this.solicitudState.tercerosRelacionadosCalle, Validators.required],
      numeroExterior: [this.solicitudState.tercerosRelacionadosNumeroExterior, Validators.required],
      numeroInterior: [this.solicitudState.tercerosRelacionadosNumeroInterior],
      lada: [this.solicitudState.tercerosRelacionadosLada],
      telefono: [this.solicitudState.tercerosRelacionadosTelefono],
      correoElectronico: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(254)
      ]],
    });
  }

  /**
     * Valida el RFC ingresado en el formulario.
     * Utiliza expresiones regulares para verificar si es un RFC válido.
     * 
     * @returns Un objeto de error si el RFC es inválido, o null si es válido.
     */
  static validadorRFC(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }
    const ES_VALIDO = REGEX_RFC.test(VALUE);
    return ES_VALIDO ? null : { rfcInvalido: true };
  }


  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260303Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260303Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
 * Determina si se debe cargar un formulario nuevo o uno existente.  
 * Ejecuta la lógica correspondiente según el estado del componente.
 */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }


  /**
   * Guarda los datos del formulario y ajusta el estado de solo lectura.
   * Si el formulario está en modo solo lectura, deshabilita todos los controles del formulario.
   * Si no, habilita los controles para permitir la edición.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      // Deshabilita el formulario si está en modo solo lectura
      this.tercerosRelacionadosForm.disable();
    } else {
      // Habilita el formulario para edición
      this.tercerosRelacionadosForm.enable();
    }
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  eventoDeCambioDeValor(event: string | number | Event, form: FormGroup, campo: string, metodoNombre: keyof Tramite260303Store): void {
    let VALOR;
    if (event instanceof Event && (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement)) {
      const INPUT = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      VALOR = INPUT.value;
    } else {
      VALOR = event;
    }
    form.get(campo)?.setValue(VALOR);
    if (form.get('tercerosNacionalidad')?.value && form.get('tipoPersona')?.value) {
      form.get('rfc')?.enable();
    }
    this.setValoresStore(form, campo, metodoNombre);
  }

  /** Busca y asigna datos simulados al formulario de terceros relacionados si el RFC es válido. */
  buscar(): void {
    if (this.tercerosRelacionadosForm.get('rfc')?.valid) {
      this.tercerosRelacionadosForm.patchValue({
        curp: 'MAVLT12345678',
        datosPersonalesNombre: 'EUROFOODS DE MEXICO',
        datosPersonalesPrimerApellido: 'GONZALEZ',
        datosPersonalesSegundoApellido: 'PINAL',
        pais: 'MEXICO',
        estado: 'CDMX',
        municipio: 'CDMX',
        localidad: 'VICTORIA DE DURANGO',
        codigoPostal: '12345',
        colonia: 'CENTRO',
        calle: 'LIBERTAD',
        numeroExterior: 'S/N',
        numeroInterior: 'A',
        lada: '618',
        telefono: '1234567890',
        correoElectronico: 'info@eurofoods.com.mx',
        razonSocial: 'EUROFOODS DE MEXICO',
        denominacionSocial: 'EUROFOODS DE MEXICO'
      });
    }
  }

  /** Limpia todos los campos del formulario de terceros relacionados, restableciéndolos a su estado inicial. */
  limpiar(): void {
    this.tercerosRelacionadosForm.reset();
  }

  /** Guarda los datos del formulario de terceros relacionados si es válido y cierra el modal; de lo contrario, marca todos los campos como tocados. */
  guardar(): void {
    if (this.tercerosRelacionadosForm.valid) {
      this.guardarFabricante.emit(this.tercerosRelacionadosForm.getRawValue());
      this.bsModalRef.hide();
    } else {
      this.tercerosRelacionadosForm.markAllAsTouched();
    }
  }

  /**
  * compo doc
  * @method isValid
  * @description 
  * Verifica si un campo específico del formulario es válido.
  * @param field El nombre del campo que se desea validar.
  * @returns {boolean | null} Un valor booleano que indica si el campo es válido.
  */
  public esValido(form: FormGroup, campo: string): boolean | null {
    return this.validacionesService.isValid(form, campo);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
