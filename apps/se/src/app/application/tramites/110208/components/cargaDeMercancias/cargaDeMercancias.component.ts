import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFecha, InputFechaComponent, RespuestaCatalogos, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ALERTA_PARA, FECHA_DE_FACTURA } from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum';
import { MERCANCIA_TABLA, MercanciasInfo } from '@libs/shared/data-access-user/src/core/models/110208/certificado.model';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

/**
 * Interfaz que representa la respuesta de la tabla.
 */
export interface RespuestaTabla {
  /**
   * Código de respuesta.
   */
  code: number;
  /**
   * Datos de la tabla NICO.
   */
  data: MercanciasInfo[];
  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

/**
 * Interfaz que representa la información del formulario de mercancías.
 */
export interface MercanciasFormInfo {
  /**
   * Fracción arancelaria de la mercancía.
   */
  fraccionArancelaria: string;

  /**
   * Nombre comercial de la mercancía.
   */
  nombreComercial: string;

  /**
   * Nombre técnico de la mercancía.
   */
  nombreTecnio: string;

  /**
   * Nombre en inglés de la mercancía.
   */
  nombreEnIngles: string;

  /**
   * Criterio para la mercancía.
   */
  criterioPara: string;

  /**
   * Marca de la mercancía.
   */
  marca: string;

  /**
   * Unidad de medida comercial (UMC) de la mercancía.
   */
  umc: string;

  /**
   * Cantidad de la mercancía.
   */
  cantidad: string;

  /**
   * Valor de la mercancía.
   */
  valorDeLa: string;

  /**
   * Descripción complementaria de la mercancía.
   */
  complementoDescripcion: string;

  /**
   * Número de factura asociado a la mercancía.
   */
  nFactura: string;
}

/**
 * Interfaz que representa la respuesta de los datos.
 */
export interface RespuestaDatos {
  /**
   * Código de respuesta.
   */
  code: number;
  /**
   * Datos de la tabla NICO.
   */
  data: MercanciasFormInfo[];
  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

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
   * Notificador para destruir observables activos.
   */
  private destroyed$ = new Subject<void>();

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
    private tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.tramite110208Query
      .selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerFormDatos();

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
      nFactura: [this.solicitudState?.nFactura],
      tipoDeFactura: [this.solicitudState?.tipoDeFactura],
      fechaFactura: [this.solicitudState?.fechaFactura],
    });
  }

  /**
   * Obtiene los datos de la tabla de mercancías.
   */
  obtenerTablaDatos(): void {
    this.service
      .obtenerTablaDatos()
      .pipe(takeUntil(this.destroyed$))
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
      .pipe(takeUntil(this.destroyed$))
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
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
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
      .pipe(takeUntil(this.destroyed$))
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
    (this.tramite110208Store[metodoNombre] as (value: any) => void)(VALOR);
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
    (this.tramite110208Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}