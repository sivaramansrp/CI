import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  AlertComponent,
  BtnContinuarComponent,
  Catalogo,
  CatalogoSelectComponent,
  DatosPasos,
  InputRadioComponent,
  ListaPasosWizard,
  TituloComponent
} from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';

import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import DatosSucursal from 'libs/shared/theme/assets/json/120602/branchSelData.json';
import ExtranjerosDatos from 'libs/shared/theme/assets/json/120602/extranjeros.json';
import TableDataDatos from 'libs/shared/theme/assets/json/120602/table-data.json';
import radioButtonMexicana from 'libs/shared/theme/assets/json/120602/radio-button-mexicana.json';
import radioButtonPersona from 'libs/shared/theme/assets/json/120602/radio-button-mexicana.json';

import { DATOS_EMPRESA } from 'libs/shared/data-access-user/src/tramites/constantes/120602/datos-empresa.enum';

/**
 * Metadatos del componente 'DatosEmpresaComponent'.
 */
@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    AlertComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    BtnContinuarComponent
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.scss',
})
export class DatosEmpresaComponent implements OnInit {
  /**
   * Formulario reactivo para los datos de la empresa.
   */
  public formularioEmpresa!: FormGroup;

  /**
   * Catálogo de opciones federales y estatales.
   */
  public federalEstatal!: Catalogo[];

  /**
   * Valor seleccionado Nacionalidad en el formulario.
   */

  public valorSeleccionadoNacionalidad: string = '';

  /**
  * Valor seleccionado Persona en el formulario.
  */
  public valorSeleccionadoPersona: string = '';

  /**
 * The 'tipoSeleccionTabla' is a public property of the 'TablaSeleccion' type.
 * It is initialized with the value 'TablaSeleccion.CHECKBOX'.
 */
  public tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
  * Datos de la tabla para extranjeros.
  */
  public datosTablaExtranjeros = ExtranjerosDatos;

  /**
  * Datos generales de la tabla.
  */
  public datosGenerales = TableDataDatos;

  /**
   * Datos de la tabla para sucursales.
   */
  public tablaDatosSucursal = DatosSucursal;

  /**
   * Opciones de selección para mexicana.
   */
  public opcionSeleccionMexicana = radioButtonMexicana;

  /**
  * Opciones de selección para persona.
  */
  public opcionSeleccionPersona = radioButtonPersona

  /**
  * Datos de la empresa.
  */
  DATOS_EMPRESA: string = DATOS_EMPRESA;

  /**
     * Índice del paso actual en el formulario.
     */
  indice: number = 1;

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = [];

