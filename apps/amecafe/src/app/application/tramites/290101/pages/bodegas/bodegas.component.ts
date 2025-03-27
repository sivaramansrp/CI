import { BodegasFormaInt} from '../../modelos/datos-de-interfaz.model';
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
  templateUrl: './bodegas.component.html',
})
export class BodegasComponent implements OnInit {
  /**
   * Formulario reactivo para los datos de bodegas.
   * @type {FormGroup}
   */
  bodegaForm!: FormGroup;

  /**
   * Estado del formulario de bodegas.
   * Contiene la información capturada en el formulario.
   * @type {BodegasFormaInt}
   */
  bodegasFormaState!: BodegasFormaInt;

  /**
   * Catálogo de opciones para propiedad o alquiler.
   * Contiene las opciones disponibles para indicar si la bodega es propia o alquilada.
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

  /**
   * Método de inicialización del componente.
   * Configura el formulario y carga los catálogos necesarios.
   */
  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(seccionState => {
        this.bodegasFormaState = seccionState.BodegasFormaState;
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
            this.bodegasFormaState = seccionState?.BodegasFormaState;
            this.bodegaForm.patchValue(this.bodegasFormaState);
          }
        })
      )
      .subscribe();

    /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     */
    this.bodegaForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.bodegaForm.value };
          this.tramiteStore.setBodegasTramite(ACTIVE_STATE);
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
    this.bodegaForm = this.fb.group({
      razonSocial: ['', [Validators.required, Validators.maxLength(200)]],
      propAlquil: ['', Validators.required],
      calle: ['', [Validators.required, Validators.maxLength(100)]],
      numeroExterior: ['', Validators.required],
      numeroInterior: ['', Validators.maxLength(50)],
      colonia: ['', [Validators.required, Validators.maxLength(100)]],
      estado: ['', Validators.required],
      entidadNombre: [''],
      codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
      capacidadAlmacenaje: ['', [Validators.required, Validators.maxLength(20)]],
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
   * Resetea el formulario de bodegas.
   */
  cancelarBodega(): void {
    this.bodegaForm.reset();
  }
}