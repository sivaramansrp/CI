import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionDefinitiva130103State, Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { DATOS_DE_LA_MERCANCIA } from '../../constantes/importacion-definitiva.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';

/**
  * compo doc
  * @component
  * @selector app-datos-de-la-mercancia
  * @description
  * Este componente es responsable de gestionar y renderizar los datos relacionados con 
  * la mercancía en el trámite de importación definitiva. Utiliza un formulario dinámico 
  * basado en la configuración definida en `DATOS_DE_LA_MERCANCIA`.
  * 
  * Funcionalidades principales:
  * - Obtiene las opciones dinámicas para los campos del formulario, como "Fracción Arancelaria" 
  *   y "Unidad de medida", a través de servicios.
  * - Renderiza dinámicamente los campos del formulario según la configuración.
  * - Permite la interacción con los datos obtenidos de los servicios para completar 
  *   la información de la mercancía.
  * 
  * Propiedades:
  * - `datosDeLaMercanciaFormData`: Contiene la configuración de los campos del formulario.
  * 
  * Servicios utilizados:
  * - `ImportacionDefinitivaService`: Servicio para obtener datos relacionados con la fracción 
  *   arancelaria y la unidad de medida.
  * 
  * Ciclo de vida:
  * - `ngOnInit`: Llama a los métodos para obtener las opciones dinámicas de los campos del formulario.
  * 
  * @templateUrl ./datos-de-la-mercancia.component.html
  * @styleUrl ./datos-de-la-mercancia.component.scss
  */

@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrl: './datos-de-la-mercancia.component.scss',
})

export class DatosDeLaMercanciaComponent implements OnInit, OnDestroy {

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
    public datosDeLaMercanciaFormData = DATOS_DE_LA_MERCANCIA;

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
     * Estado de la solicitud de la sección 301.
     * @type {ImportacionDefinitiva130103State}
     * @memberof DatosDelTramiteRealizerComponent
     */
      public importacionstate!: ImportacionDefinitiva130103State;

  /**
     * Subject para notificar la destrucción del componente.
     */
      private destroyNotifier$: Subject<void> = new Subject();

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
      public importacionDefinitivaService: ImportacionDefinitivaService,
      private tramite130103Store: Tramite130103Store,
      private tramite130103Query: Tramite130103Query
    //
    ) {}

    /**
    * compo doc
    * @method ngOnInit
    * @description
    * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
    * después de que Angular haya inicializado todas las propiedades vinculadas al componente. 
    * En este caso, se utiliza para llamar al método `obtenerFraccionArancelaria`, el cual 
    * es responsable de obtener las opciones dinámicas para el campo "Fracción Arancelaria" 
    * del formulario.
    * 
    * Funcionalidad:
    * - Inicializa las opciones dinámicas del campo "Fracción Arancelaria" al cargar el componente.
    * 
    * @example
    * ngOnInit(): void {
    *   this.obtenerFraccionArancelaria();
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
      this.obtenerFraccionArancelaria();
      this.obtenerUnidadDeMedida();
    }

    /**
    * compo doc
    * @method obtenerFraccionArancelaria
    * @description
    * Este método se encarga de obtener las opciones disponibles para el campo "Fracción Arancelaria" 
    * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
    * para obtener los datos relacionados con las fracciones arancelarias.
    * 
    * Funcionalidad:
    * - Realiza una solicitud al servicio para obtener las fracciones arancelarias.
    * - Busca el campo "Fracción Arancelaria" en la configuración del formulario.
    * - Asigna las opciones obtenidas al campo "Fracción Arancelaria" si aún no están definidas.
    * 
    * @example
    * this.obtenerFraccionArancelaria();
    * // Actualiza las opciones del campo "Fracción Arancelaria" en el formulario dinámico.
    */
    public obtenerFraccionArancelaria(): void {
      this.importacionDefinitivaService.getFraccionArancelaria()
      .pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        const FRACCION_ARANCELARIA_FIELD = this.datosDeLaMercanciaFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'fraccion_arancelaria') as ModeloDeFormaDinamica;
        if (FRACCION_ARANCELARIA_FIELD) {
          if (!FRACCION_ARANCELARIA_FIELD.opciones) {
            FRACCION_ARANCELARIA_FIELD.opciones = resp.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
          }
        }
      });
    }

    /**
    * compo doc
    * @method obtenerUnidadDeMedida
    * @description
    * Este método se encarga de obtener las opciones disponibles para el campo "Unidad de medida" 
    * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
    * para obtener los datos relacionados con las unidades de medida.
    * 
    * Funcionalidad:
    * - Realiza una solicitud al servicio para obtener las unidades de medida.
    * - Busca el campo "Unidad de medida" en la configuración del formulario.
    * - Asigna las opciones obtenidas al campo "Unidad de medida" si aún no están definidas.
    * 
    * @example
    * this.obtenerUnidadDeMedida();
    * // Actualiza las opciones del campo "Unidad de medida" en el formulario dinámico.
    */
    public obtenerUnidadDeMedida(): void {
      this.importacionDefinitivaService.getUnidadDeMedida()
      .pipe(
        takeUntil(
          this.destroyNotifier$
        )
      ).subscribe((resp) => {
        const UNIDAD_FIELD = this.datosDeLaMercanciaFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'unidad_de_medida') as ModeloDeFormaDinamica;
        if (UNIDAD_FIELD) {
          if (!UNIDAD_FIELD.opciones) {
            UNIDAD_FIELD.opciones = resp.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
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
  * this.establecerCambioDeValor({ campo: 'unidad_de_medida', valor: { id: 1, descripcion: 'Kilogramos' } });
  * // Actualiza el estado dinámico del campo "unidad_de_medida" con el identificador 1.
  * 
  * this.establecerCambioDeValor({ campo: 'cantidad', valor: 100 });
  * // Actualiza el estado dinámico del campo "cantidad" con el valor 100.
  */
  establecerCambioDeValor(event: { campo: string; valor: string }): void {
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
