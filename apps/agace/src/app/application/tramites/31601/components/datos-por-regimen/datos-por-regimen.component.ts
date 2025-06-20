import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Solicitud31601State,Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { REQUERIDO } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TableBodyData } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TablePaginationComponent } from '@ng-mf/data-access-user';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query'
import { TramiteAgaceStore } from '../../../../estados/tramites/tramitesagace.store';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import regimenTable from '@libs/shared/theme/assets/json/31601/datos-por-regimen.json';

/**
 * Componente DatosPorRegimen que se utiliza para mostrar y gestionar los DatosPorRegimen.
 *
 * Este componente utiliza varios subcomponentes como TituloComponent, CatalogoSelectComponent, CommonModule,
 * ReactiveFormsModule,TableComponent  para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * @component
 */

@Component({
  selector: 'app-datos-por-regimen',
  templateUrl: './datos-por-regimen.component.html',
  styleUrl: './datos-por-regimen.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TableComponent,
    TablePaginationComponent,
  ],
})
export class DatosPorRegimenComponent implements OnInit,OnDestroy {
  /**
   *Un catálogo de artículos.
   * Esta propiedad contiene una matriz de objetos 'Catalogo', que representan
   * Los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bimestreUnoCatalogo!: Catalogo[];

  /**
   *Un catálogo de artículos.
   * Esta propiedad contiene una matriz de objetos 'Catalogo', que representan
   * Los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bimestreDosCatalogo!: Catalogo[];

  /**
   *Un catálogo de artículos.
   * Esta propiedad contiene una matriz de objetos 'Catalogo', que representan
   * Los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bimestreTresCatalogo!: Catalogo[];

  /**
   * Una instancia de FormGroup que representa el formulario para el régimen.
   * Este formulario se utiliza para capturar y validar los comentarios de los usuarios relacionados con el régimen.
   */
  public regimenForm!: FormGroup;

  /**
   * Una instancia de FormGroup utilizada para administrar los controles de formulario para el componente "datos-por-regimen".
   * Este grupo de formularios se utiliza para agregar y administrar el estado de los controles de formularios relacionados con los datos específicos del régimen.
   */
  public agregarForm!: FormGroup;

  /**
   * Un método público que recupera los datos de la tabla de regímenes.
   * @type {any} regimenTable: la fuente de datos de la tabla de regímenes.
   */
  public getRegimenTableData = regimenTable;

  /**
   * Contiene los datos del cuerpo de la tabla de regímenes.
   * El tipo de datos es actualmente desconocido y se inicializa como una matriz vacía.
   */
  public regimenTableBodyData: TableBodyData[] = [];

  /**
   * Matriz de cadenas que representan los datos de cabecera de la tabla de regímenes.
   */
  public regimenTableHeaderData: string[] = [];

  /**
   * Representa el estado modal.
   * @type {string}
   */
  public modal: string = 'modal';

  /**
   * Una referencia al elemento de botón modal de cierre.
   * Se utiliza para controlar mediante programación la visibilidad del modal.
   * @type {ElementRef}
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Una propiedad pública que contiene una matriz de objetos Catalogo.
   * Esta propiedad se utiliza para administrar los datos modales del catálogo.
   */
  public catalogModal!: Catalogo[];

  /**
   * Una constante que contiene la cadena de mensaje requerida.
   * Este mensaje se utiliza para indicar que un campo es obligatorio.
   */
  public MENSAJE_REQUERIDO = REQUERIDO;

  /**
   * @property {number} totalItems
   *  Número total de elementos en la tabla.
   */
  public totalItems: number = 0;

  /**
   * @property {number} currentPage
   *  Página actual de la tabla paginada.
   */
  public currentPage: number = 1;

  /**
   * @property {number} itemsPerPage
   *  Cantidad de elementos por página.
   */
  public itemsPerPage: number = 5;

