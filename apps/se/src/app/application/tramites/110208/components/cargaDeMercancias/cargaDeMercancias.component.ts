import { ALERTA_PARA, FECHA_DE_FACTURA } from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MERCANCIA_TABLA, MercanciasFormInfo, MercanciasInfo } from '@libs/shared/data-access-user/src/core/models/110208/certificado.model';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';

/**
 * Componente que gestiona la carga de mercancías.
 */
@Component({
  selector: 'app-carga-de-mercancias',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  templateUrl: './cargaDeMercancias.component.html',
  styleUrl: './cargaDeMercancias.component.css',
})
export class CargaDeMercanciasComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar los datos de mercancías.
   */
  formMercancia!: FormGroup; 
  /**
   * Tipo de selección de tabla (RADIO).
   */
  tipoSeleccionTabla = TablaSeleccion.RADIO;
  /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Configuración del input de fecha de factura.
   */
  public fechaFacturaInput: InputFecha = FECHA_DE_FACTURA;

  /**
   * Alerta para el componente.
   */
  public alerta = ALERTA_PARA;

  /**
   * Configuración de las columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIA_TABLA;

  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Datos del formulario de mercancías.
   */
  mercanciasFormaDatos: MercanciasFormInfo[] = [];

  /**
   * Lista de catálogos de estados.
   */
  estado: Catalogo[] = [];

  /** Almacena la fila seleccionada de la tabla de mercancías. */
  public seleccionadoRow: MercanciasInfo | null = null;

  private modalInstance!: Modal;

  /**
   * Constructor del componente.
   * @param fb Constructor del formulario reactivo.
   * @param service Servicio para validar inicialmente.
   * @param tramite110208Store Store del trámite 110208.
   * @param tramite110208Query Query del trámite 110208.
   */
  constructor(
    private fb: FormBuilder,
    private service: ValidarInicalmenteService,
    public tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query,
    private consultaioQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void { 
    this.inicializarEstadoFormulario();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerFormDatos();    
  }

  /**
   * Inicializa el formulario con datos del store y aplica validaciones.
   * También aplica configuración de solo lectura si es necesario.
   * @method inicializarEstadoFormulario
   */
  inicializarEstadoFormulario(): void {
    this.tramite110208Query
    .selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
    this.formMercancia = this.fb.group({
      fraccionArancelaria: [{ value: '', disabled: true }],
      nombreComercial: [{ value: '', disabled: true }],
      nombreTecnio: [{ value: '', disabled: true }],
      nombreEnIngles: [{ value: '', disabled: true }],
      criterioPara: [{ value: '', disabled: true }],
      marca: [this.solicitudState?.marca],
      umc: [this.solicitudState?.umc],
      cantidad: [this.solicitudState?.cantidad, Validators.required],
      valorDeLa: [this.solicitudState?.valorDeLa, Validators.required],
      complementoDescripcion: [this.solicitudState?.complementoDescripcion, Validators.required],
      nFactura: [this.solicitudState?.nFactura, Validators.required],
      tipoDeFactura: [this.solicitudState?.tipoDeFactura, Validators.required],
      fechaFactura: [this.solicitudState?.fechaFactura, Validators.required],
    });
    if (this.esFormularioSoloLectura) {
      Object.keys(this.formMercancia.controls).forEach((key) => {
        this.formMercancia.get(key)?.disable();
      });
    }
  }

  /**
   * Obtiene los datos de la tabla de mercancías.
   */
  obtenerTablaDatos(): void {
    this.service.obtenerTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.mercanciasTablaDatos = DATOS;
      });
  }

  /**
   * Obtiene los datos del formulario de mercancías.
   */
  obtenerFormDatos(): void {
    this.service
      .obtenerFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.mercanciasFormaDatos = data?.data;
        this.formMercancia.patchValue({
          fraccionArancelaria: this.mercanciasFormaDatos[0].fraccionArancelaria,
          nombreComercial: this.mercanciasFormaDatos[0].nombreComercial,
          nombreTecnio: this.mercanciasFormaDatos[0].nombreTecnio,
          nombreEnIngles: this.mercanciasFormaDatos[0].nombreEnIngles,
          criterioPara: this.mercanciasFormaDatos[0].criterioPara,
        });
      });
  }

  /**
   * Abre el modal para agregar mercancías.
   */
  abrirDialogoMercancias(): void {
    if (this.seleccionadoRow) {
      if (this.modalElement) {
        this.modalInstance = new Modal(this.modalElement.nativeElement);
        this.modalInstance.show();
        this.formMercancia.patchValue({
          fraccionArancelaria: this.seleccionadoRow.fraccion_arancelaria,
          nombreComercial: 'TSB Door Latch ZV GL2 left',
          nombreTecnio: 'NOMBRE EN INGLES',
          nombreEnIngles: 'NOMBRE EN INGLES',
          criterioPara: this.seleccionadoRow.valor_mercancia,
        });
      }
    }
  }

  /**
   * Cierra el modal.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerEstadoList(): void {
    this.service
      .obtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  /**
   * Cambia la fecha de la factura en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario.
   * @param metodoNombre Método del store a ejecutar.
   */
  public cambioFechaFactura(
    nuevo_valor: string,
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    this.formMercancia.get('fechaFactura')?.setValue(nuevo_valor);
    this.formMercancia.get('fechaFactura')?.markAsUntouched();
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Establece valores en el store.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario.
   * @param metodoNombre Método del store a ejecutar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
 * Asigna la fila seleccionada de la tabla de mercancías al atributo correspondiente.
 * @param event - Fila de mercancía seleccionada.
 */
  filaSeleccionadaEvento(event: MercanciasInfo): void {
    if (event) {
      this.seleccionadoRow = event; 
    }
  }

  /**
  * compo doc
  * @method esValido
  * @description 
  * Verifica si un campo específico del formulario es válido.
  * @param campo El nombre del campo que se desea validar.
  * @returns {boolean | null} Un valor booleano que indica si el campo es válido.
  */
  public esValido(campo: string): boolean | null {
    return this.validacionesService.isValid(this.formMercancia, campo);
  }

  
  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}