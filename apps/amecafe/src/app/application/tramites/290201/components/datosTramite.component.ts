import { CommonModule } from '@angular/common';

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ReplaySubject,map, takeUntil } from 'rxjs';

import { Catalogo, ConsultaioQuery, ConsultaioState, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@libs/shared/data-access-user/src';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosDelCafeComponent } from './datos-del-cafe/datos-del-cafe.component';
import { RegistrarSolicitudService } from '../services/registrar-solicitud.service';
import { Solicitud290201Query } from '../../../estados/queries/tramites290201.query';

import { Solicitud290201State, Solicitud290201Store } from '../../../estados/tramites/tramites290201.store';
import { CATALOGOS_CONSTANTS } from '../constants/catalogos.enum';
import { Solicitud } from '../models/tabla-model';

@Component({
  selector: 'app-datos-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TableComponent,
    DatosDelCafeComponent,
    DatosDeLaSolicitudComponent,
  ],
  templateUrl: './datosTramite.component.html',
  styleUrl: './datosTramite.component.css',
})
export class DatosTramiteComponent implements OnChanges,OnDestroy, OnInit {

/** Variable para almacenar los datos de la fila seleccionada en la tabla.*/
selectedRowData: Solicitud | null = null;

  /** Formulario para la información del café */
  informationCafeForm!: FormGroup;

  /** Estado de la información del café */
  public informationCafeState!: Solicitud290201State;

  /** Datos de la tabla */
  tableData = {
    tableBody: [],
    tableHeader: [],
  };
  
  /** Consulta de estado para la solicitud */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  esFormularioSoloLectura: boolean = false;
  
  /** Sujeto para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
/** 
 * @property {CatalogosSelect} tiposData
 * @description Configuración de datos para el campo "Tipos".
 */
public tiposData = CATALOGOS_CONSTANTS.TIPOS;

/** 
 * @property {CatalogosSelect} formasdelcafeData
 * @description Configuración de datos para el campo "Formas del café".
 */
public formasdelcafeData = CATALOGOS_CONSTANTS.FORMAS_DEL_CAFE;

/** 
 * @property {CatalogosSelect} calidadData
 * @description Configuración de datos para el campo "Calidad".
 */
public calidadData = CATALOGOS_CONSTANTS.CALIDAD;

/** 
 * @property {CatalogosSelect} procesosData
 * @description Configuración de datos para el campo "Procesos".
 */
public procesosData = CATALOGOS_CONSTANTS.PROCESOS;

/** 
 * @property {CatalogosSelect} certificationsData
 * @description Configuración de datos para el campo "Certificaciones".
 */
public certificationsData = CATALOGOS_CONSTANTS.CERTIFICACIONES;

/** 
 * @property {CatalogosSelect} adunadesalidaData
 * @description Configuración de datos para el campo "Aduana de salida".
 */
public adunadesalidaData = CATALOGOS_CONSTANTS.ADUANA_DE_SALIDA;

/** 
 * @property {CatalogosSelect} paisdestinoData
 * @description Configuración de datos para el campo "País destino".
 */
public paisdestinoData = CATALOGOS_CONSTANTS.PAIS_DESTINO;

/** 
 * @property {CatalogosSelect} entidaddeprocedenciaData
 * @description Configuración de datos para el campo "Entidad de procedencia".
 */
public entidaddeprocedenciaData = CATALOGOS_CONSTANTS.ENTIDAD_DE_PROCEDENCIA;

/** 
 * @property {CatalogosSelect} ciclocafetaleroData
 * @description Configuración de datos para el campo "Ciclo cafetalero".
 */
public ciclocafetaleroData = CATALOGOS_CONSTANTS.CICLO_CAFETALERO;

/** 
 * @property {CatalogosSelect} certificacionsData
 * @description Configuración de datos para el campo "Certificación".
 */
public certificacionsData = CATALOGOS_CONSTANTS.CERTIFICACION;

/** 
 * @property {Solicitud | null} prefilledData
 * @description Datos prellenados que se pueden pasar al componente para inicializar el formulario.
 * @default null
 */
@Input() prefilledData: Solicitud | null = null;

  constructor(
    /** Servicio para registrar solicitudes */
    private registrarsolicitud: RegistrarSolicitudService,

    /** Constructor del formulario */
    private fb: FormBuilder,

    /** Almacén de estado para la solicitud */
    private solicitud290201Store: Solicitud290201Store,

    /** Consulta de estado para la solicitud */
    private solicitud290201Query: Solicitud290201Query,

    /**  */
    private consultaioQuery: ConsultaioQuery,
  ) {}

