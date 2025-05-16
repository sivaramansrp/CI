/**
 * tipo-propietario.component.ts
 * Componente que gestiona los datos del tipo de propietario para el trámite 630303.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { CatalogoSelectComponent, SolicitanteComponent, TituloComponent } from '@ng-mf/data-access-user';

import { FORMULARIO_DATOS_PROPIETARIO_DIRECCION } from '../../enum/retorno-importacion-temporal.enum';
import { Tramite630303Query } from '../../estados/tramite630303.query';

import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
/**
 * Componente que gestiona los datos del tipo de propietario para el trámite 630303.
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
   * Indicador para mostrar el formulario de personas extranjeras.
   */
  mostrarFormularioPersonaExtranjera = false;
  /**
   * Indica si se debe mostrar el tipo de propietario.
   */
  mostrarTipoPropietario = false;

  /**
   * Indica si se debe mostrar el solicitante.
   */
  mostrarSolicitante = false;

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
  formularioDatosPropietarioDireccion: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_PROPIETARIO_DIRECCION;
  
  /**
   * Formulario reactivo para gestionar los datos del tipo de propietario.
   */
  tipoPropietarioFormulario!: FormGroup;

  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630303State;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param tramite630303Store - Store para manejar el estado del trámite.
   * @param tramite630303Query - Query para consultar el estado del trámite.
   * @param retornoImportacionTemporalService - Servicio para obtener datos de catálogos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630303Store: Tramite630303Store,
    private tramite630303Query: Tramite630303Query,
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
    this.cambiarPropietario();
    this.cambiarTipoPropietario();
  }

  /**
   * Cambia la visibilidad de los campos según el tipo de propietario seleccionado.
   */
  cambiarTipoPropietario(): void {
    const TIPO_PROPIETARIO_VALOR = this.tipoPropietarioFormulario.get('tipoDePropietario')?.value;
    const NOMBRE_CAMPO = this.formularioDatosPropietarioDireccion.find((campo) => campo.id === 'nombre');
    const APELLIDO_PATERNO_CAMPO = this.formularioDatosPropietarioDireccion.find((campo) => campo.id === 'apellidoPaterno');
    const APELLIDO_MATERNO_CAMPO = this.formularioDatosPropietarioDireccion.find((campo) => campo.id === 'apellidoMaterno');
    const RAZON_SOCIAL_CAMPO = this.formularioDatosPropietarioDireccion.find((campo) => campo.id === 'razonSocial');

    if (NOMBRE_CAMPO && APELLIDO_PATERNO_CAMPO && APELLIDO_MATERNO_CAMPO && RAZON_SOCIAL_CAMPO) {
      NOMBRE_CAMPO.mostrar = TIPO_PROPIETARIO_VALOR === '1';
      APELLIDO_PATERNO_CAMPO.mostrar = TIPO_PROPIETARIO_VALOR === '1';
      APELLIDO_MATERNO_CAMPO.mostrar = TIPO_PROPIETARIO_VALOR === '1';
      RAZON_SOCIAL_CAMPO.mostrar = TIPO_PROPIETARIO_VALOR === '2';
    }
    this.mostrarFormularioPersonaExtranjera = TIPO_PROPIETARIO_VALOR ;
  }

  /**
   * Cambia la visibilidad de los componentes según el propietario seleccionado.
   */
  cambiarPropietario(): void {
    this.mostrarTipoPropietario = this.tipoPropietarioFormulario.get('propietario')?.value === '2';
    this.mostrarSolicitante = this.tipoPropietarioFormulario.get('propietario')?.value === '1';
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.tipoPropietarioFormulario = this.fb.group({
      propietario: [this.estadoSeleccionado?.['propietario'] || '', Validators.required],
      tipoDePropietario: [this.estadoSeleccionado?.['tipoDePropietario'] || '', Validators.required],
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite630303Query.selectTramite630303State$
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
        const PAIS_FIELD = this.formularioDatosPropietarioDireccion.find((campo) => campo.id === 'pais');
        if (PAIS_FIELD) {
          PAIS_FIELD.opciones = data;
        }
      });
  }

  /**
   * Establece un cambio de valor en el store basado en un evento.
   *  Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630303Store.setTramite630303State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630303Store.setTramite630303State($event.campo, $event.valor);
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