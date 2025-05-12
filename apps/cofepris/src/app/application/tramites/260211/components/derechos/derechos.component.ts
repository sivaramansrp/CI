import { Component, OnDestroy, OnInit } from '@angular/core'; // Import Angular core decorators for component lifecycle.
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular common directives.
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup for reactive forms.
import { Catalogo, TituloComponent } from '@ng-mf/data-access-user'; // Import Catalogo and TituloComponent from shared library.
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for reactive form handling.
import { CatalogoSelectComponent } from '@ng-mf/data-access-user'; // Import CatalogoSelectComponent for dropdown selection.
import { SanitarioService } from '../../services/sanitario.service'; // Import SanitarioService for API calls.
import { map, Subject, takeUntil } from 'rxjs'; // Import RxJS operators for reactive programming.
import { Solicitud260211State } from '../../../../estados/tramites/sanitario260211.store'; // Import state interface for the application.
import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store'; // Import store for managing application state.
import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query'; // Import query for fetching data from the store.


/**
 * compondoc
 * component
 * @name DerechosComponent
 * @description
 * Este componente es responsable de gestionar la funcionalidad relacionada con los derechos en el sistema.
 * Proporciona un formulario para capturar los datos de los derechos y carga una lista de datos relacionados.
 * 
 * @selector app-derechos
 * @standalone true
 * @imports
 * - CommonModule
 * - TituloComponent
 * - ReactiveFormsModule
 * - CatalogoSelectComponent
 * 
 * @templateUrl ./derechos.component.html
 * @styleUrl ./derechos.component.css
 */
@Component({
  selector: 'app-derechos', // Define the selector for the component.
  standalone: true, // Mark the component as standalone.
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent], // Import required modules and components.
  templateUrl: './derechos.component.html', // Path to the HTML template.
  styleUrls: ['./derechos.component.css'], // Path to the CSS styles.
})
export class DerechosComponent implements OnInit, OnDestroy {
  /**
   * compodoc
   *@ property {FormGroup} derechosForm
   * @description Formulario reactivo para capturar los datos de los derechos.
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
   * property {Solicitud260211State} solicitudState
   * description Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260211State; // Current state of the application.

  /**
   * compodoc
   * constructor
   * description Constructor del componente.
   * param {FormBuilder} fb - Constructor para formularios reactivos.
   * param {SanitarioService} service - Servicio para manejar datos sanitarios.
   * param {Sanitario260211Store} sanitario260211Store - Almacén de estado para la solicitud.
   * param {Permiso260211Query} permiso260211Query - Consulta para obtener datos relacionados con permisos.
   */
  constructor(
    private fb: FormBuilder, // Inject FormBuilder for creating reactive forms.
    private service: SanitarioService, // Inject SanitarioService for API calls.
    private sanitario260211Store: Sanitario260211Store, // Inject store for managing state.
    private permiso260211Query: Permiso260211Query // Inject query for fetching data from the store.
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
    this.permiso260211Query.selectSolicitud$ // Observable para obtener el estado actual de la aplicación.
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
  }

 /**
   * compodoc
   * method setValoresStore
   * description Actualiza el valor de un campo en el almacén de estado.
   * Este método se utiliza para sincronizar los valores del formulario con el estado global de la aplicación.
   * param {FormGroup} form - El formulario reactivo que contiene los datos.
   * param {string} campo - El nombre del campo que se desea actualizar.
   * param {keyof Sanitario260211Store} metodoNombre - El método del almacén que se invocará para actualizar el valor.
   * returns {void}
   */
 setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260211Store): void {
  const valor = form.get(campo)?.value; // Obtener el valor del campo especificado del formulario.
  (this.sanitario260211Store[metodoNombre] as (value: any) => void)(valor); 
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