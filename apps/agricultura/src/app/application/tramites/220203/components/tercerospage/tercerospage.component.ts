import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, PersonaTerceros, TercerosComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { AcuiculturaQuery } from '../../estados/sanidad-certificado.query';
import { CommonModule } from '@angular/common';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

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

  constructor(private consultaQuery: ConsultaioQuery, private readonly importacionDeAcuiculturaService: ImportacionDeAcuiculturaService ,private readonly acuiculturaQuery: AcuiculturaQuery){
  }
 
  ngOnInit(): void {
     this.consultaQuery.selectConsultaioState$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((seccionState) => {
          this.esFormularioSoloLectura=seccionState?.readonly;
        });
      }
      
  
    ngAfterViewInit(): void {
          this.acuiculturaQuery.seleccionarTercerosRelacionados$.pipe(takeUntil(this.destroyNotifier$)).subscribe((datosDeLaSolicitud) => {
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
  this.importacionDeAcuiculturaService.updateTercerosRelacionados(event);
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
