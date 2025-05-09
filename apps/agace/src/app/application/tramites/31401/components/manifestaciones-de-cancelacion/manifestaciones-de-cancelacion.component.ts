import { CancelacionGarantia270101State, Tramite31401Store } from '../../../../estados/tramites/tramite31401.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormaServicioService } from '../../services/forma-servicio/forma-servicio.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { MANIFESTACIONES } from '../../constantes/cancelacion-garantia.enum';
import { Tramite31401Query } from '../../../../estados/queries/tramite31401.query';

/**
  * @Component
  * @selector manifestaciones-de-cancelacion
  * @description
  * Componente `ManifestacionesDeCancelacionComponent` que representa la sección del formulario relacionada con las manifestaciones de cancelación.
  * 
  * Detalles:
  * - Utiliza el decorador `@Component` para definir las propiedades del componente.
  * - Es un componente independiente (`standalone`) que importa módulos y componentes necesarios para su funcionamiento.
  * - Renderiza un formulario dinámico utilizando el componente `FormasDinamicasComponent`.
  * 
  * Propiedades:
  * - `selector`: Define el nombre del selector del componente como `manifestaciones-de-cancelacion`.
  * - `standalone`: Indica que el componente es independiente.
  * - `imports`: Lista de módulos y componentes importados, como `CommonModule`, `ReactiveFormsModule`, y `FormasDinamicasComponent`.
  * - `templateUrl`: Ruta al archivo de plantilla HTML del componente.
  * - `styleUrl`: Ruta al archivo de estilos SCSS del componente.
  * 
  * @example
  * <manifestaciones-de-cancelacion></manifestaciones-de-cancelacion>
  */
@Component({
  selector: 'manifestaciones-de-cancelacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './manifestaciones-de-cancelacion.component.html',
  styleUrl: './manifestaciones-de-cancelacion.component.scss',
})

export class ManifestacionesDeCancelacionComponent implements OnInit, OnDestroy {
  /**
   * @property forma
   * @description
   * Representa el formulario reactivo utilizado en el componente `ManifiestoBajoProtestaComponent`.
   * @type {FormGroup}
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * compo doc
   * @getter ninoFormGroup
   * @description
   * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
   * dentro del formulario reactivo principal `forma`.
   * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
   *
   * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
   *
   * @example
   * const grupo = this.ninoFormGroup;
   * grupo.get('campo').setValue('nuevo valor');
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * compo doc
   * @property manifestacionesFormData
   * @type {ModeloDeFormaDinamica[]}
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `MANIFESTACIONES`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public manifestacionesFormData = MANIFESTACIONES;

  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Estado de la solicitud de la sección 301.
   * @type {CancelacionGarantia270101State}
   * @memberof ManifestacionesDeCancelacionComponent
   */
  public cancelacionGarantiaState!: CancelacionGarantia270101State;

  /**
  * @constructor
  * @description
  * Constructor del componente `ManifestacionesDeCancelacionComponent`.
  * 
  * Detalles:
  * - Inyecta el servicio `FormaServicioService` para gestionar la lógica del formulario dinámico.
  * - Inyecta el store `Tramite31401Store` para manejar el estado de la solicitud.
  * - Inyecta el query `Tramite31401Query` para consultar el estado de la solicitud.
  * 
  * @param {FormaServicioService} formaServicioService - Servicio para manejar la lógica del formulario dinámico.
  * @param {Tramite31401Store} tramite31401Store - Store para manejar el estado de la solicitud.
  * @param {Tramite31401Query} tramite31401Query - Query para consultar el estado de la solicitud.
  */
  constructor(
    public formaServicioService: FormaServicioService,
    private tramite31401Store: Tramite31401Store,
    private tramite31401Query: Tramite31401Query
  ) {
    //
  }

  /**
  * @method ngOnInit
  * @description
  * Método de inicialización del componente `ManifestacionesDeCancelacionComponent`.
  * 
  * Detalles:
  * - Se suscribe al estado de cancelación de garantía utilizando el query `Tramite31401Query`.
  * - Actualiza la propiedad `cancelacionGarantiaState` con el estado de la sección.
  * - Registra el formulario dinámico `manifestacionesForm` en el servicio `FormaServicioService`.
  * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
  * 
  * @example
  * this.ngOnInit();
  * // Inicializa el componente y registra el formulario dinámico.
  */
  ngOnInit(): void {
    this.tramite31401Query.selectCancelacionGarantia$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.cancelacionGarantiaState = seccionState;
        })
      )
      .subscribe();
    this.formaServicioService.registerForm('manifestacionesForm', this.ninoFormGroup);
  }

  /**
  * @method emitirCambioDeValor
  * @description
  * Método que maneja los cambios de valor en los campos del formulario dinámico.
  * 
  * Detalles:
  * - Actualiza el valor dinámico del campo en el store `Tramite31401Store`.
  * - Establece el valor del campo en el formulario dinámico registrado en el servicio `FormaServicioService`.
  * 
  * @param {Object} event - Objeto que contiene el nombre del campo (`campo`) y el nuevo valor (`valor`).
  * @param {string} event.campo - Nombre del campo que ha cambiado.
  * @param {string} event.valor - Nuevo valor del campo.
  * 
  * @example
  * this.emitirCambioDeValor({ campo: 'nombreCampo', valor: 'nuevoValor' });
  * // Actualiza el valor del campo `nombreCampo` con `nuevoValor`.
  */
  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite31401Store.setDynamicFieldValue(event.campo, event.valor);
    this.formaServicioService.setFormValue('manifestacionesForm', {
      [event.campo]: event.valor,
    });
  }

  /**
     * @method ngOnDestroy
     * @description
     * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente
     * cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones
     * activas y evitar fugas de memoria en la aplicación.
     *
     * Funcionalidad:
     * - Notifica a través del `Subject` `destroy$` que el componente será destruido.
     * - Completa el `Subject` para liberar los recursos asociados.
     *
     * @example
     * ngOnDestroy(): void {
     *   this.destroy$.next();
     *   this.destroy$.complete();
     * }
     */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
