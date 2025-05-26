/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line sort-imports
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent, TablaSeleccion, } from '@libs/shared/data-access-user/src';

import { CancelacionesService } from '../../services/cancelaciones.service'

import { CancelacionDeAutorizaciones } from '../../models/cancelacions.model'

import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { CancelacionesStore } from '../../estados/cancelaciones.store';

import { CancelacionesQuery } from '../../estados/cancelaciones.query';

import { CANCELACION_DE_AUTORIZACIONES } from '../../constantes/cancelacion-table.enum'
import { ConsultaioQuery } from '@ng-mf/data-access-user';
/**
 * @description
 * Componente para la cancelación de autorizaciones 140201.
 * Este componente maneja el formulario y la lógica para la cancelación de autorizaciones.
 * 
 * @example
 * <app-cancelacion-de-autorizaciones></app-cancelacion-de-autorizaciones>
 */
@Component({
  selector: 'app-cancelacion-de-autorizaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './cancelacion-de-autorizaciones.component.html',
  styleUrl: './cancelacion-de-autorizaciones.component.scss',
})
export class CancelacionDeAutorizacionesComponent implements OnInit, OnDestroy {

  /**
   * @ignore
   */
  constructor(private fb: FormBuilder,
    private cancelacionesService: CancelacionesService,
    private cancelacionesStore: CancelacionesStore,
    private cancelacionesQuery: CancelacionesQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
   
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroy$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = true; //seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()

  }

  /**
   * @ignore
   */
  private destroy$ = new Subject<void>();

    /**
   * Suscripción a los cambios en el formulario react
   */
  private subscription: Subscription = new Subscription();
  
   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 
  
  /**
   * Formulario reactivo para la cancelación de autorizaciones.
   */
  cancelacionForm!: FormGroup;

  /**
   * Variable para alternar la visibilidad del contenido.
   */
  mostrarContenido = false;

  /**
   * Observable para el RFC ingresado.
   */
  rfcIngresado$ = this.cancelacionesQuery.rfcIngresado$;

  /**
   * Observable para el motivo de cancelación.
   */
  motivoCancelacion$ = this.cancelacionesQuery.motivoCancelacion$;

  /**
   * Configuración de las columnas de la tabla.
   */
  configuracionTabla:ConfiguracionColumna<CancelacionDeAutorizaciones>[] = CANCELACION_DE_AUTORIZACIONES;

  /**
   * Referencia al componente de selección de tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Datos de cancelación de autorizaciones.
   */
  cancelacionData: CancelacionDeAutorizaciones[] = [];

  /**
   * Inicializa el componente.
   * Configura el formulario y obtiene los datos necesarios.
   */
  ngOnInit(): void {
    this.cancelacionForm = this.fb.group({
      rfcIngresado: ['', [Validators.required, Validators.maxLength(13)]],
      motivoCancelacion: ['', Validators.required]
    });

    this.getCancelacioneServiceData();
    this.inicializarEstadoFormulario();
  }

   /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.actualizarEstado();
    }  
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.actualizarEstado();
      if (this.cancelacionForm && this.esFormularioSoloLectura) {
        this.cancelacionForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.cancelacionForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

  /**
   * Actualiza el estado del formulario con los datos observables.
   */
  actualizarEstado(): void {
    this.rfcIngresado$.pipe(takeUntil(this.destroy$)).subscribe((rfcIngresado) => {
      if (rfcIngresado) {
        this.cancelacionForm.get('rfcIngresado')?.setValue(rfcIngresado);
      }
    });

    this.motivoCancelacion$.pipe(takeUntil(this.destroy$)).subscribe((motivoCancelacion) => {
      if (motivoCancelacion) {
        this.cancelacionForm.get('motivoCancelacion')?.setValue(motivoCancelacion);
      }
    });
  }

  /**
   * Actualiza el RFC ingresado en el almacén.
   */
  updateRfcIngresado() {
    const RFCINGRESADO = this.cancelacionForm?.get('rfcIngresado')?.value;
    this.cancelacionesStore.setRfcIngresado(RFCINGRESADO);
  }

  /**
   * Actualiza el motivo de cancelación en el almacén.
   */
  updateMotivoCancelacion() {
    const MOTIVOCANCELACION = this.cancelacionForm?.get('motivoCancelacion')?.value;
    this.cancelacionesStore.setMotivoCancelacion(MOTIVOCANCELACION);
  }

  /**
   * Alterna la visibilidad del contenido.
   */
  alternarContenido(): void {
    this.mostrarContenido = !this.mostrarContenido;
  }

  /**
   * Obtiene los datos de cancelación de autorizaciones del servicio.
   */
  getCancelacioneServiceData(): void {
    this.cancelacionesService
      .getCancelacionDeAutorizaciones()
      .pipe(takeUntil(this.destroy$))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((resp:any) => { 
        this.cancelacionData = resp;
      });
  }

  /**
   * Destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }
}