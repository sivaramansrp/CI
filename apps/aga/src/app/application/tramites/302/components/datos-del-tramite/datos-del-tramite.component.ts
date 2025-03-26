/* eslint-disable @nx/enforce-module-boundaries */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  DATOS_ALERT,
  DATOS_DEL_DONANTE,
  DOMICILIO_FISCAL,
  MERCANCIAS,
  PRODUCTOS,
} from '../../constantes/datos-del-tramite.enum';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AlertComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { Catalogo } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CertiRegistro302State } from '../../../../../application/core/estados/tramites/tramite302.store';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { DetallesDelProducto } from '../../models/certi-registro.model';
import { FormularioDinamico } from '@libs/shared/data-access-user/src';
import { FormulariosDeCertiRegistroComponent } from '../formularios-de-certi-registro/formularios-de-certi-registro.component';
import { TablaDinamicaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '../../../../../../../../../libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite302Query } from '../../../../../application/core/queries/tramite302.query';
import { Tramite302Store } from '../../../../../application/core/estados/tramites/tramite302.store';
import aduanas from 'libs/shared/theme/assets/json/302/lista-de-oficinas-de-aduanas.json';
import importaciónTemporal from 'libs/shared/theme/assets/json/302/list-importacion-temporal.json';
import unidadDeMedida from 'libs/shared/theme/assets/json/302/lista-unidad-de-medida.json';
/**
* DatosDelTramiteComponent componente utilizado para procesar los datos del producto*
* Este componente utiliza varios subcomponentes como TitleComponent, CommonModule,
* ReactiveFormsModule y TablaDinamicaComponent,
* AlertComponent, FormulariosDeCertiRegistroComponent
* 
* @component
*/
@Component({
  selector: 'datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    FormulariosDeCertiRegistroComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
/**
 * Componente que gestiona los datos del trámite 302.
 * Este componente permite la captura, validación y visualización de información
 * relacionada con mercancías, productos, datos del donante y domicilio fiscal.
 * 
 * Funcionalidades principales:
 * - Inicialización de formularios reactivos con validaciones dinámicas.
 * - Gestión de modales para agregar productos y confirmaciones.
 * - Sincronización de datos con el estado global del trámite.
 * - Configuración dinámica de tablas y listas desplegables.
 * 
 * Ciclo de vida:
 * - `ngOnInit`: Configura los formularios y suscripciones necesarias.
 * - `ngOnDestroy`: Limpia las suscripciones activas para evitar fugas de memoria.
 * 
 * @export
 * @class DatosDelTramiteComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export class DatosDelTramiteComponent implements OnInit, OnDestroy {

  /**Referencia al elemento del modal para agregar productos.
   * @type {ElementRef}
   * @memberof DatosDelTramiteComponent
   */
  @ViewChild('modalAgregarProductos') public modalElement!: ElementRef;

  /**Referencia al elemento del botón para cerrar el modal.
   * @type {ElementRef}
   * @memberof DatosDelTramiteComponent
  */
  @ViewChild('closeModal') public closeModal!: ElementRef;

  /** Inicializa un formulario reactivo vacío que será configurado dinámicamente. 
   * @type {FormGroup}
   * @memberof DatosDelTramiteComponent
  */
  public form: FormGroup = this.fb.group({});

  /** Asigna la constante MERCANCIAS a la propiedad mercancia para su uso en el componente. 
   * @memberof DatosDelTramiteComponent
  */
  public mercancia = MERCANCIAS;

  /**Asigna la constante PRODUCTOS a la propiedad productos para su uso en el componente. 
   * @memberof DatosDelTramiteComponent
   * 
  */
  public productos = PRODUCTOS;

  /** Asigna la constante DATOS_DEL_DONANTE a la propiedad datosDelDonante para su uso en el componente. 
   * @memberof DatosDelTramiteComponent
   * 
  */
  public datosDelDonante = DATOS_DEL_DONANTE;

  /** Asigna la constante DOMICILIO_FISCAL a la propiedad domicilioFiscal para su uso en el componente.
   * @memberof DatosDelTramiteComponent
   */
  public domicilioFiscal = DOMICILIO_FISCAL;
  
  /**
   * Lista de oficinas de aduanas disponibles para selección.
   * Cada elemento contiene un identificador único y una descripción.
   * @type {Catalogo[]}
   * @memberof DatosDelTramiteComponent
   */
  public listaDeOficinasDeAduanas: Catalogo[] = aduanas as Catalogo[];

  /**
   * Lista de opciones para el año de importación temporal.
   * Cada elemento contiene un identificador único y una descripción.
   * @type {Catalogo[]}
   * @memberof DatosDelTramiteComponent
   */
  public listImportacionTemporal: Catalogo[] = importaciónTemporal as Catalogo[];

  /**
   * List of options for the unit of measurement.
   * Each element contains a unique identifier and a description.
   * @type {Catalogo[]}
   * @memberof DatosDelTramiteComponent
   */
  public listaUnidadDeMedida: Catalogo[] = unidadDeMedida as Catalogo[];

  /**
   * Array que contiene los datos de las personas cargadas desde el archivo JSON.
   * @type {DetallesDelProducto[]}
   * @memberof DatosDelTramiteComponent
   */
  public detallesDelProducto: DetallesDelProducto[] = [];

  /** Asigna la clase TablaSeleccion para su uso en el componente, permitiendo la selección de filas en tablas dinámicas.
   * @memberof DatosDelTramiteComponent
   */
  public TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de la tabla que define las columnas y sus propiedades.
   * Cada columna incluye un encabezado, una clave para acceder al valor correspondiente
   * en los datos, y un orden para determinar su posición en la tabla.
   *
   * Propiedades:
   * - `encabezado`: Título de la columna que se mostrará en la tabla.
   * - `clave`: Función que toma un elemento de datos y devuelve el valor correspondiente
   *   para esta columna.
   * - `orden`: Número que indica la posición de la columna en la tabla.
   * @type {ConfiguracionColumna<>[]}
   * @memberof DatosDelTramiteComponent
   */
    public configuracionTabla: ConfiguracionColumna<DetallesDelProducto>[] = [
      {
        encabezado: 'Tipo de mercancía',
        clave: (item: DetallesDelProducto) => item.tipoDeMercancia,
        orden: 1,
      },
      { 
        encabezado: 'Cantidad',
        clave: (item: DetallesDelProducto) => item.cantidad,
        orden: 2
      },
      {
        encabezado: 'Unidad de medida de comercialización',
        clave: (item: DetallesDelProducto) => item.unidadDeMedida,
        orden: 3,
      },
      {
        encabezado: 'Año de importación temporal',
        clave: (item: DetallesDelProducto) => item.anoDeImportacionTemporal,
        orden: 4,
      },
      {
        encabezado: 'Modelo',
        clave: (item: DetallesDelProducto) => item.modelo,
        orden: 5,
      },
      {
        encabezado: 'Marca',
        clave: (item: DetallesDelProducto) => item.marca,
        orden: 6,
      },
      {
        encabezado: 'Número de serie',
        clave: (item: DetallesDelProducto) => item.numeroDeSerie,
        orden: 7,
      },
    ];

  /** Variable que controla el estado del modal (abierto o cerrado). 
   * @type {string}
   * @memberof DatosDelTramiteComponent
  */
  public modal: string = 'modal';

  /** Variable que controla el estado del modal de confirmación (abierto o cerrado). 
   * @type {string}
   * @memberof DatosDelTramiteComponent
  */
  public modalConfirmacion: string = 'modal';

  /**
   * Formulario reactivo para agregar productos.
   * Este formulario se inicializa vacío y se configura dinámicamente
   * con los campos necesarios para capturar los datos de los productos.
   * @type {FormGroup}
   * @memberof DatosDelTramiteComponent
   */
  public formAgregarProductos: FormGroup = this.fb.group({});

  /**
   * Formulario reactivo para capturar los datos del donante.
   * Este formulario se inicializa vacío y se configura dinámicamente
   * con los campos necesarios para capturar la información del donante.
   * @type {FormGroup}
   * @memberof DatosDelTramiteComponent
   */
  public formDatosDelDonante: FormGroup = this.fb.group({});

  /**
   * Formulario reactivo para capturar los datos del domicilio fiscal.
   * Este formulario se inicializa vacío y se configura dinámicamente
   * con los campos necesarios para capturar la información del domicilio fiscal.
   * @type {FormGroup}
   * @memberof DatosDelTramiteComponent
   */
  public formDomicilioFiscal: FormGroup = this.fb.group({});

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   *
   * @type {DATOS_ALERT}
   * @memberof DatosDelTramiteComponent
   */
  public DATOS_ALERT = DATOS_ALERT.message;

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud de la sección 301.
   * @type {CertiRegistro302State}
   * @memberof DatosDelTramiteComponent
   */
  public certiRegistroState!: CertiRegistro302State;

  /**
   * Constructor del componente.
   * 
   * @param fb - Servicio para la creación y manipulación de formularios reactivos.
   * @param tramite302Store - Store para gestionar el estado del trámite 302.
   * @param tramite302Query - Query para consultar el estado del trámite 302.
   */
  constructor(
    public fb: FormBuilder,
    private tramite302Store: Tramite302Store,
    private tramite302Query: Tramite302Query
  ) // eslint-disable-next-line no-empty-function
  {}

  /**
   * @method ngOnInit
   * @description 
   * /**
     * Método del ciclo de vida que se ejecuta al inicializar el componente.
     * 
     * Funcionalidades principales:
     * - Suscribe al estado global del trámite 302 para obtener datos iniciales.
     * - Inicializa los formularios reactivos con validaciones dinámicas basadas en las constantes.
     * 
     * Pasos:
     * 1. Suscripción al estado global del trámite 302 (`tramite302Query.selectRegistro$`).
     * 2. Configuración de los formularios reactivos (`form`, `formAgregarProductos`, `formDatosDelDonante`, `formDomicilioFiscal`).
   * @memberof DatosDelTramiteComponent
   */
  ngOnInit(): void {
    this.subscription.add(
      this.tramite302Query.selectRegistro$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.certiRegistroState = seccionState;
          })
        )
        .subscribe()
    );

    this.inicializarFormGroup(this.form, MERCANCIAS);
    this.inicializarFormGroup(this.formAgregarProductos, PRODUCTOS);
    this.inicializarFormGroup(this.formDatosDelDonante, DATOS_DEL_DONANTE);
    this.inicializarFormGroup(this.formDomicilioFiscal, DOMICILIO_FISCAL);
  }

  /** * compo doc
   * @method inicializarFormGroup
   * @description Esta función inicializa un FormGroup agregando FormControls basados 
   * en la configuración proporcionada en `formularioDatos`. 
   * Además, asigna listas desplegables a campos específicos como 
   * 'unidadDeMedida' y 'anoDeImportacionTemporal'.
   * 
   * @param nombreDelFormulario - El FormGroup que será inicializado.
   * @param formularioDatos - La configuración de los campos que se agregarán al FormGroup.
   */
  public inicializarFormGroup(nombreDelFormulario: FormGroup, formularioDatos: FormularioDinamico[]): void {
    if (nombreDelFormulario) {
      formularioDatos?.forEach((campo: FormularioDinamico) => {
        const VALIDADORES = DatosDelTramiteComponent.mapValidadores(campo?.validators);
        nombreDelFormulario?.addControl(
          campo.campo,
          new FormControl({ value: this.certiRegistroState[campo.campo], disabled: campo.disabled }, VALIDADORES)
        );

        if (campo.campo === 'unidadDeMedida') {
          campo.listaDesplegable = this.listaUnidadDeMedida;
        } else if (campo.campo === 'anoDeImportacionTemporal') {
          campo.listaDesplegable = this.listImportacionTemporal;
        } else {
          campo.listaDesplegable = [];
        }
      });
    }
  }

  /**
   * compo doc
   * @method mapValidadores
   * @description
   * Convierte una lista de nombres de validadores en funciones de validación.
   * Este método toma un arreglo de cadenas que representan los nombres de los validadores
   * y devuelve un arreglo de funciones de validación correspondientes.
   *
   * @param validadores Lista de nombres de validadores como cadenas.
   * @returns Arreglo de funciones de validación (`ValidatorFn[]`).
   */
  private static mapValidadores(validadores: string[]): ValidatorFn[] {
    const VALIDADORES_DE_FORMULARIO: ValidatorFn[] = [];
    if (validadores?.includes('required')) {
      VALIDADORES_DE_FORMULARIO?.push(Validators.required);
    }
    return VALIDADORES_DE_FORMULARIO;
  }

  /** 
   * compo doc
   * @method docSeleccionado
   * @description
   * Asigna la descripción del catálogo seleccionado al control del formulario. */
  // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(event: Catalogo, forma: FormGroup, controlDeFormulario: string): void {
    if (event) {
      forma?.get(controlDeFormulario)?.setValue(event?.descripcion);
    }
  }

  /**
   * compo doc
   * @method abrirModal
   * @description
   * Abre un modal estableciendo su estado a 'show'.
   * Este método se utiliza para mostrar el modal en la interfaz de usuario.
   */
  public abrirModal(): void {
    this.modal = 'show';
  }

  /**
   * compo doc
   * @method cerrarModal
   * @description
   * Cierra el modal utilizando una referencia al botón de cierre.
   * Este método simula un clic en el botón de cierre del modal para ocultarlo.
   */
  public cerrarModal(): void {
    this.closeModal.nativeElement.click();
  }

  /**
   * compo doc
   * @method agregarProductos
   * @description
   * Agrega un nuevo agente a la lista de detalles del producto.
   * Si el formulario es válido, se toma el valor del formulario,
   * se agrega a la lista `detallesDelProducto`, se reinicia el formulario,
   * se cierra el modal y se muestra el modal de confirmación.
   */
  public agregarProductos(): void {
    if (this.formAgregarProductos.valid) {
      const PRODUCTOS = this.formAgregarProductos?.value;
      this.detallesDelProducto?.push(PRODUCTOS);
      this.formAgregarProductos.reset();
      this.cerrarModal();
      this.modalConfirmacion = 'show';
    }
  }

  /**
   * compo doc
   * @method setValoresStore
   * @description
   * Actualiza un valor dinámico en el store basado en el campo y el formulario proporcionados.
   * Obtiene el valor del campo especificado en el formulario y lo envía al store.
   *
   * @param event Objeto que contiene el nombre del campo y el formulario reactivo.
   */
  public setValoresStore(event: {campo: string, forma: FormGroup}): void {
    const VALOR = event.forma.get(event.campo)?.value;
    this.tramite302Store.setDynamicFieldValue(event.campo, VALOR);
  }

  /**
   * @method ngOnDestroy
   * @description Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   * @memberof DatosDelTramiteComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
