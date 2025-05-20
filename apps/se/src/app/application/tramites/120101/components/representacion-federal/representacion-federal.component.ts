import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { REPRESENTACION_FEDERAL } from '../../constantes/solicitud-de-registro-tpl.enum';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';

/**
 * @component RepresentacionFederalComponent
 * @description
 * Este componente representa la sección "Representación Federal" del trámite 120101. 
 * Utiliza un formulario dinámico para capturar y gestionar los datos relacionados con la representación federal.
 * 
 * Funcionalidad:
 * - Renderiza dinámicamente los campos del formulario basados en la configuración definida en `REPRESENTACION_FEDERAL`.
 * - Maneja la validación y el estado del formulario utilizando formularios reactivos de Angular.
 * - Proporciona métodos para obtener datos de estados y representación federal desde servicios externos.
 * - Permite manejar cambios en los valores del formulario y actualizar el estado global del trámite.
 * 
 * @selector representacion-federal
 * @imports CommonModule, ReactiveFormsModule, FormasDinamicasComponent
 * @templateUrl ./representacion-federal.component.html
 * @styleUrl ./representacion-federal.component.scss
 */
@Component({
  selector: 'representacion-federal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.scss',
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {
  /**
   * compo doc
   * @property representacionFederalFormData
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `REPRESENTACION_FEDERAL`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public representacionFederalFormData = REPRESENTACION_FEDERAL;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentacionFederalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
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
   * Estado de la solicitud de la sección 120101.
   * @type {SolicitudDeRegistroTpl120101State}
   * @memberof BienFinalComponent
   */
  public solicitudDeRegistroState!: SolicitudDeRegistroTpl120101State;

  /** Subject para destruir el componente */
  public destroy$ = new Subject<void>();

  /**
 * @constructor
 * @description
 * Constructor del componente `RepresentacionFederalComponent`. Inicializa las dependencias necesarias para el funcionamiento del componente.
 * 
 * Funcionalidad:
 * - `SolicitudDeRegistroTplService`: Servicio para interactuar con los datos relacionados con la solicitud de registro.
 * - `Tramite120101Store`: Store para gestionar el estado global del trámite 120101.
 * - `Tramite120101Query`: Query para consultar el estado global del trámite 120101.
 * - `ServicioDeFormularioService`: Servicio para registrar y gestionar formularios dinámicos.
 * 
 * @param {SolicitudDeRegistroTplService} solicitudDeRegistroTplService - Servicio para manejar datos de la solicitud de registro.
 * @param {Tramite120101Store} tramite120101Store - Store para gestionar el estado global del trámite.
 * @param {Tramite120101Query} tramite120101Query - Query para consultar el estado global del trámite.
 * @param {ServicioDeFormularioService} servicioDeFormularioService - Servicio para gestionar formularios dinámicos.
 */
  constructor(
    private solicitudDeRegistroTplService: SolicitudDeRegistroTplService,
    private tramite120101Store: Tramite120101Store,
    private tramite120101Query: Tramite120101Query,
    private servicioDeFormularioService: ServicioDeFormularioService
  ) {
    //
  }

  /**
 * @method ngOnInit
 * @description
 * Este método se ejecuta al inicializar el componente `RepresentacionFederalComponent`. 
 * Realiza las siguientes acciones:
 * 
 * Funcionalidad:
 * - Se suscribe al observable `selectSolicitudDeRegistroTpl$` del servicio `Tramite120101Query` 
 *   para obtener el estado de la sección "Solicitud de Registro".
 * - Actualiza la propiedad `solicitudDeRegistroState` con el estado obtenido.
 * - Registra el formulario dinámico `representacionFederal` en el servicio `ServicioDeFormularioService`.
 * - Llama a los métodos `obtenerEstadosDatos` y `obtenerRepresentacionFederalDatos` para cargar datos adicionales.
 * 
 * @example
 * // Al inicializar el componente:
 * this.ngOnInit();
 * // El estado de la solicitud se actualiza, el formulario se registra y los datos adicionales se cargan.
 */
  ngOnInit(): void {
    this.tramite120101Query.selectSolicitudDeRegistroTpl$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudDeRegistroState = seccionState;
        })
      )
      .subscribe();
    this.servicioDeFormularioService.registerForm(
      'representacionFederalForm',
      this.ninoFormGroup
    );
    this.obtenerEstadosDatos();
    this.obtenerRepresentacionFederalDatos();
  }

  /**
 * @method obtenerEstadosDatos
 * @description
 * Este método obtiene los datos de los estados desde el servicio `SolicitudDeRegistroTplService` 
 * y los asigna al campo correspondiente en el formulario dinámico.
 * 
 * Funcionalidad:
 * - Llama al método `getEstadosDatos` del servicio para obtener los datos.
 * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye.
 * - Busca el campo `estado` en la configuración del formulario dinámico (`representacionFederalFormData`).
 * - Si el campo existe y no tiene opciones asignadas, asigna las opciones obtenidas del servicio.
 * 
 * @example
 * this.obtenerEstadosDatos();
 * // El campo `estado` se actualiza con las opciones obtenidas del servicio.
 */
  public obtenerEstadosDatos(): void {
    this.solicitudDeRegistroTplService
      .getEstadosDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const ESTADO_FIELD = this.representacionFederalFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'estado'
        ) as ModeloDeFormaDinamica;
        if (ESTADO_FIELD && !ESTADO_FIELD.opciones) {
          if (Array.isArray(data)) {
            ESTADO_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
 * @method obtenerRepresentacionFederalDatos
 * @description
 * Este método obtiene los datos de la representación federal desde el servicio `SolicitudDeRegistroTplService` 
 * y los asigna al campo correspondiente en el formulario dinámico.
 * 
 * Funcionalidad:
 * - Llama al método `getRepresentacionFederalDatos` del servicio para obtener los datos.
 * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye.
 * - Busca el campo `representacionFederal` en la configuración del formulario dinámico (`representacionFederalFormData`).
 * - Si el campo existe y no tiene opciones asignadas, asigna las opciones obtenidas del servicio.
 * 
 * @example
 * this.obtenerRepresentacionFederalDatos();
 * // El campo `representacionFederal` se actualiza con las opciones obtenidas del servicio.
 */
  public obtenerRepresentacionFederalDatos(): void {
    this.solicitudDeRegistroTplService
      .getRepresentacionFederalDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const REPRESENTACION_FIELD = this.representacionFederalFormData.find(
          (datos: ModeloDeFormaDinamica) =>
            datos.campo === 'representacionFederal'
        ) as ModeloDeFormaDinamica;
        if (REPRESENTACION_FIELD && !REPRESENTACION_FIELD.opciones) {
          if (Array.isArray(data)) {
            REPRESENTACION_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
  * compo doc
  * @method establecerCambioDeValor
  * @description
  * Este método se utiliza para manejar los cambios en los valores de un formulario dinámico.
  * Recibe un evento que contiene el nombre del campo y su nuevo valor, y actualiza el estado
  * dinámico del formulario en el store correspondiente.
  * 
  * @param event - Un objeto que contiene el campo que ha cambiado y su nuevo valor.
  * El objeto tiene la estructura: `{ campo: string; valor: any }`.
  * 
  * @example
  * establecerCambioDeValor({ campo: 'nombre', valor: 'Juan' });
  * // Actualiza el campo 'nombre' con el valor 'Juan' en el store dinámico.
  */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite120101Store.setDynamicFieldValue(event.campo, event.valor);
      this.servicioDeFormularioService.setFormValue('representacionFederal', {
        [event.campo]: event.valor,
      });
  
    }
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
