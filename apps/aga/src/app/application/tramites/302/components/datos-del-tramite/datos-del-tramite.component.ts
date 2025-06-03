import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  DATOS_ALERT,
  DATOS_DEL_DONANTE,
  DATOS_DEL_PRODUCTO,
  DOMICILIO_FISCAL,
  MERCANCIAS,
  PRODUCTOS,
} from '../../constantes/datos-del-tramite.enum';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CertiRegistro302State } from '../../../../../application/core/estados/tramites/tramite302.store';
import { CommonModule } from '@angular/common';
import { DetallesDelProducto } from '../../models/certi-registro.model';
import { FormularioDinamico } from '@libs/shared/data-access-user/src';
import { FormulariosDeCertiRegistroComponent } from '../formularios-de-certi-registro/formularios-de-certi-registro.component';
import { Solicitud302Service } from '../../services/service302.service';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite302Query } from '../../../../../application/core/queries/tramite302.query';
import { Tramite302Store } from '../../../../../application/core/estados/tramites/tramite302.store';
import aduanas from '@libs/shared/theme/assets/json/302/lista-de-oficinas-de-aduanas.json';
import importaciónTemporal from '@libs/shared/theme/assets/json/302/list-importacion-temporal.json';
import unidadDeMedida from '@libs/shared/theme/assets/json/302/lista-unidad-de-medida.json';
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
     * Configuración de la tabla utilizada para mostrar los datos del producto en el trámite.
     * 
     * Esta propiedad almacena la configuración específica definida en `DATOS_DEL_PRODUCTO`,
     * que determina las columnas, formato y comportamiento de la tabla en el componente.
     */
    public configuracionTabla = DATOS_DEL_PRODUCTO;
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
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   * 
   * @type {boolean}
   * @memberof DatosDelTramiteComponent
   */
  @Input() public readonly: boolean = false;

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados por el usuario.
   */
  public esFormularioSoloLectura: boolean = false;

  public selectedProducto: DetallesDelProducto[] = [];

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
    private tramite302Query: Tramite302Query,
    private service: Solicitud302Service
  )
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
    this.esFormularioSoloLectura = this.readonly;
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
    this.getProductosSeleccionados();
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
          // this.certiRegistroState['unidadDeMedidaDesc'] = this.listaUnidadDeMedida.find(
          //   (unidad: Catalogo) => unidad.id === this.certiRegistroState['unidadDeMedida']
          // )?.descripcion || '';
        } else if (campo.campo === 'anoDeImportacionTemporal') {
          campo.listaDesplegable = this.listImportacionTemporal;
          // this.certiRegistroState['anoDeImportacionTemporalDesc'] = this.listImportacionTemporal.find(
          //   (importaciónTemporal: Catalogo) => importaciónTemporal.id === this.certiRegistroState['anoDeImportacionTemporal']
          // )?.descripcion || '';
        } else {
          campo.listaDesplegable = [];
        }
      });
      if(this.esFormularioSoloLectura){
        nombreDelFormulario.disable();
      }
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
   * Asigna la descripción del catálogo seleccionado al control del formulario.
   **/
  public static docSeleccionado(event: Catalogo, forma: FormGroup, controlDeFormulario: string): void {
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
      this.tramite302Store.setDynamicFieldValue('detallesDelProducto', this.detallesDelProducto);
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
    if (event.campo === 'unidadDeMedida') {
      const VALOR_UNIDAD = this.listaUnidadDeMedida.find(
        (unidad: Catalogo) => unidad.id === VALOR
      )?.descripcion || '';
      this.tramite302Store.setDynamicFieldValue('unidadDeMedidaDesc', VALOR_UNIDAD);
    }
    if (event.campo === 'anoDeImportacionTemporal') {
      const DATOS = this.listImportacionTemporal.find(
        (importaciónTemporal: Catalogo) => importaciónTemporal.id === VALOR
      )?.descripcion || '';
      this.tramite302Store.setDynamicFieldValue('anoDeImportacionTemporalDesc', DATOS);
    }

  }

   /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Emite una notificación y completa el observable `destroyNotifier$` para limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Obtiene los productos seleccionados llamando al servicio correspondiente.
   * Suscribe al observable devuelto por `getProductos()` y asigna los datos recibidos
   * a la propiedad `detallesDelProducto`. Si los datos no son un arreglo, los convierte en uno.
   * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`.
   *
   * @remarks
   * Este método se utiliza para cargar los detalles de los productos seleccionados
   * y asegurar que la suscripción se gestione correctamente para evitar fugas de memoria.
   */
  getProductosSeleccionados(): void {
    this.service.getProductos().pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(
      (datos:DetallesDelProducto) => {
        this.detallesDelProducto = Array.isArray(datos) ? datos : [datos];
        this.tramite302Store.setDynamicFieldValue('detallesDelProducto', this.detallesDelProducto);
      })
}

 /**
   * Maneja la selección de una fila en la tabla.
   * Actualiza el formulario y el store con los datos de la fila seleccionada.
   * 
   * @param row - Los datos de la fila seleccionada.
   */
  valorDeAlternancia(row:DetallesDelProducto[]): void {
   this.selectedProducto = row;
  }

  modificarModal(): void {
    if(this.selectedProducto.length > 0) {
    this.modal = 'show';
    this.formAgregarProductos.patchValue(this.selectedProducto[0]);
    this.selectedProducto = [];
    this.cerrarModal();
    }
  }
}
