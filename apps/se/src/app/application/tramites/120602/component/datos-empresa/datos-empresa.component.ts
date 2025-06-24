import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  AlertComponent,
  BtnContinuarComponent,
  Catalogo,
  ConsultaioQuery,
  DatosPasos,
  ListaPasosWizard,
  TituloComponent
} from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

/* eslint-disable */
import DatosSucursal from 'libs/shared/theme/assets/json/120602/branchSelData.json';
import ExtranjerosDatos from 'libs/shared/theme/assets/json/120602/extranjeros.json';
import TableDataDatos from 'libs/shared/theme/assets/json/120602/table-data.json';
import radioButtonMexicana from 'libs/shared/theme/assets/json/120602/radio-button-mexicana.json';
import radioButtonPersona from 'libs/shared/theme/assets/json/120602/radio-button-mexicana.json';
import dropDown from 'libs/shared/theme/assets/json/120602/drop-down.json'


import { DATOS_EMPRESA } from '@ng-mf/data-access-user';
import { Tramite120602Query } from '../../../../estados/queries/tramite120602.query';

import { Solicitud120602State, Tramite120602Store } from '../../../../estados/tramites/tramite120602.store';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InputRadioComponent } from '@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';

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
export class DatosEmpresaComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos de la empresa.
   */
  public formularioEmpresa!: FormGroup;

  /**
   * Catálogo de opciones federales y estatales.
   */
  public federalEstatal!: Catalogo[];

  /**
  * Valor seleccionado Persona en el formulario.
  */
  public valorSeleccionadoPersona: string = '';

  /**
   * La propiedad pública 'tipoSeleccionTabla' es de tipo 'TablaSeleccion'.
   * Se inicializa con el valor 'TablaSeleccion.CHECKBOX'.
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
  public DATOS_EMPRESA: string = DATOS_EMPRESA;

  /**
     * Índice del paso actual en el formulario.
     */
  public indice: number = 1;

  /**
   * Lista de pasos del asistente.
   */
  private pasos: ListaPasosWizard[] = [];

  /**
 * @property solicitudState
 * @description
 * Estado actual de la solicitud de la empresa para el trámite 120602.
 * @type {Solicitud120602State}
 */
  public solicitudState!: Solicitud120602State;

  /**
 * @property destroyNotifier$
 * @description
 * Sujeto utilizado para notificar la destrucción del componente y cancelar suscripciones activas.
 * @type {Subject<void>}
 */
  private destroyNotifier$: Subject<void> = new Subject();

   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 

  /**
  * Constructor de la clase.
  * @param fb - Instancia de FormBuilder para construir formularios reactivos.
  */
  constructor(private fb: FormBuilder,
    private tramite120602Store: Tramite120602Store,
    private tramite120602Query: Tramite120602Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
   }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();

    this.inicializarFormulario();
    this.obtenerFederalEstatal();
  }

  /**
  * Inicializa el formulario reactivo de la empresa.
  */
  private inicializarFormulario(): void {
    this.tramite120602Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe((data) => {
    });
    this.formularioEmpresa = this.fb.group({
      estado: [{value: this.solicitudState.estado, disabled: true}],
      representacionFederal: [this.solicitudState.representacionFederal, Validators.required],
      tipoEmpresa: [this.solicitudState.tipoEmpresa],
      especifique: [{ value: this.solicitudState?.especifique || '', disabled: true }, Validators.maxLength(20)],
      actividadEconomicaPreponderante: [this.solicitudState.actividadEconomicaPreponderante],
      descripcion: [{ value: this.solicitudState.descripcion || '', disabled: true }],

      // Dirección
      pais: [{ value: this.solicitudState.pais ||'', disabled: true }],
      codigoPostal: [{ value:this.solicitudState.codigoPostal || '', disabled: true }],
      estadoDomicilio: [{ value: this.solicitudState.estadoDomicilio ||'', disabled: true }],
      municipioAlcaldia: [{ value: this.solicitudState.municipioAlcaldia ||'', disabled: true }],
      localidad: [{ value: this.solicitudState.localidad ||'', disabled: true }],
      colonia: [{ value: this.solicitudState.colonia ||'', disabled: true }],
      calle: [{ value: this.solicitudState.calle ||'', disabled: true }],
      numeroExterior: [{ value: this.solicitudState.numeroExterior ||'', disabled: true }],
      numeroInterior: [{ value: this.solicitudState.numeroInterior ||'', disabled: true }],

      // Contacto
      lada: [{ value: this.solicitudState.lada ||'', disabled: true }],
      telefono: [{ value: this.solicitudState.telefono ||'', disabled: true }],
      nacionalidad: [this.solicitudState.nacionalidad],
      tipoDePersona: [this.solicitudState.tipoDePersona],


      // Detalles de la empresa
      taxId: [this.solicitudState.taxId, Validators.required],
      denominacion: [this.solicitudState.denominacion],
      datosPais: [this.solicitudState.datosPais, Validators.required],
      datosCodigoPostal: [this.solicitudState.datosCodigoPostal],
      datosEstado: [this.solicitudState.datosEstado],
      correoElectronico: [this.solicitudState.correoElectronico],
    });
    if (this.esFormularioSoloLectura) {
      Object.keys(this.formularioEmpresa.controls).forEach(control => {
        this.formularioEmpresa.get(control)?.disable();
      });
    }
  }

  /**
    * Obtiene las opciones del catálogo federal y estatal.
    */
  obtenerFederalEstatal(): void {
    if(dropDown && dropDown.listaDesplegable){
    this.federalEstatal = dropDown.listaDesplegable;
    }
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

  /**
   * @method cambioDeRadio
   * @description
   * Maneja el cambio de valor en un control tipo radio button dentro del formulario de empresa.
   * 
   * Detalles:
   * - Actualiza el valor del campo correspondiente en el formulario reactivo `formularioEmpresa`.
   * - Llama al método `setValoresStore` para actualizar el valor en el store, asegurando que el estado global refleje el cambio.
   * 
   * @param {number | string} event - Valor seleccionado del radio button.
   * @param {string} campo - Nombre del campo del formulario que se va a actualizar.
   * @param {keyof Tramite120602Store} metodoNombre - Nombre del método del store que se debe invocar para actualizar el valor.
   * 
   * @example
   * this.cambioDeRadio('opcion1', 'tipoEmpresa', 'setTipoEmpresa');
   * // Actualiza el campo 'tipoEmpresa' en el formulario y en el store con el valor 'opcion1'.
   */
  cambioDeRadio(event: number| string, campo: string, metodoNombre: keyof Tramite120602Store): void {
    this.formularioEmpresa.get(campo)?.setValue(event);
    this.setValoresStore(this.formularioEmpresa, campo, metodoNombre);
  }
  /**
   * @method setValoresStore
   * @description
   * Actualiza el valor de un campo en el store `Tramite120602Store` a partir del valor actual en el formulario reactivo.
   * 
   * Detalles:
   * - Obtiene el valor del campo especificado desde el formulario `form`.
   * - Invoca el método correspondiente del store (`metodoNombre`) para actualizar el estado global con el nuevo valor.
   * 
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a actualizar.
   * @param {string} campo - Nombre del campo del formulario cuyo valor se va a obtener.
   * @param {keyof Tramite120602Store} metodoNombre - Nombre del método del store que se debe invocar para actualizar el valor.
   * 
   * @example
   * this.setValoresStore(this.formularioEmpresa, 'tipoEmpresa', 'setTipoEmpresa');
   * // Actualiza el valor de 'tipoEmpresa' en el store con el valor actual del formulario.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite120602Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite120602Store[metodoNombre] as (value: any) => void)(valor);
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
