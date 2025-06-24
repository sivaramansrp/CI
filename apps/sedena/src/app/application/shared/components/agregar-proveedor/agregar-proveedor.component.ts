import {
  AGREGARPROVEEDORFORM,
  CAMPO_OBLIGATORIO_PROVEEDOR,
  TIPO_PERSONA_OPCIONES,
} from '../../constants/datos-solicitud.enum';
import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  DestinoFinal,
  Proveedor,
} from '../../models/terceros-relacionados.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { TipoPersona } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs';

/**
 * @component AgregarProveedorComponent
 * @description Componente responsable de manejar el formulario para agregar proveedores.
 * Se encarga de obtener datos del catálogo (países), gestionar el formulario reactivo y
 * actualizar el estado del trámite con la información del proveedor capturado.
 */
@Component({
  selector: 'app-agregar-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.scss',
})
export class AgregarProveedorComponent implements OnDestroy, OnInit {
  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;
  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @property {Proveedor[]} proveedores
   * Arreglo de proveedores capturados en el formulario.
   */
  proveedores: Proveedor[] = [];

  /**
   * @property {FormGroup} agregarProveedorForm
   * Formulario reactivo utilizado para capturar los datos del proveedor.
   */
  agregarProveedorForm!: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * Lista de países obtenida del servicio de datos.
   */
  public paisesDatos: Catalogo[] = [];

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
   * @property updateProveedorTablaDatos
   * @description Evento que emite una lista actualizada de objetos `Proveedor` hacia el componente padre.
   * Se utiliza para sincronizar los datos de la tabla o disparar acciones relacionadas.
   * @type {EventEmitter<Proveedor[]>}
   */
  @Output() updateProveedorTablaDatos = new EventEmitter<Proveedor[]>();

  /**
   * Evento que se emite cuando el usuario desea cancelar una acción.
   * @property {EventEmitter<boolean>} cancelarEventListener
   */
  @Output() cancelarEventListener = new EventEmitter<boolean>();

  /**
   * Datos del formulario que pueden ser de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * Este input se utiliza para recibir la información necesaria desde el componente padre.
   *
   * @type {DestinoFinal | Proveedor | null | undefined}
   */
  @Input() formaDatos!: DestinoFinal | Proveedor | null | undefined;

  /**
   * Opciones de radio para seleccionar el tipo de persona.
   */
  tipoPersonaRadioOpciones = TIPO_PERSONA_OPCIONES;

  /**
   * @property campoObligatorio
   * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
   * @type {boolean}
   * @default true
   */
  public campoObligatorio = false;

  /**
   * @constructor
   * Inicializa el formulario y los servicios necesarios para el componente.
   *
   * @param fb - FormBuilder para construir el formulario reactivo.
   * @param datosSolicitudService - Servicio para obtener datos del backend.
   * @param ubicaccion - Servicio de ubicación para navegar entre vistas.
   * @param consultaioQuery - Servicio para consultar el estado del trámite.
   *
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,
    private consultaioQuery: ConsultaioQuery
  ) {
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
      this.agregarProveedorForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.agregarProveedorForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }
  /**
   * Crea el formulario reactivo `agregarProveedorForm` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.agregarProveedorForm = this.fb.group({
      tipoPersona: ['', Validators.required],
      denominacionRazon: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(254),
        ],
      ],
      nombres: ['', [Validators.required, Validators.maxLength(200)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido: ['', Validators.maxLength(200)],
      pais: ['', Validators.required],
      estado: ['', [Validators.required, Validators.maxLength(120)]],
      codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
      colonia: ['', Validators.required],
      calle: ['', [Validators.required, Validators.maxLength(300)]],
      numeroExterior: ['', [Validators.required, Validators.maxLength(55)]],
      numeroInterior: ['', Validators.maxLength(55)],
      lada: ['', Validators.maxLength(5)],
      telefono: ['', Validators.maxLength(24)],
      correoElectronico: ['', [Validators.email, Validators.maxLength(320)]],
    });
    this.agregarProveedorForm.disable();
    this.agregarProveedorForm.get('tipoPersona')?.enable();
  }
  /**
   * @method ngOnInit
   * @description Hook de inicialización del componente. Llama a `cargarDatos()` para obtener catálogos.
   */
  ngOnInit(): void {
    this.crearFormaulario();
    this.campoObligatorio = CAMPO_OBLIGATORIO_PROVEEDOR.includes(
      this.idProcedimiento
    );
    this.campoObligatorioChange();
    if (AGREGARPROVEEDORFORM.includes(this.idProcedimiento)) {
      this.agregarProveedorForm.enable();
    } else {
      this.agregarProveedorForm.disable();
    }
    this.cargarDatos();
    if (this.formaDatos) {
      this.agregarProveedorForm.patchValue(this.formaDatos);
    }
  }

