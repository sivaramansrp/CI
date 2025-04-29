import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioRegistroService {
  private formularios = new Map<string, FormGroup>();

  registrarFormulario(key: string, formulario: FormGroup): void {
    this.formularios.set(key, formulario);
  }

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
