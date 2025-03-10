import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
// Import external components/modules after the Angular core imports
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
// Finally, import relative services
import { DetallesDelTransporteService } from '../../services/detalles-del-transporte.service';



// Import your services last





/**
 * Componente: DetallesDelTransporteComponent
 * 
 * Descripción:
 * Este componente forma parte del módulo Angular y es responsable de gestionar el
 * formulario "Detalles del Transporte". Utiliza el módulo ReactiveForms de Angular
 * para crear y gestionar un formulario con campos pre-llenados y deshabilitados. Estos campos contienen
 * información como el sistema de transporte, los países de origen y destino, así como las fechas de emisión y expiración.
 * El componente está marcado como 'independiente' y no depende de módulos o componentes externos
 * más allá de lo definido en su array de imports.
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
   * @property {FormGroup} transportForm - El formulario del componente.
   */
  transportForm!: FormGroup;

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
   */

  constructor(private fb: FormBuilder, private service: DetallesDelTransporteService) {
    this.transportForm = this.fb.group({
      tratado: [{ value: '', disabled: true }],
      paisOBloque: [{ value: '', disabled: true }],
      paisOOrigin: [{ value: '', disabled: true }],
      paisODestino: [{ value: '', disabled: true }],
      fetchaDeExpedicion: [{ value: '', disabled: true }],
      fetchaDeVencimiento: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.getMedioDeTransporte();
  }

  getMedioDeTransporte(): void {
    this.service.getMedioDeTransporte().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.transportForm.patchValue({
          tratado: data.tratado,
          paisOBloque: data.paisOBloque,
          paisOOrigin: data.paisOOrigin,
          paisODestino: data.paisODestino,
          fetchaDeExpedicion: data.fetchaDeExpedicion,
          fetchaDeVencimiento: data.fetchaDeVencimiento
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
