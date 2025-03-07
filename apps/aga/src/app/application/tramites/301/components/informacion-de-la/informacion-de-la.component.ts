/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @module InformacionDeLaComponent
 * @description Este módulo define el componente `InformacionDeLaComponent` que maneja la información de la mercancía.
 */
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnContinuarComponent, Catalogo, CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import estadofisico from 'libs/shared/theme/assets/json/130102/entidad_federativa.json';
import franccionArancelaria from 'libs/shared/theme/assets/json/301/fraccion-arancelaria-options.json';
import nico from 'libs/shared/theme/assets/json/301/nico-options.json';

import { Solicitud301State, Tramite301Store } from '../../../../estados/tramites/tramite301.store';
import { Tramite301Query } from '../../../../estados/queries/tramite301.query';

interface DatosPasos {
  indice: number;
  txtBtnSig: string;
}

@Component({
  selector: 'app-informacion-de-la',
  templateUrl: './informacion-de-la.component.html',
  styleUrl: './informacion-de-la.component.scss',
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    BtnContinuarComponent,
    CatalogoSelectComponent,
  ],
  standalone: true,
})
export class InformacionDeLaComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} informacionDeLaform - Formulario principal del componente.
   */
  informacionDeLaform!: FormGroup;

  /**
   * @property {CatalogosSelect} fraccionArancelariaOptions - Opciones del catálogo de fracción arancelaria.
   */
  fraccionArancelariaOptions: Catalogo[] = franccionArancelaria;

  /**
   * @property {CatalogosSelect} nicoOptions - Opciones del catálogo de Nico.
   */
  nicoOptions: Catalogo[] = nico;

  /**
   * @property {CatalogosSelect} estadoFisicoOptions - Opciones del catálogo de estado físico.
   */
  estadoFisicoOptions: Catalogo[] = estadofisico;

  /**
   * @property {number} indice - Índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Datos de los pasos del formulario.
   */
  datosPasos: DatosPasos = {
    indice: this.indice,
    txtBtnSig: 'Continuar',
  };

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud301State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @param {FormBuilder} formbuilt - Instancia de FormBuilder para crear formularios.
   */
  constructor(
    private formbuilt: FormBuilder,
    private tramite301Store: Tramite301Store,
    private tramite301Query: Tramite301Query
  ) {
    // The constructor is used for dependency injection
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y configura el formulario con reglas de validación.
   * @memberof InformacionDeLaComponent
   */
  ngOnInit(): void {
    this.subscription.add(
      this.tramite301Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );

    this.informacionDeLaform = this.formbuilt.group({
      fraccionArancelaria: [
        this.solicitudState?.fraccionArancelaria,
        Validators.required,
      ],
      descripcionFraccion: [
        { value: this.solicitudState?.descripcionFraccion, disabled: true },
      ],
      nico: [this.solicitudState?.nico, Validators.required],
      descripcionNico: [
        { value: this.solicitudState?.descripcionNico, disabled: true },
      ],
      nombreQuimico: [this.solicitudState?.nombreQuimico, Validators.required],
      nombreComercial: [
        this.solicitudState?.nombreComercial,
        Validators.required,
      ],
      numeroCAS: [this.solicitudState?.numeroCAS, Validators.required],
      estadoFisico: [this.solicitudState?.estadoFisico, Validators.required],
      acondicionamiento: [
        this.solicitudState?.acondicionamiento,
        Validators.required,
      ],
    });
  }

  /**
   * @method valorSeleccionadoFraccion
   * @description Maneja el evento de selección de una fracción arancelaria.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoFraccion(): void {
    if (this.informacionDeLaform.get('fraccionArancelaria')?.value) {
      this.informacionDeLaform.get('descripcionFraccion')?.enable();
    } else {
      this.informacionDeLaform.get('descripcionFraccion')?.disable();
    }
  }

  /**
   * @method valorSeleccionadoNico
   * @description Maneja el evento de selección de un Nico.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoNico(): void {
    if (this.informacionDeLaform.get('nico')?.value) {
      this.informacionDeLaform.get('descripcionNico')?.enable();
    } else {
      this.informacionDeLaform.get('descripcionNico')?.disable();
    }
  }

  /**
   * Maneja el evento de continuar al siguiente paso.
   * @method continuar
   * @memberof InformacionDeLaComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite301Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Maneja el evento de continuar al siguiente paso.
   * @method continuar
   * @memberof InformacionDeLaComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
