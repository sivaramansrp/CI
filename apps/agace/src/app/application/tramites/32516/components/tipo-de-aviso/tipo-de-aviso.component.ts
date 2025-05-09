import { ALFANUMERICO_ESPACIO } from '@libs/shared/data-access-user/src';
import { Catalogo} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HECHOS_SERVICIO } from '../../modelos/acta-de-hechos.model';
import { HechosInfo } from '../../modelos/acta-de-hechos.model';
import { HechosTablaServicios } from '../../servicios/hechos-tabla.service';
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
    InputRadioComponent
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
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

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
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
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
    }else{
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
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState) => {
        this.solicitudState = seccionState.SolicitudState;
      })
    ).subscribe();

    this.solicitudForm = this.fb.group({
      cantidadBienes: ['', [Validators.required]],
      descripcionGenerica1: ['', [Validators.required]],
      descripcionGenerica2: ['', [Validators.required]],
      descripcionGenerica3: ['', [Validators.required, Validators.maxLength(250), Validators.pattern(ALFANUMERICO_ESPACIO)]],
      capacidadAlmacenamiento: ['', [Validators.required]]
    });

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
          takeUntil(this.unsubscribe$),
          map((seccionState: TramiteState) => {
            if (seccionState) {
              this.solicitudState = seccionState?.SolicitudState;
              this.solicitudForm.patchValue(this.solicitudState);
            }
          })
        ).subscribe();
    /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     */
      this.solicitudForm.statusChanges
        .pipe(
          takeUntil(this.unsubscribe$),
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
            takeUntil(this.unsubscribe$),
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
    this.solicitudForm.get('cantidadBienes')?.valueChanges.subscribe(value => {
      const DESCRIPCION_GENERICA_3 = this.solicitudForm.get('descripcionGenerica3');
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
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (data: Catalogo[]) => {
        this.actaDeHechos = data;
      },
      error: (error) => {
        console.error('Error al obtener el menú desplegable:', error);
      },
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
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Catalogo[]) => {
          this.levantarActa = data;
        });
    }
 

  /**
   * Método para buscar y cargar los datos de las tablas.
   * Realiza una llamada al servicio para obtener los datos de hechos.
   */
    buscarDatos(): void {
      this.hechosTablaServicios.obtenerDatos()
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (response: { hechosApiDatos: HechosInfo[]}) => {
            if (response && Array.isArray(response.hechosApiDatos)) {
              this.hechosTableDatos = response.hechosApiDatos;
            } else {
              console.error("La respuesta de la API no tiene el formato esperado: ", response);
            }
          },
          error: (error) => {
            console.error("Error al obtener datos: ", error);
          }
        });
    }
  
  /**
   * Maneja la limpieza de recursos antes de destruir el componente.
   * Completa el Subject `unsubscribe$` para evitar fugas de memoria.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
