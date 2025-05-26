import { AlertComponent, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { CLASE_TEXTO_CENTRADO, CONFIGURACION_COLUMNAS_CUPO_CONST, NOTA} from '../../constantes/definiciones.enum';
import {
  Catalogo,
  CatalogoSelectComponent,
  CategoriaMensaje,
  ConfiguracionColumna,
  Notificacion,
  NotificacionesComponent,
  SeleccionDelCupoService,
  TablaAcciones,
  TipoNotificacionEnum,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CantidadSolicitadaComponent } from '../cantidad-solicitada/cantidad-solicitada.component';
import { DescripcionDelCupoComponent } from '../descripcion-del-cupo/descripcion-del-cupo.component';
import { Tramite120402Query } from '../../estados/queries/tramite120402.query';
import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';
 
/**
 * Interfaz para los datos de cupo recibidos del servicio
 */
interface DatoCupo {
  description: string;
  assignmentType: string;
  codes: string[] | string;
  quota: string;
}
 
/**
 * Interfaz para los datos de cupo formateados para la tabla
 */
interface FilaCupo {
  descripcion: string;
  tipoAsignacion: string;
  fracciones: string[] | string;
  tipoCupo: string;
}
 
/**
 * Interfaz para el evento de acción en la tabla
 */
interface EventoAccionTabla {
  row: FilaCupo;
  column: string;
}
 
/**
 * Interfaz para la respuesta del servicio getRegimen y getProducto
 */
interface RespuestaDataArray {
  data: Catalogo[];
}
 
/**
 * Interfaz para la respuesta del servicio getTratado
 */
interface RespuestaTratado {
  tratado: Catalogo[];
}
 
/**
 * Componente para la selección del cupo en el sistema.
 * Permite seleccionar régimen aduanero, tratado comercial, producto y subproducto.
 */
@Component({
  selector: 'app-seleccion-del-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    NgIf,
    TablaDinamicaComponent,
    AlertComponent,
    NotificacionesComponent,
    DescripcionDelCupoComponent,
    CantidadSolicitadaComponent,
  ],
  templateUrl: './seleccion-del-cupo.component.html',
  styleUrls: ['./seleccion-del-cupo.component.scss'],
})
 
/**
 * Clase SeleccionDelCupoComponent
 * @class SeleccionDelCupoComponent
 * @description Componente para la selección del cupo en el sistema.
 * Permite seleccionar régimen aduanero, tratado comercial, producto y subproducto.
 */
export class SeleccionDelCupoComponent implements OnInit, OnDestroy {
  /**
   * Enum de acciones disponibles en la tabla dinámica.
   */
  accionesEnum = TablaAcciones;
 
  /**
   * Indica si se debe mostrar el componente de descripción del cupo.
   * @type {boolean}
   * @default false
   */
  mostrarDescripcionCupo = false;
 
  /**
   * Define si el diálogo exitoso está habilitado.
   * @property modalAbierto
   * @type {boolean}
   * @default false
   */
  modalAbierto = false;
 
  /**
   * Mensaje de confirmación para campos obligatorios no seleccionados.
   * @type {string}
   */
  MENSAJE_CONFIRMACION: string = NOTA.CAMPO_OBLIGATORIO_NO_ENCONTRADO;
 
  /**
   * Configuración de columnas para la tabla dinámica de cupo.
   * @type {ConfiguracionColumna<FilaCupo>[]}
   */
  configuracionColumnasCupo: ConfiguracionColumna<FilaCupo>[] =
    CONFIGURACION_COLUMNAS_CUPO_CONST;
 
  /**
   * Título de la alerta informativa.
   * @type {string}
   */
  tituloAlerta: string = NOTA.TITULO_ALERTA;
 
  /**
   * Clase CSS para centrar el texto de la alerta.
   * @type {string}
   */
  infoAlerta: string = CLASE_TEXTO_CENTRADO;
 
