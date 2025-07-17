import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfiguracionColumna, ConsultaioQuery, ConsultaioState, Notificacion, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FECHA_DE_PAGO, TRANSPORTISTAS_CONFIGURACION } from '../../constants/empresas-comercializadoras.enum';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Solicitud32604State, Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { map, Subject, takeUntil } from 'rxjs';
import { InputRadio, SolicitudRadioLista, TransportistasTable } from '../../models/empresas-comercializadoras.model';
import { Modal } from 'bootstrap';
import { AgregarTransportistasComponent } from '../agregar-transportistas/agregar-transportistas.component';

@Component({
  selector: 'app-comercializadora-importadora',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFechaComponent,
    TituloComponent,
    TablaDinamicaComponent,
    AgregarTransportistasComponent,
    InputRadioComponent
  ],
  templateUrl: './comercializadora-importadora.component.html',
  styleUrl: './comercializadora-importadora.component.scss',
})
export class ComercializadoraImportadoraComponent {

  /** Formulario reactivo para el componente modalidad */
  modalidadForm!: FormGroup;

  /**
   * Fecha de pago asociada a la solicitud.
   * Se inicializa con el valor constante `FECHA_DE_PAGO` que contiene la fecha predeterminada de pago.
   */
  fechaDePago: InputFecha = FECHA_DE_PAGO;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Notificador para destruir observables.
   */
  private destroy$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32604State;

  /** Configuración y lista de transportistas */
  transportistasTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas para la tabla de transportistas.
   * Se inicializa con la configuración predeterminada definida en `TRANSPORTISTAS_CONFIGURACION`.
   */
  transportistasConfiguracionColumnas: ConfiguracionColumna<TransportistasTable>[] =
    TRANSPORTISTAS_CONFIGURACION;

  /**
   * Lista de transportistas disponibles para ser seleccionados en el formulario.
   * Se llena dinámicamente con los datos de transportistas obtenidos desde el servicio.
   */
  transportistasLista: TransportistasTable[] = [];

  /** Referencia a la vista del modal de transportistas */
  @ViewChild('transportistas', { static: false })
  transportistaElement!: ElementRef;

  seleccionDatos: TransportistasTable[] = [] as TransportistasTable[];

  /** Modelo para la opción de tipo sí/no representado como radio button */
  sinoOpcion: InputRadio = {} as InputRadio;

  /**
   * Constructor del componente donde se inicializan servicios y se cargan catálogos necesarios.
   */
  constructor(
    public fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos de establecimientos, empleados, domicilios e instalaciones.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.conseguirOpcionDeRadio();
    this.inicializarFormulario();
    this.inicializarEstadoFormulario();
  }

  inicializarFormulario(): void {
    this.modalidadForm = this.fb.group({
      fechaPago: [this.solicitudState.fechaPago],
      monto: [this.solicitudState.monto, [Validators.maxLength(10)]],
      operacionesBancarias: [
        this.solicitudState.operacionesBancarias,
        [Validators.maxLength(25)],
      ],
      llavePago: [
        this.solicitudState.llavePago,
        [Validators.maxLength(25)],
      ],
      programaImmex: [this.solicitudState.programaImmex],
      importsRadio: [this.solicitudState.importsRadio],
    });
    this.transportistasLista = this.solicitudState.transportistasLista;
  }


  /**
  * @method inicializarEstadoFormulario
  * @description Inicializa el estado del formulario según el modo de solo lectura.
  * 
  * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
  * En caso contrario, habilita los controles del formulario
  * 
  * @returns {void}
  */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.modalidadForm?.disable();
    } else {
      this.modalidadForm?.enable();
    }
  }

  /**
   * Muestra el modal para agregar un nuevo transportista
   */
  agregarTransportistaModel(): void {
    if (this.transportistaElement) {
      const MODAL_INSTANCE = new Modal(this.transportistaElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Elimina los registros de número de empleados seleccionados.
   */
  eliminarDato(): void {
    if (this.seleccionDatos.length > 0) {
      this.seleccionDatos.forEach((elemento) => {
        const INDICE = this.transportistasLista.findIndex(
          (inv) => inv.transportistaRFCModifTrans === elemento.transportistaRFCModifTrans
        );
        if (INDICE !== -1) {
          this.transportistasLista.splice(INDICE, 1);
        }
      });
    }
  }

  /**
   * Método para obtener la opción de radio (sí/no) desde el servicio.
   * Se suscribe al observable y asigna el resultado a `sinoOpcion`.
   */
  conseguirOpcionDeRadio(): void {
    this.empresasComercializadorasService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   * Actualiza la fecha de pago en el store
   * @param evento Fecha de pago
   */
  actualizarFechaPago(evento: string): void {
    this.solicitud32604Store.actualizarFechaPago(evento);
  }

  /**
   * Actualiza el campo 'ProgramaImmex' en el estado global.
   *
   * @param {string | number} valor - Valor para el campo immex.
   */
  actualizarProgramaImmex(valor: string | number): void {
    this.solicitud32604Store.actualizarProgramaImmex(valor);
  }

  /**
   * Actualiza el campo 'ImportsRadio' en el estado global.
   *
   * @param {string | number} valor - Valor para el campo immex.
   */
  actualizarImportsRadio(valor: string | number): void {
    this.solicitud32604Store.actualizarImportsRadio(valor);
  }
  
  seccionTransportistasLista(evento: TransportistasTable): void {
    this.transportistasLista = [...this.transportistasLista, evento];
    this.solicitud32604Store.actualizarTransportistasLista(
      this.transportistasLista
    );
  }

  /**
   * Guarda la selección de número de empleados hecha por el usuario.
   */
  seleccionarDato(evento: TransportistasTable[]): void {
    this.seleccionDatos = evento;
  }

  /**
   * Limpia y completa la señal de destrucción para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
