/**
 * Este componente maneja el formulario de transporte.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from '@ng-mf/data-access-user';


import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { TransporteService } from '../../services/transporte/transporte.service';

/**
 * Este componente maneja el formulario de transporte.
 */


@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnInit, OnDestroy {

  /**
   * Formulario para el registro de transporte.
   * @type {FormGroup}
   */
  transporteForm!: FormGroup;

  /**
   * Opciones de medio de transporte.
   * @type {Catalogo[]}
   */
  medioDeTransporteOptions: Catalogo[] = [];

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de transporte.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {TransporteService} service - Servicio para obtener datos de transporte.
   * @param {Tramite110209Store} tramite110209Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110209Query} tramite110209Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, private service: TransporteService, private tramite110209Store: Tramite110209Store, private tramite110209Query: Tramite110209Query) {
    this.transporteForm = this.fb.group({
      medioDeTransporte: ['',Validators.required],
      rutaCompleta: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)],
      puertoDeEmbarque: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)],
      puertoDeDesembarque: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)]
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las opciones de medio de transporte y los valores del store.
   */
  ngOnInit(): void {
    this.getMedioDeTransporte();
    this.getValoresStore();
  }

  /**
   * Obtiene las opciones de medio de transporte desde el servicio.
   */
  getMedioDeTransporte(): void {
    this.service.getMedioDeTransporte().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.medioDeTransporteOptions = data;
      }
    );
  }

  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite110209Store} metodoNombre - El nombre del método del store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110209Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110209Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite110209Query.selectTramite110102$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.transporteForm.patchValue({
            medioDeTransporte: seccionState.medioDeTransporte,
            rutaCompleta: seccionState.rutaCompleta,
            puertoDeEmbarque: seccionState.puertoDeEmbarque,
            puertoDeDesembarque: seccionState.puertoDeDesembarque
          });
        })
      )
      .subscribe();
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