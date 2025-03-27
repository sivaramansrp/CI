import {
  Catalogo,
  ConfiguracionColumna,
} from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130202/partidas-de-la.json';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { REG_X } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';
import { Tramite130203Store } from '../../estados/tramites/tramites130203.store';
import { takeUntil } from 'rxjs';

import { Validators } from '@angular/forms';
import fractionValues from '@libs/shared/theme/assets/json/130203/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130202/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130203/unidad_da.json';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  formDelTramite!: FormGroup;
  mercanciaForm!: FormGroup;
  partidasDelaMercanciaForm!: FormGroup;
  paisForm!: FormGroup;
  frmRepresentacionForm!: FormGroup;

  datosInputFields = [
    {
      label: 'Régimen al que se destinará la mercancía',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'regimen',
    },
    {
      label: 'Clasificación del régimen',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'clasificacion',
    },
  ];

  catalogosArray: Catalogo[][] = solicitudeSelectVal;
  opcionesSolicitud: ProductoOpción[] = [];
  private destroyed$ = new Subject<void>();
  productoOpciones: ProductoOpción[] = [];
  mostrarTabla = false;
  fraccionCatalogo: Catalogo[] = fractionValues;
  unidadCatalogo: Catalogo[] = unidadOptions;
  formForTotalCount!: FormGroup;
  tableBodyData: { tbodyData: string[] }[] = [];
  tableHeaderData: ConfiguracionColumna<string>[] = [];
  public getEstablecimientoTableData = PartidasdelaTable;
  filaSeleccionada = null;
  elementosDeBloque: Catalogo[] = [];
  paisesPorBloque: Catalogo[] = [];
  selectRangoDias: string[] = [];
  entidadFederativa: Catalogo[] = [];
  representacionFederal: Catalogo[] = [];
  TEXTOS = TEXTOS;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private exportacionDeDiamantesEnBrutoService: ExportacionDeDiamantesEnBrutoService,
    private tramite130203Store: Tramite130203Store,
    private tramite130203Query: Tramite130203Query
  ) {
    //constructor
  }

  ngOnInit(): void {
    this.inicializarFormularios();
    this.opcionesDeBusqueda();
    this.configuracionFormularioSuscripciones();

    this.formularioTotalCount();
    this.getEstablecimiento();
    this.calcularTotales();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();

    this.tramite130203Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.partidasDelaMercanciaForm.patchValue({
            cantidadPartidasDeLaMercancia:
              seccionState.cantidadPartidasDeLaMercancia,
            valorPartidaUSDPartidasDeLaMercancia:
              seccionState.valorPartidaUSDPartidasDeLaMercancia,
            descripcionPartidasDeLaMercancia:
              seccionState.descripcionPartidasDeLaMercancia,
          });
        })
      )
      .subscribe();

    this.tramite130203Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  inicializarFormularios(): void {
    this.formDelTramite = this.fb.group({
      solicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacion: ['', Validators.required],
    });

    this.mercanciaForm = this.fb.group({
      producto: ['Nuevo'],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      fraccion: ['', Validators.required],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern(REG_X.SOLO_NUMEROS),
          Validators.min(1),
        ],
      ],

      valorFacturaUSD: [
        '',
        [
          Validators.required,
          Validators.pattern(REG_X.DECIMALES_DOS_LUGARES),
          Validators.min(0.01),
        ],
      ],

      unidadMedida: ['', Validators.required],
    });

    this.partidasDelaMercanciaForm = this.fb.group({
      cantidadPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
        ],
      ],
      descripcionPartidasDeLaMercancia: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      valorPartidaUSDPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
          Validators.maxLength(20),
        ],
      ],
    });

    this.paisForm = this.fb.group({
      bloque: [''],
      usoEspecifico: ['', Validators.required],
      justificacionImportacionExportacion: ['', [Validators.required]],
      observaciones: [''],
    });

    this.frmRepresentacionForm = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
  }

  opcionesDeBusqueda(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.tramite130203Store.updateState({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

    this.exportacionDeDiamantesEnBrutoService
      .getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOpciones = data.options;
          this.tramite130203Store.updateState({
            producto: data.options[0]?.value || 'Nuevo',
            defaultProducto: data.options[0]?.value || 'Nuevo',
          });
        },
      });
  }

  setValoresStore(event: {
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = event.form.get(event.campo)?.value;
    switch (event.metodoNombre) {
      case 'updateSolicitud':
        this.tramite130203Store.updateSolicitud(VALOR);
        break;
      case 'setDescripcionPartidasDeLaMercancia':
        this.tramite130203Store.setDescripcionPartidasDeLaMercancia(VALOR);
        break;
      case 'setCantidadPartidasDeLaMercancia':
        this.tramite130203Store.setCantidadPartidasDeLaMercancia(VALOR);
        break;
      case 'setValorPartidaUSDPartidasDeLaMercancia':
        this.tramite130203Store.setValorPartidaUSDPartidasDeLaMercancia(VALOR);
        break;
      case 'setregimen':
        this.tramite130203Store.setregimen(VALOR);
        break;
      case 'setclasificacion':
        this.tramite130203Store.setclasificacion(VALOR);
        break;

      case 'setProducto':
        this.tramite130203Store.setProducto(VALOR);
        break;
      case 'setDescripcion':
        this.tramite130203Store.setDescripcion(VALOR);
        break;
      case 'setCantidad':
        this.tramite130203Store.setCantidad(VALOR);
        break;
      case 'setValorPartidaUSD':
        this.tramite130203Store.setValorPartidaUSD(parseFloat(VALOR) || 0);
        break;
      case 'setUnidadMedida':
        this.tramite130203Store.setUnidadMedida(VALOR);
        break;
      case 'setBloque':
        this.tramite130203Store.setBloque(VALOR);
        break;
      case 'setUsoEspecifico':
        this.tramite130203Store.setUsoEspecifico(VALOR);
        break;
      case 'setJustificacionImportacionExportacion':
        this.tramite130203Store.setJustificacionImportacionExportacion(VALOR);
        break;
      case 'setObservaciones':
        this.tramite130203Store.setObservaciones(VALOR);
        break;
      case 'setEntidad':
        this.tramite130203Store.setEntidad(VALOR);
        break;
      case 'setRepresentacion':
        this.tramite130203Store.setRepresentacion(VALOR);
        break;
      default:
        console.error(
          `Método ${event.metodoNombre} no existe en Tramite130203Store`
        );
    }
  }

  configuracionFormularioSuscripciones(): void {
    this.tramite130203Query.solicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((solicitud) => {
        this.formDelTramite.patchValue({ solicitud }, { emitEvent: false });
      });

    this.tramite130203Query.regimen$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((regimen) => {
        this.formDelTramite.patchValue({ regimen }, { emitEvent: false });
      });

    this.tramite130203Query.clasificacion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((clasificacion) => {
        this.formDelTramite.patchValue({ clasificacion }, { emitEvent: false });
      });
    this.tramite130203Query.mercanciaState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.mercanciaForm.patchValue(
          {
            producto: state.producto,
            descripcion: state.descripcion,
            fraccion: state.fraccion,
            cantidad: state.cantidad,
            valorFacturaUSD: state.valorPartidaUSD
              ? state.valorPartidaUSD.toString()
              : '',
            unidadMedida: state.unidadMedida,
          },
          { emitEvent: false }
        );
      });

    this.tramite130203Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.paisForm.patchValue({
            bloque: seccionState.bloque,
            usoEspecifico: seccionState.usoEspecifico,
            justificacionImportacionExportacion:
              seccionState.justificacionImportacionExportacion,
            observaciones: seccionState.observaciones,
          });
        })
      )
      .subscribe();
    this.tramite130203Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.frmRepresentacionForm.patchValue({
            entidad: seccionState.entidad,
            representacion: seccionState.representacion,
          });
        })
      )
      .subscribe();

    this.formDelTramite.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tramite130203Store.updateState({
          solicitud: value.solicitud,
          regimen: value.regimen,
          clasificacion: value.clasificacion,
        });
      });

    this.mercanciaForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tramite130203Store.updateState({
          producto: value.producto,
          descripcion: value.descripcion,
          fraccion: value.fraccion,
          cantidad: value.cantidad,
          valorPartidaUSD: parseFloat(value.valorFacturaUSD) || 0,
          unidadMedida: value.unidadMedida,
        });
      });
  }

  validarYEnviarFormulario(): void {
    this.mostrarTabla = true;
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
    }
  }

  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }

  calcularTotales(): void {
    const CANTITAD_TOTAL = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[0]),
      0
    );
    const VALOR_TOTALUSD = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[5]),
      0
    );
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['cantidadTotal'].setValue(CANTITAD_TOTAL);
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTALUSD);
  }

  getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map(
      (header, index) => ({
        encabezado: header,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        clave: (fila: any): string => fila.tbodyData[index],
        orden: index,
      })
    );
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }

  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130203Store.setMostrarTabla(true);
      this.tramite130203Store.storeTableValues(this.filaSeleccionada);
    }
  }

  manejarlaFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas[0]
      : null;
    if (this.filaSeleccionada) {
      this.tramite130203Store.storeTableValues(this.filaSeleccionada);
    }
  }

  listaDePaisesDisponibles(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getListaDePaisesDisponibles()
      .subscribe((data) => {
        this.elementosDeBloque = data;
      });
  }

  fetchPaisesPorBloque(_bloqueId: number): void {
    this.exportacionDeDiamantesEnBrutoService
      .getPaisesPorBloque(_bloqueId)
      .subscribe((data) => {
        this.paisesPorBloque = data;
        this.selectRangoDias = this.paisesPorBloque.map(
          (pais: Catalogo) => pais.descripcion
        );
      });
  }

  enCambioDeBloque(bloqueId: number): void {
    this.fetchPaisesPorBloque(bloqueId);
  }

  fetchEntidadFederativa(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getEntidadFederativa()
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  fetchRepresentacionFederal(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getRepresentacionFederal()
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }
}
