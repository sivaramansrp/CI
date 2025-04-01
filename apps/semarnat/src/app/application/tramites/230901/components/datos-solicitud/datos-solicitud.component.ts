import { AQUANDAS_CROSSLIST_LABEL, MENSAJE_DE_ALERTA_MERCANCIA, MOVIMIENTO_CROSSLIST_LABEL } from '../../enum/autorizaciones.enum';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionColumna, CrossListLable, CrosslistComponent, REGEX_SEPARADO_POR_COMAS, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MERCANCIA_TABLA_CONFIGURACION, MercanciaConfiguracionItem } from '../../enum/mercancia-tabla.enum';
import { Solicitud230901State, Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

/*
 * Componente que gestiona los datos de la solicitud, incluyendo la configuración de formularios,
 * tablas dinámicas y la interacción con servicios relacionados con autorizaciones de vida silvestre.
 */
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.css'],
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

  /**
   * Referencia al componente Crosslist para gestionar listas dinámicas.
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;

  /**
   * Formulario reactivo para los datos de la solicitud.
   */
  formSolicitud!: FormGroup;

  /**
   * Formulario reactivo para los datos de la mercancía.
   */
  formMercancia!: FormGroup;

  /**
   * Tipo de movimiento seleccionado en el formulario.
   */
  tipoMovimientoSeleccionada!: number;

  /**
   * Indica si se seleccionó otra fracción en el formulario de mercancía.
   */
  otraFraccionSeleccionada!: boolean;

  /**
   * Estado actual de la solicitud.
   */
  solicitud230901State!: Solicitud230901State;

  /**
   * Configuración de botones para la lista dinámica de aduanas.
   */
  crossListBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('t');
        }
      },
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('');
        }
      },
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('');
        }
      },
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('t');
        }
      },
    },
  ];

  /**
   * Etiquetas para las listas dinámicas de aduanas.
   */
  aquandasLabel: CrossListLable = AQUANDAS_CROSSLIST_LABEL;

  /**
   * Botones configurados para la lista dinámica de aduanas.
   */
  aduanasBotons = this.crossListBotons;

  /**
   * Lista original de aduanas disponibles.
   */
  listaOriginalAduanas: string[] = [];

  /**
   * Lista de aduanas seleccionadas.
   */
  listaSeleccionadaAduanas: string[] = [];

  /**
   * Etiquetas para las listas dinámicas de movimientos.
   */
  movimientoLabel: CrossListLable = MOVIMIENTO_CROSSLIST_LABEL;

  /**
   * Botones configurados para la lista dinámica de movimientos.
   */
  movimientoBotons = this.crossListBotons;

  /**
   * Lista original de movimientos disponibles.
   */
  listaOriginalMovimiento: string[] = [];

  /**
   * Lista de movimientos seleccionados.
   */
  listSeleccionadaMovimiento: string[] = [];

  /**
   * Configuración de las columnas para la tabla de mercancías.
   */
  configuracionTabla: ConfiguracionColumna<MercanciaConfiguracionItem>[] = MERCANCIA_TABLA_CONFIGURACION;

  /**
   * Tipo de selección para la tabla dinámica.
   */
  tablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos de la tabla de mercancías.
   */
  tablaDatos: MercanciaConfiguracionItem[] = [
    {
      fraccionArancelaria: '12345678',
      otraFraccion: false,
      descripcion: 'Descripción de la mercancía',
      rendimientoProducto: 'Rendimiento del producto',
      clasificacionTaxonomica: 'Clasificación taxonómica',
      nombreCientifico: 'Nombre científico',
      nombreComun: 'Nombre común',
      marca: 'Marca de la mercancía',
      cantidad: 10,
      unidadMedida: 'Unidad de medida',
      paisOrigen: 'País de origen',
      paisProcedencia: 'País de procedencia',
    },
  ];

  /**
   * Fila seleccionada en la tabla de mercancías.
   */
  filaSeleccionada!: MercanciaConfiguracionItem;

  /**
   * Indica si se debe mostrar el modal de datos de mercancía.
   */
  showDatosMercanciaModal: boolean = false;

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Mensaje de alerta relacionado con la mercancía.
   */
  public alert_message: string = MENSAJE_DE_ALERTA_MERCANCIA;

  /**
   * Constructor del componente.
   * autorizacionesDeVidaSilvestreService Servicio para manejar datos relacionados con autorizaciones de vida silvestre.
   * tramite230901Store Almacén de estado para el trámite 230901.
   * tramite230901Query Consulta de estado para el trámite 230901.
   * formBuilder Constructor de formularios reactivos.
   */
  constructor(
    public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    public formBuilder: FormBuilder
  ) {
    // No se realiza ninguna acción aquí en el constructor.
  }
  

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaDatosSolicitudDatosCatalogos();

    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.solicitud230901State = state;
      });

    this.createFormSolitude();
    this.onTipoMovimientoChange();
}

  /**
   * Crea el formulario reactivo para los datos de la solicitud.
   */
  createFormSolitude(): void {
    this.formSolicitud = this.formBuilder.group({
      tipodemovimiento: [this.solicitud230901State.tipoDeMovimiento, Validators.required],
      tipoderegimen: [this.solicitud230901State.tipoDeRegimen, Validators.required],
    });
  }

  /**
   * Crea el formulario reactivo para los datos de la mercancía.
   * data Datos iniciales para el formulario de mercancía.
   */
  createFormMercancia(data?: MercanciaConfiguracionItem): void {
    this.formMercancia = this.formBuilder.group({
      fraccionArancelaria: [data?.fraccionArancelaria || '', Validators.required],
      fraccionDescripcion: [data?.descripcion || ''],
      otraFraccion: [data?.otraFraccion || false],
      descripcion: [data?.descripcion || '', Validators.required],
      rendimientoProducto: [data?.rendimientoProducto || ''],
      clasificacionTaxonomica: [data?.clasificacionTaxonomica || '', Validators.required],
      nombreCientifico: [data?.nombreCientifico || '', Validators.required],
      nombreComun: [data?.nombreComun || '', Validators.required],
      marca: [data?.marca || '',Validators.required],
      cantidad: [data?.cantidad || '',[Validators.required, Validators.pattern(REGEX_SEPARADO_POR_COMAS)]],
      unidadMedida: [data?.unidadMedida || '', Validators.required],
      paisOrigen: [data?.paisOrigen || '', Validators.required],
      paisProcedencia: [data?.paisProcedencia || '', Validators.required],
    });

    this.formMercancia.get('fraccionDescripcion')?.disable();

    this.formMercancia.get('otraFraccion')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.formMercancia.addControl(
          'fraccionVigenteTIGIE',
          this.formBuilder.control('', Validators.required)
        );
        this.formMercancia.get('fraccionArancelaria')?.setValue('0');
        this.formMercancia.get('fraccionDescripcion')?.reset();
        this.otraFraccionSeleccionada = true;
      } else {
        this.formMercancia.removeControl('fraccionVigenteTIGIE');
        this.otraFraccionSeleccionada = false;
      }
    });
  }

  /**
   * Maneja el cambio en el tipo de movimiento seleccionado.
   */
  onTipoMovimientoChange(): void {
    const TIPO_DE_MOVIMIENTO = this.formSolicitud.get('tipodemovimiento')?.value;
    this.tramite230901Store.setTipoDeMovimiento(TIPO_DE_MOVIMIENTO);
    if (TIPO_DE_MOVIMIENTO === '1') {
      this.aduanasBotons = this.crossListBotons.slice(1);
    } else {
      this.aduanasBotons = this.crossListBotons;
    }
    this.tipoMovimientoSeleccionada = parseInt(TIPO_DE_MOVIMIENTO, 10);
  }

  /**
   * Maneja el cambio en el tipo de régimen seleccionado.
   */
  onTipoRegimenChange(): void {
    this.tramite230901Store.setTipoDeRegimen(this.formSolicitud.get('tipoderegimen')?.value);
  }

  /**
   * Maneja la fila seleccionada en la tabla de mercancías.
   * fila Fila seleccionada.
   */
  hadleFilaSeleccionada(fila: MercanciaConfiguracionItem): void {
    this.filaSeleccionada = fila;
    this.createFormMercancia(fila);
    this.showMercanciaFormModal();
  }

  /**
   * Alterna la visibilidad del modal de datos de mercancía.
   */
  toggleDivMercancia(): void {
    this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
  }

  /**
   * Muestra el formulario de mercancía en un modal.
   */
  showMercanciaFormModal(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaMercanciaDatosCatalogos();
    this.createFormMercancia();
    this.toggleDivMercancia();
  }

  esInvalido(formControlName: string): boolean {
    const CONTROL = this.formMercancia.get(formControlName);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }
    

  /**
   * Envía el formulario de mercancía y agrega los datos a la tabla.
   */
  submitMercanciaForm(): void {
    if(this.formMercancia.invalid) {
      return;
    }
    const TABLA_ROW: MercanciaConfiguracionItem = {
      fraccionArancelaria: this.autorizacionesDeVidaSilvestreService.fraccionArancelaria[
        this.formMercancia.get('fraccionArancelaria')?.value
      ].descripcion,
      otraFraccion: this.formMercancia.get('otraFraccion')?.value,
      descripcion: this.formMercancia.get('descripcion')?.value,
      rendimientoProducto: this.formMercancia.get('rendimientoProducto')?.value,
      clasificacionTaxonomica: this.autorizacionesDeVidaSilvestreService.clasificacionTaxonomica[
        this.formMercancia.get('clasificacionTaxonomica')?.value - 1
      ].descripcion,
      nombreCientifico: this.autorizacionesDeVidaSilvestreService.nombreCientifico[
        this.formMercancia.get('nombreCientifico')?.value - 1
      ].descripcion,
      nombreComun: this.autorizacionesDeVidaSilvestreService.nombreComun[
        this.formMercancia.get('nombreComun')?.value - 1
      ].descripcion,
      marca: this.formMercancia.get('marca')?.value,
      cantidad: this.formMercancia.get('cantidad')?.value,
      unidadMedida: this.autorizacionesDeVidaSilvestreService.unidadMedida[
        this.formMercancia.get('unidadMedida')?.value - 1
      ].descripcion,
      paisOrigen: this.autorizacionesDeVidaSilvestreService.paisOrigen[
        this.formMercancia.get('paisOrigen')?.value - 1
      ].descripcion,
      paisProcedencia: this.autorizacionesDeVidaSilvestreService.paisProcedencia[
        this.formMercancia.get('paisProcedencia')?.value - 1
      ].descripcion,
    };
    this.tablaDatos.push(TABLA_ROW);
    this.formMercancia.reset();
    this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
  }

  /**
   * Maneja el evento de cierre del modal de datos de mercancía.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}