  /**
   * @property {unknown[]} miembroDeLaEmpresaBodyData
   *  Datos del cuerpo de la tabla de miembros de la empresa.
   */
  public miembroDeLaEmpresaBodyData: TableBodyData[] = [];

  
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 
  /**
 * Constructor de la clase DatosPorRegimenComponent.
 * 
 * @param fb - Constructor de formularios.
 * @param validacionesService - Servicio de validaciones de formulario.
 * @param _pantallaSvc - Servicio de pantalla.
 * @param tramiteAgaceStore - Store de Tramite Agace.
 * @param tramite31601Store - Store de Tramite 31601.
 * @param tramite31601Query - Query de Tramite 31601.
 */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private _pantallaSvc: ServiciosPantallaService,
    private tramiteAgaceStore: TramiteAgaceStore,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query,
    private consultaioQuery: ConsultaioQuery,
  ){
     this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.crearRegimenForm();
      })
    )
    .subscribe()
  }
  /**
   * Gancho de ciclo de vida que se llama después de inicializar las propiedades enlazadas a datos de una directiva.
   * Este método inicializa catálogos, establece valores de control de formularios, prepara los datos de la pestaña del régimen,
   * y recupera el formulario que se va a agregar.
   *
   * @memberof DatosPorRegimenComponent
   */
  ngOnInit():void {
    this.crearRegimenForm();
    this.inicializaCatalogos();
    this.regimenTabData();
    this.getAgregarForm(); 
  }

  /**
   * Metodo para saber si el campo del formulario es valido.
   * @param field El nombre del campo del formulario que se va a validar.
   * @returns {boolean | null} : Regresa un booleano si el campo es valido o no o puede regresar null si no se ha tocado el campo.
   */
  isValid(field: string): boolean | null {
    return this.validacionesService.isValid(this.regimenForm, field);
  }

  /**
   * Inicializa los catálogos mediante la obtención de datos para tres bimestres diferentes.
   *
   * Este método recupera los catálogos de bimestre uno, dos y tres utilizando el método
   * Servicio '_pantallaSvc'. Cada catálogo se obtiene de forma asincrónica y los resultados
   * se almacenan en las propiedades de la clase respectiva: 'bimestreUnoCatalogo',
   * 'bimestreDosCatalogo' y 'bimestreTresCatalogo'.
   *
   * El método utiliza el operador 'merge' de RxJS para combinar los observables para
   * las tres operaciones de recuperación del catálogo y se suscribe a ellas para iniciar el
   * Proceso de recuperación de datos.
   *
   * @private
   */
  private inicializaCatalogos(): void {
    /**
     * Observable que recupera el catálogo para el primer bimestre.
     * Obtiene los datos utilizando el método `getBimestreUnoCatalogo` del servicio `_pantallaSvc`
     * con el ID de catálogo `CAT_BIMESTRE_ONE`.
     * Los datos de la respuesta se asignan a la propiedad `bimestreUnoCatalogo`.
     *
     * @constant {Observable<any>} bimestreUnoCatalogo$
     */
    const BIMESTRE_UNO_CATALOGO$ = this._pantallaSvc
      .getBimestreUnoCatalogo()
      .pipe(
        map((resp) => {
          this.bimestreUnoCatalogo = resp.data;
        })
      );

    /**
     * Observable que recupera el catálogo para el segundo bimestre.
     * Obtiene los datos utilizando el método `getBimestreUnoCatalogo` del servicio `_pantallaSvc`
     * con el ID de catálogo `CAT_BIMESTRE_TWO`.
     * Los datos de la respuesta se asignan a la propiedad `bimestreDosCatalogo`.
     *
     * @observable bimestreDosCatalogo$
     * @returns {Observable<any>} Un observable que emite los datos del catálogo para el segundo bimestre.
     */
    const BIMESTRE_DOS_CATALOGO$ = this._pantallaSvc
      .getBimestreDosCatalogo()
      .pipe(
        map((resp) => {
          this.bimestreDosCatalogo = resp.data;
        })
      );

    /**
     * Observable que recupera el catálogo para el tercer bimestre.
     *
     * Este observable utiliza el método `getBimestreUnoCatalogo` del servicio `_pantallaSvc`
     * para recuperar los datos del catálogo identificados por `CATALOGOS_ID.CAT_BIMESTRE_THREE`. La respuesta
     * se mapea para extraer la propiedad `data` y asignarla a la propiedad `bimestreTresCatalogo`.
     *
     * @constant {Observable<any>} bimestreTresCatalogo$
     */
    const BIMESTRE_TRES_CATALOGO$ = this._pantallaSvc
      .getBimestreTresCatalogo(CATALOGOS_ID.CAT_BIMESTRE_TRES)
      .pipe(
        map((resp) => {
          this.bimestreTresCatalogo = resp.data;
        })
      );

    merge(
      BIMESTRE_UNO_CATALOGO$,
      BIMESTRE_DOS_CATALOGO$,
      BIMESTRE_TRES_CATALOGO$
    ).subscribe();
  }

  /**
 * Crea e inicializa el FormGroup `regimenForm` con varios controles de formulario y sus validadores.
 * Los controles del formulario incluyen:
 * - `importaciones`: Un campo requerido para importaciones.
 * - `infraestructuraIndique`: Un campo requerido para infraestructura.
 * - `ultimosMeses`: Un campo requerido para los últimos meses.
 * - `operacionesmeses`: Un campo requerido para operaciones en meses.
 * - `valor`: Un campo requerido para valor.
 * - `transferencias`: Un campo opcional para transferencias con una longitud máxima de 20.
 * - `transferenciasVir`: Un campo opcional para transferencias virtuales con una longitud máxima de 7.
 * - `retornos`: Un campo opcional para retornos con una longitud máxima de 20.
 * - `retornosSe`: Un campo opcional para retornos secundarios con una longitud máxima de 7.
 * - `constancias`: Un campo opcional para constancias con una longitud máxima de 20.
 * - `constanciasDe`: Un campo opcional para detalles de constancias con una longitud máxima de 7.
 * - `total`: Un campo deshabilitado para total.
 * - `totals`: Un campo deshabilitado para totales.
 * - `empleadosPropios`: Un campo requerido para empleados propios.
 * - `numeroEmpleados`: Un campo requerido para el número de empleados.
 * - `numeroEmpleadosDos`: Un campo requerido para el número de empleados dos.
 * - `numeroEmpleadosTres`: Un campo requerido para el número de empleados tres.
 * - `comboBimestresUno`: Un campo opcional para el primer combo bimestral.
 * - `comboBimestresDos`: Un campo opcional para el segundo combo bimestral.
 * - `comboBimestresTres`: Un campo opcional para el tercer combo bimestral.
 * - `proveedorCumplimiento`: Un campo requerido para proveedor de cumplimiento.
 * - `declaracionISR`: Un campo requerido para declaración de ISR.
 * - `cancelacion`: Un campo requerido para cancelación.
 * - `cumplimientoReglas`: Un campo requerido para cumplimiento de reglas.
 * - `recintoFiscalizado`: Un campo requerido para recinto fiscalizado.
 * - `recintoEstrategico`: Un campo requerido para recinto estratégico.
 * - `cumplimientoLineamientos`: Un campo requerido para cumplimiento de lineamientos.
 */
  public crearRegimenForm():void {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.regimenForm = this.fb.group({
      importaciones: [this.solicitudState?.importaciones, Validators.required],
      infraestructuraIndique: [this.solicitudState?.infraestructuraIndique, Validators.required],
      ultimosMeses: [this.solicitudState?.ultimosMeses, Validators.required],
      operacionesmeses: [this.solicitudState?.operacionesmeses, Validators.required],
      valor: [this.solicitudState?.valor, Validators.required],
      transferencias: [this.solicitudState?.transferencias, Validators.maxLength(20)],
      transferenciasVir: [this.solicitudState?.transferenciasVir, Validators.maxLength(7)],
      retornos: [this.solicitudState?.retornos, Validators.maxLength(20)],
      retornosSe: [this.solicitudState?.retornosSe, Validators.maxLength(7)],
      constancias: [this.solicitudState?.constancias, Validators.maxLength(20)],
      constanciasDe: [this.solicitudState?.constanciasDe, Validators.maxLength(7)],
      total: [{ value: '', disabled: true }],
      totals: [{ value: '', disabled: true }],
      empleadosPropiosRegimen: [this.solicitudState?.empleadosPropiosRegimen, Validators.required],
      numeroEmpleadosUno: [this.solicitudState?.numeroEmpleadosUno, Validators.required],
      numeroEmpleadosDos: [this.solicitudState?.numeroEmpleadosDos, Validators.required],
      numeroEmpleadosTres: [this.solicitudState?.numeroEmpleadosTres, Validators.required],
      comboBimestresUno: [this.solicitudState?.comboBimestresUno],
      comboBimestresDos: [this.solicitudState?.comboBimestresDos],
      comboBimestresTres: [this.solicitudState?.comboBimestresTres],
      proveedorCumplimiento: [this.solicitudState?.proveedorCumplimiento, Validators.required],
      declaracionISR: [this.solicitudState?.declaracionISR, Validators.required],
      cancelacion: [this.solicitudState?.cancelacion, Validators.required],
      cumplimientoReglas: [this.solicitudState?.cumplimientoReglas, Validators.required],
      recintoFiscalizado: [this.solicitudState?.recintoFiscalizado, Validators.required],
      recintoEstrategico: [this.solicitudState?.recintoEstrategico, Validators.required],
      cumplimientoLineamientos: [this.solicitudState?.cumplimientoLineamientos, Validators.required],
    });

    if (this.esFormularioSoloLectura) {
      Object.keys(this.regimenForm.controls).forEach((key) => {
        this.regimenForm.get(key)?.disable();
      })
    } else {
      Object.keys(this.regimenForm.controls).forEach((key) => {
        this.regimenForm.get(key)?.enable();
      })
    }  

  }

  /**
   * Establece el valor predeterminado de 'Sí' para varios controles en el grupo de formularios `regimenForm`.
   *
   * Los siguientes controles se establecen en 'Sí':
   * - importaciones
   * - infraestructura
   * - ultimosMeses
   * - operacionesmeses
   * - empleadosPropios
   * - numeroEmpleados
   * - proveedorCumplimiento
   * - declaracionISR
   * - cancelacion
   * - cumplimientoReglas
   * - recintoFiscalizado
   * - recintoEstrategico
   * - cumplimientoLineamientos
   */

  /**
   * Actualiza los datos de la tabla de régimen estableciendo los datos de cabecera y cuerpo
   * desde el método `getRegimenTableData`.
   *
   * @remarks
   * Este método asigna los datos de cabecera de la tabla a `regimenTableHeaderData`
   * y los datos del cuerpo de la tabla a `regimenTableBodyData`.
   */
  public regimenTabData():void {
    this.regimenTableHeaderData = this.getRegimenTableData.tableHeader;
    this.regimenTableBodyData = this.getRegimenTableData.tableBody;
  }

  /**
   * Maneja la selección del primer bimestre (período de dos meses) del formulario.
   * Recupera el valor seleccionado del control 'comboBimestresUno' en el formulario
   * y actualiza la tienda con el bimestre seleccionado.
   */
  public bimestreUnoSeleccion():void {
    const BIMESTRES = this.regimenForm.get('comboBimestresUno')?.value;
    this.tramiteAgaceStore.establecerComboBimestresUno(BIMESTRES);
  }

  /**
   * Maneja la selección del segundo bimestre (período de dos meses) del formulario.
   * Recupera el valor seleccionado del control 'comboBimestresDos' en el formulario
   * y actualiza la tienda con el bimestre seleccionado.
   *
   * @remarks
   * Este método se utiliza para sincronizar el valor del bimestre seleccionado del formulario
   * con la tienda de gestión de estado de la aplicación.
   */
  public bimestreDosSeleccion():void {
    const BIMESTRES = this.regimenForm.get('comboBimestresDos')?.value;
    this.tramiteAgaceStore.establecerComboBimestresDos(BIMESTRES);
  }

  /**
   * Maneja la selección del tercer bimestre (período de dos meses) del formulario.
   * Recupera el valor seleccionado del control 'comboBimestresTres' en el formulario
   * y actualiza la tienda con el bimestre seleccionado.
   */
  public bimestreTresSeleccion():void {
    const BIMESTRES = this.regimenForm.get('comboBimestresTres')?.value;
    this.tramiteAgaceStore.establecerComboBimestresTres(BIMESTRES);
  }

  /**
   * Abre el modal e inicializa el formulario.
   *
   * Este método establece el estado del modal en 'show' y llama al método `getAgregarForm`
   * para inicializar el formulario para agregar datos.
   */
  public abrirModal():void {
    this.modal = 'show';
    this.getAgregarForm();
  }

  /**
   * Inicializa el grupo de formularios `agregarForm` con valores predeterminados y estados deshabilitados para ciertos controles.
   *
   * El grupo de formularios contiene los siguientes controles:
   * - `rfc`: Una entrada de texto para RFC.
   * - `registroInput`: Una entrada de texto deshabilitada para registro.
   * - `razonSocialInput`: Una entrada de texto deshabilitada para razón social.
   * - `numero1re`: Una entrada de texto para el primer número.
   * - `numero2do`: Una entrada de texto para el segundo número.
   * - `numero3re`: Una entrada de texto para el tercer número.
   * - `agregarCatalogoUno`: Una entrada de texto para la primera entrada del catálogo.
   * - `agregarCatalogoDos`: Una entrada de texto para la segunda entrada del catálogo.
   * - `agregarCatalogoTres`: Una entrada de texto para la tercera entrada del catálogo.
   */
  public getAgregarForm():void {
    this.agregarForm = this.fb.group({
      rfc: [''],
      registroInput: [{ value: '', disabled: true }],
      razonSocialInput: [{ value: '', disabled: true }],
      numero1re: [''],
      numero2do: [''],
      numero3re: [''],
      agregarCatalogoUno: [''],
      agregarCatalogoDos: [''],
      agregarCatalogoTres: [''],
    });

     if (this.esFormularioSoloLectura && this.agregarForm) {
        this.agregarForm.disable();
    } else {
        this.agregarForm.enable();
    }  
  }

  /**
   * Maneja la acción del modal para el primer bimestre.
   * Recupera el valor de 'agregarCatalogoUno' del formulario de régimen
   * y lo establece en el tramiteAgaceStore utilizando el método setcomboBimestresUno.
   */
  public modalBimestreUno():void {
    const BIMESTRES = this.regimenForm.get('agregarCatalogoUno')?.value;
    this.tramiteAgaceStore.establecerComboBimestresUno(BIMESTRES);
  }

  /**
   * Maneja la acción del modal para el segundo bimestre.
   * Recupera el valor de 'agregarCatalogoDos' del formulario de régimen
   * y lo establece en el comboBimestresUno del tramiteAgaceStore.
   */
  public modalBimestreDos():void {
    const BIMESTRES = this.regimenForm.get('agregarCatalogoDos')?.value;
    this.tramiteAgaceStore.establecerComboBimestresUno(BIMESTRES);
  }

  /**
   * Abre un modal para seleccionar bimestres (períodos de dos meses) y establece el valor seleccionado
   * en la tienda para su posterior procesamiento.
   *
   * Este método recupera el valor de 'agregarCatalogoTres' del grupo de formularios 'regimenForm'
   * y lo utiliza para actualizar el 'comboBimestresUno' en el 'tramiteAgaceStore'.
   */
  public modalBimestreTres():void {
    const BIMESTRES = this.regimenForm.get('agregarCatalogoTres')?.value;
    this.tramiteAgaceStore.establecerComboBimestresUno(BIMESTRES);
  }

  /**
   * @method updatePagination
   *  Actualiza los datos mostrados en la tabla según la paginación.
   */
  public updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }
  /**
   * Indica si se debe mostrar la sección de "Importación temporal bajo la modalidad del programa IMMEX (sensibles)".
   * Se muestra si el checkbox correspondiente a régimen_0 está seleccionado.
   * @returns {boolean}
   */
  public get showIMMEXSensiblesSection(): boolean {
    return Boolean(this.solicitudState?.regimen_0);
  }

  /**
   * Indica si se debe mostrar la sección de "Depósito fiscal para someterse al proceso de ensamble y fabricación de vehículos".
   * Se muestra si el checkbox correspondiente a régimen_1 está seleccionado.
   * @returns {boolean}
   */
  public get showDepositoFiscalSection(): boolean {
    return Boolean(this.solicitudState?.regimen_1);
  }

  /**
   * Indica si se debe mostrar la sección de "Elaboración, transformación o reparación en recinto fiscalizado".
   * Se muestra si el checkbox correspondiente a régimen_2 está seleccionado.
   * @returns {boolean}
   */
  public get showRecintoFiscalizadoSection(): boolean {
    return Boolean(this.solicitudState?.regimen_2);
  }

  /**
   * Indica si se debe mostrar la sección de "Recinto fiscalizado estratégico".
   * Se muestra si el checkbox correspondiente a régimen_3 está seleccionado.
   * @returns {boolean}
   */
  public get showRecintoEstrategicoSection(): boolean {
    return Boolean(this.solicitudState?.regimen_3);
  }
  /**
   * @method onPageChange
   * Número de la nueva página seleccionada.
   *  Cambia la página actual y actualiza la paginación.
   */
  public onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * @method onItemsPerPageChange
   *  Número de elementos por página seleccionados.
   *  Cambia la cantidad de elementos por página y actualiza la paginación.
   */
  public onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }
/**
 * Establece el valor de un campo en el store de Tramite31601.
 *
 * @param form - El grupo de formularios que contiene el campo.
 * @param campo - El nombre del campo cuyo valor se va a establecer.
 * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
 */
setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31601Store): void {
  const VALOR = form.get(campo)?.value;
  (this.tramite31601Store[metodoNombre] as (value: string) => void)(VALOR);
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
