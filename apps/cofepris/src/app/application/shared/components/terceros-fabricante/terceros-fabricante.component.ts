/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  REGEX_SOLO_NUMEROS,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DEFAULT_TABLA_ORDEN,
  TERCEROS_RELACIONADOS_TABLE_HEADER_DATA,
} from '../../constantes/terceros-fabricante.enum';
import {
  REGEX_CURP,
  REGEX_RFC_FISICA,
  REGEX_RFC_MORAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import NacionalidadRadioOptions from '@libs/shared/theme/assets/json/260501/nacionalidad-options.json';
import SELECT_OPTIONS_DATA from '@libs/shared/theme/assets/json/260501/fabricante-select-options-data.json';
import { TablaDatos } from '../../models/terceros-fabricante.model';
import { TableComponent } from '@ng-mf/data-access-user';
import { TercerosFabricanteService } from '../../services/terceros-fabricante.service';
import { TercerosFabricanteStore } from '../../estados/stores/terceros-fabricante.store';
import TipoPersonaRadioOptions from '@libs/shared/theme/assets/json/260501/tipo-persona-options.json';
import TipoPersonaTresRadioOptions from '@libs/shared/theme/assets/json/260501/tipo-persona-tres-options.json';

/**
 * Componente que gestiona los terceros relacionados.
 * Utiliza formularios reactivos y componentes personalizados para mostrar datos.
 */
@Component({
  selector: 'app-terceros-fabricante',
  standalone: true,
  templateUrl: './terceros-fabricante.component.html',
  styleUrls: ['./terceros-fabricante.component.scss'],
  imports: [
    CommonModule,
    TituloComponent,
    TableComponent,
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
   * Expresión regular para validar el RFC de personas físicas.
   * @description Utiliza una expresión regular para verificar el formato del RFC.
   */
  @Input() tablaOrden: { nombre: string; orden: number; esVisible: boolean }[] =
    DEFAULT_TABLA_ORDEN;

  /**
   *  Método para validar el RFC del tercero.
   * @param control Control del formulario que contiene el RFC.
   * @returns Un objeto de error si el RFC es inválido, o `null` si es válido.
   * @description Valida el RFC del tercero utilizando expresiones regulares.
   */
  getSortedTablas(): { nombre: string; orden: number; esVisible: boolean }[] {
    return this.tablaOrden
      .filter((tabla) => tabla.esVisible) // Only include visible tables
      .sort((a, b) => a.orden - b.orden);
  }

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
   * Indicador de visibilidad para la sección del formulario de formulador.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestra o no el formulario para agregar un formulador.
   */
  showFormulador = false;

  /**
   * Indicador de visibilidad para la sección del formulario de proveedor.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestra o no el formulario para agregar un proveedor.
   */
  showProveedor = false;

  /**
   * Indicador de visibilidad para los botones del formulario de fabricante.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestran o no los botones para el formulario de fabricante.
   */
  showFabricanteButtons = false;

  /**
   * Indicador de visibilidad para los botones del formulario de formulador.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestran o no los botones para el formulario de formulador.
   */
  showFormuladorButtons = false;

  /**
   * Indicador de visibilidad para los botones del formulario de proveedor.
   * Inicialmente no visible (`false`).
   *
   * @description Controla si se muestran o no los botones para el formulario de proveedor.
   */
  showProveedorButtons = false;

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
   * Utiliza los datos predefinidos en `paisSelectData`.
   *
   * @description Este arreglo almacena las opciones para el selector de países.
   */
  paisDropdownData: Catalogo[] = SELECT_OPTIONS_DATA.paisSelectData;

  /**
   * Datos para el dropdown de localidades.
   * Utiliza los datos predefinidos en `localidadSelectData`.
   *
   * @description Este arreglo almacena las opciones para el selector de localidades.
   */
  localidadDropdownData: Catalogo[] = SELECT_OPTIONS_DATA.localidadSelectData;

  /**
   * Datos para el dropdown de municipios.
   * Utiliza los datos predefinidos en `municipioSelectData`.
   *
   * @description Este arreglo almacena las opciones para el selector de municipios.
   */
  municipioDropdownData: Catalogo[] = SELECT_OPTIONS_DATA.municipioSelectData;

  /**
   * Datos para el dropdown de códigos postales.
   * Utiliza los datos predefinidos en `codigoPostalSelectData`.
   *
   * @description Este arreglo almacena las opciones para el selector de códigos postales.
   */
  codigoPostalDropdownData: Catalogo[] =
    SELECT_OPTIONS_DATA.codigoPostalSelectData;

  /**
   * Datos para el dropdown de colonias.
   * Utiliza los datos predefinidos en `coloniaSelectData`.
   *
   * @description Este arreglo almacena las opciones para el selector de colonias.
   */
  coloniaDropdownData: Catalogo[] = SELECT_OPTIONS_DATA.coloniaSelectData;

  /**
   * Formulario reactivo para agregar un fabricante.
   * Este formulario contiene los campos necesarios para ingresar los datos de un fabricante.
   *
   * @description Se utiliza para validar y procesar los datos del fabricante.
   */
  agregarFabricanteFormGroup!: FormGroup;

  /**
   * Formulario reactivo para agregar un formulador.
   * Este formulario contiene los campos necesarios para ingresar los datos de un formulador.
   *
   * @description Se utiliza para validar y procesar los datos del formulador.
   */
  agregarFormuladorFormGroup!: FormGroup;

  /**
   * Formulario reactivo para agregar un proveedor.
   * Este formulario contiene los campos necesarios para ingresar los datos de un proveedor.
   *
   * @description Se utiliza para validar y procesar los datos del proveedor.
   */
  agregarProveedorFormGroup!: FormGroup;

  /**
   * Opciones para el radio de nacionalidad.
   * Utiliza los datos predefinidos en `NacionalidadRadioOptions`.
   *
   * @description Este arreglo almacena las opciones para el selector de nacionalidad.
   */
  nacionalidadOptions = NacionalidadRadioOptions;

  /**
   * Opciones para el radio de tipo de persona.
   * Utiliza los datos predefinidos en `TipoPersonaRadioOptions`.
   *
   * @description Este arreglo almacena las opciones para el selector de tipo de persona.
   */
  tipoPersonaOptions = TipoPersonaRadioOptions;

  /**
   * Opciones para el radio de tipo de persona.
   * Utiliza los datos predefinidos en `TipoPersonaTresRadioOptions`.
   *
   * @description Este arreglo almacena las opciones para el selector de tipo de persona.
   */
  tipoPersonaTresOptions = TipoPersonaTresRadioOptions;

  /**
   * Constructor del componente.
   * Inyecta el FormBuilder, el store del trámite y el servicio de terceros.
   *
   * @param fb Constructor de formularios para crear los formularios reactivos.
   * @param tercerosFabricanteStore Store del trámite.
   * @param service Servicio que proporciona datos de terceros.
   */
  constructor(
    private fb: FormBuilder,
    private tercerosFabricanteStore: TercerosFabricanteStore,
    @Inject(TercerosFabricanteService)
    private service: TercerosFabricanteService
  ) {
    // Inicializa el store del trámite.
  }

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Ciclo de vida que se ejecuta al iniciar el componente.
   * Obtiene los datos para los selectores desde el servicio y inicializa los formularios.
   */
  ngOnInit(): void {
    /**
     * Obtiene los datos para los selectores desde el servicio de terceros.
     * Actualiza la propiedad `dropdownData` con los datos obtenidos.
     */
    this.service
      .getData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.dropdownData = data;
      });

    /**
     * Inicializa los formularios reactivos para agregar terceros.
     */
    this.initializeAgregarFabricanteFormGroup();
    this.initializeAgregarFormuladorFormGroup();
    this.initializeAgregarProveedorFormGroup();
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
      rfc: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        TercerosRelacionadosComponent.rfcValidator,
      ]),
      /**
       * CURP del tercero.
       * Requiere validación adicional mediante `curpValidator`.
       */
      curp: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        TercerosRelacionadosComponent.curpValidator,
      ]),
      /**
       * Control del formulario para el nombre del usuario.
       * Este campo es obligatorio.
       */
      nombre: new FormControl('', [Validators.required]),
      /**
       * Control del formulario para el primer apellido del usuario.
       * Este campo es obligatorio.
       */
      primerApellido: new FormControl('', [Validators.required]),
      /**
       * Control del formulario para el segundo apellido del usuario.
       * Este campo es obligatorio.
       */
      segundoApellido: new FormControl('', [Validators.required]),
      /**
       * Denominación o razón social del tercero.
       */
      denominacionRazonSocial: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      /**
       * País del tercero.
       * Requiere validación adicional mediante `requiredPaisValidator`.
       */
      pais: new FormControl('', [
        Validators.required,
        TercerosRelacionadosComponent.requiredPaisValidator,
      ]),
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
      telefono: new FormControl('', [
        TercerosRelacionadosComponent.telefonoValidator,
      ]),
      /**
       * Correo electrónico del tercero.
       */
      correoElectronico: new FormControl(''),
      /**
       * Código del extranjero.
       */
      extranjeroCodigo: new FormControl('', [Validators.required]),
      /**
       * Estado del extranjero.
       */
      extranjeroEstado: new FormControl('', [Validators.required]),
      /**
       * Colonia del extranjero.
       */
      extranjeroColonia: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Inicializa el formulario para agregar un formulador.
   * Configura los campos del formulario con validaciones y comportamientos específicos.
   */
  initializeAgregarFormuladorFormGroup(): void {
    /**
     * Crea el formulario reactivos para agregar un formulador.
     * Cada campo tiene sus propias validaciones.
     */
    this.agregarFormuladorFormGroup = this.fb.group({
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
      rfc: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        TercerosRelacionadosComponent.rfcValidator,
      ]),
      /**
       * CURP del tercero.
       * Requiere validación adicional mediante `curpValidator`.
       */
      curp: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        TercerosRelacionadosComponent.curpValidator,
      ]),
      /**
       * Control del formulario para el nombre del usuario.
       * Este campo es obligatorio.
       */
      nombre: new FormControl('', [Validators.required]),
      /**
       * Control del formulario para el primer apellido del usuario.
       * Este campo es obligatorio.
       */
      primerApellido: new FormControl('', [Validators.required]),
      /**
       * Control del formulario para el segundo apellido del usuario.
       * Este campo es obligatorio.
       */
      segundoApellido: new FormControl('', [Validators.required]),
      /**
       * Denominación o razón social del tercero.
       */
      denominacionRazonSocial: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      /**
       * País del tercero.
       * Requiere validación adicional mediante `requiredPaisValidator`.
       */
      pais: new FormControl('', [
        Validators.required,
        TercerosRelacionadosComponent.requiredPaisValidator,
      ]),
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
      telefono: new FormControl('', [
        TercerosRelacionadosComponent.telefonoValidator,
      ]),
      /**
       * Correo electrónico del tercero.
       */
      correoElectronico: new FormControl(''),
      /**
       * Código del extranjero.
       */
      extranjeroCodigo: new FormControl('', [Validators.required]),
      /**
       * Estado del extranjero.
       */
      extranjeroEstado: new FormControl('', [Validators.required]),
      /**
       * Colonia del extranjero.
       */
      extranjeroColonia: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Valida el RFC del tercero.
   * Utiliza expresiones regulares para verificar el formato correcto.
   *
   * @param control Control del formulario que contiene el RFC.
   * @returns Un objeto de error si el RFC es inválido, o `null` si es válido.
   */
  onTipoPersonaChange(formGroup: FormGroup): void {
    this.tipoPersonaSelection = formGroup.get('tipoPersona')?.value || '';
    const TIPO_PERSONA_CONTROL = formGroup.get('tipoPersona');
    if (TIPO_PERSONA_CONTROL?.value) {
      formGroup.get('rfc')?.enable();
      formGroup.get('curp')?.enable();
      formGroup.get('denominacionRazonSocial')?.enable();
    } else {
      formGroup.get('rfc')?.disable();
      formGroup.get('curp')?.disable();
      formGroup.get('denominacionRazonSocial')?.disable();
    }
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
      rfc: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        TercerosRelacionadosComponent.rfcValidator,
      ]),
      /**
       * CURP del tercero.
       * Requiere validación adicional mediante `curpValidator`.
       */
      curp: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        TercerosRelacionadosComponent.curpValidator,
      ]),
      /**
       * Control del formulario para el nombre del usuario.
       * Este campo es obligatorio.
       */
      nombre: new FormControl('', [Validators.required]),
      /**
       * Control del formulario para el primer apellido del usuario.
       * Este campo es obligatorio.
       */
      primerApellido: new FormControl('', [Validators.required]),
      /**
       * Control del formulario para el segundo apellido del usuario.
       * Este campo es obligatorio.
       */
      segundoApellido: new FormControl('', [Validators.required]),
      /**
       * Denominación o razón social del tercero.
       */
      denominacionRazonSocial: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      /**
       * País del tercero.
       * Requiere validación adicional mediante `requiredPaisValidator`.
       */
      pais: new FormControl('', [
        Validators.required,
        TercerosRelacionadosComponent.requiredPaisValidator,
      ]),
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
      telefono: new FormControl('', [
        TercerosRelacionadosComponent.telefonoValidator,
      ]),
      /**
       * Correo electrónico del tercero.
       */
      correoElectronico: new FormControl(''),
      /**
       * Código del extranjero.
       */
      extranjeroCodigo: new FormControl('', [Validators.required]),
      /**
       * Estado del extranjero.
       */
      extranjeroEstado: new FormControl('', [Validators.required]),
      /**
       * Colonia del extranjero.
       */
      extranjeroColonia: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Encabezados para la tabla de fabricantes.
   * Utiliza los mismos encabezados definidos en `TERCEROS_RELACIONADOS_TABLE_HEADER_DATA`.
   *
   * @description Estos encabezados definen las columnas que se mostrarán en la tabla de fabricantes.
   */
  fabricanteHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;

  /**
   * Encabezados para la tabla de formuladors.
   * Utiliza los mismos encabezados definidos en `TERCEROS_RELACIONADOS_TABLE_HEADER_DATA`.
   *
   * @description Estos encabezados definen las columnas que se mostrarán en la tabla de formuladors.
   */
  formuladorHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;

  /**
   * Encabezados para la tabla de proveedores.
   * Utiliza los mismos encabezados definidos en `TERCEROS_RELACIONADOS_TABLE_HEADER_DATA`.
   *
   * @description Estos encabezados definen las columnas que se mostrarán en la tabla de proveedores.
   */
  proveedorHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;

  public nacional = false;

  public extranjero = false;

  public noContribuyente = false;

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
   * Datos de las filas para la tabla de formuladors.
   * Inicialmente vacío, se llenará con los datos agregados por el usuario.
   *
   * @description Este arreglo almacena las filas que se mostrarán en la tabla de formuladors.
   */
  formuladorRowData: TablaDatos[] = [];

  /**
   * Datos de las filas para la tabla de proveedores.
   * Inicialmente vacío, se llenará con los datos agregados por el usuario.
   *
   * @description Este arreglo almacena las filas que se mostrarán en la tabla de proveedores.
   */
  proveedorRowData: TablaDatos[] = [];

  /**
   * Maneja el cambio en los checkboxes para seleccionar el tipo de persona.
   * Actualiza los indicadores `fisica` y `moral` según el checkbox seleccionado.
   *
   * @param checkBoxName Nombre del checkbox seleccionado (fisica o moral).
   */
  public inputChecked(checkBoxName: string): void {
    if (checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
      this.noContribuyente = false;
    } else if (checkBoxName === 'moral') {
      this.fisica = false;
      this.moral = true;
      this.noContribuyente = false;
    } else {
      this.noContribuyente = true;
      this.fisica = false;
      this.moral = false;
    }
  }

  public tercerosInputChecked(checkBoxName: string): void {
    if (checkBoxName === 'nacional') {
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
   * Cambia la visibilidad del formulario de Formulador.
   * Oculta la tabla principal y muestra el formulario, también resetea los valores de persona física y moral.
   */
  toggleDivFormulador(): void {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showFormulador = !this.showFormulador;
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
   * Envía el formulario de Fabricante y actualiza los datos en el store.
   * Obtiene los valores seleccionados de los dropdowns y crea una nueva fila para la tabla.
   *
   * @description Este método es llamado al enviar el formulario de agregar un fabricante.
   */
  submitFabricanteForm(): void {
    /**
     * Obtiene el valor de la localidad seleccionada en el formulario.
     */
    const LOCALIDAD_VALOR = this.localidadDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarFabricanteFormGroup.value.localidad
    )?.descripcion;

    /**
     * Obtiene el valor del municipio seleccionado en el formulario.
     */
    const MUNICIPIO_VALOR = this.municipioDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarFabricanteFormGroup.value.municipioAlcaldia
    )?.descripcion;

    /**
     * Obtiene el valor del código postal seleccionado en el formulario.
     */
    const CODIGO_POSTAL_VALOR = this.codigoPostalDropdownData.find(
      (item: Catalogo) =>
        item.id ===
        this.agregarFabricanteFormGroup.value.codigoPostaloEquivalente
    )?.descripcion;

    /**
     * Obtiene el valor de la colonia seleccionada en el formulario.
     */
    const COLONIA_VALOR = this.coloniaDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarFabricanteFormGroup.value.colonia
    )?.descripcion;

    /**
     * Crea una nueva fila para la tabla de fabricantes.
     * Esta fila contiene los datos del formulario de agregar un fabricante.
     *
     * @description Esta fila se agrega a la lista de filas del fabricante.
     */
    const FABRICANTE_FILA = {
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
        this.agregarFabricanteFormGroup.value.pais,

        /**
         * Colonia del fabricante.
         */
        COLONIA_VALOR,

        /**
         * Municipio del fabricante.
         */
        MUNICIPIO_VALOR,

        /**
         * Localidad del fabricante.
         */
        LOCALIDAD_VALOR,

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
        CODIGO_POSTAL_VALOR,
      ],
    };

    /**
     * Agrega la nueva fila a la lista de filas del fabricante.
     */
    this.fabricanteRowData.push(FABRICANTE_FILA);

    /**
     * Actualiza el estado del store con los nuevos datos del fabricante.
     */
    this.tercerosFabricanteStore.setFabricante(this.fabricanteRowData);

    /**
     * Cambia la visibilidad de las secciones del componente.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showFabricante = !this.showFabricante;
  }

  /**
   * Envía el formulario de Formulador y actualiza los datos en el store.
   * Obtiene los valores seleccionados de los dropdowns y crea una nueva fila para la tabla.
   *
   * @description Este método es llamado al enviar el formulario de agregar un formulador.
   */
  submitFormuladorForm(): void {
    /**
     * Obtiene el valor de la localidad seleccionada en el formulario.
     */
    const LOCALIDAD_VALOR = this.localidadDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarFormuladorFormGroup.value.localidad
    )?.descripcion;

    /**
     * Obtiene el valor del municipio seleccionado en el formulario.
     */
    const MUNICIPIO_VALOR = this.municipioDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarFormuladorFormGroup.value.municipioAlcaldia
    )?.descripcion;

    /**
     * Obtiene el valor del código postal seleccionado en el formulario.
     */
    const CODIGO_POSTAL_VALOR = this.codigoPostalDropdownData.find(
      (item: Catalogo) =>
        item.id ===
        this.agregarFormuladorFormGroup.value.codigoPostaloEquivalente
    )?.descripcion;

    /**
     * Obtiene el valor de la colonia seleccionada en el formulario.
     */
    const COLONIA_VALOR = this.coloniaDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarFormuladorFormGroup.value.colonia
    )?.descripcion;

    /**
     * Crea una nueva fila para la tabla de formuladors.
     * Esta fila contiene los datos del formulario de agregar un formulador.
     *
     * @description Esta fila se agrega a la lista de filas del formulador.
     */
    const FORMULADOR_FILA = {
      /**
       * Datos de la fila que se mostrarán en la tabla.
       * Cada elemento del arreglo corresponde a una columna de la tabla.
       */
      tbodyData: [
        /**
         * Denominación o razón social del formulador.
         */
        this.agregarFormuladorFormGroup.value.denominacionRazonSocial,

        /**
         * RFC del formulador.
         */
        this.agregarFormuladorFormGroup.value.rfc,

        /**
         * CURP del formulador.
         */
        this.agregarFormuladorFormGroup.value.curp,

        /**
         * Teléfono del formulador, incluyendo lada.
         */
        this.agregarFormuladorFormGroup.value.lada +
          '-' +
          this.agregarFormuladorFormGroup.value.telefono,

        /**
         * Correo electrónico del formulador.
         */
        this.agregarFormuladorFormGroup.value.correoElectronico,

        /**
         * Calle del formulador.
         */
        this.agregarFormuladorFormGroup.value.calle,

        /**
         * Número exterior del formulador.
         */
        this.agregarFormuladorFormGroup.value.numeroExterior,

        /**
         * Número interior del formulador.
         */
        this.agregarFormuladorFormGroup.value.numeroInterior,

        /**
         * País del formulador.
         */
        this.agregarFormuladorFormGroup.value.pais,

        /**
         * Colonia del formulador.
         */
        COLONIA_VALOR,

        /**
         * Municipio del formulador.
         */
        MUNICIPIO_VALOR,

        /**
         * Localidad del formulador.
         */
        LOCALIDAD_VALOR,

        /**
         * Entidad federativa del formulador.
         */
        this.agregarFormuladorFormGroup.value.entidadFederativa,

        /**
         * Estado o localidad del formulador.
         */
        this.agregarFormuladorFormGroup.value.estadoLocalidad,

        /**
         * Código postal del formulador.
         */
        CODIGO_POSTAL_VALOR,
      ],
    };

    /**
     * Agrega la nueva fila a la lista de filas del formulador.
     */
    this.formuladorRowData.push(FORMULADOR_FILA);

    /**
     * Actualiza el estado del store con los nuevos datos del formulador.
     */
    this.tercerosFabricanteStore.setFormulador(this.formuladorRowData);

    /**
     * Cambia la visibilidad de las secciones del componente.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showFormulador = !this.showFormulador;
  }

  /**
   * Envía el formulario de Proveedor y actualiza los datos en el store.
   * Crea una nueva fila para la tabla con los datos del formulario.
   *
   * @description Este método es llamado al enviar el formulario de agregar un proveedor.
   */
  submitProveedorForm(): void {
    /**
     * Obtiene el valor de la localidad seleccionada en el formulario.
     */
    const LOCALIDAD_VALOR = this.localidadDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarProveedorFormGroup.value.localidad
    )?.descripcion;

    /**
     * Obtiene el valor del municipio seleccionado en el formulario.
     */
    const MUNICIPIO_VALOR = this.municipioDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarProveedorFormGroup.value.municipioAlcaldia
    )?.descripcion;

    /**
     * Obtiene el valor del código postal seleccionado en el formulario.
     */
    const CODIGO_POSTAL_VALOR = this.codigoPostalDropdownData.find(
      (item: Catalogo) =>
        item.id ===
        this.agregarProveedorFormGroup.value.codigoPostaloEquivalente
    )?.descripcion;

    /**
     * Obtiene el valor de la colonia seleccionada en el formulario.
     */
    const COLONIA_VALOR = this.coloniaDropdownData.find(
      (item: Catalogo) =>
        item.id === this.agregarProveedorFormGroup.value.colonia
    )?.descripcion;

    /**
     * Crea una nueva fila para la tabla de proveedor.
     * Esta fila contiene los datos del formulario de agregar un proveedor.
     *
     * @description Esta fila se agrega a la lista de filas del proveedor.
     */
    const PROVEEDOR_FILA = {
      /**
       * Datos de la fila que se mostrarán en la tabla.
       * Cada elemento del arreglo corresponde a una columna de la tabla.
       */
      tbodyData: [
        /**
         * Denominación o razón social del proveedor.
         */
        this.agregarProveedorFormGroup.value.denominacionRazonSocial,

        /**
         * RFC del proveedor.
         */
        this.agregarProveedorFormGroup.value.rfc,

        /**
         * CURP del proveedor.
         */
        this.agregarProveedorFormGroup.value.curp,

        /**
         * Teléfono del proveedor, incluyendo lada.
         */
        this.agregarProveedorFormGroup.value.lada +
          '-' +
          this.agregarProveedorFormGroup.value.telefono,

        /**
         * Correo electrónico del proveedor.
         */
        this.agregarProveedorFormGroup.value.correoElectronico,

        /**
         * Calle del proveedor.
         */
        this.agregarProveedorFormGroup.value.calle,

        /**
         * Número exterior del proveedor.
         */
        this.agregarProveedorFormGroup.value.numeroExterior,

        /**
         * Número interior del proveedor.
         */
        this.agregarProveedorFormGroup.value.numeroInterior,

        /**
         * País del proveedor.
         */
        this.agregarProveedorFormGroup.value.pais,

        /**
         * Colonia del proveedor.
         */
        COLONIA_VALOR,

        /**
         * Municipio del proveedor.
         */
        MUNICIPIO_VALOR,

        /**
         * Localidad del proveedor.
         */
        LOCALIDAD_VALOR,

        /**
         * Entidad federativa del proveedor.
         */
        this.agregarProveedorFormGroup.value.entidadFederativa,

        /**
         * Estado o localidad del proveedor.
         */
        this.agregarProveedorFormGroup.value.estadoLocalidad,

        /**
         * Código postal del proveedor.
         */
        CODIGO_POSTAL_VALOR,
      ],
    };

    /**
     * Agrega la nueva fila a la lista de filas del proveedor.
     */
    this.proveedorRowData.push(PROVEEDOR_FILA);

    /**
     * Actualiza el estado del store con los nuevos datos del proveedor.
     */
    this.tercerosFabricanteStore.setProveedor(this.proveedorRowData);

    /**
     * Cambia la visibilidad de las secciones del componente.
     */
    this.showTableDiv = !this.showTableDiv;
    this.showProveedor = !this.showProveedor;
  }

  /**
   * Validador personalizado para verificar que el país seleccionado no esté vacío ni sea '-1'.
   *
   * @param control Control del formulario a validar.
   * @returns Nulo si el valor es válido, de lo contrario devuelve un objeto con la propiedad `requiredPais`.
   */
  static requiredPaisValidator(
    control: AbstractControl
  ): ValidationErrors | null {
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
  static rfcValidator(control: AbstractControl): ValidationErrors | null {
    return REGEX_RFC_FISICA.test(control.value) ||
      REGEX_RFC_MORAL.test(control.value)
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
  static curpValidator(control: AbstractControl): ValidationErrors | null {
    return REGEX_CURP.test(control.value) ? null : { invalidCURP: true };
  }

  /**
   * Validador para verificar que el teléfono sea válido.
   * Utiliza una expresión regular que permite números, letras, guiones, paréntesis y espacios.
   *
   * @param control Control del formulario a validar.
   * @returns Nulo si el teléfono es válido, de lo contrario devuelve un objeto con la propiedad `invalidTelefono`.
   */
  static telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const PATTERN = REGEX_SOLO_NUMEROS;
    return PATTERN.test(control.value) ? null : { invalidTelefono: true };
  }

  /**
   * Cambia el valor del radio button seleccionado.
   *
   * @param value Valor seleccionado del radio button.
   */
  cambiarRadio(value: string | number): void {
    const VALOR_SELECCIONADO = value as string;
    this.tercerosInputChecked(VALOR_SELECCIONADO);
  }

  /**
   * Cambia el valor del radio button seleccionado.
   *
   * @param value Valor seleccionado del radio button.
   */
  cambiarRadioFisica(value: string | number): void {
    const VALOR_SELECCIONADO = value as string;
    this.inputChecked(VALOR_SELECCIONADO);
  }

  /**
  * @method limpiar
  * @description
  * Método que limpia los valores de un formulario reactivo.
  */
  // eslint-disable-next-line class-methods-use-this
  public limpiar(forma: FormGroup): void {
    forma.reset();
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
