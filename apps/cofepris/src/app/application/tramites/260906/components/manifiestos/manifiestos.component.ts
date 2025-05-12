import { AlertComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud260906State, Tramite260906Store } from '../../../../estados/tramites/tramite260906.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MENSAJE_DE_ALERTA } from '@libs/shared/data-access-user/src/core/enums/260906/manifiestos.enum';
import { Tramite260906Query } from '../../../../estados/queries/tramite260906.query';
import radioButtonMexicana from '@libs/shared/theme/assets/json/260906/radioButtonMexicana.json';

/**
 * Componente principal para gestionar el formulario de manifiestos.
 */
@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule,
    InputRadioComponent
  ],
  templateUrl: './manifiestos.component.html',
  styleUrl: './manifiestos.component.css',
})

/**
 * Componente para gestionar los manifiestos de la solicitud.
 */
export class ManifiestosComponent implements OnInit, OnDestroy {
  /**
   * Mensaje de alerta para el usuario.
   */
  public mensaje: string = MENSAJE_DE_ALERTA;

  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud260906State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Grupo de formularios principal para gestionar los manifiestos.
   */
  manifiestos!: FormGroup;

  /**
   * Opciones para los radio buttons, cargadas desde un archivo JSON.
   * @type {RadioOptions[]}
   */
  radioOptions = radioButtonMexicana;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para la creación de formularios.
   * @param tramite260906Store - Servicio para interactuar con el store de Tramite260906.
   * @param tramite260906Query - Servicio para consultar el estado de la solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260906Store: Tramite260906Store,
    private tramite260906Query: Tramite260906Query
  ) {
    // Dependencia inyectada para uso posterior
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene el estado de la solicitud y crea el formulario de manifiestos.
   */
  ngOnInit(): void {
    this.tramite260906Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    /**
     * Inicialización del formulario de manifiestos.
     */
    this.manifiestos = this.fb.group({
      manifesto: [this.solicitudState.manifesto],
      informacionConfidencial: [this.solicitudState?.informacionConfidencial, [Validators.required]],
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite260906.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260906Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260906Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
 * Actualiza el indicador de manifiesto en el Store.
 * @param evento - Evento que contiene el valor del indicador.
 */
  setManifesto(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.tramite260906Store.setManifesto(VALOR);
  }

  /**
* Actualiza el valor de "informacionConfidencial" en el Store.
* @param {any} evento - Valor seleccionado para la propiedad "informacionConfidencial".
* @returns {void}
*/
  setInformacionConfidencial(evento: string | number): void {
    this.tramite260906Store.setInformacionConfidencial(evento);
  }
}
