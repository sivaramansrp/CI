import {
  AccionBoton,
  AlertComponent,
  BtnContinuarComponent,
  CategoriaMensaje,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  NotificacionesComponent,
  PASOS2,
  SeccionLibStore,
  WizardComponent,
} from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  ERROR_FORMA_ALERT,
  MSG_REGISTRO_EXITOSO,
  SECCIONES_TRAMITE_230301,
} from '../../enum/constants';
import { Tramite230301Query } from '../../estados/queries/tramites230301.query';

import {
  Tramite230301Store,
} from '../../estados/tramites/tramites230301.store';

import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { CodigoRespuesta } from '../../../231001/enum/enum-tramite';
import { DesistimientoSolicitudService } from '../../services/desistimiento-solicitud.service';

import { Observable, Subject, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { Solicitud230301Request } from '../../models/solicitud-230301-request';

import { ResultadoSolicitud } from '../../models/solicitud-230301-response';

@Component({
  selector: 'app-desistimiento-solicitud',
  standalone: true,
  templateUrl: './desistimiento-solicitud.component.html',
  styleUrl: './desistimiento-solicitud.component.scss',
  imports: [
    CommonModule,
    AlertComponent,
    NotificacionesComponent,
    WizardComponent,
    BtnContinuarComponent,
    RouterOutlet,
  ],
})
export class DesistimientoSolicitudComponent implements OnInit, OnDestroy {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  pasoUnoComponent: PasoUnoComponent | undefined;

  indice = 1;
  nuevaNotificacion: Notificacion | null = null;
  alertaNotificacion!: Notificacion;
  folioTemporal = 0;

  pasos: ListaPasosWizard[] = PASOS2;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  infoAlert = 'alert-info';
  formWithErrors = false;
  formErrorAlert = ERROR_FORMA_ALERT;

  private desistimientoService = inject(DesistimientoSolicitudService);
  private tramite230301Store = inject(Tramite230301Store);
  private tramite230301Query = inject(Tramite230301Query);
  private seccionesStore = inject(SeccionLibStore);

  private readonly destroyed$ = new Subject<void>();

  private secciones: boolean[] = [];
  private validaciones: boolean[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.configuracionSecciones();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onActivate(componentInstance: PasoUnoComponent): void {
    this.pasoUnoComponent = componentInstance;
  }

  private configuracionSecciones() {
    for (const [, SECCIONES_DEL_PASO] of Object.entries(
      SECCIONES_TRAMITE_230301
    )) {
      for (const [SECCION, VALIDACION] of Object.entries(SECCIONES_DEL_PASO)) {
        this.secciones.push(true);
        this.validaciones.push(VALIDACION);
      }
    }
    this.seccionesStore.establecerSeccion(this.secciones);
    this.seccionesStore.establecerFormaValida(this.validaciones);
  }

  continuarEvent(e: AccionBoton): void {
    this.formWithErrors = false;
    if (e.valor === 2 && e.accion === 'cont') {
      const IS_FORM_VALID = this.pasoUnoComponent?.validarFormularios();
      if (!IS_FORM_VALID) {
        this.formWithErrors = true;
        this.formErrorAlert = ERROR_FORMA_ALERT;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.guardarSolicitud();
      }
    }
  }

  private guardarSolicitud(): void {
    this.ejecutaGuardado().subscribe((respuesta) => {
      if (respuesta.exito) {
        this.handleGuardarSuccess(respuesta);
        this.router.navigate(['paso-dos'], { relativeTo: this.route });
        this.wizardComponent.siguiente();
        this.actualizarDatosPasos();
      } else {
        this.handleGuardarError(respuesta);
      }
    });
  }

  private ejecutaGuardado(): Observable<ResultadoSolicitud> {
    const STATE = this.tramite230301Query.getValue();
    const PAYLOAD: Solicitud230301Request = {
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'IGNACIO EDUARDO',
        es_persona_moral: true,
        certificado_serial_number: '3082054030820428a00302010',
      },
      motivo_desistimiento: STATE.motivoDesistimiento,
      id_solicitud_anterior: STATE.solicitudAnterior,
      id_folio_anterior: STATE.folioAnterior,
    };

    // eslint-disable-next-line no-warning-comments
    //TODO usuario state or login state do not have this values and certificado is going to be implemented later, meanwhile we're using fixed values.
    /**solicitante: {
     rfc: this.loginState.rfc,
     nombre: this.usuarioState.perfilUsuario?.nombreCompleto || '',
     es_persona_moral: this.usuarioState.perfilUsuario?.tipoPersona === 'M',
     certificado_serial_number: this.loginState.certificadoSerialNumber,
     },
     motivoDesistimiento: this.solicitud230301State.motivoDesistimiento,
     solicitudAnterior: this.solicitud230301State.solicitudAnterior,
     folioAnterior: this.solicitud230301State.folioAnterior,
     };*/

    return this.desistimientoService.guardarSolicitud(PAYLOAD).pipe(
      map((response) => {
        if (
          response.codigo === CodigoRespuesta.EXITO &&
          response.datos?.id_solicitud
        ) {
          this.tramite230301Store.setIdSolicitud(
            Number(response.datos.id_solicitud)
          );
          this.folioTemporal = response.datos.id_solicitud;
          return { exito: true, mensaje: response.mensaje };
        }
        return { exito: false, mensaje: response.error };
      }),
      catchError((error) => of({ exito: false, mensaje: error })),
      takeUntil(this.destroyed$)
    );
  }

  private handleGuardarSuccess(respuesta: ResultadoSolicitud): void {
    this.alertaNotificacion = {
      tipoNotificacion: 'banner',
      categoria: 'success',
      modo: 'action',
      titulo: '',
      mensaje: MSG_REGISTRO_EXITOSO(String(this.folioTemporal)),
      cerrar: true,
      txtBtnAceptar: '',
      txtBtnCancelar: '',
    };
  }

  private handleGuardarError(respuesta: ResultadoSolicitud): void {
    const ERROR_DETAILS = (respuesta.erroresModelo || [])
      .map((err) => `${err.campo}: ${err.errores.join(', ')}`)
      .join('<br>');
    const FINAL_MESSAGE = `${
      respuesta.mensaje || 'Error inesperado al enviar la solicitud.'
    }${ERROR_DETAILS ? `<br>${ERROR_DETAILS}` : ''}`;

    this.nuevaNotificacion = {
      tipoNotificacion: 'toastr',
      categoria: CategoriaMensaje.ERROR,
      modo: 'action',
      titulo: 'Error',
      mensaje: FINAL_MESSAGE,
      cerrar: false,
      txtBtnAceptar: '',
      txtBtnCancelar: '',
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  actualizarDatosPasos(): void {
    this.datosPasos = {
      ...this.datosPasos,
      indice: this.indice,
    };
  }
}
