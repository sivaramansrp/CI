import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

/**
 * Componente que gestiona los datos del destinatario en el trámite 110208.
 */
@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.css',
})
export class DatosDelDestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud obtenido desde el store.
   * @type {Solicitud110208State}
   */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario reactivo para gestionar los datos del destinatario.
   * @type {FormGroup}
   */
  datosDestinatario!: FormGroup;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   * @param {Tramite110208Store} tramite110208Store - Store del trámite 110208.
   * @param {Tramite110208Query} tramite110208Query - Query para obtener datos del trámite 110208.
   */
  constructor(
    private fb: FormBuilder,
    private tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query
  ) {
    // Dependencia inyectada para uso posterior
  }

  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Configura el formulario y sus valores iniciales.
   */
  ngOnInit(): void {
    this.tramite110208Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.datosDestinatario = this.fb.group({
      nombres: [this.solicitudState?.nombres],
      primerApellido: [this.solicitudState?.primerApellido],
      segundoApellido: [this.solicitudState?.segundoApellido],
      numeroFiscal: [this.solicitudState?.numeroFiscal, Validators.required],
      razonSocial: [{ value: this.solicitudState?.razonSocial, disabled: true }]
    });
  }

  /**
   * Establece valores en el store a partir de un formulario.
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Nombre del campo en el formulario.
   * @param {keyof Tramite110208Store} metodoNombre - Método del store para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método de ciclo de vida que se ejecuta al destruir el componente.
   * Libera recursos y evita pérdidas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}