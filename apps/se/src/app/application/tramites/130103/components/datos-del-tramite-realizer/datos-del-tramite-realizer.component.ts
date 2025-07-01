import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionDefinitiva130103State, Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { DATOS_DEL_TRAMITE_REALIZAR } from '../../constantes/importacion-definitiva.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service'
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';

/**
  * compo doc
  * @component
  * @selector app-datos-del-tramite-realizer
  * @description
  * Este componente es responsable de gestionar y renderizar los datos del trámite 
  * relacionados con la importación definitiva. Utiliza un formulario dinámico basado 
  * en la configuración definida en `DATOS_DEL_TRAMITE_REALIZER`.
  * 
  * Funcionalidades principales:
  * - Obtiene las opciones para los campos dinámicos del formulario, como el régimen 
  *   al que se destinará la mercancía y la clasificación del régimen, a través de 
  *   servicios.
  * - Renderiza dinámicamente los campos del formulario según la configuración.
  * 
  * Propiedades:
  * - `datosDelTramiteFormData`: Contiene la configuración de los campos del formulario.
  * 
  * Servicios utilizados:
  * - `ImportacionDefinitivaService`: Servicio para obtener datos relacionados con 
  *   el régimen y la clasificación del régimen.
  * 
  * Ciclo de vida:
  * - `ngOnInit`: Llama a los métodos para obtener las opciones de los campos dinámicos.
  * 
  * @templateUrl ./datos-del-tramite-realizer.component.html
  * @styleUrl ./datos-del-tramite-realizer.component.scss
  */
@Component({
  selector: 'app-datos-del-tramite-realizer',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './datos-del-tramite-realizer.component.html',
  styleUrl: './datos-del-tramite-realizer.component.scss',
})
 
export class DatosDelTramiteRealizerComponent implements OnInit, OnDestroy {
  
  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;

  /**
  * compo doc
  * @property datosDelTramiteFormData
  * @description
  * Esta propiedad contiene la configuración de los campos del formulario dinámico 
  * utilizado en el componente. La configuración está basada en la constante 
  * `DATOS_DEL_TRAMITE_REALIZER`, que define los detalles de cada campo, como su 
  * identificador, etiqueta, tipo de entrada, validadores, y más.
  * 
  * Se utiliza para renderizar dinámicamente los campos del formulario y para 
  * gestionar su comportamiento, como la validación y la interacción con los datos 
  * obtenidos de los servicios.
  * 
  * @example
  * const campo = this.datosDelTramiteFormData.find((datos) => datos.campo === 'regimen');
  * console.log(campo.label_nombre); // Muestra: "Régimen al que se destinará la mercancía"
  */
  public datosDelTramiteFormData = DATOS_DEL_TRAMITE_REALIZAR;

