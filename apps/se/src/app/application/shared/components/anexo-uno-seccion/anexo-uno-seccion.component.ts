/*
/AnexoUnoSeccionComponent
*/
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Subject, takeUntil } from 'rxjs';

import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import { AnexoUnoEncabezado } from '../../models/nuevo-programa-industrial.model';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ANEXO_FRACION_ANARELARIA,
  ANEXO_I_SERVICIO_CATALOGO,
  COMPLEMENTAR_FRACCION_CATALOGO_DATOS,
  PAIS_DESTINO_CATALOG,
  TABLA_ANEXO_PRODUCTO_FRACCION,
  TABLA_PROYECTO_IMMEX,
  TABLE_PROVEEDOR_CLIENTE,
} from '../../constantes/complementos-seccion.enum';
import {
  AnexoFraccionAnarelaria,
  AnexoUnoProducto,
  ProveedorCliente,
  ProyectoImmex,
} from '../../models/complimentos-seccion.model';

import { ANEXO_UNO_ALERTA } from '../../constantes/anexo-dos-y-tres.enum';
import { ComplementosSeccionState, ComplementosSeccionStore } from '../../../estados/tramites/complementos-seccion.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ComplementosSeccionQuery } from '../../../estados/queries/complementos-seccion.query';
/**
 * compodoc
 * @class AnexoUnoSeccionComponent
 * @description Componente que gestiona la sección del Anexo Uno. Este componente incluye formularios y tablas dinámicas para capturar y mostrar datos relacionados con el Anexo Uno.
 */
@Component({
  selector: 'app-anexo-uno-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    AlertComponent,
  ],
  templateUrl: './anexo-uno-seccion.component.html',
  styleUrl: './anexo-uno-seccion.component.scss',
})
/*
  * Componente que gestiona la sección del Anexo Uno. Este componente incluye formularios y tablas dinámicas para capturar y mostrar datos relacionados con el Anexo Uno.
  *
  * @class AnexoUnoSeccionComponent
  * @implements {OnInit, OnDestroy}
  */

export class AnexoUnoSeccionComponent implements OnInit, OnDestroy {
  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
 /**
  *  * compodoc
 * @property {Subject<void>} destroyNotifier$
 * Notificador utilizado para manejar la destrucción o desuscripción de observables.
 * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
 */
private destroyNotifier$: Subject<void> = new Subject();

/**
 *  * compodoc
 * @property {FormGroup} anexoDosFormGroup
 * Formulario reactivo utilizado para capturar datos relacionados con el Anexo Dos.
 */
public anexoDosFormGroup!: FormGroup;

/**
 *  * compodoc
 * @property {FormGroup} proyectoForm
 * Formulario reactivo utilizado para capturar datos relacionados con el Proyecto IMMEX.
 */
public proyectoForm!: FormGroup;

/**
 *  * compodoc
 * @property {FormGroup} anexoUnoFormGroup
 * Formulario reactivo utilizado para capturar datos relacionados con el Anexo Uno.
 */
public anexoUnoFormGroup!: FormGroup;

/**
 *  * compodoc
 * @property {FormGroup} formularioProveedorCliente
 * Formulario reactivo utilizado para capturar datos de proveedores y clientes.
 */
public formularioProveedorCliente!: FormGroup;
  /** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
  esFormularioSoloLectura: boolean = false;
/**
 * 
 * @constructor
 * @description Constructor que inicializa el componente y el servicio FormBuilder para crear formularios reactivos.
 * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
 */
constructor(private fb: FormBuilder,
  private complementosSeccionStore: ComplementosSeccionStore,
      private complementosSeccionQuery: ComplementosSeccionQuery,
        private consultaioQuery: ConsultaioQuery
){ 
       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe();
    }
/**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
  }
 /**
   * Método para inicializar el formulario reactivo con los datos de la solicitud.
   * 
   * Este método configura los campos del formulario con los valores actuales del estado de la solicitud
   * y aplica las validaciones necesarias. También deshabilita ciertos campos y establece valores predeterminados.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.crearFormularioAnexoUno();
    }  
  }
    /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
      this.crearFormularioAnexoUno();
      if (this.esFormularioSoloLectura) {
        this.anexoUnoFormGroup.disable();
        this.formularioProveedorCliente.disable(); 
        this.proyectoForm.disable(); 
        this.anexoDosFormGroup.disable();   
         this.complimentarForm.disable();      
      } else {
        this.anexoUnoFormGroup.enable();  
        this.formularioProveedorCliente.enable();
        this.proyectoForm.enable();
        this.anexoDosFormGroup.enable();     
        this.complimentarForm.enable(); 
      }
  }
/**
 * @method actualizarControl
 * @description Actualiza dinámicamente el valor de un control en un formulario específico y lo sincroniza con la tienda o servicio correspondiente.
 * @param {string} formName - El nombre del formulario que contiene el control.
 * @param {string} controlName - El nombre del control que se desea actualizar.
 */
actualizarControl(formName: string, controlName: string): void {
  let formGroup: FormGroup;

  // Determinar qué formulario utilizar
  switch (formName) {
    case 'anexoUnoFormGroup':
      formGroup = this.anexoUnoFormGroup;
      break;
    case 'formularioProveedorCliente':
      formGroup = this.formularioProveedorCliente;
      break;
    case 'proyectoForm':
      formGroup = this.proyectoForm;
      break;
    case 'anexoDosFormGroup':
      formGroup = this.anexoDosFormGroup;
      break;
    case 'complimentarForm':
      formGroup = this.complimentarForm;
      break;
    default:
      console.warn('Formulario no encontrado:', formName);
      return;
  }

  // Obtener el valor actualizado del control
  const UPDATED_VALUE = {
    [controlName]: formGroup.get(controlName)?.value,
  };

  // Actualizar la tienda o el servicio con el valor actualizado
  this.complementosSeccionStore.update(UPDATED_VALUE);

  
}
/**
 *  * compodoc
 * @method ngOnDestroy
 * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 * Se utiliza para limpiar las suscripciones activas y liberar recursos.
 */
ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}

