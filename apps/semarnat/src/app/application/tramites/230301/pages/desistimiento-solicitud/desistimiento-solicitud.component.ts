import {
  AccionBoton,
  CategoriaMensaje,
  DatosPasos,
  ListaPasosWizard,
  LoginQuery,
  LoginState,
  Notificacion,
  PASOS,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  ERROR_FORMA_ALERT,
  MSG_REGISTRO_EXITOSO,
} from '../../enum/constants';
import { Tramite230301Query } from '../../estados/queries/tramites230301.query';

import {
  Tramite230301State, Tramite230301Store
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
  templateUrl: './desistimiento-solicitud.component.html',
  styleUrl: './desistimiento-solicitud.component.scss',
})
export class DesistimientoSolicitudComponent implements OnDestroy {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  indice = 1;
  nuevaNotificacion: Notificacion | null = null;
  alertaNotificacion!: Notificacion;
  folioTemporal = 0;
  pasos: ListaPasosWizard[] = PASOS;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  infoAlert = 'alert-info';
  esFormaValido = false;
  formErrorAlert = ERROR_FORMA_ALERT;

  private loginState!: LoginState;
  public solicitud230301State!: Tramite230301State;

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly desistimientoService: DesistimientoSolicitudService,
    private readonly tramite230301Store: Tramite230301Store,
    private readonly tramite230301Query: Tramite230301Query,
    private readonly loginQuery: LoginQuery
  ) {
    this.tramite230301Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((solicitud) => (this.solicitud230301State = solicitud));

    this.loginQuery.selectLoginState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((login) => (this.loginState = login));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    if (this.indice === 1 && e.accion === 'cont') {
      const IS_FORM_VALID = this.pasoUnoComponent?.validarFormularios();
      if (!IS_FORM_VALID) {
        this.esFormaValido = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      this.guardarSolicitud(e);
    } else {
      this.navigateWizard(e);
    }
  }

  private guardarSolicitud(e: AccionBoton): void {
    this.esFormaValido = false;
    this.ejecutaGuardado().subscribe((respuesta) => {
      if (respuesta.exito) {
        this.handleGuardarSuccess(respuesta, e);
      } else {
        this.handleGuardarError(respuesta);
      }
    });
  }

  private ejecutaGuardado(): Observable<ResultadoSolicitud> {
    const PAYLOAD: Solicitud230301Request = {
      rfc: this.loginState.rfc,
      motivoDesistimiento: this.solicitud230301State.motivoDesistimiento,
      solicitudAnterior: this.solicitud230301State.solicitudAnterior,
      folioAnterior: this.solicitud230301State.folioAnterior,
    };

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

  private handleGuardarSuccess(
    respuesta: ResultadoSolicitud,
    e: AccionBoton
  ): void {
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
    this.navigateWizard(e);
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

  private navigateWizard(e: AccionBoton): void {
    let newIndex = e.valor;
    if (e.accion === 'cont') {
      newIndex++;
    } else if (e.accion === 'ant') {
      newIndex--;
    }

    if (newIndex > 0 && newIndex <= this.pasos.length) {
      this.indice = newIndex;
      this.actualizarDatosPasos();
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else if (e.accion === 'ant') {
        this.wizardComponent.atras();
      }
    }
  }

  actualizarDatosPasos(): void {
    this.datosPasos = {
      ...this.datosPasos,
      indice: this.indice,
    };
  }
}
