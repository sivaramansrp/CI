/**
 * Componente que representa un formulario para solicitar una cantidad específica.
 * Gestiona la validación y el envío del formulario.
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { Observable } from 'rxjs';

import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

import { Tramite120402Query } from '../../estados/queries/tramite120402.query';

import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';

/**
 * Componente que representa un formulario para solicitar una cantidad específica.
 * Gestiona la validación y el envío del formulario.
 */
@Component({
  selector: 'app-cantidad-solicitada',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './cantidad-solicitada.component.html',
  styleUrl: './cantidad-solicitada.component.scss',
})
export class CantidadSolicitadaComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la solicitud de cantidad.
   */
  form!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  cantidadSolicitada$: Observable<string | null> =
    this.tramite120402Query.cantidadSolicitada$;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación y gestión del formulario reactivo.
   */
  constructor(
    private fb: FormBuilder,
    private tramite120402Store: Tramite120402Store,
    private tramite120402Query: Tramite120402Query
  ) {
    // Constructor
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.crearFormulario();

    this.cantidadSolicitada$.subscribe((cantidadSolicitada) => {
      if (cantidadSolicitada) {
        this.form.get('cantidadSolicitada')?.setValue(cantidadSolicitada);
      }
    });
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Crea e inicializa el formulario con validaciones.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      cantidadSolicitada: ['', [Validators.required]],
    });
  }

  /**
   * Verifica si un control del formulario es inválido.
   * @param nombreControl Nombre del control a verificar.
   * @returns Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Valida y envía el formulario, mostrando mensajes en consola según el resultado.
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }
  
  /**
   * Obtiene el valor seleccionado del campo de cantidad solicitada y lo establece en el store.
   */
  getCantidadSolicitada(): void {
    const CANTIDAD_SOLICITADA = this.form.get('cantidadSolicitada')?.value;
    this.tramite120402Store.setCantidadSolicitada(CANTIDAD_SOLICITADA);
  }
}
