import { Component, OnDestroy, OnInit } from '@angular/core'; // Import Angular core decorators for component lifecycle.
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular common directives.
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup for reactive forms.
import { Catalogo, ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user'; // Import Catalogo and TituloComponent from shared library.
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for reactive form handling.
import { CatalogoSelectComponent } from '@ng-mf/data-access-user'; // Import CatalogoSelectComponent for dropdown selection.
import { SanitarioService } from '../../services/sanitario.service'; // Import SanitarioService for API calls.
import { map, Subject, takeUntil } from 'rxjs'; // Import RxJS operators for reactive programming.
import { Solicitud260906State } from '../../../../estados/tramites/sanitario260906.store'; // Import state interface for the application.
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store'; // Import store for managing application state.
import { Permiso260906Query } from '../../../../estados/queries/permiso260906.query'; // Import query for fetching data from the store.
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TableData } from '@libs/shared/data-access-user/src';
import { DatosDeSolicitud, SolicitudDatos } from '../../models/solicitud-datos.model';

/**
 * compondoc
 * component
 * @name AsociadosComponent
 * @description
 * Este componente es responsable de gestionar la funcionalidad relacionada con los asociados en el sistema.
 * Proporciona un formulario para capturar los datos de los asociados y carga una lista de datos relacionados.
 * 
 * @selector app-asociados
 * @standalone true
 * @imports
 * - CommonModule
 * - TituloComponent
 * - ReactiveFormsModule
 * - CatalogoSelectComponent
 * 
 * @templateUrl ./asociados.component.html
 * @styleUrl ./asociados.component.css
 */
@Component({
  selector: 'app-asociados', // Define the selector for the component.
  standalone: true, // Mark the component as standalone.
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, TablaDinamicaComponent], // Import required modules and components.
  templateUrl: './asociados.component.html', // Path to the HTML template.
  styleUrls: ['./asociados.component.css'], // Path to the CSS styles.
})
export class AsociadosComponent implements OnInit, OnDestroy {
  noRequerido: boolean = false;

  /**
   * compodoc
   *@ property {FormGroup} asociadosForm
   * @description Formulario reactivo para capturar los datos de los asociados.
   */
  derechosForm!: FormGroup; // Reactive form instance for managing form controls.

  /**
   *compodoc
   * property {Subject<void>} destroyNotifier$
   * description Sujeto utilizado para notificar la destrucción del componente.
   * private
   */
  private destroyNotifier$: Subject<void> = new Subject(); // Subject para notificar la destrucción del componente..

  /**
   * compodoc
   * property {Subject<void>} destroyed$
   * description Sujeto utilizado para manejar la destrucción de observables.
   * private
   */
  private destroyed$ = new Subject<void>(); // Subject para manejar la limpieza de observables.

  /**
   * compodoc
   * property {Catalogo[]} derechosList
   * description Lista de datos relacionados con los derechos.
   */
  public derechosList!: Catalogo[]; // Array to store the list of rights-related data.

  /**
   * compodoc
   * property {Solicitud260906State} solicitudState
   * description Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260906State; // Current state of the application.

  /**
   * Configuración para la selección de filas en la tabla de solicitudes.
   * Actualmente está desactivada (sin selección definida).
   */
  solicitudSeleccionTabla = TablaSeleccion.UNDEFINED;

  
    /**
     * Datos de las solicitudes.
     * Inicialmente, es un arreglo vacío que se llenará con datos dinámicos.
     */
    solicitudDatos: SolicitudDatos[] = [];
  
    /**
     * Configuración de las columnas de la tabla de solicitudes.
     * Define los encabezados, claves y orden para mostrar los datos de solicitudes.
     */
    solicitudConfiguracionTabla: ConfiguracionColumna<SolicitudDatos>[] = [
      {
        /**
         * Columna para mostrar la fecha de creación de la solicitud.
         * Utiliza la propiedad 'fechaCreacion' del modelo 'SolicitudDatos'.
         */
        encabezado: 'Folio trámite',
        clave: (item: SolicitudDatos) => item.fechaCreacion,
        orden: 1,
      },
      {
        /**
         * Columna para mostrar la Tipo trámite asociada a la solicitud.
         * Utiliza la propiedad 'mercancia' del modelo 'SolicitudDatos'.
         */
        encabezado: 'Tipo trámite',
        clave: (item: SolicitudDatos) => item.mercancia,
        orden: 2,
      },
      {
        /**
         * Columna para mostrar la cantidad asociada a la solicitud.
         * Utiliza la propiedad 'cantidad' del modelo 'SolicitudDatos'.
         */
        encabezado: 'Estatus',
        clave: (item: SolicitudDatos) => item.cantidad,
        orden: 3,
      },
      {
        /**
         * Columna para mostrar el proveedor asociado a la solicitud.
         * Utiliza la propiedad 'proovedor' del modelo 'SolicitudDatos'.
         */
        encabezado: 'Fecha alta de registro',
        clave: (item: SolicitudDatos) => item.proovedor,
        orden: 4,
      },
    ];


