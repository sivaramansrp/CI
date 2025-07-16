import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { FECHA_FACTURA } from '../../constants/permiso-importacion-modification.enum';
import { PermisoImportacionService } from '../../services/permiso-importacion.service';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';


@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent, InputFechaComponent],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {

  datosMercanica!: FormGroup;

  esFormularioSoloLectura: boolean = false;

  tipoEntradaOpcion: Catalogo[] = []

  fraccionOpcion: Catalogo[] = []

  nicoOpcion: Catalogo[] = []

  umtOpcion: Catalogo[] = []

  umcOpcion: Catalogo[] = []

  monedaComercializacionOpcion: Catalogo[] = []

  paisExportadorOpcion: Catalogo[] = []

  paisOrigenOpcion: Catalogo[] = []

  fechaFactura: InputFecha = FECHA_FACTURA

  public destroyNotifier$: Subject<void> = new Subject();

  enableConversion: boolean = true;

  private otroUmcIncrement = 0;

  private DatosState!: DatosGrupos

  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery,
    public permisoImportacionService: PermisoImportacionService,
  ) {
  }

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
  }

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
      otro_umc: [{value:this.DatosState.datosMercanica.otro_umc, disabled:true}, [Validators.required]],
      cantidad_umc: [this.DatosState.datosMercanica.cantidad_umc,Validators.required],
      factor_conversion: [this.DatosState.datosMercanica.factor_conversion, Validators.required],
      cantidad_umt: [this.DatosState.datosMercanica.cantidad_umt, Validators.required],
      valor_factura: [this.DatosState.datosMercanica.valor_factura,Validators.required],
      moneda_comercializacion: [this.DatosState.datosMercanica.moneda_comercializacion, Validators.required],
      valor_factura_usd: [this.DatosState.datosMercanica.valor_factura_usd, Validators.required],
      precio_unitario_usd: [this.DatosState.datosMercanica.precio_unitario_usd, Validators.required],
      pais_exportador: [this.DatosState.datosMercanica.pais_exportador, Validators.required],
      pais_origen: [this.DatosState.datosMercanica.pais_origen, Validators.required],
      valor_total_factura: [this.DatosState.datosMercanica.valor_total_factura, Validators.required],
      valor_total_factura_usd: [this.DatosState.datosMercanica.valor_total_factura_usd, Validators.required],
    })
  }

  ObtenerTipoEntradaOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'tipo_entrada.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.tipoEntradaOpcion = data as Catalogo[];
        },
      });
  }

  ObtenerFraccionOpcion(): void {
  this.permisoImportacionService.obtenerMenuDesplegable(
      'fraccion.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.fraccionOpcion = data as Catalogo[];
        },
      });
  }

  obtenerNicoOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'fraccion.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.nicoOpcion = data as Catalogo[];
        }
      });
  }

  obtenerUmtOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'fraccion.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.umtOpcion = data as Catalogo[];
        }
      });
  }

  obtenerUmcOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'umc.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.umcOpcion = data as Catalogo[];
        }
      });
  }

  obtenerMonedaComercializacionOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'moneda_comercializacion.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.monedaComercializacionOpcion = data as Catalogo[];
        }
      });
  }

  obternerPaisExportadorOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'pais_exportador.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.paisExportadorOpcion = data as Catalogo[];
        }
      });
  }

  obtenerPaisOrigenOpcion(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
      'pais_exportador.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.paisOrigenOpcion = data as Catalogo[];
        }
      });
  }

  fechaCambiado(evento: string): void {
    this.datosMercanica.patchValue({
        factura_fecha: evento,
      });
    this.store.setFacturaFecha(evento);
  }

  setTotalMercanciaImportar(): void {
    const DATOSMERCANICA = this.datosMercanica;
    if (!DATOSMERCANICA) { return; }

    const VALORTOTALFACTURA = parseFloat(DATOSMERCANICA.get('valor_total_factura')?.value);
    const RESULTADO = VALORTOTALFACTURA * 3.27;

    const VALORTOTALFACTURAUSDCONTROL = DATOSMERCANICA.get('valor_total_factura_usd');
    if (VALORTOTALFACTURAUSDCONTROL) {
      VALORTOTALFACTURAUSDCONTROL.setValue(RESULTADO, { emitEvent: false });
      VALORTOTALFACTURAUSDCONTROL.markAsDirty();
      VALORTOTALFACTURAUSDCONTROL.markAsTouched();
    }
  }

  setMercanciaImportar(): void {
    const DATOSMERCANICA = this.datosMercanica;
    if (!DATOSMERCANICA) { return;}

    const VALOR_FACTURA = parseFloat(DATOSMERCANICA.get('valor_factura')?.value);
    const MONDEDACOMERCIALIZACION = DATOSMERCANICA.get('moneda_comercialización')?.value;

    let valorFacturaUsd = VALOR_FACTURA;
    if (MONDEDACOMERCIALIZACION) {
      valorFacturaUsd = VALOR_FACTURA * 3.27;
    }

    const VALORFACTURAUSDCONTROL = DATOSMERCANICA.get('valor_factura_usd');
    const PRECIOUNITARIOUSDCONTROL = DATOSMERCANICA.get('precio_unitario_usd');

    if (VALORFACTURAUSDCONTROL) {
      VALORFACTURAUSDCONTROL.setValue(valorFacturaUsd, { emitEvent: false });
      VALORFACTURAUSDCONTROL.markAsDirty();
      VALORFACTURAUSDCONTROL.markAsTouched();
    }
    if (PRECIOUNITARIOUSDCONTROL) {
      PRECIOUNITARIOUSDCONTROL.setValue(0, { emitEvent: false });
      PRECIOUNITARIOUSDCONTROL.markAsDirty();
      PRECIOUNITARIOUSDCONTROL.markAsTouched();
    }
  }

