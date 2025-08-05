/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { CommonModule } from '@angular/common';

import { AlertComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
} from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TableComponent } from '@ng-mf/data-access-user';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TercerosService } from '../../services/terceros.service';

import { 
  NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO,
  PERSONA_OPCIONES_DE_BOTON_DE_RADIO
} from '../../constantes/permiso-maquila.enum';
import { ModalComponent } from '../modal/modal.component';

import {
  DatosSeleccionados,
  TablaDatos,
} from '../../models/permiso-maquila.models';
import { Subject, map, takeUntil } from 'rxjs';
import { Terceros260211Query } from '../../../../estados/queries/terceros260211.query';
import { Terceros260211State } from '../../../../estados/tramites/terceros260211.store';
import { Tramite260212Store } from '../../../../estados/tramites/tramite260212.store';

/**
 * Texto de alerta para los terceros relacionados.
 * Indica que las tablas con asterisco son obligatorias.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  `
  <div class="text-center">
    Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.
  </div>
  `;

/**
 * Componente que gestiona los terceros relacionados.
 * Utiliza formularios reactivos y componentes personalizados para mostrar datos.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  templateUrl: './terceros-relacionados.component.html',
  styleUrls: ['./terceros-relacionados.component.scss'],
  imports: [
    CommonModule,
    TituloComponent,
    TableComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
})

/**
 * Componente que gestiona los terceros relacionados.
 * Utiliza formularios reactivos y componentes personalizados para mostrar datos.
 */
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   * Inicialmente establecido en `true`.
   *
   * @description Cuando es verdadero, el usuario no puede editar los campos del formulario.
   */
 public esFormularioSoloLectura: boolean = false;

  /**
   * Indicador de visibilidad para la sección de la tabla.
   * Inicialmente visible (`true`).
   *
   * @description Controla si se muestra o no la sección de la tabla.
   */
  showTableDiv = true;

  /**
   * Indicador de visibilidad para la sección del formulario de fabricante.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestra o no el formulario para agregar un fabricante.
   */
  showFabricante = false;

  /**
   * Indicador de visibilidad para la sección del formulario de destinatario.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestra o no el formulario para agregar un destinatario.
   */
  showDestinatario = false;

  /**
   * Indicador de visibilidad para la sección del formulario de proveedor.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestra o no el formulario para agregar un proveedor.
   */
  showProveedor = false;

  /**
   * Indicador de visibilidad para la sección del formulario de facturador.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestra o no el formulario para agregar un facturador.
   */
  showFacturador = false;

  /**
   * Indicador de visibilidad para los botones del formulario de fabricante.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestran o no los botones para el formulario de fabricante.
   */
  showFabricanteButtons = false;

  /**
   * Indicador de visibilidad para los botones del formulario de destinatario.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestran o no los botones para el formulario de destinatario.
   */
  showDestinatarioButtons = false;

  /**
   * Indicador de visibilidad para los botones del formulario de proveedor.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestran o no los botones para el formulario de proveedor.
   */
  showProveedorButtons = false;

  /**
   * Indicador de visibilidad para los botones del formulario de facturador.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestran o no los botones para el formulario de facturador.
   */
  showFacturadorButtons = false;

  /**
   * Inicializa las opciones de botón de radio para la nacionalidad.
   * Estas opciones se utilizan para presentar al usuario diferentes alternativas de nacionalidad.
   */
  nacionalidadOpcionDeBotonDeRadio = NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO;
  /**
   * Inicializa las opciones de botón de radio para el tipo de persona.
   * Estas opciones se utilizan para distinguir entre diferentes tipos de personas (por ejemplo, física o moral).
   */
  personaOpcionDeBotonDeRadio = PERSONA_OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Selección del tipo de persona.
   */
  tipoPersonaSelection!: string;

  /**
   * Datos generales para los dropdowns.
   * Inicialmente vacío, se llenará con datos según sea necesario.
   *
   * @description Este arreglo almacena los datos generales para los selectores.
   */
  dropdownData: Catalogo[] = [];

  /**
   * Datos para el dropdown de países.
   * Utiliza los datos predefinidos en `PAIS_SELECT_DATA`.
   *
   * @description Este arreglo almacena las opciones para el selector de países.
   */
  paisDropdownData: Catalogo[] = [];

  /**
   * Datos para el dropdown de localidades.
   * Utiliza los datos predefinidos en `LOCALIDAD_SELECT_DATA`.
   *
   * @description Este arreglo almacena las opciones para el selector de localidades.
   */
  localidadDropdownData: Catalogo[] = [];

  /**
   * Datos para el dropdown de municipios.
   * Utiliza los datos predefinidos en `MUNICIPIO_SELECT_DATA`.
   *
   * @description Este arreglo almacena las opciones para el selector de municipios.
   */
  municipioDropdownData: Catalogo[] = [];

  /**
   * Datos para el dropdown de códigos postales.
   * Utiliza los datos predefinidos en `CODIGOPOSTAL_SELECT_DATA`.
   *
   * @description Este arreglo almacena las opciones para el selector de códigos postales.
   */
  codigoPostalDropdownData: Catalogo[] = [];

  /**
   * Datos para el dropdown de colonias.
   * Utiliza los datos predefinidos en `COLONIA_SELECT_DATA`.
   *
   * @description Este arreglo almacena las opciones para el selector de colonias.
   */
  coloniaDropdownData: Catalogo[] = [];

  /**
   * Formulario reactivo para agregar un fabricante.
   * Este formulario contiene los campos necesarios para ingresar los datos de un fabricante.
   *
   * @description Se utiliza para validar y procesar los datos del fabricante.
   */
  agregarFabricanteFormGroup!: FormGroup;

  /**
   * Formulario reactivo para agregar un destinatario.
   * Este formulario contiene los campos necesarios para ingresar los datos de un destinatario.
   *
   * @description Se utiliza para validar y procesar los datos del destinatario.
   */
  agregarDestinatarioFormGroup!: FormGroup;

  /**
   * Formulario reactivo para agregar un proveedor.
   * Este formulario contiene los campos necesarios para ingresar los datos de un proveedor.
   *
   * @description Se utiliza para validar y procesar los datos del proveedor.
   */
  agregarProveedorFormGroup!: FormGroup;

  /**
   * Formulario reactivo para agregar un facturador.
   * Este formulario contiene los campos necesarios para ingresar los datos de un facturador.
   *
   * @description Se utiliza para validar y procesar los datos del facturador.
   */
  agregarFacturadorFormGroup!: FormGroup;

  /** Subject para destruir el componente */
    private destroy$ = new Subject<void>();

    /**
   * @property desactivarCampos
   * @type {boolean}
   * @public
   * @description
   * Indica si los campos del formulario deben estar desactivados (no editables).
   * Se utiliza para controlar la habilitación o deshabilitación de los campos según la lógica del componente.
   * Por defecto, los campos están desactivados (`true`).
   *
   * @example
   * this.desactivarCampos = false; // Habilita los campos
   * this.desactivarCampos = true;  // Deshabilita los campos
   */
  public desactivarCampos: boolean = true;
   /**
     * Estado de la solicitud obtenido desde el store.
     */
    public solicitudStates!: Terceros260211State;
    /**
     * Notificador para destruir observables y evitar memory leaks.
     * @private
     * @type {Subject<void>}
     */
    private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Constructor del componente.
   * Inyecta el FormBuilder, el store del trámite y el servicio de terceros.
   *
   * @param fb Constructor de formularios para crear los formularios reactivos.
   * @param tramite260212Store Store del trámite 260212.
   * @param tercerosService Servicio que proporciona datos de terceros.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260212Store: Tramite260212Store,
    private tercerosService: TercerosService,
    private consultaioQuery: ConsultaioQuery,
         private terceros260211Query: Terceros260211Query,
  ) {}

  /**
   * Ciclo de vida que se ejecuta al iniciar el componente.
   * Obtiene los datos para los selectores desde el servicio y inicializa los formularios.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;

        })
      )
      .subscribe();
    
    this.tercerosService.getEncabezadoDeTabla().subscribe((data: unknown) => {
      if (typeof data === 'object' && data !== null && 'columns' in data) {
        this.tablaEncabezadoData = (data as { columns: string[] }).columns;
      }
    });

    /**
     * Obtiene los datos para los selectores desde el servicio de terceros.
     * Actualiza la propiedad `dropdownData` con los datos obtenidos.
     */
    this.tercerosService.getData().subscribe((data) => {
      this.dropdownData = data;
    });

    /**
     * Carga los datos específicos para los dropdowns de ubicación geográfica.
     */

    // Carga los datos de país para el dropdown.
    this.tercerosService.getPaisData().subscribe((data) => {
      /**
       * Asigna los datos de país a la variable paisDropdownData.
       */
      this.paisDropdownData = data;
    });

    // Carga los datos de municipio para el dropdown.
    this.tercerosService.getMunicipioData().subscribe((data) => {
      /**
       * Asigna los datos de municipio a la variable municipioDropdownData.
       */
      this.municipioDropdownData = data;
    });

    // Carga los datos de código postal para el dropdown.
    this.tercerosService.getCodigoPostalData().subscribe((data) => {
      /**
       * Asigna los datos de código postal a la variable codigoPostalDropdownData.
       */
      this.codigoPostalDropdownData = data;
    });

    // Carga los datos de colonia para el dropdown.
    this.tercerosService.getColoniaData().subscribe((data) => {
      /**
       * Asigna los datos de colonia a la variable coloniaDropdownData.
       */
      this.coloniaDropdownData = data;
    });

    // Carga los datos de localidad para el dropdown.
    this.tercerosService.getLocalidadData().subscribe((data) => {
      /**
       * Asigna los datos de localidad a la variable localidadDropdownData.
       */
      this.localidadDropdownData = data;
    });

    /**
     * Inicializa los formularios reactivos para agregar terceros.
     */
     this.terceros260211Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudStates = seccionState;         
        })
      )
      .subscribe();
    this.initializeAgregarFabricanteFormGroup();
    this.initializeAgregarDestinatarioFormGroup();
    this.initializeAgregarProveedorFormGroup();
    this.initializeAgregarFacturadorFormGroup();
  }

  /**
   * Inicializa el formulario para agregar un fabricante.
   * Configura los campos del formulario con validaciones y comportamientos específicos.
   */
  initializeAgregarFabricanteFormGroup(): void {
    /**
     * Crea el formulario reactivos para agregar un fabricante.
     * Cada campo tiene sus propias validaciones.
     */
    this.agregarFabricanteFormGroup = this.fb.group({
      /**
       * Nacionalidad del tercero.
       */
      tercerosNacionalidad: new FormControl(this.solicitudStates.tercerosNacionalidad, [Validators.required]),
      /**
       * Tipo de persona (física o moral).
       */
      tipoPersona: new FormControl(this.solicitudStates.tipoPersona, [Validators.required]),
      /**
       * RFC del tercero.
       * Requiere validación adicional mediante `rfcValidator`.
       */
      rfc: new FormControl({value: this.solicitudStates.rfc, disabled: true}, [Validators.required, this.rfcValidator]),
      /**
       * CURP del tercero.
       * Requiere validación adicional mediante `curpValidator`.
       */
      curp: new FormControl({value: this.solicitudStates.curp, disabled: true}, [Validators.required, this.curpValidator]),
      /**
       * Nombre del tercero.
       */
      nombre: new FormControl({value: this.solicitudStates.nombre, disabled: true}, [Validators.required]),
      /**
       *Primer Apellido del tercero.
       */
      primerApellido: new FormControl({value: this.solicitudStates.primerApellido, disabled: true}, [Validators.required]),
      /**
       * Segundo Apellido del tercero.
       */
      segundoApellido: new FormControl({value:  this.solicitudStates.segundoApellido, disabled: true}, [Validators.required]),
      /**
       * Denominación o razón social del tercero.
       */
      denominacionRazonSocial: new FormControl({value:  this.solicitudStates.denominacionRazonSocial, disabled: true}, [Validators.required]),
      /**
       * País del tercero.
       * Requiere validación adicional mediante `requiredPaisValidator`.
       */
      pais: new FormControl({value:this.solicitudStates.pais, disabled: true}, [
        Validators.required,
        this.requiredPaisValidator,
      ]),

      extranjeroEstado: new FormControl({value:  this.solicitudStates.extranjeroEstado, disabled: true}, [Validators.required]),
      /**
       * Estado o localidad del tercero.
       */
      estadoLocalidad: new FormControl({value:  this.solicitudStates.estadoLocalidad, disabled: true}, [Validators.required]),
      /**
       * Municipio o alcaldía del tercero.
       */
      municipioAlcaldia: new FormControl({value:  this.solicitudStates.municipioAlcaldia, disabled: true}, [Validators.required]),
      /**
       * Localidad del tercero.
       */
      localidad: new FormControl({value:  this.solicitudStates.localidad, disabled: true}),
      /**
       * Entidad federativa del tercero.
       */
      entidadFederativa: new FormControl({value:  this.solicitudStates.entidadFederativa, disabled: true}, [Validators.required]),
      /**
       * Código postal del tercero.
       */
      codigoPostaloEquivalente: new FormControl({value:  this.solicitudStates.codigoPostaloEquivalente, disabled: true}, [Validators.required]),
      /**
       * Colonia del tercero.
       */
      colonia: new FormControl({value: this.solicitudStates.colonia, disabled: true}),
      /**
       * Colonia equivalente del tercero.
       */
      coloniaoEquivalente: new FormControl({value: this.solicitudStates.coloniaoEquivalente, disabled: true}),
      /**
       * Calle del tercero.
       */
      calle: new FormControl({value:  this.solicitudStates.calle, disabled: true}, [Validators.required]),
      /**
       * Número exterior del tercero.
       */
      numeroExterior: new FormControl({value:  this.solicitudStates.numeroExterior, disabled: true}, [Validators.required]),
      /**
       * Número interior del tercero.
       */
      numeroInterior: new FormControl({value:  this.solicitudStates.numeroInterior, disabled: true}),
      /**
       * Lada del tercero.
       */
      lada: new FormControl({value:  this.solicitudStates.lada, disabled: true}),
      /**
       * Teléfono del tercero.
       * Requiere validación adicional mediante `telefonoValidator`.
       */
      telefono: new FormControl({value:  this.solicitudStates.telefono, disabled: true}, [this.telefonoValidator]),
      /**
       * Correo electrónico del tercero.
       */
      correoElectronico: new FormControl({value:  this.solicitudStates.correoElectronico, disabled: true}),
    });
  }

  /**
   * Inicializa el formulario para agregar un destinatario.
   * Configura los campos del formulario con validaciones y comportamientos específicos.
   */
  initializeAgregarDestinatarioFormGroup(): void {
    /**
     * Crea el formulario reactivos para agregar un destinatario.
     * Cada campo tiene sus propias validaciones.
     */
    this.agregarDestinatarioFormGroup = this.fb.group({
      /**
       * Tipo de persona (física o moral).
       */
      tipoPersona: new FormControl( this.solicitudStates.tipoPersona, [Validators.required]),
      /**
       * RFC del destinatario.
       */
      rfc: new FormControl({value:  this.solicitudStates.rfc, disabled: true}, [Validators.required]),
      /**
       * CURP del destinatario.
       */
      curp: new FormControl( this.solicitudStates.curp, [Validators.required]),
      /**
       * Denominación o razón social del destinatario.
       */
      denominacionRazonSocial: new FormControl({value:  this.solicitudStates.denominacionRazonSocial, disabled: true}, [Validators.required]),
       /**
       * Nombre del tercero.
       */
      nombre: new FormControl({value:  this.solicitudStates.nombre, disabled: true}, [Validators.required]),
      /**
       *Primer Apellido del tercero.
       */
      primerApellido: new FormControl({value:  this.solicitudStates.primerApellido, disabled: true}, [Validators.required]),
      /**
       * Segundo Apellido del tercero.
       */
      segundoApellido: new FormControl({value: this.solicitudStates.segundoApellido, disabled: true}, [Validators.required]),
      /**
       * País del destinatario.
       */
      pais: new FormControl({value: this.solicitudStates.pais, disabled: true}, [Validators.required]),
      /**
       * Estado o localidad del destinatario.
       */
      estadoLocalidad: new FormControl({value: this.solicitudStates.estadoLocalidad, disabled: true}, [Validators.required]),
      /**
       * Municipio o alcaldía del destinatario.
       */
      municipioAlcaldia: new FormControl({value: this.solicitudStates.municipioAlcaldia, disabled: true}, [Validators.required]),
      /**
       * Localidad del destinatario.
       */
      localidad: new FormControl({value: this.solicitudStates.localidad, disabled: true}),
      /**
       * Entidad federativa del destinatario.
       */
      entidadFederativa: new FormControl({value: this.solicitudStates.entidadFederativa, disabled: true}, [Validators.required]),
      /**
       * Código postal del destinatario.
       */
      codigoPostaloEquivalente: new FormControl({value: this.solicitudStates.codigoPostaloEquivalente, disabled: true}, [Validators.required]),
      /**
       * Colonia del destinatario.
       */
      colonia: new FormControl({value: this.solicitudStates.colonia, disabled: true}),
      /**
       * Colonia equivalente del destinatario.
       */
      coloniaoEquivalente: new FormControl({value:this.solicitudStates.coloniaoEquivalente, disabled: true}),
      /**
       * Calle del destinatario.
       */
      calle: new FormControl({value: this.solicitudStates.calle, disabled: true}, [Validators.required]),
      /**
       * Número exterior del destinatario.
       */
      numeroExterior: new FormControl({value: this.solicitudStates.numeroExterior, disabled: true}, [Validators.required]),
      /**
       * Número interior del destinatario.
       */
      numeroInterior: new FormControl({value: this.solicitudStates.numeroExterior, disabled: true}),
      /**
       * Lada del destinatario.
       */
      lada: new FormControl({value: this.solicitudStates.lada, disabled: true}),
      /**
       * Teléfono del destinatario.
       */
      telefono: new FormControl({value: this.solicitudStates.telefono, disabled: true}),
      /**
       * Correo electrónico del destinatario.
       */
      correoElectronico: new FormControl({value: this.solicitudStates.correoElectronico, disabled: true}),
    });
  }

  /**
   * Inicializa el formulario para agregar un proveedor.
   * Configura los campos del formulario con validaciones y comportamientos específicos.
   */
  initializeAgregarProveedorFormGroup(): void {
    /**
     * Crea el formulario reactivos para agregar un proveedor.
     * Cada campo tiene sus propias validaciones.
     */
    this.agregarProveedorFormGroup = this.fb.group({
      /**
       * Tipo de persona (física o moral).
       */
      tipoPersona: new FormControl(this.solicitudStates.tipoPersona, [Validators.required]),
      /**
       * Nombre del proveedor.
       */
      nombre: new FormControl({value: this.solicitudStates.nombre, disabled: true}, [Validators.required]),
      /**
       * Primer apellido del proveedor.
       */
      primerApellido: new FormControl({value: this.solicitudStates.primerApellido, disabled: true}, [Validators.required]),
      /**
       * Denominación o razón social del proveedor.
       */
      denominacionRazonSocial: new FormControl({value: this.solicitudStates.denominacionRazonSocial, disabled: true}, [Validators.required]),
      /**
       * Segundo apellido del proveedor (opcional).
       */
      segundoApellido: new FormControl({value: this.solicitudStates.segundoApellido, disabled: true}),
      /**
       * País del proveedor.
       */
      pais: new FormControl({value: this.solicitudStates.pais,disabled: true}, [Validators.required]),
      /**
       * Estado del proveedor.
       */
      estado: new FormControl({value: this.solicitudStates.estado, disabled: true}, [Validators.required]),
      /**
       * Código postal del proveedor (opcional).
       */
      codigoPostaloEquivalente: new FormControl({value: this.solicitudStates.codigoPostaloEquivalente, disabled: true}),
      /**
       * Colonia equivalente del proveedor (opcional).
       */
      coloniaoEquivalente: new FormControl({value: this.solicitudStates.coloniaoEquivalente, disabled: true}),
      /**
       * Calle del proveedor.
       */
      calle: new FormControl({value: this.solicitudStates.calle, disabled: true}, [Validators.required]),
      /**
       * Número exterior del proveedor.
       */
      numeroExterior: new FormControl({value: this.solicitudStates.numeroExterior, disabled: true}, [Validators.required]),
      /**
       * Número interior del proveedor (opcional).
       */
      numeroInterior: new FormControl({value: this.solicitudStates.numeroInterior, disabled: true}),
      /**
       * Lada del proveedor (opcional).
       */
      lada: new FormControl({value: this.solicitudStates.lada, disabled: true}),
      /**
       * Teléfono del proveedor (opcional).
       */
      telefono: new FormControl({value: this.solicitudStates.telefono, disabled: true}),
      /**
       * Correo electrónico del proveedor (opcional).
       */
      correoElectronico: new FormControl({value: this.solicitudStates.correoElectronico, disabled: true}),
    });
  }

  /**
   * Inicializa el formulario para agregar un facturador.
   * Configura los campos del formulario con validaciones y comportamientos específicos.
   */
  initializeAgregarFacturadorFormGroup(): void {
    /**
     * Crea el formulario reactivos para agregar un facturador.
     * Cada campo tiene sus propias validaciones.
     */
    this.agregarFacturadorFormGroup = this.fb.group({
      /**
       * Tipo de persona (física o moral).
       */
      tipoPersona: new FormControl(this.solicitudStates.tipoPersona, [Validators.required]),
      /**
       * Nombre del facturador.
       */
      nombre: new FormControl({value: this.solicitudStates.nombre, disabled: true}, [Validators.required]),
      /**
       * Primer apellido del facturador.
       */
      primerApellido: new FormControl({value: this.solicitudStates.primerApellido, disabled: true}, [Validators.required]),
      /**
       * Denominación o razón social del facturador.
       */
      denominacionRazonSocial: new FormControl({value: this.solicitudStates.denominacionRazonSocial, disabled: true}, [Validators.required]),
      /**
       * Segundo apellido del facturador (opcional).
       */
      segundoApellido: new FormControl({value: this.solicitudStates.segundoApellido, disabled: true}),
      /**
       * País del facturador.
       * Requiere validación adicional mediante `requiredPaisValidator`.
       */
      pais: new FormControl({ value: this.solicitudStates.pais,disabled: true}, [
        Validators.required,
        this.requiredPaisValidator,
      ]),
      /**
       * Estado del facturador.
       */
      estado: new FormControl({value: this.solicitudStates.estado, disabled: true}, [Validators.required]),
      /**
       * Código postal del facturador (opcional).
       */
      codigoPostaloEquivalente: new FormControl({value: this.solicitudStates.codigoPostaloEquivalente, disabled: true}),
      /**
       * Colonia equivalente del facturador (opcional).
       */
      coloniaoEquivalente: new FormControl({value: this.solicitudStates.coloniaoEquivalente, disabled: true}),
      /**
       * Calle del facturador.
       */
      calle: new FormControl({value: this.solicitudStates.calle, disabled: true}, [Validators.required]),
      /**
       * Número exterior del facturador.
       */
      numeroExterior: new FormControl({value: this.solicitudStates.numeroExterior, disabled: true}, [Validators.required]),
      /**
       * Número interior del facturador (opcional).
       */
      numeroInterior: new FormControl({value: this.solicitudStates.numeroInterior, disabled: true}),
      /**
       * Lada del facturador (opcional).
       */
      lada: new FormControl({value: this.solicitudStates.lada, disabled: true}),
      /**
       * Teléfono del facturador (opcional).
       */
      telefono: new FormControl({value: this.solicitudStates.telefono, disabled: true}),
      /**
       * Correo electrónico del facturador (opcional).
       */
      correoElectronico: new FormControl({value: this.solicitudStates.correoElectronico, disabled: true}),
    });
  }

  /**
   * Almacena los datos del encabezado de la tabla.
   * Esta propiedad se utiliza para definir las columnas que se mostrarán en la tabla.
   */
  tablaEncabezadoData: string[] = [];

  public nacional = false;

  public extranjero = false;

  /**
   * Indicador para determinar si se ha seleccionado una persona física.
   * Inicialmente establecido en `false`.
   *
   * @description Este indicador se utiliza para controlar la lógica relacionada con personas físicas.
   */
  public fisica = false;

  /**
   * Indicador para determinar si se ha seleccionado una persona moral.
   * Inicialmente establecido en `false`.
   *
   * @description Este indicador se utiliza para controlar la lógica relacionada con personas morales.
   */
  public moral = false;

  /**
   * Datos de las filas para la tabla de fabricantes.
   * Inicialmente vacío, se llenará con los datos agregados por el usuario.
   *
   * @description Este arreglo almacena las filas que se mostrarán en la tabla de fabricantes.
   */
  fabricanteRowData: TablaDatos[] = [
     {
    tbodyData: [
      'Laboratorios S.A.',
      'LAB123456789',
      'CURP123456HDFRRL01',
      '55-12345678',
      'contacto@laboratorios.com',
      'Calle 1',
      '100',
      '2',
      'México',
      'Centro',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      '06000'
    ]
  }
  
  ];

  /**
   * Datos de las filas para la tabla de destinatarios.
   * Inicialmente vacío, se llenará con los datos agregados por el usuario.
   *
   * @description Este arreglo almacena las filas que se mostrarán en la tabla de destinatarios.
   */
  destinatarioRowData: TablaDatos[] = [{
    tbodyData: [
      'Empresa Destino S.A.',
      'DES123456789',
      'CURPDESTINO01',
      '55-98765432',
      'contacto@destino.com',
      'Calle Destino',
      '500',
      '10',
      'México',
      'Colonia Centro',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      '07000'
      ]
  }];

  /**
   * Datos de las filas para la tabla de proveedores.
   * Inicialmente vacío, se llenará con los datos agregados por el usuario.
   *
   * @description Este arreglo almacena las filas que se mostrarán en la tabla de proveedores.
   */
  proveedorRowData: TablaDatos[] = [
    {
    tbodyData: [
      'Proveedor Global S.A.',
      'PRO123456789',
      'CURPPROV001',
      '55-11223344',
      'contacto@proveedor.com',
      'Av. Comercio',
      '150',
      '10',
      'México',
      'Colonia Industrial',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      '06500'
      ]
  }
  ];

  /**
   * Datos de las filas para la tabla de facturadores.
   * Inicialmente vacío, se llenará con los datos agregados por el usuario.
   *
   * @description Este arreglo almacena las filas que se mostrarán en la tabla de facturadores.
   */
  facturadorRowData: TablaDatos[] = [
    {
    tbodyData: [
      'Facturador Uno S.A.',
      'FAC123456789',
      'CURPFACT001',
      '55-99887766',
      'facturas@uno.com',
      'Calle Factura',
      '400',
      '12',
      'México',
      'Colonia Centro',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      'CDMX',
      '08000'
      ]
  },
  ];

  /**
   * Maneja el cambio en los checkboxes para seleccionar el tipo de persona.
   * Actualiza los indicadores `fisica` y `moral` según el checkbox seleccionado.
   *
   * @param checkBoxValue Nombre del checkbox seleccionado (fisica o moral).
   */
  public tipoPersonaChecked(
    checkBoxValue: string | number,
    formGroupName: string
  ): void {
    if (checkBoxValue === '1') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
    this.agregarFabricanteFormGroup.get('tipoPersona')?.setValue(checkBoxValue);
    /**
     * Habilita los campos del formulario según el tipo de grupo de formulario seleccionado.
     *
     * @param formGroupName Nombre del grupo de formulario.
     */
    if (formGroupName === 'Facturador') {
      Object.keys(this.agregarFacturadorFormGroup.controls).forEach(controlName => {
          this.agregarFacturadorFormGroup.get(controlName)?.enable();
      });
    } else if (formGroupName === 'Proveedor') {
      Object.keys(this.agregarProveedorFormGroup.controls).forEach(controlName => {
          this.agregarProveedorFormGroup.get(controlName)?.enable();
      });
    } else if (formGroupName === 'Destinatario') {
      Object.keys(this.agregarDestinatarioFormGroup.controls).forEach(controlName => {
          this.agregarDestinatarioFormGroup.get(controlName)?.enable();
      });
      this.desactivarCampos = false;
    } else if (formGroupName === 'Fabricante') {
      if (this.agregarFabricanteFormGroup.get('tercerosNacionalidad')?.value && this.agregarFabricanteFormGroup.get('tipoPersona')?.value) {
        Object.keys(this.agregarFabricanteFormGroup.controls).forEach(controlName => {
          this.agregarFabricanteFormGroup.get(controlName)?.enable();
        });
      }
    }
  }

  public tercerosInputChecked(checkBoxValue: string | number): void {
    if (checkBoxValue === '1') {
      this.nacional = true;
      this.extranjero = false;
    } else {
      this.nacional = false;
      this.extranjero = true;
    }
    this.agregarFabricanteFormGroup.get('tercerosNacionalidad')?.setValue(checkBoxValue);
  }

  /**
   * Cambia la visibilidad del formulario de Fabricante.
   * Oculta la tabla principal y muestra el formulario, también resetea los valores de persona física y moral.
   */
  toggleDivFabricante(): void {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showFabricante = !this.showFabricante;
  }
    limpiarFabricanteForm(): void { 
      this.agregarFabricanteFormGroup.reset();  
   }
      limpiarDestinatarioForm(): void {   
        this.agregarDestinatarioFormGroup.reset();
   }
      limpiarProveedorForm(): void {   
        this.agregarProveedorFormGroup.reset();
   }
      limpiarFacturadorForm(): void {   
        this.agregarFacturadorFormGroup.reset();
   } 
  /**
   * Cambia la visibilidad del formulario de Destinatario.
   * Oculta la tabla principal y muestra el formulario, también resetea los valores de persona física y moral.
   */
  toggleDivDestinatario(): void {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatario = !this.showDestinatario;
  }

  /**
   * Cambia la visibilidad del formulario de Proveedor.
   * Oculta la tabla principal y muestra el formulario, también resetea los valores de persona física y moral.
   */
  toggleDivProveedor(): void {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showProveedor = !this.showProveedor;
  }

  /**
   * Cambia la visibilidad del formulario de Facturador.
   * Oculta la tabla principal y muestra el formulario, también resetea los valores de persona física y moral.
   */
  toggleDivFacturador(): void {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showFacturador = !this.showFacturador;
  }

  /**
   * Maneja la selección de filas en la tabla de Fabricante.
   * Actualiza la visibilidad de los botones según el estado de selección.
   *
   * @param data Datos de la fila seleccionada.
   */
  selectedFabricanteRows(data: DatosSeleccionados): void {
    this.showFabricanteButtons = data.checked;
  }

  /**
   * Maneja la selección de filas en la tabla de Destinatario.
   * Actualiza la visibilidad de los botones según el estado de selección.
   *
   * @param data Datos de la fila seleccionada.
   */
  selectedDestinatarioRows(data: DatosSeleccionados): void {
    this.showDestinatarioButtons = data.checked;
  }

  /**
   * Maneja la selección de filas en la tabla de Proveedor.
   * Actualiza la visibilidad de los botones según el estado de selección.
   *
   * @param data Datos de la fila seleccionada.
   */
  selectedProveedorRows(data: DatosSeleccionados): void {
    this.showProveedorButtons = data.checked;
  }

  /**
   * Maneja la selección de filas en la tabla de Facturador.
   * Actualiza la visibilidad de los botones según el estado de selección.
   *
   * @param data Datos de la fila seleccionada.
   */
  selectedFacturadorRows(data: DatosSeleccionados): void {
    this.showFacturadorButtons = data.checked;
  }

  /**
   * Texto de alerta para los terceros relacionados.
   * Indica que las tablas con asterisco son obligatorias.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Envía el formulario de Fabricante y actualiza los datos en el store.
   * Obtiene los valores seleccionados de los dropdowns y crea una nueva fila para la tabla.
   *
   * @description Este método es llamado al enviar el formulario de agregar un fabricante.
   */
  submitFabricanteForm(): void {
    /**
     * Obtiene el valor de la localidad seleccionada en el formulario.
     */
    const LOCALIDAD_VALUE = this.localidadDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarFabricanteFormGroup.value.localidad)
    )?.descripcion;

    /**
     * Obtiene el valor de la pais seleccionada en el formulario.
     */
    const PAIS_VALUE = this.paisDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarFabricanteFormGroup.value.pais)
    )?.descripcion;

    /**
     * Obtiene el valor del municipio seleccionado en el formulario.
     */
    const MUNICIPIO_VALUE = this.municipioDropdownData.find(
      (item: Catalogo) =>
        item.id ===
        Number(this.agregarFabricanteFormGroup.value.municipioAlcaldia)
    )?.descripcion;

    /**
     * Obtiene el valor del código postal seleccionado en el formulario.
     */
    const CODIGO_POSTAL_VALUE = this.codigoPostalDropdownData.find(
      (item: Catalogo) =>
        item.id ===
        Number(this.agregarFabricanteFormGroup.value.codigoPostaloEquivalente)
    )?.descripcion;

    /**
     * Obtiene el valor de la colonia seleccionada en el formulario.
     */
    const COLONIA_VALUE = this.coloniaDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarFabricanteFormGroup.value.colonia)
    )?.descripcion;

    /**
     * Crea una nueva fila para la tabla de fabricantes.
     * Esta fila contiene los datos del formulario de agregar un fabricante.
     *
     * @description Esta fila se agrega a la lista de filas del fabricante.
     */
    const FABRICANTE_ROW = {
      /**
       * Datos de la fila que se mostrarán en la tabla.
       * Cada elemento del arreglo corresponde a una columna de la tabla.
       */
      tbodyData: [
        /**
         * Denominación o razón social del fabricante.
         */
        this.agregarFabricanteFormGroup.value.denominacionRazonSocial,

        /**
         * RFC del fabricante.
         */
        this.agregarFabricanteFormGroup.value.rfc,

        /**
         * CURP del fabricante.
         */
        this.agregarFabricanteFormGroup.value.curp,

        /**
         * Teléfono del fabricante, incluyendo lada.
         */
        this.agregarFabricanteFormGroup.value.lada +
          '-' +
          this.agregarFabricanteFormGroup.value.telefono,

        /**
         * Correo electrónico del fabricante.
         */
        this.agregarFabricanteFormGroup.value.correoElectronico,

        /**
         * Calle del fabricante.
         */
        this.agregarFabricanteFormGroup.value.calle,

        /**
         * Número exterior del fabricante.
         */
        this.agregarFabricanteFormGroup.value.numeroExterior,

        /**
         * Número interior del fabricante.
         */
        this.agregarFabricanteFormGroup.value.numeroInterior,

        /**
         * País del fabricante.
         */
        PAIS_VALUE,

        /**
         * Colonia del fabricante.
         */
        COLONIA_VALUE,

        /**
         * Municipio del fabricante.
         */
        MUNICIPIO_VALUE,

        /**
         * Localidad del fabricante.
         */
        LOCALIDAD_VALUE,

        /**
         * Entidad federativa del fabricante.
         */
        this.agregarFabricanteFormGroup.value.entidadFederativa,

        /**
         * Estado o localidad del fabricante.
         */
        this.agregarFabricanteFormGroup.value.estadoLocalidad,

        /**
         * Código postal del fabricante.
         */
        CODIGO_POSTAL_VALUE,

        /**
         * Colonia equivalente del fabricante.
         */
        this.agregarFabricanteFormGroup.value.coloniaoEquivalente,
      ],
    };

    /**
     * Agrega la nueva fila a la lista de filas del fabricante.
     */
    this.fabricanteRowData.push(FABRICANTE_ROW);

    /**
     * Actualiza el estado del store con los nuevos datos del fabricante.
     */
    this.tramite260212Store.setFabricante(this.fabricanteRowData);

    /**
     * Cambia la visibilidad de las secciones del componente.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showFabricante = !this.showFabricante;
  }

  /**
   * Envía el formulario de Destinatario y actualiza los datos en el store.
   * Obtiene los valores seleccionados de los dropdowns y crea una nueva fila para la tabla.
   *
   * @description Este método es llamado al enviar el formulario de agregar un destinatario.
   */
  submitDestinatarioForm(): void {
    /**
     * Obtiene el valor de la localidad seleccionada en el formulario.
     */
    const LOCALIDAD_VALUE = this.localidadDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarDestinatarioFormGroup.value.localidad)
    )?.descripcion;

    /**
     * Obtiene el valor de la pais seleccionada en el formulario.
     */
    const PAIS_VALUE = this.paisDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarDestinatarioFormGroup.value.pais)
    )?.descripcion;

    /**
     * Obtiene el valor del municipio seleccionado en el formulario.
     */
    const MUNICIPIO_VALUE = this.municipioDropdownData.find(
      (item: Catalogo) =>
        item.id ===
        Number(this.agregarDestinatarioFormGroup.value.municipioAlcaldia)
    )?.descripcion;

    /**
     * Obtiene el valor del código postal seleccionado en el formulario.
     */
    const CODIGO_POSTAL_VALUE = this.codigoPostalDropdownData.find(
      (item: Catalogo) =>
        item.id ===
        Number(this.agregarDestinatarioFormGroup.value.codigoPostaloEquivalente)
    )?.descripcion;

    /**
     * Obtiene el valor de la colonia seleccionada en el formulario.
     */
    const COLONIA_VALUE = this.coloniaDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarDestinatarioFormGroup.value.colonia)
    )?.descripcion;

    /**
     * Crea una nueva fila para la tabla de destinatarios.
     * Esta fila contiene los datos del formulario de agregar un destinatario.
     *
     * @description Esta fila se agrega a la lista de filas del destinatario.
     */
    const DESTINATARIO_ROW = {
      /**
       * Datos de la fila que se mostrarán en la tabla.
       * Cada elemento del arreglo corresponde a una columna de la tabla.
       */
      tbodyData: [
        /**
         * Denominación o razón social del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.denominacionRazonSocial,

        /**
         * RFC del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.rfc,

        /**
         * CURP del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.curp,

        /**
         * Teléfono del destinatario, incluyendo lada.
         */
        this.agregarDestinatarioFormGroup.value.lada +
          '-' +
          this.agregarDestinatarioFormGroup.value.telefono,

        /**
         * Correo electrónico del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.correoElectronico,

        /**
         * Calle del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.calle,

        /**
         * Número exterior del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.numeroExterior,

        /**
         * Número interior del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.numeroInterior,

        /**
         * País del destinatario.
         */
        PAIS_VALUE,

        /**
         * Colonia del destinatario.
         */
        COLONIA_VALUE,

        /**
         * Municipio del destinatario.
         */

        MUNICIPIO_VALUE,

        /**
         * Localidad del destinatario.
         */
        LOCALIDAD_VALUE,

        /**
         * Entidad federativa del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.entidadFederativa,

        /**
         * Estado o localidad del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.estadoLocalidad,

        /**
         * Código postal del destinatario.
         */
        CODIGO_POSTAL_VALUE,

        /**
         * Colonia equivalente del destinatario.
         */
        this.agregarDestinatarioFormGroup.value.coloniaoEquivalente,
      ],
    };

    /**
     * Agrega la nueva fila a la lista de filas del destinatario.
     */
    this.destinatarioRowData.push(DESTINATARIO_ROW);

    /**
     * Actualiza el estado del store con los nuevos datos del destinatario.
     */
    this.tramite260212Store.setDestinatario(this.destinatarioRowData);

    /**
     * Cambia la visibilidad de las secciones del componente.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatario = !this.showDestinatario;
  }

  /**
   * Envía el formulario de Proveedor y actualiza los datos en el store.
   * Crea una nueva fila para la tabla con los datos del formulario.
   *
   * @description Este método es llamado al enviar el formulario de agregar un proveedor.
   */
  submitProveedorForm(): void {
    /**
     * Obtiene el valor de la pais seleccionada en el formulario.
     */
    const PAIS_VALUE = this.paisDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarProveedorFormGroup.value.pais)
    )?.descripcion;

    /**
     * Crea una nueva fila para la tabla con los datos del formulario.
     */
    const PROVEEDOR_ROW = {
      tbodyData: [
        this.agregarProveedorFormGroup.value.denominacionRazonSocial,
        this.agregarProveedorFormGroup.value.rfc,
        this.agregarProveedorFormGroup.value.curp,
        this.agregarProveedorFormGroup.value.lada +
          '-' +
          this.agregarProveedorFormGroup.value.telefono,
        this.agregarProveedorFormGroup.value.correoElectronico,
        this.agregarProveedorFormGroup.value.calle,
        this.agregarProveedorFormGroup.value.numeroExterior,
        this.agregarProveedorFormGroup.value.numeroInterior,
        PAIS_VALUE,
        this.agregarProveedorFormGroup.value.colonia,
        this.agregarProveedorFormGroup.value.municipioAlcaldia,
        this.agregarProveedorFormGroup.value.localidad,
        this.agregarProveedorFormGroup.value.entidadFederativa,
        this.agregarProveedorFormGroup.value.estadoLocalidad,
        this.agregarProveedorFormGroup.value.codigoPostaloEquivalente,
        this.agregarProveedorFormGroup.value.coloniaoEquivalente,
      ],
    };

    /**
     * Agrega la nueva fila a la lista de filas del proveedor.
     */
    this.proveedorRowData.push(PROVEEDOR_ROW);

    /**
     * Actualiza el estado del store con los nuevos datos del proveedor.
     */
    this.tramite260212Store.setProveedor(this.proveedorRowData);

    /**
     * Cambia la visibilidad de las secciones del componente.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showProveedor = !this.showProveedor;
  }

  /**
   * Envía el formulario de Facturador y actualiza los datos en el store.
   * Crea una nueva fila para la tabla con los datos del formulario.
   *
   * @description Este método es llamado al enviar el formulario de agregar un facturador.
   */
  submitFacturadorForm(): void {
    /**
     * Obtiene el valor de la pais seleccionada en el formulario.
     */
    const PAIS_VALUE = this.paisDropdownData.find(
      (item: Catalogo) =>
        item.id === Number(this.agregarFacturadorFormGroup.value.pais)
    )?.descripcion;

    /**
     * Crea una nueva fila para la tabla con los datos del formulario.
     */
    const FACTURADOR_ROW = {
      tbodyData: [
        this.agregarFacturadorFormGroup.value.denominacionRazonSocial,
        this.agregarFacturadorFormGroup.value.rfc,
        this.agregarFacturadorFormGroup.value.curp,
        this.agregarFacturadorFormGroup.value.lada +
          '-' +
          this.agregarFacturadorFormGroup.value.telefono,
        this.agregarFacturadorFormGroup.value.correoElectronico,
        this.agregarFacturadorFormGroup.value.calle,
        this.agregarFacturadorFormGroup.value.numeroExterior,
        this.agregarFacturadorFormGroup.value.numeroInterior,
        PAIS_VALUE,
        this.agregarFacturadorFormGroup.value.colonia,
        this.agregarFacturadorFormGroup.value.municipioAlcaldia,
        this.agregarFacturadorFormGroup.value.localidad,
        this.agregarFacturadorFormGroup.value.entidadFederativa,
        this.agregarFacturadorFormGroup.value.estado,
        this.agregarFacturadorFormGroup.value.codigoPostaloEquivalente,
        this.agregarFacturadorFormGroup.value.coloniaoEquivalente,
      ],
    };

    /**
     * Agrega la nueva fila a la lista de filas del facturador.
     */
    this.facturadorRowData.push(FACTURADOR_ROW);

    /**
     * Actualiza el estado del store con los nuevos datos del facturador.
     */
    this.tramite260212Store.setFacturador(this.facturadorRowData);

    /**
     * Cambia la visibilidad de las secciones del componente.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showFacturador = !this.showFacturador;
  }

  /**
   * Cancela el formulario de Fabricante y regresa a la tabla.
   */
  cancelFabricante(): void {
    this.showFabricante = false;
    this.showTableDiv = true;
  }

  /**
   * Cancela el formulario de Destinatario y regresa a la tabla.
   */
  cancelDestinatario(): void {
    this.showDestinatario = false;
    this.showTableDiv = true;
  }

  /**
   * Cancela el formulario de Proveedor y regresa a la tabla.
   */
  cancelProveedor(): void {
    this.showProveedor = false;
    this.showTableDiv = true;
  }

  /**
   * Cancela el formulario de Facturador y regresa a la tabla.
   */
  cancelFacturador(): void {
    this.showFacturador = false;
    this.showTableDiv = true;
  }

  /**
   * Muestra la tabla principal y oculta todos los formularios.
   */
  showTable(): void {
    this.showTableDiv = true;
    this.showFabricante = false;
    this.showDestinatario = false;
    this.showProveedor = false;
    this.showFacturador = false;
  }

  /**
   * Validador personalizado para verificar que el país seleccionado no esté vacío ni sea '-1'.
   *
   * @param control Control del formulario a validar.
   * @returns Nulo si el valor es válido, de lo contrario devuelve un objeto con la propiedad `requiredPais`.
   */
  // eslint-disable-next-line class-methods-use-this
  requiredPaisValidator(control: AbstractControl): import('@angular/forms').ValidationErrors | null {
    return control.value !== '' && control.value !== '-1'
      ? null
      : { requiredPais: true };
  }

  /**
   * Validador para verificar que el RFC sea válido.
   * Utiliza expresiones regulares para validar tanto RFC de personas físicas como morales.
   *
   * @param control Control del formulario a validar.
   * @returns Nulo si el RFC es válido, de lo contrario devuelve un objeto con la propiedad `invalidRFC`.
   */
  // eslint-disable-next-line class-methods-use-this
  rfcValidator(control: AbstractControl): import('@angular/forms').ValidationErrors | null {
    const RFC_FISICA = /^([a-zñA-ZÑ]{4})(\d{6})(([a-zA-Z]|\d){3})$/;
    const RFC_MORAL = /^([a-zñA-ZÑ&]{3})(\d{6})(([a-zA-Z]|\d){3})$/;
    return RFC_FISICA.test(control.value) || RFC_MORAL.test(control.value)
      ? null
      : { invalidRFC: true };
  }

  /**
   * Validador para verificar que la CURP sea válida.
   * Utiliza una expresión regular para validar el formato de la CURP.
   *
   * @param control Control del formulario a validar.
   * @returns Nulo si la CURP es válida, de lo contrario devuelve un objeto con la propiedad `invalidCURP`.
   */
  // eslint-disable-next-line class-methods-use-this
  curpValidator(control: AbstractControl): import('@angular/forms').ValidationErrors | null {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const pattern = /^([a-zA-Z]{4})([0-9]{6})([HhMm][a-zA-Z]{5})([0-9]{2})$/;
    return pattern.test(control.value) ? null : { invalidCURP: true };
  }

  /**
   * Validador para verificar que el teléfono sea válido.
   * Utiliza una expresión regular que permite números, letras, guiones, paréntesis y espacios.
   *
   * @param control Control del formulario a validar.
   * @returns Nulo si el teléfono es válido, de lo contrario devuelve un objeto con la propiedad `invalidTelefono`.
   */
  // eslint-disable-next-line class-methods-use-this
  telefonoValidator(control: AbstractControl): import('@angular/forms').ValidationErrors | null {
    const PATTERN = /^([0-9A-Za-z\-() ])*$/;
    return PATTERN.test(control.value) ? null : { invalidTelefono: true };
  }

   /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @returns {boolean | null} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  // eslint-disable-next-line class-methods-use-this
  esInvalido(formgroupo: FormGroup, campo: string): boolean | null {
    const CAMPO = formgroupo.get(campo);
    return CAMPO ? CAMPO.invalid && CAMPO.touched : null;
  }

  /*
  * Método del ciclo de vida de Angular - destruye el componente
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