/**
 *  * compodoc
 * @property {Catalogo[]} catagoriaSeleccionDatos
 * Datos del catálogo utilizados para la selección de categorías en la sección de complementos.
 */
catagoriaSeleccionDatos: Catalogo[] = COMPLEMENTAR_FRACCION_CATALOGO_DATOS;

/**
 *  * compodoc
 * @property {ProyectoImmex[]} proyectoImmexTablaLista
 * Lista de datos relacionados con el Proyecto IMMEX que se muestran en la tabla dinámica.
 */
proyectoImmexTablaLista: ProyectoImmex[] = [];

/**
 *  * compodoc
 * @property {AnexoUnoProducto[]} anexoUnoTablaLista
 * Lista de productos del Anexo Uno que se muestran en la tabla dinámica.
 */
anexoUnoTablaLista: AnexoUnoProducto[] = [];

/**
 *  * compodoc
 * @property {ProveedorCliente[]} proveedorTablaLista
 * Lista de datos de proveedores y clientes que se muestran en la tabla dinámica.
 */
proveedorTablaLista: ProveedorCliente[] = [];

/**
 *  * compodoc
 * @property {AnexoUnoEncabezado[]} fracionArancelaria
 * Lista de encabezados relacionados con las fracciones arancelarias.
 */
fracionArancelaria: AnexoUnoEncabezado[] = [];

/**
 *  * compodoc
 * @property {AnexoFraccionAnarelaria[]} anexoFraccionAnarelaria
 * Lista de datos relacionados con las fracciones arancelarias en el Anexo.
 */
anexoFraccionAnarelaria: AnexoFraccionAnarelaria[] = [];

/**
 *  * compodoc
 * @property {string} anexoUnoAlerta
 * Mensaje de alerta utilizado en la sección del Anexo Uno.
 */
public anexoUnoAlerta = ANEXO_UNO_ALERTA;
  /**
   * Formulario para complementar fracción.
   */
  public complimentarForm!: FormGroup;
/**
 *  * compodoc
 * @method agregarAnexoUno
 * @description Método que agrega un nuevo producto al Anexo Uno. Valida el formulario y, si es válido, agrega los datos a la lista de productos del Anexo Uno.
 */
