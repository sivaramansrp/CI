import { CamState, camCertificadoStore } from '../../estados/cam-certificado.store';
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@ng-mf/data-access-user';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, delay, map, of, takeUntil } from 'rxjs';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { CommonModule } from '@angular/common';
import { FECHA } from '../../constantes/cam-certificado.module';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';

/**
 * @descripcion
 * El componente `MercanciaComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de mercancías en el módulo CAM.
 */
@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.scss',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,CatalogoSelectComponent, InputFechaComponent],
})
export class MercanciaComponent implements OnInit, OnDestroy {
  /**
   * @descripcion
   * Indica si se debe mostrar la alerta.
   */
  mostrarAlerta: boolean = false;

  /**
   * @descripcion
   * Mensaje de alerta que se muestra al usuario.
   */
  mensajeDeAlerta: string = 'La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.';

  /**
   * @descripcion
   * Evento que se emite al cerrar el modal.
   */
  @Output() cerrarClicado = new EventEmitter();

  /**
   * @descripcion
   * Evento que se emite al seleccionar una fila en la tabla.
   */
  @Output() tablaSeleccionEvent = new EventEmitter();

  /**
   * @descripcion
   * Evento que se emite al guardar los datos del formulario.
   */
  @Output() guardarClicado = new EventEmitter();

  /**
   * @descripcion
   * Datos seleccionados para la mercancía.
   */
  @Input() datosSeleccionados!: Mercancia;

  /**
   * @descripcion
   * Formulario para capturar los datos de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * @descripcion
   * Lista de unidades de medida y clasificación (UMC) disponibles.
   */
  umc: Catalogo[] = [];

  /**
   * @descripcion
   * Lista de facturas disponibles.
   */
  factura: Catalogo[] = [];

  /**
   * @descripcion
   * Fecha final para el formulario.
   */
  fechaFinalInput: InputFecha = FECHA;

  /**
   * @descripcion
   * Notificador para gestionar la destrucción de suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual de la mercancía.
   */
  private mercanciaState!: CamState;

  /**
   * @descripcion
   * Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @descripcion
   * Constructor que inicializa los servicios y dependencias requeridas.
   * @param fb - Instancia de FormBuilder para gestionar formularios.
   * @param camCertificadoService - Servicio para obtener datos relacionados con el certificado.
   * @param store - Almacén para gestionar el estado del formulario de mercancías.
   * @param query - Consulta para obtener el estado del formulario.
   * @param seccionStore - Almacén para gestionar el estado de la sección.
   * @param seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private camCertificadoService: CamCertificadoService,
    private store: camCertificadoStore,
    private query: camCertificadoQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {}

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Obtiene los datos iniciales para el formulario.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();

    this.query.selectCam$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.mercanciaState = state as CamState;
        })
      )
      .subscribe();

    this.umcOpcion();
    this.facturasOpcion();
    this.initActionFormBuild();
  }

  /**
   * @descripcion
   * Inicializa el formulario de mercancías con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.mercanciaForm = this.fb.group({
      fraccionArancelaria: [this.mercanciaState.fraccionArancelaria],
      nombreComercialMercancia: [this.mercanciaState.nombreComercialMercancia],
      nombreTecnico: [this.mercanciaState.nombreTecnico],
      nombreIngles: [this.mercanciaState.nombreIngles],
      criterioClasificacion: [this.mercanciaState.criterioClasificacion],
      cantidad: [this.mercanciaState.cantidad, Validators.required],
      umc: [this.mercanciaState.umc, Validators.required],
      valorMercancia: [this.mercanciaState.valorMercancia, Validators.required],
      complementoClasificacion: [this.mercanciaState.complementoClasificacion, Validators.required],
      numeroFactura: [this.mercanciaState.numeroFactura, Validators.required],
      tipoFactura: [this.mercanciaState.tipoFactura, Validators.required],
    });
  }

  /**
   * @descripcion
   * Cierra el modal y oculta la alerta.
   */
  cerrarModal(): void {
    this.cerrarClicado.emit();
    this.mostrarAlerta = false;
  }

  /**
   * @descripcion
   * Activa la alerta en el modal.
   */
  activarModal(): void {
    this.mostrarAlerta = true;
  }

  /**
   * @descripcion
   * Obtiene la lista de unidades de medida y clasificación (UMC) disponibles.
   */
  umcOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('umc.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (data) => {
        this.umc = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.umc = [];
      },
    });
  }

  /**
   * @descripcion
   * Obtiene la lista de facturas disponibles.
   */
  facturasOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('factura.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (data) => {
        this.factura = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.factura = [];
      },
    });
  }

  /**
   * @descripcion
   * Acepta los datos del formulario, los guarda en el almacén y emite los eventos correspondientes.
   */
  aceptar(): void {
    this.guardarClicado.emit(this.mercanciaForm.value);
    this.store.setmercanciaTabla([this.mercanciaForm.value]);

    if (this.mostrarAlerta) {
      of(null)
        .pipe(
          takeUntil(this.destroyNotifier$),
          delay(100))
        .subscribe(() => {
          this.cerrarModal();
          this.tablaSeleccionEvent.emit(true);
        });
    }
  }

  /**
   * @descripcion
   * Actualiza el almacén con un valor específico del formulario.
   * @param form - El formulario que contiene el valor.
   * @param campo - El campo del formulario cuyo valor se actualizará.
   * @param metodoNombre - El método del almacén que se llamará para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof camCertificadoStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: camCertificadoStore) => void)(VALOR);
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama cuando el componente se destruye.
   * Limpia los recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}