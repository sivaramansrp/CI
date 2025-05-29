import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '../../servicios/catalogos.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { InternaDatosGeneralesInt } from '../../modelos/datos-de-interfaz.model';
import { MERCANCIA_SERVICIO } from '../../modelos/datos-de-interfaz.model';
import { MercanciaDatosService } from '../../servicios/mercancia-datos.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RevisionService } from '../../servicios/revision.service';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TramiteState } from '../../estados/tramite220701.store';
import { TramiteStore } from '../../estados/tramite220701.store';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Validators } from "@angular/forms";
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { mercanciaInfo } from '../../modelos/datos-de-interfaz.model';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

/**
 * Componente para manejar los datos generales internos.
 * Este componente permite gestionar formularios y datos relacionados con los trámites.
 */
@Component({
  selector: 'interna-datos-generales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent,],
  templateUrl: './interna-datos-generales.component.html',
  styleUrl: './interna-datos-generales.component.scss'
})
export class InternaDatosGeneralesComponent implements OnInit, OnDestroy {
    /**
     * Grupo de formularios principal.
     * Contiene la estructura del formulario principal del componente.
     * @type {FormGroup}
     */
    forma!: FormGroup;
  
    /**
   * Estado de los datos generales internos.
   * Contiene la información manejada dentro del componente.
   * @type {InternaDatosGeneralesInt}
   */
   internaDatosGeneralesState!: InternaDatosGeneralesInt;
    
  /**
   * Grupo de formularios anidado para los datos de la solicitud.
   * Maneja la información específica de la solicitud dentro del formulario principal.
   * @type {FormGroup}
   */
  datosDelaSolicitud!: FormGroup;

  /**
   * Selección de empresa transportista.
   * Contiene opciones disponibles para la selección de empresas transportistas.
   * @type {CatalogosSelect}
   */
  empresaTransportista!: CatalogosSelect;
  
  /**
   * Formulario para la movilización de mercancías.
   * Contiene los campos y validaciones relacionadas con la movilización.
   * @type {FormGroup}
   */
    movilizacionForm!: FormGroup;
  /**
   * Dirección actual de rotación.
   * Indica la dirección de rotación actual.
   * @type {number | null}
   */
  currentDirection: number | null = 1;
  /**
   * Datos del dropdown.
   * Contiene las opciones disponibles para el menú desplegable.
   * @type {any[]}
   */
  dropdownData = [];
  /**
   * Selección de aduana de ingreso.
   * Contiene las opciones disponibles para la selección de aduanas de ingreso.
   * @type {CatalogosSelect}
   */
    aduanaIngreso!: CatalogosSelect;
  /**
   * Configuración para el select de aduana de ingreso.
   * Contiene los datos de configuración para el menú desplegable de aduanas de ingreso.
   * @type {Catalogo[]}
   */
  aduanaDeIngreso: Catalogo[] = [];

    /**
   * Configuración para el select de sanidad agropecuaria.
   * Contiene los datos de configuración para el menú desplegable de sanidad agropecuaria.
   * @type {Catalogo[]}
   */
    sanidadAgropecuaria: Catalogo[] = [];
  /**
   * Configuración para el select de punto de inspección.
   * Contiene los datos de configuración para el menú desplegable de puntos de inspección.
   * @type {Catalogo[]}
   */
  puntoInspeccion: Catalogo[] = [];
  /**
   * Selección de punto de verificación.
   * Contiene las opciones disponibles para la selección de puntos de verificación.
   * @type {CatalogosSelect}
   */
  puntoVerificacion!: CatalogosSelect;
    /**
   * Selección de oficina de inspección.
   * Contiene las opciones disponibles para la selección de oficinas de inspección.
   * @type {CatalogosSelect}
   */
    oficianaInspeccion!: CatalogosSelect;
  /**
   * Selección de establecimiento.
   * Contiene las opciones disponibles para la selección de establecimientos.
   * @type {CatalogosSelect}
   */
  establecimiento!: CatalogosSelect;

  /**
   * Selección de régimen al que se destinarán.
   * Contiene las opciones disponibles para la selección de regímenes.
   * @type {CatalogosSelect}
   */
  regimenDestinaran!: CatalogosSelect;

  /**
   * Selección de movilización nacional.
   * Contiene las opciones disponibles para la selección de movilización nacional.
   * @type {CatalogosSelect}
   */
  movilizacionNacional!: CatalogosSelect;

