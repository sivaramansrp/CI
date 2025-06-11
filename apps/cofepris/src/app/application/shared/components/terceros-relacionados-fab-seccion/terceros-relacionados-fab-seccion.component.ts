import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';

import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent, REGEX_CURP, REGEX_RFC_FISICA, REGEX_RFC_MORAL, REGEX_TELEFONO, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';

import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestinatarioModel, FacricanteModel, FacturadorModel, ProveedorModel } from '../../models/terceros-fabricante-relocionados.model';

import { DESTINATARIO_TABLE_CONFIG, FABRICANTE_TABLE_CONFIG, FACTURADOR_TABLE_CONFIG, NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO, PERSONA_OPCIONES_DE_BOTON_DE_RADIO, PROVEEDOR_TABLE_CONFIG, TERCEROS_TEXTO_DE_ALERTA } from '../../constantes/tereceros-relacionados-fab-seccion.enum';
import { ModalComponent } from '../modal/modal.component';

import {Subject ,map, takeUntil } from 'rxjs';

import { TercerosRelacionadosFebService } from '../../services/tereceros-relacionados-feb.service';

import { TramiteRelacionadaseStore } from '../../estados/stores/terceros-relacionados.stores';



@Component({
  selector: 'app-terceros-relacionados-fab-seccion',
  standalone: true,
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
    TablaDinamicaComponent],
  templateUrl: './terceros-relacionados-fab-seccion.component.html',
  styleUrl: './terceros-relacionados-fab-seccion.component.scss',
}) 
export class TercerosRelacionadosFabSeccionComponent implements OnInit, OnDestroy {
/**
 * @description Este componente maneja la sección de terceros relacionados en el formulario de trámites.
 */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  /**
   * Almacena los datos de las filas de la tabla de fabricantes.
   * Inicialmente vacío, se llenará con datos obtenidos del servicio.
   */
  configuracionTabla: ConfiguracionColumna<FacricanteModel>[] =FABRICANTE_TABLE_CONFIG;
  /**
   * Almacena los datos de las filas de la tabla de fabricantes.
   */
  configuracionTablaDestinatario : ConfiguracionColumna<DestinatarioModel>[] = DESTINATARIO_TABLE_CONFIG;
  /**
   * Almacena los datos de las filas de la tabla de proveedores.
   */
  configuracionTablaProveedor : ConfiguracionColumna<ProveedorModel>[] = PROVEEDOR_TABLE_CONFIG;
  /**
   * Almacena los datos de las filas de la tabla de facturadores.
   */
  configuracionTablaFacturador: ConfiguracionColumna<FacturadorModel>[] = FACTURADOR_TABLE_CONFIG;


   /**
     * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
     */
    private destroy$ = new Subject<void>();
    /**
     * Almacena los datos del encabezado de la tabla.
     * Esta propiedad se utiliza para definir las columnas que se mostrarán en la tabla.
     */
    tablaEncabezadoData: string[] = [];
  
   /**
 * Indicador para determinar si la nacionalidad seleccionada es "Nacional".
 * 
 * @description Este indicador se utiliza para controlar la lógica relacionada con personas de nacionalidad nacional.
 * Por ejemplo, habilitar o deshabilitar campos específicos en el formulario según la selección.
 * 
 * @type {boolean}
 * @default false
 */
public nacional = false;
  
   /**
 * Indicador para determinar si la nacionalidad seleccionada es "Extranjera".
 * 
 * @description Este indicador se utiliza para controlar la lógica relacionada con personas de nacionalidad extranjera.
 * Por ejemplo, habilitar o deshabilitar campos específicos en el formulario según la selección.
 * 
 * @type {boolean}
 * @default false
 */
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
    
  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

