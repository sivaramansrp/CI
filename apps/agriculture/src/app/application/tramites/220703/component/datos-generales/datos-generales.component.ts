/* eslint-disable @typescript-eslint/no-explicit-any */
import { CatalogoSelectComponent, CatalogosSelect, ConfiguracionColumna, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MERCANCIA_SERVICIO, mercanciaInfo } from '../../constantes/acuicola.enum';
import { AcuicolaService } from '../../service/acuicola.service';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudInt } from '../../modelos/acuicola.model';
import { Subject } from 'rxjs';
import { TramiteStore } from '../../estados/tramite220703.store';
import { TramiteStoreQuery } from '../../estados/tramite220703.query';
import { delay } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';

@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss'
})
export class DatosGeneralesComponent implements OnInit {

  /**
   * Formulario reactivo para capturar los datos generales de la solicitud.
   * @type {FormGroup}
   */
  datosGeneralesForm!: FormGroup;

  /**
   * Catálogo de aduanas de ingreso.
   * @type {CatalogosSelect}
   */
  aduanaDeIngreso: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de oficinas de inspección.
   * @type {CatalogosSelect}
   */
  oficinaDeInspeccion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de puntos de inspección.
   * @type {CatalogosSelect}
   */
  puntoDeInspeccion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de regímenes a los que se destina la mercancía.
   * @type {CatalogosSelect}
   */
  regimenAlQueDestina: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de datos para movilización nacional.
   * @type {CatalogosSelect}
   */
  datosParaMovilizacion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Catálogo de puntos de verificación federal.
   * @type {CatalogosSelect}
   */
  puntoDeVerificacion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Configuración de columnas para la tabla de mercancías.
   * @type {ConfiguracionColumna<mercanciaInfo>[]}
   */
  mercanciaTabla: ConfiguracionColumna<mercanciaInfo>[] = MERCANCIA_SERVICIO;

  /**
   * Datos de la mercancía para la tabla.
   * @type {mercanciaInfo[]}
   */
  immexTableDatos: mercanciaInfo[] = [];

  /**
   * Estado actual de la solicitud.
   * @type {DatosDeLaSolicitudInt}
   */
  SolicitudState!: DatosDeLaSolicitudInt;

  /**
   * Subject para manejar la desuscripción de observables.
   * @type {Subject<void>}
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Subject para notificar la destrucción del componente.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la sección actual.
   * @type {SeccionLibState}
   */
  private seccion!: SeccionLibState;

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {AcuicolaService} acuicolaService - Servicio para obtener datos relacionados con la acuicultura.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query para acceder al estado del trámite.
   * @param {TramiteStore} tramiteStore - Store para gestionar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Query para acceder al estado de la sección.
   * @param {SeccionLibStore} seccionStore - Store para gestionar el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
  // eslint-disable-next-line no-empty-function
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Aquí se configuran las suscripciones a los estados y se inicializa el formulario.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.SolicitudState = seccionState.SolicitudState;
      })
    ).subscribe();

    this.iniciarFormulario();
    this.getAduanaDeIngreso();
    this.getOficinaDeInspeccion();
    this.getPuntoDeInspeccion();
    this.getRegimenAlQue();
    this.getPuntoDeVerificacion();
    this.getDatosParaMovilizacion();

    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: any) => {
          if (seccionState) {
            this.SolicitudState = seccionState.SolicitudState;
            this.datosGeneralesForm.patchValue(this.SolicitudState);
          }
        })
      ).subscribe();

    this.datosGeneralesForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.datosGeneralesForm.value };
          this.tramiteStore.setSolicitudTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

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
   * Inicializa el formulario reactivo con los controles necesarios.
   * @method iniciarFormulario
   * @returns {void}
   */
  iniciarFormulario(): void {
    this.datosGeneralesForm = this.fb.group({
      foliodel: [{ value: '150220020032024220100001', disabled: true }, Validators.required],
      aduanaDeIngreso: ['', Validators.required],
      oficinaDeInspeccion: ['', Validators.required],
      puntoDeInspeccion: ['', Validators.required],
      numeroDeGuia: [{ value: '', disabled: true }, Validators.required],
      regimenAlQueDestina: ['', Validators.required],
      datosParaMovilizacion: ['', Validators.required],
      puntoDeVerificacion: ['', Validators.required],
      identificacionDelTransporte: [{ value: '', disabled: true }, Validators.required],
      nombreDeLaEmpresaTransportista: [{ value: '', disabled: true }, Validators.required],
    });
  }

  /**
   * Obtiene las aduanas de ingreso desde el servicio.
   * @method getAduanaDeIngreso
   * @returns {void}
   */
  getAduanaDeIngreso(): void {
    this.acuicolaService.getAduanaDeIngreso().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.aduanaDeIngreso = {
          labelNombre: 'Aduana de ingreso',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene las oficinas de inspección desde el servicio.
   * @method getOficinaDeInspeccion
   * @returns {void}
   */
  getOficinaDeInspeccion(): void {
    this.acuicolaService.getOficinaDeInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.oficinaDeInspeccion = {
          labelNombre: 'Oficina de inspección de Sanidad Agropecuaria',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene los puntos de inspección desde el servicio.
   * @method getPuntoDeInspeccion
   * @returns {void}
   */
  getPuntoDeInspeccion(): void {
    this.acuicolaService.getPuntoDeInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.puntoDeInspeccion = {
          labelNombre: 'Punto de inspección',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene los regímenes a los que se destina la mercancía desde el servicio.
   * @method getRegimenAlQue
   * @returns {void}
   */
  getRegimenAlQue(): void {
    this.acuicolaService.getRegimenAlQue().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.regimenAlQueDestina = {
          labelNombre: 'Regimen al que se destinara la mercancia',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene los datos para movilización nacional desde el servicio.
   * @method getDatosParaMovilizacion
   * @returns {void}
   */
  getDatosParaMovilizacion(): void {
    this.acuicolaService.getDatosParaMovilizacion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosParaMovilizacion = {
          labelNombre: 'Datos para movilización nacional',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene los puntos de verificación federal desde el servicio.
   * @method getPuntoDeVerificacion
   * @returns {void}
   */
  getPuntoDeVerificacion(): void {
    this.acuicolaService.getPuntoDeVerificacion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.puntoDeVerificacion = {
          labelNombre: 'Punto de verificación federal',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

}
