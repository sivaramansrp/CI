import { Catalogo, CatalogoSelectComponent,TableBodyData, TableComponent, TablePaginationComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter,Input,OnDestroy, OnInit, Output } from '@angular/core';
import {ConsultaioQuery,ConsultaioState} from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, distinctUntilChanged,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelInmueble104Query } from '../../../../core/queries/tramite104.query';
import { DatosDelInmueble104Store } from '../../../../core/estados/tramites/tramite104.store';
import { MENSAJEDE_ALERTA } from '@libs/shared/data-access-user/src/core/enums/104/104.enum';
import { TableData } from '@libs/shared/data-access-user/src/core/models/104/model-104';
import destinatarioTableData from '@libs/shared/theme/assets/json/104/table-104.json'
import dropDown from '@libs/shared/theme/assets/json/104/selector-104.json'

@Component({
  selector: 'app-datos-del-inmueble',
  standalone: true,
  imports: [CommonModule, TituloComponent,
    TableComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,TablePaginationComponent],
  templateUrl: './datos-del-inmueble.component.html',
  styleUrl: './datos-del-inmueble.component.scss',
})
export class DatosDelInmuebleComponent implements OnInit, OnDestroy {

  /**
   * **Evento de cierre**  
   * 
   * Se emite cuando el usuario hace clic en cerrar.  
   * Puede utilizarse para manejar el cierre del componente desde el padre.
   */
  @Output() cerrarClicado = new EventEmitter();

    /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;


  /**
   * **Formulario de Fomento a la Exportación**  
   * 
   * Contiene los campos relacionados con la solicitud de fomento a la exportación.
   */
  fomentoExportacionForm!: FormGroup;

  /**
   * **Formulario de Dirección**  
   * 
   * Almacena los datos de dirección asociados a la solicitud.
   */
  formularioDireccion!: FormGroup;

  /**
   * Subject utilizado para limpiar las suscripciones al destruir el componente.
   * Se emite un valor y se completa en ngOnDestroy para evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * **Indicador de alerta**  
   * 
   * Determina si se debe mostrar una alerta en la interfaz de usuario.
   */
  mostrarAlerta: boolean = false;


  /**
   * **Mensaje de alerta**  
   * 
   * Contiene el texto del mensaje de alerta que se mostrará en la interfaz.
   */
  mensajeDeAlerta = '';

  /**
   * **Encabezados de la tabla de establecimientos**  
   * 
   * Almacena los nombres de las columnas de la tabla de establecimientos.
   */
  public establecimientoHeaderData: string[] = [];

  /**
   * **Datos del cuerpo de la tabla de establecimientos**  
   * 
   * Contiene la información detallada de los establecimientos.  
   * Se usa `TableBodyData[]` hasta definir su estructura específica.
   */
  public establecimientoBodyData: TableBodyData[] = [];

  /**
   * **Datos de la tabla de destinatarios**  
   * 
   * Contiene los encabezados y el cuerpo de la tabla de destinatarios.
   */
  destinatarioTableData: TableData = { encabezadoDeTabla: [], cuerpoTabla: [] };

  /**
   * **Catálogo de folios de autorización**
   * 
   * Almacena las opciones disponibles para el campo de folio de autorización en el formulario.
   */
  catalogoFolioAutorizacion: Catalogo[] = [];

  
  //  Controla la visibilidad del panel plegable.
  //  El valor predeterminado está establecido en verdadero (panel ampliado).
   
  public colapsable = true;


    /**
   * Número total de elementos en la tabla.
   */
  totalItems: number = 0;

  /**
   * Página actual de la paginación.
   */
  currentPage: number = 1;

  /**
   * Cantidad de elementos por página en la paginación.
   */
  itemsPerPage: number = 5;

    /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 


  /**
   * **Constructor del componente**  
   * 
   * - Inicializa el `FormBuilder` para la creación de formularios reactivos.
   */

  constructor(private fb: FormBuilder, private datosDelInmueble104Store: DatosDelInmueble104Store, private datosDelInmueble104Query: DatosDelInmueble104Query,private consultaioQuery: ConsultaioQuery,) {
    // Inicializa
  }

