import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ENLACE_OPERATIVO_CONFIGURACION } from '../../constants/solicitud.enum';
import { EnlaceOperativo } from '../../models/solicitud.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
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
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { AgregarEnlaceOperativoComponent } from '../agregar-enlace-operativo/agregar-enlace-operativo.component';
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
    AgregarEnlaceOperativoComponent
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
  tercerosRelacionadosForm!: FormGroup;
  /** Tipo de selección para la tabla (por defecto: UNDEFINED) */
  tipoSeleccionTabla = TablaSeleccion.UNDEFINED;

  enlaceOperativoTabla = TablaSeleccion.CHECKBOX;

  enlaceOperativoConfiguracionColumnas: ConfiguracionColumna<EnlaceOperativo>[] =
    ENLACE_OPERATIVO_CONFIGURACION;

  enlaceOperativosLista: EnlaceOperativo[] = [] as EnlaceOperativo[];

  /**
   * Configuración de columnas que se mostrarán en la tabla.
   * Cada columna tiene un encabezado, una clave para obtener
   * el valor desde el modelo y un orden para su disposición.
   */
  configuracionColumnas: ConfiguracionColumna<RecibirNotificaciones>[] =
    RECIBIR_NOTIFICACIONES_CONFIGURACION;

  /** Lista de objetos `RecibirNotificaciones` que se mostrarán en la tabla */
  orecibirNotificacionesLista: RecibirNotificaciones[] =
    [] as RecibirNotificaciones[];

  /** Subject utilizado para gestionar la destrucción de suscripciones */
  private destroy$: Subject<void> = new Subject<void>();

  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

  /**
   * Constructor que inyecta el servicio `SolicitudService` y
   * realiza la carga inicial de los datos.
   * @param solicitudService Servicio para obtener datos de terceros
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
        })
      )
      .subscribe();
  }

  conseguirRecibirNotificaciones(): void {
    this.solicitudService
      .conseguirRecibirNotificaciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: RecibirNotificaciones[]) => {
        this.orecibirNotificacionesLista = respuesta;
      });
  }

  conseguirEnlaceOperativoDatos(): void {
    this.solicitudService
      .conseguirEnlaceOperativoDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: EnlaceOperativo[]) => {
        this.enlaceOperativosLista = respuesta;
      });
  }

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

  actualizarRfcTercero(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarRfcTercero(VALOR);
  }

  actualizarTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTelefono(VALOR);
  }

  actualizarCorreoElectronico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarCorreoElectronico(VALOR);
  }

  guardarDatosEnlaceOperativo(): void {}

  guardarModificacionEnlaceOperativo(): void {}

  cerrarDialogoEnlaceOperativo(): void {}

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Se encarga de emitir y completar el subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
