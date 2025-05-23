import { HttpClient } from '@angular/common/http';

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { SeccionLibStore } from '@libs/shared/data-access-user/src';

import { Subject, takeUntil } from 'rxjs';

import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';

import { ApiSolicitud, DatosDeLaSolicitud, PagoDeDerechos } from '../../models/220201/capturar-solicitud.model';

/**
 * Componente para el asistente de solicitud.
 * Este componente gestiona la navegación entre los pasos del formulario de solicitud.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})
export class PasoUnoComponent implements OnInit,OnDestroy {
    private destroyNotifier$ = new Subject<void>();
  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice - Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;

  /**
   * Lista de secciones del formulario.
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * - Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceror-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];
  constructor(private readonly seccionStore: SeccionLibStore,private readonly httpServicios: HttpClient,private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService) {
    this.seccionStore.establecerFormaValida([false]);
    this.seccionStore.establecerSeccion([true])
  }
  ngOnInit(): void {
    this.httpServicios.get<ApiSolicitud>('../../../../../assets/json/220201/capturarSolicitud.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
if(data){
   this.certificadoZoosanitarioServices.updatePagoDeDerechos(data?.pagoDeDerechos || {} as PagoDeDerechos);
   this.certificadoZoosanitarioServices.updateDatosDeLaSolicitud(data?.datosDeLaSolicitud || {} as DatosDeLaSolicitud);
   this.certificadoZoosanitarioServices.updateDatosParaMovilizacionNacional(data?.datosParaMovilizacionNacional || {} as DatosDeLaSolicitud);
}
       });
  }

  /**
   * Evento emitido al cambiar de pestaña.
   * @event tabChanged
   * @type {EventEmitter<number>}
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * Cambia el índice de la pestaña seleccionada.
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}