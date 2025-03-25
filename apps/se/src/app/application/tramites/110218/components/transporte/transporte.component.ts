import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { REG_X, REGEX_DESCRIPCION_ESPECIALES, TituloComponent } from '@ng-mf/data-access-user';

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
  puertodeTransito$: Observable<string | null> = this.tramite110218Query.puertodeTransito$;
  /**
   * Observable para el nombre de la embarcación.
   * TransporteComponent
   */
  nombredelaEmbarcacion$: Observable<string | null> = this.tramite110218Query.nombredelaEmbarcacion$;
  /**
   * Observable para el número de vuelo.
   * TransporteComponent
   */
  numerodeVuelo$: Observable<string | null> = this.tramite110218Query.numerodeVuelo$;

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
    this.detallestransporte = this.crearFormularioDetallesTransporte();
  }

  private crearFormularioDetallesTransporte(): FormGroup {
    return this.fb.group({
      puertodeEmbarque: ['', [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)]], // Campo obligatorio, solo letras y espacios
      puertodeDesembarque: ['', [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)]], // Campo obligatorio, solo letras y espacios
      puertodeTransito: ['', [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)]], // Campo obligatorio, solo letras y espacios
      nombredelaEmbarcacion: ['', [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)]], // Campo obligatorio, solo letras y espacios
      numerodeVuelo: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]], // Campo obligatorio, solo números permitidos
    });
  }

  /**
   * Método de inicialización del componente.
   * TransporteComponent
   */
  ngOnInit(): void {
    this.suscribirseACambiosDeTienda();
  }

  /**
   * Suscribe a los cambios en el store y actualiza el formulario.
   * TransporteComponent
   */
  suscribirseACambiosDeTienda(): void {
    const OBSERVABLES = {
      puertodeEmbarque: this.puertodeEmbarque$,
      puertodeDesembarque: this.puertodeDesembarque$,
      nombredelaEmbarcacion: this.nombredelaEmbarcacion$,
      numerodeVuelo: this.numerodeVuelo$,
      puertodeTransito: this.puertodeTransito$,
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
      case 'nombredelaEmbarcacion':
        this.tramite110218Store.setnombredelaEmbarcacion(VALUE);
        break;
      case 'numerodeVuelo':
        this.tramite110218Store.setnúmerodeVuelo(VALUE);
        break;
      case 'puertodeTransito':
        this.tramite110218Store.setPuertodeTránsito(VALUE);
        break;
      default:
        break;
    }
  }
}