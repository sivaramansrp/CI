import {
  CategoriaMensaje,
  FirmaElectronicaComponent,
  Notificacion,
  base64ToHex,
  encodeToISO88591Hex,
  formatFecha,
} from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject,catchError, map, of, takeUntil, tap } from 'rxjs';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { CadenaOriginal31910Service } from '../../services/cadenaOriginalt31910.service';
import { CadenaOriginalRequest } from '@libs/shared/data-access-user/src/core/models/shared/cadena-original-request.model';
import { Firma31910Service } from '../../services/firma31910.service';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { Router } from '@angular/router';
import { Solicitud31910State } from '../../estados/stores/tramite31910.store';
import { Tramite31910Query } from '../../estados/queries/tramite31910.query';
import { TramiteFolioStore } from '@libs/shared/data-access-user/src';

/**
 * @class PasoTresComponent
 * @description
 * Este componente gestiona el tercer paso de un trámite, donde se obtiene la firma electrónica del usuario.
 *
 * @since 1.0.0
 * @version 1.0.0
 * @license MIT
 *
 * @selector app-paso-tres
 * @standalone true
 * @requires CommonModule
 * @requires FirmaElectronicaComponent
 *
 * @templateUrl ./paso-tres.component.html
 * @styleUrl ./paso-tres.component.scss
 */
@Component({
  standalone: true,
  imports: [FirmaElectronicaComponent],
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  cadenaOriginal?: string;
  nuevaNotificacion!: Notificacion;
  url?: string;
  datosFirmaReales!: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  };
  public estadoSolicitud!: Solicitud31910State;
  folio!: string;
  @Input() procedureUrl: string = '';
  @Input() procedure: number = 0;
  /**
  /**
   * @constructor
   * @description
   * Constructor que inyecta `Router` para la navegación.
   *
   * @param {Router} router - Servicio de Angular para manejar la navegación.
   * @access public
   */
  constructor(
    private router: Router,
    private tramiteStore: TramiteFolioStore,
    private tramiteQuery: Tramite31910Query,
    private cadenaService: CadenaOriginal31910Service,
    private firmaService: Firma31910Service
  ) {
    // Constructor
  }

  /**
   * Método de inicialización del componente.
   *
   * Este método se ejecuta una vez que el componente ha sido inicializado.
   * Aquí se suscribe al estado del formulario de solicitud para mantener
   * actualizado el estado local del componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((state) => {
          this.estadoSolicitud = state;
        })
      )
      .subscribe();

    // Obtener la URL actual y separar los segmentos
    const URL_ACTUAL = this.router.url;
    const URL_SEPARADA = URL_ACTUAL.split('/');
    this.url = URL_SEPARADA.slice(0, 3).join('/');

    // Obtener la cadena original del trámite
    this.obtenerCadenaOriginal();
  }

  /**
   * Obtiene la firma electrónica del documento.
   * @param firma La firma electrónica en formato base64.
   * @returns void
   */
  obtieneFirma(firma: string): void {
    if (!this.cadenaOriginal || !this.datosFirmaReales) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'toastr',
        categoria: CategoriaMensaje.ERROR,
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Faltan datos para completar la firma.',
        cerrar: false,
        txtBtnAceptar: '',
        txtBtnCancelar: '',
      };
      return;
    }

    const CADENAHEX = encodeToISO88591Hex(this.cadenaOriginal);
    const FIRMAHEX = base64ToHex(firma);

    const PAYLOAD: FirmarRequest = {
      cadena_original: CADENAHEX,
      cert_serial_number: this.datosFirmaReales.certSerialNumber,
      clave_usuario: this.datosFirmaReales.rfc,
      fecha_firma: formatFecha(new Date()),
      clave_rol: 'Solicitante',
      sello: FIRMAHEX,
      fecha_fin_vigencia: formatFecha(this.datosFirmaReales.fechaFin),
      documentos_requeridos: [],
    };

    this.firmaService
      .enviarFirma<string>(String(this.estadoSolicitud.idSolicitud), PAYLOAD)
      .pipe(
        takeUntil(this.destroy$),
        tap((firmaResponse: BaseResponse<string>) => {
          // Validar si la firma fue exitosa
          if (firmaResponse.codigo !== '00' || !firmaResponse.datos) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: 'Error al firmar la solicitud',
              mensaje:
                firmaResponse.mensaje ||
                firmaResponse.error ||
                'Ocurrió un error al procesar la firma.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
            throw new Error('Firma no exitosa');
          }

          // Éxito: guardar folio
          this.folio = firmaResponse.datos;
        }),
        tap(() => {
          // Solo se ejecuta si todo fue exitoso
          this.tramiteStore.establecerTramite(
            this.folio,
            firma,
            this.estadoSolicitud.idSolicitud ?? 0,
            this.procedure
          );
          this.router.navigate([`${this.url}/acuse`]);
        }),
        catchError((error) => {
          console.error('Error en el proceso de firma:', error);
          if (!this.nuevaNotificacion) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: 'Error inesperado',
              mensaje:
                error?.error?.error || 'Ocurrió un error al procesar la firma.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
          return of(null);
        })
      )
      .subscribe();
  }

  /**
   * Obtiene la cadena original para el trámite actual.
   */
  obtenerCadenaOriginal(): void {
    const PAYLOAD: CadenaOriginalRequest = {
      num_folio_tramite: this.estadoSolicitud.idSolicitud?.toString() || null,
      boolean_extranjero: true,
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'Juan Pérez',
        es_persona_moral: true,
        certificado_serial_number: 'string',
      },
      cve_rol_capturista: 'CapturistaGubernamental',
      cve_usuario_capturista: 'Gubernamental',
      fecha_firma: formatFecha(new Date()),
    };
    this.cadenaService
      .obtenerCadenaOriginal(String(this.estadoSolicitud.idSolicitud), PAYLOAD)
      .subscribe({
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
          this.cadenaOriginal =
            typeof resp.datos === 'string' ? resp.datos : 'cadenajemeplo';
        },
        error: (error) => {
          console.error('Error al iniciar trámite:', error);
          const MENSAJE =
            error?.error?.error || 'Error inesperado al iniciar trámite.';
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: 'error',
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        },
      });
  }

  /**
   * Procesa los datos de firma.
   * @param datos Los datos de firma a procesar.
   */
  datosFirma(datos: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  }): void {
    this.datosFirmaReales = datos;
    this.obtieneFirma(datos.firma);
  }

  /**
   * Método de destrucción del componente.
   * Este método se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