  /**
 * @method onRowSelected
 * @description Maneja la selección de una fila en la tabla.
 * Actualiza la variable `selectedRowData` con los datos de la fila seleccionada
 * y prellena el formulario con dichos datos.
 * @param {Solicitud} data - Datos de la fila seleccionada.
 */
  onRowSelected(data: Solicitud): void {
    this.selectedRowData = data; 
    this.prefillForm(data); 
  }
  /** Crea el formulario para la información del café */
  createForm(): void{
    this.informationCafeForm = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        formasdelcafe: [this.informationCafeState?.formasdelcafe, Validators.required],
        tipos: [this.informationCafeState?.tipos, Validators.required],
        calidad: [this.informationCafeState?.calidad, Validators.required],
        procesos: [this.informationCafeState?.procesos, Validators.required],
        nombredeagencia: [this.informationCafeState?.nombredeagencia, Validators.required],
        certifications: [this.informationCafeState?.certifications, Validators.required],
        adunadesalida: [this.informationCafeState?.adunadesalida, Validators.required],
        paisdestino: [this.informationCafeState?.paisdestino, Validators.required],
        entidaddeprocedencia: [this.informationCafeState?.entidaddeprocedencia, Validators.required],
        ciclocafetalero: [this.informationCafeState?.ciclocafetalero, Validators.required],
      }),
    });
  }

  /** Inicializa el componente */
  ngOnInit(): void {
    this.solicitud290201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.informationCafeState = seccionState;
        })
      )
      .subscribe();
      

    this.createForm();
    this.getTiposData();
    this.getFormasdelcafeData();
    this.getCalidadData();
    this.getProcesosData();
    this.getAduanadesalidaData();
    this.getEntidadDeProcedenciaData();
    this.getCiclocafetaleroData();
    this.getPaisDestinoData();
    this.getCertificacionData();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
      this.inicializarEstadoFormulario();
  }

  /**
 * @method ngOnChanges
 * @description Detecta cambios en las propiedades de entrada del componente.
 * Si hay cambios en `prefilledData` y contiene datos, prellena el formulario con dichos datos.
 * @param {SimpleChanges} changes - Cambios detectados en las propiedades de entrada.
 */
ngOnChanges(changes: SimpleChanges): void {
    if (changes['prefilledData'] && this.prefilledData) {
      this.prefillForm(this.prefilledData);
    }
}

/**
 * @method prefillForm
 * @description Prellena el formulario con los datos proporcionados.
 * Asigna valores a los campos del formulario basándose en los datos de la solicitud.
 * @param {Solicitud} data - Datos de la solicitud para prellenar el formulario.
 */
prefillForm(data: Solicitud): void {
    this.datosDelTramiteRealizar.patchValue({
      formasdelcafe: data.formasdelcafe,
      tipos: data.tipos,
      calidad: data.calidad,
      procesos: data.procesos,
      nombredeagencia: data.nombredeagencia,
      certifications: data.certifications,
      adunadesalida: data.adunadesalida,
      paisdestino: data.paisdestino,
      entidaddeprocedencia: data.entidaddeprocedencia,
      ciclocafetalero: data.ciclocafetalero,
    });
}
  /** Obtiene los datos para el campo "Tipos" */
  getTiposData(): void {
    this.registrarsolicitud
      .getTiposData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tiposData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Formas del café" */
  getFormasdelcafeData(): void {
    this.registrarsolicitud
      .getFormasdelcafeData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.formasdelcafeData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Calidad" */
  getCalidadData(): void {
    this.registrarsolicitud
      .getCalidadData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.calidadData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Procesos" */
  getProcesosData(): void {
    this.registrarsolicitud
      .getProcesosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.procesosData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Aduana de salida" */
  getAduanadesalidaData(): void {
    this.registrarsolicitud
      .getAduanadesalidaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.adunadesalidaData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Entidad de procedencia" */
  getEntidadDeProcedenciaData(): void {
    this.registrarsolicitud
      .getEntidadDeProcedenciaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidaddeprocedenciaData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Ciclo cafetalero" */
  getCiclocafetaleroData(): void {
    this.registrarsolicitud
      .getCiclocafetaleroData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.ciclocafetaleroData.catalogos = data as Catalogo[];
      });
  }

  /**
 * @method getPaisDestinoData
 * @description Obtiene los datos del catálogo "País destino" y los asigna al campo correspondiente.
 */
  getPaisDestinoData(): void{
    this.registrarsolicitud
      .getPaisDestinoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisdestinoData.catalogos = data as Catalogo[];
      });
  }

  /**
 * @method getCertificacionData
 * @description Obtiene los datos del catálogo "Certificación" y los asigna al campo correspondiente.
 */
  getCertificacionData(): void{
    this.registrarsolicitud
      .getCertificacionData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.certificacionsData.catalogos = data as Catalogo[];
      });
  }
   
  
  /** Obtiene el formulario anidado "datosDelTramiteRealizar" */
  get datosDelTramiteRealizar(): FormGroup {
    return this.informationCafeForm.get('datosDelTramiteRealizar') as FormGroup;
  }

  /**
 * @method inicializarEstadoFormulario
 * @description Inicializa el estado del formulario, habilitándolo o deshabilitándolo según el modo de solo lectura.
 */
 inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.informationCafeForm?.disable();
    }
    else {
      this.informationCafeForm?.enable();
    }
}
  /**
   * Establece valores en el almacén de estado
   * @param form Formulario del cual se obtiene el valor
   * @param campo Campo del formulario
   * @param metodoNombre Método del almacén de estado
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud290201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud290201Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
  }

  /** Limpia los recursos al destruir el componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
