import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoResponse, CatalogoSelectComponent, ConsultaioQuery, TablaDinamicaComponent, TablePaginationComponent, TituloComponent } from '@ng-mf/data-access-user';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';

import { ClaveModel, MercanciaModel, SolicitudModel } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';

import { DATOS_ALERT, MANIFIESTOS_ALERT } from '../../constantes/permiso-maquila.enum';
import { ClaveScianComponent } from '../clave-scian/clave-scian.component';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { FormularioOperacionComercialComponent } from '../formulario-operacion-comercial/formulario-operacion-comercial.component';
import { MercanciasTableFormComponent } from '../mercancias-tabla-form/mercancias-table-form.component';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';

import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Tramite260212Store } from '../../estados/tramite260212.store';

import { Modal } from 'bootstrap';
import { Tramite260212Query } from '../../estados/tramite260212.query';

/**
 * Componente DatosDeLaSolicitud
 * Este componente gestiona los datos y formularios de la solicitud en el flujo de trabajo.
 */
/**
 * @var {boolean} esFormularioSoloLectura
 * @description
 * Indica si el formulario debe mostrarse en modo solo lectura.
 * Cuando es verdadero, los campos del formulario estarán deshabilitados y no podrán ser editados por el usuario.
 * Este valor se actualiza dinámicamente según el estado de la sección consultada.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    ClaveScianComponent,
    FormularioOperacionComercialComponent,
    MercanciasTableFormComponent,
    RepresentanteLegalComponent,
    CatalogoSelectComponent,
    TablePaginationComponent

  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * @desc Indica si el formulario debe mostrarse solo en modo de lectura.
   * @type {boolean}
   * @public
   * 
   * Cuando es verdadero, el usuario no puede editar los campos del formulario.
   */
  public esFormularioSoloLectura: boolean = false;

  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  /** Observable para el estado seleccionado */
  selectedEstado$: Observable<string> =
    this.tramite260212Query.selectedEstado$;
  /** Catálogo de estados cargado desde un archivo JSON */

  rfcDelResponsableSanitario$ = this.tramite260212Query.selectedRfcDelResponsableSanitario$;

  denominacionRazonSocial$ = this.tramite260212Query.selectedDenominacionRazonSocial$

  correoElectronico$ = this.tramite260212Query.selectedCorreoElectronico$
  municipio$ = this.tramite260212Query.selectedMunicipio$
  localidad$ = this.tramite260212Query.selectedLocalidad$
  colonia$ = this.tramite260212Query.selectedColonia$
  calle$ = this.tramite260212Query.selectedCalle$
  lada$ = this.tramite260212Query.selectedLada$
  telefono$ = this.tramite260212Query.SelectedTelefono$
  codigoPostal$ = this.tramite260212Query.SelectedCodigoPostal$

  /** Formulario principal de datos del establecimiento */
  datosEstablecimientoForm!: FormGroup;


  /** Constante que almacena los datos de alerta */
  DATOS_ALERT = DATOS_ALERT
  /** Constante que almacena los datos de manifiestos de alerta */
  MANIFIESTOS_ALERT = MANIFIESTOS_ALERT

  /**
 * Arreglo que almacena los datos de la solicitud.
 * Se utiliza para gestionar la información relacionada con las solicitudes en el componente.
 */
  solicitudData: SolicitudModel[] = [];

  /**
 * Arreglo que almacena los datos de las mercancías.
 * Se utiliza para manejar la información de las mercancías asociadas en el componente.
 */
  mercanicaData: MercanciaModel[] = [];

  /**
 * Variable que controla el estado plegable de una sección en el componente.
 * Se utiliza para mostrar u ocultar contenido de manera dinámica.
 */
  plegable = true;

  /**
 * Variable que indica si se debe mostrar un formulario genérico.
 * Su valor inicial está establecido en false.
 */
  mostrarFormulario = false;

  /**
   * Arreglo que almacena los estados obtenidos del catálogo.
   * Este arreglo es utilizado en el componente para gestionar la información de estados.
   */
  estado: CatalogoResponse[] = []

  /**
   * Arreglo que almacena los datos relacionados con las claves S.C.I.A.N.
   * Se utiliza para manejar la información de las claves en el componente.
   */
  claveScianDatas: ClaveModel[] = [];

  /**
   * Variable que representa la tabla de selección de elementos.
   * Es una configuración utilizada para mostrar datos seleccionables.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Referencia al elemento modal para agregar mercancías.
   */
  @ViewChild('modalSeleccionarEstablesmiento') modalElement!: ElementRef;

  @ViewChild('modalScianRef') modalScianRef!: ElementRef;

  private modalScianInstance: Modal | null = null;

  @ViewChild('modalMercanciasRef') modalMercanciasRef!: ElementRef;

  private modalMercanciasInstance: Modal | null = null;

  /**
   * Constructor de la clase DatosDeLaSolicitudComponent.
   * 
   * @param solicitudService - Servicio para manejar las solicitudes.
   * @param fb - FormBuilder para construir formularios reactivos.
   * @param tramite260212Store - Almacén para el trámite 260212.
   * @param tramite260212Query - Consulta para el trámite 260212.
   */
  constructor(private solicitudService: SolicitudService, private fb: FormBuilder,
    private tramite260212Store: Tramite260212Store,
    private tramite260212Query: Tramite260212Query,
    private consultaioQuery: ConsultaioQuery
  ) {

  }


  /**
 * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
 * - Inicializa el formulario de datos del establecimiento.
 * - Obtiene las solicitudes desde el servicio y las almacena en `solicitudData`.
 * - Obtiene las claves del catálogo y las almacena en `estado`.
 * - Actualiza el campo `estado` del formulario con el estado seleccionado desde el observable.
 */
  ngOnInit(): void {
    this.fomInitialize();
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Si está en modo solo lectura, deshabilita el formulario; si no, lo habilita y actualiza los valores.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      // Solo llamar a guardarDatosFormulario si el formulario ya está inicializado
      if (this.datosEstablecimientoForm) {
        this.guardarDatosFormulario();
      }
    } else {
      this.actualizarEstado();
    }
  }

  /**
   * Guarda los datos del formulario y actualiza su estado.
   * Si el formulario está en modo solo lectura, lo deshabilita; de lo contrario, lo habilita.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.actualizarEstado();
    // Solo intentar deshabilitar si el formulario ya está inicializado
    if (this.datosEstablecimientoForm) {
      if (this.esFormularioSoloLectura) {
        this.datosEstablecimientoForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.datosEstablecimientoForm.enable();
      }
    }
  }

  /**
   * @method actualizarEstado
   * @description
   * Actualiza los valores del formulario `datosEstablecimientoForm` con los datos provenientes de varios observables y servicios.
   * Obtiene la información de la solicitud y la clave del estado, y suscribe a diferentes observables para actualizar los campos correspondientes del formulario.
   * Utiliza el operador `takeUntil` para gestionar la destrucción de las suscripciones y evitar fugas de memoria.
   *
   * @returns {void}
   */
  actualizarEstado(): void {
    this.solicitudService.getSolicitudes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data): void => {
        this.solicitudData = data
      });

    this.solicitudService.getClave()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data): void => {
        this.estado = data
      });

    this.selectedEstado$.subscribe((selectedEstado) => {
      if (selectedEstado) {
        this.datosEstablecimientoForm.get('estado')?.setValue(selectedEstado);
      }
    });
    this.rfcDelResponsableSanitario$.pipe(takeUntil(this.destroy$)).subscribe((rfcDelResponsableSanitario) => {
      if (rfcDelResponsableSanitario) {
        this.datosEstablecimientoForm.get('rfcDelResponsableSanitario')?.setValue(rfcDelResponsableSanitario);
      }
    });
    this.denominacionRazonSocial$.pipe(takeUntil(this.destroy$)).subscribe((denominacionRazonSocial) => {
      if (denominacionRazonSocial) {
        this.datosEstablecimientoForm.get('denominacionRazonSocial')?.setValue(denominacionRazonSocial);
      }
    });
    this.correoElectronico$.pipe(takeUntil(this.destroy$)).subscribe((correoElectronico) => {
      if (correoElectronico) {
        this.datosEstablecimientoForm.get('correoElectronico')?.setValue(correoElectronico);
      }
    });
    this.municipio$.pipe(takeUntil(this.destroy$)).subscribe((municipio) => {
      if (municipio) {
        this.datosEstablecimientoForm.get('municipio')?.setValue(municipio);
      }
    });
    this.localidad$.pipe(takeUntil(this.destroy$)).subscribe((localidad) => {
      if (localidad) {
        this.datosEstablecimientoForm.get('localidad')?.setValue(localidad);
      }
    });
    this.colonia$.pipe(takeUntil(this.destroy$)).subscribe((colonia) => {
      if (colonia) {
        this.datosEstablecimientoForm.get('colonia')?.setValue(colonia);
      }
    });
    this.calle$.pipe(takeUntil(this.destroy$)).subscribe((calle) => {
      if (calle) {
        this.datosEstablecimientoForm.get('calle')?.setValue(calle);
      }
    });

    this.lada$.pipe(takeUntil(this.destroy$)).subscribe((lada) => {
      if (lada) {
        this.datosEstablecimientoForm.get('lada')?.setValue(lada);
      }
    });
    this.telefono$.pipe(takeUntil(this.destroy$)).subscribe((telefono) => {
      if (telefono) {
        this.datosEstablecimientoForm.get('telefono')?.setValue(telefono);
      }
    });
    this.codigoPostal$.pipe(takeUntil(this.destroy$)).subscribe((codigoPostal) => {
      if (codigoPostal) {
        this.datosEstablecimientoForm.get('codigoPostal')?.setValue(codigoPostal);
      }
    });
  }


  /**
 * Configuración de la tabla para mostrar las claves S.C.I.A.N.
 * - Define las columnas y los datos que se muestran en la tabla.
 */
  configuracionTablaScian: ConfiguracionColumna<ClaveModel>[] = [
    { encabezado: 'Clave S.C.A.N.', clave: (item: ClaveModel) => item.clave, orden: 1 },
    { encabezado: 'Descripcíon del S.C.I.A.N', clave: (item: ClaveModel) => item.descripcion, orden: 2 },
  ];

  /**
 * Inicializa el formulario `datosEstablecimientoForm`.
 * - Configura los campos requeridos y sus validaciones correspondientes.
 * - Incluye campos como RFC, razón social, correo, dirección, y contacto.
 */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  fomInitialize() {
    this.datosEstablecimientoForm = this.fb.group({
      rfcDelResponsableSanitario: [{value: '', disabled: true}],
      denominacionRazonSocial: [{value: '', disabled: true}, [Validators.required]],
      correoElectronico: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(30), Validators.email]],
      codigoPostal: [{value: '', disabled: true}, [Validators.required]],
      estado: [{value: '', disabled: false}, [Validators.required]],
      municipio: [{value: '', disabled: true}, [Validators.required]],
      localidad: [{value: '', disabled: true}, [Validators.required]],
      colonia: [{value: '', disabled: true}, [Validators.required]],
      calle: [{value: '', disabled: true}],
      lada: [{value: '', disabled: true}, [Validators.required]],
      telefono: [{value: '', disabled: true}, [Validators.required]],
      datosManifiestos: [false, [Validators.required]],
    });
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;

        })
      )
      .subscribe()
  }

  /**
   * Alterna el estado plegable de la sección de opciones de pre-llenado.
   * Cambia la variable `plegable` para mostrar u ocultar la sección.
   * @returns {void}
   */
  mostrarPlegable(): void {
    this.plegable = !this.plegable;
  }

  /**
   * Muestra el formulario para agregar una clave S.C.I.A.N.
   * Cambia la variable `mostrarFormularioScian` a true.
   * @returns {void}
   */
  toggleScianFormulario(): void {
    if (this.modalScianRef) {
      this.modalScianInstance = new Modal(this.modalScianRef.nativeElement);
      this.modalScianInstance.show();
    }
  }
  /**
   * Oculta el formulario de clave S.C.I.A.N.
   * Cambia la variable `mostrarFormularioScian` a false.
   * @returns {void}
   */
  cerrarScianFormulario(): void {
    if (this.modalScianInstance) {
      this.modalScianInstance.hide();
    }
  }

  agregarScian(form: {clave: string, descripcion: string}): void {
    if (form) {
      this.claveScianDatas.push(form);
    }
  }

  /**
   * Muestra el formulario para agregar mercancías.
   * @returns {void}
   */
  openMercanciasForm(): void {
    if (this.modalMercanciasRef) {
      this.modalMercanciasInstance = new Modal(this.modalMercanciasRef.nativeElement);
      this.modalMercanciasInstance.show();
    }
  }

  /**
   * Oculta el formulario de mercancías.
   * @returns {void}
   */
  closeMercanciasForm(): void {
    if (this.modalMercanciasInstance) {
      this.modalMercanciasInstance.hide();
    }
  }

  /**
 * Configuración de la tabla para mostrar las mercancías.
 * - Define las columnas que representan diversas propiedades de las mercancías.
 * - Incluye detalles como clasificación, denominaciones, forma farmacéutica y estado físico.
 */
  mercanciasTabla: ConfiguracionColumna<MercanciaModel>[] = [
    { encabezado: 'Clasificación del producto', clave: (item: MercanciaModel) => item.clasificacionProducto, orden: 1 },
    { encabezado: 'Especificar clasificación del producto', clave: (item: MercanciaModel) => item.especificarClasificacion, orden: 2 },
    { encabezado: 'Denominación específica del producto', clave: (item: MercanciaModel) => item.denominacionEspecifica, orden: 3 },
    { encabezado: 'Denominación distintiva', clave: (item: MercanciaModel) => item.denominacionDistintiva, orden: 4 },
    { encabezado: 'Denominación común, nombre común o nombre científico', clave: (item: MercanciaModel) => item.denominacionComun, orden: 5 },
    { encabezado: 'Forma farmacéutica', clave: (item: MercanciaModel) => item.formaFarmaceutica, orden: 6 },
    { encabezado: 'Estado físico', clave: (item: MercanciaModel) => item.estadoFsico, orden: 7 },
    { encabezado: 'Fracción arancelaria', clave: (item: MercanciaModel) => item.fraccionArancelaria, orden: 8 },
    { encabezado: 'Descripción de la fracción arancelaria', clave: (item: MercanciaModel) => item.descripcionFraccion, orden: 9 },
    { encabezado: 'Cantidad UMT', clave: (item: MercanciaModel) => item.cantidadUMT, orden: 10 },
    { encabezado: 'UMT', clave: (item: MercanciaModel) => item.UMT, orden: 11 },
    { encabezado: 'Cantidad UMC', clave: (item: MercanciaModel) => item.cantidadUMC, orden: 12 },
    { encabezado: 'UMC', clave: (item: MercanciaModel) => item.UMC, orden: 13 },
    { encabezado: 'Presentación farmacéutica o tipo de envase', clave: (item: MercanciaModel) => item.tipoDeEnvase, orden: 14 },
    
  ];

  /**
 * Configuración de la tabla para mostrar las solicitudes.
 * - Define las columnas con encabezados y claves para los datos relevantes de las solicitudes.
 * - Incluye detalles como fecha de creación, mercancía, cantidad y proveedor.
 */
  configuracionTablaSolicitud: ConfiguracionColumna<SolicitudModel>[] = [
    { encabezado: 'Fecha Creación', clave: (item: SolicitudModel) => item.fechaCreacion, orden: 1 },
    { encabezado: 'Mercancía', clave: (item: SolicitudModel) => item.mercancía, orden: 2 },
    { encabezado: 'Cantidad', clave: (item: SolicitudModel) => item.cantidad, orden: 3 },
    { encabezado: 'Proveedor', clave: (item: SolicitudModel) => item.proveedor, orden: 4 }
  ];

  /**
   * Obtiene el estado seleccionado del formulario y lo guarda en el store
   */
  getEstado(): void {
    const SELECTED_ESTADO = this.datosEstablecimientoForm.get('estado')?.value;
    this.tramite260212Store.setSelectedEstado(SELECTED_ESTADO);
  }
  getMunicipios(): void {
    const SELECTED_MUNICIPIO = this.datosEstablecimientoForm.get('municipio')?.value;
    this.tramite260212Store.setSelectedEstado(SELECTED_MUNICIPIO);
  }
  /**
   * Obtiene el rfcDelResponsableSanitario seleccionado del formulario y lo guarda en el store
   */
  updateRfcDelResponsableSanitario(): void {
    const RFC = this.datosEstablecimientoForm.get('rfcDelResponsableSanitario')?.value;
    this.tramite260212Store.setRfcDelResponsableSanitario(RFC);
  }
  /**
    * Obtiene el denominacionRazonSocial seleccionado del formulario y lo guarda en el store
    */
  updateDenominacionRazonSocial(): void {
    const RFC = this.datosEstablecimientoForm.get('denominacionRazonSocial')?.value;
    this.tramite260212Store.setDenominacionRazonSocial(RFC);
  }
  /**
     * Obtiene el correoElectronico seleccionado del formulario y lo guarda en el store
     */
  updateCorreoElectronico(): void {
    const CORREO = this.datosEstablecimientoForm.get('correoElectronico')?.value;
    this.tramite260212Store.setCorreoElectronico(CORREO);
  }
  /**
     * Obtiene el municipio seleccionado del formulario y lo guarda en el store
     */
  updateMunicipio(): void {
    const MUNICIPIO = this.datosEstablecimientoForm.get('municipio')?.value;
    this.tramite260212Store.setMunicipio(MUNICIPIO);
  }
  /**
     * Obtiene el localidad seleccionado del formulario y lo guarda en el store
     */
  updateLocalidad(): void {
    const LOCALIDAD = this.datosEstablecimientoForm.get('localidad')?.value;
    this.tramite260212Store.setLocalidad(LOCALIDAD);
  }
  /**
     * Obtiene el colonia seleccionado del formulario y lo guarda en el store
     */
  updateColonia(): void {
    const COLONIA = this.datosEstablecimientoForm.get('colonia')?.value;
    this.tramite260212Store.setColonia(COLONIA);
  }

  /**
   * Actualiza el campo 'calle' en el store a partir del valor del formulario.
   * @returns {void}
   */
  updateCalle(): void {
    const CALLE = this.datosEstablecimientoForm.get('calle')?.value;
    this.tramite260212Store.setCalle(CALLE);
  }

  /**
   * Actualiza el campo 'lada' en el store a partir del valor del formulario.
   * @returns {void}
   */
  updateLada(): void {
    const LADA = this.datosEstablecimientoForm.get('lada')?.value;
    this.tramite260212Store.setLada(LADA);
  }

  /**
   * Actualiza el campo 'telefono' en el store a partir del valor del formulario.
   * @returns {void}
   */
  updateTelefono(): void {
    const TELEFONO = this.datosEstablecimientoForm.get('telefono')?.value;
    this.tramite260212Store.setTelefono(TELEFONO);
  }

  /**
   * Actualiza el campo 'codigoPostal' en el store a partir del valor del formulario.
   * @returns {void}
   */
  updateCodigoPostal(): void {
    const CODIGO_POSTAL = this.datosEstablecimientoForm.get('codigoPostal')?.value;
    this.tramite260212Store.setCodigoPostal(CODIGO_POSTAL);
  }
  /**
   * Opciones de publicación para la solicitud.
   */
  losDatos: unknown[] = [];

  /**
   * Obtiene las opciones de publicación de la solicitud.
   */
  obtenerOpcionesSolicitud(): void {
    this.solicitudService.getOpcionesPublicacion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data): void => {
        this.losDatos = data
      });
  }

  seleccionarEstablecimiento(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  aceptar(): void {
    const MODAL_INSTANCE = Modal.getInstance(this.modalElement.nativeElement);
    MODAL_INSTANCE?.hide();
    Object.keys(this.datosEstablecimientoForm.controls).forEach(controlName => {
          this.datosEstablecimientoForm.get(controlName)?.enable();
      });
  }

  agregarMercanciasTabla(event: {form: MercanciaModel}): void {
    if (event) {
      this.mercanicaData.push(event.form);
    }
  }

  /*
  * Método del ciclo de vida de Angular - destruye el componente
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
