import { CROSLISTA_DE_PAISES, PAIS_PROCEDENCIA } from '../../constantes/importacion-definitiva.enum';
import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CrossListLable, CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionDefinitiva130103State, Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
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
   * Lista de bloques obtenidos del archivo JSON.
   */
  public bloque: Catalogo[] = [];

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
    justificacion: new FormControl(''),
    observaciones: new FormControl('')
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
    private tramite130103Store: Tramite130103Store,
    private tramite130103Query: Tramite130103Query
  // eslint-disable-next-line no-empty-function
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
  async ngOnInit(): Promise<void> {
    try {
      const FRACCIONS = await import('@libs/shared/theme/assets/json/130106/fraccion.json');
      this.bloque = FRACCIONS.bloque ?? [];
    } catch (error) {
      this.bloque = [];
    }
  
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
  
    const BLOQUE_FIELD = this.paisProcedenciaFormData.find(
      (datos: ModeloDeFormaDinamica) => datos.campo === 'bloque'
    ) as ModeloDeFormaDinamica;
  
    if (BLOQUE_FIELD && !BLOQUE_FIELD.opciones) {
      BLOQUE_FIELD.opciones = this.bloque.map((item: { id: number; descripcion: string }) => ({
        descripcion: item.descripcion,
        id: item.id,
      }));
    }
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
  * @param {any} event.valor - Nuevo valor del campo, que puede ser un objeto con un identificador o un valor directo.
  * 
  * @example
  * this.establecerCambioDeValor({ campo: 'pais', valor: { id: 1, descripcion: 'México' } });
  * // Actualiza el estado dinámico del campo "pais" con el identificador 1.
  * 
  * this.establecerCambioDeValor({ campo: 'observaciones', valor: 'Sin observaciones' });
  * // Actualiza el estado dinámico del campo "observaciones" con el valor "Sin observaciones".
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public establecerCambioDeValor(event: { campo: string; valor: any }): void {
    if (event && typeof event.valor === 'object' && event.valor !== null && 'id' in event.valor) {
      const VALOR = event.valor.id;
      this.tramite130103Store.setDynamicFieldValue(event.campo, VALOR);
    } else if (event) {
      this.tramite130103Store.setDynamicFieldValue(event.campo, event.valor);
    }
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
