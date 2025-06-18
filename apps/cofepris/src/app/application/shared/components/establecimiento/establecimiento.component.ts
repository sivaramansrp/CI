/**
 * compodoc
 * @fileoverview Componente `EstablecimientoComponent`
 * Este componente gestiona el formulario relacionado con los datos del establecimiento,
 * incluyendo información sobre productos, países de origen, países de procedencia,
 * y otros datos relacionados. También permite la interacción con modales y listas cruzadas.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { CommonModule } from '@angular/common';


import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Modal } from 'bootstrap';

import { map, Subject, takeUntil } from 'rxjs';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import { CROSLISTA_DE_PAISES } from '../../constantes/datos-solicitud.enum';

import { DatosDeLaProductoModel } from '../../models/datos-de-la-solicitud.model';

import { EstablecimientoService } from '../../services/establecimiento.service';

import { ManifiestosRepresentanteSeccionComponent } from '../manifiestos-representante-seccion/manifiestos-representante-seccion.component';

import { DomicillioDelEstablecimientoSeccionComponent } from '../domicillio-del-establecimiento-seccion/domicillio-del-establecimiento-seccion.component';

import { DatosDelEstablecimientoSeccionComponent } from '../datos-del-establecimiento-seccion/datos-del-establecimiento-seccion.component';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';

import { DATOS_DE_LA_PRODUCTO_MODEL } from '../../constantes/aviso-de-funcionamiento.enum';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
/**
 * Componente `EstablecimientoComponent`
 * Componente que gestiona los datos del establecimiento.
 */
@Component({
  selector: 'app-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    DomicillioDelEstablecimientoSeccionComponent,
    ManifiestosRepresentanteSeccionComponent,
    DatosDelEstablecimientoSeccionComponent,
  ],
  templateUrl: './establecimiento.component.html',
  styleUrl: './establecimiento.component.scss',
})
/**
 * compo doc
 * @description
 */