  /**
     * compo doc
     * @type {FormGroup}
     * @memberof RepresentanteLegalComponent
     * @description
     * Este es un formulario reactivo de Angular representado por un FormGroup.
     * Se utiliza para manejar y validar los datos del formulario en el componente.
     */
    public forma: FormGroup = new FormGroup({
      ninoFormGroup: new FormGroup({})
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
   * Subject para notificar la destrucción del componente.
   */
    private destroyNotifier$: Subject<void> = new Subject();

    /**
   * Estado de la solicitud de la sección 301.
   * @type {ImportacionDefinitiva130103State}
   * @memberof DatosDelTramiteRealizerComponent
   */
    public importacionstate!: ImportacionDefinitiva130103State;

  /**
  * compo doc
  * @constructor
  * @param {ImportacionDefinitivaService} importacionDefinitivaService - Servicio inyectado que se utiliza para obtener 
  * datos relacionados con el régimen y la clasificación del régimen en el trámite de importación definitiva.
  * 
  * @description
  * Este constructor inicializa el componente e inyecta el servicio `ImportacionDefinitivaService`, 
  * que es necesario para realizar solicitudes y obtener datos dinámicos que se utilizan en el formulario.
  */
  constructor(
    private importacionDefinitivaService: ImportacionDefinitivaService,
    private tramite130103Store: Tramite130103Store,
    private tramite130103Query: Tramite130103Query
  ) {
    //
  }

  /**
  * compo doc
  * @method ngOnInit
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * después de que Angular haya inicializado todas las propiedades vinculadas al componente. 
  * En este caso, se utiliza para llamar a los métodos `obtenerRegimenDestinara` y 
  * `obtenerRegimenClasificacion`, los cuales son responsables de obtener las opciones 
  * dinámicas para los campos del formulario relacionados con el régimen y la clasificación 
  * del régimen.
  * 
  * Funcionalidad:
  * - Inicializa las opciones dinámicas de los campos del formulario al cargar el componente.
  * 
  * @example
  * ngOnInit(): void {
  *   this.obtenerRegimenDestinara();
  *   this.obtenerRegimenClasificacion();
  * }
  */
  ngOnInit(): void {
    this.tramite130103Query.selectImportacion$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.importacionstate = seccionState;
        })
      )
      .subscribe();
    this.obtenerRegimenDestinara();
    this.obtenerRegimenClasificacion();
  }

  /**
  * compo doc
  * @method obtenerRegimenDestinara
  * @description
  * Este método se encarga de obtener las opciones disponibles para el campo "régimen" 
  * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
  * para obtener los datos relacionados con los regímenes de mercancías. 
  * 
  * Si la respuesta del servicio es exitosa (código 200), se procesan los datos recibidos 
  * y se asignan como opciones al campo "régimen" dentro de la configuración del formulario.
  * 
  * Funcionalidad:
  * - Realiza una solicitud al servicio para obtener los regímenes de mercancías.
  * - Busca el campo "régimen" en la configuración del formulario.
  * - Asigna las opciones obtenidas al campo "régimen" si aún no están definidas.
  * 
  * @example
  * this.obtenerRegimenDestinara();
  * // Actualiza las opciones del campo "régimen" en el formulario dinámico.
  */
  public obtenerRegimenDestinara(): void {
    this.importacionDefinitivaService.getRegimenMercancia()
    .pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        const REGIMEN_FIELD = this.datosDelTramiteFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'regimen') as ModeloDeFormaDinamica;
        if (REGIMEN_FIELD) {
          if (!REGIMEN_FIELD.opciones) {
            REGIMEN_FIELD.opciones = RESPONSE.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
          }
        }
      }
    });
  }

  /**
  * compo doc
  * @method obtenerRegimenClasificacion
  * @description
  * Este método se encarga de obtener las opciones disponibles para el campo "clasificación" 
  * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
  * para obtener los datos relacionados con la clasificación de los regímenes de mercancías.
  * 
  * Si la respuesta del servicio es exitosa (código 200), se procesan los datos recibidos 
  * y se asignan como opciones al campo "clasificación" dentro de la configuración del formulario.
  * 
  * Funcionalidad:
  * - Realiza una solicitud al servicio para obtener las clasificaciones de los regímenes.
  * - Busca el campo "clasificación" en la configuración del formulario.
  * - Asigna las opciones obtenidas al campo "clasificación" si aún no están definidas.
  * 
  * @example
  * this.obtenerRegimenClasificacion();
  * // Actualiza las opciones del campo "clasificación" en el formulario dinámico.
  */
  public obtenerRegimenClasificacion(): void {
    this.importacionDefinitivaService.getClasifiRegimen()
    .pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        const CLASIFICACION_FIELD = this.datosDelTramiteFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'clasificacion') as ModeloDeFormaDinamica;
        if (CLASIFICACION_FIELD) {
          if (!CLASIFICACION_FIELD.opciones) {
            CLASIFICACION_FIELD.opciones = RESPONSE.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
          }
        }
      }
    });
  }

  /**
  * compo doc
  * @method establecerCambioDeValor
  * @description
  * Este método se utiliza para manejar los cambios en los valores de los campos del formulario dinámico. 
  * Si el valor del evento es un objeto que contiene un identificador (`id`), actualiza el estado dinámico 
  * del campo correspondiente en el store con dicho identificador. Si el valor no es un objeto, actualiza 
  * el estado dinámico del campo con el valor proporcionado.
  * 
  * Funcionalidad:
  * - Verifica si el valor del evento contiene un identificador (`id`) y actualiza el estado dinámico.
  * - Si el valor no es un objeto, actualiza el estado dinámico con el valor directamente.
  * 
  * @param {Object} event - Objeto que contiene el campo modificado y su nuevo valor.
  * @param {string} event.campo - Nombre del campo modificado.
  * @param {string} event.valor - Nuevo valor del campo, que puede ser un objeto con un identificador o un valor directo.
  * 
  * @example
  * this.establecerCambioDeValor({ campo: 'clasificacion', valor: { id: 1, descripcion: 'Clasificación A' } });
  * // Actualiza el estado dinámico del campo "clasificacion" con el identificador 1.
  * 
  * this.establecerCambioDeValor({ campo: 'regimen', valor: 'Régimen B' });
  * // Actualiza el estado dinámico del campo "regimen" con el valor "Régimen B".
  */
  establecerCambioDeValor(event: { campo: string; valor: string }): void {
    if (event.campo === 'regimen') {
      this.ninoFormGroup.get('clasificacion')?.reset('');
    }
    this.tramite130103Store.setDynamicFieldValue(event.campo, event.valor);
  }

  /**
  * compo doc
  * @method ngOnDestroy
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones 
  * activas y evitar fugas de memoria en la aplicación.
  * 
  * Funcionalidad:
  * - Notifica a través del `Subject` `destroyNotifier$` que el componente será destruido.
  * - Completa el `Subject` para liberar los recursos asociados.
  * 
  * @example
  * ngOnDestroy(): void {
  *   this.destroyNotifier$.next();
  *   this.destroyNotifier$.complete();
  * }
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
