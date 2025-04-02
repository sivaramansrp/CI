import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

import { Catalogo, CatalogosSelect, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@libs/shared/data-access-user/src';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosDelCafeComponent } from './datos-del-cafe/datos-del-cafe.component';
import { RegistrarSolicitudService } from '../services/registrar-solicitud.service';
import { Solicitud290201Query } from '../../../estados/queries/tramites290201.query';
import { Solicitud290201State, Solicitud290201Store } from '../../../estados/tramites/tramites290201.store';

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
export class DatosTramiteComponent implements OnDestroy, OnInit {
  /** Formulario para la información del café */
  informationCafeForm!: FormGroup;

  /** Estado de la información del café */
  public informationCafeState!: Solicitud290201State;

  /** Datos de la tabla */
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  /** Sujeto para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Configuración de datos para el campo "Tipos" */
  public tiposData: CatalogosSelect = {
    labelNombre: 'Tipos',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "Formas del café" */
  public formasdelcafeData: CatalogosSelect = {
    labelNombre: 'Formas del café',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "Calidad" */
  public calidadData: CatalogosSelect = {
    labelNombre: 'Calidad',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "Procesos" */
  public procesosData: CatalogosSelect = {
    labelNombre: 'Procesos',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "Certificaciones" */
  public certificationsData: CatalogosSelect = {
    labelNombre: 'Certificaciones',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "Aduana de salida" */
  public adunadesalidaData: CatalogosSelect = {
    labelNombre: 'Aduana de salida',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "País destino" */
  public paisdestinoData: CatalogosSelect = {
    labelNombre: 'País destino',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "Entidad de procedencia" */
  public entidaddeprocedenciaData: CatalogosSelect = {
    labelNombre: 'Entidad de procedencia',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos para el campo "Ciclo cafetalero" */
  public ciclocafetaleroData: CatalogosSelect = {
    labelNombre: 'Ciclo cafetalero',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  constructor(
    /** Servicio para registrar solicitudes */
    private registrarsolicitud: RegistrarSolicitudService,

    /** Constructor del formulario */
    private fb: FormBuilder,

    /** Almacén de estado para la solicitud */
    private solicitud290201Store: Solicitud290201Store,

    /** Consulta de estado para la solicitud */
    private solicitud290201Query: Solicitud290201Query
  ) {}

  

  /** Crea el formulario para la información del café */
  createForm() {
    this.informationCafeForm = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        formasdelcafe: [this.informationCafeState?.formasdelcafe, Validators.required],
        tipos: [this.informationCafeState?.tipos, Validators.required],
        calidad: [this.informationCafeState?.calidad, Validators.required],
        procesos: [this.informationCafeState?.procesos, Validators.required],
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
  }

  /** Obtiene los datos para el campo "Tipos" */
  getTiposData() {
    this.registrarsolicitud
      .getTiposData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tiposData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Formas del café" */
  getFormasdelcafeData() {
    this.registrarsolicitud
      .getFormasdelcafeData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.formasdelcafeData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Calidad" */
  getCalidadData() {
    this.registrarsolicitud
      .getCalidadData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.calidadData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Procesos" */
  getProcesosData() {
    this.registrarsolicitud
      .getProcesosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.procesosData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Aduana de salida" */
  getAduanadesalidaData() {
    this.registrarsolicitud
      .getAduanadesalidaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.adunadesalidaData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Entidad de procedencia" */
  getEntidadDeProcedenciaData() {
    this.registrarsolicitud
      .getEntidadDeProcedenciaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidaddeprocedenciaData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos para el campo "Ciclo cafetalero" */
  getCiclocafetaleroData() {
    this.registrarsolicitud
      .getCiclocafetaleroData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.ciclocafetaleroData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene el formulario anidado "datosDelTramiteRealizar" */
  get datosDelTramiteRealizar(): FormGroup {
    return this.informationCafeForm.get('datosDelTramiteRealizar') as FormGroup;
  }

  /**
   * Establece valores en el almacén de estado
   * @param form Formulario del cual se obtiene el valor
   * @param campo Campo del formulario
   * @param metodoNombre Método del almacén de estado
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud290201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud290201Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /** Limpia los recursos al destruir el componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
