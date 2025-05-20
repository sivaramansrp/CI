import {
  CatalogoSelectComponent,
  InputRadioComponent,
  REG_X,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class DatosDeLaMercanciaComponent {
  /**
   * @description El grupo de formulario reactivo para capturar los detalles.
   */
  @Input() form!: FormGroup;

  /**
   * @description Valores de entrada para configurar los campos del formulario.
   * Cada objeto incluye etiqueta, marcador de posición, si es requerido y el nombre del control.
   */
  @Input() mercanciaInputValues: {
    label: string;
    placeholder: string;
    required: boolean;
    controlName: string;
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
   * @description Emisor de eventos para pasar datos del formulario al componente padre.
   * @event setValoresStoreEvent
   */
  @Output() setValoresStoreEvent = new EventEmitter<{
    form: FormGroup;
    campo: string;
  }>();

  /**
   * @description Emisor de eventos para pasar datos del formulario al componente padre.
   * @event alCambioDelCampoValores
   */
  @Output() alCambioDelCampoValores = new EventEmitter<{
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }>();

  /**
   * @method esInvalido
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
 * Checks if the value of the specified control is a valid integer or decimal number.
 * Uses REG_X.NUMERO_DECIMAL_OPCIONAL for validation.
 * @param controlName The name of the control to validate.
 * @returns {boolean} True if the value is a valid number, false otherwise.
 */
esValorNumerico(controlName: string): boolean {
  const VALUE = this.form?.controls[controlName]?.value;
  return typeof VALUE === 'string' && REG_X.NUMERO_DECIMAL_OPCIONAL.test(VALUE);
}

  /**
   * @method setValoresStore
   * @description Emite un evento para actualizar los valores en el almacén.
   * @param form El grupo de formulario que contiene los datos.
   * @param campo El nombre del campo que se está actualizando.
   * @param metodoNombre El nombre del método asociado con la acción.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    this.setValoresStoreEvent.emit({ form, campo });
  }
  /**
   * @method alCambioDelCampo
   * @description Maneja el evento de cambio de un campo en el formulario.
   * @param controlName El nombre del control que ha cambiado.
   * @param event El evento asociado con el cambio.
   * @param metodoNombre El nombre del método asociado con la acción.
   */
  alCambioDelCampo(form: FormGroup, controlName: string, i: number): void {
    // Se puede actualizar el valor del control en el formulario si fuera necesario, o bien confiar en la vinculación de formularios.
    // Se emite el evento con el valor seleccionado para que el componente padre lo procese.
    const METODO_NOMBRE = i === 0 ? 'setFraccion' : (i === 1 ? 'setUmt' : 'setNico');
    this.alCambioDelCampoValores.emit({ form, campo: controlName, metodoNombre: METODO_NOMBRE });
  }

  /**
 * @method alCambiarPlazo
 * @description
 * Método que se ejecuta cuando cambia el valor del plazo en el formulario.
 * Actualiza el valor del campo `plazo` en el formulario reactivo y emite un evento
 * para sincronizar los datos con el almacén (store).
 *
 * @param {string | number} event - El nuevo valor seleccionado para el plazo.
 *
 * @example
 * // Ejemplo de uso:
 * this.alCambiarPlazo('Corto plazo');
 */
  alCambiarPlazo(event: string | number): void {
    this.form.get('plazo')?.setValue(event);
    this.setValoresStore(this.form, 'plazo');
  }
}