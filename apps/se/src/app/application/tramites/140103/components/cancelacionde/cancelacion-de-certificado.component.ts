import { Catalogo, ConsultaioQuery, ConsultaioState, Notificacion, NotificacionesComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud140103State, Solicitud140103Store } from '../../estados/store/solicitud140103.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogoServices } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { CuposDisponiblesBuscarResponse } from '../../../../shared/models/cupos-disponibles.model';
import { NUEVO_CUPOS } from '../../constants/detalle.enum';
import { ServiciosService } from '../../../../shared/services/servicios.service';
import { Solicitud140103Query } from '../../estados/query/solicitud140103.query';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

@Component({
  selector: 'app-cancelacion-de-certificado',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    CommonModule,
    FormsModule,
    NotificacionesComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent,
  ],
  templateUrl: './cancelacion-de-certificado.component.html',
  styleUrl: './cancelacion-de-certificado.component.css',
})
export class CancelacionDeCertificateComponent implements OnInit, OnDestroy {
  /**
   * Array de índices de las filas seleccionadas en la tabla de mercancías (checkboxes).
   */
  filasSeleccionadas: number[] = [];

  /**
   * Lista de cupos disponibles obtenidos de la búsqueda.
   */
  CuposDisponiblesDatos: CuposDisponiblesBuscarResponse[] = [];

  CertificadosDisponiblesDatos: CuposDisponiblesBuscarResponse[] = [];

  CertificadosCancelarDatos: CuposDisponiblesBuscarResponse[] = [];

  selectedCuposDisponibles: CuposDisponiblesBuscarResponse | null = null;

  selectedCertificados: CuposDisponiblesBuscarResponse | null = null;

  mostrarCertificadosCancelar :boolean = false;

  /**
   * Configuración del tipo de selección en la tabla (en este caso, se usa un checkbox).
   */
  TablaSeleccion = TablaSeleccion.CHECKBOX;
  /**
   * Formulario reactivo para la cancelación de certificados.
   */
  cancelacionForm!: FormGroup;

  /**
   * Formulario reactivo para los detalles del cupo seleccionado.
   */
  detalleForm!: FormGroup;

  /**
   * Formulario reactivo para los datos del oficio relacionados con la cancelación.
   */
  oficioForm!: FormGroup;
  /**
   * Catálogo de regímenes disponibles.
   */
  public regimenDatos!: Catalogo[];

  /**
   * Catálogo de mecanismos de asignación disponibles.
   */
  public mecanismoDatos!: Catalogo[];

  /**
   * Catálogo de tratados disponibles.
   */
  public tratadoDatos!: Catalogo[];

  /**
   * Catálogo de nombres de productos disponibles.
   */
  public nombreProductoDatos!: Catalogo[];

  /**
   * Catálogo de subproductos disponibles.
   */
  public subProductoDatos!: Catalogo[];

  /**
   * Catálogo de representaciones federales disponibles.
   */
  public representacionDatos!: Catalogo[];

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Estado actual de la solicitud 140103.
   */
  public solicitudState!: Solicitud140103State;

  /**
   * Subject utilizado para cancelar suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta IO.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el formulario ha sido enviado.
   */
  submitted = false;

  /**
   * Suscripción utilizada para gestionar y limpiar las suscripciones a observables dentro del componente.
   * Se inicializa como una nueva instancia de Subscription y se utiliza para agregar todas las suscripciones
   * que deben ser canceladas cuando el componente se destruye.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Identificador del trámite utilizado para cargar catálogos y realizar operaciones específicas del trámite 140103.
   */
  tramiteId = '140103';

