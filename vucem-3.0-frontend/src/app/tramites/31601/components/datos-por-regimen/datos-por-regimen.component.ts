/* eslint-disable sort-imports */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import regimenTable from '../../../../../assets/json/31601/datos-por-regimen.json'
import { TableComponent } from '../../../../shared/components/table/table.component';
import { REQUERIDO } from '../../../../shared/constantes/mensajes-error-formularios';
import { ServiciosPantallaService } from '../../../../core/services/31601/servicios-pantalla.service';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { map, merge } from 'rxjs';
import { Tramite31601Store } from '../../../../estados/tramites/tramites31601.store';
import { TablePaginationComponent } from '../../../../shared/components/table-pagination/table-pagination.component';


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
  imports: [TituloComponent,
            CatalogoSelectComponent,
            CommonModule,
            ReactiveFormsModule,
            TableComponent,
            TablePaginationComponent],
})
export class DatosPorRegimenComponent implements OnInit {

  /**
   *Un catálogo de artículos.
   * Esta propiedad contiene una matriz de objetos 'Catalogo', que representan
   * Los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bimestreOneCatalog!: Catalogo[];

    /**
   *Un catálogo de artículos.
   * Esta propiedad contiene una matriz de objetos 'Catalogo', que representan
   * Los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bimestreTwoCatalog!: Catalogo[];

    /**
   *Un catálogo de artículos.
   * Esta propiedad contiene una matriz de objetos 'Catalogo', que representan
   * Los datos del catálogo.
   * @type {Catalogo[]}
   */
  public bimestreThreeCatalog!: Catalogo[];

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
  public regimenTableBodyData: unknown = [];

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
  public catalogModal! : Catalogo[];

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
   * @property {unknown[]} miembrodelaempresaBodyData
   *  Datos del cuerpo de la tabla de miembros de la empresa.
   */
    public miembrodelaempresaBodyData: unknown[] = [];



  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(private fb: FormBuilder,
              private validacionesService: ValidacionesFormularioService,
              private _pantallaSvc: ServiciosPantallaService,
              private tramite31601Store: Tramite31601Store) 
  {
    this.crearRegimenForm();
  }

  /**
    * Gancho de ciclo de vida que se llama después de inicializar las propiedades enlazadas a datos de una directiva.
    * Este método inicializa catálogos, establece valores de control de formularios, prepara los datos de la pestaña del régimen,
    * y recupera el formulario que se va a agregar.
    *
    * @memberof DatosPorRegimenComponent
    */
  ngOnInit() {
    this.inicializaCatalogos();
    this.establecervalorcontrolformulario();
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
    * se almacenan en las propiedades de la clase respectiva: 'bimestreOneCatalog',
    * 'bimestreTwoCatalog' y 'bimestreThreeCatalog'.
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
     * Obtiene los datos utilizando el método `getBimestreOneCatalog` del servicio `_pantallaSvc`
     * con el ID de catálogo `CAT_BIMESTRE_ONE`.
     * Los datos de la respuesta se asignan a la propiedad `bimestreOneCatalog`.
     *
     * @constant {Observable<any>} bimestreOneCatalog$
     */
    const bimestreOneCatalog$ = this._pantallaSvc
      .getBimestreOneCatalog(CATALOGOS_ID.CAT_BIMESTRE_ONE)
      .pipe(
        map((resp) => {
          this.bimestreOneCatalog = resp.data;
      })
    );


    /**
     * Observable que recupera el catálogo para el segundo bimestre.
     * Obtiene los datos utilizando el método `getBimestreOneCatalog` del servicio `_pantallaSvc`
     * con el ID de catálogo `CAT_BIMESTRE_TWO`.
     * Los datos de la respuesta se asignan a la propiedad `bimestreTwoCatalog`.
     *
     * @observable bimestreTwoCatalog$
     * @returns {Observable<any>} Un observable que emite los datos del catálogo para el segundo bimestre.
     */
    const bimestreTwoCatalog$ = this._pantallaSvc
      .getBimestreTwoCatalog(CATALOGOS_ID.CAT_BIMESTRE_TWO)
      .pipe(
        map((resp) => {
          this.bimestreTwoCatalog = resp.data;
      })
    );


    /**
     * Observable que recupera el catálogo para el tercer bimestre.
     * 
     * Este observable utiliza el método `getBimestreOneCatalog` del servicio `_pantallaSvc`
     * para recuperar los datos del catálogo identificados por `CATALOGOS_ID.CAT_BIMESTRE_THREE`. La respuesta
     * se mapea para extraer la propiedad `data` y asignarla a la propiedad `bimestreThreeCatalog`.
     * 
     * @constant {Observable<any>} bimestreThreeCatalog$
     */
    const bimestreThreeCatalog$ = this._pantallaSvc
      .getBimestreThreeCatalog(CATALOGOS_ID.CAT_BIMESTRE_THREE)
      .pipe(
        map((resp) => {
          this.bimestreThreeCatalog = resp.data;
      })
    );


    merge(
      bimestreOneCatalog$,
      bimestreTwoCatalog$,
      bimestreThreeCatalog$,
    ).subscribe();

  }

