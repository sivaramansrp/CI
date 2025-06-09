import {
  Catalogo,
  ConsultaioQuery,
  TableComponent,
  TituloComponent
} from '@ng-mf/data-access-user';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Solicitud105State, Tramite105Store } from '../../estados/tramite105.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { InvoCarService } from '../../services/invocar.service';
import { Tramite105Query } from '../../estados/tramite105.query';
import mercanciaTable from 'libs/shared/theme/assets/json/105/mercancia-table.json';
import { MERCANCIA_TABLEDOS_TABLE_BODY_DATA } from '../../constantes/datos-del-tramite.enum';
/**
 * Interfaz que representa los datos del cuerpo de la tabla de mercancías.
 * 
 * @interface TableBodyData
 */
interface TableBodyData {
  /**
   * Datos del cuerpo de la tabla.
   * 
   * @type {string[]}
   * @memberof TableBodyData
   */
  tbodyData: string[];
}

/**
 * Componente para gestionar los datos del trámite dos.
 * 
 * Este componente permite capturar información relacionada con el trámite, como operaciones, mercancías, y agentes aduanales.
 * 
 * @export
 * @class DatosDelTramiteDosComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
/**
 * Componente que gestiona los datos del trámite dos.
 * 
 * Este componente incluye formularios para capturar información relacionada con el trámite,
 * como datos del agente aduanal y mercancías. También maneja la interacción con un modal
 * y la comunicación con un store para gestionar el estado de la solicitud.
 * 
 * @export
 * @class DatosDelTramiteDosComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-datos-del-tramite-dos',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, TableComponent, ReactiveFormsModule],
  templateUrl: './datos-del-tramite-dos.component.html',
  styleUrl: './datos-del-tramite-dos.component.scss',
})
export class DatosDelTramiteDosComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para los datos del trámite dos.
   * 
   * @type {FormGroup}
   * @memberof DatosDelTramiteDosComponent
   */
  public datosDelTramiteDos!: FormGroup;

  /**
   * Formulario para los datos del agente aduanal.
   * 
   * @type {FormGroup}
   * @memberof DatosDelTramiteDosComponent
   */
  public agenteForm!: FormGroup;

  /**
   * Formulario para agregar mercancías.
   * 
   * @type {FormGroup}
   * @memberof DatosDelTramiteDosComponent
   */
  public agregarForm!: FormGroup;

  /**
   * Estado del modal.
   * 
   * @type {string}
   * @memberof DatosDelTramiteDosComponent
   */
  public modal: string = 'modal';

  /**
   * Sujeto para notificar la destrucción del componente.
   * 
   * @private
   * @type {Subject<void>}
   * @memberof DatosDelTramiteDosComponent
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud.
   * 
   * @type {Solicitud105State}
   * @memberof DatosDelTramiteDosComponent
   */
  public solicitudState!: Solicitud105State;

  /**
   * Referencia al elemento del modal.
   * 
   * @type {ElementRef}
   * @memberof DatosDelTramiteDosComponent
   */
  @ViewChild('modal') modalElement!: ElementRef;

  /**
   * Referencia al botón de cerrar modal.
   * 
   * @type {ElementRef}
   * @memberof DatosDelTramiteDosComponent
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Catálogo de operaciones.
   * 
   * @type {CatalogosSelect}
   * @memberof DatosDelTramiteDosComponent
   */
  operaciones:Catalogo[] = []



  /**
   * Datos de la tabla de mercancías.
   * 
   * @type {any}
   * @memberof DatosDelTramiteDosComponent
   */
  public getMercanciaTableData = mercanciaTable;

  /**
   * Encabezado de la tabla de mercancías.
   * 
   * @type {string[]}
   * @memberof DatosDelTramiteDosComponent
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de mercancías.
   * 
   * @type {TableBodyData[]}
   * @memberof DatosDelTramiteDosComponent
   */
  public mercanciaBodyData: TableBodyData[] = [];

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor de formularios.
   * @param {Tramite105Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite105Query} query - Query para obtener datos del estado.
   * @param {InvoCarService} invoCarService - Servicio para obtener datos de catálogos.
   * @memberof DatosDelTramiteDosComponent
   */

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private store: Tramite105Store,
    private query: Tramite105Query,
    private invoCarService: InvoCarService,
    private consultaioQuery: ConsultaioQuery
  ) {
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
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * @memberof DatosDelTramiteDosComponent
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
       
      )
      .subscribe();

    this.getOperaciones();
    this.obtenerMercancia();
    this.crearFormularios()
    this.inicializarEstadoFormulario();
  }
