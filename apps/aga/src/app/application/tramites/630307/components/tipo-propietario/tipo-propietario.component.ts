/**
 * Componente que gestiona los datos del tipo de propietario para el trámite 630307.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';

import { Catalogo, ModeloDeFormaDinamica, REGEX_NOMBRE } from '@libs/shared/data-access-user/src';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';



import { FORMULARIO_DATOS_PROPIETARIO } from '../../enum/retorno-importacion-temporal.enum';
import { Tramite630307Query } from '../../estados/tramite630307.query';

import { Tramite630307State, Tramite630307Store } from '../../estados/tramite630307.store';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
/**
 * tipo-propietario.component.ts
 * Componente que gestiona los datos del tipo de propietario para el trámite 630307.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
@Component({
  selector: 'app-tipo-propietario',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule,
    SolicitanteComponent,
  ],
  templateUrl: './tipo-propietario.component.html',
  styleUrls: ['./tipo-propietario.component.scss'],
})
export class TipoPropietarioComponent implements OnInit, OnDestroy {
  /**
   * Opciones de propietarios obtenidas desde un catálogo.
   */
  propietarioOpciones: Catalogo[] = [];

  /**
   * Opciones de tipos de propietarios obtenidas desde un catálogo.
   */
  tipoDePropietarioOpciones: Catalogo[] = [];

  /**
   * Formulario dinámico para gestionar los datos del tipo de propietario.
   */
  formularioDatosTipoPropietario: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_PROPIETARIO;

  /**
   * Formulario reactivo para gestionar los datos del tipo de propietario.
   */
  tipoPropietarioFormulario!: FormGroup;

  /**
   * Estado seleccionado del trámite 630307.
   */
  estadoSeleccionado!: Tramite630307State;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param tramite630307Store - Store para manejar el estado del trámite.
   * @param tramite630307Query - Query para consultar el estado del trámite.
   * @param retornoImportacionTemporalService - Servicio para obtener datos de catálogos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630307Store: Tramite630307Store,
    private tramite630307Query: Tramite630307Query,
    private retornoImportacionTemporalService: RetornoImportacionTemporalService
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene datos de catálogos.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
    this.getPropietario();
    this.getTipoDePropietario();
    this.getPais();
    this.ajustarValidadoresSegunValor();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.tipoPropietarioFormulario = this.fb.group({
      propietario: [this.estadoSeleccionado?.['propietario'] || '', Validators.required],
      tipoDePropietario: [this.estadoSeleccionado?.['tipoDePropietario'] || '', Validators.required],
      nombre: [this.estadoSeleccionado?.['nombre'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      apellidoPaterno: [this.estadoSeleccionado?.['apellidoPaterno'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      apellidoMaterno: [this.estadoSeleccionado?.['apellidoMaterno'] || '', Validators.pattern(REGEX_NOMBRE)],
      razonSocial: [this.estadoSeleccionado?.['razonSocial'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite630307Query.selectTramite630307State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Obtiene las opciones de propietarios desde el servicio.
   */
  getPropietario(): void {
    this.retornoImportacionTemporalService
      .getPropietario()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.propietarioOpciones = data;
      });
  }

  /**
   * Obtiene las opciones de tipos de propietarios desde el servicio.
   */
  getTipoDePropietario(): void {
    this.retornoImportacionTemporalService
      .getTipoDePropietario()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tipoDePropietarioOpciones = data;
      });
  }

  /**
   * Obtiene las opciones de países desde el servicio.
   */
  getPais(): void {
    this.retornoImportacionTemporalService
      .getPais()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const PAIS_FIELD = this.formularioDatosTipoPropietario.find((field) => field.id === 'pais');
        if (PAIS_FIELD) {
          PAIS_FIELD.opciones = data;
        }
      });
  }

  /**
   * Establece un cambio de valor en el store basado en un evento.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630307Store.setTramite630307State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630307Store.setTramite630307State($event.campo, $event.valor);
    }
  }

  /**
   * Establece validadores a un conjunto de campos del formulario.
   * 
   * @param campos - Lista de nombres de los campos.
   * @param validador - Validador o lista de validadores a aplicar.
   */
  establecerValidadores(campos: string[], validador: ValidatorFn | ValidatorFn[]): void {
    campos.forEach((nombreCampo) => {
      const CAMPO = this.tipoPropietarioFormulario.get(nombreCampo);
      CAMPO?.setValidators(validador);
      CAMPO?.updateValueAndValidity();
    });
  }

  /**
   * Elimina todos los validadores de un conjunto de campos del formulario.
   * 
   * @param campos - Lista de nombres de los campos.
   */
  limpiarValidadores(campos: string[]): void {
    campos.forEach((nombreCampo) => {
      const CAMPO = this.tipoPropietarioFormulario.get(nombreCampo);
      CAMPO?.clearValidators();
      CAMPO?.updateValueAndValidity();
    });
  }

  /**
   * Ajusta los validadores según el valor seleccionado.
   */
  ajustarValidadoresSegunValor(): void {
    const TIPO_DE_PROPIETARIO = this.tipoPropietarioFormulario.get('tipoDePropietario')?.value;
    if (TIPO_DE_PROPIETARIO === '1') {
      this.limpiarValidadores(['razonSocial']);
      this.establecerValidadores(['nombre', 'apellidoPaterno'], Validators.required);
    } else if (TIPO_DE_PROPIETARIO === '2') {
      this.limpiarValidadores(['nombre', 'apellidoPaterno']);
      this.establecerValidadores(['razonSocial'], Validators.required);
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}