import { ActivatedRoute } from '@angular/router';
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
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosSolicitudFormaInt } from '../../modelos/datos-de-interfaz.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
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
 * Indica si el formulario debe mostrarse solo en modo de lectura.
 * @type {boolean}
 */
  @Input() esFormularioSoloLectura!: boolean;

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
   * Datos seleccionados de la tabla de regiones.
   * Contiene la información de las regiones seleccionadas por el usuario.
   * @type {RegionesInfo[]}
   */

  regionesSeleccionadas: RegionesInfo[] = [];
  
   /**
   * Datos seleccionados de la tabla de café de exportación.
   * Contiene la información de los cafés seleccionados por el usuario.
   * @type {CafeExporacionInfo[]}
   */

  cafeSeleccionado: CafeExporacionInfo[] = [];

 /**
   * Datos seleccionados de la tabla de beneficios.
   * Contiene la información de los beneficios seleccionados por el usuario.
   * @type {BeneficiosInfo[]}
   */

  beneficiosSeleccionados: BeneficiosInfo[] = [];
 
  /**
   * Datos seleccionados de la tabla de bodegas.
   * Contiene la información de las bodegas seleccionadas por el usuario.
   * @type {BodegasInfo[]}
   */

  bodegasSeleccionadas: BodegasInfo[] = [];

  /**
  * Constructor de la clase.
  * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
  * @param {ProductoTablaServicios} productoTablaServicios - Servicio para obtener los datos de las tablas.
  * @param {Router} router - Servicio para la navegación entre rutas.
  * @param {TramiteStoreQuery} tramiteStoreQuery - Consulta Akita para manejar y obtener el estado del trámite.
  * @param {TramiteStore} tramiteStore - Almacén Akita para gestionar el estado del trámite.
  * @param {SeccionLibQuery} seccionQuery - Consulta Akita para manejar y obtener el estado de una sección.
  * @param {SeccionLibStore} seccionStore - Almacén Akita para gestionar el estado de una sección.
  * @param {CatalogosService} catalogosService - Servicio para interactuar con los catálogos de datos.
  * @param {ActivatedRoute} activatedRoute - Servicio para acceder a información sobre la ruta activa.
  * @param {ConsultaioQuery} consultaioQuery - Consulta Akita para manejar y actualizar el estado de una sección.
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
      this.datosSolicitudForma.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.datosSolicitudForma.enable();
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
      .subscribe()

  /**
   * Inicializa el formulario reactivo con los campos requeridos.
   * Configura validaciones y deshabilita ciertos campos según sea necesario.
   * 
   * @method iniciarFormulario
   * @returns {void}
   */

      this.datosSolicitudForma = this.fb.group({
        exentoDePago: [this.valorSeleccionado, Validators.required],
        claveDelPadron: [this.valorSeleccionado, Validators.required],
        observaciones: ['', Validators.required],
        requiereInspeccionInmediata: ['', Validators.required],
        informacionConfidencial: ['', Validators.required],
      });
  }

  /**
   * Redirige a la página de bodegas.
   * Navega a la ruta correspondiente para gestionar los datos de bodegas.
   */
  redirigirBodegas(): void {
    this.router.navigate(['../bodegas'],
      {
        relativeTo: this.activatedRoute,
      });
  }

  /**
   * Redirige a la página de café de exportadores.
   * Navega a la ruta correspondiente para gestionar los datos de café de exportadores.
   */
  redirigirCafeExportadores(): void {
    this.router.navigate(['../cafe-de-exportadores'],
      {
        relativeTo: this.activatedRoute,
      }
    );
  }

  /**
   * Redirige a la página de beneficios.
   * Navega a la ruta correspondiente para gestionar los datos de beneficios.
   */
  redirigirBeneficios(): void {
    this.router.navigate(['../beneficios'],
      {
        relativeTo: this.activatedRoute,
      }
    );
  }

  /**
   * Redirige a la página de regiones.
   * Navega a la ruta correspondiente para gestionar los datos de regiones.
   */
  redirigirRegiones(): void {
    this.router.navigate(['../regiones'],
      {
        relativeTo: this.activatedRoute,
      });
  }

  /**
   * Método de inicialización del componente.
   * Configura el formulario reactivo y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState.SolicitudState;
      })
    ).subscribe();

    this.radioOpcion = this.catalogosService.RadioOpcion;

    const EXENTO_DE_PAGO_SUBSCRIPTION = this.datosSolicitudForma.get('exentoDePago')?.valueChanges.subscribe((value) => {
      if (value === 'false' || this.esFormularioSoloLectura === true) {
        this.datosSolicitudForma.get('claveDelPadron')?.disable();
        this.datosSolicitudForma.patchValue({
          claveDelPadron: '',
        });
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

          
            this.tramiteStoreQuery.selectSolicitudTramite$
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState: TramiteState) => {
                if (seccionState) {
                  const REGIONES_DATOS= seccionState?.regionesTabla;
                if (REGIONES_DATOS.length > 0) {
                  this.regionesTableDatos = REGIONES_DATOS;
                  
                }
                else {
                  this.tramiteStore.setRegionesTabla(this.regionesTableDatos);
                }
              }
              })
            ).subscribe();
            this.tramiteStoreQuery.selectSolicitudTramite$
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState: TramiteState) => {
                if (seccionState) {
                  const BENEFICIOS_DATOS= seccionState?.beneficiosTabla;
                if (BENEFICIOS_DATOS.length > 0) {
                  this.beneficiosTableDatos = BENEFICIOS_DATOS;
                  
                }
                else {
                  this.tramiteStore.setBeneficiosTabla(this.beneficiosTableDatos);
                }
              }
              })
            ).subscribe();
            this.tramiteStoreQuery.selectSolicitudTramite$
            .pipe(  
              takeUntil(this.destroyNotifier$),
              map((seccionState: TramiteState) => {
                if (seccionState) {
                  const BODEGAS_DATOS= seccionState?.bodegasTabla;
                if (BODEGAS_DATOS.length > 0) {
                  this.bodegasTableDatos = BODEGAS_DATOS;
                  
                }
                else {
                  this.tramiteStore.setBodegasTabla(this.bodegasTableDatos);
                }
              }
              })
            ).subscribe();
            this.tramiteStoreQuery.selectSolicitudTramite$

            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState: TramiteState) => {
                if (seccionState) {
                  const CAFE_EXPORTACION_DATOS= seccionState?.cafeExportacionTabla;
                if (CAFE_EXPORTACION_DATOS.length > 0) {
                  this.cafeExporacionTableDatos = CAFE_EXPORTACION_DATOS;
                  
                }
                else {
                  this.tramiteStore.setCafeExportacionTabla(this.cafeExporacionTableDatos);
                }
              }
              })
            ).subscribe();
          } 
        }
      });
  }
  /**
   * Método para borrar una región específica.
   * Busca el índice de la región en la tabla de regiones y la elimina.
   * Actualiza el estado de la tabla en el store.
   * @returns {void}
   */
  
  borrarRegiones(): void {
    const INDICE = this.regionesTableDatos.findIndex((region) => region.TABLA_Columna_1 === this.regionesSeleccionadas[0].TABLA_Columna_1);
    if (INDICE !== -1) {
      this.regionesTableDatos.splice(INDICE, 1);
      this.tramiteStore.updateRegionesTabla(this.regionesTableDatos);
    }

  }
  /**
   * Método para seleccionar una región específica.
   * Recibe un objeto `regionesSeleccionadas` y lo asigna a la propiedad `regionesSeleccionadas`.
   * @param {RegionesInfo} regionesSeleccionadas - Objeto que contiene la información de la región seleccionada.
   * @returns {void}
   */


   seleccionarRegiones(regionesSeleccionadas: RegionesInfo): void {
    this.regionesSeleccionadas = [{...regionesSeleccionadas}];
   }
  /**
   * Método para borrar un beneficio específico.
   * Busca el índice del beneficio en la tabla de beneficios y lo elimina.
   * Actualiza el estado de la tabla en el store.
   * @returns {void}
   * /
   * @param {BeneficiosInfo} beneficiosSeleccionados - Objeto que contiene la información del beneficio seleccionado.
   * @returns {void}
   */

  borrarBeneficios(): void {
    const INDICE = this.beneficiosTableDatos.findIndex((beneficio) => beneficio.TABLA_Columna_1 === this.beneficiosSeleccionados[0].TABLA_Columna_1);
    if (INDICE !== -1) {
      this.beneficiosTableDatos.splice(INDICE, 1);
      this.tramiteStore.updateBeneficiosTabla(this.beneficiosTableDatos);
    }
  }
  /**
   * Método para seleccionar un beneficio específico.
   * Recibe un objeto `beneficiosSeleccionados` y lo asigna a la propiedad `beneficiosSeleccionados`.
   * @param {BeneficiosInfo} beneficiosSeleccionados - Objeto que contiene la información del beneficio seleccionado.
   * @returns {void}
   */
  seleccionarBeneficios(beneficiosSeleccionados: BeneficiosInfo): void {
    this.beneficiosSeleccionados = [{...beneficiosSeleccionados}];
  }
  /**
   * Método para borrar una bodega específica.
   * Busca el índice de la bodega en la tabla de bodegas y la elimina.
   * Actualiza el estado de la tabla en el store.
   * @returns {void}
   */
  borrarBodegas(): void {
    const INDICE = this.bodegasTableDatos.findIndex((bodega) => bodega.TABLA_Columna_1 === this.bodegasSeleccionadas[0].TABLA_Columna_1);
    if (INDICE !== -1) {
      this.bodegasTableDatos.splice(INDICE, 1);
      this.tramiteStore.updateBodegasTabla(this.bodegasTableDatos);
    }
  }
 
  /**
   * Método para seleccionar una bodega específica.
   * Recibe un objeto `bodegaSeleccionada` y lo asigna a la propiedad `bodegasSeleccionadas`.
   * @param {BodegasInfo} bodegaSeleccionada - Objeto que contiene la información de la bodega seleccionada.
   * @returns {void}
   */

  seleccionarBodega(bodegaSeleccionada: BodegasInfo): void {
    this.bodegasSeleccionadas = [{...bodegaSeleccionada}];
  }

/**
 * @method borrarCafe
 * @description Elimina un registro de la tabla de datos de exportación de café basado en el elemento seleccionado.
 * Busca el índice del registro seleccionado en la tabla y, si existe, lo elimina y actualiza el estado correspondiente.
 * 
 * @returns {void}
 */
   borrarCafe(): void {
    const INDICE = this.cafeExporacionTableDatos.findIndex((cafe) => cafe.TABLA_Columna_1 === this.cafeSeleccionado[0].TABLA_Columna_1);
    if (INDICE !== -1) {
      this.cafeExporacionTableDatos.splice(INDICE, 1);
      this.tramiteStore.updateCafeExportacionTabla(this.cafeExporacionTableDatos);
    }
  }


  /**
   * Método para seleccionar un café específico.
   * Recibe un objeto `cafeSeleccionado` y lo asigna a la propiedad `cafeSeleccionado`.
   * @param {CafeExporacionInfo} cafeSeleccionado - Objeto que contiene la información del café seleccionado.
   * @returns {void}
   */
  seleccionarCafe(cafeSeleccionado: CafeExporacionInfo): void {
    this.cafeSeleccionado = [{...cafeSeleccionado}];
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