onUmcChange(
    subformName: FormGroup,
    campo: string,
    metodoNombre: keyof PermisoImportacionStore,
    ): void {
  this.setValoresStore(subformName, campo, metodoNombre);

  const CONTROL = subformName.get(`${campo}`);
  const VALOR = CONTROL?.value;
  const UMCCATALOG = this.umcOpcion;
  if (UMCCATALOG && UMCCATALOG.length > 0) {
    const SELECTED = UMCCATALOG.find((item: {id: number, descripcion: string} ) => item.id === Number(VALOR));
    if (SELECTED) {
      this.otroUmcIncrement = 10 * Number(SELECTED.id);
      const OTROUMCCONTROL = this.datosMercanica?.get('otro_umc');
      if (OTROUMCCONTROL) {
        OTROUMCCONTROL.setValue(this.otroUmcIncrement);
        OTROUMCCONTROL.markAsDirty();
        OTROUMCCONTROL.markAsTouched();
        this.store.setOtroUmc((this.otroUmcIncrement).toString());
      }
    }
    const FACTORINPUT = document.getElementById('factor_conversión') as HTMLInputElement | null;
    if (FACTORINPUT) {
      FACTORINPUT.readOnly = false;
    }
  }
}

onCantidadUmcOrFactorChange(): void {
    const CANTIDAD_UMC = parseFloat(this.datosMercanica.get('cantidad_umc')?.value);
    this.enableConversion = false;
    let FACTORCONVERSION = parseFloat(this.datosMercanica.get('factor_conversion')?.value);
    if (isNaN(FACTORCONVERSION)) {
      FACTORCONVERSION = 1;
    }
    const FACTORCONVERSIONCONTROL = this.datosMercanica.get('factor_conversion');
    FACTORCONVERSIONCONTROL?.setValue(FACTORCONVERSION);
    FACTORCONVERSIONCONTROL?.markAsDirty();
    FACTORCONVERSIONCONTROL?.markAsTouched();
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

  setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof PermisoImportacionStore,
    ): void {
      const VALOR = form.get(campo)?.value;
      (this.store[metodoNombre] as (value: string) => void)(
        VALOR
      );
    }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
