import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ConsultaioQuery, ConsultaioState} from '@ng-mf/data-access-user';
import { Tramite40403Service } from '../../estados/tramite40403.service';
import { Tramite40403Store } from '../../estados/tramite40403.store';
import { Tramite40403Query } from '../../estados/tramite40403.query';
import { map, Subject, takeUntil } from 'rxjs';

/**
 * Componente para gestionar el paso uno del asistente de solicitud.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

   /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

   /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para notificar y completar las suscripciones activas al destruir el componente, evitando fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

    /**
     * Constructor del componente.
     * @param fb - FormBuilder para inicializar el formulario reactivo.
     * @param tramite40403Service - Servicio para interactuar con la API relacionada con el trámite.
     * @param tramite40403Store - Almacén para gestionar el estado del trámite.
     * @param tramite40403Query - Consulta para obtener datos del estado del trámite.
     */
    constructor(
      private fb: FormBuilder,
      private tramite40403Service: Tramite40403Service,
      private tramite40403Store: Tramite40403Store,
      private tramite40403Query: Tramite40403Query,
       private consultaioQuery: ConsultaioQuery,
    ) { }


 ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();

      console.log('PasoUnoComponent - ngOnInit'+this.consultaDatos.update);
    if (this.consultaDatos.update) {
      this.fetchGetDatosConsulta();
    }
  }


public fetchGetDatosConsulta(): void {
      this.tramite40403Service
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        if (respuesta.success) {
          this.tramite40403Store.establecerClaveFolioCAAT(respuesta.datos.claveFolioCAAT);
          this.tramite40403Store.establecerCveFolioCaat(respuesta.datos.cveFolioCaat);
          this.tramite40403Store.establecerDescripcionTipoCaat(respuesta.datos.descripcionTipoCaat);
          this.tramite40403Store.establecerTipoDeCaatAerea(respuesta.datos.tipoDeCaatAerea);
         
          this.tramite40403Store.establecerIdeCodTransportacionAerea(respuesta.datos.ideCodTransportacionAerea);
          this.tramite40403Store.establecerCodIataIcao(respuesta.datos.codIataIcao);
            


          
        }
      });
  }

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
