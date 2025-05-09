import { AgregarEnlaceOperativoComponent } from '../agregar-enlace-operativo/agregar-enlace-operativo.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ENLACE_OPERATIVO_CONFIGURACION } from '../../constants/solicitud.enum';
import { ElementRef } from '@angular/core';
import { EnlaceOperativo } from '../../models/solicitud.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Pedimento } from '@libs/shared/data-access-user/src';
import { RECIBIR_NOTIFICACIONES_CONFIGURACION } from '../../constants/solicitud.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { RecibirNotificaciones } from '../../models/solicitud.model';
import { RepresentanteLegal } from '../../models/solicitud.model';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente encargado de mostrar la lista de terceros relacionados
 * que pueden recibir notificaciones. Utiliza una tabla dinámica para
 * mostrar los datos obtenidos del servicio `SolicitudService`.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    HttpClientModule,
    AgregarEnlaceOperativoComponent,
    NotificacionesComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
/**
 * Componente encargado de mostrar la lista de terceros relacionados
 * que pueden recibir notificaciones. Utiliza una tabla dinámica para
 * mostrar los datos obtenidos del servicio `SolicitudService`.
 */
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /** Notificación que se mostrará al usuario */
  public nuevaNotificacion!: Notificacion;

  /** Elemento para eliminar de la tabla de pedimentos */
  elementoParaEliminar!: number;

  /** Formulario reactivo para gestionar la información de los terceros relacionados */
  tercerosRelacionadosForm!: FormGroup;

  /** Tipo de selección para la tabla (por defecto: UNDEFINED) */
  tipoSeleccionTabla = TablaSeleccion.UNDEFINED;

  /** Tipo de selección para la tabla de enlace operativo (por defecto: CHECKBOX) */
  enlaceOperativoTabla = TablaSeleccion.CHECKBOX;

  /** Lista de pedimentos */
  pedimentos: Array<Pedimento> = [];

  /** Datos seleccionados para el enlace operativo */
  seleccionEnlaceOperativoDatos: EnlaceOperativo[] = [] as EnlaceOperativo[];

  /** Configuración de las columnas de la tabla de enlace operativo */
  enlaceOperativoConfiguracionColumnas: ConfiguracionColumna<EnlaceOperativo>[] =
    ENLACE_OPERATIVO_CONFIGURACION;

  /** Lista de enlaces operativos */
  enlaceOperativosLista: EnlaceOperativo[] = [] as EnlaceOperativo[];

  /** Referencia al componente de enlace operativo para abrir el modal */
  @ViewChild('agregarEnlaceOperativo', { static: false })
  modificacionEnlaceOperativoElement!: ElementRef;

  /** Configuración de las columnas para la tabla de notificaciones */
  configuracionColumnas: ConfiguracionColumna<RecibirNotificaciones>[] =
    RECIBIR_NOTIFICACIONES_CONFIGURACION;

  /** Lista de notificaciones que el tercero puede recibir */
  orecibirNotificacionesLista: RecibirNotificaciones[] =
    [] as RecibirNotificaciones[];

  /** Subject que controla la destrucción de las suscripciones */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado de la solicitud actual */
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

  /**
   * Constructor del componente, inyecta el servicio `SolicitudService` y
   * realiza las cargas iniciales de datos.
   *
   * @param solicitudService Servicio que maneja las solicitudes
   * @param solicitud32605Store Almacena el estado de la solicitud
   * @param solicitud32605Query Consulta el estado de la solicitud
   */
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirEnlaceOperativoDatos();
    this.conseguirRecibirNotificaciones();
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.tercerosRelacionadosForm = this.fb.group({
      idPersonaSolicitud: [this.solicitud32605State.idPersonaSolicitud],
      rfcTercero: [this.solicitud32605State.rfcTercero, [Validators.required]],
      rfc: [{ value: this.solicitud32605State.rfc, disabled: true }],
      nombre: [{ value: this.solicitud32605State.nombre, disabled: true }],
      apellidoPaterno: [
        { value: this.solicitud32605State.apellidoPaterno, disabled: true },
      ],
      apellidoMaterno: [
        { value: this.solicitud32605State.apellidoMaterno, disabled: true },
      ],
      telefono: [this.solicitud32605State.telefono, [Validators.required]],
      correoElectronico: [
        this.solicitud32605State.correoElectronico,
        [Validators.required, Validators.email],
      ],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.tercerosRelacionadosForm.patchValue({
            idPersonaSolicitud: this.solicitud32605State.idPersonaSolicitud,
            rfcTercero: this.solicitud32605State.rfcTercero,
            rfc: this.solicitud32605State.rfc,
            nombre: this.solicitud32605State.nombre,
            apellidoPaterno: this.solicitud32605State.apellidoPaterno,
            apellidoMaterno: this.solicitud32605State.apellidoMaterno,
            telefono: this.solicitud32605State.telefono,
            correoElectronico: this.solicitud32605State.correoElectronico,
          });
          this.enlaceOperativosLista =
            this.solicitud32605State.enlaceOperativosLista;
        })
      )
      .subscribe();
  }

  /**
   * Método que obtiene la lista de notificaciones que puede recibir el tercero.
   */
  conseguirRecibirNotificaciones(): void {
    this.solicitudService
      .conseguirRecibirNotificaciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: RecibirNotificaciones[]) => {
        this.orecibirNotificacionesLista = respuesta;
      });
  }

  /**
   * Método que obtiene los datos de enlace operativo para ser mostrados en la tabla.
   */
  conseguirEnlaceOperativoDatos(): void {
    this.solicitudService
      .conseguirEnlaceOperativoDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: EnlaceOperativo[]) => {
        this.enlaceOperativosLista = respuesta;
      });
  }

  /**
   * Método que busca los datos de un tercero por su RFC.
   */
  buscarTerceroNacionalIDC(): void {
    if (this.tercerosRelacionadosForm.get('rfcTercero')?.value) {
      this.solicitudService
        .conseguirRepresentanteLegalDatos()
        .pipe(takeUntil(this.destroy$))
        .subscribe((respuesta: RepresentanteLegal) => {
          this.solicitud32605Store.actualizarRfc(respuesta.rfc);
          this.solicitud32605Store.actualizarNombre(respuesta.nombre);
          this.solicitud32605Store.actualizarApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud32605Store.actualizarApellidoMaterno(
            respuesta.apellidoMaterno
          );
          this.solicitud32605Store.actualizarTelefono(respuesta.telefono);
          this.solicitud32605Store.actualizarCorreoElectronico(
            respuesta.correoElectronico
          );
        });
    }
  }

  /** Métodos para actualizar los valores en el store */
  actualizarRfcTercero(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarRfcTercero(VALOR);
  }

  /** Métodos para actualizar los valores en el store */
  actualizarTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTelefono(VALOR);
  }

  /** Métodos para actualizar los valores en el store */
  actualizarCorreoElectronico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarCorreoElectronico(VALOR);
  }

  /**
   * Abre el modal para guardar datos del enlace operativo.
   */
  guardarDatosEnlaceOperativo(): void {
    if (this.modificacionEnlaceOperativoElement) {
      const MODAL_INSTANCE = new Modal(
        this.modificacionEnlaceOperativoElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Guarda la modificación del enlace operativo en el modal.
   */
  guardarModificacionEnlaceOperativo(): void {
    if (this.modificacionEnlaceOperativoElement) {
      const MODAL_INSTANCE = new Modal(
        this.modificacionEnlaceOperativoElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Selecciona un enlace operativo para su modificación.
   */
  seleccionEnlaceOperativo(evento: EnlaceOperativo[]): void {
    this.seleccionEnlaceOperativoDatos = evento;
  }

  /**
   * Cierra la notificación mostrada al usuario.
   */
  cerrarDialogoEnlaceOperativo(): void {
    if (this.seleccionEnlaceOperativoDatos.length > 0) {
      this.enlaceOperativosLista = this.enlaceOperativosLista.filter(
        (element) => element.rfc !== this.seleccionEnlaceOperativoDatos[0].rfc
      );
    }
  }

  /**
   * Método que agrega un enlace operativo y un pedimento vacío a la lista de enlace operativos.
   * Abre un modal de notificación si no se cumple la condición de registro.
   *
   * @param evento El objeto de tipo EnlaceOperativo que se va a agregar a la lista
   */
  agregarEnlaceOperativo(evento: EnlaceOperativo): void {
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };
    this.abrirModal(
      'Se debe registrar por lo menos un enlace operativo que no sea suplente.'
    );
    this.pedimentos.push(PEDIMENTO);
    this.enlaceOperativosLista = [...this.enlaceOperativosLista, evento];
    this.solicitud32605Store.actualizarEnlaceOperativosLista(
      this.enlaceOperativosLista
    );
  }

  /**
   * Método que abre un modal para mostrar una notificación con el mensaje proporcionado.
   *
   * @param mensaje El mensaje que se mostrará en la notificación
   * @param i Índice opcional para indicar qué elemento se eliminará (por defecto 0)
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Se encarga de emitir y completar el subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