  /**
   * Crea e inicializa el FormGroup `regimenForm` con varios controles de formulario y sus validadores.
   * Los controles del formulario incluyen:
   * - `importaciones`: Un campo requerido para importaciones.
   * - `infraestructura`: Un campo requerido para infraestructura.
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
   * - `comboBimestresOne`: Un campo opcional para el primer combo bimestral.
   * - `comboBimestresTwo`: Un campo opcional para el segundo combo bimestral.
   * - `comboBimestresThree`: Un campo opcional para el tercer combo bimestral.
   * - `proveedorCumplimiento`: Un campo requerido para proveedor de cumplimiento.
   * - `declaracionISR`: Un campo requerido para declaración de ISR.
   * - `cancelacion`: Un campo requerido para cancelación.
   * - `cumplimientoReglas`: Un campo requerido para cumplimiento de reglas.
   * - `recintoFiscalizado`: Un campo requerido para recinto fiscalizado.
   * - `recintoEstrategico`: Un campo requerido para recinto estratégico.
   * - `cumplimientoLineamientos`: Un campo requerido para cumplimiento de lineamientos.
   */
  public crearRegimenForm() {
    this.regimenForm = this.fb.group({
      importaciones: ['',Validators.required],
      infraestructura: ['',Validators.required],
      ultimosMeses: ['',Validators.required],
      operacionesmeses: ['',Validators.required],
      valor: ['',Validators.required],
      transferencias: ['',Validators.maxLength(20)],
      transferenciasVir: ['',Validators.maxLength(7)],
      retornos: ['',Validators.maxLength(20)],
      retornosSe: ['',Validators.maxLength(7)],
      constancias: ['',Validators.maxLength(20)],
      constanciasDe: ['',Validators.maxLength(7)],
      total: [{value: '',disabled: true}],
      totals: [{value: '',disabled: true}],
      empleadosPropios: ['',Validators.required],
      numeroEmpleados: ['',Validators.required],
      comboBimestresOne: [''],
      comboBimestresTwo: [''],
      comboBimestresThree: [''],
      proveedorCumplimiento: ['',Validators.required],
      declaracionISR: ['',Validators.required],
      cancelacion: ['',Validators.required],
      cumplimientoReglas: ['',Validators.required],
      recintoFiscalizado: ['',Validators.required],
      recintoEstrategico: ['',Validators.required],
      cumplimientoLineamientos: ['',Validators.required]

    });
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
  public establecervalorcontrolformulario() {
    this.regimenForm.get('importaciones')?.setValue('Yes');
    this.regimenForm.get('infraestructura')?.setValue('Yes');
    this.regimenForm.get('ultimosMeses')?.setValue('Yes');
    this.regimenForm.get('operacionesmeses')?.setValue('Yes');
    this.regimenForm.get('empleadosPropios')?.setValue('Yes');
    this.regimenForm.get('numeroEmpleados')?.setValue('Yes');
    this.regimenForm.get('proveedorCumplimiento')?.setValue('Yes');
    this.regimenForm.get('declaracionISR')?.setValue('Yes');
    this.regimenForm.get('cancelacion')?.setValue('Yes');
    this.regimenForm.get('cumplimientoReglas')?.setValue('Yes');
    this.regimenForm.get('recintoFiscalizado')?.setValue('Yes');
    this.regimenForm.get('recintoEstrategico')?.setValue('Yes');
    this.regimenForm.get('cumplimientoLineamientos')?.setValue('Yes');
  }

  /**
   * Actualiza los datos de la tabla de régimen estableciendo los datos de cabecera y cuerpo
   * desde el método `getRegimenTableData`.
   *
   * @remarks
   * Este método asigna los datos de cabecera de la tabla a `regimenTableHeaderData`
   * y los datos del cuerpo de la tabla a `regimenTableBodyData`.
   */
  public regimenTabData() {
    this.regimenTableHeaderData = this.getRegimenTableData.tableHeader;
    this.regimenTableBodyData = this.getRegimenTableData.tableBody;
  }


  /**
   * Maneja la selección del primer bimestre (período de dos meses) del formulario.
   * Recupera el valor seleccionado del control 'comboBimestresOne' en el formulario
   * y actualiza la tienda con el bimestre seleccionado.
   */
  public bimestreOneSeleccion() {
    const bimestres = this.regimenForm.get('comboBimestresOne')?.value;
    this.tramite31601Store.setComboBimestresOne(bimestres);
  }

  /**
   * Maneja la selección del segundo bimestre (período de dos meses) del formulario.
   * Recupera el valor seleccionado del control 'comboBimestresTwo' en el formulario
   * y actualiza la tienda con el bimestre seleccionado.
   *
   * @remarks
   * Este método se utiliza para sincronizar el valor del bimestre seleccionado del formulario
   * con la tienda de gestión de estado de la aplicación.
   */
  public bimestreTwoSeleccion() {
    const bimestres = this.regimenForm.get('comboBimestresTwo')?.value;
    this.tramite31601Store.setComboBimestresTwo(bimestres);
  }


  /**
   * Maneja la selección del tercer bimestre (período de dos meses) del formulario.
   * Recupera el valor seleccionado del control 'comboBimestresThree' en el formulario
   * y actualiza la tienda con el bimestre seleccionado.
   */
  public bimestreThreeSeleccion() {
    const bimestres = this.regimenForm.get('comboBimestresThree')?.value;
    this.tramite31601Store.setComboBimestresThree(bimestres);
  }


  /**
   * Abre el modal e inicializa el formulario.
   * 
   * Este método establece el estado del modal en 'show' y llama al método `getAgregarForm`
   * para inicializar el formulario para agregar datos.
   */
  public abrirModal() {
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
   * - `agregarCatalogOne`: Una entrada de texto para la primera entrada del catálogo.
   * - `agregarCatalogTwo`: Una entrada de texto para la segunda entrada del catálogo.
   * - `agregarCatalogThree`: Una entrada de texto para la tercera entrada del catálogo.
   */
  public getAgregarForm() {
    this.agregarForm = this.fb.group({
      rfc: [''],
      registroInput: [{value: '',disabled: true}],
      razonSocialInput: [{value: '',disabled: true}],
      numero1re: [''],
      numero2do: [''],
      numero3re: [''],
      agregarCatalogOne: [''],
      agregarCatalogTwo: [''],
      agregarCatalogThree: ['']
    })
  }

  /**
   * Maneja la acción del modal para el primer bimestre.
   * Recupera el valor de 'agregarCatalogOne' del formulario de régimen
   * y lo establece en el tramite31601Store utilizando el método setComboBimestresOne.
   */
  public modalBimestreOne() {
    const bimestres = this.regimenForm.get('agregarCatalogOne')?.value;
    this.tramite31601Store.setComboBimestresOne(bimestres);
  }


  /**
   * Maneja la acción del modal para el segundo bimestre.
   * Recupera el valor de 'agregarCatalogTwo' del formulario de régimen
   * y lo establece en el comboBimestresOne del tramite31601Store.
   */
  public modalBimestreTwo() {
    const bimestres = this.regimenForm.get('agregarCatalogTwo')?.value;
    this.tramite31601Store.setComboBimestresOne(bimestres);
  }

  /**
   * Abre un modal para seleccionar bimestres (períodos de dos meses) y establece el valor seleccionado
   * en la tienda para su posterior procesamiento.
   *
   * Este método recupera el valor de 'agregarCatalogThree' del grupo de formularios 'regimenForm'
   * y lo utiliza para actualizar el 'ComboBimestresOne' en el 'tramite31601Store'.
   */
  public modalBimestreThree() {
    const bimestres = this.regimenForm.get('agregarCatalogThree')?.value;
    this.tramite31601Store.setComboBimestresOne(bimestres);
  }

  /**
   * @method updatePagination
   *  Actualiza los datos mostrados en la tabla según la paginación.
   */
    public updatePagination(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.miembrodelaempresaBodyData = this.miembrodelaempresaBodyData.slice(startIndex, startIndex + this.itemsPerPage);
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

}
