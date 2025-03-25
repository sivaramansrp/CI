import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogos.service';
import { RegionFormaInt} from '../../modelos/datos-de-interfaz.model';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeccionLibQuery} from '@libs/shared/data-access-user/src';
import { SeccionLibState} from '@libs/shared/data-access-user/src';
import { TramiteState } from '../../estados/tramite290101.store';
import { TramiteStore } from '../../estados/tramite290101.store';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
})
export class RegionesComponent implements OnInit {
  regionForm!: FormGroup;

  regionFormaState!: RegionFormaInt;

  productoCafe: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };
  estado: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };
  descripTipoCafe: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };


  /**
   * Subject para manejar la desuscripción de observables.
   * Utilizado para evitar fugas de memoria.
   * @type {Subject<void>}
   */
  private unsubscribe$ = new Subject<void>();

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

  constructor(private router: Router,
    private fb: FormBuilder,
    private catalogosService:CatalogosService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
  ) {}
  navigateToCafeExportadores() {
    this.router.navigate(['/pago/cafe-exportadores/cafe-exportadores']);
    
  }
  ngOnInit(): void {
      this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.regionFormaState = seccionState.RegionFormatState;
        })
      ).subscribe();

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

      /**
       * Se suscribe a los cambios en el estado de la sección.
       * Almacena la información de la sección en la propiedad `seccion`.
       * Para el botón de validación Continuar
       */

      this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    }

  iniciarFormulario() : void {
    this.regionForm = this.fb.group({
      estado: ['', Validators.required],
      productoCafe:['', Validators.required],
      descRegionCompra: ['', [Validators.required]],
      descripTipoCafe:['', Validators.required],
      volumen: ['', [Validators.required]]
    });
  }

  cargarProductoCafe(): void {
    this.catalogosService.cargarBodegaPropiaAlquilad()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.productoCafe = {
            labelNombre: 'Café compra*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  cargarTipoDeCafe(): void {
    this.catalogosService.cargarTipoDeCafe()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.descripTipoCafe = {
            labelNombre: 'Tipo de café*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  cargarEstadoCatalog(): void {
    this.catalogosService.cargarEstadoCatalog()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.estado = {
            labelNombre: 'Estado*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  cancelarBodega(): void {
    this.regionForm.reset();
    
  }


  
}