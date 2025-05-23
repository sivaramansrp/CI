import { ActivatedRoute } from '@angular/router';
import { BeneficiosFormaInt} from '../../modelos/datos-de-interfaz.model';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogos.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
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
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
})
export class BeneficiosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos de beneficios.
   * @type {FormGroup}
   */
  beneficiosForm!: FormGroup;

  /**
   * Estado del formulario de beneficios.
   * Contiene la información capturada en el formulario.
   * @type {BeneficiosFormaInt}
   */
  beneficiosFormaState!: BeneficiosFormaInt;

  /**
   * Catálogo de opciones para propiedad o alquiler.
   * Contiene las opciones disponibles para indicar si el beneficio es propio o alquilado.
   * @type {CatalogosSelect}
   */
  propAlquil: CatalogosSelect = {
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
    const BENEFICIOS_DATOS = {
      TABLA_Columna_1:this.beneficiosForm.value.razonSocial,
      TABLA_Columna_2:this.beneficiosForm.value.propAlquil,
      TABLA_Columna_3:this.beneficiosForm.value.calle,
      TABLA_Columna_4:this.beneficiosForm.value.numeroExterior,
      TABLA_Columna_5:this.beneficiosForm.value.numeroInterior,
      TABLA_Columna_6:this.beneficiosForm.value.colonia,
      TABLA_Columna_7:this.beneficiosForm.value.estado,
      TABLA_Columna_8:this.beneficiosForm.value.codigoPostal,
      TABLA_Columna_9:this.beneficiosForm.value.capacidadAlmacenaje,
      TABLA_Columna_10:this.beneficiosForm.value.volumenAlmacenaje,
      estatus: true,
    };
    this.tramiteStore.setBeneficiosTabla([BENEFICIOS_DATOS]);

    this.router.navigate(['../cafe-exportadores'], { queryParams: { tab: index },
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
        this.beneficiosFormaState = seccionState.BeneficiosFormaState;
      });

    this.iniciarFormulario();
    this.cargarEstadoCatalog();
    this.cargarBodegaPropiaAlquilad();

    /**
     * Se suscribe a los cambios en el estado de la solicitud de trámite.
     * Actualiza el formulario con los datos obtenidos del estado.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: TramiteState) => {
          if (seccionState) {
            this.beneficiosFormaState = seccionState?.BeneficiosFormaState;
            this.beneficiosForm.patchValue(this.beneficiosFormaState);
          }
        })
      )
      .subscribe();
        /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     */
        this.beneficiosForm.statusChanges
        .pipe(
          takeUntil(this.destroyNotifier$),
          delay(10),
          tap(() => {
            const ACTIVE_STATE = { ...this.beneficiosForm.value };
            this.tramiteStore.setBeneficiosTramite(ACTIVE_STATE);
          })
        )
        .subscribe();

    /**
     * Se suscribe a los cambios en el estado de la sección.
     * Almacena la información de la sección en la propiedad `seccion`.
     * Para el botón de validación Continuar.
     */
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map(seccionState => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario reactivo.
   */
  iniciarFormulario(): void {
    this.beneficiosForm = this.fb.group({
      razonSocial: ['', [Validators.required, Validators.maxLength(200)]],
      propAlquil: ['', [Validators.required]],
      calle: ['', [Validators.required, Validators.maxLength(100)]],
      numeroExterior: ['', Validators.required],
      numeroInterior: ['', Validators.maxLength(50)],
      colonia: ['', [Validators.required, Validators.maxLength(100)]],
      estado: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
      capacidadAlmacenaje: ['', [Validators.required, Validators.maxLength(20)]],
      volumenAlmacenaje: ['', [Validators.required]],
    });
  }

  /**
   * Carga el catálogo de opciones para propiedad o alquiler.
   */
  cargarBodegaPropiaAlquilad(): void {
    this.catalogosService.cargarBodegaPropiaAlquilad()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(resp => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.propAlquil = {
            labelNombre: 'Propia o alquilada',
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
   * Cancela la operación actual y restablece el formulario.
   */
  cancelarBodega(): void {
    this.beneficiosForm.reset();
  }

 /**
 * @method ngOnDestroy
 * @description Hook del ciclo de vida que se llama cuando el componente es destruido.
 * Garantiza la limpieza adecuada emitiendo un valor al subject `destroyNotifier$` 
 * y completándolo para liberar recursos y prevenir fugas de memoria.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}