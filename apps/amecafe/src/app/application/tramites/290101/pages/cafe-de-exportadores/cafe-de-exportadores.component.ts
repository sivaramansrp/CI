import { CafExportFormaInt} from '../../modelos/datos-de-interfaz.model';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogos.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
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
  selector: 'app-bodegas',
  templateUrl: './cafe-de-exportadores.component.html',
})
export class CafeDeExportadoresComponent implements OnInit {
  /**
   * Formulario reactivo para los datos de café de exportadores.
   * @type {FormGroup}
   */
  cafeExportForm!: FormGroup;

  /**
   * Estado del formulario de café de exportadores.
   * Contiene la información capturada en el formulario.
   * @type {CafExportFormaInt}
   */
  cafeExportFormState!: CafExportFormaInt;

  /**
   * Catálogo de clasificación o tipo.
   * Contiene las opciones disponibles para la clasificación del café.
   * @type {CatalogosSelect}
   */
  clasificacion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de estados.
   * Contiene las opciones disponibles para los estados.
   * @type {CatalogosSelect}
   */
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
    private fb: FormBuilder,
    private catalogosService :CatalogosService ,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

    /**
   * Cambia la pestaña activa en la interfaz.
   * @param {number} index - Índice de la pestaña a seleccionar.
   */
    seleccionaTab(index: number): void {
      this.router.navigate(['/amecafe/cafe-exportadores/cafe-exportadores'], { queryParams: { tab: index } });
    }
  
  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(seccionState => {
        this.cafeExportFormState = seccionState.CafeExportFormState;
      });

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
    )
    .subscribe();
    /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     * También asegura que el botón "Guardar" se habilite/deshabilite correctamente.
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

  /**
   * Inicializa el formulario reactivo con validaciones.
   */
  iniciarFormulario(): void {
    this.cafeExportForm = this.fb.group({
      descripcionMercancia: ['', [Validators.required, Validators.maxLength(15)]],
      clasificacion: ['', Validators.required],
      porcentajeConcentracion: ['', Validators.required],
    });
  }

  cargarClasificacion(): void {
    this.catalogosService.cargarClasificacion()
     .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.clasificacion = {
            labelNombre: 'Clasificacion/Tipo',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  
  cancelarBodega(): void {
    takeUntil(this.destroyNotifier$)
    this.cafeExportForm.reset();
  }


  
}