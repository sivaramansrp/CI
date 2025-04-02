import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionColumna, CrossListLable, CrosslistComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Solicitud230902State, Tramite230902Store } from '../../estados/tramite230902.store';
import { CONFIGURACION_TABLA_MERCANCIA, ConfiguracionItem } from '../../enum/mercancia.enum';
import { ALERTA_MERCANCIA } from '../../enum/mercancia-alert.enum';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { MOVIMIENTO_LABEL } from '../../enum/movimiento.enum';
import { AQUANDAS_LABEL } from '../../enum/aquaandas.enum';
import { createCrossListBotons } from '../../enum/crossList-botons.enum';

/**
 * 
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.css'],
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  
  /**
   * 
   * Referencia al componente Crosslist.
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;

  /**
   * 
   * Botones para la lista cruzada.
   */
  crossListBotons: any;

  /**
   * 
   * Botones para el movimiento.
   */
  movimientoBotons: any;

  /**
   * 
   * Botones para las aduanas.
   */
  aduanasBotons: any;

  /**
   * 
   * Formulario de solicitud.
   */
  formSolicitud!: FormGroup;

  /**
   * 
   * Formulario de mercancía.
   */
  formMercancia!: FormGroup;

  /**
   * 
   * Tipo de movimiento seleccionado.
   */
  tipoMovimientoSeleccionada!: number;

  /**
   * 
   * Indica si se ha seleccionado otra fracción.
   */
  otraFraccionSeleccionada!: boolean;

  /**
   * 
   * Estado de la solicitud 230902.
   */
  solicitud230902State!: Solicitud230902State;

  /**
   * 
   * Etiqueta de Aquaandas.
   */
  aquandasLabel: CrossListLable = AQUANDAS_LABEL;

  /**
   * 
   * Lista original de aduanas.
   */
  listaOriginalAduanas: string[] = [];

  /**
   * 
   * Lista seleccionada de aduanas.
   */
  listaSeleccionadaAduanas: string[] = [];

  /**
   * 
   * Etiqueta de movimiento.
   */
  movimientoLabel: CrossListLable = MOVIMIENTO_LABEL;

  /**
   * 
   * Configuración de la tabla de mercancías.
   */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] = CONFIGURACION_TABLA_MERCANCIA;

  /**
   * 
   * Mensaje de alerta relacionado con la mercancía.
   */
  public alert_message: string = ALERTA_MERCANCIA;

  /**
   * 
   * Lista original de movimientos.
   */
  listaOriginalMovimiento: string[] = [];

  /**
   * 
   * Lista seleccionada de movimientos.
   */
  listSeleccionadaMovimiento: string[] = [];

  /**
   * 
   * Tipo de selección de la tabla.
   */
  tablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * 
   * Método para cargar los datos de la tabla.
   */
  loadTablaDatosMethod(): void {
    this.permisoCitesService.loadTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((state) => {
      this.tablaDatos = state;
    });
  }

  /**
   * 
   * Datos de la tabla de mercancías.
   */
  tablaDatos: ConfiguracionItem[] = [];

  /**
   * 
   * Fila seleccionada en la tabla de mercancías.
   */
  filaSeleccionada!: ConfiguracionItem;

  /**
   * 
   * Indica si se debe mostrar el modal de datos de mercancía.
   */
  showDatosMercanciaModal: boolean = false;

  /**
   * 
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * 
   * Constructor del componente.
   * permisoCitesService Servicio para manejar datos relacionados con autorizaciones de vida silvestre.
   * tramite230902Store Almacén de estado para el trámite 230902.
   * tramite230902Query Consulta de estado para el trámite 230902.
   * formBuilder Constructor de formularios reactivos.
   */
  constructor(
    public permisoCitesService: PermisoCitesService,
    private tramite230902Store: Tramite230902Store,
    private tramite230902Query: Tramite230902Query,
    public formBuilder: FormBuilder
  ) {}

  /**
   * 
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.permisoCitesService.inicializaDatosSolicitudDatosCatalogos();
    this.crossListBotons = createCrossListBotons(this.crosslistComponent);
    this.movimientoBotons = this.crossListBotons;
    this.aduanasBotons = this.crossListBotons;

    this.tramite230902Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$)).subscribe((state) => {
        this.solicitud230902State = state;
      });

    this.createFormSolitude();
    this.onTipoMovimientoChange();
    this.loadTablaDatosMethod();
  }

  /**
   * 
   * Crea el formulario reactivo para los datos de la solicitud.
   */
  createFormSolitude(): void {
    this.formSolicitud = this.formBuilder.group({
      tipodemovimiento: [this.solicitud230902State.tipoDeMovimiento, Validators.required],
      tipoderegimen: [this.solicitud230902State.tipoDeRegimen, Validators.required],
    });
  }
  
  resetSolicitudForm(): void {
    if (this.formSolicitud) {
      this.formSolicitud.reset();
    }
  }
  /**
   * 
   * Crea el formulario reactivo para los datos de la mercancía.
   * data Datos iniciales para el formulario de mercancía.
   */
  createFormMercancia(data?: ConfiguracionItem): void {
    this.formMercancia = this.formBuilder.group({
      fraccionArancelaria: [data?.fraccionArancelaria || '', Validators.required],
      fraccionDescripcion: [data?.descripcions || ''],
      otraFraccion: [data?.otraFraccion || false],
      descripcions: [data?.descripcions || '', Validators.required],
      rendimientoProducto: [data?.rendimientoProducto || ''],
      clasificacionTaxonomica: [data?.clasificacionTaxonomica || '', Validators.required],
      nombreCientifico: [data?.nombreCientifico || '', Validators.required],
      nombreComun: [data?.nombreComun || '', Validators.required],
      marca: [data?.marca || '', Validators.required],
      cantidad: [data?.cantidad || '', Validators.required],
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
        this.formMercancia.get('fraccionArancelaria')?.reset();
        this.formMercancia.get('fraccionDescripcion')?.reset();
        this.otraFraccionSeleccionada = true;
      } else {
        this.formMercancia.removeControl('fraccionVigenteTIGIE');
        this.otraFraccionSeleccionada = false;
      }
    });
  }

  /**
   * 
   * Maneja el cambio en el tipo de movimiento seleccionado.
   */
  onTipoMovimientoChange(): void {
    const TIPO_DE_MOVIMIENTO = this.formSolicitud.get('tipodemovimiento')?.value;
    this.tramite230902Store.setTipoDeMovimiento(TIPO_DE_MOVIMIENTO);
    if (TIPO_DE_MOVIMIENTO === '1') {
      this.aduanasBotons = this.crossListBotons.slice(1);
    } else {
      this.aduanasBotons = this.crossListBotons;
    }
    this.tipoMovimientoSeleccionada = parseInt(TIPO_DE_MOVIMIENTO, 10);
  }

  /**
   * 
   * Maneja el cambio en el tipo de régimen seleccionado.
   */

  /**
 * 
 * Maneja el cambio en el tipo de régimen seleccionado.
 */
