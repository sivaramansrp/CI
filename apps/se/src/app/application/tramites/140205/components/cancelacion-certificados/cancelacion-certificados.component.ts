import {
  Catalogo,
  CatalogoLista,
  CuposTabla,
  CuposTablaDatos,
  DisponsiblesTabla,
  DisponsiblesTablaDatos,
} from '../../model/cancelaciones-certificado.model';
import {
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BUSCAR_CUPOS_ERROR,
  TABLA_DE_DATOS_CUPOS,
  TABLA_DE_DATOS_DISPONIBLES,
} from '../../constants/cancelaciones.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import {
  Tramite140205State,
  Tramite140205Store,
} from '../../../../estados/tramites/tramite140205.store';
import { CancelacionCertificadosService } from '../../services/cancelacionCertificados.service';
import { CommonModule } from '@angular/common';
import { Tramite140205Query } from '../../../../estados/queries/tramite140205.query';

/**
 * @component
 * @name CancelacionCertificadosComponent
 * @description
 * Componente encargado de gestionar la cancelación de certificados. Este componente utiliza formularios reactivos
 * para capturar y validar la información necesaria, además de interactuar con servicios para obtener datos dinámicos.
 *
 * @selector app-cancelacion-certificados
 * @templateUrl ./cancelacion-certificados.component.html
 * @styleUrls ./cancelacion-certificados.component.scss
 * @standalone true
 * @imports [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule, TablaDinamicaComponent]
 */
@Component({
  selector: 'app-cancelacion-certificados',
  templateUrl: './cancelacion-certificados.component.html',
  styleUrls: ['./cancelacion-certificados.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    TablaDinamicaComponent,
  ],
})
/**
 * Componente encargado de gestionar la cancelación de certificados.
 *
 * Este componente:
 * - Muestra un formulario para capturar datos de cancelación.
 * - Consulta catálogos necesarios para la selección de opciones.
 * - Renderiza tablas dinámicas con cupos y disponibles.
 * - Se comunica con el store para mantener el estado de la solicitud.
 */
