import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogos.service';
import { CafExportFormaInt} from '../../modelos/datos-de-interfaz.model';
import { TramiteState, TramiteStore } from '../../estados/tramite290101.store';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { SeccionLibQuery} from '@libs/shared/data-access-user/src';
import { SeccionLibState} from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bodegas',
  templateUrl: './cafe-de-exportadores.component.html',
})
export class CafeDeExportadoresComponent implements OnInit {
  cafeExportForm!: FormGroup;
  cafeExportFormState!: CafExportFormaInt;

  clasificacion: CatalogosSelect = {
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
    private location: Location,
    private fb: FormBuilder,
    private catalogosService :CatalogosService ,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
  ) {}
  
  ngOnInit(): void {

    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.cafeExportFormState = seccionState.CafeExportFormState;
      })
    ).subscribe();

    this.iniciarFormulario();
    this.cargarClasificacion();

    /**
    * Se suscribe a los cambios en el estado de la solicitud de trámite.
    * Actualiza el formulario con los datos obtenidos del estado.
    */
    this.tramiteStoreQuery.selectSolicitudTramite$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState: TramiteState) => {
        if (seccionState) {
          this.cafeExportFormState = seccionState?.CafeExportFormState;
          this.cafeExportForm.patchValue(this.cafeExportFormState);
        }
      })
    ).subscribe();
    /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     */
    this.cafeExportForm.statusChanges
    .pipe(
      takeUntil(this.destroyNotifier$),
      delay(10),
      tap(() => {
        const ACTIVE_STATE = { ...this.cafeExportForm.value };
        this.tramiteStore.setCafExportTramite(ACTIVE_STATE);
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
     this.cafeExportForm = this.fb.group({
      descripcionMercancia: ['', [Validators.required, Validators.maxLength(15)]],
      catalogoDClave: ['', Validators.required],
      clasificacion: [''],
      porcentajeConcentracion: ['', Validators.required]
    });
  }

  cargarClasificacion(): void {
    this.catalogosService.cargarClasificacion()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.clasificacion = {
            labelNombre: 'Clasificacion/Tipo*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  
  cancelarBodega(): void {
    this.cafeExportForm.reset();
    
  }


  
}