  /**
   * **Método de inicialización**  
   * 
   * Este método se ejecuta cuando el componente se inicializa. Realiza las siguientes acciones:
   * 1. Llama a `inicializarFormularioTratados` para configurar el formulario de tratados.
   * 2. Llama a `inicializarFormulario` para configurar el formulario principal.
   * 3. Asigna los datos de la tabla de destinatarios a `destinatarioTableData`.
   * 4. Llama a `getEstablecimiento` para obtener la información necesaria de los establecimientos.
   * 5. Se suscribe a los cambios del campo `tipoPrograma` del formulario `fomentoExportacionForm`.  
   *    Si el valor cambia a `'1'`, se muestra una alerta con el mensaje correspondiente.
   */
  ngOnInit(): void {
    this.inicializarFormularioTratados(); // Inicializa el formulario de tratados.
    this.inicializarFormulario(); // Inicializa el formulario principal.
    this.destinatarioTableData.encabezadoDeTabla = destinatarioTableData?.encabezadoDeTabla; // Asigna los encabezados de la tabla de destinatarios.
    this.destinatarioTableData.cuerpoTabla = destinatarioTableData?.cuerpoTabla; // Asigna los datos del cuerpo de la tabla de destinatarios.
    this.getEstableCimiento(); // Obtiene la información de los establecimientos.
    this.fomentoExportacionForm.get('tipoPrograma')?.valueChanges.subscribe(value => { // Se suscribe a los cambios en 'tipoPrograma' del formulario.
      if (value === '1') {
        this.mostrarAlerta = true; // Muestra la alerta si el valor es '1'.
        this.mensajeDeAlerta = MENSAJEDE_ALERTA.ADJUNTAR; // Asigna el mensaje de alerta correspondiente.
      }
      this.catalogoFolioAutorizacion=dropDown?.folioAutorizacion;
    });
    this.cargarDatosGuardados(); // Carga los datos guardados en el formulario.
    this.escucharCambiosFormulario();
    this.deshabilitarFormularios(); // Guarda los datos del formulario en el store.
  }


  /**
   * **Inicializa el formulario de Tratados**  
   * 
   * Este método configura el formulario `fomentoExportacionForm` utilizando `FormBuilder`. 
   * Se definen dos campos:
   * - `tipoPrograma`: Un campo obligatorio que representa el tipo de programa.
   * - `folioAutorizacion`: Un campo obligatorio que representa el número de folio de autorización.
   */
  inicializarFormularioTratados(): void {
    this.fomentoExportacionForm = this.fb.group({
      tipoPrograma: ['', Validators.required], // Campo obligatorio para el tipo de programa.
      folioAutorizacion: ['', Validators.required], // Campo obligatorio para el folio de autorización.
    });
  }

  /**
   * **Configuraciones de dropdown**  
   * 
   * Define un arreglo de configuraciones para los dropdowns. Cada objeto contiene 
   * un catálogo de opciones que se utilizará para llenar los dropdowns en el formulario.
   * - `tipoPrograma`: Opciones disponibles para el tipo de programa.
   * - `folioAutorizacion`: Opciones disponibles para el folio de autorización.
   */
  configuracionesDropdown = [
    { catalogos: dropDown?.tipoPrograma }, // Dropdown para el tipo de programa.
    { catalogos: dropDown?.folioAutorizacion }, // Dropdown para el folio de autorización.
  ];

  /**
   * **Obtiene los datos de establecimiento**  
   * 
   * Este método asigna los datos de los encabezados y cuerpos de tabla a las propiedades 
   * `establecimientoHeaderData` y `establecimientoBodyData`, respectivamente. 
   * Estos datos se usan para visualizar la tabla de destinatarios.
   */
  private getEstableCimiento(): void {
    this.establecimientoHeaderData = this.destinatarioTableData?.encabezadoDeTabla; // Asigna los encabezados de la tabla.
    this.establecimientoBodyData = this.destinatarioTableData?.cuerpoTabla; // Asigna el cuerpo de la tabla.
  }


  /**
   * **Cerrar el modal**  
   * 
   * Este método emite un evento para cerrar el modal y cambia el estado de la alerta 
   * a `false`, ocultando cualquier mensaje de alerta mostrado anteriormente.
   */
  cerrarModal(): void {
    this.cerrarClicado.emit(); // Emite el evento para cerrar el modal.
    this.mostrarAlerta = false; // Oculta la alerta.
  }

