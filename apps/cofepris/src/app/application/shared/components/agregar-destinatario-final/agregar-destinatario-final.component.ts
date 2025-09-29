import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  Catalogo,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  REGEX_CORREO_ELECTRONICO,
  REGEX_NOMBRE,
  REGEX_RFC_FISICA,
  REGEX_RFC_MORAL,
  REGEX_TELEFONO,
  TipoPersona,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE,PROCEDIMIENTOS_PARA_OCULTAR_EL_BOTON_AGREGAR } from '../../constantes/datos-solicitud.enum';
import {CatalogoSelectComponent} from '@libs/shared/data-access-user/src';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados.model';
import { Subject } from 'rxjs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { takeUntil } from 'rxjs/operators';

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
    TooltipModule,
    NotificacionesComponent,
  ],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.css',
})
export class AgregarDestinatarioFinalComponent
  implements OnDestroy, OnInit, OnChanges {
  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

    /**
   * Indica si se ha realizado la verificación de validación al intentar guardar.
   * Esta bandera se utiliza para controlar la visualización de mensajes de error o advertencia
   * cuando el usuario intenta guardar el formulario sin cumplir con los requisitos de validación.
   */
  chequeoValidacionAlGuardar =false;
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
   * Datos de catálogo de municipios.
   * @property {Catalogo[]} municipiosTempDatos
   */
  public municipiosTempDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de localidades.
   * @property {Catalogo[]} localidadesDatos
   */
  public localidadesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de localidades.
   * @property {Catalogo[]} localidadesTempDatos
   */
  public localidadesTempDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de colonias.
   * @property {Catalogo[]} coloniasDatos
   */
  public coloniasDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de colonias.
   * @property {Catalogo[]} coloniasTempDatos
   */
  public coloniasTempDatos: Catalogo[] = [];

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
  destinatarios: Destinatario[] = [];

  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

  /**
   * @property mostrarCamposNoContribuyente
   * @description Controla la visibilidad de los campos específicos para no contribuyentes.
   * @type {boolean}
   * @default false
   */
  public mostrarCamposNoContribuyente: boolean = true;

  /**
   * Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @property {EventEmitter<Destinatario[]>} updateDestinatarioFinalTabla
   **/

  @Output() updateDestinatarioFinalTablaDatos = new EventEmitter<
    Destinatario[]
  >();

  /**
   * Lista de elementos deshabilitados en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben estar deshabilitados en el formulario.
   */
  public elementosDeshabilitados: string[] = [];

  /**
   * Lista de elementos requeridos en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben ser obligatorios en el formulario.
   */
  public elementosNoRequeridos: string[] = [];

  /**
   * Arreglo que almacena los elementos requeridos.
   * @type {string[]}
   */
  public elementosRequeridos: string[] = [];

  /**
   * Controla si el desplegable de nacionalidad está deshabilitado.
   * @property {boolean} estaDeshabilitadoDesplegable
   */
  public estaDeshabilitadoDesplegable: boolean = true;

  /**
   * @property {Destinatario | undefined} datoSeleccionado
   * Dato seleccionado que se pasará al componente hijo `AgregarDestinatarioComponent`.
   */
  @Input() datoSeleccionado: Destinatario[] | undefined;

  /**
   * Lista de destinatarios seleccionados que se reciben como entrada
   * desde un componente padre.
   *
   * @input
   * @type {Destinatario[] | undefined}
   */
  @Input() datoSeleccionadorfc: Destinatario[] | undefined;

  /**
   * Array con los datos de los pedimentos.
   * Se utiliza para almacenar los pedimentos ingresados por el usuario.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * Elemento a eliminar de la tabla de pedimentos.
   */
  elementoParaEliminar!: number;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Crea el componente e inicializa el grupo de formulario.
   *
   * @param {FormBuilder} fb - Inyector de FormBuilder para crear formularios reactivos.
   * @param {Tramite260204Store} tramiteStore - Servicio que maneja las actualizaciones de estado para "Tramite260204".
   * @param {Tramite260204Query} tramiteQuery - Servicio para consultar el estado de "Tramite260204".
   * @param {Location} ubicaccion - Servicio de Angular para navegar hacia atrás en el historial.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener diferentes listas de datos.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    //constructor necesario para el servicio
  }

  /**
   * Hook de ciclo de vida de Angular que se llama cuando se detectan cambios en las propiedades de entrada.
   * Llama al método `mostrarCamposNoContribuyente()`.
   */
  ngOnChanges(currentValue: SimpleChanges): void {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
    if (currentValue['datoSeleccionado']) {
      this.datoSeleccionado = currentValue['datoSeleccionado'].currentValue;
      setTimeout(() => {
        if (this.datoSeleccionado?.[0]?.tipoPersona) {
          this.agregarDestinatarioFinal.enable();
        }
        this.agregarDestinatarioFinal?.patchValue({
          tipoPersona: this.datoSeleccionado?.[0]?.tipoPersona,
          rfc: this.datoSeleccionado?.[0]?.rfc,
          curp: this.datoSeleccionado?.[0]?.curp,
          nombres: this.datoSeleccionado?.[0]?.nombres,
          primerApellido: this.datoSeleccionado?.[0]?.primerApellido,
          segundoApellido: this.datoSeleccionado?.[0]?.segundoApellido,
          razonSocial: this.datoSeleccionado?.[0]?.razonSocial,
          pais: this.datoSeleccionado?.[0]?.pais,
          estado: this.datoSeleccionado?.[0]?.estadoLocalidad,
          municipio: this.datoSeleccionado?.[0]?.municipioAlcaldia,
          localidad: this.datoSeleccionado?.[0]?.localidad,
          codigoPostal: this.datoSeleccionado?.[0]?.codigoPostal,
          colonia: this.datoSeleccionado?.[0]?.colonia,
          calle: this.datoSeleccionado?.[0]?.calle,
          numeroExterior: this.datoSeleccionado?.[0]?.numeroExterior,
          numeroInterior: this.datoSeleccionado?.[0]?.numeroInterior,
          lada: this.datoSeleccionado?.[0]?.lada,
          telefono: this.datoSeleccionado?.[0]?.telefono,
          correoElectronico: this.datoSeleccionado?.[0]?.correoElectronico,
          coloniaOEquivalente: this.datoSeleccionado?.[0]?.coloniaEquivalente,
        });
      }, 500);
    }
  }

  /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
  guardarDestinatario(): void {
   if (this.chequeoValidacionAlGuardar) {
    if (this.agregarDestinatarioFinal.invalid) {
      Object.values(this.agregarDestinatarioFinal.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return;
    }
  }
    const VALOR_FORMULARIO = this.agregarDestinatarioFinal.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${VALOR_FORMULARIO.primerApellido
        } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = ''; // Valor por defecto si tipoPersona es otro
    }
    const NUEVO_DESTINATARIO: Destinatario = {
      nacionalidad: VALOR_FORMULARIO.nacionalidad,
      tipoPersona: VALOR_FORMULARIO.tipoPersona,
      nombreRazonSocial: nombreRazonSocial,
      rfc: VALOR_FORMULARIO.rfc,
      curp: '',
      telefono: `${VALOR_FORMULARIO.lada} ${VALOR_FORMULARIO.telefono}`.trim(),
      correoElectronico: VALOR_FORMULARIO.correoElectronico,
      calle: VALOR_FORMULARIO.calle,
      numeroExterior: VALOR_FORMULARIO.numeroExterior,
      numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
      pais: VALOR_FORMULARIO.pais,
      colonia: VALOR_FORMULARIO.colonia,
      municipioAlcaldia: VALOR_FORMULARIO.municipio,
      localidad: VALOR_FORMULARIO.localidad,
      entidadFederativa: '',
      estadoLocalidad: VALOR_FORMULARIO.estado,
      codigoPostal: VALOR_FORMULARIO.codigoPostal,
      coloniaEquivalente: VALOR_FORMULARIO.coloniaEquivalente,
      nombres: VALOR_FORMULARIO.nombres,
      primerApellido: VALOR_FORMULARIO.primerApellido,
      segundoApellido: VALOR_FORMULARIO.segundoApellido,
      razonSocial: VALOR_FORMULARIO.razonSocial,
      lada: VALOR_FORMULARIO.lada,
    };
    if (this.datoSeleccionado?.[0]?.id) {
      NUEVO_DESTINATARIO.id = this.datoSeleccionado[0].id;
    }
    this.destinatarios = [...this.destinatarios, NUEVO_DESTINATARIO];
    this.updateDestinatarioFinalTablaDatos.emit(this.destinatarios);
    this.agregarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }

  /**
   * Hook del ciclo de vida que se invoca cuando se inicializa el componente.
   * Llama al método `cargarDatos()`.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.validarElementos();
    this.crearAgregarFormularioAgregarDestinatarioFinal();
    this.changeNacionalidad();
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
        this.chequeoValidacionAlGuardar =
      PROCEDIMIENTOS_PARA_OCULTAR_EL_BOTON_AGREGAR.includes(this.idProcedimiento)
        ? true
        :false;
     this.forzarDeshabilitarPais()
     this.actualizarValidadoresCalleNumeroExterior();
  }

  /**
   * Actualiza los validadores de los campos 'calle' y 'numeroExterior' en el formulario 'agregarDestinatarioFinal'.
   * 
   * Si la propiedad `chequeoValidacionAlGuardar` es verdadera, se asigna el validador `Validators.required` a ambos campos,
   * obligando al usuario a proporcionar estos valores. Si es falsa, se eliminan los validadores requeridos.
   * 
   * Finalmente, se actualiza el estado y la validez de ambos controles para reflejar los cambios en los validadores.
   *
   * @private
   */
  private actualizarValidadoresCalleNumeroExterior(): void {
  const CALLE_CONTROL = this.agregarDestinatarioFinal.get('calle');
  const NUMERO_EXTERIOR_CONTROL = this.agregarDestinatarioFinal.get('numeroExterior');
  if (this.chequeoValidacionAlGuardar) {
    CALLE_CONTROL?.setValidators([Validators.required]);
    NUMERO_EXTERIOR_CONTROL?.setValidators([Validators.required]);
  } else {
    CALLE_CONTROL?.clearValidators();
    NUMERO_EXTERIOR_CONTROL?.clearValidators();
  }
  CALLE_CONTROL?.updateValueAndValidity();
  NUMERO_EXTERIOR_CONTROL?.updateValueAndValidity();
}
  /**
   * Recupera varias listas de datos del servicio `DatosSolicitudService` y
   * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
   * destrucción usando `takeUntil(this.unsubscribe$)`.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaMunicipios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.municipiosTempDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.localidadesTempDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasTempDatos = data;
      });
  }

  /**
   * @method crearAgregarFormularioAgregarDestinatarioFinal
   * @description
   * This method initializes the `FormGroup` for the "Agregar Destinatario Final" component.
   * It sets up the form controls with their default values, validation rules, and disabled states
   * based on the `elementosDeshabilitados` and `elementosNoRequeridos` arrays.
   * @returns {void} This method does not return any value.
   */
  crearAgregarFormularioAgregarDestinatarioFinal(): void {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', [Validators.required]],
      rfc: [
        this.obtenerValor('rfc'), [Validators.required],
      ],
      curp:['', [Validators.required]],
      nombres: [
        {
          value: this.elementosDeshabilitados.includes('nombres')
            ? 'EUROFOODZDEMEXICO'
            : this.obtenerValor('nombres'),
          disabled: this.elementosDeshabilitados.includes('nombres'),
        },
        [Validators.required, Validators.pattern(REGEX_NOMBRE)],
      ],
      denominacionRazon: [
        this.obtenerValor('razonSocial'),
        [Validators.required,
        Validators.pattern(REGEX_NOMBRE)],
      ],
      primerApellido: [
        {
          value: this.elementosDeshabilitados.includes('primerApellido')
            ? ''
            : this.obtenerValor('primerApellido'),
          disabled: this.elementosDeshabilitados.includes('primerApellido'),
        },
        [Validators.required, Validators.pattern(REGEX_NOMBRE)],
      ],
      segundoApellido: [
        {
          value: this.elementosDeshabilitados.includes('segundoApellido')
            ? 'PINAL'
            : this.obtenerValor('segundoApellido'),
          disabled: this.elementosDeshabilitados.includes('segundoApellido'),
        },
        [Validators.pattern(REGEX_NOMBRE)],
      ],
     pais: [
      {
        value: this.elementosDeshabilitados.includes('pais')
          ? '1'
          : this.obtenerValor('pais'),
        disabled: this.elementosDeshabilitados.includes('pais') || this.chequeoValidacionAlGuardar,
      },
      [Validators.required],
    ],
      estado: [this.obtenerValor('estadoLocalidad'), [Validators.required]],
      municipio: [
        this.obtenerValor('municipioAlcaldia'),
        [Validators.required],
      ],
      localidad: [this.obtenerValor('localidad'), [Validators.required]],
      codigoPostal: [this.obtenerValor('codigoPostal'), [Validators.required]],
      colonia: [
        this.obtenerValor('colonia'),
        this.idProcedimiento === 260911 
        ? [] 
        :!this.elementosNoRequeridos.includes('colonia')
          ? [Validators.required]
          : [],
      ], 
      calle: [
        this.obtenerValor('calle'),
        this.elementosRequeridos.includes('calle'), 
        this.chequeoValidacionAlGuardar ? [Validators.required] : [],
      ],
      numeroExterior: [
        this.obtenerValor('numeroExterior'),
        this.elementosRequeridos.includes('numeroExterior'),
        this.chequeoValidacionAlGuardar
          ? [Validators.required]
          : [],
      ],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada')],
      telefono: [
        {
          value: this.elementosDeshabilitados.includes('telefono')
            ? '3461235'
            : this.obtenerValor('telefono'),
          disabled: this.elementosDeshabilitados.includes('telefono'),
        },
        [Validators.pattern(REGEX_TELEFONO)],
      ],
      correoElectronico: [
        {
          value: this.elementosDeshabilitados.includes('correoElectronico')
            ? 'abc@njk.com'
            : this.obtenerValor('correoElectronico'),
          disabled: this.elementosDeshabilitados.includes('correoElectronico'),
        },
        [Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
    });
  }

  /**
   * @private
   * Fuerza la deshabilitación del campo 'pais' en el formulario de agregar destinatario final.
   * 
   * Si la variable `chequeoValidacionAlGuardar` es verdadera, deshabilita el control 'pais'
   * dentro del formulario reactivo `agregarDestinatarioFinal`.
   * 
   * Útil para evitar que el usuario modifique el país cuando ciertas condiciones de validación se cumplen al guardar.
   */
  private forzarDeshabilitarPais(): void {
  if (this.chequeoValidacionAlGuardar) {
    this.agregarDestinatarioFinal.get('pais')?.disable();
  }
}
  /**
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof Destinatario } field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} - Valor del campo especificado.
   */
  public obtenerValor(field: keyof Destinatario): string | number | undefined {
    return this.datoSeleccionado?.[0]?.[field as keyof Destinatario] ?? '';
  }


  /**
   * Validador personalizado para RFC según el tipo de persona (Física o Moral).
   *
   * @param TIPO_PERSONA El tipo de persona para el cual se debe validar el RFC.
   * @returns Una función validadora que verifica si el valor cumple con el formato RFC correspondiente.
   *          Si el valor es inválido, retorna un objeto con la clave de error específica.
   *          Si el tipo de persona es desconocido o el valor está vacío, retorna null.
   */
  static rfcFisicaValidator(TIPO_PERSONA: TipoPersona): (CONTROL: AbstractControl) => ValidationErrors | null {
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
   * Valida elementos según el `idProcedimiento` y establece
   * las listas de elementos no válidos y añadidos.
   * @returns {void} Lista de elementos no válidos.
   */
  validarElementos(): void {
    switch (this.idProcedimiento) {
      case 260207:
      case 260209:
      case 260208:
        this.elementosDeshabilitados = ['pais'];
        this.elementosNoRequeridos = ['colonia'];
        break;
      case 260201:
        this.elementosDeshabilitados = ['pais'];
        this.elementosNoRequeridos = ['localidad', 'colonia'];
        this.elementosRequeridos = ['calle', 'numeroExterior'];
        break;
      case 260219:
        this.elementosRequeridos = ['calle', 'numeroExterior'];
        this.elementosDeshabilitados = ['pais'];
        this.elementosNoRequeridos = ['colonia'];
        break;
      case 260213:
        this.elementosRequeridos = ['calle', 'numeroExterior'];
        this.elementosDeshabilitados = ['pais'];
        break;
      case 260214:
        this.elementosRequeridos = ['calle', 'numeroExterior'];
        this.elementosDeshabilitados = ['pais'];
        this.elementosNoRequeridos = ['colonia'];
        break;
         case 260911:
        this.elementosNoRequeridos = [];
        break;
      default:
        this.elementosDeshabilitados = [];
        this.elementosNoRequeridos = [];
        this.elementosRequeridos = [];
    }
  }

  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.agregarDestinatarioFinal.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Habilita o deshabilita los controles del formulario según el valor de 'tipoPersona'.
   *
   * Si 'tipoPersona' está vacío, deshabilita todos los controles excepto 'tipoPersona'.
   * Si 'tipoPersona' tiene un valor, habilita todos los controles y activa el desplegable.
   *
   * @returns {void} No retorna ningún valor.
   */
  changeNacionalidad(): void {
    const VALOR_FORMULARIO = this.agregarDestinatarioFinal.getRawValue();
    if (this.agregarDestinatarioFinal?.value?.tipoPersona === '') {
      Object.keys(this.agregarDestinatarioFinal.controls).forEach(
        (controlName) => {
          this.agregarDestinatarioFinal.get(controlName)?.disable();
          if (controlName === 'tipoPersona') {
            this.agregarDestinatarioFinal.get(controlName)?.enable();
          }
        }
      );
    } else {
      if (this.agregarDestinatarioFinal?.get('tipoPersona')?.value) {
        const RFC_CONTROL = this.agregarDestinatarioFinal.get('rfc');
        if (RFC_CONTROL) {
          RFC_CONTROL.setValidators([
              Validators.required,
            AgregarDestinatarioFinalComponent.rfcFisicaValidator(VALOR_FORMULARIO.tipoPersona)
          ]);
          RFC_CONTROL.markAsTouched();
          RFC_CONTROL.updateValueAndValidity();
        }
        Object.keys(this.agregarDestinatarioFinal.controls).forEach(
          (controlName) => {
            if (
              controlName !== 'nacionalidad' &&
              controlName !== 'tipoPersona'
            ) {
              this.agregarDestinatarioFinal.get(controlName)?.reset();
            }
          }
        );
      }
      Object.keys(this.agregarDestinatarioFinal.controls).forEach(
        (controlName) => {
          this.agregarDestinatarioFinal.get(controlName)?.enable();
          this.estaDeshabilitadoDesplegable = false;
          this.agregarDestinatarioFinal.patchValue({
            pais: 2
          });
        }
      );
    }
    this.forzarDeshabilitarPais();
  }

  /**
   * Carga la lista de estados cuando se selecciona un catálogo válido.
   *
   * @param evento Objeto de tipo `Catalogo` que contiene la información seleccionada.
   *
   * ### Descripción:
   * - Si el `id` del evento es mayor que 0, asigna la lista temporal de municipios (`municipiosTempDatos`)
   *   a la lista principal (`municipiosDatos`).
   */
  cargarEstados(evento: Catalogo): void {
    if (evento.id > 0) {
      this.municipiosDatos = this.municipiosTempDatos;
    }
  }

  /**
   * Carga la lista de municipios, localidades y colonias cuando se selecciona un catálogo válido.
   *
   * @param evento Objeto de tipo `Catalogo` que contiene la información seleccionada.
   *
   * ### Descripción:
   * - Si el `id` del evento es mayor que 0:
   *   - Asigna la lista temporal de localidades (`localidadesTempDatos`) a la lista principal (`localidadesDatos`).
   *   - Asigna la lista temporal de colonias (`coloniasTempDatos`) a la lista principal (`coloniasDatos`).
   */
  cargarMunicipios(evento: Catalogo): void {
    if (evento.id > 0) {
      this.localidadesDatos = this.localidadesTempDatos;
      this.coloniasDatos = this.coloniasTempDatos;
    }
  }

  /**
   * Maneja el evento de cambio en el campo de RFC.
   *
   * @param {Event} event - Evento que se dispara al cambiar el valor del campo de entrada (input).
   */
  onChangeRfc(event: Event): void {
    const RFC_VALUE = (event.target as HTMLInputElement).value;
    this.datoSeleccionadorfc?.forEach((dato) => {
      if (dato.rfc === RFC_VALUE) {
        const PEDIMENTO = {
          patente: 0,
          pedimento: 0,
          aduana: 0,
          idTipoPedimento: 0,
          descTipoPedimento: 'Por evaluar',
          numero: '',
          comprobanteValor: '',
          pedimentoValidado: false,
        };
        this.abrirModal(
          'La información proporcionada de la persona ya existe, favor de verificar.'
        );
        this.pedimentos.push(PEDIMENTO);
      }
    });
  }

  /**
   * Elimina un elemento de la tabla de pedimento, si se confirma la acción.
   * @param borrar Indica si se debe proceder con la eliminación.
   * @returns {void}
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   *
   * @param {number} i - El índice del elemento a eliminar.
   *
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
