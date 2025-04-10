import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProcedureQuery } from '../estados/datos-solicitude.query';
import { DatosProcedureStore } from '../estados/datos-solicitude.store';
import { DatosSolicitudService } from '../services/dato-solicitude.service'
import { DatosestablecimientoComponent } from './DatosEstablecimiento/datosestablecimiento.component';
import { DomicilioEstablecimientosComponent } from './DomicilioEstablecimientos/domicilio-establecimientos.component';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { ManifiestosComponent } from './Manifiestos/manifiestos.component';
import { MercanciasComponent } from './Mercancias/mercancias.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteLegalComponent } from './Representantelegal/representante-legal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';




@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatosestablecimientoComponent,
    DomicilioEstablecimientosComponent, MercanciasComponent, ManifiestosComponent,
    RepresentanteLegalComponent, InputRadioComponent],
  templateUrl: './DatosSolicitud.component.html',
  styleUrl: './DatosSolicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para datos preoperativos.
   */
  preOperativeForm!: FormGroup;
  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();
  /**
   * @property {Catalogo[]} radioOptions
   *  Opciones del radio button obtenidas desde preOperativo.json.
   */
  radioOptions = [
    {
      label: 'Prorroga',
      value: 'Prorroga',
    },
    {
      label: 'Modificacion',
      value: 'Modificacion',
    },
  ];
  /**
   * setValoresStoreEvent
   * Evento que emite los valores del formulario para almacenarlos en el store.
   * Formulario reactivo.
   * Nombre del campo que se está actualizando.
   * Nombre del método que realiza la actualización.
   */
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string; metodoNombre: string }>();

  constructor(private fb: FormBuilder,
    private DatosSolicitudService: DatosSolicitudService,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,) {
    this.preOperativeForm = this.fb.group({
      Prorroga: new FormControl(''), // Define the control with an initial value
      Justificacion: [''],
    });
  }
  ngOnInit(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('data', data);

        this.preOperativeForm?.patchValue({
          Prorroga: data.prorrogaData.prorroga,
          Justificacion: data.prorrogaData.Justificacion
        });
      });
  }
  /**
   * Validar campo del formulario
   * @param field Nombre del campo
   * @returns Booleano que indica si el campo es válido
   */
  isValid(field: string): boolean {
    return Boolean(DatosSolicitudService.isValid(this.preOperativeForm, field));
  }

  /**
* Gancho de ciclo de vida OnDestroy
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
 * Establecer valores en DatosProcedureStore
   */
  setValoresStore(): void {
    this.store.setProrroga(this.preOperativeForm.get('Prorroga')?.value);
  }
  /**
 * Establecer valores en DatosProcedureStore
   */
  setValoresStores(): void {
    this.store.setJustificacion(this.preOperativeForm.get('Justificacion')?.value);
  }

}