export class EstablecimientoComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Lista de países disponibles para la selección de procedencia.
   */
  public paisDeProcedenciaDatos = CROSLISTA_DE_PAISES;

  /**
   * Etiquetas para la lista cruzada de países de origen.
   */
  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)',
  };

  /**
   * Etiquetas para la lista cruzada de países de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };

  /**
   * Lista de países disponibles para la selección de origen.
   */
  public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;

  /**
   * Referencia al modal de datos de mercancía.
   */
  @ViewChild('datosMercanciaModal', { static: false })
  datosMercanciaModal!: ElementRef;

  /**
   * Referencias a los componentes de listas cruzadas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  @ViewChildren(CrosslistComponent) crossList1!: QueryList<CrosslistComponent>;

  /**
   * Instancia del modal de Bootstrap.
   */
  datosModalInstance!: Modal;

  /**
   * Formulario para gestionar los datos del producto.
   */
  datosProductoForm!: FormGroup;

  /**
   * Formulario para gestionar los datos de la mercancía.
   */
  datosMercanciaForm!: FormGroup;

  /**
   * Datos de los productos agregados.
   */
  establecimientoData: DatosDeLaProductoModel[] = [];

  /**
   * Configuración de las columnas de la tabla dinámica para los datos del producto.
   */
  configuracionTablaDatosProducto: ConfiguracionColumna<DatosDeLaProductoModel>[] = DATOS_DE_LA_PRODUCTO_MODEL;

  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Enumeración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Datos del catálogo de estados.
   */
  estadoJson: Catalogo[] = [];

  /**
   * Datos del catálogo de tipo de producto.
   */
  catalogoTipoProducto: Catalogo[] = [];

  /**
   * Datos del catálogo de unidad de medida.
   */
  unidadDeMedida: Catalogo[] = [];

  /**
   * Datos del catálogo de uso específico.
   */
  usoEspecifico: Catalogo[] = [];

  /**
   * Estado del colapsable para países de procedencia.
   */
  colapsable_procedencia: boolean = false;

  /**
   * Lista de países seleccionados como procedencia.
   */
  public seleccionadasPaisDeProcedenciaDatos: string[] = [];

  /**
   * Estado del colapsable para países de origen.
   */
  colapsable: boolean = false;

  /**
   * Lista de países seleccionados como origen.
   */
  public seleccionadasPaisDeOriginDatos: string[] = [];

  /**
   * Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param establecimientoService Servicio para obtener datos relacionados con el establecimiento.
   * @param establecimientoStore Store para gestionar el estado del establecimiento.
   * @param establecimientoQuery Query para obtener el estado inicial del establecimiento.
   */
  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService,
    private establecimientoStore: DatosDelSolicituteSeccionStateStore,
    private establecimientoQuery: DatosDelSolicituteSeccionQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.datosMercanciaModal) {
      this.datosModalInstance = new Modal(this.datosMercanciaModal.nativeElement);
    }
  }

  /**
   * Ciclo de vida `OnInit`.
   * Inicializa los formularios y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.loadEstado();
    this.loadTipoProducto();
    this.loadUnidadDeMedida();
    this.loadUsoEspecifico();

    this.datosMercanciaForm = this.fb.group({
      nombreEspecifico: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccionArancelaria: [{ value: null, disabled: true }, Validators.required],
      cantidadUMT: ['', Validators.required],
      umt: [{ value: null, disabled: true }, Validators.required],
      cantidadOVolumen: ['', Validators.required],
      unidadDeMedida: ['', Validators.required],
      transporteEnvaseSecundario: [''],
      transporteEnvasePrimario: [''],
      almacenamientoEnvaseSecundario: [''],
      usoEspecifico: ['', Validators.required],
      almacenamientoEnvasePrimario: [''],
      presentacionaFrmaceutica: ['', Validators.required],
    });
    this.estadoActualizacion();
    this.inicializarEstadoFormulario();
    this.establecimientoService.getDatosDelProducto().pipe(takeUntil(this.destroy$))
      .subscribe((response: DatosDeLaProductoModel[]) => {
        this.establecimientoData= response;
     });
  }

    /**
     * Inicializa el estado del formulario según el modo de solo lectura.
     * Si el formulario está en modo solo lectura, lo deshabilita; de lo contrario, actualiza el estado.
     */
    inicializarEstadoFormulario(): void {
      if (this.esFormularioSoloLectura) {
        this.guardarDatosFormulario();
      } 
    }

    /**
     * Guarda el estado del formulario y lo deshabilita si está en modo solo lectura.
     * Si no está en modo solo lectura, habilita el formulario.
     */
    guardarDatosFormulario(): void {
      if (this.esFormularioSoloLectura) {
        this.datosMercanciaForm?.disable();
      } else {
        this.datosMercanciaForm?.enable();
      }
    }

  /**
   * Actualiza el estado de los datos del establecimiento desde el store.
   */
  estadoActualizacion(): void {
    this.establecimientoQuery
      .select('establecimientoData')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.establecimientoData = data;
      });
  }

  /**
   * Maneja el cambio de selección de países de origen.
   * @param events Lista de países seleccionados.
   */
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.datosMercanciaForm.patchValue({
      paisDeOriginDatos: events,
    });
  }

  /**
   * Maneja el cambio de selección de países de procedencia.
   * @param events Lista de países seleccionados.
   */
  paisDeProcedenciaSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeProcedenciaDatos = events;
    this.datosMercanciaForm.patchValue({
      paisDeProcedenciaDatos: events,
    });
  }

  /**
   * Guarda los datos de la mercancía y los agrega a la tabla.
   */
  guardarDatosMercancia(): void {
    if (this.datosMercanciaForm) {
      const MERCANCIA_DATA: DatosDeLaProductoModel = {
        tipoDeProducto: this.datosMercanciaForm.get('tipoDeProducto')?.value,
        nombreEspecifico: this.datosMercanciaForm.get('nombreEspecifico')?.value,
        cantidadOVolumen: this.datosMercanciaForm.get('cantidadOVolumen')?.value,
        unidadDeMedida: this.datosMercanciaForm.get('unidadDeMedida')?.value,
        Presentacion: this.datosMercanciaForm.get('presentacionaFrmaceutica')?.value,
        fraccionArancelaria: this.datosMercanciaForm.get('fraccionArancelaria')?.value,
        descripcionDeLaFraccion: this.datosMercanciaForm.get('descripcionFraccionArancelaria')?.value,
        unidadDeMedidaDeTarifa: this.datosMercanciaForm.get('umt')?.value,
        cantidadUMT: this.datosMercanciaForm.get('cantidadUMT')?.value,
        envasePrimario: this.datosMercanciaForm.get('almacenamientoEnvasePrimario')?.value,
        envaseSecundario: this.datosMercanciaForm.get('almacenamientoEnvaseSecundario')?.value,
        paisDeOrigen: this.seleccionadasPaisDeOriginDatos.join(', '),
        paisDeProcedencia: this.seleccionadasPaisDeProcedenciaDatos.join(', '),
        paisDeDestino: this.datosMercanciaForm.get('paisDeDestino')?.value,
        usoEpecifico: this.datosMercanciaForm.get('usoEspecifico')?.value,
      };

      const IS_EMPTY = Object.values(MERCANCIA_DATA).every((value) => !value);

      if (IS_EMPTY) {
        return;
      }

      const UPDATED_DATA = [...this.establecimientoData, MERCANCIA_DATA];
      this.establecimientoStore.update({ establecimientoData: UPDATED_DATA });

      this.datosMercanciaForm.reset();
      this.closeDatosMercanciaModal();
    }
  }

  /**
   * Maneja el evento blur en el campo RFC del representante.
   */
  onRepresentanteRfcBlur(): void {
    const FRACCION_ARANCELARIA = this.datosMercanciaForm.get('fraccionArancelaria')?.value;

    if (FRACCION_ARANCELARIA) {
      this.datosMercanciaForm.patchValue({
        descripcionFraccionArancelaria: 'Los demás. Unicamente: Organos y células de origen humano para fines de docencia',
        umt: 'Kilogramo',
      });
    }
  }

  /**
   * Limpia todos los campos del formulario.
   */
  limpiarFormulario(): void {
    this.datosMercanciaForm.reset();
  }

  /**
   * Carga los datos del catálogo de estados.
   */
  loadEstado(): void {
    this.establecimientoService
      .getEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estadoJson = resp;
      });
  }

  /**
   * Carga los datos del catálogo de tipo de producto.
   */
  loadTipoProducto(): void {
    this.establecimientoService
      .getTipoDeProductoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.catalogoTipoProducto = resp;
      });
  }

  /**
   * Carga los datos del catálogo de unidad de medida.
   */
  loadUnidadDeMedida(): void {
    this.establecimientoService
      .getUnidadDeMedidaData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.unidadDeMedida = resp;
      });
  }

  /**
   * Carga los datos del catálogo de uso específico.
   */
  loadUsoEspecifico(): void {
    this.establecimientoService
      .getUsoEspecificoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.usoEspecifico = resp;
      });
  }

  /**
   * Botones para gestionar la lista cruzada de países de procedencia.
   */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList1.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList1.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList1.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Botones para gestionar la lista cruzada de países de origen.
   */
  paisDeOriginBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Abre el modal de datos de mercancía.
   */
  openDatosMercanciaModal(): void {
    this.datosModalInstance.show();
  }

  /**
   * Cierra el modal de datos de mercancía.
   */
  closeDatosMercanciaModal(): void {
    this.datosModalInstance.hide();
  }

  /**
   * Alterna el estado del colapsable para países de origen.
   */
  mostrar_colapsable_pais(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Alterna el estado del colapsable para países de procedencia.
   */
  mostrar_colapsable_pais_procedencia(): void {
    this.colapsable_procedencia = !this.colapsable_procedencia;
  }

  /**
   * Ciclo de vida `OnDestroy`.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}