import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ComposicionMaterial } from '../../models/materiales-peligrosos.model';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';

@Component({
  selector: 'app-composicion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './composicion.component.html',
  styleUrl: './composicion.component.scss',
})
export class ComposicionComponent {
  /**
   * Formulario reactivo utilizado para gestionar los datos de composición.
   * Este formulario contiene los controles necesarios para capturar y validar
   * la información relacionada con la composición en el componente.
   */
  public composicionForm: FormGroup;

  /**
   * Constructor de la clase ComposicionComponent.
   * 
   * @param fb - Inyección del servicio FormBuilder para la creación y gestión de formularios reactivos.
   * @param ubicaccion - Inyección del servicio Location para manejar la navegación y ubicación del usuario.
   * @param tramite230501Store - Inyección del servicio Tramite230501Store para gestionar el estado relacionado con el trámite 230501.
   * 
   * Inicializa el formulario `composicionForm` con los campos:
   * - `componenteMaterial`: Campo obligatorio para especificar el material del componente.
   * - `porcentajeConcentracion`: Campo obligatorio para especificar el porcentaje de concentración, 
   *   con un valor mínimo de 0 y un máximo de 100.
   */
  constructor(private fb: FormBuilder, private ubicaccion: Location, private tramite230501Store: Tramite230501Store) {
    this.composicionForm = this.fb.group({
      componenteMaterial: ['', Validators.required],
      porcentajeConcentracion: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  /**
   * Agrega un nuevo elemento a la tabla de composición si el formulario es válido.
   * 
   * Este método verifica la validez del formulario `composicionForm` y, si es válido, 
   * crea un nuevo objeto `ComposicionMaterial` con los valores del formulario. Luego, 
   * actualiza el estado de la tienda `tramite230501Store` añadiendo el nuevo objeto a 
   * la lista `composicionTablaDatos`. Finalmente, reinicia el formulario y navega hacia atrás.
   * 
   * @returns {void} No retorna ningún valor.
   */
  agregar(): void {
    if (this.composicionForm.valid) {
      const IDX: ComposicionMaterial = {
        componente: this.composicionForm.get('componenteMaterial')?.value,
        porcentajeConcentracion: this.composicionForm.get('porcentajeConcentracion')?.value,
      }
      this.setFormValida(this.composicionForm.valid);
      this.tramite230501Store.update((state) => ({
        ...state,
        composicionTablaDatos: [...state.composicionTablaDatos, IDX],
      }));
      this.composicionForm.reset();
      this.ubicaccion.back();
    }
  }

   /**
 * Establece el estado de validación del formulario de destinatario.
 * 
 * @param valida - Un valor booleano que indica si el formulario de datos del destinatario es válido.
 */
 setFormValida(valida: boolean): void {
  this.tramite230501Store.setFormValida({ composicionForm: valida });
}


  /**
   * Cancela la operación actual, restableciendo el formulario de composición
   * y navegando de regreso a la ubicación anterior.
   *
   * @returns {void} No devuelve ningún valor.
   */
  cancelar(): void {
    this.composicionForm.reset();
    this.ubicaccion.back();
  }

  /**
   * Restablece el formulario de composición a su estado inicial.
   * Este método reinicia todos los campos del formulario, eliminando
   * cualquier valor ingresado previamente por el usuario.
   */
  limpiarComposicion(): void {
    this.composicionForm.reset();
  }

}
