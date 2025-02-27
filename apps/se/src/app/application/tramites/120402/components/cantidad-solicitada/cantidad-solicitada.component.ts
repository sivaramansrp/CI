/**
 * Componente que representa un formulario para solicitar una cantidad específica.
 * Gestiona la validación y el envío del formulario.
 */
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
/**
 * Componente que representa un formulario para solicitar una cantidad específica.
 * Gestiona la validación y el envío del formulario.
 */
@Component({
  selector: 'app-cantidad-solicitada',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './cantidad-solicitada.component.html',
  styleUrl: './cantidad-solicitada.component.scss',
})
export class CantidadSolicitadaComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la solicitud de cantidad.
   */
  form!: FormGroup;
 
  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();
 
  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación y gestión del formulario reactivo.
   */
  constructor(private fb: FormBuilder) {}
 
  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
  }
 
  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
 
  /**
   * Crea e inicializa el formulario con validaciones.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      cantidadSolicitada: ['100', [Validators.required]],
    });
  }
 
  /**
   * Verifica si un control del formulario es inválido.
   * @param nombreControl Nombre del control a verificar.
   * @returns Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const control = this.form.get(nombreControl);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }
 
  /**
   * Valida y envía el formulario, mostrando mensajes en consola según el resultado.
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('El formulario tiene errores. Corríjalos antes de continuar.');
    } else {
      console.log('Formulario enviado con éxito', this.form.value);
    }
  }
}