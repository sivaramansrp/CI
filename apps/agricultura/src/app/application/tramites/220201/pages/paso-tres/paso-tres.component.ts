import {
  CategoriaMensaje,
  DocumentoService,
  FirmaElectronicaComponent,
  Notificacion,
  NotificacionesComponent,
  TramiteFolioService,
  TramiteFolioStore,
  base64ToHex,
  encodeToISO88591Hex,
  formatearFechaConMoment
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, catchError, take, takeUntil, tap, throwError } from 'rxjs';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { CadenaOriginal220201Service } from '../../services/220201/cadenaoriginal220201.service';
import { CadenaOriginalRequest } from '@libs/shared/data-access-user/src/core/models/shared/cadena-original-request.model';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaService } from '@libs/shared/data-access-user/src/core/services/shared/firma-electronica/firma-electronica.service';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { Router } from '@angular/router';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';

import { RegistroSolicitudService } from '../../services/220201/registro-solicitud/registro-solicitud.service';




/**
 * @fileoverview Componente para mostrar el subtítulo y la sección de firma electrónica en el paso tres del asistente.
 * Este componente integra el formulario de firma electrónica para finalizar el trámite.
 * @module PasoTresComponent
 */

/**
 * Componente para mostrar el subtítulo del asistente y la sección de firma electrónica en el paso tres.
 * @component PasoTresComponent
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 * @styleUrls ./paso-tres.component.scss --220201
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss'],
  standalone: true,
  imports: [CommonModule, FirmaElectronicaComponent, NotificacionesComponent]
})
export class PasoTresComponent implements OnInit, OnDestroy {

  /**
   * URL del servicio o endpoint al que se realizará la solicitud relacionada con la firma.
   * Puede ser utilizado para enviar la firma generada o para obtener la cadena original.
   */
  url: string = '';

  /**
   * Cadena original generada para la firma electrónica.
   * Esta propiedad es opcional y puede no estar siempre definida.
   */
  cadenaOriginal?: string;

  /**
   * Folio del trámite que se está procesando.
   * Este folio es único para cada trámite y se utiliza para identificarlo en el sistema.
   */
  folio!: string;

  /**
   * Objeto que contiene los datos necesarios para generar la cadena original.
   * Este objeto es enviado al servicio de firma electrónica para obtener la cadena original.
   */
  datosCadena!: CadenaOriginalRequest;

  nuevaNotificacion!: Notificacion;

  private destroyNotifier$ = new Subject<void>();

  idSolicitud: number | null = null;

  isAcuseVisible: boolean = false;

  @Output() isAcuseVisibleChange = new EventEmitter<boolean>();

  datosFirmaReales!: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  };

  constructor(
    private router: Router,
    private tramiteFolioServices: TramiteFolioService,
    private tramiteStore: TramiteFolioStore,
    private firma: FirmaElectronicaService,
    private tramite220201Query: ZoosanitarioQuery,
    private tramite220201Store: ZoosanitarioStore,
    private documentoService: DocumentoService,
    private cadena: CadenaOriginal220201Service,
    private firmatramite: RegistroSolicitudService
  ) { }

  ngOnInit(): void {

    this.idSolicitud = this.tramite220201Query.getValue().idSolicitud;
    console.warn('ID SOLICITUD EN PASO TRES:', this.idSolicitud);
    this.obtenerCadenaOriginal();

    // Obtener la URL actual y separar los segmentos
    const URL_ACTUAL = this.router.url;
    const URL_SEPARADA = URL_ACTUAL.split('/');
    this.url = URL_SEPARADA.slice(0, 3).join('/');
    console.warn('URL EN PASO TRES:', this.url);
  }

  obtenerCadenaOriginal(): void {
    const PAYLOAD = {
      num_folio_tramite: '0105700100020252336300007',
      documento_requerido: []
    };
    this.cadena.obtenerCadenaOriginal('225591', PAYLOAD).pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (resp) => {
        if (resp.codigo !== '00') {
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: resp.error || 'Error al generar la cadena original.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
          return;
        }
        this.cadenaOriginal = typeof resp.datos === 'string' ? resp.datos : undefined;
      },
      error: (error) => {
        console.error('Error al iniciar trámite:', error);
        const MENSAJE = error?.error?.error || 'Error inesperado al iniciar trámite.';
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'error',
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        }
      }
    });
  }

  datosFirma(datos: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  }): void {
    this.datosFirmaReales = datos;
    this.obtieneFirma(datos.firma);
  }

  obtieneFirma(firma: string): void {
    if (!this.cadenaOriginal || !this.datosFirmaReales) {
      console.error('Faltan datos para completar la firma');
      return;
    }
    const CADENAHEX = encodeToISO88591Hex(this.cadenaOriginal);
    const FIRMAHEX = base64ToHex(firma);

    const PAYLOAD: FirmarRequest = {
      id_solicitud: Number(this.idSolicitud ?? 0),
      cadena_original: CADENAHEX,
      cert_serial_number: this.datosFirmaReales.certSerialNumber,
      clave_usuario: this.datosFirmaReales.rfc,
      fecha_firma: formatearFechaConMoment(new Date().toISOString()),
      clave_rol: 'Solicitante',
      sello: FIRMAHEX,
      fecha_fin_vigencia: formatearFechaConMoment(this.datosFirmaReales.fechaFin),
      documentos_requeridos: [],
    };

    if (this.idSolicitud !== null) {
      this.firmatramite.firmarsolicitud<string>('220201', this.idSolicitud, PAYLOAD).pipe(takeUntil(this.destroyNotifier$)).subscribe({
        next: (resp) => {
          if (resp.codigo !== '00') {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: '',
              mensaje: resp.error || 'Error al firmar la solicitud.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
            return;
          }
          if(resp.codigo === '00') {
            this.folio = resp.datos || '';
      

            //this.mostrarAcuse();
          }
        }
      });
  }
}

  mostrarAcuse(): void {
    this.isAcuseVisibleChange.emit(true);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}