  /**
   * Datos que se mostrarán en la tabla dinámica de cupo.
   * @type {FilaCupo[]}
   */
  datosTablaCupo: FilaCupo[] = [];
 
  /**
   * Notificación a mostrar en el modal.
   * @type {Notificacion}
   */
  nuevaNotificacion!: Notificacion;
 
  /**
   * Formulario reactivo para la selección del cupo.
   */
  seleccionForm!: FormGroup;
 
  /**
   * Lista de opciones para el campo de régimen aduanero.
   */
  regimen: Catalogo[] = [];
 
  /**
   * Lista de opciones para el campo de tratado o bloque comercial.
   */
  tratado: Catalogo[] = [];
 
  /**
   * Lista de opciones para el campo de nombre de producto.
   */
  producto: Catalogo[] = [];
 
  /**
   * Lista de opciones para el campo de nombre de subproducto.
   */
  subproducto: Catalogo[] = [];
 
  /**
   * Datos de la selección del cupo obtenidos desde el servicio.
   */
  seleccionDelCupo: DatoCupo | DatoCupo[] = [];
 
  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();
 
  regimen$: Observable<Catalogo | null> = this.tramite120402Query.regimen$;
  tratado$: Observable<Catalogo | null> = this.tramite120402Query.tratado$;
  producto$: Observable<Catalogo | null> = this.tramite120402Query.producto$;
  subproducto$: Observable<Catalogo | null> =
    this.tramite120402Query.subproducto$;
 
  /**
   * Constructor del componente.
   * @param fb - Servicio de FormBuilder para manejar formularios reactivos.
   * @param service - Servicio para obtener la selección del cupo desde el backend.
   * @param tramite120402Store - Store para almacenar datos del trámite.
   * @param tramite120402Query - Query para obtener datos del store.
   */
  constructor(
    private fb: FormBuilder,
    private service: SeleccionDelCupoService,
    private tramite120402Store: Tramite120402Store,
    private tramite120402Query: Tramite120402Query
  ) {}
 
  /**
   * Método de ciclo de vida de Angular: Se ejecuta cuando el componente es inicializado.
   * Inicializa el formulario y carga los datos de la selección del cupo.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.loadRegimen();
    this.loadTratado();
    this.loadProducto();
 
    this.regimen$.subscribe((regimen) => {
      if (regimen) {
        this.seleccionForm.get('regimen')?.setValue(regimen);
      }
    });
 
    this.tratado$.subscribe((tratado) => {
      if (tratado) {
        this.seleccionForm.get('tratado')?.setValue(tratado);
      }
    });
 
    this.producto$.subscribe((producto) => {
      if (producto) {
        this.seleccionForm.get('producto')?.setValue(producto);
      }
    });
 
    this.subproducto$.subscribe((subproducto) => {
      if (subproducto) {
        this.seleccionForm.get('subproducto')?.setValue(subproducto);
      }
    });
  }
 
  /**
   * Método de ciclo de vida de Angular: Se ejecuta cuando el componente es destruido.
   * Libera recursos y evita fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
 
  /**
   * Inicializa el formulario de selección del cupo con validaciones requeridas.
   */
  private initializeForm(): void {
    this.seleccionForm = this.fb.group({
      regimen: ['', Validators.required],
      tratado: ['', Validators.required],
      producto: ['', Validators.required],
      subproducto: ['', Validators.required],
    });
  }
 