  /**
   * compodoc
   * constructor
   * description Constructor del componente.
   * param {FormBuilder} fb - Constructor para formularios reactivos.
   * param {SanitarioService} service - Servicio para manejar datos sanitarios.
   * param {Sanitario260906Store} sanitario260906Store - Almacén de estado para la solicitud.
   * param {Permiso260906Query} permiso260906Query - Consulta para obtener datos relacionados con permisos.
   */
  constructor(
    private fb: FormBuilder, // Inject FormBuilder for creating reactive forms.
    private service: SanitarioService, // Inject SanitarioService for API calls.
    private sanitario260906Store: Sanitario260906Store, // Inject store for managing state.
    private permiso260906Query: Permiso260906Query // Inject query for fetching data from the store.
  ) {}

  /**
   * compodoc
   * method ngOnInit
   * description Método de inicialización del componente.
   * Se suscribe al estado de la solicitud, configura el formulario reactivo y carga los datos iniciales.
   * returns {void}
   */
  ngOnInit(): void {
    // Suscripción al estado de la solicitud
    this.permiso260906Query.selectSolicitud$ // Observable para obtener el estado actual de la aplicación.
      .pipe(
        takeUntil(this.destroyNotifier$), // Darse de baja automáticamente cuando el componente se destruya..
        map((seccionState) => {
          this.solicitudState = seccionState; // Asignar el estado obtenido a solicitudState..
        })
      )
      .subscribe(); // Suscribirse al observable..

    // Configuración del formulario reactivo
    this.derechosForm = this.fb.group({
      referencia: [this.solicitudState?.referencia], 
      cadenaDependencia: [this.solicitudState?.cadenaDependencia], 
      Llave: [this.solicitudState?.Llave], 
      banco: [this.solicitudState?.banco], 
      tipoFetch: [this.solicitudState?.tipoFetch], 
      importe: [this.solicitudState?.importe], 
    });

    // Carga de datos iniciales
    this.loadComboUnidadMedida(); // Llamar al método para cargar los datos iniciales.
    this.obtenerDatosDeAplicacion();
  }

 /**
   * compodoc
   * method setValoresStore
   * description Actualiza el valor de un campo en el almacén de estado.
   * Este método se utiliza para sincronizar los valores del formulario con el estado global de la aplicación.
   * param {FormGroup} form - El formulario reactivo que contiene los datos.
   * param {string} campo - El nombre del campo que se desea actualizar.
   * param {keyof Sanitario260906Store} metodoNombre - El método del almacén que se invocará para actualizar el valor.
   * returns {void}
   */
 setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260906Store): void {
  const valor = form.get(campo)?.value; // Obtener el valor del campo especificado del formulario.
  (this.sanitario260906Store[metodoNombre] as (value: any) => void)(valor); 
}

  /**
   * compodoc
   * method loadComboUnidadMedida
   * description Carga la lista de datos relacionados con los derechos desde el servicio.
   * Realiza una solicitud al servicio para obtener los datos y los asigna a la lista de derechos.
   * returns {void}
   */
  loadComboUnidadMedida(): void {
    this.service.getDatos() // Llamar al método del servicio para obtener datos.
      .pipe(takeUntil(this.destroyed$)) // Darse de baja automáticamente cuando el componente sea destruido. .
      .subscribe((data): void => {
        this.derechosList = data as Catalogo[]; // Asignar los datos obtenidos a derechosList.
      });
  }

    /**
     * Obtiene los datos de la aplicación relacionados con la solicitud,
     * incluyendo encabezados, filas de la tabla y opciones de selección.
     * Actualiza las propiedades correspondientes con los valores obtenidos.
     */
    obtenerDatosDeAplicacion(): void {
      this.service
        .obtenerDatosDeSolicitud()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe({
          next: (respuesta: DatosDeSolicitud) => {
            this.solicitudDatos = respuesta.tablaFilaDatos;
          },
        });
    }

 /**
   * compodoc
   * method ngOnDestroy
   * description Método de limpieza al destruir el componente.
   * Libera los observables y notifica la destrucción del componente para evitar fugas de memoria.
   * returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next(); 
    this.destroyed$.complete(); 
    this.destroyNotifier$.next(); 
    this.destroyNotifier$.complete(); 
  }
}