  /**
   * Configuración de las columnas para la tabla dinámica de cupos.
   * Cada objeto define el encabezado, la clave de acceso y el orden de la columna.
   *
   * - `encabezado`: Título de la columna que se muestra en la tabla.
   * - `clave`: Función que recibe un elemento de tipo `Cupos` y retorna el valor a mostrar en la columna.
   * - `orden`: Posición de la columna en la tabla.
   */
  configuracionTabla: ConfiguracionColumna<CuposDisponiblesBuscarResponse>[] = [
    {
      encabezado: 'Cupo',
      clave: (item: CuposDisponiblesBuscarResponse) => item.idCupo,
      orden: 1,
    },
    {
      encabezado: 'Nombre de Producto',
      clave: (item: CuposDisponiblesBuscarResponse) => item.nombreProducto,
      orden: 2,
    },
    {
      encabezado: 'Nombre del Subproducto',
      clave: (item: CuposDisponiblesBuscarResponse) =>
        item.nombreSubproducto ?? undefined,
      orden: 3,
    },
    {
      encabezado: 'Mecanismo de Asignación',
      clave: (item: CuposDisponiblesBuscarResponse) => item.mecanismoAsignacion,
      orden: 4,
    },
    {
      encabezado: 'Tipo Cupo',
      clave: (item: CuposDisponiblesBuscarResponse) => item.tipoCupo,
      orden: 5,
    },
  ];