  /**
   * Carga las opciones para el campo de régimen aduanero.
   */
  loadRegimen(): void {
    this.service
      .getRegimen()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data => {
        const RESPUESTA = data as RespuestaDataArray;
        this.regimen = RESPUESTA.data;
      }));
  }
 
  /**
   * Carga las opciones para el campo de tratado o bloque comercial.
   */
  loadTratado(): void {
    this.service
      .getTratado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data => {
        this.tratado = (data as RespuestaTratado).tratado;
      }));
  }
 
  /**
   * Carga las opciones para los campos de producto y subproducto.
   */
  loadProducto(): void {
    this.service
      .getProducto()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data => {
        const RESPUESTA = data as RespuestaDataArray;
        this.producto = RESPUESTA.data;
        this.subproducto = RESPUESTA.data;
      }));
  }
 
  /**
   * Carga los datos de la selección del cupo desde el servicio.
   * Los datos obtenidos se asignan a la variable `seleccionDelCupo`.
   */
  loadSeleccionDelCupo(): void {
    this.service
      .getSeleccionDelCupo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos => {
        const MAPEAR_FILA = (fila: DatoCupo): FilaCupo => ({
          descripcion: fila.description,
          tipoAsignacion: fila.assignmentType,
          fracciones: Array.isArray(fila.codes)
            ? fila.codes.map((c: string) => c.trim())
            : fila.codes,
          tipoCupo: fila.quota,
        });
 
        const DATOS_CUPO = datos as DatoCupo | DatoCupo[];
 
        if (Array.isArray(DATOS_CUPO)) {
          this.datosTablaCupo = DATOS_CUPO.map(MAPEAR_FILA);
        } else {
          this.datosTablaCupo = [MAPEAR_FILA(DATOS_CUPO)];
        }
        this.seleccionDelCupo = DATOS_CUPO;
      }));
  }
 
  /**
   * Cierra el modal de notificación.
   */
  cerrarModal(): void {
    this.modalAbierto = false;
  }
 
  /**
   * Maneja la acción realizada sobre una fila de la tabla dinámica.
   * Guarda la fila seleccionada en el store y muestra el componente de descripción del cupo.
   * @param evento - Objeto que contiene la fila y la columna de la acción.
   */
  onAccionCupo(evento: EventoAccionTabla): void {
    this.tramite120402Store.setCupoSeleccionado(evento.row);
    this.mostrarDescripcionCupo = true;
  }
 
  /**
   * Maneja la lógica al hacer clic en el botón Buscar.
   * Verifica que los campos obligatorios estén seleccionados y muestra una notificación si falta alguno.
   * Si todos los campos están completos, carga los datos de la tabla.
   */
  manejarBuscar(): void {
    const VALOR_REGIMEN = this.seleccionForm.get('regimen')?.value;
    const VALOR_ENTIDAD = this.tramite120402Query.getValue().entidad;
    const VALOR_REPRESENTACION =
      this.tramite120402Query.getValue().representacion;
    if (!VALOR_REGIMEN || !VALOR_ENTIDAD || !VALOR_REPRESENTACION) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: this.MENSAJE_CONFIRMACION,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.modalAbierto = true;
    } else {
      this.loadSeleccionDelCupo();
    }
  }
 
  /**
   * Obtiene el valor seleccionado del campo de régimen aduanero y lo establece en el store.
   */
  getRegimen(): void {
    const SELECTED_REGIMEN = this.seleccionForm.get('regimen')?.value;
    this.tramite120402Store.setRegimen(SELECTED_REGIMEN);
  }
 
  /**
   * Obtiene el valor seleccionado del campo de tratado comercial y lo establece en el store.
   */
  getTratado(): void {
    const SELECTED_TRATADO = this.seleccionForm.get('tratado')?.value;
    this.tramite120402Store.setTratado(SELECTED_TRATADO);
  }
 
  /**
   * Obtiene el valor seleccionado del campo de producto y lo establece en el store.
   */
  obtenerValorProducto(): void {
    const SELECTED_PRODUCTO = this.seleccionForm.get('producto')?.value;
    this.tramite120402Store.setProducto(SELECTED_PRODUCTO);
  }
 
  /**
   * Obtiene el valor seleccionado del campo de subproducto y lo establece en el store.
   */
  getSubproducto(): void {
    const SELECTED_SUBPRODUCTO = this.seleccionForm.get('subproducto')?.value;
    this.tramite120402Store.setSubproducto(SELECTED_SUBPRODUCTO);
  }
}
 