agregarAnexoUno(): void {
  if (this.anexoUnoFormGroup.valid) {
    const FORM_DATA = this.anexoUnoFormGroup.value;

    this.anexoUnoTablaLista.push(FORM_DATA);

    this.anexoUnoFormGroup.reset();
  }
}

/**
 *  * compodoc
 * @method agregarFraccionAnarelaria
 * @description Método que agrega una nueva fracción arancelaria al Anexo Dos. Valida el formulario y, si es válido, agrega los datos a la lista de fracciones arancelarias.
 */
agregarFraccionAnarelaria(): void {
  if (this.anexoDosFormGroup.valid) {
    const FORM_DATA = this.anexoDosFormGroup.value;
    this.anexoFraccionAnarelaria.push(FORM_DATA);
    this.anexoDosFormGroup.reset();
  } else {
    console.warn('El formulario no es válido. Por favor, complete todos los campos requeridos.');
  }
}

/**
 *  * compodoc
 * @method agregarProyectoImmex
 * @description Método que agrega un nuevo proyecto IMMEX. Valida el formulario y, si es válido, transforma los datos para que coincidan con la configuración de la tabla y los agrega a la lista de proyectos IMMEX.
 */
agregarProyectoImmex(): void {
  if (this.proyectoForm.valid) {
    const FORM_DATA = this.proyectoForm.value;

    // Transformar los datos del formulario para que coincidan con la configuración de la tabla
    const TRANSFORMED_DATA = {
      encabezadoFraccion: FORM_DATA.descripcion, // Mapea 'descripcion' a 'encabezadoFraccion'
      encabezadoTipoDocument: FORM_DATA.tipoDeDocumente, // Mapea 'tipoDeDocumente' a 'encabezadoTipoDocument'
      encabezadoDescripcionOtro: FORM_DATA.descripcion, // Mapea 'descripcion' a 'encabezadoDescripcionOtro'
      encabezadoFechaFirma: FORM_DATA.fechaDeFirma, // Mapea 'fechaDeFirma' a 'encabezadoFechaFirma'
      encabezadoFechaVigencia: FORM_DATA.fechaDeVigencia, // Mapea 'fechaDeVigencia' a 'encabezadoFechaVigencia'
      encabezadoRfc: FORM_DATA.rfcTaxId, // Mapea 'rfcTaxId' a 'encabezadoRfc'
      encabezadoRazonFirmante: FORM_DATA.razonSocial, // Mapea 'razonSocial' a 'encabezadoRazonFirmante'
    };

    // Agregar los datos transformados a la lista de proyectos IMMEX
    this.proyectoImmexTablaLista.push(TRANSFORMED_DATA);

    // Reiniciar el formulario
    this.proyectoForm.reset();
  } else {
    console.warn('El formulario no es válido. Por favor, complete todos los campos requeridos.');
  }
}

/**
 * compodoc
 * @method agregarProveedorCliente
 * @description Método que agrega un nuevo proveedor o cliente. Valida el formulario y, si es válido, agrega los datos a la lista de proveedores y clientes.
 */
agregarProveedorCliente(): void {
  if (this.formularioProveedorCliente.valid) {
    const FORM_DATA = this.formularioProveedorCliente.value;

    this.proveedorTablaLista.push(FORM_DATA);
    this.formularioProveedorCliente.reset();
  }
}
  /**
   * compodoc
   *
   * @property tablaSeleccion
   * Configuración para la tabla de selección.
   * @type {TablaSeleccion}
   */
/**
 * compodoc
 * @property {TablaSeleccion} tablaSeleccion
 * Configuración para la tabla de selección. Define el tipo de selección que se puede realizar en las tablas dinámicas.
 */
tablaSeleccion = TablaSeleccion;

/**
 * compodoc
 * @property {any[]} tablaSociaAccionistas
 * Configuración de la tabla para mostrar los datos relacionados con los socios accionistas en el Anexo Uno.
 */
tablaSociaAccionistas = TABLA_ANEXO_PRODUCTO_FRACCION;

/**
 * compodoc
 * @property {any[]} tableProveedorCliente
 * Configuración de la tabla para mostrar los datos relacionados con los proveedores y clientes.
 */
