import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
/**
 * Servicio inyectable disponible en toda la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class FormularioRegistroService {
  /**
   * Mapa que almacena los formularios registrados.
   */
  private formularios = new Map<string, FormGroup>();

  /**
   * Registra un formulario con una clave específica.
   * 
   * @param key - Clave identificadora del formulario.
   * @param formulario - Formulario reactivo a registrar.
   */
  registrarFormulario(key: string, formulario: FormGroup): void {
    this.formularios.set(key, formulario);
  }

  /**
   * Valida todos los formularios registrados.
   * Marca todos los campos como tocados y actualiza la validez.
   * 
   * @returns true si todos los formularios son válidos, false en caso contrario.
   */
  validarTodosFormularios(): boolean {
    let todosValidos = true;

    this.formularios.forEach(formulario => {
      formulario.markAllAsTouched();
      formulario.updateValueAndValidity();

      if (formulario.invalid) {
        todosValidos = false;
      }
    });

    return todosValidos;
  }

}
