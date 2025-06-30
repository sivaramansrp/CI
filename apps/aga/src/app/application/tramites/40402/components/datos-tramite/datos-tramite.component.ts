import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tramite40402Store, Tramitenacionales40402State } from '../../estados/tramite40402.store';
import { map, takeUntil } from 'rxjs';
import { CAATSolicitud } from '../../models/transportacion-maritima.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { Tramite40402Query } from '../../estados/tramite40402.query';
import { Tramite40402Service } from '../../estados/tramite40402.service';

/**
 * Componente para la gestión de datos del trámite
 * 
 * @remarks
 * Este componente maneja la captura y visualización de información relacionada con trámites de transporte aéreo
 */
@Component({
  selector: 'app-datos-tramite',
  templateUrl: './datos-tramite.component.html',
  styleUrls: ['./datos-tramite.component.scss'],
})
export class DatosTramiteComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar datos del trámite
   */
  formulario!: FormGroup;
  
  /**
   * Lista de códigos de transportación
   */
  codigoTransportacion: unknown[] = [];
  
  /**
   * Lista de tipos de CAAT aéreo
   */
  tipoCaatAereo: unknown[] = [];
  
  /**
   * Catálogo de tipos de CAAT aéreo
   */
  public tipoDeCaatAerea!: Catalogo[];
  
  /**
   * Catálogo de códigos de transportación aérea
   */
  public ideCodTransportacionAerea!: Catalogo[];
  
  /**
   * Datos de consulta del trámite desde estado global
   */
  consultaDatos!: ConsultaioState;
  
  /**
   * Indica si se deben mostrar datos de respuesta directamente
   */
  public esDatosRespuesta: boolean = false;
  
  /**
   * Notificador para desuscripciones
   */
  private destroyNotifier$ = new Subject<void>();
  
  /**
   * Estado de transportación marítima
   */
  public transportacionMaritimaState!: Tramitenacionales40402State;
  
  /**
   * Indica si el formulario es de solo lectura
   */
  soloLectura: boolean = false;

  /**
   * Constructor del componente
   * 
   * @param fb - Constructor de formularios reactivos
   * @param tramite40402Service - Servicio para operaciones de trámite
   * @param consultaioQuery - Consulta de estado de trámite
   * @param tramite40402Query - Consulta de estado específico
   * @param store - Almacenamiento de estado del trámite
   */
  constructor(
    private fb: FormBuilder,
    private tramite40402Service: Tramite40402Service,
    private consultaioQuery: ConsultaioQuery,
    private tramite40402Query: Tramite40402Query,
    private store: Tramite40402Store
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
    this.tramite40402Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
        })
      )
      .subscribe();

    this.inicializarFormulario();
    this.cargarCodigoTransportacion();
    this.cargarTipoCaatAereo();
    this.tipoDeCaatAereaData();
    this.ideCodTransportacionAereaData();
    
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario reactivo
   */
  private inicializarFormulario(): void {
    this.formulario = this.fb.group({
      idSolicitud: [''],
      idPersonaSolicitud: [''],
      ideGenerica1: [''],
      claveFolioCAAT: ['', [Validators.required, Validators.maxLength(4)]],
      cveFolioCaat: [''],
      descripcionTipoCaat: [''],
      tipoDeCaatAerea: [this.transportacionMaritimaState?.tipoDeCaatAerea],
      ideCodTransportacionAerea: [this.transportacionMaritimaState?.ideCodTransportacionAerea],
      codIataIcao: [this.transportacionMaritimaState?.codIataIcao],
      fechaInicioVigencia: [''],
      fechaFinVigencia: [''],
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Obtiene solicitudes CAAT como FormArray
   * 
   * @returns FormArray de solicitudes CAAT
   */
  get caatSolicitudes(): FormArray {
    return this.formulario.get('solicitud.caatSolicitudes') as FormArray;
  }

  /**
   * Carga códigos de transportación desde servicio
   */
  public cargarCodigoTransportacion(): void {
    this.tramite40402Service
      .geTideCodTransportacionAerea()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.codigoTransportacion = datos;
      });
  }

  /**
   * Carga tipos de CAAT aéreo desde servicio
   */
  public cargarTipoCaatAereo(): void {
    this.tramite40402Service
      .getTipoDeCaatAerea()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.tipoCaatAereo = datos;
      });
  }

  /**
   * Marca todos los controles de un formGroup como touched
   * 
   * @param formGroup - Grupo de formulario a marcar
   */
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  /**
   * Busca solicitud por clave CAAT
   */
  buscarSolicitudPorCAAT(): void {
    if (this.formulario.valid) {
      const CLAVE_FOLIO = this.formulario.get('claveFolioCAAT')?.value;
      this.tramite40402Service
        .buscarSolicitudPorCAATe(CLAVE_FOLIO)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((respuesta: CAATSolicitud) => {
          if (respuesta) {
            this.formulario.patchValue({
              idSolicitud: respuesta.idSolicitud || '',
              idPersonaSolicitud: respuesta.idPersonaSolicitud || '',
              ideGenerica1: respuesta.ideGenerica1 || '',
              claveFolioCAAT: respuesta.claveFolioCAAT || '',
              cveFolioCaat: respuesta.cveFolioCaat || '',
              descripcionTipoCaat: respuesta.descripcionTipoCaat || '',
              tipoDeCaatAerea: respuesta.tipoDeCaatAerea || '',
              ideCodTransportacionAerea:
                respuesta.ideCodTransportacionAerea || '',
              codIataIcao: respuesta.codIataIcao || '',
              fechaInicioVigencia: respuesta.fechaInicioVigencia || '',
              fechaFinVigencia: respuesta.fechaFinVigencia || '',
            });
          }
        });
    }
  }

  /**
   * Carga datos de catálogo tipo CAAT aéreo
   */
  tipoDeCaatAereaData(): void {
    this.tramite40402Service
      .getTipoDeCaatAerea()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.tipoDeCaatAerea = data;
      });
  }

  /**
   * Carga datos de catálogo códigos transportación aérea
   */
  ideCodTransportacionAereaData(): void {
    this.tramite40402Service
      .geTideCodTransportacionAerea()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.ideCodTransportacionAerea = data;
      });
  }

  /**
   * Destrucción del componente
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Establece valores en el store
   * 
   * @param form - Formulario origen
   * @param campo - Nombre del campo
   * @param metodoNombre - Método del store a invocar
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite40402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Inicializa estado de habilitación del formulario
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.formulario?.disable();
    } else {
      this.formulario?.enable();
    }
  }
}