  /**
   * Constructor del componente.
   *
   * @param fb Servicio para la construcción de formularios reactivos.
   * @param solicitud140103Store Store para el manejo del estado del trámite 140103.
   * @param tramite140103Query Query para obtener el estado del store de trámite 140103.
   * @param consultaioQuery Query para obtener el estado del store de consulta IO.
   * @param catalogoService Servicio para la obtención de catálogos.
   * @param regimenService Servicio para la obtención de regímenes.
   * @param serviciosService Servicio para operaciones relacionadas con los servicios del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private solicitud140103Store: Solicitud140103Store,
    private solicitud140103Query: Solicitud140103Query,
    private consultaioQuery: ConsultaioQuery,
    private catalogoService: CatalogoServices,
    private serviciosService: ServiciosService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();

          this.consultaState = seccionState;
          if (this.consultaState.update) {
            this.solicitud140103Store.update((state) => ({
              ...state,
              cancelacion: [...state.cancelacion, NUEVO_CUPOS],
            }));
          }
        })
      )
      .subscribe();
  }

  /**
   * @method ngOnInit
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * Inicializa el formulario reactivo mediante `inicializarFormulario()` y configura
   * su estado inicial llamando a `inicializarEstadoFormulario()`.
   */
  ngOnInit(): void {
    this.inicializarCatalogo(this.tramiteId);
    this.inicializarFormulario();
    this.inicializarEstadoFormulario();
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    }
  }

  /**
   * Inicializa los catálogos del componente a partir del archivo JSON importado.
   * Asigna los valores de cada catálogo a las propiedades correspondientes.
   * Puede ser llamado para recargar los catálogos si el JSON cambia dinámicamente.
   */
  inicializarCatalogo(tramite: string): void {
    this.subscription.add(
      this.catalogoService
        .regimenesCatalogo(tramite)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.regimenDatos = DATOS;
          }
        })
    );
    this.subscription.add(
      this.catalogoService
        .tipoMecanismoAsignacionCatalogo(tramite)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];
          if (response) {
            this.mecanismoDatos = DATOS;
          }
        })
    );
    this.subscription.add(
      this.catalogoService
        .tratadosAcuerdoCatalogo(tramite, 'TITRAC.TA')
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];
          if (response) {
            this.tratadoDatos = DATOS;
          }
        })
    );
    this.subscription.add(
      this.catalogoService
        .nombreProductoCatalogo(tramite)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];
          if (response) {
            this.nombreProductoDatos = DATOS;
          }
        })
    );
    this.subscription.add(
      this.catalogoService
        .nombreSubproductoCatalogo(tramite)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];
          if (response) {
            this.subProductoDatos = DATOS;
          }
        })
    );
    this.subscription.add(
      this.catalogoService
        .catalogoRepresentacionFederal(tramite)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];
          if (response) {
            this.representacionDatos = DATOS;
          }
        })
    );
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.cancelacionForm && this.esFormularioSoloLectura) {
      this.cancelacionForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.cancelacionForm.enable();
    }
  }

  /**
   * Inicializa el formulario reactivo para la cancelación de certificados.
   * Configura los controles del formulario con sus validaciones y realiza la suscripción
   * al estado de la solicitud para actualizar los valores del formulario en base al store.
   *
   * - Crea el formulario con los campos requeridos y sus validaciones.
   * - Se suscribe al observable del estado de la solicitud para mantener sincronizados los valores.
   * - Realiza un patchValue para establecer los valores actuales del store en el formulario.
   */
  private inicializarFormulario(): void {
    this.cancelacionForm = this.fb.group({
      regimen: ['', Validators.required],
      mecanismo: ['', Validators.required],
      tratado: [''],
      producto: [''],
      subproducto: [''],
      representacion: [''],
    });
    this.detalleForm = this.fb.group({
      regimen: [''],
      descripcion: [''],
      clasificacion: [''],
      unidad: [''],
      mecanismo: [''],
      tratado: [''],
      fracciones: [''],
      paises: [''],
      observaciones: [''],
      fundamentos: [''],
      inicio: [''],
      fecha: [''],
    });
    this.oficioForm = this.fb.group({
      sumaAprobada: [''],
      montoDisponible: [''],
      sumaExpedida: [''],
      denominacionExposicion: [''],
    });
    this.suscribirseAlEstadoDeSolicitud();
  }

  /**
   * Se suscribe al observable del estado de la solicitud 140103 para mantener sincronizada
   * la propiedad `solicitudState` con el estado actual del store.
   *
   * Utiliza el operador `takeUntil` para cancelar la suscripción automáticamente cuando
   * el componente se destruye, evitando fugas de memoria.
   */
  suscribirseAlEstadoDeSolicitud(): void {
    this.solicitud140103Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud140103State;
        })
      )
      .subscribe();
  }

  /**
   * Maneja el evento de clic en una fila de la tabla de cupos disponibles.
   *
   * @param event - El objeto CuposDisponiblesBuscarResponse correspondiente a la fila seleccionada.
   *
   * Al seleccionar una fila, se actualiza la propiedad selectedCuposDisponibles y,
   * si existe una selección válida, se oculta la sección de certificados a cancelar.
   */
  filaClicCuposDisponibles(event: CuposDisponiblesBuscarResponse): void {
    this.selectedCuposDisponibles = event;
    if (this.selectedCuposDisponibles) {
      this.mostrarCertificadosCancelar = true;
      this.obtenerCertificadosDisponiblesDatos();
    }
  }

  /**
   * Busca los cupos disponibles según los valores seleccionados en el formulario.
   *
   * Este método valida que los campos requeridos (régimen y mecanismo) estén completos.
   * Si no lo están, emite un evento indicando que la búsqueda es inválida.
   * Si los campos requeridos están completos, construye el payload y llama al servicio
   * para obtener los cupos disponibles, actualizando la propiedad `CuposDisponiblesDatos`
   * con la respuesta. También emite un evento indicando que la búsqueda fue enviada y válida.
   *
   * @returns {void}
   */
  buscarCupoDisponible(): void {
    const REGIMEN_CONTROL = this.cancelacionForm.get('regimen');
    const MECANISMO_CONTROL = this.cancelacionForm.get('mecanismo');
    if (!REGIMEN_CONTROL?.value || !MECANISMO_CONTROL?.value) {
      return;
    }
    if (REGIMEN_CONTROL?.value && MECANISMO_CONTROL?.value) {
      const PAYLOAD = {
        rfc_solicitante: 'AFC000526BJ2',
        cupo_disponible: {
          nombreProducto: this.cancelacionForm.get('producto')?.value,
          nombreSubproducto: this.cancelacionForm.get('subproducto')?.value,
          mecanismoAsignacion: MECANISMO_CONTROL?.value,
          claveRegimen: REGIMEN_CONTROL.value,
          idTratadoAcuerdo: this.cancelacionForm.get('tratado')?.value,
          claveRepresentacionFederal:
            this.cancelacionForm.get('representacion')?.value,
        },
      };
      this.serviciosService
        .obtenerCuposDisponibles(this.tramiteId, PAYLOAD)
        .pipe(
          map(
            (data: BaseResponse<CuposDisponiblesBuscarResponse[]>) =>
              data.datos ?? []
          )
        )
        .subscribe({
          next: (response: CuposDisponiblesBuscarResponse[]) => {
            this.CuposDisponiblesDatos = response;
          },
          error: (err) => {
            console.error('Error al obtener cupos disponibles:', err);
          },
        });
    }
  }

  obtenerCertificadosDisponiblesDatos(): void {
    const REGIMEN_CONTROL = this.cancelacionForm.get('regimen');
    const MECANISMO_CONTROL = this.cancelacionForm.get('mecanismo');
    if (!REGIMEN_CONTROL?.value || !MECANISMO_CONTROL?.value) {
      return;
    }
    if (REGIMEN_CONTROL?.value && MECANISMO_CONTROL?.value) {
      const PAYLOAD = {
        rfc_solicitante: 'AFC000526BJ2',
        cupo_disponible: {
          nombreProducto: this.cancelacionForm.get('producto')?.value,
          nombreSubproducto: this.cancelacionForm.get('subproducto')?.value,
          mecanismoAsignacion: MECANISMO_CONTROL?.value,
          claveRegimen: REGIMEN_CONTROL.value,
          idTratadoAcuerdo: this.cancelacionForm.get('tratado')?.value,
          claveRepresentacionFederal:
            this.cancelacionForm.get('representacion')?.value,
        },
      };
      this.serviciosService
        .obtenerCuposDisponibles(this.tramiteId, PAYLOAD)
        .pipe(
          map(
            (data: BaseResponse<CuposDisponiblesBuscarResponse[]>) =>
              data.datos ?? []
          )
        )
        .subscribe({
          next: (response: CuposDisponiblesBuscarResponse[]) => {
            this.CuposDisponiblesDatos = response;
          },
          error: (err) => {
            console.error('Error al obtener cupos disponibles:', err);
          },
        });
    }
  }

  /**
   * Verifica si el formulario es válido para proceder con la operación.
   *
   * @returns {boolean} Retorna `true` si existen cupos disponibles, de lo contrario `false`.
   *
   * @memberof CancelacionDeCertificateComponent
   */
  public isFormValido(): boolean {
    if (!this.CuposDisponiblesDatos.length) {
      return false;
    }
    return true;
  }

  /**
   * @method setValoresStore
   * Asigna el valor de un campo del formulario al store correspondiente invocando un método específico.
   *
   * @param {FormGroup} form - El formulario reactivo que contiene los valores a establecer.
   * @param {string} campo - El nombre del campo dentro del formulario del cual se obtendrá el valor.
   * @param {keyof Solicitud140103Store} metodoNombre - El nombre del método del store que se invocará para actualizar el estado.
   *
   * Se obtiene el valor del campo especificado del formulario y se llama dinámicamente
   * al método correspondiente del `Solicitud140103Store` pasándole dicho valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud140103Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud140103Store[metodoNombre] as (value: unknown) => void)(
      VALOR
    );
  }

  /**
   * Maneja la selección de filas en la tabla de cupos disponibles.
   *
   * Este método se invoca cuando el usuario selecciona filas en la tabla.
   * Si hay exactamente una fila seleccionada, se puede utilizar la información
   * de esa fila para mostrar detalles adicionales o realizar acciones específicas.
   *
   * @param {CuposDisponiblesBuscarResponse[]} filasSeleccionadas - Arreglo con las filas seleccionadas.
   */
  filaSeleccionadaCuposDisponibles(e: Event): void {
    // if (this.filasSeleccionadas.length === 1) {
    //   const FILA = this.filasSeleccionadas[0];
    // }
  }

  filaSeleccionadaCertificadosDisponibles(e: Event): void {
    // Solo establecer filaSeleccionada si hay exactamente una fila seleccionada
    // if (this.filasSeleccionadas.length === 1) {
    //   const FILA = filasSeleccionadas[0];
    // }
  }

  filaSeleccionadaCertificadosCancelar(
    filasSeleccionadas: CuposDisponiblesBuscarResponse[]
  ): void {
    // if (this.filasSeleccionadas.length === 1) {
    //   const FILA = filasSeleccionadas[0];
    // }
  }

  onSeleccionarCertificadosDisponibles(): void {
    if (!this.selectedCertificados) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'Seleccione un registro.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
  }

  onSeleccionarCertificadoEliminar(): void {
    if (!this.selectedCertificados) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'Seleccione un registro.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    } else {
      this.CertificadosCancelarDatos = this.CertificadosCancelarDatos.filter(
        (item) => item !== this.selectedCertificados
      );
      this.selectedCertificados = null;
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   *
   * Este método se utiliza para limpiar recursos, específicamente para completar
   * el `Subject` `destroyNotifier$`, el cual es usado en combinación con el operador `takeUntil`
   * para cancelar automáticamente las suscripciones a observables y evitar fugas de memoria.
   *
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.subscription.unsubscribe();
  }
}
