import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { ProductoOpción } from '../../constantes/vehiculos-adaptados.enum';
/**
 * @description Componente para manejar los detalles de la mercancía.
 * Proporciona entradas para configurar un formulario y opciones para productos, fracciones y unidades.
 */
@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrl: './datos-de-la-mercancia.component.scss',
})
export class DatosDeLaMercanciaComponent {
  /**
   * @description El grupo de formulario reactivo para capturar los detalles.
   */
  @Input() form!: FormGroup;
  @Input() mercanciaInputValues: {
    label: string;
    placeholder: string;
    required: boolean;
    controlName: string
  }[] = [];
  /**
   * @description Opciones disponibles para los productos.
   */
  @Input() productoOpciones: ProductoOpción[] = [];

  /**
   * @description Catálogo que contiene opciones de fracción.
   */
  @Input() mercanciaCatalogoArray: Catalogo[][] = [];

  /**
   * @description Catálogo que contiene opciones de unidad.
   */
  @Input() unidadCatalogo: Catalogo[] = [];

  /**
 * @description Catálogo que contiene opciones de unidad.
 */
  @Input() nicoCatalogoArray: Catalogo[] = [];

  /**
   * @description Emisor de eventos para pasar datos del formulario al componente padre.
   * @event setValoresStoreEvent
   */
  @Output() setValoresStoreEvent = new EventEmitter<{
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }>();

  /**
   * compo doc
   * @method fetchFraccion
   * @description Obtiene información de fracción arancelaria.
   */
  obtenerFraccion(): void {
    this.form.get('unidadMedida')?.setValue(this.unidadCatalogo[0].id);
  }
  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * @description Emite un evento para actualizar los valores en el almacén.
   * @param form El grupo de formulario que contiene los datos.
   * @param campo El nombre del campo que se está actualizando.
   * @param metodoNombre El nombre del método asociado con la acción.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    this.setValoresStoreEvent.emit({ form, campo, metodoNombre });
  }

  onFraccionChange(selected: { id: string | number; relacionadaUmtId?: string | number }): void {
    this.form.get('fraccion')?.setValue(selected.id);
    this.setValoresStore(this.form, 'fraccion', 'setFraccion');

    const UMT_MATCH = this.unidadCatalogo.find(
      (umt) => umt.id === selected?.relacionadaUmtId
    );

    if (UMT_MATCH) {
      this.form.get('unidadMedida')?.setValue(UMT_MATCH.id);
      this.form.get('unidadMedida')?.updateValueAndValidity();

      this.setValoresStore(this.form, 'unidadMedida', 'setUmt');
    } else {
      console.warn('No matching UMT found for the selected Fraccion.');
    }
  }

  onUmtChange(selected: { id: string | number }): void {
    this.form.get('umt')?.setValue(selected.id);
    this.setValoresStore(this.form, 'umt', 'setUmt');
  }

  onNicoChange(selected: { id: string | number }): void {
    this.form.get('nico')?.setValue(selected.id);
    this.setValoresStore(this.form, 'nico', 'setNico');
  }

  get umtControl(): FormControl {
    return this.form.get('umt') as FormControl;
  }

}