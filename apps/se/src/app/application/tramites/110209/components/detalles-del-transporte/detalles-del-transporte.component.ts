
/**
 * Angular core imports for the component.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
// Import external components/modules after the Angular core imports
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
// Finally, import relative services
import { DetallesDelTransporteService } from '../../services/detalls-de-transporte/detalles-del-transporte.service';

/**
 * Componente: DetallesDelTransporteComponent
 * 
 */
@Component({
  selector: 'app-detalles-del-transporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './detalles-del-transporte.component.html',
  styleUrl: './detalles-del-transporte.component.scss',
})
export class DetallesDelTransporteComponent implements OnInit, OnDestroy {
  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea de tipo 'FormGroup'.
   *
   * @property {FormGroup} detallesDeltransportForm - El formulario del componente.
   */
  detallesDelTransporteForm!: FormGroup;

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente DetallesDelTransporteComponent.
   * 
   * @param {FormBuilder} fb - El servicio FormBuilder proporcionado por Angular.
   * @param {DetallesDelTransporteService} service - El servicio para obtener los detalles del transporte.
   */
  constructor(private fb: FormBuilder, private service: DetallesDelTransporteService) {
    this.detallesDelTransporteForm = this.fb.group({
      tratado: [{ value: '', disabled: true }],
      paisOBloque: [{ value: '', disabled: true }],
      paisOOrigin: [{ value: '', disabled: true }],
      paisODestino: [{ value: '', disabled: true }],
      fechaDeExpedicion: [{ value: '', disabled: true }],
      fechaDeVencimiento: [{ value: '', disabled: true }]
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene los detalles del transporte.
   */
  ngOnInit(): void {
    this.getMedioDeTransporte();
  }

  /**
   * Obtiene los detalles del transporte desde el servicio y los asigna al formulario.
   */
  getMedioDeTransporte(): void {
    this.service.getMedioDeTransporte().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.detallesDelTransporteForm.patchValue({
          tratado: data.tratado,
          paisOBloque: data.paisOBloque,
          paisOOrigin: data.paisOOrigin,
          paisODestino: data.paisODestino,
          fechaDeExpedicion: data.fetchaDeExpedicion,
          fechaDeVencimiento: data.fetchaDeVencimiento
        });
      }
    );
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}