import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {
  CAMPO_OBLIGATORIO_DESTINATARIO,
  PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE,
  STR_NACIONAL,
  TERCEROS_NACIONALIDAD_OPCIONES,
  TIPO_PERSONA_OPCIONES,
  TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE
} from '../../constants/datos-solicitud.enum';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, REGEX_RFC_FISICA, REGEX_RFC_MORAL, TipoPersona, TituloComponent } from '@ng-mf/data-access-user';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import {
  DestinoFinal,
  Proveedor
} from '../../models/terceros-relacionados.model';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { ES_CURP } from '../../constants/datos-del-tramilte.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * Componente para agregar un destinatario final (Destinatario) al formulario y almacenarlo.
 *
 * @example
 * <app-agregar-destinatario-final></app-agregar-destinatario-final>
 */
@Component({
  selector: 'app-agregar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent,
    TooltipModule
  ],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.scss',
})
export class AgregarDestinatarioFinalComponent
  implements OnDestroy, OnInit, OnChanges {
  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} destroyNotifier$
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Grupo de formulario reactivo para recopilar los datos del destinatario final.
   * @property {FormGroup} agregarDestinatarioFinal
   */
  agregarDestinatarioFinal!: FormGroup;

  /**
   * Datos de catálogo de países.
   * @property {Catalogo[]} paisesDatos
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de estados.
   * @property {Catalogo[]} estadosDatos
   */
  public estadosDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de municipios.
   * @property {Catalogo[]} municipiosDatos
   */
  public municipiosDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de localidades.
   * @property {Catalogo[]} localidadesDatos
   */
  public localidadesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de colonias.
   * @property {Catalogo[]} coloniasDatos
   */
  public coloniasDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de códigos postales.
   * @property {Catalogo[]} codigosPostalesDatos
   */
  public codigosPostalesDatos: Catalogo[] = [];

  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

  /**
   * Arreglo que almacena la lista de destinatarios.
   * @property {Destinatario[]} destinatarios
   */
  destinatarios: DestinoFinal[] = [];

  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados.
   * @property {boolean} esFormularioSoloLectura
   * @default false
   */
  @Input() esFormularioSoloLectura: boolean = false;

  /**
   * @property mostrarCamposNoContribuyente
   * @description Controla la visibilidad de los campos específicos para no contribuyentes.
   * @type {boolean}
   * @default false
   */
  public mostrarCamposNoContribuyente: boolean = false;

  /**
   * @property esCURP
   * @description Controla la visibilidad de los campos específicoS C.U.R.P.
   * @type {boolean}
   * @default false
   */
  public esCURP = false;

  /**
   * Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @property {EventEmitter<Destinatario[]>} updateDestinatarioFinalTabla
   **/

  @Output() updateDestinatarioFinalTablaDatos = new EventEmitter<
    DestinoFinal[]
  >();

  /**
   * Evento que se emite cuando el usuario desea cancelar una acción.
   * @property {EventEmitter<boolean>} cancelarEventListener
   */

  @Output() cancelarEventListener = new EventEmitter<boolean>();

   /**
   * Evento que se emite cuando el usuario desea cancelar una acción.
   * @property {EventEmitter<boolean>} cancelarEventListener
   */

  /**
   * Evento que se emite cuando el usuario desea cancelar una acción.
   * @property {EventEmitter<void>} cancelarEventListenerCancel
   */
  @Output() cancelarEventListenerCancel = new EventEmitter<void>();
  
  /**
   * Constante que almacena el valor de "Nacional" para su uso en el formulario.
   * @property {string} nacionalStr
   * @default STR_NACIONAL
   */

  public nacionalStr = STR_NACIONAL;

  /**
   * Opciones de radio para seleccionar el tipo de persona.
   */
  tipoPersonaRadioOpciones = TIPO_PERSONA_OPCIONES;

  /*
   * Opciones de nacionalidad para el formulario.
   */

  tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;

  /**
   * @description Opciones de tipo de persona para radio buttons, específicas para no contribuyentes.
   * @command Opciones utilizadas para determinar el tipo de persona en el formulario de proveedor.
   */
  tipoPersonaRadioOpcionesNoContribuyente =
    TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE;

  /**
   * Datos del formulario que pueden ser de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * Este input se utiliza para recibir la información necesaria desde el componente padre.
   *
   * @type {DestinoFinal | Proveedor | null | undefined}
   */
  @Input() formaDatos!: DestinoFinal | Proveedor | null | undefined;

  /**
   * @property campoObligatorio
   * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
   * @type {boolean}
   * @default true
   */
  public campoObligatorio = false;
  /**
   * @property estaDeshabilitadoDesplegable
   * @description Indica si el desplegable está deshabilitado.
   * @type {boolean}
   * @default true
   */
  estaDeshabilitadoDesplegable: boolean = true;

  /**
   * Crea el componente e inicializa el grupo de formulario.
   *
   * @param {FormBuilder} fb - Inyector de FormBuilder para crear formularios reactivos.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener diferentes listas de datos.
   * @param consultaioQuery - Servicio para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: { readonly: boolean }) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }
  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormaulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.crearFormaulario();
    if (this.esFormularioSoloLectura) {
      this.agregarDestinatarioFinal.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.agregarDestinatarioFinal.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }
  /**
   * Hook de ciclo de vida de Angular que se llama cuando se detectan cambios en las propiedades de entrada.
   * Llama al método `mostrarCamposNoContribuyente()`.
   */
  ngOnChanges(): void {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }

  /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
