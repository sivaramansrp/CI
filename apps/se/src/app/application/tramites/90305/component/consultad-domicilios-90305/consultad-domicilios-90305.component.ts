/**
 * @component ConsultadDomicilios90305Component
 * @description
 * Este componente permite la consulta de domicilios relacionados con Prosec.
 * Utiliza un formulario reactivo con un campo de selección de estado basado en un catálogo.
 * Los datos del catálogo se obtienen del servicio `ProsecModificacionServiceTsService`.
 * El estado seleccionado se gestiona utilizando Akita para asegurar la persistencia del estado.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import {
  CatalogoSelectComponent,
  ConsultaioQuery,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  CatalogoResponse,
} from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Tramite90305Query } from '../../estados/tramite90305.query';
import { Tramite90305State, Tramite90305Store } from '../../estados/tramite90305.store';

import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service';
/**
 * compo docs
 * @selector app-consultad-domicilios-90305
 * @standalone true
 */
@Component({
  selector: 'app-consultad-domicilios-90305',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './consultad-domicilios-90305.component.html',
  styleUrl: './consultad-domicilios-90305.component.scss',
})
export class ConsultadDomicilios90305Component implements OnInit, OnDestroy {
  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  /** Observable para el estado seleccionado */
  selectedEstado$: Observable<String> =
    this.tramite90305Query.selectedEstado$;
  /** Catálogo de estados cargado desde un archivo JSON */
  estadoJson: CatalogoResponse[] = [];
  /** Formulario reactivo para la consulta de domicilios */
  formConsulta!: FormGroup;

  // --- Variables y métodos similares a DeLaMuestraComponent ---
  /** Catálogo de estados para mantener similitud con DeLaMuestraComponent */
  public estadoCatalogo!: CatalogoResponse[];
  /** Notificador de destrucción similar */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Bandera de solo lectura (puedes adaptarla si tienes lógica para esto) */
  public esFormularioSoloLectura: boolean = false;
  /** Suscripción para manejar el estado seleccionado */
  private subscription?: Subscription;

    /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Tramite90305State;

  /**
   * Constructor
   * @param {FormBuilder} fb - Constructor de formularios reactivos
   * @param {ProsecModificacionServiceTsService} listaDomicilios - Servicio para obtener los datos del catálogo
   * @param {Tramite90305Store} tramite90305Store - Store de Akita para gestionar el estado
   * @param {Tramite90305Query} tramite90305Query - Query de Akita para seleccionar el estado
   */
  constructor(
    private fb: FormBuilder,
    private listaDomicilios: ProsecModificacionServiceTsService,
    private tramite90305Store: Tramite90305Store,
    private tramite90305Query: Tramite90305Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    // Si tuvieras lógica para solo lectura, podrías suscribirte aquí
    // this.tramite90305Query.selectReadonly$
    //   .pipe(takeUntil(this.destroyNotifier$))
    //   .subscribe(readonly => {
    //     this.esFormularioSoloLectura = readonly;
    //     this.inicializarEstadoFormulario();
    //   });
     this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

  /**
   * Método del ciclo de vida de Angular - inicializa el componente y configura el formulario
   */
  ngOnInit(): void {
    // Lógica original
    this.formConsulta = this.fb.group({
      estadoControl: [{ disabled: false }, Validators.required],
    });

    this.selectedEstado$.pipe(takeUntil(this.destroy$)).subscribe((selectedEstado) => {
      if (selectedEstado) {
        this.formConsulta.get('estadoControl')?.setValue(selectedEstado);
      }
    });

    this.loadEstado();

    
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de estados.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
    this.getEstadoCatalogo();
  }

  /**
   * Inicializa el formulario reactivo para capturar el estado seleccionado.
   */
    inicializarFormulario(): void {
      this.tramite90305Query.selectedEstado$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState.selectedEstado = seccionState;
          })
        )
        .subscribe();
    this.formConsulta = this.fb.group({
        estadoControl: [this.solicitudState?.selectedEstado, Validators.required],
      });
    }

  /**
   * Carga datos y deshabilita el formulario si es solo lectura.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formConsulta.disable();
    } else {
      this.formConsulta.enable();
    }
  }

  /**
   * Carga el catálogo de estados desde el servicio.
   */
  getEstadoCatalogo(): void {
    this.listaDomicilios
      .getEstadoData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp: CatalogoResponse[]) => {
        this.estadoCatalogo = resp;
      });
  }

  /**
   * Carga los datos del catálogo de estados desde el servicio
   */
  loadEstado(): void {
    this.listaDomicilios
      .getEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: CatalogoResponse[]) => {
        this.estadoJson = resp;
      });
  }

  /**
   * Obtiene el estado seleccionado del formulario y lo guarda en el store
   */
  getMunicipios(): void {
    const SELECTED_ESTADO = this.formConsulta.get('estadoControl')?.value;
    this.tramite90305Store.setSelectedEstado(SELECTED_ESTADO);
  }

  /*
    * Método del ciclo de vida de Angular - destruye el componente
  */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    // Desuscribirse de la suscripción si existe
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
