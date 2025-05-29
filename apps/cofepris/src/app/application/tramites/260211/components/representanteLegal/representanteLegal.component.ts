/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud260211State, Tramite260211Store } from '../../../../estados/tramites/tramite260211.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260211Query } from '../../../../estados/queries/tramite260211.query';
 
/**
 * Componente principal para gestionar el formulario de representante.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './representanteLegal.component.html',
  styleUrl: './representanteLegal.component.scss',
})
 
/**
* Componente para gestionar la información del representante legal en la solicitud.
*/
export class RepresentanteLegalComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud260211State;
 
  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
 
  /**
   * Grupo de formularios principal para el representante legal.
   */
  representante!: FormGroup;
 
  /**
   * Constructor del componente.
   * @param fb - FormBuilder para la creación de formularios reactivos.
   * @param tramite260211Store - Servicio para interactuar con el store de Tramite260211.
   * @param tramite260211Query - Servicio para consultar el estado de la solicitud.
   */
  constructor(
    private readonly fb: FormBuilder,
    private tramite260211Store: Tramite260211Store,
    private tramite260211Query: Tramite260211Query
  ) {
    // Dependencia inyectada para uso posterior
  }
 
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene el estado de la solicitud y crea el formulario del representante legal.
   */
  ngOnInit(): void {
    this.tramite260211Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
 
    /**
     * Inicialización del formulario de representante legal.
     */
this.representante = this.fb.group({
      rfc: [this.solicitudState?.rfc, Validators.required],
      nombre: [{ value: this.solicitudState?.nombre, disabled: true }, Validators.required],
      apellidoPaterno: [{ value: this.solicitudState?.apellidoPaterno, disabled: true }, Validators.required],
      apellidoMaterno: [{ value: this.solicitudState?.apellidoMaterno, disabled: true }],
    });
  }
 
  /**
   * Método para actualizar los valores del formulario de representante legal.
   * Este método simula la obtención de nuevos valores y actualiza el formulario.
   */
  obtenerValor(): void {
    this.representante.patchValue({
      nombre: 47875, // Nota: Esto debería ser una cadena, considera ajustar si es necesario.
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
    });
  }
 
  /**
   * Establece el valor de un campo en el store de Tramite260211.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260211Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260211Store[metodoNombre] as (value: any) => void)(VALOR);
  }
 
  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}