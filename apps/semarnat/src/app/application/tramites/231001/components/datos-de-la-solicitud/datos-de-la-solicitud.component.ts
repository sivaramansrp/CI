/**
 * Componente que representa el formulario de datos de la aduana.
 *
 *    app-datos-dela
 *  ./datos-dela.component.html
 *  ./datos-dela.component.scss
 */
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { PASOS } from '@ng-mf/data-access-user';
import { map } from 'rxjs';

import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud231001State } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../../../tramites/231001/estados/queries/tramite231001.query';
import { Tramite231001Store } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs';

/**
 * Decorador que define un componente de Angular.
 *
 *  app-datos-dela - El selector CSS que identifica este componente en una plantilla.
 * ./datos-dela.component.html - La URL de la plantilla HTML del componente.
 * ./datos-dela.component.scss - La URL de la hoja de estilos del componente.
 */
@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
  ],
})
export class DatosDelaSolicitudeComponent implements OnInit {
  private destroyed$: Subject<void> = new Subject();
  public solicitudState!: Solicitud231001State;
  /**
   *  datosForm
   * @type {FormGroup}
   *  FormGroup que contiene el formulario de datos.
   */
  datosForm!: FormGroup;

  /**
   *  aduanas
   * @type {Catalogo[]}
   *  Arreglo que almacena los catálogos de aduanas.
   */
  aduanas!: Catalogo[];

  /**
   *  selectedAduana
   * @type {string | number}
   *  Aduana seleccionada en el formulario.
   */
  selectedAduana!: string | number;

  /**
   *  pasos
   * @type {ListaPasosWizard[]}
   *  Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   *  indice
   * @type {number}
   *  Índice del paso actual en el wizard.
   */
  indice: number = 1;

  /**
   *  texto
   * @type {string}
   *  Texto del aviso de privacidad.
   */
  texto: string = 'Aviso de Privacidad simplificado';

  /**
   *  solicitudForm
   * @type {FormGroup}
   *  FormGroup que contiene el formulario de solicitud.
   */
  solicitudForm: FormGroup;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio FormBuilder para la creación de formularios.
   * @param {CatalogosService} catalogosServices - Servicio para obtener los catálogos.
   */
  constructor(
    public fb: FormBuilder,
    private catalogosServices: CatalogosService,
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store
  ) {
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
      }),
    });
  }

  /**
   * Verifica si un control del formulario es inválido y ha sido interactuado por el usuario.
   * @param {string} id - Identificador del control del formulario.
   * @returns {boolean | undefined} Verdadero si el control es inválido y ha sido tocado, falso en caso contrario.
   */
  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get('datosdelForm')?.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    this.solicitudForm.markAllAsTouched();
  }

  /**
   * Referencia al componente del wizard.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.datosForm = this.fb.group({
      aduanas: [null, Validators.required],
    });

    this.aduanasdata();

    this.tramite231001Query.numeroProgramaImmex$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((numeroProgramaImmex) => {
        if (numeroProgramaImmex) {
          this.solicitudForm
            .get('numeroProgramaImmex')
            ?.setValue(numeroProgramaImmex);
        }
      });

    this.tramite231001Query.aduanas$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((aduanas) => {
        this.datosForm.get('aduanas')?.setValue(aduanas);
      });

    this.tramite231001Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((state) => {
          this.solicitudForm.patchValue({
            datosdelForm: {
              numeroRegistroAmbiental: state.numeroRegistroAmbiental,
              descripcionGenerica1: state.descripcionGenerica1,
              numeroProgramaImmex: state.numeroProgramaImmex,
            },
          });
        })
      )
      .subscribe();
  }

  /**
   * Maneja la selección de una aduana.
   */
  onAduanaSelect(): void {
    // this.selectedAduana = this.datosForm.get('aduanas')?.value;
    this.selectedAduana = parseInt(this.datosForm.get('aduanas')?.value, 10);

    const ADUANAS = this.datosForm.get('aduanas')?.value;
    this.tramite231001Store.setAduanas(ADUANAS);
  }

  /**
   * Obtiene los datos de las aduanas desde el servicio de catálogos.
   */
  aduanasdata(): void {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_ADUANAS).subscribe({
      next: (resp) => {
        if (resp.length > 0) {
          this.aduanas = resp;
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }

  getnumeroProgramaImmex(): void {
    const SELECTED_NUMERO_PROGRAMA_IMMEX = this.solicitudForm.get(
      'datosdelForm.numeroProgramaImmex'
    )?.value;
    this.tramite231001Store.setnumeroProgramaImmex(
      SELECTED_NUMERO_PROGRAMA_IMMEX
    );
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite231001Store
  ): void {
    const VALOR = this.solicitudForm.get(['datosdelForm', campo])?.value;

    (this.tramite231001Store[metodoNombre] as (value: string | number) => void)(
      VALOR
    );
  }
}
