import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, PersonaTerceros, } from '@ng-mf/data-access-user';
import { map, takeUntil } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { ListaDeDatosFinal } from '../../models/220202/fitosanitario.model';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { Subject } from 'rxjs';

/**
 * Componente para mostrar el subtítulo del asistente.
 * Este componente representa el primer paso de un formulario multipaso,
 * gestionando la navegación entre las diferentes secciones del formulario.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss --220202
 */

/**
 * @title PasoUnoComponent
 * @description 
 * Componente que representa el primer paso de un formulario multipaso.
 * Gestiona la navegación entre diferentes pestañas/pasos del formulario,
 * cada uno representado por un componente específico.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})

export class PasoUnoComponent implements OnInit,OnDestroy {

  /**
   * @description Índice de la pestaña/paso actual.
   * Este valor indica el paso actual en el proceso de formulario.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

    /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Indica si existen datos de respuesta para mostrar en el formulario.
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado de la consulta actual, contiene la información relevante del solicitante.
   * @type {ConsultaioState}
   */
  public consultaState!: ConsultaioState;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Lista de personas relacionadas con el trámite.
   * @type {PersonaTerceros[]}
   */
  public personas: PersonaTerceros[] = [];

  /**
   * @description 
   * Array de objetos que representan las diferentes secciones del formulario.
   * Cada objeto contiene el índice, título y el nombre del componente correspondiente.
   * Este arreglo es utilizado para navegar entre los diferentes pasos del formulario.
   * 
   * @type {Array<{ index: number, title: string, component: string }>}
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceros-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];

  /**
   * Constructor del componente.
   * Este constructor inicializa el componente y establece el estado inicial de la validación
   * y de las secciones del formulario utilizando el servicio `SeccionLibStore`.
   * @constructor
   * @param {SeccionLibStore} seccionStore - Servicio para gestionar el estado de las secciones del formulario.
   */
  constructor(private readonly seccionStore: SeccionLibStore, 
    private agriculturaApiService: AgriculturaApiService,
    private consultaQuery: ConsultaioQuery) {
    // Establece el estado de la forma como no válida al inicio.
    this.seccionStore.establecerFormaValida([false]);
    // Establece la primera sección como activa.
    this.seccionStore.establecerSeccion([true]);
    
  }

  
  ngOnInit(): void {
  this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
        this.esFormularioSoloLectura = seccionState.readonly;
        if (this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      })
    )
    .subscribe();
  }
  
    guardarDatosFormulario(): void {
      this.agriculturaApiService
        .getDatosDeLaSolicitudData().pipe(
          takeUntil(this.destroyNotifier$)
        )
        .subscribe((resp) => {
          if(resp){
          this.agriculturaApiService.actualizarEstadoFormulario(resp as ListaDeDatosFinal);
          this.esDatosRespuesta = true;
          }
        });
    }

  /**
   * @description 
   * Método que se ejecuta al seleccionar una pestaña/paso del formulario.
   * Actualiza el índice de la pestaña/paso actual, permitiendo la navegación
   * entre las diferentes secciones del formulario multipaso.
   * 
   * @method seleccionaPestana
   * @param {number} i - Índice de la pestaña/paso seleccionada.
   * @returns {void}
   */
  seleccionaPestana(i: number): void {
    this.indice = i;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