  /**
   * **Inicializar el formulario de dirección**  
   * 
   * Este método crea un formulario reactivo (`formularioDireccion`) con varios 
   * campos para capturar la dirección del usuario. Se definen validaciones para 
   * asegurar que los campos obligatorios sean completados correctamente.
   */
  private inicializarFormulario(): void {
    this.formularioDireccion = this.fb.group({
      calle: ['', [Validators.required, Validators.maxLength(100)]],
      numeroExterior: ['', [Validators.required, Validators.maxLength(10)]],
      numeroInterior: ['', [Validators.maxLength(10)]],
      pais: [{ value: 'MEXICO (ESTADOS UNIDOS MEXICANOS)', disabled: true }, Validators.required],
      entidadFederativa: ['', Validators.required],
      municipioDelegacion: ['', Validators.required],
      colonia: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }


  /**
   * **Configuraciones del formulario para los dropdowns**  
   * 
   * Esta variable contiene un array de objetos que representan los diferentes dropdowns 
   * que se utilizan en el formulario. Cada objeto tiene un campo `catalogos`, que se 
   * corresponde con los valores a mostrar en los dropdowns.
   * 
   * Se utiliza para inicializar los selectores del formulario con los datos provenientes 
   * de las variables `dropDown.pais`, `dropDown.entidadFederativa`, etc.
   */
  configuracionesFormularioDropdown = [
    { catalogos: dropDown?.pais }, // Dropdown para seleccionar el país.
    { catalogos: dropDown?.entidadFederativa }, // Dropdown para seleccionar la entidad federativa.
    { catalogos: dropDown?.municipioDelegacion }, // Dropdown para seleccionar el municipio o delegación.
    { catalogos: dropDown?.entidadFederativa }, // Repetido para entidad federativa, ¿es necesario?
    { catalogos: dropDown?.localidad } // Dropdown para seleccionar la localidad.
  ];


  /**
   * **Carga los datos guardados en el store y los aplica a los formularios**  
   * 
   * - Se suscribe a los valores almacenados en `fomentoExportacion$` y `direccion$` dentro del store.  
   * - Si existen datos en el estado, se actualizan los formularios sin disparar eventos (`emitEvent: false`).  
   * - La suscripción se gestiona con `takeUntil(this.destroy$)` para evitar fugas de memoria cuando el componente se destruye.
   */
  cargarDatosGuardados(): void {
    this.datosDelInmueble104Query.fomentoExportacion$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.fomentoExportacionForm.patchValue(data, { emitEvent: false });
        }
      });

    this.datosDelInmueble104Query.direccion$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.formularioDireccion.patchValue(data, { emitEvent: false });
        }
      });
  }

  /**
   * **Escucha cambios en los formularios y actualiza el store**  
   * 
   * - Se suscribe a `valueChanges` de ambos formularios (`fomentoExportacionForm` y `formularioDireccion`).  
   * - Utiliza `distinctUntilChanged()` para evitar actualizaciones innecesarias cuando los valores no cambian.  
   * - Al detectar cambios, actualiza los valores en el store.  
   * - `takeUntil(this.destroy$)` asegura que la suscripción se cancele cuando el componente se destruya.  
   */
  escucharCambiosFormulario(): void {
    this.fomentoExportacionForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((formData) => {
        this.datosDelInmueble104Store.setFomentoExportacion(formData);
      });

    this.formularioDireccion.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((formData) => {
        this.datosDelInmueble104Store.setDireccion(formData);
      });
  }

  /**
 * Muestra u oculta el panel plegable.
 * Cambia el estado de la propiedad `colapsable`.
 */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Actualiza la paginación de la tabla de establecimientos.
   * Corta los datos de la tabla según la página actual y el número de elementos por página.
   */
  updatePagination():void{
    const STARTINDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.establecimientoBodyData = this.establecimientoBodyData.slice(
      STARTINDEX,
      STARTINDEX + this.itemsPerPage
    );
  }

  /**
   * Método que se ejecuta cuando se cambia de página en la paginación.
   * @param {number} page - Número de la página seleccionada.
   */
  onPageChange(page: number):void {
    this.currentPage = page;
    this.updatePagination();
  }


  /**
   * Método que se ejecuta cuando cambia el número de elementos por página.
   * @param {number} itemsPerPage - Número de elementos a mostrar por página.
   */
  onItemsPerPageChange(itemsPerPage: number):void{
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * Habilita o deshabilita los formularios según el estado de solo lectura.
   * 
   * Si `consultaState.readonly` es verdadero, deshabilita ambos formularios para que no puedan ser editados.
   * Si es falso, los habilita para permitir la edición.
   */
  deshabilitarFormularios(): void {
    if (this.consultaState?.readonly) {
      // Deshabilita los formularios si el estado es solo lectura
      this.fomentoExportacionForm.disable();
      this.formularioDireccion.disable();
    } else {
      // Habilita los formularios si el estado permite edición
      this.fomentoExportacionForm.enable();
      this.formularioDireccion.enable();
    }
  }

  /**
   * **Limpia las suscripciones al destruir el componente**  
   * 
   * - `this.destroy$.next();` emite un valor para completar las suscripciones activas.  
   * - `this.destroy$.complete();` marca el `Subject` como completo, evitando nuevas emisiones.  
   * - Esto previene fugas de memoria al asegurarse de que las suscripciones se finalizan correctamente.  
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
