import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { Mercancia } from '../../models/plantas-consulta.model';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { Tramite110204Store } from '../../estados/tramite110204.store';
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};
@Component({
  selector: 'app-merchandise-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    InputFechaComponent],
  templateUrl: './merchandise-modal.component.html',
  styleUrl: './merchandise-modal.component.scss',
})

export class MerchandiseModalComponent implements OnInit, OnDestroy {
  showAlert: boolean = false;
  alertMessage: string = 'La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.';
  mercanciaForm!: FormGroup;
  @Output() saveClicked = new EventEmitter();
  @Output() closeClicked = new EventEmitter();


  /**
 * Array de datos a mostrar en la tabla.
 * Cada elemento de este array representa una fila de la tabla.
 *
 * @type {T[]}
 */
  @Input() selectedData!: Mercancia;
  /**
   * Subject utilizado para gestionar el ciclo de vida del componente y cancelar las suscripciones.
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
  private isUpdatingForm = false;

  constructor(private fb: FormBuilder, public store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query, public certificadoService: CertificadosOrigenGridService,
  ) {

    this.tramiteQuery?.formMercancia$?.pipe(
      takeUntil(this.destroyNotifier$)).subscribe((estado) => {

      // eslint-disable-next-line dot-notation
      if (!this.isUpdatingForm && estado && estado['fraccionNaladiSa02']) {
        this.isUpdatingForm = true;
        this.mercanciaForm.patchValue(estado);
        this.isUpdatingForm = false;
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
      fechaFinalInput: [''],
      numeroFactura: [''],
      tipoFactura: ['']
    });

    this.patchFormValues();
    this.cargarFactura();
    this.cargarUmc();
    this.mercanciaForm.valueChanges.subscribe(value => {
      if (!this.isUpdatingForm) {
        this.store.setFormMercancia(value);
      }
    });
  }
  patchFormValues(): void {

    if (this.selectedData) {
      this.mercanciaForm.patchValue({
        fraccionNaladi: this.selectedData.fraccionNaladi,
        fraccionNaladiSa93: this.selectedData.fraccionNaladiSa93,
        fraccionNaladiSa96: this.selectedData.fraccionNaladiSa96,
        fraccionNaladiSa02: this.selectedData.fraccionNaladiSa02,
        nombreComercial: this.selectedData.nombreComercial,
        nombreTecnico: this.selectedData.nombreTecnico,
        normaOrigen: this.selectedData.normaOrigen,
        cantidad: this.selectedData.cantidad,
        umc: this.selectedData.umc,
        valorMercancia: this.selectedData.valorMercancia,
        complementoClasificacion: this.selectedData.complementoClasificacion,
        fechaFinalInput: this.selectedData.fechaFinalInput,
        numeroFactura: this.selectedData.numeroFactura,
        tipoFactura: this.selectedData.tipoFactura
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

  cargarFactura(): void {
    this.certificadoService
      .obtenerFacturas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setFactura(data)
          // data.forEach(factura => this.store.setFactura(factura));
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

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

  triggerModal(): void {
    this.saveClicked.emit(this.mercanciaForm.value);
    this.showAlert = true;
  }

  closeModal(): void {
    this.closeClicked.emit();
    this.showAlert = false;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
