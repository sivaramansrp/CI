import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TipoPersona, TituloComponent } from '@ng-mf/data-access-user';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { DestinoFinal, Proveedor } from '../../models/terceros-relacionados.model';

import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE, TERCEROS_NACIONALIDAD_OPCIONES, TIPO_PERSONA_OPCIONES } from '../../constants/datos-solicitud.enum';
import { Subject, takeUntil } from 'rxjs';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';

/**
 * @component AgregarProveedorComponent
 * @description Componente responsable de manejar el formulario para agregar proveedores.
 * Se encarga de obtener datos del catálogo (países), gestionar el formulario reactivo y
 * actualizar el estado del trámite con la información del proveedor capturado.
 */
@Component({
  selector: 'app-agregar-proveedor-custom',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './agregar-proveedor-custom.component.html',
  styleUrl: './agregar-proveedor-custom.component.css',
})
export class AgregarProveedorCustomComponent implements OnDestroy, OnInit, OnChanges {
 /**
   * Datos del formulario que pueden ser de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * Este input se utiliza para recibir la información necesaria desde el componente padre.
   *
   * @type {Proveedor | DestinoFinal | null | undefined}
   */
  @Input() formaDatos!: Proveedor | DestinoFinal| null | undefined;

  /**
    * @property tipoPersona
    * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
    * @type {TipoPersona}
    */
  public tipoPersona = TipoPersona;
  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

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
   * @property updateProveedorTablaDatos
   * @description Evento que emite una lista actualizada de objetos `Proveedor` hacia el componente padre.
   * Se utiliza para sincronizar los datos de la tabla o disparar acciones relacionadas.
   * @type {EventEmitter<Proveedor[]>}
   */
  @Output() updateProveedorTablaDatos = new EventEmitter<Proveedor[]>();

 
  /**
   * Opciones de radio para seleccionar el tipo de persona.
   */
  tipoPersonaRadioOpciones = TIPO_PERSONA_OPCIONES;

  /**
 * @property mostrarCamposNoContribuyente
 * @description Controla la visibilidad de los campos específicos para no contribuyentes.
 * @type {boolean}
 * @default false
 */
  public mostrarCamposNoContribuyente: boolean = false;

  /*
   * Opciones de nacionalidad para el formulario.
   */

  tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;


  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

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
   * @constructor
   * Inicializa el formulario y los servicios necesarios para el componente.
   *
   * @param fb - FormBuilder para construir el formulario reactivo.
   * @param datosSolicitudService - Servicio para obtener datos del backend.
   * @param tramiteStore - Store que administra el estado del trámite actual.
   * @param tramiteQuery - Servicio para consultar el estado del trámite.
   * @param ubicaccion - Servicio de Angular para navegación de retroceso.
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location // eslint-disable-next-line no-empty-function
  ) {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
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
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
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
          Validators.maxLength(150),
        ],
      ],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      nacionalidad:[''],
      rfc:[''],
      municipio:[''],
      localidad:[''],
      correoElectronico: ['', [Validators.required, Validators.email]],
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
    this.cargarDatos();
    if(this.formaDatos) {
      this.agregarProveedorForm.patchValue(this.formaDatos);
    }
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
   */
  cargarDatos(): void {
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
        this.municipiosDatos = data;
      });
      this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.localidadesDatos = data;
      });
      this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });
    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });
  }

  /**
   * @method guardarProveedor
   * @description Toma los datos del formulario, crea un objeto `Proveedor`, lo agrega al arreglo
   * local, actualiza el store del trámite y luego limpia el formulario y regresa a la vista anterior.
   */
  guardarProveedor(): void {
    const NUEVO_PROVEEDOR: Proveedor = {
      nombreRazonSocial: `${this.agregarProveedorForm.value.nombres} ${this.agregarProveedorForm.value.primerApellido
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
 * * Método que se ejecuta cuando se selecciona un país en el formulario.
 * * @param {string} event - El país seleccionado.
 * * @returns {void} No retorna ningún valor.
 */

  terecerosNacionalidadCambioDeValor(event: string | number): void {
    this.agregarProveedorForm.patchValue({
      nacionalidad: event,
    });
  }


  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}