  /**
   * Configuración para el select de establecimiento TIF.
   * Contiene los datos de configuración para el menú desplegable de establecimientos TIF.
   * @type {Catalogo[]}
   */
  establecimientoTIF: Catalogo[] = [];

  /**
   * Configuración para el select de veterinario.
   * Contiene los datos de configuración para el menú desplegable de veterinarios.
   * @type {Catalogo[]}
   */
  veterinario: Catalogo[] = [];
  /**
   * Identificador único.
   * @type {number | undefined}
   */
  id?: number;
  /**
   * Descripción del elemento.
   * @type {string}
   */
  descripcion: string = '';
  /**
   * Tamaño del elemento.
   * @type {string | undefined}
   */
  tam?: string;
  /**
   * DPI del elemento.
   * @type {string | undefined}
   */
  dpi?: string

  /**
   * Configuración para el select de régimen.
   * Contiene los datos de configuración para el menú desplegable de regímenes.
   * @type {Catalogo[]}
   */
  regimen: Catalogo[] = [];
  /**
   * Valor seleccionado por defecto.
   * Indica si se ha realizado una selección en el formulario.
   * @type {string}
   */
  seleccionadoValor: string = 'no';

  /**
   * Configuración de las columnas de la tabla para servicios de mercancía.
   * Define la estructura y propiedades de las columnas.
   * @type {ConfiguracionColumna<mercanciaInfo>[]}
   */ 
      mercanciaTabla: ConfiguracionColumna<mercanciaInfo>[] = MERCANCIA_SERVICIO;

  /**
   * Datos de los servicios de mercancía.
   * Contiene la información mostrada en la tabla de mercancía.
   * @type {mercanciaInfo[]}
   */
  mercanciaTablaDatos: mercanciaInfo[] = [];

  /**
   * Datos obtenidos de la API para mercancía.
   * Contiene información relacionada con los permisos de importación y exportación bajo el programa IMMEX.
   * @type {any[]}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mercanciaApiDatos: any[] = [];
   
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
   * Constructor del componente.
   * Inicializa servicios y dependencias necesarias para el funcionamiento del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {RevisionService} revisionService - Servicio para la gestión de revisiones.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validaciones de formularios.
   * @param {MercanciaDatosService} mercanciaDatosService - Servicio para obtener datos de mercancía.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.
   * @param {ChangeDetectorRef} cdr - Servicio para detectar cambios en la vista.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query para obtener el estado del trámite.
   * @param {TramiteStore} tramiteStore - Store para manejar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Query para obtener el estado de la sección.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   */
    constructor(
      private readonly fb: FormBuilder,
      private revisionService: RevisionService,
      private validacionesService: ValidacionesFormularioService,
      private mercanciaDatosService: MercanciaDatosService,
      private catalogosService: CatalogosService, // Inyecta el nuevo servicio
      private httpServicios: HttpClient,
      private cdr: ChangeDetectorRef,
      private tramiteStoreQuery: TramiteStoreQuery, 
      private tramiteStore: TramiteStore, 
      private seccionQuery: SeccionLibQuery, 
      private seccionStore: SeccionLibStore, 
    ) { 
        /**
   * Inicializa y configura los formularios del componente.
   * - Llama a `crearFormulario` para establecer la estructura del formulario principal.
   * - Llama a `initActionFormBuild` para configurar acciones adicionales en los formularios.
   * - Configura `movilizacionForm` con validaciones y valores por defecto.
   */
    this.crearFormulario();
    this.initActionFormBuild();
    /**
   * Formulario para la movilización.
   * Contiene los siguientes campos:
   * - `coordenadas`: Campo deshabilitado para coordenadas.
   * - `nombre`: Campo obligatorio para el nombre.
   * - `medio`: Selección del medio de transporte (por defecto, 'Aéreo').
   * - `transporte`: Campo deshabilitado con valor predefinido '020202'.
   * - `punto`: Campo obligatorio para el punto de referencia.
   */
      this.movilizacionForm = this.fb.group({
        coordenadas: [{ value: '', disabled: true }],
        nombre: ['', Validators.required],
        medio: ['Aereo', Validators.required],
        transporte: [{ value: '020202', disabled: true }],
        punto: ['', [Validators.required]],
      });
      
  }
   

    /**
   * Crea el grupo de formularios principal.
   * @method crearFormulario
   */
    crearFormulario(): void {
      this.forma = this.fb.group({
        datosDelaSolicitud: this.fb.group({}),
      });
    }