  /**
   * @method campoObligatorioChange
   * @description Método que actualiza las validaciones de los campos del formulario
   * dependiendo de si son obligatorios o no, basado en la propiedad `campoObligatorio`.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  campoObligatorioChange(): void {
    const NOMBRES = this.agregarProveedorForm.get('nombres');
    const PRIMERAPELLIDO = this.agregarProveedorForm.get('primerApellido');
    const ESTADO = this.agregarProveedorForm.get('estado');
    const CODIGOPOSTAL = this.agregarProveedorForm.get('codigoPostal');
    const CALLE = this.agregarProveedorForm.get('calle');
    const NUMEROEXTERIOR = this.agregarProveedorForm.get('numeroExterior');
    if (this.campoObligatorio) {
      NOMBRES?.setValidators([Validators.required]);
      PRIMERAPELLIDO?.setValidators([Validators.required]);
      ESTADO?.setValidators([Validators.required]);
      CODIGOPOSTAL?.setValidators([Validators.required]);
      CALLE?.setValidators([Validators.required]);
      NUMEROEXTERIOR?.setValidators([Validators.required]);
    } else {
      NOMBRES?.clearValidators();
      PRIMERAPELLIDO?.clearValidators();
      ESTADO?.clearValidators();
      CODIGOPOSTAL?.clearValidators();
      CALLE?.clearValidators();
      NUMEROEXTERIOR?.clearValidators();
    }
    NOMBRES?.updateValueAndValidity();
    PRIMERAPELLIDO?.updateValueAndValidity();
    ESTADO?.updateValueAndValidity();
    CODIGOPOSTAL?.updateValueAndValidity();
    CALLE?.updateValueAndValidity();
    NUMEROEXTERIOR?.updateValueAndValidity();
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]) => {
        this.paisesDatos = data;
      });
  }

  /**
   * @method guardarProveedor
   * @description Toma los datos del formulario, crea un objeto `Proveedor`, lo agrega al arreglo
   * local, actualiza el store del trámite y luego limpia el formulario y regresa a la vista anterior.
   */
  guardarProveedor(): void {
    if (this.agregarProveedorForm.invalid) {
      this.agregarProveedorForm.markAllAsTouched();
      return;
    }
    const NUEVO_PROVEEDOR: Proveedor = {
      nombreRazonSocial: `${this.agregarProveedorForm.value.nombres} ${
        this.agregarProveedorForm.value.primerApellido
      } ${this.agregarProveedorForm.value.segundoApellido || ''}`.trim(),
      rfc: '',
      curp: '',
      telefono: this.agregarProveedorForm.value.telefono || '',
      correoElectronico:
        this.agregarProveedorForm.value.correoElectronico || '',
      calle: this.agregarProveedorForm.value.calle || '',
      numeroExterior: this.agregarProveedorForm.value.numeroExterior || '',
      numeroInterior: this.agregarProveedorForm.value.numeroInterior || '',
      pais: this.agregarProveedorForm.value.pais || '',
      colonia: this.agregarProveedorForm.value.colonia || '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: this.agregarProveedorForm.value.estado || '',
      estadoLocalidad: '',
      codigoPostal: this.agregarProveedorForm.value.codigoPostal || '',
    };

    this.proveedores.push(NUEVO_PROVEEDOR);
    this.updateProveedorTablaDatos.emit(this.proveedores);
    this.agregarProveedorForm.reset();
    this.ubicaccion.back();
  }
  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarProveedorForm.reset();
    this.agregarProveedorForm.disable();
    this.agregarProveedorForm.get('tipoPersona')?.enable();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.cancelarEventListener.emit(true);
  }
  /**
   * * Método que se ejecuta cuando se selecciona un país en el formulario.
   * * @param {string} event - El país seleccionado.
   * * @returns {void} No retorna ningún valor.
   */
  tipoPersonaCambioDeValor(event: string | number): void {
    this.agregarProveedorForm.enable();
    this.agregarProveedorForm.patchValue({
      tipoPersona: event,
    });
  }

  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