tableProveedorCliente = TABLE_PROVEEDOR_CLIENTE;

/**
 * compodoc
 * @property {any[]} tableFracionAnarelaria
 * Configuración de la tabla para mostrar los datos relacionados con las fracciones arancelarias.
 */
tableFracionAnarelaria = ANEXO_FRACION_ANARELARIA;

/**
 * compodoc
 * @property {any[]} tablaProyectoImmex
 * Configuración de la tabla para mostrar los datos relacionados con los proyectos IMMEX.
 */
tablaProyectoImmex = TABLA_PROYECTO_IMMEX;

/**
 * compodoc
 * @property {Catalogo[]} paisDestinoCatalog
 * Catálogo que contiene los datos de los países de destino.
 */
public paisDestinoCatalog = PAIS_DESTINO_CATALOG;

/**
 * compodoc
 * @property {Catalogo[]} tipoDeDocumenteCatalog
 * Catálogo que contiene los datos de los tipos de documentos disponibles.
 */
public tipoDeDocumenteCatalog = ANEXO_I_SERVICIO_CATALOGO;

  /**
   * Estado de la solicitud 250101, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: ComplementosSeccionState;


  /**
   * Crea y configura los formularios reactivos utilizados en el componente.
   * 
   * - `anexoUnoFormGroup`: Formulario para capturar información relacionada con la fracción arancelaria y su descripción.
   * - `formularioProveedorCliente`: Formulario para capturar datos del proveedor o cliente, incluyendo descripción comercial, país de destino, RFC y razón social.
   * - `proyectoForm`: Formulario para capturar información del proyecto, como descripción, tipo de documento, fechas relevantes, RFC/Tax ID y razón social.
   * - `anexoDosFormGroup`: Formulario para capturar información adicional relacionada con la fracción arancelaria y su descripción.
   * - `complimentarForm`: Formulario para capturar datos complementarios, como categoría, descripción, valores en moneda nacional y volúmenes mensuales.
   * 
   * Cada formulario incluye validaciones específicas según los requisitos de los campos.
   */
  crearFormularioAnexoUno(): void {
    this.complementosSeccionQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as ComplementosSeccionState;
        })
      )
      .subscribe();
    this.anexoUnoFormGroup = this.fb.group({
      fraccionArancelaria: [this.solicitudState['fraccionArancelaria']],
      descripcion: [this.solicitudState['descripcion']],
    });
    this.formularioProveedorCliente = this.fb.group({
      descripcionComercial: [this.solicitudState['descripcionComercial'], Validators.required],
      paisDestino: [this.solicitudState['paisDestino'], Validators.required],
      rfc: [this.solicitudState['rfc'], Validators.required],
      razonSocialCliente: [this.solicitudState['razonSocialCliente'], Validators.required],
    });
    this.proyectoForm = this.fb.group({
      textDescripcion: [this.solicitudState['textDescripcion'], Validators.required],
      tipoDeDocumente: [this.solicitudState['tipoDeDocumente'], Validators.required],
      fechaDeFirma: [this.solicitudState['fechaDeFirma'], Validators.required],
      fechaDeVigencia: [this.solicitudState['fechaDeVigencia'], Validators.required],
      rfcTaxId: [0, Validators.required],
      razonSocial: [this.solicitudState['razonSocial'], Validators.required],
    });
    this.anexoDosFormGroup = this.fb.group({
      fraccionArancelarias: [this.solicitudState['fraccionArancelarias']],
      anexoDosDescripcion: [this.solicitudState['anexoDosDescripcion']],
    });
    this.complimentarForm = this.fb.group({
      catagoria: [this.solicitudState['catagoria'], Validators.required],
      complimentarDescripcion: [this.solicitudState['complimentarDescripcion'], Validators.required],
      monedaNacionalMensual: [this.solicitudState['monedaNacionalMensual'], Validators.required],
      monedaNacionalDeDosPeriodos: [this.solicitudState['monedaNacionalDeDosPeriodos'], Validators.required],
      volumenMensual: [this.solicitudState['volumenMensual'], Validators.required],
      twoPeriodVolume: [this.solicitudState['twoPeriodVolume'], Validators.required],
    });
  }
}
