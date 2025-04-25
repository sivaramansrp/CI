import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DESCRIPCION_DEL_CUPO } from '../../constantes/solicitud-de-registro-tpl.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';

/**
 * @component DescripcionDelCupoComponent
 * @description
 * Este componente representa la sección "Descripción del Cupo" del trámite 120101. 
 * Utiliza un formulario dinámico para capturar y gestionar los datos relacionados con la descripción del cupo.
 * 
 * Funcionalidad:
 * - Renderiza dinámicamente los campos del formulario basados en la configuración definida en `DESCRIPCION_DEL_CUPO`.
 * - Maneja la validación y el estado del formulario utilizando formularios reactivos de Angular.
 * - Proporciona métodos para establecer valores iniciales en el formulario y manejar cambios dinámicos en los campos.
 * - Interactúa con el estado global del trámite a través de `Tramite120101Store` y `Tramite120101Query`.
 * 
 * @selector descripcion-del-cupo
 * @imports CommonModule, ReactiveFormsModule, FormasDinamicasComponent
 * @templateUrl ./descripcion-del-cupo.component.html
 * @styleUrl ./descripcion-del-cupo.component.scss
 */
@Component({
  selector: 'descripcion-del-cupo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './descripcion-del-cupo.component.html',
  styleUrl: './descripcion-del-cupo.component.scss',
})
export class DescripcionDelCupoComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
 * @Input objetoDeFormulario
 * @description
 * Esta propiedad de entrada (`@Input`) recibe un objeto de tipo `InstrumentoCupoTPLForm` 
 * que contiene los datos iniciales para rellenar el formulario dinámico del componente.
 * 
 * Funcionalidad:
 * - Proporciona los valores iniciales para los campos del formulario dinámico.
 * - Se utiliza en el método `establecerValorDeFormulario` para asignar los valores al formulario.
 * 
 * @type {InstrumentoCupoTPLForm}
 * 
 * @example
 * <descripcion-del-cupo [objetoDeFormulario]="datosDelCupo"></descripcion-del-cupo>
 * // El formulario se inicializa con los valores proporcionados en `datosDelCupo`.
 */
  @Input() objetoDeFormulario!: InstrumentoCupoTPLForm;

  /**
   * compo doc
   * @property descripcionDelCupoFormData
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `DATOS_GENERALES_DEL_SOLICITANTE`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public descripcionDelCupoFormData = DESCRIPCION_DEL_CUPO;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof DatosGeneralesComponent
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
 * Constructor del componente `DescripcionDelCupoComponent`. Inicializa las dependencias necesarias para el funcionamiento del componente.
 * 
 * Funcionalidad:
 * - `Tramite120101Store`: Store para gestionar el estado global del trámite 120101.
 * - `Tramite120101Query`: Query para consultar el estado global del trámite 120101.
 * - `ServicioDeFormularioService`: Servicio para registrar y gestionar formularios dinámicos.
 * 
 * @param {Tramite120101Store} tramite120101Store - Store para gestionar el estado global del trámite.
 * @param {Tramite120101Query} tramite120101Query - Query para consultar el estado global del trámite.
 * @param {ServicioDeFormularioService} servicioDeFormularioService - Servicio para gestionar formularios dinámicos.
 */
  constructor(
    private tramite120101Store: Tramite120101Store,
    private tramite120101Query: Tramite120101Query,
    private servicioDeFormularioService: ServicioDeFormularioService
  ) {
    //
  }

  /**
   * compo doc
 * @method ngOnInit
 * @description
 * Este método se ejecuta al inicializar el componente `DescripcionDelCupoComponent`. 
 * Realiza las siguientes acciones:
 * 
 * Funcionalidad:
 * - Se suscribe al observable `selectSolicitudDeRegistroTpl$` del servicio `Tramite120101Query` 
 *   para obtener el estado de la sección "Solicitud de Registro".
 * - Actualiza la propiedad `solicitudDeRegistroState` con el estado obtenido.
 * - Registra el formulario dinámico `descripcionDelCupoForm` en el servicio `ServicioDeFormularioService`.
 * 
 * @example
 * // Al inicializar el componente:
 * this.ngOnInit();
 * // El estado de la solicitud se actualiza y el formulario se registra.
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
    this.servicioDeFormularioService.registerForm('descripcionDelCupoForm', this.ninoFormGroup)
  }

  /**
   * compo doc
 * @method ngAfterViewInit
 * @description
 * Este método se ejecuta después de que la vista del componente `DescripcionDelCupoComponent` ha sido inicializada.
 * 
 * Funcionalidad:
 * - Verifica si la propiedad `objetoDeFormulario` contiene datos.
 * - Si existen datos en `objetoDeFormulario`, llama al método `establecerValorDeFormulario` para inicializar los valores del formulario dinámico.
 * 
 * @example
 * // Después de inicializar la vista:
 * this.ngAfterViewInit();
 * // Los valores del formulario se establecen si `objetoDeFormulario` contiene datos.
 */
  ngAfterViewInit(): void {
    if (this.objetoDeFormulario) {
      this.establecerValorDeFormulario();
    }
  }

  /**
* compo doc
 * @method establecerValorDeFormulario
 * @description
 * Este método se utiliza para establecer los valores iniciales del formulario dinámico 
 * en el componente `DescripcionDelCupoComponent`. Los valores se obtienen de la propiedad 
 * `objetoDeFormulario` y se asignan a los controles correspondientes en el grupo de formularios `ninoFormGroup`.
 * 
 * Funcionalidad:
 * - Utiliza el método `patchValue` para asignar los valores de `objetoDeFormulario` a los controles del formulario.
 * - Actualiza la validez del formulario llamando a `updateValueAndValidity`.
 * 
 * @example
 * this.establecerValorDeFormulario();
 * // Los valores del formulario se inicializan con los datos de `objetoDeFormulario`.
 */
  public establecerValorDeFormulario(): void {
    this.ninoFormGroup.patchValue({
      fraccionArancelaria: this.objetoDeFormulario.fraccionArancelaria,
      descripcionProducto: this.objetoDeFormulario.productoDescripcion,
      tratadoBloque: this.objetoDeFormulario.cveTratado,
      clasificacionSubproducto: this.objetoDeFormulario.subProductoClasificacion,
      mecanismo: this.objetoDeFormulario.asignacionMecanismo,
      categoria: this.objetoDeFormulario.categoriaTextil,
      clasificacionRegimen: this.objetoDeFormulario.cveRegimenClasificacion,
      descripcionCategoria: this.objetoDeFormulario.categoriaTextilDescripcion,
      paisDestino: this.objetoDeFormulario.cvePaisDestino,
      unidadDeMedida: this.objetoDeFormulario.unidad,
      factor: this.objetoDeFormulario.conversionFactor,
      fechaDeInicio: this.objetoDeFormulario.fechaInicioVigencia,
      fechaDeFin: this.objetoDeFormulario.fechaFinVigencia,
    });
    this.ninoFormGroup.updateValueAndValidity();
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
      this.servicioDeFormularioService.setFormValue('descripcionDelCupoForm', {
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
