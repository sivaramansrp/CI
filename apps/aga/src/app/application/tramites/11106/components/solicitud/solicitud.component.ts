import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SOLICITUD } from '../../constants/cancelacion-donaciones.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * @tipo {FormGroup}
   * @descripcion Representa el formulario reactivo utilizado en el componente de solicitud.
   * Este formulario se utiliza para gestionar y validar los datos de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Constructor de la clase `SolicitudComponent`.
   *
   * @param formBuilder - Servicio de Angular utilizado para construir y gestionar formularios reactivos.
   *
   * El constructor se utiliza para la inyección de dependencias necesarias en este componente.
   */
  constructor(public formBuilder: FormBuilder) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  
  /**
   * @override
   * @method ngOnInit
   * @description Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo `solicitudForm` con los controles necesarios y establece
   * los valores iniciales del formulario llamando al método `setFormValues`.
   * 
   */
  ngOnInit(): void {
    this.solicitudForm = this.formBuilder.group({
      cancelacionDonaciones: this.formBuilder.group({
        laAutorizacionEsNula: [{ value: false, disabled: false }],
      }),
    });
    this.setFormValues();
  }

  /**
   * @method setFormValues
   * @description Establece los valores iniciales del formulario `solicitudForm` 
   * utilizando datos predefinidos. En este caso, configura el valor del campo 
   * `laAutorizacionEsNula` dentro de `cancelacionDonaciones` con el valor de 
   * `SOLICITUD.lA_AUTORIZACION_ES_NULA`.
   * 
   * @returns {void} No retorna ningún valor.
   */
  setFormValues(): void {
    this.solicitudForm
      .get('cancelacionDonaciones')
      ?.get('laAutorizacionEsNula')
      ?.setValue(SOLICITUD.lA_AUTORIZACION_ES_NULA);
  }

  /**
   * @description Obtiene el formulario reactivo correspondiente a la sección de cancelación de donaciones.
   * @returns {FormGroup} El grupo de formulario asociado a 'cancelacionDonaciones'.
   */
  get cancelacionDonaciones(): FormGroup {
    return this.solicitudForm.get('cancelacionDonaciones') as FormGroup;
  }

  /**
   * @description
   * Valida el formulario de destinatario en la solicitud. Si el formulario es inválido,
   * marca todos los campos como tocados para mostrar los errores de validación.
   *
   * @method validarDestinatarioFormulario
   * @memberof SolicitudComponent
   * @returns {void}
   */
  validarDestinatarioFormulario(): void {
    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
    }
  }

  /**
   * @description
   * Emite un evento para continuar con el flujo de la solicitud.
   * Este método se utiliza para notificar a los componentes padres
   * que se debe proceder al siguiente paso.
   *
   * @method continuar
   * @memberof SolicitudComponent
   * @returns {void}
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }
}
