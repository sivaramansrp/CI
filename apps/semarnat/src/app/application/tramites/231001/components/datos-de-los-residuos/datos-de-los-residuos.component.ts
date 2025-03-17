/**
 * @module DatosDeLosResiduosComponent
 * Este módulo define el componente `DatosDeLosResiduosComponent` que maneja la información de los residuos.
 */
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MateriaprimaformserviceService } from '@ng-mf/data-access-user';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { REGEX_NUMEROS_DECIMALES } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../../../tramites/231001/estados/queries/tramite231001.query';
import { Tramite231001Store } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { merge } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';

/**
 * Componente que maneja los datos relacionados con los residuos, incluidos los formularios y catálogos.
 */
@Component({
  selector: 'app-datos-de-los-residuos',
  templateUrl: './datos-de-los-residuos.component.html',
  styleUrl: './datos-de-los-residuos.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    TituloComponent,
    BtnContinuarComponent,
  ],
})
export class DatosDeLosResiduosComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} materiaPrimaForm
   * Formulario principal del componente para la gestión de datos de residuos.
   */
  materiaPrimaForm: FormGroup;

  /**
   * @property {boolean} mostrarMsgCantSe06
   * Indica si se debe mostrar el mensaje de cantidad SE06.
   */
  mostrarMsgCantSe06: boolean = false;

  /**
   * @property {DatosPasos} datosPasosGuardar
   * Objeto que maneja los datos de los pasos del formulario.
   */
  datosPasosGuardar: DatosPasos = {
    txtBtnSig: 'Guardar',
    txtBtnAnt: 'Cancelar',
    indice: 2,
    nroPasos: 0,
  };

  /**
   * @property {Catalogo[]} comboUnidadMedida
   * Opciones del catálogo de unidad de medida.
   */
  comboUnidadMedida!: Catalogo[];
  unidadMedidaComercial$: Observable<Catalogo | null> =
    this.tramite231001Query.unidadMedidaComercial$;

  /**
   * @property {Catalogo[]} comboCapituloFraccion
   * Opciones del catálogo de capítulo de fracción.
   */
  comboCapituloFraccion!: Catalogo[];
  capituloFraccion$: Observable<Catalogo | null> =
    this.tramite231001Query.capituloFraccion$;

  /**
   * @property {Catalogo[]} comboPartidaFraccion
   * Opciones del catálogo de partida de fracción.
   */
  comboPartidaFraccion!: Catalogo[];
  partidaFraccion$: Observable<Catalogo | null> =
    this.tramite231001Query.partidaFraccion$;

  /**
   * @property {Catalogo[]} comboSubPartidaFraccion
   * Opciones del catálogo de subpartida de fracción.
   */
  comboSubPartidaFraccion!: Catalogo[];
  subPartidaFraccion$: Observable<Catalogo | null> =
    this.tramite231001Query.subPartidaFraccion$;

  /**
   * @property {Catalogo[]} comboFraccionArancelariaParametros
   * Opciones del catálogo de fracción arancelaria.
   */
  comboFraccionArancelariaParametros!: Catalogo[];
  fraccion$: Observable<Catalogo | null> = this.tramite231001Query.fraccion$;

  /**
   * @private
   * @property {Subject<void>} destroyed$
   * Subject utilizado para gestionar la destrucción del componente y la cancelación de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Instancia de FormBuilder para crear formularios.
   *  Servicio para realizar solicitudes HTTP.
   */
  constructor(
    private fb: FormBuilder,
    private service: MateriaprimaformserviceService,
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store
  ) {
    this.materiaPrimaForm = this.fb.group({
      descUnidadMedida: [''],
      descFraccion: [''],
      generica1: [''],
      clavePartida: [''],
      claveSubPartida: [''],

      nombreDeLaMateriaPrima: [
        '',
        [Validators.required, Validators.maxLength(120)],
      ], // Descripción de la mercancía (requerido, máximo 120 caracteres)
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_NUMEROS_DECIMALES),
          Validators.maxLength(18),
        ],
      ], // Valor numérico (requerido, número entero o decimal con hasta 6 decimales, máximo 18 caracteres)
      cantidadEnLetra: [
        { value: '', disabled: true },
        Validators.maxLength(256),
      ], // Cantidad en letra (deshabilitado, máximo 256 caracteres)
      unidadMedidaComercial: ['', Validators.required],
      capituloFraccion: ['', Validators.required],
      partidaFraccion: ['', Validators.required],
      subPartidaFraccion: ['', Validators.required],
      fraccion: ['', Validators.required],
    });
  }

  /**
   * @ngOnInit
   * Método que se ejecuta cuando el componente es inicializado. Carga los catálogos de unidad de medida y capítulo de fracción.
   */
  ngOnInit(): void {
    merge(
      this.loadComboUnidadMedida(),
      this.loadComboCapituloFraccion(),
      this.loadComboPartidaFraccion(),
      this.loadComboSubPartidaFraccion(),
      this.loadComboFraccionArancelariaParametros()
    ).pipe(takeUntil(this.destroyed$)).subscribe();
    
    this.unidadMedidaComercial$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((unidadMedidaComercial) => {
      if (unidadMedidaComercial) {
        this.materiaPrimaForm
          .get('unidadMedidaComercial')
          ?.setValue(unidadMedidaComercial);
      }
    });

    this.capituloFraccion$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((capituloFraccion) => {
      if (capituloFraccion) {
        this.materiaPrimaForm
          .get('capituloFraccion')
          ?.setValue(capituloFraccion);
      }
    });

    this.partidaFraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((partidaFraccion) => {
        if (partidaFraccion) {
          this.materiaPrimaForm.get('partidaFraccion')?.setValue(partidaFraccion);
        }
      });

      this.subPartidaFraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((subPartidaFraccion) => {
        if (subPartidaFraccion) {
          this.materiaPrimaForm
            .get('subPartidaFraccion')
            ?.setValue(subPartidaFraccion);
        }
      });

      this.fraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((fraccion) => {
        if (fraccion) {
          this.materiaPrimaForm.get('fraccion')?.setValue(fraccion);
        }
      });

      this.tramite231001Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((state) => {
          this.materiaPrimaForm.patchValue({
            nombreDeLaMateriaPrima: state.nombreDeLaMateriaPrima,
            cantidad: state.cantidad,
          });
        })
      )
      .subscribe();
  }

  /**
   * @method loadcomboUnidadMedida
   * Método que carga las opciones del catálogo de unidad de medida.
   */
  loadComboUnidadMedida(): Observable<Catalogo[]> {
    return this.service.getUnidadMedida().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((data: any) => {
        this.comboUnidadMedida = data as Catalogo[];
      }),
      takeUntil(this.destroyed$)
    );
  }

  /**
   * @method loadComboCapituloFraccion
   * Método que carga las opciones del catálogo de capítulo de fracción.
   */
  loadComboCapituloFraccion(): Observable<Catalogo[]> {
    return this.service.getCapituloFraccion().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((data: any) => {
        this.comboCapituloFraccion = data as Catalogo[];
      }),
      takeUntil(this.destroyed$)
    );
  }

  /**
   * @method loadComboPartidaFraccion
   * Método que carga las opciones del catálogo de partida de fracción
   */
  loadComboPartidaFraccion(): Observable<Catalogo[]> {
    return this.service.getPartidaFraccion().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((data:any) => {
        this.comboPartidaFraccion = data as Catalogo[];
      }),
      takeUntil(this.destroyed$)
    );
  }

  /**
   * @method loadComboSubPartidaFraccion
   * Método que carga las opciones del catálogo de subpartida de fracción desde un archivo JSON.
   */
  loadComboSubPartidaFraccion(): Observable<Catalogo[]> {
    return this.service.getSubPartidaFraccion().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((data: any) => {
        this.comboSubPartidaFraccion = data as Catalogo[];
      }),
      takeUntil(this.destroyed$)
    );
  }

  /**
   * @method loadcomboFraccionArancelariaParametros
   * Método que carga las opciones del catálogo de fracción arancelaria desde un archivo JSON.
   */
  loadComboFraccionArancelariaParametros(): Observable<Catalogo[]> {
    return this.service.getFraccionArancelariaParametros().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((data: any) => {
        this.comboFraccionArancelariaParametros = data as Catalogo[];
      }),
      takeUntil(this.destroyed$)
    );
  }

  /**
   * @method obtenerLetraCantidad
   * Convierte la cantidad numérica a su equivalente en texto.
   * @param {string} cantidad - La cantidad a convertir en letra.
   */
  obtenerLetraCantidad(cantidad: string): void {
    this.materiaPrimaForm.patchValue({
      cantidadEnLetra: cantidad === '1' ? 'UNO' : '',
    });
  }

  /**
   * @method cambiaCapituloFraccion
   * Maneja el cambio de capítulo de fracción, limpiando los valores relacionados.
   */
  cambiaCapituloFraccion(): void {
    const SELECTED_CAPITULO_FRACCION =
      this.materiaPrimaForm.get('capituloFraccion')?.value;
    this.tramite231001Store.setCapituloFraccion(SELECTED_CAPITULO_FRACCION);
  }

  /**
   * @method cambiaPartidaFraccion
   * Maneja el cambio de partida de fracción, limpiando los valores relacionados.
   */
  cambiaPartidaFraccion(): void {
    const SELECTED_PARTIDA_FRACCION =
      this.materiaPrimaForm.get('partidaFraccion')?.value;
    this.tramite231001Store.setpartidaFraccion(SELECTED_PARTIDA_FRACCION);
  }

  /**
   * @method cambiaSubPartidaFraccion
   * Maneja el cambio de subpartida de fracción, limpiando los valores relacionados.
   */
  cambiaSubPartidaFraccion(): void {
    const SELECTED_SUB_PARTIDA_FRACCION =
      this.materiaPrimaForm.get('subPartidaFraccion')?.value;
    this.tramite231001Store.setSubPartidaFraccion(
      SELECTED_SUB_PARTIDA_FRACCION
    );
  }
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite231001Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite231001Store[metodoNombre] as (value: string | number | null) => void)(VALOR);
  }
  /**
   * @method cambiaFraccion
   * Maneja el cambio de fracción y valida su vigencia.
   */
  cambiaFraccion(): void {
    const SELECTED_FRACCION = this.materiaPrimaForm.get('fraccion')?.value;
    this.tramite231001Store.setFraccion(SELECTED_FRACCION);
  }

  /**
   * @method cambiaUnidadMedida
   * Maneja el cambio de unidad de medida y actualiza la descripción.
   */
  cambiaUnidadMedida(): void {
    const SELECTED_UNIDAD_MEDIDA = this.materiaPrimaForm.get(
      'unidadMedidaComercial'
    )?.value;
    this.tramite231001Store.setDescUnidadMedida(SELECTED_UNIDAD_MEDIDA);
  }

  /**
   * @method validaVigenciaFraccion
   * Valida la vigencia de la fracción.
   * @param {number} clvFracion - Clave de la fracción a validar.
   */
  validaVigenciaFraccion(clvFracion: number): void {
    if (!clvFracion) {
      this.materiaPrimaForm.patchValue({ fraccion: '' });
    }
  }

  /**
   * @ngOnDestroy
   * Método que se ejecuta cuando el componente es destruido, limpiando los recursos y cancelando las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
