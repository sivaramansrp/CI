import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegistroStates } from '../../../estados/registro.store';
import { Router } from '@angular/router';

/**
 * Componente para el registro de personas que recibirán notificaciones.
 * Permite capturar el RFC y navegar a la consulta de notificador.
 */
@Component({
  selector: 'app-registro-persona-notificaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-persona-notificaciones.component.html',
  styleUrl: './registro-persona-notificaciones.component.scss',
})
export class RegistroPersonaNotificacionesComponent {
  /**
   * Formulario reactivo para capturar el RFC de la persona a notificar.
   */
  public FormNotificaciones!: FormGroup;

  /**
   * Constructor. Inyecta FormBuilder, Router y el store de registros.
   * Inicializa el formulario de notificaciones.
   * @param fb FormBuilder para construir el formulario reactivo.
   * @param router Servicio de enrutamiento de Angular.
   * @param registroStates Estado global de registros.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registroStates: RegistroStates,
  ) {
    this.FormNotificaciones = this.fb.group({
      rfc: ['']
    });
  }

  /**
   * Navega a la pantalla de consulta de registro de notificador.
   */
  AgregarPersonaParaOirRecibirNotificaciones() {
    this.router.navigate(['funcionario/consulta-registro-notificador']);
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof RegistroStates): void {
    const VALOR = form.get(campo)?.value;
    (this.registroStates[metodoNombre] as (value: string) => void)(VALOR);
  }
}