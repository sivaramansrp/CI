/**
 * @module DatosDeLosResiduosComponent
 * Este módulo define el componente `DatosDeLosResiduosComponent` que maneja la información de los residuos.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil, map } from 'rxjs';

import { BtnContinuarComponent } from "@ng-mf/data-access-user";
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { MateriaprimaformserviceService } from 'libs/shared/data-access-user/src/core/services/231001/materia-prima-formservice.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../../../tramites/231001/estados/queries/tramite231001.query';
import {
  Solicitud231001State,
  Tramite231001Store,
} from '../../../../tramites/231001/estados/tramites/tramite231001.store'

/**
 * Componente que maneja los datos relacionados con los residuos, incluidos los formularios y catálogos.
 */
@Component({
  selector: 'app-datos-de-los-residuos',
  templateUrl: './datos-de-los-residuos.component.html',
  styleUrl: './datos-de-los-residuos.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CatalogoSelectComponent, CommonModule, TituloComponent, BtnContinuarComponent]
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
    txtBtnSig: "Guardar",
    txtBtnAnt: "Cancelar",
    indice: 2,
    nroPasos: 0
  };

  /**
   * @property {Catalogo[]} comboUnidadMedida
   * Opciones del catálogo de unidad de medida.
   */
  comboUnidadMedida!: Catalogo[];

  /**
   * @property {Catalogo[]} comboCapituloFraccion
   * Opciones del catálogo de capítulo de fracción.
   */
  comboCapituloFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboPartidaFraccion
   * Opciones del catálogo de partida de fracción.
   */
  comboPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboSubPartidaFraccion
   * Opciones del catálogo de subpartida de fracción.
   */
  comboSubPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboFraccionArancelariaParametros
   * Opciones del catálogo de fracción arancelaria.
   */
  comboFraccionArancelariaParametros!: Catalogo[];

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
  constructor(private fb: FormBuilder, private service: MateriaprimaformserviceService,
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store,
  ) {
    this.materiaPrimaForm = this.fb.group({
      descUnidadMedida: [''],
      descFraccion: [''],
      generica1: [''],
      clavePartida: [''],
      claveSubPartida: [''],

      nombreDeLaMateriaPrima: ['', [Validators.required, Validators.maxLength(120)]], // Descripción de la mercancía (requerido, máximo 120 caracteres)
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,6})?$'), Validators.maxLength(18)]], // Valor numérico (requerido, número entero o decimal con hasta 6 decimales, máximo 18 caracteres)
      cantidadEnLetra: [{ value: '', disabled: true }, Validators.maxLength(256)], // Cantidad en letra (deshabilitado, máximo 256 caracteres)
      unidadMedidaComercial: this.fb.group({
        clave: ['', Validators.required]
      }),
      capituloFraccion: ['', Validators.required],
      partidaFraccion: ['', Validators.required],
      subPartidaFraccion: ['', Validators.required],
      fraccion: ['', Validators.required]
    });
  }

  /**
   * @ngOnInit
   * Método que se ejecuta cuando el componente es inicializado. Carga los catálogos de unidad de medida y capítulo de fracción.
   */
  ngOnInit(): void {

    this.loadComboUnidadMedida();
    this.loadComboCapituloFraccion();

    this.tramite231001Query.unidadMedidaComercial$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((unidadMedidaComercial) => {
        this.materiaPrimaForm.patchValue({
          descUnidadMedida: unidadMedidaComercial.descUnidadMedida
        });
      });

    this.tramite231001Query.capituloFraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((capituloFraccion) => {
        this.materiaPrimaForm.get('capituloFraccion')?.setValue(capituloFraccion);
      });

    this.tramite231001Query.partidaFraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((partidaFraccion) => {
        this.materiaPrimaForm.get('partidaFraccion')?.setValue(partidaFraccion);
      });

    this.tramite231001Query.subPartidaFraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((subPartidaFraccion) => {
        this.materiaPrimaForm.get('subPartidaFraccion')?.setValue(subPartidaFraccion);
      });

    this.tramite231001Query.fraccion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((fraccion) => {
        this.materiaPrimaForm.patchValue({
          descFraccion: fraccion.descFraccion
        });
      });

    this.tramite231001Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((state) => {
          this.materiaPrimaForm.patchValue({
            nombreDeLaMateriaPrima: state.nombreDeLaMateriaPrima,
            cantidad: state.cantidad

          });
        })
      )
      .subscribe();


  }

  /**
   * @method loadcomboUnidadMedida
   * Método que carga las opciones del catálogo de unidad de medida.
   */
  loadComboUnidadMedida(): void {
    this.service.getUnidadMedida().pipe(
      takeUntil(this.destroyed$) // Se usa takeUntil para asegurarse de que las suscripciones se cancelen al destruirse el componente
    ).subscribe((data): void => {
      this.comboUnidadMedida = data as Catalogo[];
    });
  }

  /**
   * @method loadComboCapituloFraccion
   * Método que carga las opciones del catálogo de capítulo de fracción.
   */
  loadComboCapituloFraccion(): void {
    this.service.getCapituloFraccion().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboCapituloFraccion = data as Catalogo[];
    });
  }

  /**
   * @method loadComboPartidaFraccion
   * Método que carga las opciones del catálogo de partida de fracción
   */
  loadComboPartidaFraccion(): void {
    this.service.getPartidaFraccion().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboPartidaFraccion = data as Catalogo[];
    });
  }

  /**
   * @method loadComboSubPartidaFraccion
   * Método que carga las opciones del catálogo de subpartida de fracción desde un archivo JSON.
   */
  loadComboSubPartidaFraccion(): void {
    this.service.getSubPartidaFraccion().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboSubPartidaFraccion = data as Catalogo[];
    });
  }

  /**
   * @method loadcomboFraccionArancelariaParametros
   * Método que carga las opciones del catálogo de fracción arancelaria desde un archivo JSON.
   */
  loadComboFraccionArancelariaParametros(): void {
    this.service.getFraccionArancelariaParametros().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboFraccionArancelariaParametros = data as Catalogo[];
    });
  }

  /**
   * @method obtenerLetraCantidad
   * Convierte la cantidad numérica a su equivalente en texto.
   * @param {string} cantidad - La cantidad a convertir en letra.
   */
  obtenerLetraCantidad(cantidad: string): void {
    this.materiaPrimaForm.patchValue({ cantidadEnLetra: cantidad === '1' ? 'UNO' : '' });
  }

  /**
   * @method cambiaCapituloFraccion
   * Maneja el cambio de capítulo de fracción, limpiando los valores relacionados.
   */
  cambiaCapituloFraccion(): void {
    this.materiaPrimaForm.patchValue({
      clavePartida: '',
      claveSubPartida: '',
      descFraccion: '',
      generica1: ''
    });
    this.comboPartidaFraccion = [];
    this.comboSubPartidaFraccion = [];
    this.comboFraccionArancelariaParametros = [];
    this.loadComboPartidaFraccion();
    const capituloFraccion = this.materiaPrimaForm.get('capituloFraccion')?.value;
    this.tramite231001Store.setCapituloFraccion(capituloFraccion);
  }

  /**
   * @method cambiaPartidaFraccion
   * Maneja el cambio de partida de fracción, limpiando los valores relacionados.
   */
  cambiaPartidaFraccion(): void {
    const PARTIDA_CLAVE = this.materiaPrimaForm.get('partidaFraccion')?.value;
    this.materiaPrimaForm.patchValue({
      clavePartida: PARTIDA_CLAVE,
      claveSubPartida: '',
      descFraccion: '',
      generica1: ''
    });
    this.comboSubPartidaFraccion = [];
    this.comboFraccionArancelariaParametros = [];
    this.loadComboSubPartidaFraccion();
    this.tramite231001Store.setpartidaFraccion(PARTIDA_CLAVE);
  }

  /**
   * @method cambiaSubPartidaFraccion
   * Maneja el cambio de subpartida de fracción, limpiando los valores relacionados.
   */
  cambiaSubPartidaFraccion(): void {
    const SUB_PARTIDA_CLAVE = this.materiaPrimaForm.get('subPartidaFraccion')?.value;
    this.materiaPrimaForm.patchValue({
      claveSubPartida: SUB_PARTIDA_CLAVE,
      descFraccion: '',
      generica1: ''
    });
    this.comboFraccionArancelariaParametros = [];
    this.loadComboFraccionArancelariaParametros();
    this.tramite231001Store.setSubPartidaFraccion(SUB_PARTIDA_CLAVE);
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite231001Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite231001Store[metodoNombre] as (value: any) => void)(VALOR);
  }
  /**
   * @method cambiaFraccion
   * Maneja el cambio de fracción y valida su vigencia.
   */
  cambiaFraccion(): void {
    const FRACCION_SELECCIONADA = this.comboFraccionArancelariaParametros.find(fr => fr.id === this.materiaPrimaForm.get('fraccion')?.value);
    if (FRACCION_SELECCIONADA) {
      this.materiaPrimaForm.patchValue({
        descFraccion: FRACCION_SELECCIONADA.descripcion,
        generica1: FRACCION_SELECCIONADA.id
      });
      this.validaVigenciaFraccion(FRACCION_SELECCIONADA.id);
      this.tramite231001Store.setFraccion(FRACCION_SELECCIONADA.descripcion);
    }


  }

  /**
   * @method cambiaUnidadMedida
   * Maneja el cambio de unidad de medida y actualiza la descripción.
   */
  cambiaUnidadMedida(): void {
    const claveSeleccionada = this.materiaPrimaForm.get('unidadMedidaComercial.clave')?.value;
    const claveAsNumber = Number(claveSeleccionada);
    const UNIDAD_SELECCIONADA = this.comboUnidadMedida.find(unidad => unidad.id === claveAsNumber);

    if (UNIDAD_SELECCIONADA) {
      this.materiaPrimaForm.patchValue({
        descUnidadMedida: UNIDAD_SELECCIONADA.descripcion
      });

      this.tramite231001Store.setDescUnidadMedida(UNIDAD_SELECCIONADA.descripcion);
    }
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
