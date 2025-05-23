import { ActivatedRoute } from '@angular/router';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogos.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { RegionFormaInt} from '../../modelos/datos-de-interfaz.model';
import { Router } from '@angular/router';
import { SeccionLibQuery} from '@libs/shared/data-access-user/src';
import { SeccionLibState} from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TramiteState } from '../../estados/tramite290101.store';
import { TramiteStore } from '../../estados/tramite290101.store';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
})
export class RegionesComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos de regiones.
   * @type {FormGroup}
   */
  regionForm!: FormGroup;



  /**
   * Estado del formulario de regiones.
   * @type {RegionFormaInt}
   */
  regionFormaState!: RegionFormaInt;

  /**
   * Catálogo de productos de café.
   * @type {CatalogosSelect}
   */
  productoCafe: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de estados.
   * @type {CatalogosSelect}
   */
  estado: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de tipos de café.
   * @type {CatalogosSelect}
   */
  descripTipoCafe: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Estado de la sección actual.
   * Contiene información sobre el estado de la sección.
   * @type {SeccionLibState}
   */
  private seccion!: SeccionLibState;

  /**
   * Subject para notificar la destrucción del componente.
   * Utilizado para gestionar la limpieza de recursos.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param {Router} router - Servicio de enrutamiento de Angular.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {CatalogosService} catalogosService - Servicio para cargar catálogos.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Consulta del estado del trámite.
   * @param {TramiteStore} tramiteStore - Almacén del estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Consulta del estado de la sección.
   * @param {SeccionLibStore} seccionStore - Almacén del estado de la sección.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private catalogosService: CatalogosService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private activateRoute: ActivatedRoute,
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }


  /**
   * Cambia la pestaña activa en la interfaz.
   * @param {number} index - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(index: number): void {
     const REGIONES_DATOS= {
      TABLA_Columna_1: this.regionForm.value.estado,
      TABLA_Columna_2: this.regionForm.value.productoCafe,
      TABLA_Columna_3: this.regionForm.value.descRegionCompra,
      TABLA_Columna_4: this.regionForm.value.descripTipoCafe,
      TABLA_Columna_5: this.regionForm.value.volumen,
      estatus: true, 
       
    };
    this.tramiteStore.setRegionesTabla([REGIONES_DATOS]);


    this.router.navigate(['../cafe-exportadores'], { queryParams: { tab: index } ,
      relativeTo: this.activateRoute });

  }
  

  /**
   * Método de inicialización del componente.
   * Configura el formulario y carga los catálogos necesarios.
   */
  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(seccionState => {
        this.regionFormaState = seccionState.RegionFormatState;
      });

    this.iniciarFormulario();
    this.cargarEstadoCatalog();
    this.cargarProductoCafe();
    this.cargarTipoDeCafe();

      /**
      * Se suscribe a los cambios en el estado de la solicitud de trámite.
      * Actualiza el formulario con los datos obtenidos del estado.
      */
      this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: TramiteState) => {
          if (seccionState) {
            this.regionFormaState = seccionState?.RegionFormatState;
            this.regionForm.patchValue(this.regionFormaState);
          }
        })
      ).subscribe();
      /**
       * Se suscribe a los cambios en el estado del formulario.
       * Después de un breve retraso, actualiza el estado de la solicitud en el store.
       */
      this.regionForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.regionForm.value };
          this.tramiteStore.setRegionTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    this.seccionQuery.selectSeccionState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(seccionState => {
        this.seccion = seccionState;
      });
  }

  /**
   * Inicializa el formulario reactivo.
   */
  iniciarFormulario(): void {
    this.regionForm = this.fb.group({
      estado: ['', Validators.required],
      productoCafe: ['', Validators.required],
      descRegionCompra: ['', [Validators.required]],
      descripTipoCafe: ['', Validators.required],
      volumen: ['', Validators.required],
    });
  }

  /**
   * Carga el catálogo de productos de café.
   */
  cargarProductoCafe(): void {
    this.catalogosService.cargarBodegaPropiaAlquilad()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(resp => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.productoCafe = {
            labelNombre: 'Café compra',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Carga el catálogo de tipos de café.
   */
  cargarTipoDeCafe(): void {
    this.catalogosService.cargarTipoDeCafe()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(resp => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.descripTipoCafe = {
            labelNombre: 'Tipo de café',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Carga el catálogo de estados.
   */
  cargarEstadoCatalog(): void {
    this.catalogosService.cargarEstadoCatalog()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(resp => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.estado = {
            labelNombre: 'Estado',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Resetea el formulario de regiones.
   */
  cancelarBodega(): void {
    this.regionForm.reset();
  }

  /**
   * Método de limpieza al destruir el componente.
   * Libera los recursos y cancela las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}