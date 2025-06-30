import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, SeccionLibStore, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { CapturarSolicitud } from '../../models/220201/capturar-solicitud.model';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from '../../components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { TercerospageComponent } from '../../components/tercerospage/tercerospage.component';

/**
 * @fileoverview Componente para el asistente de solicitud.
 * Este componente gestiona la navegación entre los pasos del formulario de solicitud,
 * así como la carga y almacenamiento de datos de la solicitud.
 * @module PasoUnoComponent
 */

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
  styleUrls: ['./paso-uno.component.scss'],
  standalone: true,
  imports:[SolicitanteComponent,DatosDeLaSolicitudComponent,
      DatosParaMovilizacionNacionalComponent,PagoDeDerechosComponent,TercerospageComponent,CommonModule]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Subject utilizado para destruir suscripciones y evitar fugas de memoria.
   * @property {Subject<void>} destroyNotifier$
   */
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

  /**
   * Constructor del componente.
   * Inicializa los stores y servicios necesarios para el manejo de la solicitud.
   * @method constructor
   * @param seccionStore Store para el manejo de la validez y estado de las secciones.
   * @param certificadoZoosanitarioServices Servicio para la gestión de la solicitud.
   * @param consultaQuery Consulta para el estado de la sección.
   */
  constructor(
    private readonly seccionStore: SeccionLibStore,
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    private consultaQuery: ConsultaioQuery
  ) {
    this.seccionStore.establecerFormaValida([false]);
    this.seccionStore.establecerSeccion([true]);
  }

  /**
   * Ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Suscribe al estado de la consulta y guarda los datos del formulario si es necesario.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((seccionState) => {
        if (seccionState.update) {
          this.guardarDatosFormulario();
        }
      });
  }

  /**
   * Guarda los datos del formulario llamando al servicio correspondiente.
   * @method guardarDatosFormulario
   */
  guardarDatosFormulario(): void {
    this.certificadoZoosanitarioServices.guardarDatosFormulario()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.certificadoZoosanitarioServices.storeDatosFormulario(data as CapturarSolicitud);
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Evento emitido al cambiar de pestaña.
   * @event tabChanged
   * @type {EventEmitter<number>}
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * Cambia el índice de la pestaña seleccionada y emite el evento correspondiente.
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }

  /**
   * Ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera recursos y cancela las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}