/**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.fetchTableDummyJson();
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
      this.query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    this.crearFormularios();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.datosDelTramiteDos.disable();
        this.agenteForm.disable();
      } else if (!this.esFormularioSoloLectura) {
         this.datosDelTramiteDos.enable();
        this.agenteForm.enable();
      } 
  }

  /**
 * Método para obtener datos de ejemplo para la tabla.
 * Retorna un arreglo vacío de tipo TablaDatos.
 *
 * @returns Un arreglo vacío de TablaDatos.
 */
fetchTableDummyJson(): void {
  this.mercanciaBodyData.push(MERCANCIA_TABLEDOS_TABLE_BODY_DATA);
}

  /**
   * Inicializa y crea los formularios reactivos utilizados en el componente.
   * 
   * Este método configura dos formularios:
   * - `datosDelTramiteDos`: Contiene los campos relacionados con el trámite, 
   *   inicializados con valores provenientes del estado de la solicitud y con validadores requeridos.
   * - `agenteForm`: Contiene los campos para los datos del agente, todos con validadores requeridos.
   * 
   * @returns {void} No retorna ningún valor.
   */
  crearFormularios(): void {
    this.datosDelTramiteDos = this.fb.group({
      procedimientoCargaDescarga: [this.solicitudState?.procedimientoCargaDescarga, Validators.required],
      sistemasMedicionUbicacion: [this.solicitudState?.sistemasMedicionUbicacion, Validators.required],
      motivoNoDespachoAduana: [this.solicitudState?.motivoNoDespachoAduana, Validators.required],
      operaciones: [this.solicitudState?.operaciones, Validators.required],
    });

    this.agenteForm = this.fb.group({
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      numeroPatente: ['', Validators.required],
    });

   }
  /**
   * Cierra el modal.
   * 
   * @memberof DatosDelTramiteDosComponent
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Obtiene los datos de mercancías.
   * 
   * @memberof DatosDelTramiteDosComponent
   */
  public obtenerMercancia(): void {
    this.mercanciaHeaderData = this.getMercanciaTableData.mercanciaTabledos.tableHeader;
    this.mercanciaBodyData = this.getMercanciaTableData.mercanciaTabledos.tableBody;
  }

  /**
   * Establece valores en el store.
   * 
   * @param {FormGroup} form - Formulario.
   * @param {string} campo - Nombre del campo.
   * @param {keyof Tramite105Store} metodoNombre - Nombre del método del store.
   * @memberof DatosDelTramiteDosComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite105Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Abre el modal.
   * 
   * @memberof DatosDelTramiteDosComponent
   */
  public abrirModal(): void {
    this.modal = 'show';
  }

  /**
   * Obtiene las operaciones desde el servicio.
   * 
   * @memberof DatosDelTramiteDosComponent
   */
  getOperaciones(): void {
   this.invoCarService.getPais().pipe( takeUntil(this.destroyNotifier$)).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
         this.operaciones = RESPONSE;
      }
    });
  }

  /**
   * Agrega mercancías a la tabla.
   * 
   * @memberof DatosDelTramiteDosComponent
   */
  agregarMercancias(): void {
    if (!this.agenteForm.valid) {
      return;
    }
    const MERCANCIA = this.agenteForm.value;
    this.getMercanciaTableData.mercanciaTabledos.tableBody.push(MERCANCIA);
    this.agenteForm.reset();
    this.cerrarModal();
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * @memberof DatosDelTramiteDosComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.modal = 'modal';
  }
}