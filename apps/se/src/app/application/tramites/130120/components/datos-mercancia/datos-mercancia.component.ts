import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosMercanica } from '../../models/permiso-importacion-modification.model';
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
export class DatosMercanciaComponent implements OnInit {

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

  MercanciaState!: DatosMercanica

  enableConversion: boolean = false;

  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery,
    public permisoImportacionService: PermisoImportacionService,
  ) {
    this.query.setCargaTipo$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((state) => {
        this.MercanciaState = state as DatosMercanica;
      })
    )
        .subscribe();
  }

  async ngOnInit(): Promise<void> {
    await this.initActionFormBuild();
    this.ObtenerTipoEntradaOpcion();
    this.ObtenerFraccionOpcion();
    this.obtenerNicoOpcion();
    this.obtenerUmtOpcion();
    this.obtenerMonedaComercializacionOpcion();
    this.obternerPaisExportadorOpcion();

    

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
      descripcion: [this.MercanciaState.descripcion, [Validators.required, Validators.maxLength(4000)]],
      marca: [this.MercanciaState.marca, [Validators.required, Validators.maxLength(256), Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      tipo_entrada: [this.MercanciaState.tipo_entrada, Validators.required],
      fraccion: [this.MercanciaState.fraccion, Validators.required],
      nico: [this.MercanciaState.nico, Validators.required],
      umt: [this.MercanciaState.umt, Validators.required],
      factura_numero: [this.MercanciaState.factura_numero, Validators.required],
      factura_fecha: [this.MercanciaState.factura_fecha, Validators.required],
      umc: [this.MercanciaState.umc, Validators.required],
      otro_umc: [this.MercanciaState.otro_umc, Validators.required],
      cantidad_umc: [this.MercanciaState.cantidad_umc,Validators.required],
      factor_conversion: [this.MercanciaState.factor_conversion, Validators.required],
      cantidad_umt: [this.MercanciaState.cantidad_umt, Validators.required],
      valor_factura: [this.MercanciaState.valor_factura,Validators.required],
      moneda_comercializacion: [this.MercanciaState.moneda_comercializacion, Validators.required],
      valor_factura_usd: [this.MercanciaState.valor_factura_usd, Validators.required],
      precio_unitario_usd: [this.MercanciaState.precio_unitario_usd, Validators.required],
      pais_exportador: [this.MercanciaState.pais_exportador, Validators.required],
      pais_origen: [this.MercanciaState.pais_origen, Validators.required],
      valor_total_factura: [this.MercanciaState.valor_total_factura, Validators.required],
      valor_total_factura_usd: [this.MercanciaState.valor_total_factura_usd, Validators.required],
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
        factura_fecha: evento ,
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

  
}

onCantidadUmcOrFactorChange(): void {
    const CANTIDAD_UMC = parseFloat(this.datosMercanica.get('cantidad_umc')?.value);
    let FACTORCONVERSION = parseFloat(this.datosMercanica.get('factor_conversion')?.value);
    if (isNaN(FACTORCONVERSION)) {
      FACTORCONVERSION = 1;
    }
    const FACTORCONVERSIONCONTROL = this.datosMercanica.get('factor_conversión');
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
}
