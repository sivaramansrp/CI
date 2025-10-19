/**
 * @fileoverview Componente para el segundo paso del trámite 230301 de SEMARNAT.
 * Este archivo contiene la lógica para manejar la firma electrónica en el segundo paso
 * del proceso de solicitud, proporcionando la interfaz necesaria para la autenticación
 * y validación digital del usuario.
 * @author Equipo de desarrollo VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 */
import {
  CategoriaMensaje,
  FirmaElectronicaComponent,
  Notificacion,
  NotificacionesComponent,
  SessionQuery,
  TramiteFolioQueries,
  base64ToHex,
  encodeToISO88591Hex,
} from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { CadenaOriginal230301Service } from '../../services/cadena-original230301.service';
import { CadenaOriginalRequest } from '../../models/cadena-original-request';
import { CommonModule } from '@angular/common';
import { DocumentosQuery } from '@libs/shared/data-access-user/src/core/queries/documentos.query';
import { DocumentosState } from '@libs/shared/data-access-user/src/core/estados/documentos.store';
import { Firma230301Service } from '../../services/firma230301.service';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { Router } from '@angular/router';
import { Tramite230301State } from '../../estados/tramites/tramites230301.store';

import { Tramite230301Query } from '../../estados/queries/tramites230301.query';
import { TramiteFolioStore } from '@libs/shared/data-access-user/src';

import { PerfilUsuario } from '@libs/shared/data-access-user/src/core/models/usuario/perfilUsuario.model';
import { Rol } from '@libs/shared/data-access-user/src/core/models/usuario/rol.model';

@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule, FirmaElectronicaComponent, NotificacionesComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  private documentosState!: DocumentosState;
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
  public solicitudState!: Tramite230301State;
  folio!: string;
  @Input() procedureUrl: string = '';
  @Input() procedure: number = 0;
  userProfile: PerfilUsuario | undefined;
  roles: Rol[] = [];
  userId = '';

  constructor(
    private router: Router,
    private documentosQuery: DocumentosQuery,
    private tramite230301Query: Tramite230301Query,
    private firma: Firma230301Service,
    private cadena: CadenaOriginal230301Service,
    private tramiteStore: TramiteFolioStore,
    private sessionQuery: SessionQuery
  ) {}

  ngOnInit(): void {
    this.documentosQuery.selectDocumentoState$
      .pipe(
        takeUntil(this.destroy$),
        map((documentosState) => {
          this.documentosState = documentosState;
        })
      )
      .subscribe();

    this.tramite230301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((state) => {
          this.solicitudState = state;
        })
      )
      .subscribe();

    this.sessionQuery.selectPerfilUsuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });

    this.sessionQuery.selectRolesUsuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe((roles) => {
        this.roles = roles;
      });

    this.sessionQuery.selectUsuarioState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.userId = state.idUsuario;
      });

    const URL_ACTUAL = this.router.url;
    const URL_SEPARADA = URL_ACTUAL.split('/');
    this.url = URL_SEPARADA.slice(0, 3).join('/');

    this.obtenerCadenaOriginal();
  }

  obtenerCadenaOriginal(): void {
    const PAYLOAD: CadenaOriginalRequest = {
      num_folio_tramite: this.solicitudState.idSolicitud?.toString() || null,
      boolean_extranjero: true,
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'Juan Pérez',
        es_persona_moral: true,
        certificado_serial_number: 'string',
      },
      cve_rol_capturista: 'CapturistaGubernamental',
      cve_usuario_capturista: 'Gubernamental',
      fecha_firma: PasoDosComponent.formatFecha(new Date()),
    };
    // eslint-disable-next-line no-warning-comments
    //TODO this is going to be updated when certificado service and other sources are ready
    /*const PAYLOAD: CadenaOriginalRequest = {
      num_folio_tramite: this.solicitudState.idSolicitud?.toString() || null,
      boolean_extranjero: true,
      solicitante:{
        rfc: this.userProfile.rfc,
        nombre: this.userProfile.nombreCompleto,
        es_persona_moral: this.userProfile.tipoPersona === 'M',
        // eslint-disable-next-line no-warning-comments
        certificado_serial_number: 'string',
      },
      cve_rol_capturista: this.roles[0].codigoRol,
      cve_usuario_capturista: this.userId,
      fecha_firma: PasoDosComponent.formatFecha(new Date()),
    };*/
    this.cadena
      .obtenerCadenaOriginal(String(this.solicitudState.idSolicitud), PAYLOAD)
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
      fecha_firma: PasoDosComponent.formatFecha(new Date()),
      clave_rol: 'Solicitante',
      sello: FIRMAHEX,
      fecha_fin_vigencia: PasoDosComponent.formatFecha(
        this.datosFirmaReales.fechaFin
      ),
      documentos_requeridos: [],
    };

    this.firma
      .enviarFirma<string>(String(this.solicitudState.idSolicitud), PAYLOAD)
      .pipe(
        takeUntil(this.destroy$),
        tap((firmaResponse: BaseResponse<string>) => {
          // eslint-disable-next-line no-warning-comments
          //TODO descomentar hasta que la configuración del trámite se haya hecho
          /*if (firmaResponse.codigo !== '00' || !firmaResponse.datos) {
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
          this.folio = firmaResponse.datos;*/
          this.folio = 'sdfjak234j3242addddsafsda23342342';
        }),
        tap(() => {
          this.tramiteStore.establecerTramite(
            this.folio,
            firma,
            this.solicitudState.idSolicitud ?? 0,
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

  static formatFecha(fecha: string | Date): string {
    const DATE_OBJ = new Date(fecha);
    const PAD = (n: number): string => n.toString().padStart(2, '0');

    const YYYY = DATE_OBJ.getFullYear();
    const MM = PAD(DATE_OBJ.getMonth() + 1);
    const DD = PAD(DATE_OBJ.getDate());
    const HH = PAD(DATE_OBJ.getHours());
    const MM_MINUTES = PAD(DATE_OBJ.getMinutes());
    const SS = PAD(DATE_OBJ.getSeconds());

    return `${YYYY}-${MM}-${DD} ${HH}:${MM_MINUTES}:${SS}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
