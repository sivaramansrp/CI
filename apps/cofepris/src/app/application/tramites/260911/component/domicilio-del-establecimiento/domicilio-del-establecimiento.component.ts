import { AlertComponent, InputCheckComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260911State, Tramite260911Store } from '../../estados/tramite260911.store';
import { ALERT } from '../../enums/domicilio-del-establecimiento.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import {DomicilioDelEstablecimientoService} from '../../services/domicilio-del-establecimiento/domicilio-del-establecimiento.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { MERCANCIAS_DATA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';

import { NICO_TABLA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NicoInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/domicilio-del-establecimiento.enum';

import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260911Query } from '../../estados/tramite260911.query';

import { Validators } from '@angular/forms';

/**
 * Componente para gestionar el domicilio del establecimiento.
 * 
 * @selector app-domicilio-del-establecimiento
 * @standalone true
 * @imports [
 *   CommonModule,
 *   TituloComponent,
 *   ReactiveFormsModule,
 *   CatalogoSelectComponent,
 *   AlertComponent,
 *   TablaDinamicaComponent,
 *   InputRadioComponent
 * ]
 * @templateUrl ./domicilio-del-establecimiento.component.html
 * @styleUrl ./domicilio-del-establecimiento.component.scss
 */
@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    InputCheckComponent
  ],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit , OnDestroy {
  /**
   * Formulario principal.
   */
  form!: FormGroup;

  /**
   * Lista de estados.
   */
  estado: Catalogo[] = [];

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;

  /**
   * Clase de alerta.
   */
  class = 'alert-warning';

  /**
   * Configuración de selección de tabla.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas de la tabla NICO.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos de la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];

  /**
   * Formulario de domicilio.
   */
  domicilio!: FormGroup;

  /**
   * Configuración de columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Manifiestos de alerta.
   */
  manifests = ALERT.MANIFESTS;

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Formulario de representante legal.
   */
  representanteLegal!: FormGroup;

  private destroy$ = new Subject<void>();

  
    /**
     * Estado seleccionado del trámite 260911.
     */
    estadoSeleccionado!: Tramite260911State;


  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param httpServicios Servicio HTTP para realizar peticiones.
   * @param tramite260911Query Consulta de datos del trámite.
   * @param tramite260911Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,
    private tramite260911Query: Tramite260911Query,
    private tramite260911Store: Tramite260911Store,
    private domicilioDelEstablecimientoService:DomicilioDelEstablecimientoService
  ) {
    // Constructor
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.crearFormulario();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();
 
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Método para crear el formulario.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      codigoPostal: ['', [Validators.required]],
      estado: [],
      municipioOAlcaldia: ['', [Validators.required]],
      localidad: [''],
      colonias: [''],
      calle: ['', [Validators.required]],
      lada: [''],
      telefono: ['', [Validators.required]],
    });

    this.domicilio = this.fb.group({
      avisoCheckbox: [true],
      licenciaSanitaria: [{ value: '', disabled: true }],
      regimen: [],
      aduanasEntradas: [],
      aifaCheckbox: [true],
      manifests: [true],
    });

    this.representanteLegal = this.fb.group({
      acuerdoPublico: [],
      rfc: ['', [Validators.required]],
      nombre: [{ value: 'LUIS AMBROSIO', disabled: true }, [Validators.required]],
      apellidoPaterno: [{ value: 'MARTINEZ', disabled: true }, [Validators.required]],
      apellidoMaterno: [{ value: 'VALENZUELA', disabled: true }, [Validators.required]],
    });
  }

  /**
   * Método para obtener los datos de la tabla.
   */
  obtenerTablaDatos(): void {
    this.domicilioDelEstablecimientoService
      .obtenerTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.nicoTablaDatos = data?.data;
      });
  }

   /**
   * Método para obtener la lista de estados.
   */
   obtenerEstadoList(): void {
    this.domicilioDelEstablecimientoService
      .obtenerEstadoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.estado = data?.data || [];
      });
  }
 

  /**
   * Método para obtener los datos de mercancías.
   */
  obtenerMercanciasDatos(): void {
    this.domicilioDelEstablecimientoService
      .obtenerMercanciasDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mercanciasTablaDatos = data?.data || [];
      });
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260911Store.setTramite260911State({
      [control]: VALOR
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite260911Query.selectTramite260911$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
  }
  }