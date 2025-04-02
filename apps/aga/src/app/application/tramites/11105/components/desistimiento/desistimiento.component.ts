import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DESISTIMIENTO } from '../../constants/retirad-de-la-autorizacion-de-donaciones.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente para gestionar el formulario de desistimiento.
 */
@Component({
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  selector: 'app-desistimiento',
  templateUrl: './desistimiento.component.html',
  styleUrl: './desistimiento.component.scss',
})
export class DesistimientoComponent implements OnInit {
  /**
   * Evento de salida que emite un valor de tipo cadena.
   * Este evento se utiliza para notificar cuando se debe continuar con una acción específica.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Grupo de formulario para gestionar los datos del desistimiento.
   */
  desisitimientoForm!: FormGroup;

  /**
   * Constructor de la clase.
   * @param formBuilder Servicio FormBuilder para construir formularios reactivos.
   */
  constructor(public formBuilder: FormBuilder) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.desisitimientoForm = this.formBuilder.group({
      folioOriginal: [{ value: '', disabled: true }],
      justificacionDelDesistimiento: [{ value: '' }, Validators.maxLength(200)],
    });
    this.setFormValues();
  }

  /**
   * Establece los valores iniciales del formulario.
   */
  setFormValues(): void {
    this.desisitimientoForm.get(DESISTIMIENTO.FOLIO_ORIGINAL)?.setValue('');
    this.desisitimientoForm
      .get(DESISTIMIENTO.JUSTIFICACION_DEL_DESISTIMIENTO)
      ?.setValue('');
  }

  /**
   * Emite un evento para continuar con el flujo del componente.
   *
   * Este método dispara el evento `continuarEvento` sin ningún valor asociado,
   * permitiendo que otros componentes o servicios reaccionen a esta acción.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }
}
