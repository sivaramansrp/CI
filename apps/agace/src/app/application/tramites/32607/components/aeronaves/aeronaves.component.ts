import { AgregarTransportistasComponent } from '../agregar-transportistas/agregar-transportistas.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { ElementRef } from '@angular/core';
import { FECHA_DE_INICIO } from '../../constants/solicitud.enum';
import { FECHA_DE_PAGO } from '../../constants/solicitud.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32607Query } from '../../estados/solicitud32607.query';
import { Solicitud32607State } from '../../estados/solicitud32607.store';
import { Solicitud32607Store } from '../../estados/solicitud32607.store';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TRANSPORTISTAS_CONFIGURACION } from '../../constants/solicitud.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TransportistasTable } from '../../models/solicitud.model';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente principal para gestionar los datos de importador y exportador
 * en el formulario, incluyendo la integración con transportistas y validaciones
 * dinámicas.
 */
@Component({
  selector: 'app-aeronaves',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    InputFechaComponent,
    TituloComponent,
    TablaDinamicaComponent,
    AgregarTransportistasComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './aeronaves.component.html',
  styleUrl: './aeronaves.component.scss',
})
export class AeronavesComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para el componente aeronaves */
  aeronavesForm!: FormGroup;

  /** Sujeto que maneja la destrucción de suscripciones */
  private destroy$: Subject<void> = new Subject<void>();

  /** Opciones de radio para la selección de valores */
  sinoOpcion: InputRadio = {} as InputRadio;
  /**
   * Representa una opción de radio para el reconocimiento mutuo.
   * Se utiliza para manejar las opciones relacionadas con el mutuo en el formulario.
   */
  mutuo: InputRadio = {} as InputRadio;

  /**
   * Representa una opción de radio para la clasificación de la información.
   * Se utiliza para manejar las opciones relacionadas con la clasificación de la información en el formulario.
   */
  clasificacionInformacion: InputRadio = {} as InputRadio;

  /** Estado de la solicitud */
  solicitud32607State: Solicitud32607State = {} as Solicitud32607State;

  /** Fechas de inicio y pago de la solicitud */
  fechaDeFinDeVigencia: InputFecha = FECHA_DE_INICIO;
  /**
   * Fecha de pago asociada a la solicitud.
   * Se inicializa con el valor constante `FECHA_DE_PAGO` que contiene la fecha predeterminada de pago.
   */
  fechaDePago: InputFecha = FECHA_DE_PAGO;

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

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /** Referencia a la vista del modal de transportistas */
  @ViewChild('transportistas', { static: false })
  transportistaElement!: ElementRef;

  validaComercioExterior: number | string = 0;

  /**
   * Constructor del componente
   * @param fb FormBuilder para crear formularios reactivos
   * @param solicitudService Servicio para manejar la lógica de solicitudes
   * @param solicitud32607Store Store para manejar el estado de la solicitud
   * @param solicitud32607Query Consulta para obtener el estado de la solicitud
   */
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32607Store: Solicitud32607Store,
    public solicitud32607Query: Solicitud32607Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.conseguirOpcionDeRadio();
    this.conseguirTransportistasLista();
  }

  /**
   * Método llamado al inicializar el componente, configura el formulario con los valores del estado de solicitud
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.aeronavesForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.aeronavesForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario `aeronavesForm` con los valores del estado actual `solicitud32607State`.
   *
   * Este formulario recopila información relacionada con operaciones de importación y exportación,
   * como identificadores de campos (`2042`, `2043`, `2044`), fechas clave, montos y detalles bancarios.
   *
   * Detalles del formulario:
   * - Algunos campos como `fechaInicioComercio` se inician deshabilitados y con validaciones (`Validators.required`).
   * - Otros campos tienen validaciones específicas como `Validators.maxLength`.
   *
   * El método también se suscribe al observable `selectSolicitud$` para actualizar el formulario cuando
   * cambie el estado global de la solicitud.
   *
   * La suscripción se gestiona con `takeUntil` para evitar fugas de memoria.
   */
  inicializarFormulario(): void {
    this.aeronavesForm = this.fb.group({
      '2042': [this.solicitud32607State[2042]],
      '2043': [this.solicitud32607State[2043]],
      '2044': [this.solicitud32607State[2044]],
      '301': [this.solicitud32607State[301]],
      '302': [this.solicitud32607State[302]],
      '306': [this.solicitud32607State[306], [Validators.required]],
      '307': [this.solicitud32607State[307], [Validators.required]],
      '308': [this.solicitud32607State[308], [Validators.required]],
      numeroIMMEX: [
        this.solicitud32607State.numeroIMMEX,
        [Validators.required],
      ],
      modalidadIMMEX: [
        this.solicitud32607State.modalidadIMMEX,
        [Validators.required],
      ],
      rubroCertificacion: [this.solicitud32607State.rubroCertificacion],
      fechaFinVigenciaRubro: [this.solicitud32607State.fechaFinVigenciaRubro],
      numeroOficio: [this.solicitud32607State.numeroOficio],
      fechaInicioComercio: [
        { value: this.solicitud32607State.fechaInicioComercio, disabled: true },
        Validators.required,
      ],
      fechaPago: [this.solicitud32607State.fechaPago],
      monto: [this.solicitud32607State.monto, [Validators.maxLength(10)]],
      operacionesBancarias: [
        this.solicitud32607State.operacionesBancarias,
        [Validators.maxLength(25)],
      ],
      llavePago: [
        this.solicitud32607State.llavePago,
        [Validators.maxLength(25)],
      ],
    });

    this.solicitud32607Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32607State) => {
          this.solicitud32607State = respuesta;
          this.aeronavesForm.patchValue({
            '2042': this.solicitud32607State[2042],
            '2043': this.solicitud32607State[2043],
            '2044': this.solicitud32607State[2044],
            '301': this.solicitud32607State[301],
            '302': this.solicitud32607State[302],
            '306': this.solicitud32607State[306],
            '307': this.solicitud32607State[307],
            '308': this.solicitud32607State[308],
            numeroIMMEX: this.solicitud32607State.numeroIMMEX,
            modalidadIMMEX: this.solicitud32607State.modalidadIMMEX,
            rubroCertificacion: this.solicitud32607State.rubroCertificacion,
            fechaFinVigenciaRubro:
              this.solicitud32607State.fechaFinVigenciaRubro,
            numeroOficio: this.solicitud32607State.numeroOficio,
            fechaInicioComercio: this.solicitud32607State.fechaInicioComercio,
            fechaPago: this.solicitud32607State.fechaPago,
            monto: this.solicitud32607State.monto,
            operacionesBancarias: this.solicitud32607State.operacionesBancarias,
            llavePago: this.solicitud32607State.llavePago,
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene las opciones de radio desde el servicio de solicitud
   */
  conseguirOpcionDeRadio(): void {
    this.solicitudService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
          this.mutuo = respuesta.reconocimientoMutuo;
          this.clasificacionInformacion = respuesta.clasificacionInformacion;
        },
      });
  }

  /**
   * Obtiene la lista de transportistas desde el servicio de solicitud
   */
  conseguirTransportistasLista(): void {
    this.solicitudService
      .conseguirTransportistasLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TransportistasTable[]) => {
          this.transportistasLista = respuesta;
        },
      });
  }

  /**
   * Actualiza el valor de la propiedad 2042 en el store
   * @param evento Nuevo valor para la propiedad
   */
  actualizar2042(evento: string | number): void {
    this.solicitud32607Store.actualizar2042(evento);
    this.validaComercioExterior = evento;
  }

  /**
   * Actualiza el valor de la propiedad 2043 en el store
   * @param evento Nuevo valor para la propiedad
   */
  actualizar2043(evento: string | number): void {
    this.solicitud32607Store.actualizar2043(evento);
  }

  /**
   * Actualiza el valor de la propiedad 2044 en el store
   * @param evento Nuevo valor para la propiedad
   */
  actualizar2044(evento: string | number): void {
    this.solicitud32607Store.actualizar2044(evento);
  }

  /**
   * Actualiza la fecha de inicio del comercio en el store
   * @param evento Fecha de inicio del comercio
   */
  actualizarFechaInicioComercio(evento: string): void {
    this.solicitud32607Store.actualizarFechaInicioComercio(evento);
  }

  /**
   * Actualiza la fecha de pago en el store
   * @param evento Fecha de pago
   */
  actualizarFechaPago(evento: string): void {
    this.solicitud32607Store.actualizarFechaPago(evento);
  }

  /**
   * Actualiza el monto de la solicitud en el store
   * @param evento Monto de la solicitud
   */
  actualizarMonto(evento: string): void {
    this.solicitud32607Store.actualizarMonto(evento);
  }

  /**
   * Actualiza las operaciones bancarias en el store
   * @param evento Operaciones bancarias
   */
  actualizarOperacionesBancarias(evento: string): void {
    this.solicitud32607Store.actualizarOperacionesBancarias(evento);
  }

  /**
   * Actualiza la llave de pago en el store
   * @param evento Llave de pago
   */
  actualizarLlavePago(evento: string): void {
    this.solicitud32607Store.actualizarLlavePago(evento);
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
   * Agrega un transportista a la lista
   * @param evento Datos del transportista
   */
  transportistasDatos(evento: TransportistasTable): void {
    this.transportistasLista.push(evento);
  }

  actualizar301(evento: number | string): void {
    this.solicitud32607Store.actualizar301(evento);
  }

  actualizarNumeroIMMEX(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarNumeroIMMEX(VALOR);
  }

  actualizarModalidadIMMEX(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarModalidadIMMEX(VALOR);
  }

  actualizar302(evento: number | string): void {
    this.solicitud32607Store.actualizar302(evento);
  }

  actualizarRubroCertificacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarRubroCertificacion(VALOR);
  }

  actualizarFechaFinVigenciaRubro(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarFechaFinVigenciaRubro(VALOR);
  }

  actualizarNumeroOficio(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarNumeroOficio(VALOR);
  }

  actualizar306(evento: number | string): void {
    this.solicitud32607Store.actualizar306(evento);
  }

  actualizar307(evento: number | string): void {
    this.solicitud32607Store.actualizar307(evento);
  }

  actualizar308(evento: number | string): void {
    this.solicitud32607Store.actualizar308(evento);
  }

  /**
   * Método llamado al destruir el componente, limpia las suscripciones
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
