/**
 * @fileoverview Componente `EstablecimientoComponent`
 * Este componente gestiona el formulario relacionado con los datos del establecimiento,
 * incluyendo información sobre productos, países de origen, países de procedencia,
 * y otros datos relacionados. También permite la interacción con modales y listas cruzadas.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
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

import { Subject, takeUntil } from 'rxjs';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import { CROSLISTA_DE_PAISES } from '../../constantes/datos-solicitud.enum';

import {
  DatosDeLaProductoModel,
} from '../../models/datos-de-la-solicitud.model';

import { EstablecimientoService } from '../../services/establecimiento.service';

import { ManifiestosRepresentanteSeccionComponent } from '../manifiestos-representante-seccion/manifiestos-representante-seccion.component';

import { DomicillioDelEstablecimientoSeccionComponent } from '../domicillio-del-establecimiento-seccion/domicillio-del-establecimiento-seccion.component';

import { DatosDelEstablecimientoSeccionComponent } from '../datos-del-establecimiento-seccion/datos-del-establecimiento-seccion.component';

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
    InputRadioComponent,
    ManifiestosRepresentanteSeccionComponent,
    DatosDelEstablecimientoSeccionComponent
  ],
  templateUrl: './establecimiento.component.html',
  styleUrl: './establecimiento.component.scss',
})
export class EstablecimientoComponent
  implements OnInit, OnDestroy, AfterViewInit
{
 
  public paisDeProcedenciaDatos = CROSLISTA_DE_PAISES;
  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)',
  };
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };
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
   * Formularios para gestionar los datos del producto y de la mercancía.
   */
  datosProductoForm!: FormGroup;
  datosMercanciaForm!: FormGroup;

  /**
   * Datos de los productos agregados.
   */
  propietarioData: DatosDeLaProductoModel[] = [];

  /**
   * Configuración de las columnas de la tabla dinámica para los datos del producto.
   */
  configuracionTablaDatosProducto: ConfiguracionColumna<DatosDeLaProductoModel>[] =
    [
      {
        encabezado: 'Tipo de producto',
        clave: (item: DatosDeLaProductoModel) => item.tipoDeProducto,
        orden: 1,
      },
      {
        encabezado: 'Nombre Específico',
        clave: (item: DatosDeLaProductoModel) => item.nombreEspecifico,
        orden: 2,
      },
      {
        encabezado: 'Cantidad o Volúmen',
        clave: (item: DatosDeLaProductoModel) => item.cantidadOVolumen,
        orden: 3,
      },
      {
        encabezado: 'Unidad de medida',
        clave: (item: DatosDeLaProductoModel) => item.unidadDeMedida,
        orden: 4,
      },
      {
        encabezado: 'Presentación',
        clave: (item: DatosDeLaProductoModel) => item.Presentacion,
        orden: 5,
      },
      {
        encabezado: 'Fracción arancelaria',
        clave: (item: DatosDeLaProductoModel) => item.fraccionArancelaria,
        orden: 6,
      },
      {
        encabezado: 'Descripción de la fracción',
        clave: (item: DatosDeLaProductoModel) => item.descripcionDeLaFraccion,
        orden: 7,
      },
      {
        encabezado: 'Unidad de medida de tarifa (UMT)',
        clave: (item: DatosDeLaProductoModel) => item.unidadDeMedidaDeTarifa,
        orden: 8,
      },
      {
        encabezado: 'Cantidad UMT',
        clave: (item: DatosDeLaProductoModel) => item.cantidadUMT,
        orden: 9,
      },
      {
        encabezado: 'Envase primario',
        clave: (item: DatosDeLaProductoModel) => item.envasePrimario,
        orden: 10,
      },
      {
        encabezado: 'Envase secundario',
        clave: (item: DatosDeLaProductoModel) => item.envaseSecundario,
        orden: 11,
      },
      {
        encabezado: 'País de origen',
        clave: (item: DatosDeLaProductoModel) => item.paisDeOrigen,
        orden: 12,
      },
      {
        encabezado: 'País de procedencia',
        clave: (item: DatosDeLaProductoModel) => item.paisDeProcedencia,
        orden: 13,
      },
      {
        encabezado: 'País de destino',
        clave: (item: DatosDeLaProductoModel) => item.paisDeDestino,
        orden: 14,
      },
      {
        encabezado: 'Uso específico',
        clave: (item: DatosDeLaProductoModel) => item.usoEpecifico,
        orden: 15,
      },
    ];

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
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param establecimientoService Servicio para obtener datos relacionados con el establecimiento.
   */
  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService
  ) {}

  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.datosMercanciaModal) {
      this.datosModalInstance = new Modal(
        this.datosMercanciaModal.nativeElement
      );
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
      descripcionFraccionArancelaria: [
        { value: null, disabled: true },
        Validators.required,
      ],
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
        nombreEspecifico:
          this.datosMercanciaForm.get('nombreEspecifico')?.value,
        cantidadOVolumen:
          this.datosMercanciaForm.get('cantidadOVolumen')?.value,
        unidadDeMedida: this.datosMercanciaForm.get('unidadDeMedida')?.value,
        Presentacion: this.datosMercanciaForm.get('presentacionaFrmaceutica')
          ?.value,
        fraccionArancelaria: this.datosMercanciaForm.get('fraccionArancelaria')
          ?.value,
        descripcionDeLaFraccion: this.datosMercanciaForm.get(
          'descripcionFraccionArancelaria'
        )?.value,
        unidadDeMedidaDeTarifa: this.datosMercanciaForm.get('umt')?.value,
        cantidadUMT: this.datosMercanciaForm.get('cantidadUMT')?.value,
        envasePrimario: this.datosMercanciaForm.get(
          'almacenamientoEnvasePrimario'
        )?.value,
        envaseSecundario: this.datosMercanciaForm.get(
          'almacenamientoEnvaseSecundario'
        )?.value,
        paisDeOrigen: this.seleccionadasPaisDeOriginDatos.join(', '),
        paisDeProcedencia: this.seleccionadasPaisDeProcedenciaDatos.join(', '),
        paisDeDestino: this.datosMercanciaForm.get('paisDeDestino')?.value,
        usoEpecifico: this.datosMercanciaForm.get('usoEspecifico')?.value,
      };

      const IS_EMPTY = Object.values(MERCANCIA_DATA).every((value) => !value);

      if (IS_EMPTY) {
        return;
      }

      this.propietarioData.push(MERCANCIA_DATA);
      this.datosMercanciaForm.reset();
      this.closeDatosMercanciaModal();
    }
  }

  /**
   * Maneja el evento blur en el campo RFC del representante.
   */
  onRepresentanteRfcBlur(): void {
    const FRACCION_ARANCELARIA = this.datosMercanciaForm.get(
      'fraccionArancelaria'
    )?.value;

    if (FRACCION_ARANCELARIA) {
      this.datosMercanciaForm.patchValue({
        descripcionFraccionArancelaria:
          'Los demás. Unicamente: Organos y células de origen humano para fines de docencia',
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