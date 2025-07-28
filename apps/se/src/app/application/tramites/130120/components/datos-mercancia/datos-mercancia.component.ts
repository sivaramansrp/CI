import {
  Catalogo,
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  TituloComponent
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { FECHA_FACTURA } from '../../constants/permiso-importacion-modification.enum';
import { PermisoImportacionService } from '../../services/permiso-importacion.service';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';

/**
 * @component DatosMercanciaComponent
 * @description Componente responsable de gestionar el formulario de datos de mercancía para el trámite de permiso de importación.
 * Carga catálogos, construye el formulario reactivo y realiza los cálculos necesarios para valores de factura.
 */
@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent, InputFechaComponent],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {

  /** @property {FormGroup} datosMercanica Formulario reactivo para capturar datos de la mercancía. */
  datosMercanica!: FormGroup;

  /** @property {boolean} esFormularioSoloLectura Indica si el formulario se encuentra en modo de solo lectura. */
  esFormularioSoloLectura: boolean = false;

  /** @property {Catalogo[]} tipoEntradaOpcion Opciones disponibles para el tipo de entrada. */
  tipoEntradaOpcion: Catalogo[] = [];

  /** @property {Catalogo[]} fraccionOpcion Opciones disponibles para fracción arancelaria. */
  fraccionOpcion: Catalogo[] = [];

  /** @property {Catalogo[]} nicoOpcion Opciones disponibles para NICO. */
  nicoOpcion: Catalogo[] = [];

  /** @property {Catalogo[]} umtOpcion Opciones disponibles para unidad de medida de tarifa. */
  umtOpcion: Catalogo[] = [];

  /** @property {Catalogo[]} umcOpcion Opciones disponibles para unidad de medida comercial. */
  umcOpcion: Catalogo[] = [];

  /** @property {Catalogo[]} monedaComercializacionOpcion Opciones disponibles para moneda de comercialización. */
  monedaComercializacionOpcion: Catalogo[] = [];

  /** @property {Catalogo[]} paisExportadorOpcion Opciones disponibles para país exportador. */
  paisExportadorOpcion: Catalogo[] = [];

  /** @property {Catalogo[]} paisOrigenOpcion Opciones disponibles para país de origen. */
  paisOrigenOpcion: Catalogo[] = [];

  /** @property {InputFecha} fechaFactura Campo que representa la fecha de la factura. */
  fechaFactura: InputFecha = FECHA_FACTURA;

  /** @property {Subject<void>} destroyNotifier$ Notificador para limpiar suscripciones en ngOnDestroy. */
  public destroyNotifier$: Subject<void> = new Subject();

  /** @property {number} otroUmcIncrement Incrementador auxiliar para el campo otro_umc. */
  private otroUmcIncrement = 0;

  /** @property {DatosGrupos} DatosState Estado actual de los datos del formulario. */
  private DatosState!: DatosGrupos;

  /**
   * @constructor
   * @param {FormBuilder} fb Constructor de formularios reactivos.
   * @param {PermisoImportacionStore} store Store para manejar el estado de permiso de importación.
   * @param {Tramite130120Query} query Query para obtener el estado de los datos del trámite.
   * @param {ConsultaioQuery} consultaQuery Query para obtener el estado de consulta IO.
   * @param {PermisoImportacionService} permisoImportacionService Servicio para obtener catálogos y datos relacionados.
   * @description Inicializa las dependencias necesarias para el componente DatosMercanciaComponent.
   */
  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery,
    public permisoImportacionService: PermisoImportacionService,
  ) {}

  /**
   * @method ngOnInit
   * @description Inicializa el componente, construye el formulario y carga catálogos necesarios.
   */
  async ngOnInit(): Promise<void> {
    this.query.selectDatos$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.DatosState = state as DatosGrupos;
        })
      )
      .subscribe();
    await this.initActionFormBuild();
    this.ObtenerTipoEntradaOpcion();
    this.ObtenerFraccionOpcion();
    this.obtenerNicoOpcion();
    this.obtenerUmtOpcion();
    this.obtenerUmcOpcion();
    this.obtenerMonedaComercializacionOpcion();
    this.obternerPaisExportadorOpcion();
    this.obtenerPaisOrigenOpcion();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();

    if(this.esFormularioSoloLectura) {
      this.datosMercanica.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Construye el formulario con validaciones e inicializa los valores con datos del estado.
   */
  initActionFormBuild(): void {
    this.datosMercanica = this.fb.group({
      descripcion: [this.DatosState.datosMercanica.descripcion, [Validators.required, Validators.maxLength(4000)]],
      marca: [this.DatosState.datosMercanica.marca, [Validators.required, Validators.maxLength(256), Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      tipo_entrada: [this.DatosState.datosMercanica.tipo_entrada, Validators.required],
      fraccion: [this.DatosState.datosMercanica.fraccion, Validators.required],
      nico: [this.DatosState.datosMercanica.nico, Validators.required],
      umt: [this.DatosState.datosMercanica.umt, Validators.required],
      factura_numero: [this.DatosState.datosMercanica.factura_numero, Validators.required],
      factura_fecha: [this.DatosState.datosMercanica.factura_fecha, Validators.required],
      umc: [this.DatosState.datosMercanica.umc, Validators.required],
      otro_umc: [{ value: this.DatosState.datosMercanica.otro_umc, disabled: true }, [Validators.required]],
      cantidad_umc: [this.DatosState.datosMercanica.cantidad_umc, Validators.required],
      factor_conversion: [{ value: this.DatosState.datosMercanica.factor_conversion, disabled: true }, Validators.required],
      cantidad_umt: [this.DatosState.datosMercanica.cantidad_umt, Validators.required],
      valor_factura: [this.DatosState.datosMercanica.valor_factura, Validators.required],
      moneda_comercializacion: [this.DatosState.datosMercanica.moneda_comercializacion, Validators.required],
      valor_factura_usd: [this.DatosState.datosMercanica.valor_factura_usd, Validators.required],
      precio_unitario_usd: [this.DatosState.datosMercanica.precio_unitario_usd, Validators.required],
      pais_exportador: [this.DatosState.datosMercanica.pais_exportador, Validators.required],
      pais_origen: [this.DatosState.datosMercanica.pais_origen, Validators.required],
      valor_total_factura: [this.DatosState.datosMercanica.valor_total_factura, Validators.required],
      valor_total_factura_usd: [this.DatosState.datosMercanica.valor_total_factura_usd, Validators.required],
    });
  }

  /** @method ObtenerTipoEntradaOpcion Carga las opciones del catálogo de tipo de entrada. */
  ObtenerTipoEntradaOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('tipo_entrada.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.tipoEntradaOpcion = data as Catalogo[];
        },
      });
  }

  /** @method ObtenerFraccionOpcion Carga las opciones del catálogo de fracción arancelaria. */
  ObtenerFraccionOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('fraccion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.fraccionOpcion = data as Catalogo[];
        },
      });
  }

  /** @method obtenerNicoOpcion Carga las opciones del catálogo de NICO. */
  obtenerNicoOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('fraccion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.nicoOpcion = data as Catalogo[];
        },
      });
  }

  /** @method obtenerUmtOpcion Carga las opciones del catálogo de unidad de medida tarifaria. */
  obtenerUmtOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('umt.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.umtOpcion = data as Catalogo[];
        },
      });
  }

  /** @method obtenerUmcOpcion Carga las opciones del catálogo de unidad de medida comercial. */
  obtenerUmcOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('umc.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.umcOpcion = data as Catalogo[];
        },
      });
  }

  /** @method obtenerMonedaComercializacionOpcion Carga las opciones del catálogo de moneda de comercialización. */
  obtenerMonedaComercializacionOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('moneda_comercializacion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.monedaComercializacionOpcion = data as Catalogo[];
        },
      });
  }

  /** @method obternerPaisExportadorOpcion Carga las opciones del catálogo de país exportador. */
  obternerPaisExportadorOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('pais_exportador.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.paisExportadorOpcion = data as Catalogo[];
        },
      });
  }

  /** @method obtenerPaisOrigenOpcion Carga las opciones del catálogo de país de origen. */
  obtenerPaisOrigenOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable('pais_exportador.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.paisOrigenOpcion = data as Catalogo[];
        },
      });
  }

  /**
   * @method fechaCambiado
   * @param {string} evento Nueva fecha seleccionada.
   * @description Actualiza el campo de fecha de factura en el formulario y almacena en el estado.
   */
  fechaCambiado(evento: string): void {
    this.datosMercanica.patchValue({ factura_fecha: evento });
    this.store.setFacturaFecha(evento);
  }

  /** @method setTotalMercanciaImportar Calcula y actualiza el valor total de la factura en USD. */
  setTotalMercanciaImportar(): void {
    const DATOSMERCANICA = this.datosMercanica;
    const VALORTOTALFACTURA = parseFloat(DATOSMERCANICA.get('valor_total_factura')?.value);
    const MONDEDACOMERCIALIZACION = DATOSMERCANICA.get('moneda_comercializacion');
    let RESULTADO;
    if (Number(MONDEDACOMERCIALIZACION?.value) === 2) {
      RESULTADO = VALORTOTALFACTURA * 3.32;
    }
    const VALORTOTALFACTURAUSDCONTROL = DATOSMERCANICA.get('valor_total_factura_usd');
    if (VALORTOTALFACTURAUSDCONTROL) {
      VALORTOTALFACTURAUSDCONTROL.setValue(RESULTADO, { emitEvent: false });
      VALORTOTALFACTURAUSDCONTROL.markAsDirty();
      VALORTOTALFACTURAUSDCONTROL.markAsTouched();
    }
  }

  /** @method setMercanciaImportar Calcula y actualiza el valor de factura y precio unitario en USD. */
  setMercanciaImportar(): void {
    const DATOSMERCANICA = this.datosMercanica;
    const VALOR_FACTURA = parseFloat(DATOSMERCANICA.get('valor_factura')?.value);
    const MONDEDACOMERCIALIZACION = DATOSMERCANICA.get('moneda_comercializacion');
    const PRECIOUNITARIOUSDCONTROL = DATOSMERCANICA.get('precio_unitario_usd');
    let valorFacturaUsd = VALOR_FACTURA;
    let precioUnitarioUsd;
    if (Number(MONDEDACOMERCIALIZACION?.value) === 2) {
      valorFacturaUsd = VALOR_FACTURA * 3.32;
      precioUnitarioUsd = DATOSMERCANICA.get('cantidad_umc')?.value ? (valorFacturaUsd / DATOSMERCANICA.get('cantidad_umc')?.value) : 0;
    } else {
      valorFacturaUsd = Number(VALOR_FACTURA) * 1;
    }
    const VALORFACTURAUSDCONTROL = DATOSMERCANICA.get('valor_factura_usd');
    if (VALORFACTURAUSDCONTROL) {
      VALORFACTURAUSDCONTROL.setValue(valorFacturaUsd, { emitEvent: false });
      VALORFACTURAUSDCONTROL.markAsDirty();
      VALORFACTURAUSDCONTROL.markAsTouched();
    }
    if (PRECIOUNITARIOUSDCONTROL) {
      PRECIOUNITARIOUSDCONTROL.setValue(precioUnitarioUsd, { emitEvent: false });
      PRECIOUNITARIOUSDCONTROL.markAsDirty();
      PRECIOUNITARIOUSDCONTROL.markAsTouched();
    }
  }

  /**
   * @method onUmcChange
   * @param {FormGroup} subformName Subformulario actual.
   * @param {string} campo Campo del formulario que ha cambiado.
   * @param {keyof PermisoImportacionStore} metodoNombre Método del store que será ejecutado.
   * @description Maneja la lógica cuando cambia la unidad de medida comercial (UMC).
   */
  onUmcChange(subformName: FormGroup, campo: string, metodoNombre: keyof PermisoImportacionStore): void {
    this.setValoresStore(subformName, campo, metodoNombre);
    const CONTROL = subformName.get(`${campo}`);
    const UMT = subformName.get('umt');
    const FACTORCONVERSION = subformName.get('factor_conversion');
    const VALOR = CONTROL?.value;
    const UMCCATALOG = this.umcOpcion;
    if (UMCCATALOG && UMCCATALOG.length > 0) {
      const SELECTED = UMCCATALOG.find((item: { id: number, descripcion: string }) => item.id === Number(VALOR));
      if (SELECTED) {
        this.otroUmcIncrement = 10 * Number(SELECTED.id);
        const OTROUMCCONTROL = this.datosMercanica?.get('otro_umc');
        if (OTROUMCCONTROL) {
          OTROUMCCONTROL.setValue(this.otroUmcIncrement);
          OTROUMCCONTROL.markAsDirty();
          OTROUMCCONTROL.markAsTouched();
          this.store.setOtroUmc(this.otroUmcIncrement.toString());
        }
      }
      if (VALOR === UMT?.value) {
        FACTORCONVERSION?.setValue(1);
        FACTORCONVERSION?.disable();
      } else {
        FACTORCONVERSION?.enable();
      }
    }
  }

  /** @method onCantidadUmcOrFactorChange Calcula y actualiza el valor de cantidad en UMT. */
  onCantidadUmcOrFactorChange(): void {
    const CANTIDAD_UMC = parseFloat(this.datosMercanica.get('cantidad_umc')?.value);
    const FACTORCONVERSION = parseFloat(this.datosMercanica.get('factor_conversion')?.value);
    if (!isNaN(CANTIDAD_UMC) && !isNaN(FACTORCONVERSION)) {
      const RESULTADO = (CANTIDAD_UMC * FACTORCONVERSION).toFixed(2);
      const CANTIDAD_UMT_CONTROL = this.datosMercanica?.get('cantidad_umt');
      if (CANTIDAD_UMT_CONTROL) {
        CANTIDAD_UMT_CONTROL.setValue(RESULTADO);
        CANTIDAD_UMT_CONTROL.markAsDirty();
        CANTIDAD_UMT_CONTROL.markAsTouched();
      }
    }
  }

  /**
   * @method setValoresStore
   * @param {FormGroup} form Formulario actual.
   * @param {string} campo Nombre del campo.
   * @param {keyof PermisoImportacionStore} metodoNombre Método de actualización en el store.
   * @description Actualiza el estado en la store con el valor del campo especificado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof PermisoImportacionStore): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * @method ngOnDestroy
   * @description Libera los recursos y detiene todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
