import { Component, ViewChild } from '@angular/core';

import { JSONResponse, ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { ListaPasosWizard, PASOS, RegistroSolicitudService } from '@libs/shared/data-access-user/src';
import { Observable, catchError, map, switchMap, take, throwError } from 'rxjs';

import { AmpliacionServiciosAdapter } from '../../adapters/ampliacion-servicios.adapter';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-sanitario',
  templateUrl: './sanitario.component.html',
})
export class SanitarioComponent {
   /**
   * ID del tipo de trámite.
   */
  idTipoTramite: string = '260215';
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

   constructor (private query : Tramite260215Query,
               private registroSolicitudService: RegistroSolicitudService,
               private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService
  ) {

  }
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        // Call the API to save data when "Continuar" is clicked
        this.guardarDatosAPI().subscribe({
          next: (response: JSONResponse) => {
            // eslint-disable-next-line no-console
            console.log('Datos guardados exitosamente:', response);
            this.wizardComponent.siguiente();
          },
          error: (error: unknown) => {
            // eslint-disable-next-line no-console
            console.error('Error al guardar datos:', error);
            // You can add user notification here
          }
        });
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Guarda los datos del formulario utilizando el servicio específico de permiso sanitario.
   * Convierte el estado actual a payload y envía los datos al servidor.
   * @returns {Observable<JSONResponse>}
   */
  guardarDatosAPI(): Observable<JSONResponse> {
    return this.query.selectTramiteState$.pipe(
      take(1), // Tomar solo el primer valor para evitar loops
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => {
        return this.serviciosPermisoSanitarioService.guardarDatosPost(FORM_PAYLOAD as unknown as Record<string, unknown>);
      }),
      catchError(error => {
        // eslint-disable-next-line no-console
        console.error('Error al guardar:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Guarda la solicitud de ampliación de servicios utilizando el adaptador para convertir el estado
   * y enviar los datos al servidor.
   * @returns {Observable<BaseResponse<{ id_solicitud: number }>>}
   */
  onGuardar(): Observable<BaseResponse<{ id_solicitud: number }>> {
    return this.query.selectTramiteState$.pipe(
      take(1), // Tomar solo el primer valor para evitar loops
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => {
        return (this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, FORM_PAYLOAD) as Observable<BaseResponse<{ id_solicitud?: number }>>).pipe(
          map((response: BaseResponse<{ id_solicitud?: number }>) => {
            // Adapt the response to the expected type
            return {
              ...response,
              datos: {
                id_solicitud: response.datos?.id_solicitud ?? 0
              }
            } as BaseResponse<{ id_solicitud: number }>;
          })
        );
      }),
      catchError(error => {
        console.error('Error al guardar:', error);
        return throwError(() => error);
      })
    );
  }
}