export class CancelacionCertificadosComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  /**
   * Evento de salida que notifica al componente padre
   * cuando se realiza la acción de búsqueda de empresa.
   *
   * @event
   * @type {EventEmitter<boolean>}
   * @example
   * <!-- Uso en plantilla del componente padre -->
   * <app-mi-componente (datosEmpresaBuscar)="onBuscarEmpresa($event)"></app-mi-componente>
   */
  @Output() datosEmpresaBuscar = new EventEmitter<boolean>();

  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * Subject que emite un valor cuando el componente se destruye.
   *
   * @description
   * Se utiliza como mecanismo para desuscribir observables de forma
   * automática en `ngOnDestroy`, evitando fugas de memoria.
   *
   * @private
   * @type {ReplaySubject<boolean>}
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * @property {FormGroup} solicitudForm
   * @description Formulario reactivo para gestionar los datos de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * @property {Tramite140205State} solicitudState
   * @description Estado actual de la solicitud.
   */
  public solicitudState!: Tramite140205State;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @property {Catalogo[]} optionsAduanero
   * @description Opciones disponibles para el campo "Aduanero".
   */
  optionsAduanero!: Catalogo[];

  /**
   * @property {Catalogo[]} optionsMecanismo
   * @description Opciones disponibles para el campo "Mecanismo".
   */
  optionsMecanismo!: Catalogo[];

  /**
   * @property {Catalogo[]} optionsTratado
   * @description Opciones disponibles para el campo "Tratado".
   */
  optionsTratado!: Catalogo[];

  /**
   * @property {Catalogo[]} optionNombreProducto
   * @description Opciones disponibles para el campo "Nombre Producto".
   */
  optionNombreProducto!: Catalogo[];

  /**
   * @property {Catalogo[]} optionNombreSubproducto
   * @description Opciones disponibles para el campo "Nombre Subproducto".
   */
  optionNombreSubproducto!: Catalogo[];

  /**
   * @property {Catalogo[]} optionFederal
   * @description Opciones disponibles para el campo "Federal".
   */
  optionFederal!: Catalogo[];

  /**
   * Mensaje de error asociado a la búsqueda de empresa.
   *
   * @type {string}
   * @default ''
   */
  BUSCAR_EMPRESA_ERROR: string = '';

  tablaDeDatos: {
    encabezadas: {
      encabezado: string;
      clave: (ele: CuposTabla) => string;
      orden: number;
    }[];
    datos: CuposTabla[];
  } = TABLA_DE_DATOS_CUPOS;

  tablaDatos: {
    encabezadas: {
      encabezado: string;
      clave: (ele: DisponsiblesTabla) => string;
      orden: number;
    }[];
    datos: DisponsiblesTabla[];
  } = TABLA_DE_DATOS_DISPONIBLES;

  /**
   * @constructor
   * @description
   * Constructor del componente.
   * Se encarga de inicializar los servicios necesarios para la creación del formulario,
   * la gestión del estado de la solicitud y la validación de datos.
   *
   * @param {FormBuilder} fb
   * Servicio de Angular utilizado para construir formularios reactivos.
   *
   * @param {Tramite140205Store} store
   * Store encargado de gestionar y actualizar el estado de la solicitud.
   *
   * @param {Tramite140205Query} query
   * Query utilizada para consultar y obtener datos del estado de la solicitud.
   *
   * @param {CancelacionCertificadosService} cancelacionCertificadosService
   * Servicio responsable de manejar la lógica relacionada con la cancelación de certificados.
   *
   * @param {ValidacionesFormularioService} validacionesService
   * Servicio que proporciona validaciones personalizadas para los formularios.
   *
   * @param {ConsultaioQuery} consultaioQuery
   * Query utilizada para acceder a datos relacionados con la consulta de información adicional.
   */
  constructor(
    private fb: FormBuilder,
    private store: Tramite140205Store,
    private query: Tramite140205Query,
    private cancelacionCertificadosService: CancelacionCertificadosService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de la solicitud y al estado de consulta, inicializa el formulario
   * con los valores actuales, carga catálogos y tablas necesarios, y obtiene los datos de la API.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.solicitudForm?.patchValue({
            grupoDatalleCupo: {
              aduanero: this.solicitudState?.grupoDatalleCupo?.aduanero,
              descripcionProducto:
                this.solicitudState?.grupoDatalleCupo?.descripcionProducto,
              clasificacionSubproducto:
                this.solicitudState?.grupoDatalleCupo?.clasificacionSubproducto,
              unidad: this.solicitudState?.grupoDatalleCupo?.unidad,
              mecanismo: this.solicitudState?.grupoDatalleCupo?.mecanismo,
              tratado: this.solicitudState?.grupoDatalleCupo?.tratado,
              arancelarias: this.solicitudState?.grupoDatalleCupo?.arancelarias,
              paises: this.solicitudState?.grupoDatalleCupo?.paises,
              observaciones:
                this.solicitudState?.grupoDatalleCupo?.observaciones,
              fundamentos: this.solicitudState?.grupoDatalleCupo?.fundamentos,
              fin: this.solicitudState?.grupoDatalleCupo?.fin,
              inicio: this.solicitudState?.grupoDatalleCupo?.inicio,
            },
            grupoFolio: {
              montoAsignado: this.solicitudState?.grupoFolio?.montoAsignado,
              montoDisponible: this.solicitudState?.grupoFolio?.montoDisponible,
              montoExpedido: this.solicitudState?.grupoFolio?.montoExpedido,
            },
          });
        })
      )
      .subscribe();
    this.initImpresaDatosFormulario();
    this.cargarAduanero();
    this.cargarMecanismo();
    this.cargarTratado();
    this.cargarNombreProducto();
    this.cargarNombreSubproducto();
    this.cargarFederal();
    this.cargarCuposTabla2();
    this.cargarCuposTabla();
    this.fetchGetDatos();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @method fetchGetDatos
   * @description
   * Consulta datos desde el servicio `CancelacionCertificadosService` y actualiza el store
   * con la información obtenida, en caso de que la respuesta sea exitosa.
   */
  public fetchGetDatos(): void {
    this.cancelacionCertificadosService
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta.success) {
          this.store.setGrupoFolio(respuesta.datos.GrupoFolio);
          this.store.setGrupoDatalleCupo(respuesta.datos.GrupoDatalleCupo);
        }
      });
  }

  /**
   * @getter grupoCupo
   * @description
   * Devuelve el `FormGroup` correspondiente a la sección **grupoCupo** dentro del formulario reactivo `solicitudForm`.
   *
   * @returns {FormGroup} FormGroup que gestiona los controles relacionados con el grupo de cupo.
   */
  get grupoCupo(): FormGroup {
    return this.solicitudForm.get('grupoCupo') as FormGroup;
  }

  /**
   * @getter grupoDatalleCupo
   * @description
   * Devuelve el `FormGroup` correspondiente a la sección **grupoDatalleCupo** dentro del formulario reactivo `solicitudForm`.
   *
   * @returns {FormGroup} FormGroup que gestiona los controles relacionados con el detalle del cupo.
   */
  get grupoDatalleCupo(): FormGroup {
    return this.solicitudForm.get('grupoDatalleCupo') as FormGroup;
  }

  /**
   * @getter grupoFolio
   * @description
   * Devuelve el `FormGroup` correspondiente a la sección **grupoFolio** dentro del formulario reactivo `solicitudForm`.
   *
   * @returns {FormGroup} FormGroup que gestiona los controles relacionados con el grupo de folio.
   */
  get grupoFolio(): FormGroup {
    return this.solicitudForm.get('grupoFolio') as FormGroup;
  }

  /**
   * @method inicializarFormulario
   * @description
   * Inicializa el estado del formulario `solicitudForm` en función de la variable `soloLectura`.
   * - Si `soloLectura` es `true`, deshabilita todos los controles del formulario y carga los datos de la tabla de cupos.
   * - Si `soloLectura` es `false`, habilita los controles del formulario para su edición.
   *
   * @returns {void}
   */
  inicializarFormulario(): void {
    if (this.soloLectura) {
      this.solicitudForm.disable();
      this.cargarCuposTabla();
    } else {
      this.solicitudForm.enable();
    }
  }

  /**
   * @method initImpresaDatosFormulario
   * @description
   * Construye el formulario reactivo `solicitudForm` utilizando `FormBuilder` y lo inicializa con valores
   * obtenidos de `solicitudState`.
   * El formulario contiene tres secciones principales:
   * - **grupoCupo**: Información relacionada con cupo (aduanero, mecanismo, tratado, etc.).
   * - **grupoDatalleCupo**: Información detallada del cupo (descripcionProducto, unidad, fundamentos, etc.),
   *   con todos sus campos deshabilitados inicialmente.
   * - **grupoFolio**: Información de montos (asignado, disponible, expedido) con validaciones requeridas y deshabilitados inicialmente.
   *
   * Después de construir el formulario, invoca `inicializarFormulario()` para aplicar la lógica de solo lectura.
   *
   * @returns {void}
   */
  initImpresaDatosFormulario(): void {
    this.solicitudForm = this.fb.group({
      grupoCupo: this.fb.group({
        aduanero: [this.solicitudState?.grupoCupo?.aduanero, []],
        mecanismo: [this.solicitudState?.grupoCupo?.mecanismo, []],
        tratado: [this.solicitudState?.grupoCupo?.tratado, []],
        nombreProducto: [this.solicitudState?.grupoCupo?.nombreProducto, []],
        nombreSubproducto: [
          this.solicitudState?.grupoCupo?.nombreSubproducto,
          [],
        ],
        federal: [this.solicitudState?.grupoCupo?.federal, []],
      }),

      grupoDatalleCupo: this.fb.group({
        aduanero: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.aduanero,
            disabled: true,
          },
          [],
        ],
        descripcionProducto: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.descripcionProducto,
            disabled: true,
          },
          [],
        ],
        clasificacionSubproducto: [
          {
            value:
              this.solicitudState?.grupoDatalleCupo?.clasificacionSubproducto,
            disabled: true,
          },
          [],
        ],
        unidad: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.unidad,
            disabled: true,
          },
          [],
        ],
        mecanismo: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.mecanismo,
            disabled: true,
          },
          [],
        ],
        tratado: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.tratado,
            disabled: true,
          },
          [],
        ],
        arancelarias: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.arancelarias,
            disabled: true,
          },
          [],
        ],
        paises: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.paises,
            disabled: true,
          },
          [],
        ],
        observaciones: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.observaciones,
            disabled: true,
          },
          [],
        ],
        fundamentos: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.fundamentos,
            disabled: true,
          },
          [],
        ],
        fin: [
          { value: this.solicitudState?.grupoDatalleCupo?.fin, disabled: true },
          [],
        ],
        inicio: [
          {
            value: this.solicitudState?.grupoDatalleCupo?.inicio,
            disabled: true,
          },
          [],
        ],
      }),

      grupoFolio: this.fb.group({
        montoAsignado: [
          {
            value: this.solicitudState?.grupoFolio?.montoAsignado,
            disabled: true,
          },
          [Validators.required],
        ],
        montoDisponible: [
          {
            value: this.solicitudState?.grupoFolio?.montoDisponible,
            disabled: true,
          },
          [Validators.required],
        ],
        montoExpedido: [
          {
            value: this.solicitudState?.grupoFolio?.montoExpedido,
            disabled: true,
          },
          [Validators.required],
        ],
      }),
    });
    this.inicializarFormulario();
  }

  /**
   * @method ngAfterViewInit
   * @description
   * Hook del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * Deshabilita explícitamente las secciones **grupoDatalleCupo** y **grupoFolio** del formulario `solicitudForm`
   * para garantizar que no sean editables tras la inicialización de la vista.
   *
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.solicitudForm?.get('grupoDatalleCupo')?.disable();
    this.solicitudForm?.get('grupoFolio')?.disable();
  }

  /**
   * @property {typeof TablaSeleccion} tablaSeleccion
   * @description
   * Referencia al enumerador/constante `TablaSeleccion` que se utiliza
   * para identificar y controlar el tipo de tabla en la vista.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * @method filaSeleccionada
   * @description
   * Maneja el evento de selección de filas en la tabla de **Cupos**.
   * Almacena en la propiedad `filaSeleccionadaLista` la lista de filas seleccionadas.
   *
   * @param {CuposTabla[]} evento - Lista de filas seleccionadas en la tabla de cupos.
   * @returns {void}
   */
  filaSeleccionada(evento: CuposTabla[]): void {
    this.filaSeleccionadaLista = evento;
  }

  /**
   * @method filaDisposible
   * @description
   * Maneja el evento de selección de filas en la tabla de **Disponibles**.
   * Almacena en la propiedad `filaDisposibleLista` la lista de filas seleccionadas.
   *
   * @param {DisponsiblesTabla[]} evento - Lista de filas seleccionadas en la tabla de disponibles.
   * @returns {void}
   */
  filaDisposible(evento: DisponsiblesTabla[]): void {
    this.filaDisposibleLista = evento;
  }

  /**
   * @property {DisponsiblesTabla[]} filaDisposibleLista
   * @description
   * Lista de filas seleccionadas en la tabla de **Disponibles**.
   * Inicialmente está vacía.
   */
  filaDisposibleLista: DisponsiblesTabla[] = [];

  /**
   * @property {CuposTabla[]} filaSeleccionadaLista
   * @description
   * Lista de filas seleccionadas en la tabla de **Cupos**.
   * Inicialmente está vacía.
   */
  filaSeleccionadaLista: CuposTabla[] = [];

  /**
   * @method buscarCupos
   * @description
   * Valida el formulario del grupo **Cupo** y, en caso de ser inválido,
   * marca todos sus controles como tocados y asigna un mensaje de error.
   * Finalmente emite el evento `datosEmpresaBuscar` para notificar la acción
   * de búsqueda de cupos.
   *
   * @returns {void}
   */
  buscarCupos(): void {
    const GRUPO_CUPO = this.solicitudForm.get('grupoCupo') as FormGroup;
    if (GRUPO_CUPO.invalid) {
      GRUPO_CUPO.markAllAsTouched();
      this.BUSCAR_EMPRESA_ERROR = BUSCAR_CUPOS_ERROR;
      this.datosEmpresaBuscar.emit(true);
    }
    this.BUSCAR_EMPRESA_ERROR = '';
    this.datosEmpresaBuscar.emit(true);
  }

  /**
   * @method setValoresStore
   * @description
   * Asigna el valor de un campo del formulario al **store**,
   * ejecutando dinámicamente el método correspondiente dentro de `Tramite140205Store`.
   *
   * @param {FormGroup} form - Formulario que contiene el campo a actualizar.
   * @param {string} campo - Nombre del control dentro del formulario.
   * @param {keyof Tramite140205Store} metodoNombre - Nombre del método en el store que recibirá el valor.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite140205Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * @method cargarAduanero
   * @description
   * Obtiene la lista de opciones para el campo **Aduanero**
   * desde el servicio `cancelacionCertificadosService` y
   * la asigna a la propiedad `optionsAduanero`.
   *
   * @returns {void}
   */
  cargarAduanero(): void {
    this.cancelacionCertificadosService
      .obtenerAduanero()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsAduanero = datos.datos;
      });
  }

  /**
   * @method cargarMecanismo
   * @description
   * Obtiene la lista de opciones para el campo **Mecanismo**
   * desde el servicio `cancelacionCertificadosService` y
   * la asigna a la propiedad `optionsMecanismo`.
   *
   * @returns {void}
   */
  cargarMecanismo(): void {
    this.cancelacionCertificadosService
      .obtenerMecanismo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsMecanismo = datos.datos;
      });
  }

  /**
   * @method cargarTratado
   * @description
   * Obtiene la lista de opciones para el campo **Tratado**
   * desde el servicio `cancelacionCertificadosService` y
   * la asigna a la propiedad `optionsTratado`.
   *
   * @returns {void}
   */
  cargarTratado(): void {
    this.cancelacionCertificadosService
      .obtenerTratado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsTratado = datos.datos;
      });
  }

  /**
   * @method cargarNombreProducto
   * @description
   * Obtiene la lista de opciones para el campo **Nombre del Producto**
   * desde el servicio `cancelacionCertificadosService` y
   * la asigna a la propiedad `optionNombreProducto`.
   *
   * @returns {void}
   */
  cargarNombreProducto(): void {
    this.cancelacionCertificadosService
      .obtenerNombreProducto()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionNombreProducto = datos.datos;
      });
  }

  /**
   * @method cargarNombreSubproducto
   * @description
   * Obtiene la lista de opciones para el campo **Nombre del Subproducto**
   * desde el servicio `cancelacionCertificadosService` y
   * la asigna a la propiedad `optionNombreSubproducto`.
   *
   * @returns {void}
   */
  cargarNombreSubproducto(): void {
    this.cancelacionCertificadosService
      .obtenerNombreSubProducto()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionNombreSubproducto = datos.datos;
      });
  }

  /**
   * @method cargarFederal
   * @description
   * Obtiene la lista de opciones para el campo **Federal**
   * desde el servicio `cancelacionCertificadosService` y
   * la asigna a la propiedad `optionFederal`.
   *
   * @returns {void}
   */
  cargarFederal(): void {
    this.cancelacionCertificadosService
      .obtenerFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionFederal = datos.datos;
      });
  }

  /**
   * @method cargarCuposTabla
   * @description
   * Consulta la información de **Aviso de Cupos** desde el servicio
   * `cancelacionCertificadosService` y asigna el resultado a la propiedad
   * `tablaDeDatos.datos` para su visualización en la tabla.
   *
   * @returns {void}
   */
  public cargarCuposTabla(): void {
    this.cancelacionCertificadosService
      .obtenerAvisoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CuposTablaDatos) => {
        this.tablaDeDatos.datos = datos.datos;
      });
  }

  /**
   * @method cargarCuposTabla2
   * @description
   * Consulta la información de **Aviso de Cupos Disponibles** desde el servicio
   * `cancelacionCertificadosService` y asigna el resultado a la propiedad
   * `tablaDatos.datos` para su visualización en la tabla de disponibles.
   *
   * @returns {void}
   */
  public cargarCuposTabla2(): void {
    this.cancelacionCertificadosService
      .obtenerAvisoTabla2()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: DisponsiblesTablaDatos) => {
        this.tablaDatos.datos = datos.datos;
      });
  }

  /**
   * @method isValid
   * @description
   * Verifica si un campo de un formulario es válido utilizando el
   * servicio `ValidacionesFormularioService`.
   *
   * @param {FormGroup} form - Formulario reactivo en el que se valida el campo.
   * @param {string} field - Nombre del campo dentro del formulario.
   * @returns {boolean} `true` si el campo es válido, `false` en caso contrario.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular. Se ejecuta al destruir el componente,
   * emitiendo la señal de finalización en `destroyNotifier$` y completando el
   * observable para liberar recursos y evitar fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