    /**
   * @returns {void}
   */
  initActionFormBuild(): void {
    this.datosDelaSolicitud = this.fb.group({
      aduanaIngreso: ['', Validators.required],
      oficinaInspeccion: ['', Validators.required],
      puntoInspeccion: ['', Validators.required],
      claveControlUnico: ['', [Validators.required]],
      establecimientoTIF: ['', Validators.required],
      regimen: ['', Validators.required],
      folioControlUnico: [{ value: '1502200200120240301000015', disabled: true }],
    });

    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
  }

  /**
   * Índice actual de la fila.
   * @type {number}
   */
  currentIndex = 0;

  /**
   * Rota la fila en la dirección especificada.
   * @param {number} direction - La dirección de rotación.
   * @returns {void}
   */

  /**
   * Verifica si un campo del formulario es válido.
   * @param {FormGroup} form - El formulario.
   * @param {string} field - El campo a verificar.
   * @returns {boolean} - Verdadero si el campo es válido, falso en caso contrario.
   */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) === true;
  }
  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
       this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => {
          this.internaDatosGeneralesState = seccionState.InternaDatosGeneralesState;
        })
      ).subscribe();
    this.datosDelaSolicitud = this.fb.group({
      aduanaIngreso: ['', Validators.required],
      oficinaInspeccion: ['', Validators.required],
      puntoInspeccion: ['', Validators.required],
      claveUCON: [{ value: '', disabled: true }],
      establecimientoTIF: ['', Validators.required],
      regimen: ['', Validators.required],
      foliodel: [{ value: '1502200200120240301000015', disabled: true }],
    });
    this.disableFormControls();
    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
    this.getOficianaInspeccion();
    this.getEstablecimiento();
    this.getRegimenDestinaran();
    this.getMovilizacionNacional();
    this.getPuntoVerificacion();
    this.getEmpresaTransportista();
    this.obtenerListasDesplegables();

    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState: TramiteState) => {
          if (seccionState) {
            this.internaDatosGeneralesState = seccionState?.InternaDatosGeneralesState;
            this.forma.patchValue(this.internaDatosGeneralesState);
          }
        })
      ).subscribe();

        this.forma.statusChanges
        .pipe(
          takeUntil(this.unsubscribe$),
          delay(10),
          tap(() => {
            const ACTIVE_STATE = { ...this.forma.value };
            this.tramiteStore.setInternaDatosGeneralesTramite(ACTIVE_STATE); 
          })
        )
        .subscribe();

      this.obtenerDatos(); 
  
      this.seccionQuery.selectSeccionState$
        .pipe(
          takeUntil(this.unsubscribe$),
          map((seccionState) => {
            this.seccion = seccionState;
          })
        )
        .subscribe();
  }


  obtenerDatos(): void {
    this.mercanciaDatosService.getDatos()
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: { mercanciaApiDatos: mercanciaInfo[] }) => {
          if (response && Array.isArray(response.mercanciaApiDatos)) {
            this.mercanciaTablaDatos = response.mercanciaApiDatos;
            this.cdr.detectChanges();
            } else {
              console.error('La respuesta de la API no tiene el formato esperado:', response);
            }
          },
          error: (error) => {
            console.error('Error al obtener datos:', error);
          }
      });
  }
  /**
   * @method obtenerListasDesplegables
   * @description Obtiene y carga las listas desplegables necesarias para el formulario.
   * - Llama a métodos específicos para recuperar datos de:
   *   - Ingreso (`obtenerIngresoSelectList`)
   *   - Sanidad agropecuaria (`obtenerSanidadAgropecuariaList`)
   *   - Puntos de inspección (`obtenerPuntoInspeccionList`)
   *   - Establecimientos (`obtenerEstablecimientoList`)
   *   - Veterinarios (`obtenerVeterinarioList`)
   *   - Régimen (`obtenerRegimenList`)
   */
    obtenerListasDesplegables(): void {
      this.obtenerIngresoSelectList();
      this.obtenerSanidadAgropecuariaList();
      this.obtenerPuntoInspeccionList();
      this.obtenerEstablecimientoList();
      this.obtenerVeterinarioList();
      this.obtenerRegimenList();
    }

  /**
   * Obtiene la lista para el select de aduana de ingreso.
   * @method obtenerIngresoSelectList
   */
    obtenerIngresoSelectList(): void {
      this.catalogosService.obtenerAduanaDeIngreso()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data): void => {
        const DATOS = data?.data;
        this.aduanaDeIngreso = DATOS;
      });
    }

      /**
   * Obtiene la lista para el select de sanidad agropecuaria.
   * @method obtenerSanidadAgropecuariaList
   */
  obtenerSanidadAgropecuariaList(): void {
    this.catalogosService.obtenerSanidadAgropecuaria()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data): void => {
      const DATOS = data?.data;
      this.sanidadAgropecuaria = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de punto de inspección.
   * @method obtenerPuntoInspeccionList
   */
  obtenerPuntoInspeccionList(): void {
    this.catalogosService.obtenerPuntoInspeccion()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data): void => {
      const DATOS = data?.data;
      this.puntoInspeccion = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de establecimiento.
   * @method obtenerEstablecimientoList
   */
  obtenerEstablecimientoList(): void {
    this.catalogosService.obtenerEstablecimiento()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data): void => {
      const DATOS = data?.data;
      this.establecimientoTIF = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de veterinario.
   * @method obtenerVeterinarioList
   */

  obtenerVeterinarioList(): void {
    this.catalogosService.obtenerVeterinario()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data): void => {
      const DATOS = data?.data;
      this.veterinario = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de régimen.
   * @method obtenerRegimenList
   */
  obtenerRegimenList(): void {
    this.catalogosService.obtenerRegimen()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data): void => {
      const DATOS = data?.data;
      this.regimen = DATOS;
    });
  }
      /**
   * Obtiene la aduana de ingreso.
   * Este método llama al servicio de revisión para obtener la aduana de ingreso.
   * @returns {void}
   */
  getAduanaIngreso(): void {
    this.revisionService.getAduanaIngreso()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.aduanaIngreso = {
          labelNombre: 'Aduana de ingreso',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene la oficina de inspección.
   * Este método llama al servicio de revisión para obtener la oficina de inspección.
   * @returns {void}
   */
  getOficianaInspeccion(): void {
    this.revisionService.getOficianaInspeccion()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.oficianaInspeccion = {
          labelNombre: 'Oficina de Inspección de Sanidad Agropecuaria',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el punto de inspección.
   * Este método llama al servicio de revisión para obtener el punto de inspección.
   * @returns {void}
   */


  /**
   * Obtiene el establecimiento.
   * Este método llama al servicio de revisión para obtener el establecimiento.
   * @returns {void}
   */
  getEstablecimiento(): void {
    this.revisionService.getEstablecimiento()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.establecimiento = {
          labelNombre: 'Establecimiento TIF',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }
  /**
   * Obtiene el régimen al que se destinarán las mercancías.
   * Este método llama al servicio de revisión para obtener el régimen.
   * @returns {void}
   */
  getRegimenDestinaran(): void {
    this.revisionService.getRegimenDestinaran()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.regimenDestinaran = {
          labelNombre: 'Régimen al que se destinarán las mercancías',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene la movilización nacional.
   * Este método llama al servicio de revisión para obtener la movilización nacional.
   * @returns {void}
   */
  getMovilizacionNacional(): void {
    this.revisionService.getMovilizacionNacional()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.movilizacionNacional = {
          labelNombre: 'Movilización Nacional',
          required: false,
          primerOpcion: 'Aéreo',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el punto de verificación.
   * Este método llama al servicio de revisión para obtener el punto de verificación.
   * @returns {void}
   */
  getPuntoVerificacion(): void {
    this.revisionService.getPuntoVerificacion()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.puntoVerificacion = {
          labelNombre: 'Punto de verificación federal',
          required: false,
          primerOpcion: 'REGIÓN NORTE, LA CONCHA, SIN.',
          catalogos: RESPONSE,
        };
      }
    });
  }
  /**
   * Obtiene la empresa transportista.
   * Este método llama al servicio de revisión para obtener la empresa transportista.
   * @returns {void}
   */
  getEmpresaTransportista(): void {
    this.revisionService.getEmpresaTransportista()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.empresaTransportista = {
          labelNombre: 'Nombre de la empresa transportista',
          required: false,
          primerOpcion: 'testabc',
          catalogos: RESPONSE,
        };
      }
    });
  }

    /**
   * @method disableFormControls
   * @description Deshabilita controles específicos del formulario.
   * - En este caso, deshabilita el control `folioControlUnico` si existe en el formulario `forma`.
   */
  disableFormControls(): void {
    this.forma.get('folioControlUnico')?.disable();
  }

    /**
   * @method ngOnDestroy
   * @description Maneja la limpieza de recursos antes de destruir el componente.
   * - Completa y libera `unsubscribe$` para detener suscripciones activas.
   */
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}
