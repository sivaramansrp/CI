import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ReplaySubject, map,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioState } from '@libs/shared/data-access-user/src';
import { DESISTIMIENTO } from '../../constants/retirad-de-la-autorizacion-de-donaciones.enum';
import {TituloComponent } from '@libs/shared/data-access-user/src';


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
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

    /**
     * Subject para manejar la destrucción del componente.
     */
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

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
  constructor(public formBuilder: FormBuilder,
     private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.initializeFormalario();

      this.consultaioQuery.selectConsultaioState$
          .pipe(
            takeUntil(this.destroyed$),
            map((seccionState) => {
              this.consultaDatos = seccionState;
              this.soloLectura = this.consultaDatos.readonly;
              this.destinarioFormulario();
            })
          )
          .subscribe();
  }

   initializeFormalario() :void{
    this.desisitimientoForm = this.formBuilder.group({
      folioOriginal: [{ value: '', disabled: true }],
      justificacionDelDesistimiento: [{ value: '' }, Validators.maxLength(200)],
    });
    this.destinarioFormulario();
    this.setFormValues();
  }

     /**
   * Configura el formulario del destinatario según el estado de la solicitud.
   *  Si el formulario está en modo solo lectura, deshabilita los campos del formulario.
   *  @returns {void}
   */
    destinarioFormulario(): void {
    if (this.soloLectura) {
      this.desisitimientoForm.disable();
    } else {
      this.desisitimientoForm.enable();
    }
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
