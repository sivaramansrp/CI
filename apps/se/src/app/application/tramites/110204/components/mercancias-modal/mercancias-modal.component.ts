import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { Mercancia } from '../../models/plantas-consulta.model';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { Tramite110204Store } from '../../estados/tramite110204.store';
/**
 * Constante que representa la configuración de la fecha final.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};
@Component({
  selector: 'app-mercancias-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    InputFechaComponent],
  templateUrl: './mercancias-modal.component.html',
  styleUrl: './mercancias-modal.component.scss',
})

export class MercanciasModalComponent implements OnInit, OnDestroy {
  mostrarAlerta: boolean = false;
  /**
   * @property {string} mensajeDeAlerta - La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.
   */
  mensajeDeAlerta: string = 'La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.';
  mercanciaForm!: FormGroup;
  @Output() guardarClicado = new EventEmitter();
  @Output() cerrarClicado = new EventEmitter();


  /**
 * Array de datos a mostrar en la tabla.
 * Cada elemento de este array representa una fila de la tabla.
 *
 * @type {T[]}
 */
  @Input() datosSeleccionados!: Mercancia;
  /**
   * Subject utilizado para gestionar el ciclo de vida del componente y cancelar l`as suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  public fechaFinalInput: InputFecha = FECHA_FINAL;


  /**
   * Observable que emite la lista de estados disponibles.
   * @type {Observable<Catalogo[]>}
   */
  umcs$!: Observable<Catalogo[]>;
  /**
* Observable que emite la lista de estados disponibles.
* @type {Observable<Catalogo[]>}
*/
  facturas$!: Observable<Catalogo[]>;
  private actualizandoFormulario = false;

  constructor(private fb: FormBuilder, public store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query, public certificadoService: CertificadosOrigenGridService,
  ) {

    this.tramiteQuery?.formMercancia$?.pipe(
      takeUntil(this.destroyNotifier$)).subscribe((estado) => {

      // eslint-disable-next-line dot-notation
      if (!this.actualizandoFormulario && estado && estado['fraccionNaladiSa02']) {
        this.actualizandoFormulario = true;
        this.mercanciaForm.patchValue(estado);
        this.actualizandoFormulario = false;
      }
    });
    this.facturas$ = this.tramiteQuery.selectFactura$;
    this.umcs$ = this.tramiteQuery.selectUmc$;

  }

  ngOnInit(): void {
    this.mercanciaForm = this.fb.group({
      fraccionNaladi: [{ value: '', disabled: true }],
      fraccionNaladiSa93: [{ value: '', disabled: true }],
      fraccionNaladiSa96: [{ value: '', disabled: true }],
      fraccionNaladiSa02: [{ value: '', disabled: true }],
      nombreComercial: [{ value: '', disabled: true }],
      nombreTecnico: [{ value: '', disabled: true }],
      normaOrigen: [{ value: '', disabled: true }],
      cantidad: [''],
      umc: [''],
      valorMercancia: [''],
      complementoClasificacion: [''],
      fechaFinalInput: ['',[Validators.required]],
      numeroFactura: [''],
      tipoFactura: ['']
    });

    this.parchearValoresDelFormulario();
    this.cargarFactura();
    this.cargarUmc();
    this.mercanciaForm.valueChanges.subscribe(value => {
      if (!this.actualizandoFormulario) {
        this.store.setFormMercancia(value);
      }
    });
  }
  /**
   * @method parchearValoresDelFormulario
   * @description Este método parcha los valores del formulario `mercanciaForm` con los datos seleccionados (`datosSeleccionados`).
   * Si `datosSeleccionados` está definido, se actualizan los campos del formulario con los valores correspondientes de `datosSeleccionados`.
   */
  parchearValoresDelFormulario(): void {

    if (this.datosSeleccionados) {
      this.mercanciaForm.patchValue({
        fraccionNaladi: this.datosSeleccionados.fraccionNaladi,
        fraccionNaladiSa93: this.datosSeleccionados.fraccionNaladiSa93,
        fraccionNaladiSa96: this.datosSeleccionados.fraccionNaladiSa96,
        fraccionNaladiSa02: this.datosSeleccionados.fraccionNaladiSa02,
        nombreComercial: this.datosSeleccionados.nombreComercial,
        nombreTecnico: this.datosSeleccionados.nombreTecnico,
        normaOrigen: this.datosSeleccionados.normaOrigen,
        cantidad: this.datosSeleccionados.cantidad,
        umc: this.datosSeleccionados.umc,
        valorMercancia: this.datosSeleccionados.valorMercancia,
        complementoClasificacion: this.datosSeleccionados.complementoClasificacion,
        fechaFinalInput: this.datosSeleccionados.fechaFinalInput,
        numeroFactura: this.datosSeleccionados.numeroFactura,
        tipoFactura: this.datosSeleccionados.tipoFactura
      });
    }
  }
  /**
   * Establece el estado seleccionado en el store.
   * @param {Catalogo} factura El estado seleccionado.
   */
  tipoFacturasSeleccion(factura: Catalogo): void {
    this.store.setFactura([factura]);
  }
  /**
    * Establece el estado seleccionado en el store.
    * @param {Catalogo} umc El estado seleccionado.
    */
  tipoUmcSeleccion(umc: Catalogo): void {
    this.store.setUmc([umc]);
  }

  /**
   * Carga las facturas desde el servicio y las establece en el store.
   */
  cargarFactura(): void {
    this.certificadoService
      .obtenerFacturas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setFactura(data)
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }
    /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
    public cambioFechaFinal(nuevo_valor: string): void {

      this.mercanciaForm.get('fechaFinal')?.setValue(nuevo_valor);
      this.mercanciaForm.get('fechaFinal')?.markAsUntouched();
    }
  

  /**
   * Carga las UMC desde el servicio y las establece en el store.
   */
  cargarUmc(): void {
    this.certificadoService
      .obtenerUmc()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setUmc(data)
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  /**
   * Dispara el evento para guardar los datos del formulario y muestra una alerta.
   */
  activarModal(): void {
    this.guardarClicado.emit(this.mercanciaForm.value);
    this.mostrarAlerta = true;
  }

  /**
   * Dispara el evento para cerrar el modal y oculta la alerta.
   */
  cerrarModal(): void {
    this.cerrarClicado.emit();
    this.mostrarAlerta = false;
  }

  /**
   * Cancela las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
