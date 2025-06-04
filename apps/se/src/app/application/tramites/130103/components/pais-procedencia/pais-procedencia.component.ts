import { CROSLISTA_DE_PAISES, PAIS_PROCEDENCIA } from '../../constantes/importacion-definitiva.enum';
import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CrossListLable, CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImportacionDefinitiva130103State, Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import { ModeloDeFormaDinamica, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
/**
  * compo doc
  * @component
  * @selector app-pais-procedencia
  * @description
  * Este componente es responsable de gestionar y renderizar los datos relacionados con 
  * el país o los países de procedencia en el trámite de importación definitiva. Utiliza un formulario dinámico 
  * y una lista cruzada para seleccionar y gestionar los países de procedencia.
  * 
  * Funcionalidades principales:
  * - Renderiza dinámicamente los campos del formulario utilizando la configuración definida en `PAIS_PROCEDENCIA`.
  * - Permite la selección y gestión de países de procedencia mediante una lista cruzada (`CrosslistComponent`).
  * - Maneja los cambios en los valores de los campos del formulario y actualiza el estado dinámico del trámite.
  * 
  * Componentes importados:
  * - `CrosslistComponent`: Componente para gestionar listas cruzadas.
  * - `FormasDinamicasComponent`: Componente para renderizar formularios dinámicos.
  * 
  * @templateUrl ./pais-procedencia.component.html
  * @styleUrl ./pais-procedencia.component.scss
  */
@Component({
  selector: 'app-pais-procedencia',
  standalone: true,
  imports: [
    CommonModule,
    CrosslistComponent,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pais-procedencia.component.html',
  styleUrl: './pais-procedencia.component.scss',
})

export class PaisProcedenciaComponent implements OnInit, OnDestroy {

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;

  /**
   * Referencia a los componentes de la lista de fechas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  /**
   * Lista de paises.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;
  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

   /**
   * Etiqueta de la lista de fechas.
   * */
   public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País disponible',
    derecha: 'País seleccionados',
  };

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  readonly paisDeProcedenciaBotones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
  * compo doc
  * @property paisProcedenciaFormData
  * @description
  * Esta propiedad contiene la configuración de los campos del formulario dinámico 
  * utilizado en el componente. La configuración está basada en la constante 
  * `PAIS_PROCEDENCIA`, que define los detalles de cada campo, como su 
  * identificador, etiqueta, tipo de entrada, validadores, y más.
  * 
  * Se utiliza para renderizar dinámicamente los campos del formulario y para 
  * gestionar su comportamiento, como la validación y la interacción con los datos 
  * obtenidos de los servicios.
  * 
  * @example
  * const campo = this.paisProcedenciaFormData.find((datos) => datos.campo === 'regimen');
  * console.log(campo.label_nombre); // Muestra: "Régimen al que se destinará la mercancía"
  */
  public paisProcedenciaFormData = PAIS_PROCEDENCIA;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentanteLegalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
    justificacion: new FormControl('', [Validators.required]),
    observaciones: new FormControl('', [Validators.maxLength(512)])
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
    public destroyNotifier$: Subject<void> = new Subject();

  /**
  * compo doc
  * @constructor
  * @param {tramite130103Store} tramite130103Store
  * @param {tramite130103Query} tramite130103Query
  * 
  * @description
  * Este constructor inicializa el componente e inyecta el servicio `ImportacionDefinitivaService`, 
  * que es necesario para realizar solicitudes y obtener datos dinámicos que se utilizan en el formulario.
  */
  constructor(
    public importacionDefinitivaService: ImportacionDefinitivaService,
    private tramite130103Store: Tramite130103Store,
    private tramite130103Query: Tramite130103Query,
    private formValidator: ValidacionesFormularioService
  ) {}

  /**
  * compo doc
  * @method ngOnInit
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * después de que Angular haya inicializado todas las propiedades vinculadas al componente. 
  * En este caso, se utiliza para suscribirse al estado de importación, inicializar valores 
  * en el formulario y configurar las opciones dinámicas para el campo "bloque".
  * 
  * Funcionalidad:
  * - Escucha los cambios en el estado de importación a través de `selectImportacion$`.
  * - Actualiza los valores de los campos "justificación" y "observaciones" en el formulario 
  *   si están presentes en el estado de importación.
  * - Configura las opciones dinámicas para el campo "bloque" utilizando los datos de la propiedad `bloque`.
  * 
  * @example
  * ngOnInit(): void {
  *   this.tramite130103Query.selectImportacion$
  *     .pipe(
  *       takeUntil(this.destroyNotifier$),
  *       map((seccionState) => {
  *         this.importacionstate = seccionState;
  *         this.forma.get('justificacion')?.setValue(this.importacionstate?.['justificacion']);
  *         this.forma.get('observaciones')?.setValue(this.importacionstate?.['observaciones']);
  *       })
  *     )
  *     .subscribe();
  *   const REGIMEN_FIELD = this.paisProcedenciaFormData.find((datos) => datos.campo === 'bloque');
  *   if (REGIMEN_FIELD && !REGIMEN_FIELD.opciones) {
  *     REGIMEN_FIELD.opciones = this.bloque.map((item) => ({
  *       descripcion: item.descripcion,
  *       id: item.id,
  *     }));
  *   }
  * }
  */
  ngOnInit(): void{
    this.tramite130103Query.selectImportacion$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.importacionstate = seccionState;
  
          if (
            this.importacionstate &&
            typeof this.importacionstate === 'object' &&
            this.importacionstate !== null
          ) {
            const JUSTIFICACION = this.importacionstate?.['justificacion'];
            const OBSERVACIONES = this.importacionstate?.['observaciones'];
  
            if (JUSTIFICACION !== undefined) {
              this.forma.get('justificacion')?.setValue(JUSTIFICACION);
            }
  
            if (OBSERVACIONES !== undefined) {
              this.forma.get('observaciones')?.setValue(OBSERVACIONES);
            }
          }
        })
      )
      .subscribe();

    if (this.consultaState?.readonly) {
      this.forma.get('justificacion')?.disable();
      this.forma.get('observaciones')?.disable();
    }
    this.obtenerBloqueDatos();
  }

  /**
 * @method obtenerBloqueDatos
 * @description
 * Método que obtiene los datos dinámicos para el campo "bloque" del formulario de país de procedencia.
 * 
 * Detalles:
 * - Realiza una petición al servicio `ImportacionDefinitivaService` para obtener los datos del bloque.
 * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
 * - Busca el campo "bloque" en la configuración del formulario (`paisProcedenciaFormData`).
 * - Si el campo existe y aún no tiene opciones, asigna las opciones obtenidas del servicio.
 * 
 * @example
 * this.obtenerBloqueDatos();
 * // Obtiene y asigna las opciones dinámicas para el campo "bloque".
 */
  obtenerBloqueDatos(): void {
    this.importacionDefinitivaService
    .getBloqueData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        const BLOQUE_FIELD = this.paisProcedenciaFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'bloque'
        ) as ModeloDeFormaDinamica;
      
        if (BLOQUE_FIELD && !BLOQUE_FIELD.opciones) {
          const BLOQUE_ARRAY = Array.isArray(resp) ? resp : [resp];
          BLOQUE_FIELD.opciones = BLOQUE_ARRAY.map((item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          }));
        }
      });
  }
  

  /**
  * compo doc
  * @method eventoDeCambioDeValor
  * @description
  * Este método se utiliza para manejar los eventos de cambio en los campos del formulario dinámico. 
  * Extrae el valor del campo modificado y lo envuelve en un objeto que incluye el nombre del campo 
  * y su nuevo valor. Luego, llama al método `establecerCambioDeValor` para actualizar el estado dinámico.
  * 
  * Funcionalidad:
  * - Obtiene el valor del campo modificado desde el evento.
  * - Crea un objeto con el nombre del campo y su nuevo valor.
  * - Llama al método `establecerCambioDeValor` para procesar el cambio.
  * 
  * @param {Event} event - Evento de cambio generado por el campo del formulario.
  * @param {string} campo - Nombre del campo modificado.
  * 
  * @example
  * this.eventoDeCambioDeValor(event, 'justificacion');
  * // Actualiza el estado dinámico del campo "justificacion" con el nuevo valor.
  */
  public eventoDeCambioDeValor(event: Event, campo: string): void {
    if (event.target) {
      const VALOR = (event.target as HTMLInputElement).value;
      const DATO = { campo: campo, valor: VALOR };
      this.establecerCambioDeValor(DATO);
    }
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
  * this.establecerCambioDeValor({ campo: 'pais', valor: { id: 1, descripcion: 'México' } });
  * // Actualiza el estado dinámico del campo "pais" con el identificador 1.
  * 
  * this.establecerCambioDeValor({ campo: 'observaciones', valor: 'Sin observaciones' });
  * // Actualiza el estado dinámico del campo "observaciones" con el valor "Sin observaciones".
  */
  public establecerCambioDeValor(event: { campo: string; valor: string }): void {
    this.tramite130103Store.setDynamicFieldValue(event.campo, event.valor);
  }

  /**
   * Metodo para saber si el campo del formulario es valido.
   * @param field El nombre del campo del formulario que se va a validar.
   * @returns {boolean | null} : Regresa un booleano si el campo es valido o no o puede regresar null si no se ha tocado el campo.
   */
  isValid(field: string): boolean | null {
    return this.formValidator.isValid(this.forma, field);
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
