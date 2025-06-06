import { ALFANUMERICO_ESPACIO } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HECHOS_SERVICIO } from '../../modelos/acta-de-hechos.model';
import { HechosInfo } from '../../modelos/acta-de-hechos.model';
import { HechosTablaServicios } from '../../servicios/hechos-tabla.service';
import { Input } from '@angular/core';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { SolicitudForm } from '../../modelos/acta-de-hechos.model';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
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
 * Componente para manejar el tipo de aviso en el trámite.
 * Proporciona funcionalidad para gestionar formularios, tablas y datos relacionados.
 */
@Component({
  selector: 'tipo-de-aviso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
  ],
  templateUrl: './tipo-de-aviso.component.html',
  styleUrls: ['./tipo-de-aviso.component.scss'],
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para manejar los datos de la solicitud.
   * @type {FormGroup}
   */
  solicitudForm!: FormGroup;

  /**
   * Estado actual de la solicitud basado en el modelo `DatosDeLaSolicitudInt`.
   * Contiene la información manejada dentro del componente.
   * @type {SolicitudForm}
   */
  solicitudState!: SolicitudForm;

  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   * @type {boolean}
   */
  @Input() esFormularioSoloLectura!: boolean;

  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} destroyNotifier$
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Configuración para el select de unidad de medida.
   * @property {Catalogo[]} actaDeHechos
   */
  actaDeHechos: Catalogo[] = [];

  /**
   * Configuración para el select de levantar acta.
   * @property {Catalogo[]} levantarActa
   */
  levantarActa: Catalogo[] = [];

  /**
   * Tipo de selección de la tabla utilizando checkbox.
   * @type {TablaSeleccion}
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla para la lista de hechos.
   * Define las propiedades y formato de las columnas en la tabla de hechos.
   * @type {ConfiguracionColumna<HechosInfo>[]}
   */
  hechosTabla: ConfiguracionColumna<HechosInfo>[] = HECHOS_SERVICIO;

  /**
   * Datos procesados para la tabla de hechos.
   * Contiene la información de las hechos asociadas al trámite,
   * listos para su visualización en la interfaz de usuario.
   * @type {HechosInfo[]}
   */
  hechosTableDatos: HechosInfo[] = [];

  /**
   * Estado de la sección actual.
   * Contiene información sobre el estado de la sección.
   * @type {SeccionLibState}
   * @private
   */
  private seccion!: SeccionLibState;

  /**
   * Opciones para el componente de radio buttons.
   * Contiene un arreglo de objetos con etiquetas y valores para las opciones.
   * @property {Array<{ label: string; value: string }>} radioOpcion
   */

  radioOpcion: { label: string; value: string }[] = [];

  /**
   * Constructor del componente.
   * Inicializa servicios y el formulario reactivo.
   * @param {FormBuilder} fb - Constructor para formularios reactivos.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar solicitudes.
   * @param {CatalogosService} catalogosService - Servicio para obtener catálogos.
   * @param {HechosTablaServicios} hechosTablaServicios - Servicio para obtener datos de la tabla.
   * @param {Router} router - Servicio para navegación.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query para el estado del trámite.
   * @param {TramiteStore} tramiteStore - Store para manejar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Query para el estado de la sección.
   * @param {ChangeDetectorRef} cdr - Servicio para detectar y optimizar cambios en la vista.
   * @param {ConsultaioQuery} consultaioQuery - Consulta Akita para manejar y actualizar el estado de una sección.
   */
  constructor(
    private fb: FormBuilder,
    private readonly catalogosService: CatalogosService,
    private readonly hechosTablaServicios: HechosTablaServicios,
    private router: Router,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private cdr: ChangeDetectorRef,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
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
      this.solicitudForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.solicitudForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  inicializarFormulario(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState.SolicitudState;
        })
      )
      .subscribe();

    this.solicitudForm = this.fb.group({
      cantidadBienes: ['', [Validators.required]],
      descripcionGenerica1: ['', [Validators.required]],
      descripcionGenerica2: ['', [Validators.required]],
      descripcionGenerica3: [
        '',
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.pattern(ALFANUMERICO_ESPACIO),
        ],
      ],
      capacidadAlmacenamiento: ['', [Validators.required]],
    });
  }
  /**
   * Método para navegar a la página de agregar.
   * Redirige a diferentes rutas según la URL actual.
   */
  irAPaginaAgregar(): void {
    const CURRENT_URL = this.router.url;
    if (CURRENT_URL.includes('pago')) {
      this.router.navigate([
        '/pago/acta-de-hechos/mercancias-destruidas-forma',
      ]);
    } else {
      this.router.navigate([
        '/agace/acta-de-hechos/mercancias-destruidas-forma',
      ]);
    }
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se utiliza para inicializar el formulario y cargar los datos necesarios.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState.SolicitudState;
        })
      )
      .subscribe();

    this.handleConditionalValidation();
    this.obtenerListasDesplegables();
    this.obtenerLevantarActaDesplegables();
    this.radioOpcion = this.catalogosService.RadioOpcion;

    /**
     * Se suscribe a los cambios en el estado de la solicitud de trámite.
     * Actualiza el formulario con los datos obtenidos del estado.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: TramiteState) => {
          if (seccionState) {
            this.solicitudState = seccionState?.SolicitudState;
            this.solicitudForm.patchValue(this.solicitudState);
          }
        })
      )
      .subscribe();
    /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     */
    this.solicitudForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.solicitudForm.value };
          this.tramiteStore.setSolicitudTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    this.buscarDatos();

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
   * Maneja la validación condicional en el formulario.
   * Agrega o elimina validadores según el valor de `cantidadBienes`.
   * @private
   */
  private handleConditionalValidation(): void {
    this.solicitudForm
      .get('cantidadBienes')
      ?.valueChanges.subscribe((value) => {
        const DESCRIPCION_GENERICA_3 = this.solicitudForm.get(
          'descripcionGenerica3'
        );
        if (value === '1') {
          DESCRIPCION_GENERICA_3?.setValidators([Validators.required]);
        } else {
          DESCRIPCION_GENERICA_3?.clearValidators();
        }
        DESCRIPCION_GENERICA_3?.updateValueAndValidity();
      });
  }

  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables(): void {
    this.obtenerHechosSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerHechosSelectList
   */
  obtenerHechosSelectList(): void {
    this.catalogosService
      .obtenerMenuDesplegable('acta-de-hechos.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data: Catalogo[]) => {
          this.actaDeHechos = data;
        }
      });
  }

  /**
   * Obtiene las listas desplegables para levantar acta.
   * @method obtenerLevantarActaDesplegables
   */
  obtenerLevantarActaDesplegables(): void {
    this.obtenerLevantarActaSelectList();
  }

  /**
   * Obtiene la lista para el select de levantar acta.
   * @method obtenerLevantarActaSelectList
   */
  obtenerLevantarActaSelectList(): void {
    this.catalogosService
      .obtenerLevantarActaDesplegable('levantar.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]) => {
        this.levantarActa = data;
      });
  }

  /**
   * Método para buscar y cargar los datos de las tablas.
   * Realiza una llamada al servicio para obtener los datos de hechos.
   */
  buscarDatos(): void {
    this.hechosTablaServicios
      .obtenerDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response: { hechosApiDatos: HechosInfo[] }) => {
          if (response && Array.isArray(response.hechosApiDatos)) {
            this.hechosTableDatos = response.hechosApiDatos;
          }
        }
      });
  }

  /**
   * Maneja la limpieza de recursos antes de destruir el componente.
   * Completa el Subject `destroyNotifier$` para evitar fugas de memoria.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
