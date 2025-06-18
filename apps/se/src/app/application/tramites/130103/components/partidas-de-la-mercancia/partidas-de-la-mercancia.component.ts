import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AlertComponent,
  Catalogo,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ImportacionDefinitiva130103State,
  Tramite130103Store,
} from '../../../../estados/tramites/tramite130103.store';
import {
  MODIFICAR_PARTIDAS_FORM,
  PARTIDAS_COLUMN_TABLA,
  PARTIDAS_DE_LA_MERCANCIA,
} from '../../constantes/importacion-definitiva.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Modal } from 'bootstrap';
import { Partidas } from '../../models/importacion-definitiva.model';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
/**
 * compo doc
 * @component
 * @selector app-partidas-de-la-mercancia
 * @description
 * Este componente es responsable de gestionar y renderizar las partidas de la mercancía
 * en el trámite de importación definitiva. Utiliza un formulario dinámico y una tabla dinámica
 * para mostrar y gestionar las partidas de la mercancía.
 *
 * Funcionalidades principales:
 * - Renderiza dinámicamente los campos del formulario utilizando la configuración definida en `PARTIDAS_DE_LA_MERCANCIA`.
 * - Permite agregar nuevas partidas de mercancía a la tabla dinámica.
 * - Maneja los cambios en los valores de los campos del formulario y actualiza el estado dinámico del trámite.
 * - Muestra las partidas de mercancía en una tabla dinámica con opciones de configuración.
 *
 * Componentes importados:
 * - `TituloComponent`: Componente para mostrar títulos en el formulario.
 * - `AlertComponent`: Componente para mostrar alertas.
 * - `TablaDinamicaComponent`: Componente para mostrar tablas dinámicas.
 * - `FormasDinamicasComponent`: Componente para renderizar formularios dinámicos.
 *
 * @templateUrl ./partidas-de-la-mercancia.component.html
 * @styleUrl ./partidas-de-la-mercancia.component.scss
 */
