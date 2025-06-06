import { ActivatedRoute } from '@angular/router';
import { CafExportFormaInt} from '../../modelos/datos-de-interfaz.model';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogos.service';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
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
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   * @type {boolean}
   */
  @Input() esFormularioSoloLectura!: boolean;

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

  /**
   * Constructor del componente.
   * Inicializa los servicios y dependencias necesarias.
   * @param {Router} router - Servicio de enrutamiento para navegar entre páginas.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   * @param {CatalogosService} catalogosService - Servicio para cargar catálogos.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Consulta del estado del trámite.
   * @param {TramiteStore} tramiteStore - Store para gestionar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Consulta del estado de la sección.
   * @param {SeccionLibStore} seccionStore - Store para gestionar el estado de la sección.
   * @param {ActivatedRoute} activatedRoute - Servicio para obtener información de la ruta activa.
   * @param {ConsultaioQuery} consultaioQuery - Consulta Akita para manejar y actualizar el estado de una sección.
   */
  constructor(private router: Router,
    private fb: FormBuilder,
    private catalogosService: CatalogosService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private activatedRoute: ActivatedRoute,
    private consultaioQuery: ConsultaioQuery,
  ) {
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

      /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

    /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.cafeExportForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.cafeExportForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

    inicializarFormulario(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.cafeExportFormState = seccionState.CafeExportFormState;
        })
      )
      .subscribe()
      this.cafeExportForm = this.fb.group({
        descripcionMercancia: ['', [Validators.required, Validators.maxLength(15)]],
        clasificacion: ['', Validators.required],
        porcentajeConcentracion: ['', Validators.required],
      });
  }

    /**
   * Cambia la pestaña activa en la interfaz.
   * @param {number} index - Índice de la pestaña a seleccionar.
   */
    seleccionaTab(index: number): void {
      const CAFE_EXPORTADORES={
        TABLA_Columna_1: this.cafeExportForm.value.descripcionMercancia,
        TABLA_Columna_2: this.cafeExportForm.value.clasificacion,
        TABLA_Columna_3: this.cafeExportForm.value.porcentajeConcentracion,
        estatus:true,
      }
      this.tramiteStore.setCafeExportacionTabla([CAFE_EXPORTADORES]);

      this.router.navigate(['../cafe-exportadores'], { queryParams: { tab: index },
        relativeTo: this.activatedRoute,});
    }
  
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(seccionState => {
        this.cafeExportFormState = seccionState.CafeExportFormState;
      });
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
   * Carga la clasificación o tipo de café desde el servicio de catálogos.
   * Se suscribe a los cambios y actualiza el catálogo en el formulario.
   */

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

  
  /**
   * Cancela la operación actual y restablece el formulario.
   */
  cancelarBodega(): void {
    takeUntil(this.destroyNotifier$)
    this.cafeExportForm.reset();
  }


  
}