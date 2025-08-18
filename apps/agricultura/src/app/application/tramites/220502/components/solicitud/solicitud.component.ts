import {
  CargarDatosIniciales,
  CarrosDeFerrocarril,
  DatosDeMercancias,
  HistorialInspeccionFisica,
  Solicitud,
} from '../../models/solicitud-pantallas.model';
import { CatalogosSelect, ConsultaioQuery } from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CarrosDeFerrocarrilComponent } from '../../shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteARealizarComponent } from '../../shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { HistorialInspeccionFisicaComponent } from '../../shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { SolicitudDatosComponent } from '../../shared/solicitud-datos/solicitud-datos.component';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';

/**
 * Componente para gestionar la solicitud de trámite.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HistorialInspeccionFisicaComponent,
    CarrosDeFerrocarrilComponent,
    SolicitudDatosComponent,
    ResponsableInspeccionEnPuntoComponent,
    DatosDelTramiteARealizarComponent,
    MedioTransporteComponent,
  ],
  providers: [SolicitudPantallasService],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
/** Componente para gestionar la solicitud de trámite */
export class SolicitudComponent implements OnInit, OnDestroy {
  /** Grupo de formularios para manejar formularios reactivos.*/
  form!: FormGroup;

  /** Encabezados y datos para mostrar información de mercancías. */
  hMercanciaTabla: string[] = [];

  /** Datos de mercancías para mostrar en la tabla. */
  dMercanciaBody: DatosDeMercancias[] = [];

  /** Encabezados y datos para mostrar información de solicitud */
  hSolicitud: string[] = [];

  /** Datos de solicitud para mostrar en la tabla */
  dSolicitud: Solicitud[] = [];

  /** Información del catálogo para la selección del medio de transporte. */
  mediodetransporte: CatalogosSelect = {} as CatalogosSelect;

  /** Matriz para contener datos para cada fila de la tabla */
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  /** Datos de vagones e historial de inspección física. */
  hCarroFerrocarril: string[] = [];

  /** Datos de vagones e historial de inspección física. */
  dCarrosDeFerrocarril: CarrosDeFerrocarril[] = [];

  /** Encabezados y datos para mostrar información de historial de inspección física. */
  hHistorialinspeccion: string[] = [];

  /** Datos de historial de inspección física para mostrar en la tabla. */
  dHistorialInspecciones: HistorialInspeccionFisica[] = [];

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /** Bandera para deshabilitar el formulario */
  formularioDeshabilitado: boolean = false;

  /**
   * Bandera que indica si la solicitud está en modo solo lectura.
   * @type {boolean}
   */
  isSolicitud: boolean = false;

  /**
   * Evento que emite el valor booleano para indicar si los certificados están autorizados.
   *
   * > **Nota:** El valor `false` pasado al constructor de `EventEmitter` indica que
   * la emisión será sincrónica (no establece un valor por defecto).
   *
   * @type {EventEmitter<boolean>}
   */
  @Output() certificadosAutorizValor = new EventEmitter<boolean>(false);

  /**
   * @constructor
   * Inyecta los servicios necesarios para la creación y gestión del formulario,
   * así como para la obtención y consulta de datos de la solicitud.
   *
   * @param fb - Servicio `FormBuilder` para crear y manejar formularios reactivos.
   * @param solicitudService - Servicio para obtener datos de la solicitud.
   * @param consultaioQuery - Servicio Query para consultar la información relacionada con la solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService /**Servicio para obtener datos de solicitud */,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          this.isSolicitud = seccionState.create;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /** Gancho de ciclo de vida para cargar datos iniciales cuando se inicializa el componente */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
      this.cargarDatosIniciales();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    this.cargarDatosIniciales();
    if (this.formularioDeshabilitado) {
      this.form.disable();
    } else if (!this.formularioDeshabilitado) {
      this.form.enable();
    }
  }

  /**
   * Método para crear el formulario de la solicitud.
   */
  crearFormulario(): void {
    this.form = this.fb.group(
      {}
    ); /** Inicializar un grupo de formulario vacío y obtener datos de formulario utilizando formGroupName de un componente secundario. */
  }

  /**
   * Método para buscar y cargar datos iniciales del servicio.
   */
  cargarDatosIniciales(): void {
    this.solicitudService.getData().subscribe({
      next: (data: CargarDatosIniciales) => {
        this.hHistorialinspeccion = data.hHistorialinspeccion;
        this.dHistorialInspecciones = data.dHistorialInspecciones;
        this.dCarrosDeFerrocarril = data.dCarrosDeFerrocarril;
        this.hCarroFerrocarril = data.hCarroFerrocarril;
        this.hSolicitud = data.hSolicitud;
        this.dSolicitud = data.dSolicitud;
        this.hMercanciaTabla = data.hMerchandise;
        this.dMercanciaBody = data.dMercancia;
        this.mediodetransporte = data.medioDeTransporte;
      },
    });
  }

  /**
   * Emite un evento indicando si los certificados han sido autorizados.
   *
   * @param evento - Valor booleano que indica el estado de autorización de los certificados.
   */
  certificadosAutorizEmitido(evento: boolean): void {
    this.certificadosAutorizValor.emit(evento);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe el componente de todos los observables.
   * @returns {void}
   * */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
