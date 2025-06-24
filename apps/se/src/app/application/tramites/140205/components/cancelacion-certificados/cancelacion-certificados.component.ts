import {
  Catalogo,
  CatalogoLista,
  CuposTabla,
  CuposTablaDatos,
  DisponsiblesTabla,
} from '../../model/cancelaciones-certificado.model';
import {
  CatalogoSelectComponent,
  ConsultaioQuery,
  ConsultaioState,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import {
  TABLA_DE_DATOS_CUPOS,
  TABLA_DE_DATOS_DISPONIBLES,
} from '../../constants/cancelaciones.enum';
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
export class CancelacionCertificadosComponent implements OnInit, OnDestroy {
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  
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
   * @property {TablaSeleccion} tablaDeDatos
   * @description Tabla de selección para la tabla de cupos.
   */
  tablaDeDatos: {
    encabezadas: {
      encabezado: string;
      clave: (ele: CuposTabla) => string;
      orden: number;
    }[];
    datos: CuposTabla[];
  } = TABLA_DE_DATOS_CUPOS;

  /**
   * @property {TablaSeleccion} tablaSeleccion
   * @description Tabla de selección para la tabla de disponibles.
   */
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
   * @description Constructor del componente. Inicializa los servicios necesarios.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite140205Store} store - Store para gestionar el estado de la solicitud.
   * @param {Tramite140205Query} query - Query para obtener el estado de la solicitud.
   * @param {CancelacionCertificadosService} cancelacionCertificadosService - Servicio para gestionar datos de cancelación.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validaciones de formularios.
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
   * @description Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y el formulario inicial.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
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
   * Destruye el componente y libera recursos.
   *
   * Este método se llama cuando el componente se destruye, asegurando que no queden suscripciones activas.
   */
  inicializarFormulario(): void {
    if (this.soloLectura) {
      this.solicitudForm.disable();
  //  this.filaDisposible([]);
      this.cargarCuposTabla();
    } else {
      this.solicitudForm.enable();
    }
  }
  /**
   * @method grupoCupo
   * @description Getter para obtener el grupo de formulario relacionado con los datos del cupo.
   * @returns {FormGroup} Grupo de formulario del cupo.
   */
  get grupoCupo(): FormGroup {
    return this.solicitudForm.get('grupoCupo') as FormGroup;
  }
  /**
   * @method grupoDatalleCupo
   * @description Getter para obtener el grupo de formulario relacionado con los datos del detalle de cupo.
   * @returns {FormGroup} Grupo de formulario del detalle de cupo.
   */
  get grupoDatalleCupo(): FormGroup {
    return this.solicitudForm.get('grupoDatalleCupo') as FormGroup;
  }
  /**
   * @method grupoFolio
   * @description Getter para obtener el grupo de formulario relacionado con los datos del folio.
   * @returns {FormGroup} Grupo de formulario del folio.
   */
  get grupoFolio(): FormGroup {
    return this.solicitudForm.get('grupoFolio') as FormGroup;
  }

  /**
   * @method initImpresaDatosFormulario
   * @description Inicializa el formulario reactivo con los datos de la solicitud.
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
        aduanero: [this.solicitudState?.grupoDatalleCupo?.aduanero, []],
        descripcionProducto: [
          this.solicitudState?.grupoDatalleCupo?.descripcionProducto,
          [],
        ],
        clasificacionSubproducto: [
          this.solicitudState?.grupoDatalleCupo?.clasificacionSubproducto,
          [],
        ],
        unidad: [this.solicitudState?.grupoDatalleCupo?.unidad, []],
        mecanismo: [this.solicitudState?.grupoDatalleCupo?.mecanismo, []],
        tratado: [this.solicitudState?.grupoDatalleCupo?.tratado, []],
        arancelarias: [this.solicitudState?.grupoDatalleCupo?.arancelarias, []],
        paises: [this.solicitudState?.grupoDatalleCupo?.paises, []],
        observaciones: [
          this.solicitudState?.grupoDatalleCupo?.observaciones,
          [],
        ],
        fundamentos: [this.solicitudState?.grupoDatalleCupo?.fundamentos, []],
        fin: [this.solicitudState?.grupoDatalleCupo?.fin, []],
        inicio: [this.solicitudState?.grupoDatalleCupo?.inicio, []],
      }),

      grupoFolio: this.fb.group({
        montoAsignado: [
          this.solicitudState?.grupoFolio?.montoAsignado,
          [Validators.required],
        ],
        montoDisponible: [
          this.solicitudState?.grupoFolio?.montoDisponible,
          [Validators.required],
        ],
        montoExpedido: [
          this.solicitudState?.grupoFolio?.montoExpedido,
          [Validators.required],
        ],
      }),
    });
    this.inicializarFormulario();
  }
  /**
   * @property {TablaSeleccion} tablaSeleccion
   * @description Tabla de selección para la tabla de cupos.
   */
  tablaSeleccion = TablaSeleccion;
  /**
   * @method filaSeleccionada
   * @description Método que se ejecuta al seleccionar una fila en la tabla de cupos.
   * @param {CuposTabla[]} evento - Evento que contiene la lista de filas seleccionadas.
   */
  filaSeleccionada(evento: CuposTabla[]): void {
    this.filaSeleccionadaLista = evento;
  }

  /**
   * @method filaDisposible
   * @description Método que se ejecuta al seleccionar una fila en la tabla de disponibles.
   * @param {DisponsiblesTabla[]} evento - Evento que contiene la lista de filas seleccionadas.
   */
  filaDisposible(evento: DisponsiblesTabla[]): void {
    this.filaDisposibleLista = evento;
  }
  /**
   * @property {CuposTabla[]} filaSeleccionadaLista
   * @description Lista de filas seleccionadas en la tabla de cupos.
   */
  filaDisposibleLista: DisponsiblesTabla[] = [];

  /**
   * @property {DisponsiblesTabla[]} filaDisposibleLista
   * @description Lista de filas disponibles seleccionadas.
   */
  filaSeleccionadaLista: CuposTabla[] = [];

  /**
   * @method buscarCupos
   * @description Método para habilitar la visualización de los datos generales de la empresa.
   */
  buscarCupos(): void {
    this.cargarCuposTabla();
  }

  /**
   * @method setValoresStore
   * @description Actualiza el estado del store con el valor seleccionado en el formulario.
   * @param {FormGroup} form - El formulario que contiene los datos.
   * @param {string} campo - El campo del formulario que se va a actualizar.
   * @param {keyof Tramite140205Store} metodoNombre - El nombre del método en el store que se va a llamar.
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
   * @description Carga las opciones disponibles para el campo "Aduanero".
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
   * @description Carga las opciones disponibles para el campo "Mecanismo".
   */
  cargarMecanismo(): void {
    this.cancelacionCertificadosService
      .obtenerMecanismo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsMecanismo = datos.datos;
      });
  }

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
   * @description Carga las opciones disponibles para el campo "Nombre Producto".
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
   * @description Carga las opciones disponibles para el campo "Nombre Subproducto".
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
   * @description Carga las opciones disponibles para el campo "Federal".
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
   * @description Carga los datos de la tabla de cupos.
   * Utiliza el servicio de cancelación de certificados para obtener los datos.
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
   * Verifica si un campo específico de un formulario es válido.
   *
   * Este método utiliza el servicio de validaciones para determinar si un campo es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta al destruir el componente.
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
