import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Observable, Subject, takeUntil } from 'rxjs';

/**
 * Componente para manejar los detalles del transporte para el certificado técnico de Japón.
 *
 * Este componente permite a los usuarios introducir y visualizar los detalles del transporte,
 * incluyendo información sobre puertos, embarcaciones y vuelos.
 *
 */
@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnInit, OnDestroy {
  /**
   * Formulario para los detalles del transporte.
   * TransporteComponent
   */
  detallestransporte: FormGroup;

  /**
   * Observable para el puerto de embarque.
   * TransporteComponent
   */
  puertodeEmbarque$: Observable<string | null> = this.tramite110218Query.puertodeEmbarque$;
  /**
   * Observable para el puerto de desembarque.
   * TransporteComponent
   */
  puertodeDesembarque$: Observable<string | null> = this.tramite110218Query.puertodeDesembarque$;
  /**
   * Observable para el puerto de tránsito.
   * TransporteComponent
   */
  puertodeTránsito$: Observable<string | null> = this.tramite110218Query.puertodeTránsito$;
  /**
   * Observable para el nombre de la embarcación.
   * TransporteComponent
   */
  nombredelaEmbarcación$: Observable<string | null> = this.tramite110218Query.nombredelaEmbarcación$;
  /**
   * Observable para el número de vuelo.
   * TransporteComponent
   */
  númerodeVuelo$: Observable<string | null> = this.tramite110218Query.númerodeVuelo$;

  /**
   * Subject para la destrucción del componente.
   * TransporteComponent
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * Constructor de formularios.
   * Store para el trámite 110218.
   * Query para el trámite 110218.
   */
  constructor(
    private fb: FormBuilder,
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query
  ) {
    this.detallestransporte = this.fb.group({
      puertodeEmbarque: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Campo obligatorio, solo letras y espacios
      puertodeDesembarque: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Campo obligatorio, solo letras y espacios
      puertodeTránsito: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Campo obligatorio, solo letras y espacios
      nombredelaEmbarcación: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Campo obligatorio, solo letras y espacios
      númerodeVuelo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Campo obligatorio, solo números permitidos
    });
  }

  /**
   * Método de inicialización del componente.
   * TransporteComponent
   */
  ngOnInit(): void {
    this.subscribeToStoreChanges();
  }

  /**
   * Suscribe a los cambios en el store y actualiza el formulario.
   * TransporteComponent
   */
  subscribeToStoreChanges(): void {
    const OBSERVABLES = {
      puertodeEmbarque: this.puertodeEmbarque$,
      puertodeDesembarque: this.puertodeDesembarque$,
      nombredelaEmbarcación: this.nombredelaEmbarcación$,
      númerodeVuelo: this.númerodeVuelo$,
      puertodeTránsito: this.puertodeTránsito$,
    };

    Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
      OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (value) {
          this.detallestransporte.get(controlName)?.setValue(value);
        }
      });
    });
  }

  /**
   * Método de destrucción del componente.
   * TransporteComponent
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Maneja los cambios en los controles del formulario y actualiza el store.
   * TransporteComponent
   * Nombre del control del formulario.
   */
  onDetallestransporteChange(controlName: string): void {
    const VALUE = this.detallestransporte.get(controlName)?.value;

    switch (controlName) {
      case 'puertodeEmbarque':
        this.tramite110218Store.setpuertodeEmbarque(VALUE);
        break;
      case 'puertodeDesembarque':
        this.tramite110218Store.setpuertodeDesembarque(VALUE);
        break;
      case 'nombredelaEmbarcación':
        this.tramite110218Store.setnombredelaEmbarcación(VALUE);
        break;
      case 'númerodeVuelo':
        this.tramite110218Store.setnúmerodeVuelo(VALUE);
        break;
      case 'puertodeTránsito':
        this.tramite110218Store.setPuertodeTránsito(VALUE);
        break;
      default:
        break;
    }
  }
}