import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-requiremento',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CapturarRequerimientoComponent],
  templateUrl: './requiremento.component.html',
  styleUrl: './requiremento.component.css'
})
export class RequirementoComponent implements OnInit, OnDestroy {

  /**
   * Representa el folio asociado al trámite.
   * 
   * @type {any} - El tipo es genérico, se recomienda especificar un tipo más concreto si es posible.
   */
  folioTramite: any;

  /**
    * Índice del paso actual en el wizard.
    * 
    * Esta propiedad indica el índice del paso actual en el wizard, comenzando desde 1.
    */
  indice: number = 1;

    /**
   * Evento de continuar.
   * 
   * Esta propiedad utiliza `@Output` para emitir un evento `continuarEvento` con una cadena como valor.
   */
  @Output() continuarEvento = new EventEmitter<string>();

    /**
     * @private
     * @description Sujeto utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
     * Se emite un valor cuando el componente se destruye, lo que permite completar las suscripciones activas.
     */
    private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    ) {
      //
     }

  ngOnInit(): void {
    this.folioTramite = history.state.data;
  }

  /**
  * Selecciona una pestaña.
  * @param i El índice de la pestaña a seleccionar.
  */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

    /**
 * Método para emitir un evento de continuar.
 * 
 * Este método emite un evento `continuarEvento` con una cadena vacía como valor.
 * Se utiliza para indicar que se debe continuar al siguiente paso en el proceso.
 * 
 * @example
 * // Llamar al método para emitir el evento de continuar
 * this.continuar();
 */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  /**
   * Navega a la ruta principal de pago de autoridad.
   * Este método se utiliza para cancelar la acción actual y redirigir al usuario
   * a la página principal de la sección de pagos de autoridad.
   */
  cancelar(): void {
    this.router.navigate(['/pago/autoridad/main']);
  }

    /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Aquí se utiliza para emitir un valor en el observable `destroy$` y completar su emisión,
   * asegurando la limpieza de suscripciones y evitando posibles fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
