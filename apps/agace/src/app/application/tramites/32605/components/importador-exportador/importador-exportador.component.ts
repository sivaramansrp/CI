import { AgregarTransportistasComponent } from '../agregar-transportistas/agregar-transportistas.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
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
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
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
  selector: 'app-importador-exportador',
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
  templateUrl: './importador-exportador.component.html',
  styleUrl: './importador-exportador.component.scss',
})
export class ImportadorExportadorComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para el componente importador-exportador */
  importadorExportadorForm!: FormGroup;

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
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

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

  /** Referencia a la vista del modal de transportistas */
  @ViewChild('transportistas', { static: false })
  transportistaElement!: ElementRef;

  /**
   * Constructor del componente
   * @param fb FormBuilder para crear formularios reactivos
   * @param solicitudService Servicio para manejar la lógica de solicitudes
   * @param solicitud32605Store Store para manejar el estado de la solicitud
   * @param solicitud32605Query Consulta para obtener el estado de la solicitud
   */
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirOpcionDeRadio();
    this.conseguirTransportistasLista();
  }

  /**
   * Método llamado al inicializar el componente, configura el formulario con los valores del estado de solicitud
   */
  ngOnInit(): void {
    this.importadorExportadorForm = this.fb.group({
      '2042': [this.solicitud32605State[2042]],
      '2043': [this.solicitud32605State[2043]],
      '2044': [this.solicitud32605State[2044]],
      fechaInicioComercio: [
        { value: this.solicitud32605State.fechaInicioComercio, disabled: true },
        Validators.required,
      ],
      fechaPago: [this.solicitud32605State.fechaPago],
      monto: [this.solicitud32605State.monto, [Validators.maxLength(10)]],
      operacionesBancarias: [
        this.solicitud32605State.operacionesBancarias,
        [Validators.maxLength(25)],
      ],
      llavePago: [
        this.solicitud32605State.llavePago,
        [Validators.maxLength(25)],
      ],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.importadorExportadorForm.patchValue({
            '2042': this.solicitud32605State[2042],
            '2043': this.solicitud32605State[2043],
            '2044': this.solicitud32605State[2044],
            fechaInicioComercio: this.solicitud32605State.fechaInicioComercio,
            fechaPago: this.solicitud32605State.fechaPago,
            monto: this.solicitud32605State.monto,
            operacionesBancarias: this.solicitud32605State.operacionesBancarias,
            llavePago: this.solicitud32605State.llavePago,
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
    this.solicitud32605Store.actualizar2042(evento);
  }

  /**
   * Actualiza el valor de la propiedad 2043 en el store
   * @param evento Nuevo valor para la propiedad
   */
  actualizar2043(evento: string | number): void {
    this.solicitud32605Store.actualizar2043(evento);
  }

  /**
   * Actualiza el valor de la propiedad 2044 en el store
   * @param evento Nuevo valor para la propiedad
   */
  actualizar2044(evento: string | number): void {
    this.solicitud32605Store.actualizar2044(evento);
  }

  /**
   * Actualiza la fecha de inicio del comercio en el store
   * @param evento Fecha de inicio del comercio
   */
  actualizarFechaInicioComercio(evento: string): void {
    this.solicitud32605Store.actualizarFechaInicioComercio(evento);
  }

  /**
   * Actualiza la fecha de pago en el store
   * @param evento Fecha de pago
   */
  actualizarFechaPago(evento: string): void {
    this.solicitud32605Store.actualizarFechaPago(evento);
  }

  /**
   * Actualiza el monto de la solicitud en el store
   * @param evento Monto de la solicitud
   */
  actualizarMonto(evento: string): void {
    this.solicitud32605Store.actualizarMonto(evento);
  }

  /**
   * Actualiza las operaciones bancarias en el store
   * @param evento Operaciones bancarias
   */
  actualizarOperacionesBancarias(evento: string): void {
    this.solicitud32605Store.actualizarOperacionesBancarias(evento);
  }

  /**
   * Actualiza la llave de pago en el store
   * @param evento Llave de pago
   */
  actualizarLlavePago(evento: string): void {
    this.solicitud32605Store.actualizarLlavePago(evento);
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

  /**
   * Método llamado al destruir el componente, limpia las suscripciones
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
