import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent, catalogoResponse } from '@ng-mf/data-access-user';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
// eslint-disable-next-line sort-imports
import { ClaveModel, MercanciaModel, solicitudModel } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';
// eslint-disable-next-line sort-imports
import { DATOS_ALERT, MANIFIESTOS_ALERT } from '../../constantes/permiso-maquila.enum';
import { ClaveScianComponent } from '../clave-scian/clave-scian.component';
import { TablaSeleccion } from '@ng-mf/data-access-user';
// eslint-disable-next-line sort-imports
import { FormularioOperacionComercialComponent } from '../formulario-operacion-comercial/formulario-operacion-comercial.component';
import { MercanciasTableFormComponent } from '../mercancias-tabla-form/mercancias-table-form.component';
// eslint-disable-next-line sort-imports
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';
// eslint-disable-next-line sort-imports
import { Observable, Subject } from 'rxjs';
import { Tramite260212Store } from '../../estados/tramite260212.store';
// eslint-disable-next-line sort-imports
import { Tramite260212Query } from '../../estados/tramite260212.query';

/**
 * Componente DatosDeLaSolicitud
 * Este componente gestiona los datos y formularios de la solicitud en el flujo de trabajo.
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
    CatalogoSelectComponent

  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  /** Observable para el estado seleccionado */
  selectedEstado$: Observable<catalogoResponse | null> =
    this.tramite260212Query.selectedEstado$;
  /** Catálogo de estados cargado desde un archivo JSON */

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
  solicitudData: solicitudModel[] = [];

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
   * Variable que indica si se debe mostrar el formulario S.C.I.A.N.
   * Su valor inicial está establecido en false.
   */
  mostrarFormularioScian = false;

  /**
 * Variable que indica si se debe mostrar el formulario de mercancías.
 * Su valor inicial está establecido en false.
 */
  mostrarFormularioMercancias = false;

  /**
 * Variable que indica si se debe mostrar un formulario genérico.
 * Su valor inicial está establecido en false.
 */
  mostrarFormulario = false;

  /**
   * Arreglo que almacena los estados obtenidos del catálogo.
   * Este arreglo es utilizado en el componente para gestionar la información de estados.
   */
  estado: catalogoResponse[] = []

  /**
   * Arreglo que almacena los datos relacionados con las claves S.C.I.A.N.
   * Se utiliza para manejar la información de las claves en el componente.
   */
  claveScianDatas: ClaveModel[] = [];

  /**
   * Variable que representa la tabla de selección de elementos.
   * Es una configuración utilizada para mostrar datos seleccionables.
   */
  TablaSeleccion = TablaSeleccion;

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
    private tramite260212Query: Tramite260212Query
  // eslint-disable-next-line no-empty-function
  ) { }

  /**
 * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
 * - Inicializa el formulario de datos del establecimiento.
 * - Obtiene las solicitudes desde el servicio y las almacena en `solicitudData`.
 * - Obtiene las claves del catálogo y las almacena en `estado`.
 * - Actualiza el campo `estado` del formulario con el estado seleccionado desde el observable.
 */
  ngOnInit(): void {
    this.fomInitialize()
    this.solicitudService.getSolicitudes().subscribe((data) => {
      this.solicitudData = data;
    });

    this.solicitudService.getclave().subscribe((data) => {
      this.estado = data;
    })

    this.selectedEstado$.subscribe((selectedEstado) => {
      if (selectedEstado) {
        this.datosEstablecimientoForm.get('estado')?.setValue(selectedEstado);
      }
    });

  }

  /**
 * Configuración de la tabla para mostrar las claves S.C.I.A.N.
 * - Define las columnas y los datos que se muestran en la tabla.
 */
  configuracionTablaScian: ConfiguracionColumna<ClaveModel>[] = [
    { encabezado: 'Clave S.C.A.N.', clave: (item: ClaveModel) => item.clave, orden: 1 },
    { encabezado: 'Descripcíon del S.C.I.A.N', clave: (item: ClaveModel) => item.descripcíon, orden: 2 },
  ];

  /**
 * Inicializa el formulario `datosEstablecimientoForm`.
 * - Configura los campos requeridos y sus validaciones correspondientes.
 * - Incluye campos como RFC, razón social, correo, dirección, y contacto.
 */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  fomInitialize() {
    this.datosEstablecimientoForm = this.fb.group({
      rfcDelResponsableSanitario: [''],
      denominacionRazonSocial: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      codigoPostal: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      caller: [''],
      lada: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  /**
 * Alterna el estado de la variable `plegable`.
 * Cambia entre mostrar y ocultar una sección plegable.
 */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  mostrarPlegable() {
    this.plegable = !this.plegable;
  }

  /**
 * Muestra el formulario para S.C.I.A.N.
 * Establece la variable `mostrarFormularioScian` en true.
 */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  toggleScianFormulario() {
    this.mostrarFormularioScian = true
  }
  /**
   * Oculta el formulario para S.C.I.A.N.
   * Establece la variable `mostrarFormularioScian` en false.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  cerrarScianFormulario() {
    this.mostrarFormularioScian = false;
  }

  /**
 * Muestra el formulario para las mercancías.
 * Establece la variable `mostrarFormularioMercancias` en true.
 */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  openMercanciasForm() {
    this.mostrarFormularioMercancias = true;
  }

  /**
 * Oculta el formulario para las mercancías.
 * Establece la variable `mostrarFormularioMercancias` en false.
 */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  closeMercanciasForm() {
    this.mostrarFormularioMercancias = false;
  }

  /**
 * Configuración de la tabla para mostrar las mercancías.
 * - Define las columnas que representan diversas propiedades de las mercancías.
 * - Incluye detalles como clasificación, denominaciones, forma farmacéutica y estado físico.
 */
  mercanciasTabla: ConfiguracionColumna<MercanciaModel>[] = [
    { encabezado: 'Clasificación del producto', clave: (item: MercanciaModel) => item.clasificaciónProducto, orden: 1 },
    { encabezado: 'Especificar clasificación del producto', clave: (item: MercanciaModel) => item.especificarClasificación, orden: 2 },
    { encabezado: 'Denominación específica del producto', clave: (item: MercanciaModel) => item.denominaciónEspecífica, orden: 3 },
    { encabezado: 'Denominación distintiva', clave: (item: MercanciaModel) => item.denominaciónDistintiva, orden: 4 },
    { encabezado: 'Denominación común, nombre común o nombre científico', clave: (item: MercanciaModel) => item.denominaciónComún, orden: 5 },
    { encabezado: 'Forma farmacéutica', clave: (item: MercanciaModel) => item.formaFarmacéutica, orden: 6 },
    { encabezado: 'Estado físico', clave: (item: MercanciaModel) => item.estadoFsico, orden: 7 }
  ];

  /**
 * Configuración de la tabla para mostrar las solicitudes.
 * - Define las columnas con encabezados y claves para los datos relevantes de las solicitudes.
 * - Incluye detalles como fecha de creación, mercancía, cantidad y proveedor.
 */
  configuracionTablaSolicitud: ConfiguracionColumna<solicitudModel>[] = [
    { encabezado: 'Fecha Creación', clave: (item: solicitudModel) => item.fechaCreación, orden: 1 },
    { encabezado: 'Mercancía', clave: (item: solicitudModel) => item.mercancía, orden: 2 },
    { encabezado: 'Cantidad', clave: (item: solicitudModel) => item.cantidad, orden: 3 },
    { encabezado: 'Proveedor', clave: (item: solicitudModel) => item.proveedor, orden: 4 }
  ];

  /**
   * Obtiene el estado seleccionado del formulario y lo guarda en el store
   */
  getMunicipios(): void {
    const SELECTED_ESTADO = this.datosEstablecimientoForm.get('estado')?.value;
    this.tramite260212Store.setSelectedEstado(SELECTED_ESTADO);
  }

  /*
  * Método del ciclo de vida de Angular - destruye el componente
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
