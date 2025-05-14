import { BENEFICIOS_TABLA, BODEGAS_TABLA, CAFE_EXPORTADORES_TABLA, RADIO_OPCION, REGIONES_TABLA } from '../../constants/constants.enum';
import { BeneficiosData, BodegasData, CafeExportadoresData, RegionesData } from '../../models/filadata.model';
import { InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReplaySubject, map, takeUntil } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Solicitud290301State, Solicitud290301Store } from '../../estados/tramite290301.store';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputCheckComponent } from '@libs/shared/data-access-user/src';

import { NacionalRegistroDelCafeExportadoresService } from '../../services/nacional-registro-del-cafe-exportadores.service';
import { Solicitud290301Query } from '../../estados/tramite290301.query';
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent, TablaDinamicaComponent, InputCheckComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /** Formulario reactivo para los datos de la solicitud */
  datosSolicitudForma!: FormGroup;

  /** Opciones de radio para el formulario */
  radioOpcion = RADIO_OPCION;

  /** Tabla de regiones */
  regionesTabla = REGIONES_TABLA;

  /** Tabla de beneficios */
  beneficiosTabla = BENEFICIOS_TABLA;

  /** Tabla de bodegas */
  bodegasTabla = BODEGAS_TABLA;

  /** Tabla de exportadores de café */
  cafeExportadoresTabla = CAFE_EXPORTADORES_TABLA;

  /** Tipo de selección para las tablas */
  tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Datos de la tabla de regiones */
  regionesTableDatos: RegionesData[] = [];

  /** Datos de la tabla de beneficios */
  beneficiosTableDatos: BeneficiosData[] = [];

  /** Datos de la tabla de bodegas */
  bodegasTableDatos: BodegasData[] = [];

  /** Datos de la tabla de exportadores de café */
  cafeExportadoresTableDatos: CafeExportadoresData[] = [];

  /** Estado de la solicitud 290301 */
  solicitud290301State: Solicitud290301State = {} as Solicitud290301State;

  /** Estado de los datos de la solicitud */
  dataDeLaSolicitudState!: Solicitud290301State;

  /** Observable para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    /** Constructor para inicializar servicios y dependencias */
    private fb: FormBuilder,
    private nacionalRegistroDelCafeExportadoresService: NacionalRegistroDelCafeExportadoresService,
    public solicitud290301Store: Solicitud290301Store,
    public solicitud290301Query: Solicitud290301Query
  ) {}

  /** Método que se ejecuta al inicializar el componente */
  ngOnInit(): void {
    this.solicitud290301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState: Solicitud290301State) => {
          this.dataDeLaSolicitudState = seccionState;
        })
      )
      .subscribe();
    this.createForm();  
    this.getRegionsData();
    this.getBeneficiosData();
    this.getBodegasData();
    this.getCafeExportadoresData();
  }

  /** Método para crear el formulario reactivo */
  createForm(): void {
    this.datosSolicitudForma = this.fb.group({
      justificacion: [this.dataDeLaSolicitudState?.justificacion],
      productorDeCafe: [this.dataDeLaSolicitudState?.productorDeCafe || ''], 
      claveDelPadron: [{ 
        value: this.dataDeLaSolicitudState?.claveDelPadron || '', 
        disabled: this.dataDeLaSolicitudState?.productorDeCafe === 'false' 
      }],
       observaciones: [this.dataDeLaSolicitudState?.observaciones],
      requiereInspeccionInmediata: [this.dataDeLaSolicitudState?.requiereInspeccionInmediata],
      informacionConfidencial: [this.dataDeLaSolicitudState?.informacionConfidencial],
    });
  }
/**
 * Método para manejar el cambio del campo "productorDeCafe".
 * Este método habilita o deshabilita el campo "claveDelPadron"
 * dependiendo del valor seleccionado en el radio button.
 * 
 * @param event Evento que se dispara al cambiar la selección del radio button.
 */
handleProductorDeCafeChange(_event: Event): void {
  const VALUE = this.datosSolicitudForma.get('productorDeCafe')?.value; 
  const CLAVE_DEL_PADRON_CONTROL = this.datosSolicitudForma.get('claveDelPadron');

  if (VALUE === 'true') {
    CLAVE_DEL_PADRON_CONTROL?.enable();

  } else if (VALUE === 'false') {
    CLAVE_DEL_PADRON_CONTROL?.disable(); 
    CLAVE_DEL_PADRON_CONTROL?.setValue(''); 
  }
}
  /** Método para obtener los datos de las regiones */
  getRegionsData(): void {
    this.nacionalRegistroDelCafeExportadoresService
      .getRegionsData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.regionesTableDatos = data as RegionesData[];
      });
  }

  /** Método para obtener los datos de los beneficios */
  getBeneficiosData(): void {
    this.nacionalRegistroDelCafeExportadoresService
      .getBeneficiosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.beneficiosTableDatos = data as BeneficiosData[];
      });
  }

  /** Método para obtener los datos de las bodegas */
  getBodegasData(): void {
    this.nacionalRegistroDelCafeExportadoresService
      .getBodegasData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.bodegasTableDatos = data as BodegasData[];
      });
  }

  /** Método para obtener los datos de los exportadores de café */
  getCafeExportadoresData(): void {
    this.nacionalRegistroDelCafeExportadoresService
      .getCafeExportadoresData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.cafeExportadoresTableDatos = data as CafeExportadoresData[];
      });
  }

  /**
   * Método para establecer valores en el store
   * @param form Formulario reactivo
   * @param campo Campo del formulario
   * @param metodoNombre Método del store
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud290301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud290301Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /** Método que se ejecuta al destruir el componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
