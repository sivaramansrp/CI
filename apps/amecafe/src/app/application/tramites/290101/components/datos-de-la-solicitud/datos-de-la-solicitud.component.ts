import { BENEFICIOS_SERVICIO } from '../../modelos/cafe-exportadores.model';
import { BODEGAS_SERVICIO } from '../../modelos/cafe-exportadores.model';
import { BeneficiosInfo } from '../../modelos/cafe-exportadores.model';
import { BodegasInfo } from '../../modelos/cafe-exportadores.model';
import { CAFE_EXPORTADORES } from '../../modelos/cafe-exportadores.model';
import { CafeExporacionInfo } from '../../modelos/cafe-exportadores.model';
import { CatalogosService } from '../../servicios/catalogos.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { DatosSolicitudFormaInt } from '../../modelos/datos-de-interfaz.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductoTablaServicios } from '../../servicios/regiones-compra.service';
import { REGIONES_SERVICIO } from '../../modelos/cafe-exportadores.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RegionesInfo } from '../../modelos/cafe-exportadores.model';
import { Router } from '@angular/router';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TramiteState } from '../../estados/tramite290101.store';
import { TramiteStore } from '../../estados/tramite290101.store';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputRadioComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para capturar los datos de la solicitud.
   * @type {FormGroup}
   */
  datosSolicitudForma!: FormGroup;

  /**
* Estado actual de la solicitud basado en el modelo `DatosSolicitudFormaInt`.
* Contiene la información manejada dentro del componente.
* @type {DatosSolicitudFormaInt}
*/
  solicitudState!: DatosSolicitudFormaInt;

  /**
 * Opciones para el componente de radio buttons.
 * Contiene un arreglo de objetos con etiquetas y valores para las opciones.
 * @property {Array<{ label: string; value: string }>} radioOpcion
 */

  radioOpcion: { label: string; value: string }[] = [];
  /**
   * Valor seleccionado en el radio button de exención de pago.
   * @property {string} valorSeleccionado
   */
  valorSeleccionado: string = 'true';

  /**
   * Tipo de selección de la tabla utilizando un radio button.
   * @type {TablaSeleccion}
   */
  tablaSeleccionRadio: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Tipo de selección de la tabla utilizando checkbox.
   * @type {TablaSeleccion}
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla para la lista de regiones.
   * Define las propiedades y formato de las columnas en la tabla de regiones.
   * @type {ConfiguracionColumna<RegionesInfo>[]}
   */
  regionesTabla: ConfiguracionColumna<RegionesInfo>[] = REGIONES_SERVICIO;

  /**  
   * Datos procesados para la tabla de regiones.  
   * Contiene la información de las regiones asociadas al trámite,  
   * listos para su visualización en la interfaz de usuario.  
   * @type {RegionesInfo[]}  
   */
  regionesTableDatos: RegionesInfo[] = [];

  /**  
   * Datos obtenidos desde la API relacionados con las regiones de compra.  
   * Se almacenan antes de ser procesados para su presentación en la tabla.  
   * @type {RegionesInfo[]}  
   */
  regionesCompraApiDatos: RegionesInfo[] = [];


  /**
   * Configuración de las columnas de la tabla para la lista de beneficios.
   * Define las propiedades y formato de las columnas en la tabla de beneficios.
   * @type {ConfiguracionColumna<BeneficiosInfo>[]}
   */
  beneficiosTabla: ConfiguracionColumna<BeneficiosInfo>[] = BENEFICIOS_SERVICIO;

  /**  
   * Datos procesados para la tabla de beneficios.  
   * Contiene la información de los beneficios asociados al trámite,  
   * listos para su visualización en la interfaz de usuario.  
   * @type {BeneficiosInfo[]}  
   */
  beneficiosTableDatos: BeneficiosInfo[] = [];

  /**  
   * Datos obtenidos desde la API relacionados con los beneficios.  
   * Se almacenan antes de ser procesados para su presentación en la tabla.  
   * @type {BeneficiosInfo[]}  
   */
  beneficiosApiDatos: BeneficiosInfo[] = [];

  /**
   * Configuración de las columnas de la tabla para la lista de bodegas.
   * Define las propiedades y formato de las columnas en la tabla de bodegas.
   * @type {ConfiguracionColumna<BodegasInfo>[]}
   */
  bodegasTabla: ConfiguracionColumna<BodegasInfo>[] = BODEGAS_SERVICIO;

  /** 
   * Datos procesados para la tabla de bodegas.  
   * Se utilizan para mostrar la información en la interfaz de usuario.  
   */
  bodegasTableDatos: BodegasInfo[] = [];

  /** 
   * Datos obtenidos desde la API relacionados con las bodegas.  
   * Se almacenan antes de ser procesados para su visualización en la tabla.  
   */
  bodegasApiDatos: BodegasInfo[] = [];


  /**
   * Configuración de las columnas de la tabla para la lista de café de exportación.
   * Define las propiedades y formato de las columnas en la tabla de café de exportación.
   * @type {ConfiguracionColumna<CafeExporacionInfo>[]}
   */
  cafeExporacionTabla: ConfiguracionColumna<CafeExporacionInfo>[] = CAFE_EXPORTADORES;

  /** 
   * Datos procesados para la tabla de exportación de café.  
   * Se utiliza para mostrar la información en la interfaz de usuario.  
   */
  cafeExporacionTableDatos: CafeExporacionInfo[] = [];

  /** 
   * Datos obtenidos desde la API relacionados con la exportación de café.  
   * Se almacenan antes de ser procesados para su visualización en la tabla.  
   */
  cafeExportacionApiDatos: CafeExporacionInfo[] = [];


  /**
   * Suscripciones activas en el componente.
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

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
   * Constructor de la clase.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {ProductoTablaServicios} productoTablaServicios - Servicio para obtener los datos de las tablas.
   */
  constructor(
    private fb: FormBuilder,
    private productoTablaServicios: ProductoTablaServicios,
    private router: Router,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private catalogosService: CatalogosService,
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
   }

  /**
   * Redirige a la página de bodegas.
   * Navega a la ruta correspondiente para gestionar los datos de bodegas.
   */
  redirigirBodegas(): void {
    this.router.navigate(['/amecafe/cafe-exportadores/bodegas']);
  }

  /**
   * Redirige a la página de café de exportadores.
   * Navega a la ruta correspondiente para gestionar los datos de café de exportadores.
   */
  redirigirCafeExportadores(): void {
    this.router.navigate(['/amecafe/cafe-exportadores/cafe-de-exportadores']);
  }

  /**
   * Redirige a la página de beneficios.
   * Navega a la ruta correspondiente para gestionar los datos de beneficios.
   */
  redirigirBeneficios(): void {
    this.router.navigate(['/amecafe/cafe-exportadores/beneficios']);
  }

  /**
   * Redirige a la página de regiones.
   * Navega a la ruta correspondiente para gestionar los datos de regiones.
   */
  redirigirRegiones(): void {
    this.router.navigate(['/amecafe/cafe-exportadores/regiones']);
  }

  /**
   * Método de inicialización del componente.
   * Configura el formulario reactivo y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState.SolicitudState;
      })
    ).subscribe();

    this.iniciarFormulario();
    this.radioOpcion = this.catalogosService.RadioOpcion;

    const EXENTO_DE_PAGO_SUBSCRIPTION = this.datosSolicitudForma.get('exentoDePago')?.valueChanges.subscribe((value) => {
      if (value === 'false') {
        this.datosSolicitudForma.get('claveDelPadron')?.disable();
      } else {
        this.datosSolicitudForma.get('claveDelPadron')?.enable();
      }
    });

    if (EXENTO_DE_PAGO_SUBSCRIPTION) {
      this.subscriptions.push(EXENTO_DE_PAGO_SUBSCRIPTION);
    }

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
          this.datosSolicitudForma.patchValue(this.solicitudState);
        }
      })
    ).subscribe();
    /**
     * Se suscribe a los cambios en el estado del formulario.
     * Después de un breve retraso, actualiza el estado de la solicitud en el store.
     */
    this.datosSolicitudForma.statusChanges
    .pipe(
      takeUntil(this.destroyNotifier$),
      delay(10),
      tap(() => {
        const ACTIVE_STATE = { ...this.datosSolicitudForma.value };
        this.tramiteStore.setSolicitudTramite(ACTIVE_STATE);
      })
    )
    .subscribe();

    /**
     * Obtiene los datos iniciales requeridos para el componente.
     */
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
     * Inicializa el formulario reactivo.
     */
    iniciarFormulario(): void {
      this.datosSolicitudForma = this.fb.group({
        exentoDePago: [this.valorSeleccionado, Validators.required],
        claveDelPadron: [{ value: '', disabled: this.valorSeleccionado === 'false' }, Validators.required],
        observaciones: ['', Validators.required],
        requiereInspeccionInmediata: [false, Validators.required],
        informacionConfidencial: ['', Validators.required],
      });
    } 

  /**
   * Método para buscar y cargar los datos de las tablas.
   * Realiza una llamada al servicio para obtener los datos de regiones, beneficios, bodegas y café de exportación.
   */
  buscarDatos(): void {
    this.productoTablaServicios.obtenerDatos()
    .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response: { regionesCompraApiDatos: RegionesInfo[]; beneficiosApiDatos: BeneficiosInfo[]; bodegasApiDatos: BodegasInfo[]; cafeExportacionApiDatos: CafeExporacionInfo[] }) => {
          if (response && Array.isArray(response.regionesCompraApiDatos) &&
            Array.isArray(response.beneficiosApiDatos) &&
            Array.isArray(response.bodegasApiDatos) &&
            Array.isArray(response.cafeExportacionApiDatos)) {
            this.regionesTableDatos = response.regionesCompraApiDatos;
            this.beneficiosTableDatos = response.beneficiosApiDatos;
            this.bodegasTableDatos = response.bodegasApiDatos;
            this.cafeExporacionTableDatos = response.cafeExportacionApiDatos;
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
   * Método para limpiar las suscripciones al destruir el componente.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
