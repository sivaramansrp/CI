import {

  Notificacion,
  NotificacionesComponent,
  SoloNumerosDirective,

  TipoPedimentoService,
} from '@ng-mf/data-access-user';
import {

  NgxDatatableModule,
  SelectionType,
} from '@swimlane/ngx-datatable';
import {
  Component,
  OnDestroy,
  OnInit,
  forwardRef,
  output,
} from '@angular/core';

import {  Subject,  map, takeUntil } from 'rxjs';
import {  ReactiveFormsModule } from '@angular/forms';

import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../core/estados/tramites/tramite5701.store';;
import { CommonModule } from '@angular/common';
import { EstadoPedimentoService } from '../../../../core/services/5701/pedimento/estado-pedimento.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { ServiciosExtraordinariosModule } from '../../servicios-extraordinarios.module';

/**
 * Componente responsable de gestionar la captura, validación y presentación
 * de datos relacionados con pedimentos aduanales en un formulario interactivo.
 * Permite seleccionar, editar y emitir eventos de cambios hacia componentes padres.
 */
@Component({
  selector: 'paso-datos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    forwardRef(() => SoloNumerosDirective),
    NotificacionesComponent,
    NgxDatatableModule,
    ServiciosExtraordinariosModule
  ],
  templateUrl: './paso-datos.component.html',
  styleUrl: './paso-datos.component.scss',
  providers: [ToastrService],
})

/**
 * Componente encargado de gestionar la lógica de captura, validación y emisión de datos
 * relacionados con los pedimentos aduanales dentro del trámite 5701.
 */
export class PasoDatosComponent implements OnInit, OnDestroy {
  

  /**
   * Subject para manejar la destrucción del componente y limpiar las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /*
   */
  public nuevaNotificacion!: Notificacion;


  /**
   * Constructor del componente Pedimento.
   * Se inyectan las dependencias necesarias para el componente, incluyendo servicios y store.
   * tramite5701Query
   * tramite5701Store
   * estadoPedimentoService
   * tipoPedimentoService
   */
  constructor(
    private tramite5701Query: Tramite5701Query,
    private tramite5701Store: Tramite5701Store,
    private estadoPedimentoService: EstadoPedimentoService,
    private tipoPedimentoService: TipoPedimentoService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se utiliza para obtener los tipos de pedimento y suscribirse al estado de la solicitud 5701.
   */
  ngOnInit(): void {
 
    this.tramite5701Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((solicitudState) => {
          
        })
      )
      .subscribe();
  }

  onFormularioPadreValido(isValid: boolean): void {
    
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Notifica y completa el observable `destroyNotifier$` para limpiar suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}
