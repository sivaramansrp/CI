import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent, REGEX_CURP, REGEX_RFC_FISICA, REGEX_RFC_MORAL, REGEX_TELEFONO, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';

import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosSeleccionados, FabricanteRowData } from '../../models/terceros-fabricante-relocionados.model';

import { NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO, PERSONA_OPCIONES_DE_BOTON_DE_RADIO, TERCEROS_TEXTO_DE_ALERTA } from '../../constantes/tereceros-relacionados-fab-seccion.enum';
import { ModalComponent } from '../modal/modal.component';

import { Subject, takeUntil } from 'rxjs';

import { TercerosRelacionadosFebService } from '../../services/tereceros-relacionados-feb.service';


import { TablaDatos } from '../../models/terceros-fabricante.model';
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
      InputRadioComponent],
  templateUrl: './terceros-relacionados-fab-seccion.component.html',
  styleUrl: './terceros-relacionados-fab-seccion.component.scss',
})
export class TercerosRelacionadosFabSeccionComponent implements OnInit, OnDestroy {
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
     * Datos de las filas para la tabla de fabricantes.
     * Inicialmente vacío, se llenará con los datos agregados por el usuario.
     *
     * @description Este arreglo almacena las filas que se mostrarán en la tabla de fabricantes.
     */
    fabricanteRowData: TablaDatos[] = [];
  
    /**
     * Datos de las filas para la tabla de destinatarios.
     * Inicialmente vacío, se llenará con los datos agregados por el usuario.
     *
     * @description Este arreglo almacena las filas que se mostrarán en la tabla de destinatarios.
     */
    destinatarioRowData: TablaDatos[] = [];
  
    /**
     * Datos de las filas para la tabla de proveedores.
     * Inicialmente vacío, se llenará con los datos agregados por el usuario.
     *
     * @description Este arreglo almacena las filas que se mostrarán en la tabla de proveedores.
     */
    proveedorRowData: TablaDatos[] = [];
  
    /**
     * Datos de las filas para la tabla de facturadores.
     * Inicialmente vacío, se llenará con los datos agregados por el usuario.
     *
     * @description Este arreglo almacena las filas que se mostrarán en la tabla de facturadores.
     */
    facturadorRowData: TablaDatos[] = [];

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
      private tercerosService: TercerosRelacionadosFebService
    ) {
      //construtor
    }
  
    /**
     * Ciclo de vida que se ejecuta al iniciar el componente.
     * Obtiene los datos para los selectores desde el servicio y inicializa los formularios.
     */
    ngOnInit(): void {
      
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
      this.tramiteStore.setFabricante(this.fabricanteRowData);
  
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
      this.tramiteStore.setDestinatario(this.destinatarioRowData);
  
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
      this.tramiteStore.setProveedor(this.proveedorRowData);
  
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
      this.tramiteStore.setFacturador(this.facturadorRowData);
  
      /**
       * Cambia la visibilidad de las secciones del componente.
       */
      this.showTableDiv = !this.showTableDiv;
      this.showFacturador = !this.showFacturador;
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
