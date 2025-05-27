/**
 * manifiesto.component.ts
 * Componente que gestiona el manifiesto para el trámite 630303.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { InputCheckComponent, TituloComponent } from "@ng-mf/data-access-user";

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

import { Subject, takeUntil } from 'rxjs';

/**
 * Componente que gestiona el manifiesto para el trámite 630303.
 * Permite inicializar formularios, obtener datos del estado y manejar el estado del formulario.
 */
@Component({
  selector: 'app-manifiesto',
  standalone: true,
  imports: [CommonModule, InputCheckComponent, TituloComponent, ReactiveFormsModule],
  templateUrl: './manifiesto.component.html',
  styleUrl: './manifiesto.component.scss',
})
export class ManifiestoComponent implements OnInit, OnDestroy {

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Formulario reactivo para gestionar el manifiesto.
   */
  manifiestoFormulario!: FormGroup;

  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630104State;

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param tramite630104Store - Store para manejar el estado del trámite.
   * @param tramite630104Query - Query para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene el estado del trámite.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inizializarFormulario(): void {
    this.manifiestoFormulario = this.fb.group({
      declaracion: [this.estadoSeleccionado?.['declaracion'], Validators.required]
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
    this.tramite630104Store.setTramite630104State(control, VALOR);
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   * Suscribe al observable del estado y actualiza la propiedad `estadoSeleccionado`.
   */
  getValorStore(): void {
    this.tramite630104Query.selectTramite630104State$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
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