  /**
  * Constructor de la clase.
  * @param fb - Instancia de FormBuilder para construir formularios reactivos.
  */
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) { }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerFederalEstatal();
    this.llenarValoresPredeterminados();
  }

  /**
  * Inicializa el formulario reactivo de la empresa.
  */
  private inicializarFormulario(): void {
    this.formularioEmpresa = this.fb.group({
      estado: [null],
      representacionFederal: [null, Validators.required],
      tipoEmpresa: [null],
      especifique: [{ value: '', disabled: true }, Validators.maxLength(20)],
      actividadEconomicaPreponderante: [''],
      descripcion: [{ value: '', disabled: true }],

      // Dirección
      pais: [{ value: '', disabled: true }],
      codigoPostal: [{ value: '', disabled: true }],
      estadoDomicilio: [{ value: '', disabled: true }],
      municipioAlcaldia: [{ value: '', disabled: true }],
      localidad: [{ value: '', disabled: true }],
      colonia: [{ value: '', disabled: true }],
      calle: [{ value: '', disabled: true }],
      numeroExterior: [{ value: '', disabled: true }],
      numeroInterior: [{ value: '', disabled: true }],

      // Contacto
      lada: [{ value: '', disabled: true }],
      telefono: [{ value: '', disabled: true }],


      // Detalles de la empresa
      taxId: ['', Validators.required],
      denominacion: [''],
      datosPais: [null, Validators.required],
      datosCodigoPostal: [''],
      datosEstado: [''],
      correoElectronico: [''],
    });
  }

  /**
   * Llena los valores predeterminados del formulario.
   */
  llenarValoresPredeterminados(): void {
    this.formularioEmpresa.get('pais')?.setValue('ESTADOS UNIDOS MEXICANOS');
    this.formularioEmpresa.get('codigoPostal')?.setValue('32679');
    this.formularioEmpresa.get('estado')?.setValue('CHIHUAHUA');
    this.formularioEmpresa.get('municipioAlcaldia')?.setValue('JUAREZ');
    this.formularioEmpresa.get('colonia')?.setValue('PARQUE INDUSTRIAL AZTECA');
    this.formularioEmpresa.get('calle')?.setValue('AV PARQUE INDUSTRIAL AZTECAS');
    this.formularioEmpresa.get('numeroExterior')?.setValue('1550');
  }

  /**
    * Obtiene las opciones del catálogo federal y estatal.
    */
  obtenerFederalEstatal(): void {
    this.federalEstatal = [
      { id: 1, descripcion: 'CHIHUAHUA' },
      { id: 2, descripcion: 'CIUDAD JUAREZ' }
    ];
  }

  /**
 * Maneja el evento de cambio de valor para la nacionalidad.
 *
 * @param value - El nuevo valor seleccionado para la nacionalidad.
 */
  nacionalidad(value: string): void {
    this.valorSeleccionadoNacionalidad = value;
  }

  /**
 * Maneja el evento de cambio de valor para el tipo de persona.
 *
 * @param value - El nuevo valor seleccionado para el tipo de persona.
 */
  persona(value: string): void {
    this.valorSeleccionadoPersona = value;
  }

  /**
  * Configuración de columnas para la tabla.
  */
  public configuracionTabla: ConfiguracionColumna<{ rfc: string; curp: string; nombre: string; apellidoPaterno: string; apellidoMaterno: string }>[] = [
    { encabezado: 'RFC', clave: (item) => item.rfc, orden: 1 },
    { encabezado: 'CURP', clave: (item) => item.curp, orden: 2 },
    { encabezado: 'Nombre', clave: (item) => item.nombre, orden: 3 },
    { encabezado: 'Apellido Paterno', clave: (item) => item.apellidoPaterno, orden: 4 },
    { encabezado: 'Apellido Materno', clave: (item) => item.apellidoMaterno, orden: 5 }
  ];

  /**
   * Configuración de columnas para la tabla de direcciones.
   */
  public tableHeader: ConfiguracionColumna<{ calle: string; númeroExterior: string; númeroInterior: string; códigoPostal: string; colonia: string; municipioAlcaldia: string; estado: string }>[] = [
    { encabezado: 'Calle', clave: (item) => item.calle, orden: 1 },
    { encabezado: 'Número exterior', clave: (item) => item.númeroExterior, orden: 2 },
    { encabezado: 'Número interior', clave: (item) => item.númeroInterior, orden: 3 },
    { encabezado: 'Código postal', clave: (item) => item.códigoPostal, orden: 4 },
    { encabezado: 'Colonia', clave: (item) => item.colonia, orden: 5 },
    { encabezado: 'Municipio o alcaldía', clave: (item) => item.municipioAlcaldia, orden: 6 },
    { encabezado: 'Estado', clave: (item) => item.estado, orden: 7 }
  ];

  /**
   * Configuración de columnas para la tabla de extranjeros.
   */

  public tableHeaderExtranjeros: ConfiguracionColumna<{ taxId: string; razonSocial: string; nombre: string; apellidoPaterno: string; pais: string; cp: string; estado: string }>[] = [
    { encabezado: 'TAX ID', clave: (item) => item.taxId, orden: 1 },
    { encabezado: 'Razón social', clave: (item) => item.razonSocial, orden: 2 },
    { encabezado: 'Nombre', clave: (item) => item.nombre, orden: 3 },
    { encabezado: 'Apellido paterno', clave: (item) => item.apellidoPaterno, orden: 4 },
    { encabezado: 'País', clave: (item) => item.pais, orden: 5 },
    { encabezado: 'CP', clave: (item) => item.cp, orden: 6 },
    { encabezado: 'Estado', clave: (item) => item.estado, orden: 7 }
  ];

  /**
   * Datos de pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // El número de pasos se obtiene dinámicamente de la lista `pasos`
    indice: this.indice, // Índice del paso actual en el formulario
    txtBtnAnt: 'Anterior', // Texto para el botón de retroceso
    txtBtnSig: 'Continuar', // Texto para el botón de siguiente
  };
}
