/**
 * Componente que gestiona los datos de la mercancía para el trámite 630307.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ModeloDeFormaDinamica, REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, TituloComponent } from "@ng-mf/data-access-user";
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component'; // Adjust the path as needed

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite630307State, Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

import { Subject, takeUntil } from 'rxjs';
import { FORMULARIO_DATOS } from '../../enum/retorno-importacion-temporal.enum';
/**
 * Componente que gestiona los datos de la mercancía para el trámite 630307.
 * Permite inicializar formularios, obtener datos del estado y manejar el estado del formulario.
 */
@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule,FormasDinamicasComponent],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Estado seleccionado del trámite 630307.
   */
  estadoSeleccionado!: Tramite630307State;

  /**
   * Formulario reactivo para gestionar los datos de la mercancía.
   */
  datosMercancia!: FormGroup;
formularioDatos: ModeloDeFormaDinamica[]=FORMULARIO_DATOS;

  /**
   * Constructor del componente.
   * 
   * @param formBuilder - Constructor de formularios reactivos.
   * @param tramite630307Store - Store para manejar el estado del trámite.
   * @param tramite630307Query - Query para consultar el estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite630307Store: Tramite630307Store,
    private tramite630307Query: Tramite630307Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene el estado del trámite.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.datosMercancia = this.formBuilder.group({
      // descripcionMercancia: [
      //   this.estadoSeleccionado?.descripcionMercancia,
      //   [Validators.required, Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)],
      // ],
      // motivo: [
      //   this.estadoSeleccionado?.motivo,
      //   [Validators.required, Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)],
      // ],
      // listaMercancia: [
      //   this.estadoSeleccionado?.listaMercancia,
      //   [Validators.required, Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)],
      // ],
    });
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630307Store.setTramite630307State({
      [control]: VALOR,
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
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  establecerCambioDeValor($event: { campo: string; valor: unknown}): void {
    this.setValorStore(this.datosMercancia, $event.campo);
   }
}