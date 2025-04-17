import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from "@ng-mf/data-access-user";

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite630307State, Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

import { Subject, takeUntil } from 'rxjs';

/**
 * Componente para gestionar el manifiesto del trámite.
 * Permite capturar y almacenar la declaración del manifiesto en el estado global.
 */
@Component({
  selector: 'app-manifiesto',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './manifiesto.component.html',
  styleUrl: './manifiesto.component.scss',
})
export class ManifiestoComponent implements OnInit, OnDestroy {
  /**
   * Observable utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Formulario reactivo para capturar la declaración del manifiesto.
   */
  manifiestoFormulario!: FormGroup;

  /**
   * Estado seleccionado del trámite.
   * Contiene los valores actuales almacenados en el estado global.
   */
  estadoSeleccionado!: Tramite630307State;

  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para gestionar el estado y los formularios.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630307Store: Tramite630307Store,
    private tramite630307Query: Tramite630307Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el estado actual del store y configura el formulario reactivo.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con los valores del estado actual.
   * Configura las validaciones necesarias para los campos del formulario.
   */
  inizializarFormulario(): void {
    this.manifiestoFormulario = this.fb.group({
      declaracion: [this.estadoSeleccionado?.declaracion, Validators.required],
    });
  }

  /**
   * Actualiza el estado global del store con el valor de un control del formulario.
   * 
   * @param FormGroup Formulario reactivo que contiene los valores a actualizar.
   * @param control Nombre del control en el formulario cuyo valor se actualizará en el estado.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630307Store.setTramite630307State({
      [control]: VALOR,
    });
  }

  /**
   * Obtiene el estado actual del store y lo asigna a la propiedad `estadoSeleccionado`.
   * Se suscribe al observable del store para recibir actualizaciones.
   */
  getValorStore(): void {
    this.tramite630307Query.selectTramite630307State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Completa el observable `destroyed$` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