onTipoRegimenChange(): void {
  this.tramite230902Store.setTipoDeRegimen(this.formSolicitud.get('tipoderegimen')?.value);
}

/**
 * 
 * Maneja la fila seleccionada en la tabla de mercancías.
 * fila Fila seleccionada.
 */
hadleFilaSeleccionada(fila: ConfiguracionItem): void {
  this.filaSeleccionada = fila;
  this.createFormMercancia(fila);
  this.showMercanciaFormModal();
}

/**
 * 
 * Alterna la visibilidad del modal de datos de mercancía.
 */
toggleDivMercancia(): void {
  this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
}

/**
 * 
 * Muestra el formulario de mercancía en un modal.
 */
showMercanciaFormModal(): void {
  this.permisoCitesService.inicializaMercanciaDatosCatalogos();
  this.createFormMercancia();
  this.toggleDivMercancia();
}

/**
 * 
 * Envía el formulario de mercancía y agrega los datos a la tabla.
 */
submitMercanciaForm(): void {
  if (this.formMercancia.invalid) {
    return;
  }

  const TABLA_ROW: ConfiguracionItem = this.formMercancia.value;
  this.tablaDatos.push(TABLA_ROW);
  this.formMercancia.reset();
  this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
}

resetMercanciaForm(): void {
  this.formMercancia.reset();
}

/**
 * 
 * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 */
ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}



}