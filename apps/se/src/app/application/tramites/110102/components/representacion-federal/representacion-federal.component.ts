/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Este componente maneja la representación federal.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {CatalogoSelectComponent, RepresentacionfederalService, TituloComponent } from '@ng-mf/data-access-user';
import { Catalogo} from '@ng-mf/data-access-user';

import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';

/**
 * Este componente maneja la representación federal.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.scss',
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {

  /**
   * FormGroup que contiene los datos del formulario de representación federal.
   * @type {FormGroup}
   */
  formularioRepresentacionFederalForm: FormGroup;

  /**
   * Arreglo de objetos Catalogo que representa las entidades fronterizas.
   * @type {Catalogo[]}
   */
  entidadesFrontera: Catalogo[] = [];

  /**
   * Arreglo de objetos Catalogo que representa las opciones de representación federal.
   * @type {Catalogo[]}
   */
  representacionFederalOptions: Catalogo[] = [];

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();


  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de la representación federal.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {RepresentacionfederalService} service - Servicio para obtener datos de la representación federal.
   * @param {Tramite110102Store} tramite110102Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110102Query} tramite110102Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, private service: RepresentacionfederalService, private tramite110102Store: Tramite110102Store, private tramite110102Query: Tramite110102Query) {
    this.formularioRepresentacionFederalForm = this.fb.group({
      solicitudEntidadFederativaEntidadClave: ['', Validators.required],
      unidadAdministrativaClave: ['', Validators.required],
      protestoDecirVerdad: [false]
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Carga las entidades de frontera y recupera la representación federal si es necesario.
   */
  ngOnInit(): void {
    this.cargarEntidadesFrontera();
    this.getValorsStore();

    const ENTIDAD = this.formularioRepresentacionFederalForm.get('solicitudEntidadFederativaEntidadClave')?.value;
    const REPRESENTACIONFEDERAL = this.formularioRepresentacionFederalForm.get('unidadAdministrativaClave')?.value;
    if (ENTIDAD !== "") {
      this.recuperarRepresentacionFederalSE(ENTIDAD);
      this.formularioRepresentacionFederalForm.get('unidadAdministrativaClave')?.setValue(REPRESENTACIONFEDERAL);
    } else {
      this.representacionFederalOptions = [];
    }
  }

  /**
   * Carga las entidades de frontera desde el servicio.
   */
  cargarEntidadesFrontera(): void {
    this.service.getEntidadFederativa().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.entidadesFrontera = data;
      }
    );
  }

  /**
   * Maneja el cambio de la entidad federativa.
   * @param {any} valor - El valor de la entidad federativa seleccionada.
   */
  onEntidadFederativaChange(valor: any): void {
    if (valor !== '-1') {
      this.recuperarRepresentacionFederalSE(valor.id);
    } else {
      this.representacionFederalOptions = [];
    }
    this.setValoresStore(this.formularioRepresentacionFederalForm, 'solicitudEntidadFederativaEntidadClave');
  }

  /**
   * Recupera la representación federal desde el servicio.
   * @param {string} entidadFederativa - La entidad federativa para la cual se obtienen los datos.
   */
  recuperarRepresentacionFederalSE(entidadFederativa: string): void {
    this.service.getRepresentacionfederal(entidadFederativa).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.representacionFederalOptions = data;
      }
    );
  }

  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite110102Store} metodoNombre - El nombre del método del store.
   */
setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite110102Store.establecerDatos({[campo]: VALOR});
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValorsStore(): void {
    this.tramite110102Query.selectTramite110102$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioRepresentacionFederalForm.patchValue({
            solicitudEntidadFederativaEntidadClave: seccionState.solicitudEntidadFederativaEntidadClave,
            unidadAdministrativaClave: seccionState.unidadAdministrativaClave,
            protestoDecirVerdad: seccionState.protestoDecirVerdad
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