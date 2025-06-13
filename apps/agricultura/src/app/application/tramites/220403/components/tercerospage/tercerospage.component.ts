import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, PersonaTerceros, TercerosComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';

@Component({
  selector: 'app-tercerospage',
  standalone: true,
  imports: [CommonModule,
    TercerosComponent
  ],
  templateUrl: './tercerospage.component.html',
  styleUrl: './tercerospage.component.scss',
})
export class TercerospageComponent implements OnInit,OnDestroy,AfterViewInit {
    /**
     * Subject utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
     * 
     * @remarks
     * Este Subject se emite cuando el componente se destruye, permitiendo que las suscripciones
     * a observables se cancelen correctamente usando el operador `takeUntil`.
     * 
     * @copodoc
     * Notificador para la destrucción de suscripciones en el ciclo de vida del componente.
     */
    private destroyNotifier$ = new Subject<void>();
    /**
     * @property {PersonaTerceros[]} personas
     * @description Lista de personas asociadas como terceros en el trámite actual.
     * @desc [es] Lista de personas asociadas como terceros en el trámite actual.
     */
    personas:PersonaTerceros[]=[];
      /**
       * Indica si el formulario se encuentra en modo solo lectura.
       * 
       * @desc [es] Determina si el formulario debe mostrarse únicamente para lectura, sin permitir modificaciones.
       */
      esFormularioSoloLectura:boolean = false;
  /**
   * Constructor for TercerosPageComponent.
   *
   * @param consultaQuery - Service for querying Consultaio data.
   * @param certificadoZoosanitarioServices - Service for managing Certificado Zoosanitario operations.
   * @param certificadoZoosanitarioQuery - Query service for Certificado Zoosanitario state management.
   *
   * @author
   * @see ConsultaioQuery
   * @see CertificadoZoosanitarioServiceService
   * @see ZoosanitarioQuery
   */
  constructor(private consultaQuery: ConsultaioQuery, private tramite220403Query: Tramite220403Query, private store: Tramite220403Store, private exportaccionAcuicolaService: ExportaccionAcuicolaService ){
  }
  /**
   * @inheritdoc
   * 
   * @description
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * 
   * Subscribes to the `selectConsultaioState$` observable from `consultaQuery` and updates the `esFormularioSoloLectura`
   * property based on the `readonly` value from the emitted `seccionState`. The subscription is automatically
   * unsubscribed when the `destroyNotifier$` emits, preventing memory leaks.
   *
   * @see https://angular.io/api/core/OnInit
   */
  ngOnInit(): void {
     this.consultaQuery.selectConsultaioState$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((seccionState) => {
          this.esFormularioSoloLectura=seccionState?.readonly;
        });
      }
      
      /**
   * @inheritdoc
   * 
   * @ngAfterViewInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * 
   * Subscribes to the `selectConsultaioState$` observable from `consultaQuery` and updates the `esFormularioSoloLectura`
   * property based on the `readonly` value from the emitted `seccionState`. The subscription is automatically
   * unsubscribed when the `destroyNotifier$` emits, preventing memory leaks.
   *
   * @see https://angular.io/api/core/OnInit
   */
      ngAfterViewInit(): void {
          this.tramite220403Query.seleccionarTercerosRelacionados$.pipe(takeUntil(this.destroyNotifier$)).subscribe((datosDeLaSolicitud) => {
     if (datosDeLaSolicitud) {
        this.personas = datosDeLaSolicitud;
      }
    });
      }
    /**
   * Configuración para el selector de identificación del transporte.
   * @property {onPersonasChanged} onPersonasChanged
   */    
onPersonasChanged(event: PersonaTerceros[]):void {
this.exportaccionAcuicolaService.updateTercerosRelacionados(event);
}
  /**
   * Configuración para el selector de identificación del transporte.
   * @property {ngOnDestroy} ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
