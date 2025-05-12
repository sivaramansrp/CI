
/**
 * Componente encargado de gestionar los datos del trámite.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite130119Query } from '../../estados/queries/tramite130119.query';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';
/**
 * Componente encargado de gestionar los datos del trámite.
 */
@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
/**
 * Componente encargado de gestionar los datos del trámite.
 */
export class DatosDelTramiteComponent implements OnInit, OnDestroy {

  /**
   * Opciones de régimen.
   * @type {Catalogo[]}
   */
  opcionesDeRegimen!: Catalogo[];

  /**
   * Opciones de clasificación de régimen.
   * @type {Catalogo[]}
   */
  opcionesDeClasificacionDeRegimen!: Catalogo[];

  /**
   * Formulario para los datos del trámite.
   * @type {FormGroup}
   */
  datosDelTramiteForm!: FormGroup;

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente DatosDelTramiteComponent.
   */
  constructor(private fb: FormBuilder, private service: DatosDeLaSolicitudService, private tramite130119Store: Tramite130119Store, private tramite130119Query: Tramite130119Query) {
    this.datosDelTramiteForm = this.fb.group({
      regimen: [''],
      clasificacionDeRegimen: ['']
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las opciones de régimen y clasificación de régimen, y los valores del store.
   */
  ngOnInit(): void {
    this.getRegimenOptions();
    this.getClasificacionDeRegimen();
    this.getValoresStore();
  }

  /**
   * Obtiene las opciones de régimen desde el servicio.
   */
  getRegimenOptions(): void {
    this.service.getRegimen().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.opcionesDeRegimen = data;
    });
  }

  /**
   * Obtiene las opciones de clasificación de régimen desde el servicio.
   */
  getClasificacionDeRegimen(): void {
    this.service.getClasificacionDeRegimen().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.opcionesDeClasificacionDeRegimen = data;
    });
  }

  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite130119Store} metodoNombre - El nombre del método del store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130119Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130119Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite130119Query.selectTramite130119$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.datosDelTramiteForm.patchValue({
            regimen: seccionState.regimen,
            clasificacionDeRegimen: seccionState.clasificacionDeRegimen
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