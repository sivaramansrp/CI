import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class DatosDeLaMercanciaComponent implements OnInit {
  /**
  * @description Indica si el formulario debe mostrarse en modo solo lectura.
  */
  @Input() esFormularioSoloLectura!: boolean;
  /**
   * @description El grupo de formulario reactivo para capturar los detalles.
   */
  @Input() form!: FormGroup;
  /**
   * @description Opciones disponibles para los productos.
   */
  @Input() productoOpciones: ProductoOpción[] = [];
  /**
   * @description Catálogo que contiene opciones de fracción.
   */
  @Input() fraccionCatalogo: Catalogo[] = [];
  /**
   * @description Catálogo que contiene opciones de unidad.
   */
  @Input() unidadCatalogo: Catalogo[] = [];
  /**
   * @description Emisor de eventos para pasar datos del formulario al componente padre.
   * @event setValoresStoreEvent
   */
  @Output() setValoresStoreEvent = new EventEmitter<{
    form: FormGroup;
    campo: string;
   
  }>();

  /**
    * Habilita o deshabilita el formulario según el modo de solo lectura.  
    * Controla el estado del formulario al iniciar el componente.
  */
  ngOnInit(): void {
    if (this.esFormularioSoloLectura) {
        this.form.disable();
    }else if (!this.esFormularioSoloLectura) {
       this.form.enable();
    }
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
  setValoresStore(form: FormGroup, campo: string): void {
    this.setValoresStoreEvent.emit({ form, campo});
  }
}
