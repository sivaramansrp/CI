import { Catalogo, InputFecha, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, delay, map, of, takeUntil } from 'rxjs';
import { Tramite110222State, Tramite110222Store } from '../../estados/tramite110222.store';
import { FECHA } from '../../constantes/peru-certificado.module';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';


/**
 * @descripcion
 * El componente `MercanciaComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de mercancías en el módulo PERU.
 */
@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.scss',
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
  fechaFactura: InputFecha = FECHA;

  /**
   * @descripcion
   * Notificador para gestionar la destrucción de suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual de la mercancía.
   */
  private mercanciaState!: Tramite110222State;

  /**
   * @descripcion
   * Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @descripcion
   * Constructor que inicializa los servicios y dependencias requeridas.
   * @param fb - Instancia de FormBuilder para gestionar formularios.
   * @param ValidarInicialmenteCertificadoService - Servicio para obtener datos relacionados con el certificado.
   * @param store - Almacén para gestionar el estado del formulario de mercancías.
   * @param query - Consulta para obtener el estado del formulario.
   * @param seccionStore - Almacén para gestionar el estado de la sección.
   * @param seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private ValidarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    private store: Tramite110222Store,
    private query: Tramite110222Query,
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

    this.query.selectTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.mercanciaState = state as Tramite110222State;
          this.initActionFormBuild();
        })
      )
      .subscribe();

    this.umcOpcion();
    this.facturasOpcion();
  }

  /**
   * @descripcion
   * Inicializa el formulario de mercancías con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.mercanciaForm = this.fb.group({
      fraccionArancelaria: [this.mercanciaState.mercanciaForm['fraccionArancelaria']],
      nombreComercialMercancia: [{ value: this.mercanciaState.mercanciaForm['nombreComercialMercancia'], disabled: true }],
      nombreTecnico: [{ value: this.mercanciaState.mercanciaForm['nombreTecnico'], disabled: true }],
      criterioParaTratoPreferencial: [{ value: this.mercanciaState.mercanciaForm['criterioParaTratoPreferencial'], disabled: true }],
      valorDeContenidoRegional: [{ value: this.mercanciaState.mercanciaForm['valorDeContenidoRegional'], disabled: true }],
      otrasInstancias: [{ value: this.mercanciaState.mercanciaForm['otrasInstancias'], disabled: true }],
      criterioParaConferirOrigen: [{ value: this.mercanciaState.mercanciaForm['criterioParaConferirOrigen'], disabled: true }],
      cantidad: [this.mercanciaState.cantidad, Validators.required],
      umc: [this.mercanciaState.umc, Validators.required],
      valorMercancia: [this.mercanciaState.valorMercancia, Validators.required],
      complementoDescripcion: [this.mercanciaState.complementoDescripcion],
      numeroFactura: [this.mercanciaState.numeroFactura, Validators.required],
      tipoFactura: [this.mercanciaState.tipoFactura, Validators.required],
      numeroDeSerie: [this.mercanciaState.numeroDeSerie]
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
    this.ValidarInicialmenteCertificadoService.obtenerMenuDesplegable('umc.json')
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
    this.ValidarInicialmenteCertificadoService.obtenerMenuDesplegable('factura.json')
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
    metodoNombre: keyof Tramite110222Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: Tramite110222Store) => void)(VALOR);
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