    /**
     * Constructor del componente.
     * Inyecta el FormBuilder, el store del trámite y el servicio de terceros.
     *
     * @param fb Constructor de formularios para crear los formularios reactivos.
     * @param tramiteStore Store del trámite 260212.
     * @param tercerosService Servicio que proporciona datos de terceros.
     */
    constructor(
      private fb: FormBuilder,
     private tramiteStore: TramiteRelacionadaseStore,
      private tercerosService: TercerosRelacionadosFebService,
        private consultaioQuery: ConsultaioQuery,
    ) {
       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
      
        })
      )
      .subscribe();
    }
  
    /**
     * Ciclo de vida que se ejecuta al iniciar el componente.
     * Obtiene los datos para los selectores desde el servicio y inicializa los formularios.
     */
    ngOnInit(): void {
      this.tercerosService.getFabricanteForm().subscribe(data => {
      this.fabricanteRowData = [data];
      });
        
      this.tercerosService.getDestinatarioForm().subscribe(data => {
  this.destinatarioRowData = [data];
      });
      this.tercerosService.getProveedorForm().subscribe(data => {
       this.proveedorRowData = [data];
      });
      this.tercerosService.getFacturadorForm().subscribe(data => {
      this.facturadorRowData = [data];
       }
       );
      this.tercerosService.getEncabezadoDeTabla()
        .pipe(takeUntil(this.destroy$)).subscribe((data:{ columns: string[] }) => {
        this.tablaEncabezadoData = data.columns;
      });
  
      /**
       * Obtiene los datos para los selectores desde el servicio de terceros.
       * Actualiza la propiedad `dropdownData` con los datos obtenidos.
       */
      this.tercerosService.getData()
      .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        this.dropdownData = data;
      });
  
      /**
       * Carga los datos específicos para los dropdowns de ubicación geográfica.
       */
  
      // Carga los datos de país para el dropdown.
      this.tercerosService.getPaisData()
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        /**
         * Asigna los datos de país a la variable paisDropdownData.
         */
        this.paisDropdownData = data;
      });
  
      // Carga los datos de municipio para el dropdown.
      this.tercerosService.getMunicipioData()
      .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        /**
         * Asigna los datos de municipio a la variable municipioDropdownData.
         */
        this.municipioDropdownData = data;
      });
  
      // Carga los datos de código postal para el dropdown.
      this.tercerosService.getCodigoPostalData()
      .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        /**
         * Asigna los datos de código postal a la variable codigoPostalDropdownData.
         */
        this.codigoPostalDropdownData = data;
      });
  
      // Carga los datos de colonia para el dropdown.
      this.tercerosService.getColoniaData()
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        /**
         * Asigna los datos de colonia a la variable coloniaDropdownData.
         */
        this.coloniaDropdownData = data;
      });
  
      // Carga los datos de localidad para el dropdown.
      this.tercerosService.getLocalidadData()
      .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        /**
         * Asigna los datos de localidad a la variable localidadDropdownData.
         */
        this.localidadDropdownData = data;
      });
  
      /**
       * Inicializa los formularios reactivos para agregar terceros.
       */
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
        tercerosNacionalidad: new FormControl('', [Validators.required]),
        /**
         * Tipo de persona (física o moral).
         */
        tipoPersona: new FormControl('', [Validators.required]),
        /**
         * RFC del tercero.
         * Requiere validación adicional mediante `rfcValidator`.
         */
        rfc: new FormControl('', [Validators.required,TercerosRelacionadosFabSeccionComponent.rfcValidator]),
        /**
         * CURP del tercero.
         * Requiere validación adicional mediante `curpValidator`.
         */
        curp: new FormControl('', [Validators.required, Validators.pattern(REGEX_CURP)]),
        /**
         * Nombre del tercero.
         */
        nombre: new FormControl('', [Validators.required]),
        /**
         *Primer Apellido del tercero.
         */
        primerApellido: new FormControl('', [Validators.required]),
        /**
         * Segundo Apellido del tercero.
         */
        segundoApellido: new FormControl('', [Validators.required]),
        /**
         * Denominación o razón social del tercero.
         */
        denominacionRazonSocial: new FormControl('', [Validators.required]),
        /**
         * País del tercero.
         * Requiere validación adicional mediante `requiredPaisValidator`.
         */
        pais: new FormControl('', [
          Validators.required,
          TercerosRelacionadosFabSeccionComponent.requiredPaisValidator,
        ]),
        extranjeroEstado: new FormControl('', [Validators.required]),
        /**
         * Estado o localidad del tercero.
         */
        estadoLocalidad: new FormControl('', [Validators.required]),
        /**
         * Municipio o alcaldía del tercero.
         */
        municipioAlcaldia: new FormControl('', [Validators.required]),
        /**
         * Localidad del tercero.
         */
        localidad: new FormControl(''),
        /**
         * Entidad federativa del tercero.
         */
        entidadFederativa: new FormControl('', [Validators.required]),
        /**
         * Código postal del tercero.
         */
        codigoPostaloEquivalente: new FormControl('', [Validators.required]),
        /**
         * Colonia del tercero.
         */
        colonia: new FormControl(''),
        /**
         * Colonia equivalente del tercero.
         */
        coloniaoEquivalente: new FormControl(''),
        /**
         * Calle del tercero.
         */
        calle: new FormControl('', [Validators.required]),
        /**
         * Número exterior del tercero.
         */
        numeroExterior: new FormControl('', [Validators.required]),
        /**
         * Número interior del tercero.
         */
        numeroInterior: new FormControl(''),
        /**
         * Lada del tercero.
         */
        lada: new FormControl(''),
        /**
         * Teléfono del tercero.
         * Requiere validación adicional mediante `telefonoValidator`.
         */
        telefono: new FormControl('', [Validators.pattern(REGEX_TELEFONO)]),
        /**
         * Correo electrónico del tercero.
         */
        correoElectronico: new FormControl(''),
      });
  
      // Deshabilita campos hasta que se seleccione el tipo de persona
      this.agregarFabricanteFormGroup.get('rfc')?.disable();
      this.agregarFabricanteFormGroup.get('curp')?.disable();
      this.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.disable();
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
        tipoPersona: new FormControl('', [Validators.required]),
        /**
         * RFC del destinatario.
         */
        rfc: new FormControl('', [Validators.required]),
        /**
         * CURP del destinatario.
         */
        curp: new FormControl('', [Validators.required]),
        /**
         * Denominación o razón social del destinatario.
         */
        denominacionRazonSocial: new FormControl('', [Validators.required]),
        /**
         * País del destinatario.
         */
        pais: new FormControl('', [Validators.required]),
        /**
         * Estado o localidad del destinatario.
         */
        estadoLocalidad: new FormControl('', [Validators.required]),
        /**
         * Municipio o alcaldía del destinatario.
         */
        municipioAlcaldia: new FormControl('', [Validators.required]),
        /**
         * Localidad del destinatario.
         */
        localidad: new FormControl(''),
        /**
         * Entidad federativa del destinatario.
         */
        entidadFederativa: new FormControl('', [Validators.required]),
        /**
         * Código postal del destinatario.
         */
        codigoPostaloEquivalente: new FormControl('', [Validators.required]),
        /**
         * Colonia del destinatario.
         */
        colonia: new FormControl(''),
        /**
         * Colonia equivalente del destinatario.
         */
        coloniaoEquivalente: new FormControl(''),
        /**
         * Calle del destinatario.
         */
        calle: new FormControl('', [Validators.required]),
        /**
         * Número exterior del destinatario.
         */
        numeroExterior: new FormControl('', [Validators.required]),
        /**
         * Número interior del destinatario.
         */
        numeroInterior: new FormControl(''),
        /**
         * Lada del destinatario.
         */
        lada: new FormControl(''),
        /**
         * Teléfono del destinatario.
         */
        telefono: new FormControl(''),
        /**
         * Correo electrónico del destinatario.
         */
        correoElectronico: new FormControl(''),
      });
  
      // Deshabilita campos hasta que se seleccione el tipo de persona
      this.agregarDestinatarioFormGroup.get('rfc')?.disable();
      this.agregarDestinatarioFormGroup.get('curp')?.disable();
      this.agregarDestinatarioFormGroup.get('denominacionRazonSocial')?.disable();
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
        tipoPersona: new FormControl('', [Validators.required]),
        /**
         * Nombre del proveedor.
         */
        nombre: new FormControl('', [Validators.required]),
        /**
         * Primer apellido del proveedor.
         */
        primerApellido: new FormControl('', [Validators.required]),
        /**
         * Denominación o razón social del proveedor.
         */
        denominacionRazonSocial: new FormControl('', [Validators.required]),
        /**
         * Segundo apellido del proveedor (opcional).
         */
        segundoApellido: new FormControl(''),
        /**
         * País del proveedor.
         */
        pais: new FormControl('', [Validators.required]),
        /**
         * Estado del proveedor.
         */
        estado: new FormControl('', [Validators.required]),
        /**
         * Código postal del proveedor (opcional).
         */
        codigoPostaloEquivalente: new FormControl(''),
        /**
         * Colonia equivalente del proveedor (opcional).
         */
        coloniaoEquivalente: new FormControl(''),
        /**
         * Calle del proveedor.
         */
        calle: new FormControl('', [Validators.required]),
        /**
         * Número exterior del proveedor.
         */
        numeroExterior: new FormControl('', [Validators.required]),
        /**
         * Número interior del proveedor (opcional).
         */
        numeroInterior: new FormControl(''),
        /**
         * Lada del proveedor (opcional).
         */
        lada: new FormControl(''),
        /**
         * Teléfono del proveedor (opcional).
         */
        telefono: new FormControl(''),
        /**
         * Correo electrónico del proveedor (opcional).
         */
        correoElectronico: new FormControl(''),
      });
  
      // Deshabilita campos hasta que se seleccione el tipo de persona
      this.agregarProveedorFormGroup.get('nombre')?.disable();
      this.agregarProveedorFormGroup.get('segundoApellido')?.disable();
      this.agregarProveedorFormGroup.get('primerApellido')?.disable();
      this.agregarProveedorFormGroup.get('denominacionRazonSocial')?.disable();
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
        tipoPersona: new FormControl('', [Validators.required]),
        /**
         * Nombre del facturador.
         */
        nombre: new FormControl('', [Validators.required]),
        /**
         * Primer apellido del facturador.
         */
        primerApellido: new FormControl('', [Validators.required]),
        /**
         * Denominación o razón social del facturador.
         */
        denominacionRazonSocial: new FormControl('', [Validators.required]),
        /**
         * Segundo apellido del facturador (opcional).
         */
        segundoApellido: new FormControl(''),
        /**
         * País del facturador.
         * Requiere validación adicional mediante `requiredPaisValidator`.
         */
        pais: new FormControl('', [
          Validators.required,
          TercerosRelacionadosFabSeccionComponent.requiredPaisValidator,
        ]),
        /**
         * Estado del facturador.
         */
        estado: new FormControl('', [Validators.required]),
        /**
         * Código postal del facturador (opcional).
         */
        codigoPostaloEquivalente: new FormControl(''),
        /**
         * Colonia equivalente del facturador (opcional).
         */
        coloniaoEquivalente: new FormControl(''),
        /**
         * Calle del facturador.
         */
        calle: new FormControl('', [Validators.required]),
        /**
         * Número exterior del facturador.
         */
        numeroExterior: new FormControl('', [Validators.required]),
        /**
         * Número interior del facturador (opcional).
         */
        numeroInterior: new FormControl(''),
        /**
         * Lada del facturador (opcional).
         */
        lada: new FormControl(''),
        /**
         * Teléfono del facturador (opcional).
         */
        telefono: new FormControl(''),
        /**
         * Correo electrónico del facturador (opcional).
         */
        correoElectronico: new FormControl(''),
      });
  
      // Deshabilita campos hasta que se seleccione el tipo de persona
      this.agregarFacturadorFormGroup.get('nombre')?.disable();
      this.agregarFacturadorFormGroup.get('segundoApellido')?.disable();
      this.agregarFacturadorFormGroup.get('primerApellido')?.disable();
      this.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.disable();
    }
  
  
  
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
  
      /**
       * Habilita los campos del formulario según el tipo de grupo de formulario seleccionado.
       *
       * @param formGroupName Nombre del grupo de formulario.
       */
      if (formGroupName === 'Facturador') {
        /**
         * Habilita los campos del formulario de facturador.
         */
        this.agregarFacturadorFormGroup.get('nombre')?.enable();
        this.agregarFacturadorFormGroup.get('primerApellido')?.enable();
        this.agregarFacturadorFormGroup.get('segundoApellido')?.enable();
        this.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.enable();
      } else if (formGroupName === 'Proveedor') {
        /**
         * Habilita los campos del formulario de proveedor.
         */
        this.agregarProveedorFormGroup.get('nombre')?.enable();
        this.agregarProveedorFormGroup.get('primerApellido')?.enable();
        this.agregarProveedorFormGroup.get('segundoApellido')?.enable();
        this.agregarProveedorFormGroup.get('denominacionRazonSocial')?.enable();
      } else if (formGroupName === 'Destinatario') {
        /**
         * Habilita los campos del formulario de destinatario.
         */
        this.agregarDestinatarioFormGroup.get('rfc')?.enable();
        this.agregarDestinatarioFormGroup.get('curp')?.enable();
        this.agregarDestinatarioFormGroup
          .get('denominacionRazonSocial')
          ?.enable();
      } else if (formGroupName === 'Fabricante') {
        /**
         * Habilita los campos del formulario de fabricante.
         */
        this.agregarFabricanteFormGroup.get('rfc')?.enable();
        this.agregarFabricanteFormGroup.get('curp')?.enable();
        this.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.enable();
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
     * Texto de alerta para los terceros relacionados.
     * Indica que las tablas con asterisco son obligatorias.
     */
    TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  /**
   * Almacena los datos de los fabricantes, destinatarios, facturadores y proveedores.
   * Estos datos se utilizan para mostrar en las tablas correspondientes.
   */
   fabricanteRowData: FacricanteModel[] = [];
   /**
    * Almacena los datos de los destinatarios.
    * Estos datos se utilizan para mostrar en la tabla de destinatarios.
    */
   destinatarioRowData: DestinatarioModel[] = [];
   /**
    * Almacena los datos de los proveedores.
    * Estos datos se utilizan para mostrar en la tabla de proveedores.
    */
   facturadorRowData: FacturadorModel[] = [];
   /**
    * Almacena los datos de los proveedores.
    * Estos datos se utilizan para mostrar en la tabla de proveedores.
    */
   proveedorRowData: ProveedorModel[] = [];
/**
 * Envía el formulario de fabricante y actualiza los datos en el store.
 */
submitFabricanteForm() {
  if (this.agregarFabricanteFormGroup) {
 
    const NEW_FABRICANTE = this.agregarFabricanteFormGroup.value;

    this.fabricanteRowData = [...this.fabricanteRowData, NEW_FABRICANTE];

 
    this.toggleDivFabricante();
    this.agregarFabricanteFormGroup.reset();
  }
}
/**
 * Almacena las filas seleccionadas de la tabla de fabricantes.
 * Esta propiedad se utiliza para realizar operaciones en las filas seleccionadas, como eliminarlas.
 */
selectedFabricanteRows: FacricanteModel[] = [];
/**
 * Almacena las filas seleccionadas de la tabla de fabricantes.
 * Esta propiedad se utiliza para realizar operaciones en las filas seleccionadas, como eliminarlas.
 */
onFabricanteSeleccionados(selected: FacricanteModel[]):void {
  this.selectedFabricanteRows = selected;
}
/**
 * Elimina las filas seleccionadas de la tabla de fabricantes.
 */
eliminarSeleccionadosFabricante() :void {
  this.fabricanteRowData = this.fabricanteRowData.filter(
    row => !this.selectedFabricanteRows.includes(row)
  );
  this.selectedFabricanteRows = [];
}
  /**
   * Envía el formulario de destinatario y actualiza los datos en el store.
   */
submitDestinatarioForm(): void{

  if (this.agregarDestinatarioFormGroup) {
    // Get the form data
    const NEW_DESTINATARIO = this.agregarDestinatarioFormGroup.value;

    // Add to the table data array (spread to trigger change detection)
    this.destinatarioRowData = [...this.destinatarioRowData, NEW_DESTINATARIO];

    // Optionally, close the modal and reset the form
    this.toggleDivDestinatario();
    this.agregarDestinatarioFormGroup.reset();
  }
}
/**
 * Almacena las filas seleccionadas de la tabla de destinatarios.
 */
selectedDestinatarioRows: DestinatarioModel[] = [];
/**
 * Maneja la selección de filas en la tabla de destinatarios.
 * Actualiza la propiedad `selectedDestinatarioRows` con las filas seleccionadas.
 */
selectedProveedorRows: ProveedorModel[] = [];
/**
 * Maneja la selección de filas en la tabla de proveedores.
 * Actualiza la propiedad `selectedProveedorRows` con las filas seleccionadas.
 */
selectedFacturadorRows: FacturadorModel[] = [];
/**
 * Maneja la selección de filas en la tabla de facturadores.
 * Actualiza la propiedad `selectedFacturadorRows` con las filas seleccionadas.
 * @param selected Filas seleccionadas de la tabla de facturadores.
 */
onDestinatarioSeleccionados(selected: DestinatarioModel[]) {
  this.selectedDestinatarioRows = selected;
}
/**
 * Elimina las filas seleccionadas de la tabla de destinatarios.
 * @description Este método filtra las filas de la tabla para eliminar aquellas que están en `selectedDestinatarioRows`.
 */
eliminarSeleccionadosDestinatario() {
  this.destinatarioRowData = this.destinatarioRowData.filter(
    row => !this.selectedDestinatarioRows.includes(row)
  );
  this.selectedDestinatarioRows = [];
}
/**
 * 
 * @param selected Filas seleccionadas de la tabla de proveedores.
 */
onProveedorSeleccionados(selected: ProveedorModel[]) {
  this.selectedProveedorRows = selected;
}
/**
 * Elimina las filas seleccionadas de la tabla de proveedores.  
 */
  eliminarSeleccionadosProveedor(){
    this.proveedorRowData = this.proveedorRowData.filter(
    row => !this.selectedProveedorRows.includes(row)
  );
  this.selectedProveedorRows = [];
  }

    /**
     * Envía el formulario de Proveedor y actualiza los datos en el store.
     * Crea una nueva fila para la tabla con los datos del formulario.
     *
     * @description Este método es llamado al enviar el formulario de agregar un proveedor.
     */
    submitProveedorForm(): void {
  if (this.agregarProveedorFormGroup.valid) {
    const NEW_PROVEEDOR = this.agregarProveedorFormGroup.value;
    this.proveedorRowData = [...this.proveedorRowData, NEW_PROVEEDOR];
    this.toggleDivProveedor();
    this.agregarProveedorFormGroup.reset();
  }
    }
    /**
     * 
     * @param selected Filas seleccionadas de la tabla de facturadores.
     * @description Este método actualiza la propiedad `selectedFacturadorRows` con las filas seleccionadas.
     */
  onFacturadorSeleccionados(selected: FacturadorModel[]) {
  this.selectedFacturadorRows = selected;
}
/**
 * Elimina las filas seleccionadas de la tabla de facturadores.
 * @description Este método filtra las filas de la tabla para eliminar aquellas que están en `selectedFacturadorRows`.
 */
  eliminarSeleccionadosFacturador(){
    this.facturadorRowData = this.facturadorRowData.filter(
    row => !this.selectedFacturadorRows.includes(row)
  );
  this.selectedFacturadorRows = [];
  }
    /**
     * Envía el formulario de Facturador y actualiza los datos en el store.
     * Crea una nueva fila para la tabla con los datos del formulario.
     *
     * @description Este método es llamado al enviar el formulario de agregar un facturador.
     */
    submitFacturadorForm(): void {

      if (this.agregarFacturadorFormGroup) {
        // Obtiene los datos del formulario
        const NEW_FACTURADOR = this.agregarFacturadorFormGroup.value;

        // Agrega los datos a la tabla de facturadores
        this.facturadorRowData = [...this.facturadorRowData, NEW_FACTURADOR];

        // Opcionalmente, cierra el modal y resetea el formulario
        this.toggleDivFacturador();
        this.agregarFacturadorFormGroup.reset();
      }
    }
  
    /**
     * Validador personalizado para verificar que el país seleccionado no esté vacío ni sea '-1'.
     *
     * @param control Control del formulario a validar.
     * @returns Nulo si el valor es válido, de lo contrario devuelve un objeto con la propiedad `requiredPais`.
     */
  
    static requiredPaisValidator(control: AbstractControl): { requiredPais: boolean } | null {
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
    
    static rfcValidator(control: AbstractControl): { invalidRFC: boolean } | null {
      const VALUE = control.value;
      if (REGEX_RFC_FISICA.test(VALUE) || REGEX_RFC_MORAL.test(VALUE)) {
        return null; // RFC válido
      }
      return { invalidRFC: true }; // RFC inválido
    }
   

    /**
   * Ciclo de vida `OnDestroy`.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
