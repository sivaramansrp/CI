import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
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
  templateUrl: './MerchandiseModal.component.html',
  styleUrl: './MerchandiseModal.component.scss',
})

export class MerchandiseModalComponent implements OnInit, OnDestroy {
  mercanciaForm!: FormGroup;
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

  constructor(private fb: FormBuilder, public store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query) {

    this.tramiteQuery.formMercancia$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((estado) => {
      if (estado) {
        this.mercanciaForm.patchValue(estado);
      }
    });


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
    this.mercanciaForm.valueChanges.subscribe(value => {
      this.store.setFormMercancia(value);
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
