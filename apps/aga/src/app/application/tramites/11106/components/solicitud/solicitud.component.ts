import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Solicitud11106Query } from '../../estados/solicitud11106.query';
import { Solicitud11106Store } from '../../estados/solicitud11106.store';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * @tipo {FormGroup}
   * @descripcion Representa el formulario reactivo utilizado en el componente de solicitud.
   * Este formulario se utiliza para gestionar y validar los datos de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Sujeto utilizado como notificador para la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de la clase `SolicitudComponent`.
   *
   * @param formBuilder - Servicio de Angular utilizado para construir y gestionar formularios reactivos.
   * @param store - Store de Akita para gestionar el estado de la solicitud 11106.
   * @param query - Query de Akita para consultar el estado de la solicitud 11106.
   *
   * El constructor se utiliza para la inyección de dependencias necesarias en este componente.
   */
  constructor(
    public formBuilder: FormBuilder,
    private store: Solicitud11106Store,
    private query: Solicitud11106Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  
  /**
   * @override
   * @method ngOnInit
   * @description Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo `solicitudForm` con los controles necesarios y establece
   * los valores iniciales del formulario desde el store de Akita.
   * 
   */
  ngOnInit(): void {
    this.solicitudForm = this.formBuilder.group({
      cancelacionDonaciones: this.formBuilder.group({
        laAutorizacionEsNula: [{ value: false, disabled: false }],
      }),
    });
    
    // Suscribirse al estado del store para sincronizar con el formulario
    this.query.seleccionarAutorizacionEsNula$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((laAutorizacionEsNula) => {
        this.solicitudForm
          .get('cancelacionDonaciones')
          ?.get('laAutorizacionEsNula')
          ?.setValue(laAutorizacionEsNula, { emitEvent: false });
      });

    // Escuchar cambios en el formulario y actualizar el store
    this.solicitudForm
      .get('cancelacionDonaciones')
      ?.get('laAutorizacionEsNula')
      ?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((value) => {
        this.store.setLaAutorizacionEsNula(value);
      });
    
    this.setFormValues();
  }

  /**
   * @method setFormValues
   * @description Establece los valores iniciales del formulario `solicitudForm` 
   * utilizando datos del store de Akita en lugar de constantes predefinidas.
   * En este caso, configura el valor del campo `laAutorizacionEsNula` 
   * dentro de `cancelacionDonaciones` con el valor del store.
   * 
   * @returns {void} No retorna ningún valor.
   */
  setFormValues(): void {
    const CURRENT_VALUE = this.query.obtenerAutorizacionEsNula();
    this.solicitudForm
      .get('cancelacionDonaciones')
      ?.get('laAutorizacionEsNula')
      ?.setValue(CURRENT_VALUE);
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

  /**
   * @override
   * @method ngOnDestroy
   * @description Método de ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar memory leaks.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
