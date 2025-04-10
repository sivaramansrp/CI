import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, TituloComponent } from "@libs/shared/data-access-user/src";
import { CatalogoLista, TipoDocumento } from "../../models/aviso-traslado.model";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TEXTOS, TIPO_DOCUMENTO } from "../../constants/aviso-traslado.enum";
import { Tramite32503State, Tramite32503Store } from "../../../../estados/tramites/tramite32503.store";
import { AvisoTrasladoService } from "../../services/aviso-traslado.service";
import { CommonModule } from "@angular/common";
import { Subject } from "rxjs";
import { Tramite32503Query } from "../../../../estados/queries/tramite32503.query";
import { map } from "rxjs";
import { takeUntil } from "rxjs";

/**
 * Componente para gestionar el paso dos del trámite 32503.
 * 
 * Este componente permite al usuario seleccionar y gestionar los requisitos opcionales
 * relacionados con el trámite, como el tipo de documento, y realizar operaciones como
 * agregar, eliminar y seleccionar filas en una tabla.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent,
  ],
})
export class PasoDosComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Formulario reactivo para gestionar los requisitos opcionales.
   */
  requisitosOpcionalesFormulario!: FormGroup;

  /**
   * Estado actual del trámite 32503.
   */
  public tramiteState!: Tramite32503State;

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Clase CSS para mostrar alertas informativas.
   */
  infoAlert = 'alert-info';

  /**
   * Configuración del catálogo de tipos de documentos.
   */
  tipoDocumento: CatalogosSelect = TIPO_DOCUMENTO;

  /**
   * Referencia al checkbox para seleccionar todas las filas de la tabla.
   */
  @ViewChild('controlarCajaTodo') controlarCajaTodo!: ElementRef;

  /**
   * Datos de la tabla que contiene los tipos de documentos seleccionados.
   */
  tablaDatos: TipoDocumento[] = [];

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite32503Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite32503Query} tramiteQuery - Query para consultar el estado del trámite.
   * @param {AvisoTrasladoService} avisoTrasladoService - Servicio para obtener datos relacionados con el aviso de traslado.
   */
  constructor(
    public fb: FormBuilder,
    public store: Tramite32503Store,
    public tramiteQuery: Tramite32503Query,
    public avisoTrasladoService: AvisoTrasladoService,
  ) {
    // Constructor
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Configura el formulario, carga los datos iniciales y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.tablaDatos = [...this.tramiteState.tipoTablaDatos];
    this.inicializarFormulario();
    this.cargarTipoDocumento();
  }

  /**
 * Actualiza el estado del store con el valor seleccionado en el formulario.
 * 
 * Este método toma el valor de un campo específico del formulario y lo envía al método correspondiente
 * del store para actualizar el estado del trámite.
 * 
 * @param {FormGroup} form - El formulario reactivo que contiene los datos.
 * @param {string} campo - El nombre del campo en el formulario cuyo valor se desea actualizar en el store.
 * @param {keyof Tramite32503Store} metodoNombre - El nombre del método en el store que se utilizará para actualizar el estado.
 */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32503Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Método que se ejecuta después de que la vista del componente ha sido inicializada.
   * 
   * Marca el checkbox de "seleccionar todo" si todas las filas de la tabla están seleccionadas.
   */
  ngAfterViewInit(): void {
    this.controlarCajaTodo.nativeElement.checked = this.tablaDatos.every((el) => el.controlarCaja);
  }

  /**
   * Inicializa el formulario con los datos del estado del trámite.
   */
  inicializarFormulario(): void {
    this.requisitosOpcionalesFormulario = this.fb.group({
      tipoDocumento: [this.tramiteState?.tipoDocumento, [Validators.required]],
    });
  }

  /**
   * Carga el catálogo de tipos de documentos desde el servicio.
   */
  public cargarTipoDocumento(): void {
    this.avisoTrasladoService
      .obtenerTipoDocumento()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.tipoDocumento.catalogos = datos.datos;
        }
      );
  }

  /**
   * Selecciona o deselecciona una fila de la tabla.
   * 
   * @param {TipoDocumento} e - Fila seleccionada.
   */
  seleccionarFila(e: TipoDocumento): void {
    e.controlarCaja = !e.controlarCaja;
    this.controlarCajaTodo.nativeElement.checked = this.tablaDatos.every((el) => el.controlarCaja);
    this.setTipoTablaDatos();
  }

  /**
   * Selecciona o deselecciona todas las filas de la tabla.
   * 
   * @param {Event} e - Evento del checkbox "seleccionar todo".
   */
  seleccionarFilaTodo(e: Event): void {
    this.tablaDatos.forEach((el) => {
      el.controlarCaja = (e.target as HTMLInputElement).checked;
    });
    this.setTipoTablaDatos();
  }

  /**
   * Valida el formulario de requisitos opcionales.
   */
  validarRequisitosOpcionalesFormulario(): void {
    this.requisitosOpcionalesFormulario.markAllAsTouched();
  }

  /**
   * Elimina las filas seleccionadas de la tabla.
   */
  eliminarFilaSeleccionada(): void {
    this.tablaDatos = this.tablaDatos.filter((el) => el.controlarCaja === false);
    this.controlarCajaTodo.nativeElement.checked = false;
    this.setTipoTablaDatos();
  }

  /**
   * Agrega una nueva fila a la tabla.
   */
  agregarFila(): void {
    const TIPO = this.requisitosOpcionalesFormulario.get('tipoDocumento')?.value;
    const EL = this.tipoDocumento.catalogos.find((el) => el.id.toString() === TIPO);
    if (TIPO && EL) {
      this.tablaDatos.push({ ...EL, controlarCaja: false });
      this.controlarCajaTodo.nativeElement.checked = false;
      this.setTipoTablaDatos();
    }
  }

  /**
   * Actualiza el estado del store con los datos de la tabla.
   */
  setTipoTablaDatos(): void {
    this.store.setTipoTablaDatos(this.tablaDatos);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}