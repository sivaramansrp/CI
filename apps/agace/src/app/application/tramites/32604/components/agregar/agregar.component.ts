import { Aduanas, Instalaciones } from '../../constants/agregar.model';
import { Catalogo, CatalogoSelectComponent,ConsultaioQuery,TablaDinamicaComponent,TablaSeleccion,TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud32604State, Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ENCABEZADO_TABLA_CONTENEDOR_MANIFIESTO } from '../../constants/empresas-comercializadoras.enum';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.scss',
})
export class AgregarComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la selección de aduana.
   */
  form!: FormGroup;

  /**
   * Lista de aduanas.
   */
  aduanaList: {
    catalogos: Aduanas[];
    labelNombre: string;
    primerOpcion: string;
  };

    /**
   * Sujeto para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

    /**
   * Referencia a la clase o enumeración `TablaSeleccion`.
   *
   * Esta propiedad se utiliza para acceder a las funcionalidades
   * o valores definidos en `TablaSeleccion` dentro del componente.
   */
  TablaSeleccion = TablaSeleccion;

    /**
   * Define los datos que se mostrarán en la tabla dinámica.
   * Inicialmente vacío, se poblará cuando se seleccione una aduana.
   */
  datosTabla: Instalaciones[] = [];

  /**
   * Indica si se ha seleccionado una aduana.
   * Se utiliza para controlar la visibilidad de la tabla.
   */
  aduanaSeleccionada: boolean = false;

  /**
   * Encabezado de la tabla para el manifiesto de contenedores.
   * 
   * Esta propiedad almacena la configuración de los encabezados que se mostrarán
   * en la tabla del manifiesto dentro del componente. Utiliza la constante
   * `ENCABEZADO_TABLA_CONTENEDOR_MANIFIESTO` para definir las columnas y sus
   * respectivos títulos.
   */
  public encabezadoDeTablaManifiesto = ENCABEZADO_TABLA_CONTENEDOR_MANIFIESTO;

  /**
   * Array to store selected data from the table
   */
  selectedTableData: Instalaciones[] = [];

    /**
     * Estado de la solicitud.
     */
    public seccionState!: Solicitud32604State;

  /**
   * Event emitter to send selected data to parent component
   */
  @Output() datosSeleccionados = new EventEmitter<Instalaciones[]>();

  constructor(
    public fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    this.aduanaList = {
      catalogos: [],
      labelNombre: 'Entidad federativa',
      primerOpcion: 'Seleccione un valor',
    };
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Suscribe al observable `selectSolicitud$` para actualizar el estado de la sección (`seccionState`)
   *   con los datos obtenidos, hasta que se emita la notificación de destrucción (`destroyNotifier$`).
   * - Inicializa el formulario llamando a `inicializeFormulario()`.
   * - Obtiene la lista de entidades llamando a `fetchEntidadList()`.
   */
  ngOnInit(): void {
    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = {
            ...this.seccionState,
            ...seccionState,
          };
        })
      )
      .subscribe();
      this.inicializeFormulario();
      this.fetchEntidadList();
  }
  
  /**
   * Método del ciclo de vida que se ejecuta cuando el componente se destruye.
   * Completa el sujeto destroyNotifier$ para cancelar todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario reactivo para el componente.
   * 
   * Crea un nuevo formulario utilizando FormBuilder y asigna el valor inicial del campo 'aduana'
   * a partir del estado actual de la sección (`seccionState.aduana`).
   * 
   * @returns {void} No retorna ningún valor.
   */
    inicializeFormulario(): void {
    this.form = this.fb.group({
      aduana: [this.seccionState.aduana]
    });
  }
  
  /**
   * Método para cargar la lista de aduanas desde el servicio.
   * 
   * Utiliza el servicio `empresasComercializadorasService` para obtener la lista de aduanas
   * y asigna el resultado a `aduanaList.catalogos`.
   */
  public fetchEntidadList(): void {
    this.empresasComercializadorasService
      .getEntidadList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.aduanaList.catalogos = respuesta.data;
      });
  }

    /**
   * Cargar datos de la tabla.
   *
   * Este método obtiene los datos de la tabla desde el servicio `datosTramiteService`
   * y los almacena en la propiedad `datosTabla`. Utiliza `takeUntil` para cancelar la suscripción
   * cuando el componente se destruye, evitando fugas de memoria.
   *
   * @example
   * // Llamar al método para cargar los datos de la tabla
   * this.loadDatosTablaData();
   */
  loadDatosTablaData(): void {
    this.empresasComercializadorasService
      .getDatosTableData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.datosTabla = data;
        this.aduanaSeleccionada = true;
      });
  }

  /**
   * Maneja el evento de cambio de selección de aduana.
   * Cuando se selecciona una aduana, carga los datos de la tabla.
   *
   * @param {Catalogo} selectedAduana - La aduana seleccionada
   */
  onAduanaSelectionChange(selectedAduana: Catalogo): void {
    if (selectedAduana) {
      // Una aduana fue seleccionada, cargar los datos de la tabla
      this.loadDatosTablaData();
    } else {
      // No hay selección válida, limpiar la tabla
      this.datosTabla = [];
      this.aduanaSeleccionada = false;
    }
  }

  /**
   * Handles table row selection events
   * @param selectedData - Array of selected rows from the table
   */
  onTableRowSelected(selectedData: Instalaciones[]): void {
    this.selectedTableData = selectedData;
  }

  /**
   * Handles the "Aceptar" button click
   * Emits selected data to parent component and closes modal
   */
  cerrarModal(): void {
    this.datosSeleccionados.emit(this.selectedTableData);
    this.selectedTableData = [];
  }

  /**
   * Handles the "Cancelar" button click
   * Resets selected data and closes modal without emitting data
   */
  cancelarModal(): void {
    this.selectedTableData = [];
  }

  /**
   * Resets the component state when modal is opened
   */
  resetModalState(): void {
    this.selectedTableData = [];
    this.aduanaSeleccionada = false;
    this.datosTabla = [];
    this.form.reset();
  }
}
