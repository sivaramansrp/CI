import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MENSAJE_DE_ALERTA } from '../../services/certificados-licencias.enum';
import { AlertComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule,
    InputRadioComponent
  ],
  templateUrl: './manifiestos.component.html',
  styleUrl: './manifiestos.component.scss',
})
export class ManifiestosComponent implements OnInit, OnDestroy {

   /**
     * Mensaje de alerta para el usuario.
     */
    public mensaje: string = MENSAJE_DE_ALERTA;
   
    /**
     * Notificador para destruir observables activos y evitar pérdidas de memoria.
     */
    private destroyNotifier$: Subject<void> = new Subject();
   
    /**
     * Grupo de formularios principal para gestionar los manifiestos.
     */
    manifiestos!: FormGroup;

  /**
    * Opciones de radio.
    */
   public radioOpcions = [
     { label: 'No', value: 'no' },
     { label: 'Sí', value: 'sí' }
   ];

  /**
   * Valor seleccionado del radio.
   */
  public valorSeleccionado!: string;
   
    /**
     * Constructor del componente.
     * @param fb - FormBuilder para la creación de formularios.
     * @param tramite260211Store - Servicio para interactuar con el store de Tramite260211.
     * @param tramite260211Query - Servicio para consultar el estado de la solicitud.
     */
    constructor(
      private fb: FormBuilder,
    ) {
      // Dependencia inyectada para uso posterior
    }
   
    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Obtiene el estado de la solicitud y crea el formulario de manifiestos.
     */
    ngOnInit(): void {
   
      /**
       * Inicialización del formulario de manifiestos.
       */
      this.manifiestos = this.fb.group({
        cumplimiento: [''],
      });
    }

  /**
   * Cambia el valor seleccionado del radio.
   * @param value Valor seleccionado.
   */
  public cambiarRadio(value: string | number) {
    this.valorSeleccionado = value as string;
  }
   
    /**
     * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
     * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
