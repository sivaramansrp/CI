import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { MercanciaForm } from '../../modelos/acta-de-hechos.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_IMPORTE_PAGO } from '@libs/shared/data-access-user/src';
import { REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TramiteState } from '../../estados/tramite32516Store.store';
import { TramiteStore } from '../../estados/tramite32516Store.store';
import { TramiteStoreQuery } from '../../estados/tramite32516Query.query';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { Validators } from '@angular/forms';

/**
 * Componente para manejar el formulario de mercancías destruidas.
 * Proporciona funcionalidad para gestionar formularios y datos relacionados.
 */
@Component({
  selector: 'app-mercancias-destruidas-forma',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './mercancias-destruidas-forma.component.html',
  styleUrl: './mercancias-destruidas-forma.component.scss'
})
export class MercanciasDestruidasFormaComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para manejar los datos de las mercancías destruidas.
   * @type {FormGroup}
   */
  mercanciaForm!: FormGroup;

  /**
   * Estado actual de la mercancía basado en el modelo `MercanciaForm`.
   * Contiene la información manejada dentro del componente.
   * @type {MercanciaForm}
   */
      mercanciaState!: MercanciaForm;

  /**
   * Configuración para el select de unidad de medida.
   * Contiene las opciones disponibles para seleccionar la unidad de medida.
   * @type {Catalogo[]}
   */
  unidadMedida: Catalogo[] = [];

  /**
   * Subject para notificar la destrucción del componente.
   * Utilizado para gestionar la limpieza de recursos.
   * @type {Subject<void>}
   * @private
   */
    private unsubscribe$: Subject<void> = new Subject();
    
  /**
   * Estado de la sección actual.
   * Contiene información sobre el estado de la sección.
   * @type {SeccionLibState}
   * @private
   */
    private seccion!: SeccionLibState;

  /**
   * Constructor del componente.
   * Inicializa servicios y el formulario reactivo.
   * @param {FormBuilder} fb - Constructor para formularios reactivos.
   * @param {Router} router - Servicio para navegación.
   * @param {CatalogosService} catalogosService - Servicio para obtener catálogos.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query para el estado del trámite.
   * @param {TramiteStore} tramiteStore - Store para manejar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Query para el estado de la sección.
   */ 
    constructor(
      @Inject(FormBuilder) private fb: FormBuilder,
      private router: Router,
      private readonly catalogosService: CatalogosService,
      private tramiteStoreQuery: TramiteStoreQuery,
      private tramiteStore: TramiteStore,
      private seccionQuery: SeccionLibQuery,
    ) {
      // Se puede agregar aquí la lógica del constructor si es necesario
    }

    /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario y carga los datos necesarios.
   */
  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState) => {
        this.mercanciaState = seccionState.MercanciaState;
      })
    ).subscribe();

    this.mercanciaForm = this.fb.group({
      consecutivo: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(REGEX_SOLO_DIGITOS)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250), Validators.pattern(REGEX_IMPORTE_PAGO)]],
      cantidad: ['', [Validators.required, Validators.maxLength(16), Validators.pattern(REGEX_SOLO_DIGITOS)]],
      unidadMedida: ['', Validators.required],
      peso: ['', [Validators.required, Validators.maxLength(16), Validators.pattern(REGEX_SOLO_DIGITOS)]]
    });
    this.obtenerUnidadDesplegable();

    /**
     * Se suscribe a los cambios en el estado de la solicitud de trámite.
     * Actualiza el formulario con los datos obtenidos del estado.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
    .pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState: TramiteState) => {
        if (seccionState) {
          this.mercanciaState = seccionState?.MercanciaState;
          this.mercanciaForm.patchValue(this.mercanciaState);
        }
      })
    ).subscribe();

    /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     */
    this.mercanciaForm.statusChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.mercanciaForm.value };
          this.tramiteStore.setMercanciaTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    /**
     * Se suscribe a los cambios en el estado de la sección.
     * Almacena la información de la sección en la propiedad `seccion`.
     */

    this.seccionQuery.selectSeccionState$
    .pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState) => {
        this.seccion = seccionState;
      })
    )
    .subscribe();
  }

  /**
   * Obtiene las listas desplegables.
   * Llama al método para cargar las opciones de unidad de medida.
   */
  obtenerUnidadDesplegable(): void {
    this.obtenerUnidadMedidaSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * Realiza una llamada al servicio para cargar las opciones.
   */
  obtenerUnidadMedidaSelectList(): void {
    this.catalogosService
    .obtenerUnidadDesplegable('unidad-de-medida.json')
    .subscribe({
      next: (data: Catalogo[]) => {
        this.unidadMedida = data;
      },
      error: (error) => {
        console.error('Error al obtener la unidad de medida:', error);
      },
    });
  }

  /**
   * Cambia la pestaña activa en la interfaz.
   * @param {number} index - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(index: number): void {
    const CURRENT_URL = this.router.url;
    if (CURRENT_URL.includes('pago')) {
      this.router.navigate([
        '/pago/acta-de-hechos/solicitud',
      ], { queryParams: { tab: index } });
    }else{
      this.router.navigate([
        '/agace/acta-de-hechos/solicitud',
      ], { queryParams: { tab: index } });
    }
  }

  /**
   * Resetea el formulario de mercancías destruidas.
   * Limpia todos los campos del formulario.
   */
  cancelarMercancia(): void {
    this.mercanciaForm.reset();
  }

  /**
   * Método de limpieza al destruir el componente.
   * Libera los recursos y cancela las suscripciones.
   */
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}