guardarDestinatario(): void {
  const FORM_VALUE = this.agregarDestinatarioFinal.getRawValue();

  if (this.agregarDestinatarioFinal.invalid) {
    this.agregarDestinatarioFinal.markAllAsTouched();
    return;
  }

  const EXISTING_INDEX = this.destinatarios.findIndex(
    d => d.id === FORM_VALUE.id 
  );

  const NUEVO_DESTINATARIO: DestinoFinal = {
    id: EXISTING_INDEX !== -1
      ? this.destinatarios[EXISTING_INDEX].id
      : this.destinatarios.length + 1,
    nombreRazonSocial: `${FORM_VALUE.nombres} ${FORM_VALUE.primerApellido} ${FORM_VALUE.segundoApellido || ''}`.trim(),
    rfc: FORM_VALUE.rfc,
    curp: FORM_VALUE.curp,
    telefono: `${FORM_VALUE.lada} ${FORM_VALUE.telefono}`.trim(),
    correoElectronico: FORM_VALUE.correoElectronico,
    calle: FORM_VALUE.calle,
    numeroExterior: FORM_VALUE.numeroExterior,
    numeroInterior: FORM_VALUE.numeroInterior || '',
    pais: FORM_VALUE.pais,
    colonia: FORM_VALUE.colonia,
    municipioAlcaldia: FORM_VALUE.municipio,
    localidad: FORM_VALUE.localidad,
    entidadFederativa: '',
    estadoLocalidad: FORM_VALUE.estado,
    codigoPostal: FORM_VALUE.codigoPostal,
    tipoPersona: FORM_VALUE.tipoPersona,
    estado: FORM_VALUE.estado,
    nacionalidad: FORM_VALUE.nacionalidad,
    nombres: FORM_VALUE.nombres,
    primerApellido: FORM_VALUE.primerApellido,
    segundoApellido: FORM_VALUE.segundoApellido,
  };

  if (EXISTING_INDEX !== -1) {
   this.destinatarios[EXISTING_INDEX] = NUEVO_DESTINATARIO;
  } else {
    this.destinatarios = [...this.destinatarios, NUEVO_DESTINATARIO];
  }
  
  this.updateDestinatarioFinalTablaDatos.emit(this.destinatarios);
 this.formaDatos = null;
  this.agregarDestinatarioFinal.reset();
}


  /**
   * Hook del ciclo de vida que se invoca cuando se inicializa el componente.
   * Llama al método `cargarDatos()`.
   */
  ngOnInit(): void {
    this.crearFormaulario();
    this.campoObligatorio = CAMPO_OBLIGATORIO_DESTINATARIO.includes(
      this.idProcedimiento
    );
    this.campoObligatorioChange();
    this.cargarDatos();
    this.esCURP = ES_CURP.includes(this.idProcedimiento);
  }

  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', Validators.required],
      rfc: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      curp: [
        '',
        [
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      nombres: ['', [Validators.required, Validators.maxLength(200)]],
      denominacionRazon: ['', [Validators.required, Validators.maxLength(254)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido: ['', Validators.maxLength(200)],
      pais: [{ value: '', disabled: true }, Validators.required],
      estado: ['', [Validators.required, Validators.maxLength(120)]],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
      colonia: ['', Validators.required],
      calle: ['', [Validators.required, Validators.maxLength(300)]],
      numeroExterior: ['', [Validators.required, Validators.maxLength(55)]],
      numeroInterior: ['', Validators.maxLength(55)],
      lada: ['', Validators.maxLength(5)],
      telefono: ['', Validators.maxLength(24)],
      correoElectronico: ['', [Validators.email, Validators.maxLength(320)]],
      nacionalidad: ['', Validators.required],
    });
    this.cargarDatos();
    this.agregarDestinatarioFinal.disable();
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable();
     this.agregarDestinatarioFinal.get('tipoPersona')?.disable();
    if (this.formaDatos) {
      this.agregarDestinatarioFinal.enable();
      this.agregarDestinatarioFinal.patchValue(this.formaDatos);
    }
  }

  /**
   * @method campoObligatorioChange
   * @description Cambia las validaciones de los campos del formulario según el valor de `campoObligatorio`.
   * Si `campoObligatorio` es verdadero, se eliminan las validaciones de la colonia y se agregan
   * validaciones requeridas para la calle y el número exterior. Si es falso, se realiza lo contrario.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  campoObligatorioChange(): void {
    const COLONIA = this.agregarDestinatarioFinal.get('colonia');
    const CALLE = this.agregarDestinatarioFinal.get('calle');
    const NUMEROEXTERIOR = this.agregarDestinatarioFinal.get('numeroExterior');
    if (this.campoObligatorio) {
      COLONIA?.clearValidators();
      CALLE?.setValidators([Validators.required]);
      NUMEROEXTERIOR?.setValidators([Validators.required]);
    } else {
      COLONIA?.setValidators([Validators.required]);
      CALLE?.clearValidators();
      NUMEROEXTERIOR?.clearValidators();
    }
    COLONIA?.updateValueAndValidity();
    CALLE?.updateValueAndValidity();
    NUMEROEXTERIOR?.updateValueAndValidity();
  }

  /**
   * Recupera varias listas de datos del servicio `DatosSolicitudService` y
   * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
   * destrucción usando `takeUntil(this.destroyNotifier$)`.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaMunicipios()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.municipiosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.localidadesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });
  }

  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
    this.agregarDestinatarioFinal.disable();
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable();
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.formaDatos = null;
    this.cancelarEventListenerCancel.emit();
    this.cancelarEventListener.emit(true);
  }

  /**
   * * Método que se ejecuta cuando se selecciona un país en el formulario.
   * * @param {string} event - El país seleccionado.
   * * @returns {void} No retorna ningún valor.
   */
  tipoPersonaCambioDeValor(event: string | number): void {
    this.agregarDestinatarioFinal.enable();

    this.agregarDestinatarioFinal.patchValue({
      tipoPersona: event,
    });
    this.changeTipoPersona();
  }

  /**
   * * Método que se ejecuta cuando se selecciona un país en el formulario.
   * * @param {string} event - El país seleccionado.
   * * @returns {void} No retorna ningún valor.
   */

  terecerosNacionalidadCambioDeValor(event: string | number): void {
    this.agregarDestinatarioFinal.patchValue({
      nacionalidad: event,
      tipoPersona: null,
      pais: null
    });
    this.changeNacionalidad();
  }
  /**
   * Validador personalizado para RFC según el tipo de persona (Física o Moral).
   *
   * @param TIPO_PERSONA El tipo de persona para el cual se debe validar el RFC.
   * @returns Una función validadora que verifica si el valor cumple con el formato RFC correspondiente.
   *          Si el valor es inválido, retorna un objeto con la clave de error específica.
   *          Si el tipo de persona es desconocido o el valor está vacío, retorna null.
   */
  static rfcFisicaValidator(
    TIPO_PERSONA: TipoPersona
  ): (CONTROL: AbstractControl) => ValidationErrors | null {
    return (CONTROL: AbstractControl): ValidationErrors | null => {
      const VALUE = CONTROL?.value;

      if (!VALUE) {
        return null;
      }

      let REGEX;
      let ERROR_KEY;

      if (TIPO_PERSONA === TipoPersona.FISICA) {
        REGEX = REGEX_RFC_FISICA;
        ERROR_KEY = { INVALID_RFC_FISICA: true };
      } else if (TIPO_PERSONA === TipoPersona.MORAL) {
        REGEX = REGEX_RFC_MORAL;
        ERROR_KEY = { INVALID_RFC_MORAL: true };
      } else {
        return null;
      }

      return REGEX.test(VALUE) ? null : ERROR_KEY;
    };
  }


  /**
 * Habilita o deshabilita los controles del formulario según el estado de los campos
 * 'nacionalidad' y 'tipoPersona'. Si ambos están vacíos o indefinidos, deshabilita
 * todos los controles excepto estos dos. Si alguno tiene valor, habilita todos los controles.
 *
 * @returns {void} Este método no retorna ningún valor.
 */
changeNacionalidad(): void {
  const NACIONALIDAD = this.agregarDestinatarioFinal.get('nacionalidad')?.value;
  const TIPO_PERSONA = this.agregarDestinatarioFinal.get('tipoPersona')?.value;
  const PAIS_CTRL = this.agregarDestinatarioFinal.get('pais');

  this.agregarDestinatarioFinal.get('tipoPersona')?.enable({ emitEvent: false });

  if (!NACIONALIDAD || !TIPO_PERSONA) {
    Object.keys(this.agregarDestinatarioFinal.controls).forEach(CTRL => {
      this.agregarDestinatarioFinal.get(CTRL)?.disable({ emitEvent: false });
    });
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable({ emitEvent: false });
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable({ emitEvent: false });
    this.estaDeshabilitadoDesplegable = true;
    return;
  }

  this.agregarDestinatarioFinal.enable({ emitEvent: false });

  const IS_MEXICAN_FISICA_MORAL =
    NACIONALIDAD === 'Mexicana' &&
    (TIPO_PERSONA === this.tipoPersona.FISICA || TIPO_PERSONA === this.tipoPersona.MORAL);

  if (IS_MEXICAN_FISICA_MORAL) {
    PAIS_CTRL?.setValue('MX', { emitEvent: false });
    PAIS_CTRL?.clearValidators();
    PAIS_CTRL?.disable({ emitEvent: false });
    this.estaDeshabilitadoDesplegable = true;
  } else {
    PAIS_CTRL?.setValidators([Validators.required]);
    PAIS_CTRL?.enable({ emitEvent: false });
    this.estaDeshabilitadoDesplegable = false;
  }

  PAIS_CTRL?.updateValueAndValidity({ emitEvent: false });
}


/**
 * Cambia el tipo de persona y actualiza los controles del formulario en consecuencia.
 *
 * @returns {void} Este método no retorna ningún valor.
 */
changeTipoPersona(): void {
  const NACIONALIDAD = this.agregarDestinatarioFinal.get('nacionalidad')?.value;
  const TIPO_PERSONA = this.agregarDestinatarioFinal.get('tipoPersona')?.value;

  const RFC_CTRL = this.agregarDestinatarioFinal.get('rfc');
  const CURP_CTRL = this.agregarDestinatarioFinal.get('curp');
  const PAIS_CTRL = this.agregarDestinatarioFinal.get('pais');
  const DENOMINACION_CTRL = this.agregarDestinatarioFinal.get('denominacionRazon');
  const MUNICIPIO_CTRL = this.agregarDestinatarioFinal.get('municipio');
  const LOCALIDAD_CTRL = this.agregarDestinatarioFinal.get('localidad');

  if (!TIPO_PERSONA || !NACIONALIDAD) {
    Object.keys(this.agregarDestinatarioFinal.controls).forEach(CTRL => {
      this.agregarDestinatarioFinal.get(CTRL)?.disable({ emitEvent: false });
    });
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable({ emitEvent: false });
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable({ emitEvent: false });
    PAIS_CTRL?.reset({ emitEvent: false });
    this.estaDeshabilitadoDesplegable = true;
    return;
  }

  this.agregarDestinatarioFinal.enable({ emitEvent: false });

  const IS_EXTRANJERO = NACIONALIDAD === 'Extranjero';

  if (RFC_CTRL) {
    if (IS_EXTRANJERO) {
      RFC_CTRL.clearValidators();
    } else {
      RFC_CTRL.setValidators([
        Validators.required,
        AgregarDestinatarioFinalComponent.rfcFisicaValidator(TIPO_PERSONA),
      ]);
    }
    RFC_CTRL.updateValueAndValidity({ emitEvent: false });
  }

  if (DENOMINACION_CTRL) {
    if (TIPO_PERSONA === this.tipoPersona.MORAL) {
      DENOMINACION_CTRL.setValidators([Validators.required]);
    } else {
      DENOMINACION_CTRL.clearValidators();
    }
    DENOMINACION_CTRL.updateValueAndValidity({ emitEvent: false });
  }

  if (IS_EXTRANJERO) {
    MUNICIPIO_CTRL?.clearValidators();
    LOCALIDAD_CTRL?.clearValidators();
  } else {
    MUNICIPIO_CTRL?.setValidators([Validators.required]);
    LOCALIDAD_CTRL?.setValidators([Validators.required]);
  }
  MUNICIPIO_CTRL?.updateValueAndValidity({ emitEvent: false });
  LOCALIDAD_CTRL?.updateValueAndValidity({ emitEvent: false });

  const IS_MEXICAN_FISICA_MORAL =
    NACIONALIDAD === 'Mexicana' &&
    (TIPO_PERSONA === this.tipoPersona.FISICA || TIPO_PERSONA === this.tipoPersona.MORAL);

  if (IS_MEXICAN_FISICA_MORAL) {
    PAIS_CTRL?.setValue('MX', { emitEvent: false });
    PAIS_CTRL?.clearValidators();
    PAIS_CTRL?.disable({ emitEvent: false });
    this.estaDeshabilitadoDesplegable = true;
  } else {
    PAIS_CTRL?.setValidators([Validators.required]);
    PAIS_CTRL?.enable({ emitEvent: false });
    this.estaDeshabilitadoDesplegable = false;
  }
  PAIS_CTRL?.updateValueAndValidity({ emitEvent: false });

  if (TIPO_PERSONA === this.tipoPersona.NO_CONTRIBUYENTE) {
    RFC_CTRL?.disable({ emitEvent: false });
  } else {
    CURP_CTRL?.disable({ emitEvent: false });
  }
}


  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