@Component({
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    FormasDinamicasComponent,
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.scss',
})
export class PartidasDeLaMercanciaComponent
  implements OnInit, AfterViewInit, OnDestroy
{

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;
      

  /**
   * Referencia al modal de confirmación
   */
  @ViewChild('cargarArchivoModal', { static: false })
  cargarArchivoModal!: ElementRef;

  /**
   * Instancia del modal de confirmación
   */
  private cargarArchivoInstance!: Modal;
  /**
   * compo doc
   * @property partidasSeleccionadas
   * @type {Partidas[]}
   * @description
   * Esta propiedad almacena la lista de partidas seleccionadas en la tabla dinámica.
   * Se utiliza para identificar qué partidas han sido seleccionadas por el usuario,
   * permitiendo así realizar operaciones como edición o eliminación sobre dichas partidas.
   *
   * Por ejemplo, al seleccionar una o varias filas en la tabla, estas se guardan en esta propiedad
   * y pueden ser utilizadas posteriormente en métodos como `abrirModalEditar` o `guardarEdicion`.
   *
   * @example
   * console.log(this.partidasSeleccionadas);
   * // Muestra el arreglo de partidas actualmente seleccionadas en la tabla.
   */
  public partidasSeleccionadas: Partidas[] = [];
  /**
   * compo doc
   * @property partidasDeLaMercanciaFormData
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `PARTIDAS_DE_LA_MERCANCIA`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   *
   * @example
   * const campo = this.partidasDeLaMercanciaFormData.find((datos) => datos.campo === 'regimen');
   * console.log(campo.label_nombre); // Muestra: "Régimen al que se destinará la mercancía"
   */
  public partidasDeLaMercanciaFormData = PARTIDAS_DE_LA_MERCANCIA;
  /*
   * compo doc
   * @property modificarPartidasFormData
   */
  public modificarPartidasFormData = MODIFICAR_PARTIDAS_FORM;

  /**
   * compo doc
   * @property instrucciones
   * @type {string}
   * @description
   * Esta propiedad contiene el texto de las instrucciones que se mostrarán en el componente.
   * El valor de esta propiedad se obtiene de la constante `TEXTOS.INSTRUCCIONES`, la cual
   * define los mensajes o guías que deben seguir los usuarios al interactuar con el formulario
   * o la interfaz del componente.
   *
   * @example
   * console.log(this.instrucciones);
   * // Muestra: "Por favor, complete todos los campos obligatorios antes de continuar."
   */
  public instrucciones = TEXTOS.INSTRUCCIONES;

  /**
   * compo doc
   * @property instrucciones_para_partidas
   * @type {string}
   * @description
   * Esta propiedad contiene el texto de las instrucciones específicas para las partidas de la mercancía
   * que se mostrarán en el componente. El valor de esta propiedad se obtiene de la constante
   * `TEXTOS.INSTRUCCIONES_PARA_PARTIDAS`, la cual define los mensajes o guías que deben seguir los usuarios
   * al interactuar con las partidas en el formulario o la interfaz del componente.
   *
   * @example
   * console.log(this.instrucciones_para_partidas);
   * // Muestra: "Por favor, revise las partidas antes de continuar con el trámite."
   */
  public instrucciones_para_partidas = TEXTOS.INSTRUCCIONES_PARA_PARTIDAS;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof PartidasDeLaMercanciaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    cantidad_total: new FormControl({ value: '100', disabled: true }),
    valor_total: new FormControl({ value: '100', disabled: true }),
    ninoFormGroup: new FormGroup({}),

    modificarPartidaForm: new FormGroup({
      modificar_cantidad: new FormControl(''),
      modificar_descripcion: new FormControl(''),
      valor_partidas_usd: new FormControl(''),
      fraccion_partidas: new FormControl(''),
    }),
  });

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof PartidasDeLaMercanciaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public archivoFormGroup: FormGroup = new FormGroup({
    archivo: new FormControl(''),
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
  get modificarPartidaForm(): FormGroup {
    return this.forma.get('modificarPartidaForm') as FormGroup;
  }

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<Partidas>[]= PARTIDAS_COLUMN_TABLA;

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  public datosTabla: Partidas[] = [];

  /**
   * Referencia a la clase o enumeración `TablaSeleccion`.
   *
   * Esta propiedad se utiliza para acceder a las funcionalidades
   * o valores definidos en `TablaSeleccion` dentro del componente.
   */
  public TablaSeleccion = TablaSeleccion;

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
 * @property seleccionFraccionOpciones
 * @type {Catalogo[]}
 * @private
 * @description
 * Arreglo privado que almacena las opciones disponibles para el campo "Fracción Arancelaria".
 * Cada elemento contiene un identificador y una descripción de la fracción.
 * Se utiliza para mostrar las opciones en el formulario dinámico y asociar la fracción seleccionada a la partida.
 */
  private seleccionFraccionOpciones: Catalogo[] = [
      {
        id: 1,
        descripcion: '87033302 Usados.',
      },
    ]

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
  )
  {
    //
  }

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
   */
  ngOnInit(): void {
    this.tramite130103Query.selectImportacion$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.importacionstate = seccionState;
          if (
            this.importacionstate &&
            typeof this.importacionstate === 'object' &&
            this.importacionstate !== null &&
            'partidas_tabla' in this.importacionstate
          ) {
            const PRODUCTO = this.importacionstate['partidas_tabla'];
            PRODUCTO.forEach((productoItem: { id: number }) => {
              const IS_ALREADY_ADDED = this.datosTabla.some(
              (item: { id: number }) => item.id === productoItem.id
            );

            if (!IS_ALREADY_ADDED) {
              this.datosTabla.push(productoItem);
            }
            });
          }
        })
      )
      .subscribe();
  }

  /**
   * compo doc
   * @method agregar
   * @description
   * Este método se utiliza para agregar una nueva partida de mercancía a la tabla dinámica.
   * Verifica si el formulario `ninoFormGroup` es válido antes de crear un objeto con los datos
   * de la partida. Luego, agrega este objeto a la lista de datos de la tabla y actualiza el
   * estado dinámico del trámite con la nueva partida. Finalmente, reinicia el formulario.
   *
   * Funcionalidad:
   * - Valida el formulario `ninoFormGroup` antes de procesar los datos.
   * - Crea un objeto con los datos de la partida, incluyendo cantidad, unidad de medida,
   *   fracción arancelaria, descripción, precio unitario y total en USD.
   * - Agrega la nueva partida a la tabla dinámica y actualiza el estado dinámico del trámite.
   * - Reinicia el formulario para permitir la entrada de una nueva partida.
   *
   * @example
   * this.agregar();
   * // Agrega una nueva partida de mercancía a la tabla dinámica y actualiza el estado del trámite.
   */
  public agregar(): void {
    if (this.ninoFormGroup.valid) {
      const PRODUCTOS = {
        id: this.datosTabla?.length + 1,
        cantidad: this.ninoFormGroup.get('partidas_cantidad')?.value,
        unidadDeMedida: this.importacionstate['unidad_de_medida'],
        fraccionArancelariaTigie: this.obtenerFraccionArancelaria(),
        descripcion: this.ninoFormGroup.get('partidas_descripcion')?.value,
        precioUnitario: '1.000',
        totalUsd: this.ninoFormGroup.get('valor_partida_usd')?.value,
      };
      this.datosTabla?.push(PRODUCTOS);
      this.tramite130103Store.setDynamicFieldValue('partidas_tabla', this.datosTabla);
      this.ninoFormGroup.reset();
    }
  }

  /**
   * @method obtenerFraccionArancelariaProsec
   * @description
   * Obtiene la descripción de la fracción arancelaria seleccionada en el formulario dinámico.
   * @returns {string} Descripción de la fracción arancelaria seleccionada o una cadena vacía si no existe.
   */
    public obtenerFraccionArancelaria(): string {
      const DESCRIPCION = this.seleccionFraccionOpciones.find((ele: Catalogo) => ele.id === Number(this.ninoFormGroup.get('seleccion_fraccion')?.value))?.descripcion;
      return DESCRIPCION ?? '';
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
    if (!event) {
      return;
    }
    this.tramite130103Store.setDynamicFieldValue(event.campo, event.valor);
  }

  /**
   * compo doc
   * @method eventoDeCambioDeValor
   * @description
   * Este método se utiliza para manejar los eventos de cambio en los campos del formulario dinámico.
   * Extrae el valor del campo modificado y lo envuelve en un objeto que incluye el nombre del campo
   * y su nuevo valor. Luego, llama al método `establecerCambioDeValor` para actualizar el estado dinámico.
   * @param {Event} event - Evento de cambio generado por el campo del formulario.
   * @param {string} campo - Nombre del campo modificado.
   */
  public eventoDeCambioDeValor(event: Event, campo: string): void {
    if (event.target) {
      const VALOR = (event.target as HTMLInputElement).value;
      const DATO = { campo: campo, valor: VALOR };
      this.establecerCambioDeValor(DATO);
    }
  }

  /**
   *  compo doc
   * @method cerrar
   * @description
   * Cierra el modal de cargar archivo
   */
  cerrar(): void {
    if (this.cargarArchivoInstance) {
      this.cargarArchivoInstance.hide();
    }
  }

  /**
   * compo doc
   * @method ngAfterViewInit
   * @description
   * Método que se ejecuta después de que la vista ha sido inicializada
   */
  ngAfterViewInit(): void {
    // Inicializa los modales
    if (this.cargarArchivoModal) {
      this.cargarArchivoInstance = new Modal(
        this.cargarArchivoModal.nativeElement
      );
    }
  }

  /**
   *  compo doc
   * @method cargarArchivo
   * @description
   * Abre el modal de cargar archivo
   */
  cargarArchivo(): void {
    if (this.cargarArchivoInstance) {
      this.cargarArchivoInstance.show();
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

  /*
   * @method abrirModalEditar
   */
  onPartidasSeleccion(lista: Partidas[]): void {
    this.partidasSeleccionadas = lista;
    if (!this.partidasSeleccionadas.length) {
      return;
    }
    // Tomar la primera fila seleccionada (puedes adaptar para selección múltiple si lo necesitas)
    const FILA_SELECCIONADA = this.partidasSeleccionadas[0];
    if (FILA_SELECCIONADA) {
      this.modificarPartidaForm.patchValue({
        modificar_cantidad: FILA_SELECCIONADA.cantidad,
        modificar_descripcion: FILA_SELECCIONADA.descripcion,
        valor_partidas_usd: FILA_SELECCIONADA.totalUsd,
        fraccion_partidas: FILA_SELECCIONADA.fraccionArancelariaTigie,

        // Agrega aquí más campos si tu modelo los tiene
      });
    }
  }

  /**
 * @method eliminar
 * @description
 * Elimina las partidas seleccionadas de la tabla dinámica (`datosTabla`).
 * Recorre el arreglo de partidas seleccionadas y elimina cada una de ellas de la tabla,
 * actualizando el estado dinámico del trámite en el store después de cada eliminación.
 */
  eliminar(): void {
    if (this.partidasSeleccionadas.length) {
      this.partidasSeleccionadas.forEach((ele: Partidas) => {
        const INDICE = this.datosTabla.findIndex((item) => item.id === ele.id);
        if (INDICE !== -1) {
          this.datosTabla.splice(INDICE, 1);
          this.tramite130103Store.setDynamicFieldValue('partidas_tabla', this.datosTabla);
        }
      });
    }
  }

  /*
   * @method abrirModalEditar
   */
  // eslint-disable-next-line class-methods-use-this
  abrirModalEditar(): void {
    const MODAL_ELEMENT = document.getElementById('modalEditarPartida');
    if (MODAL_ELEMENT) {
      const MODAL_INSTANCE = Modal.getOrCreateInstance(MODAL_ELEMENT);
      MODAL_INSTANCE.show();
    }
  }
  /*
   *
   * @method abrirModalEditar
   */
  guardarEdicion(): void {
    if (!this.partidasSeleccionadas.length) {
      const INDEX = this.datosTabla.findIndex((item) => item === this.partidasSeleccionadas[0]);
      if (INDEX !== -1) {
        this.datosTabla[INDEX] = {
          ...this.datosTabla[INDEX],
          cantidad: this.modificarPartidaForm.get('modificar_cantidad')?.value,
          descripcion: this.modificarPartidaForm.get('descripcion_partidas')?.value,
          totalUsd: this.modificarPartidaForm.get('valor_partidas_usd')?.value,
          fraccionArancelariaTigie: this.modificarPartidaForm.get('fraccion_partidas')?.value,
        };
      }
      const MODAL_ELEMENT = document.getElementById('modalEditarPartida');
      if (MODAL_ELEMENT) {
        const MODAL_INSTANCE = Modal.getOrCreateInstance(MODAL_ELEMENT);
        MODAL_INSTANCE.hide(); // <-- Cierra el modal
      }
    }
    // Si usas *ngIf para mostrar el modal, pon aquí: this.mostrarModalEditar = false;
  }
}
