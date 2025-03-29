import { ALERTA_MERCANCIA, AQUANDAS_LABEL, MOVIMIENTO_LABEL } from '../../enum/autorizaciones-constants';
import {
  CONFIGURACION_TABLA_MERCANCIA,
  ConfiguracionItem,
} from '../../enum/mercancia-table-constants';
import { Component, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  CrossListLable,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Solicitud230901State,
  Tramite230901Store,
} from '../../estados/store/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit {
  formSolicitud!: FormGroup;
  formMercancia!: FormGroup;
  tipoMovimientoSeleccionada!: number;
  otraFraccionSeleccionada!: boolean;

  solicitud230901State!: Solicitud230901State;

  aquandasLabel: CrossListLable = AQUANDAS_LABEL;
  aduanasBotons = [
    {
      btnNombre: 'Agregar todos',
        class: 'btn-default',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        funcion: () => this.agregar(CONTINUAR),
    },
      {
        btnNombre: 'Agregar selección',
        class: 'btn-default',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        funcion: () => this.agregar(CONTINUAR),
      },
      {
        btnNombre: 'Restar selección',
        class: 'btn-primary',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        funcion: () => this.quitar(''),
      },
      {
        btnNombre: 'Restar todos',
        class: 'btn-default',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        funcion: () => this.quitar(CONTINUAR),
      },
    ];
  aduanaSeleccion: string[] = [];
  seleccionarOrigenDelAduana: string[] = [];

  movimientoLabel: CrossListLable = MOVIMIENTO_LABEL;
  movimientoBotons = [
    {
          btnNombre: 'Agregar todos',
          class: 'btn-primary',
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          funcion: () => this.agregar(''),
        },
        {
          btnNombre: 'Agregar selección',
          class: 'btn-default',
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          funcion: () => this.agregar(CONTINUAR),
        },
        {
          btnNombre: 'Restar selección',
          class: 'btn-danger',
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          funcion: () => this.quitar(''),
        },
        {
          btnNombre: 'Restar todos',
          class: 'btn-default',
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          funcion: () => this.quitar(CONTINUAR),
        },
  ];
  movimientoSeleccion: string[] = [];
  seleccionarOrigenDelMovimiento: string[] = [];

  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] =
    CONFIGURACION_TABLA_MERCANCIA;
  tablaSeleccion = TablaSeleccion.CHECKBOX;
  tablaDatos:ConfiguracionItem[] = [];
  filaSeleccionada!: ConfiguracionItem;

  showDatosMercanciaModal: boolean = false;

  private destroyNotifier$: Subject<void> = new Subject();
  public alert_message: string = ALERTA_MERCANCIA;

  fname = 'Angular';
  lname = '8';

  constructor(
    public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    public formBuilder: FormBuilder
  ) {
    // do nothing.
  }

  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaDatosSolicitudDatosCatalogos();

    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.solicitud230901State = state;
      });

    this.createFormSolitude();

    this.onTipoMovimientoChange();
    this.onTipoRegimenChange();
  }

  createFormSolitude(): void {
    this.formSolicitud = this.formBuilder.group({
      tipodemovimiento: [
        this.solicitud230901State.tipoDeMovimiento,
        Validators.required,
      ],
      tipoderegimen: [
        this.solicitud230901State.tipoDeRegimen,
        Validators.required,
      ],
    });
  }

  createFormMercancia(data?: Partial<ConfiguracionItem>): void {
    this.formMercancia = this.formBuilder.group({
      fraccionArancelaria: [data?.fraccionArancelaria || '', Validators.required],
      fraccionDescripcion: [data?.descripcion || '', Validators.required],
      otraFraccion: [data?.otraFraccion || false, Validators.required],
      descripcion: [data?.descripcion || '', Validators.required],
      clasificacionTaxonomica: [data?.clasificacionTaxonomica || '', Validators.required],
      rendimientoProducto: [data?.rendimientoProducto || '', Validators.required],
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

  onTipoMovimientoChange(): void {
    const TIPO_DE_MOVIMIENTO =
      this.formSolicitud.get('tipodemovimiento')?.value;
      this.tramite230901Store.setTipoDeMovimiento(TIPO_DE_MOVIMIENTO);
      if(TIPO_DE_MOVIMIENTO === '1') {
        this.aduanasBotons = ADUANA_BOTONS.slice(1);
      }else{
        this.aduanasBotons = ADUANA_BOTONS;
      }
      this.tipoMovimientoSeleccionada = parseInt(TIPO_DE_MOVIMIENTO, 10);
  }

  onTipoRegimenChange(): void {
    this.tramite230901Store.setTipoDeRegimen(
      this.formSolicitud.get('tipoderegimen')?.value
    );
  }

  agregar(tipo: string): void {
      if (tipo === CONTINUAR) {
        this.paisDeProcedenciaSeleccionadas = [...this.seleccionarOrigenDelPais];
        this.paisDeProcedenciaDatos = [];
      } else {
        const FECHAVALOR = this.paisDeProcedenciaFecha.value.map(Number);
        this.paisDeProcedenciaSeleccionadas.push(
          this.paisDeProcedenciaDatos[FECHAVALOR]
        );
        this.paisDeProcedenciaDatos.splice(FECHAVALOR, 1);
      }
    }

  quitar(tipo: string = ''): void {
      if (tipo === CONTINUAR) {
        this.paisDeProcedenciaDatos = [...this.paisDeProcedenciaSeleccionadas];
        this.paisDeProcedenciaSeleccionadas = [];
      } else {
        const FECHAVALOR =
          this.paisDeProcedenciaFechaSeleccionada.value.map(Number);
        this.paisDeProcedenciaDatos.push(
          this.paisDeProcedenciaSeleccionadas[FECHAVALOR]
        );
        this.paisDeProcedenciaSeleccionadas.splice(FECHAVALOR, 1);
      }
    }

  toggleDivMercancia(): void {
    this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
  }

  showMercanciaFormModal():void {
    this.autorizacionesDeVidaSilvestreService.inicializaMercanciaDatosCatalogos()
    this.createFormMercancia();
    this.toggleDivMercancia();
  }

  submitMercanciaForm(): void {
    const TABLA_ROW:ConfiguracionItem = {
      fraccionArancelaria: this.autorizacionesDeVidaSilvestreService.fraccionArancelaria[(this.formMercancia.get('fraccionArancelaria')?.value)].descripcion,
      otraFraccion: this.formMercancia.get('otraFraccion')?.value,
      descripcion: this.formMercancia.get('descripcion')?.value,
      rendimientoProducto: this.formMercancia.get('rendimientoProducto')?.value,
      clasificacionTaxonomica: this.autorizacionesDeVidaSilvestreService.clasificacionTaxonomica[(this.formMercancia.get('clasificacionTaxonomica')?.value)-1].descripcion,
      nombreCientifico: this.autorizacionesDeVidaSilvestreService.nombreCientifico[(this.formMercancia.get('nombreCientifico')?.value)-1].descripcion,
      nombreComun: this.autorizacionesDeVidaSilvestreService.nombreComun[(this.formMercancia.get('nombreComun')?.value)-1].descripcion,
      marca: this.formMercancia.get('marca')?.value,
      cantidad:  this.formMercancia.get('cantidad')?.value,
      unidadMedida: this.autorizacionesDeVidaSilvestreService.unidadMedida[(this.formMercancia.get('unidadMedida')?.value)-1].descripcion,
      paisOrigen: this.autorizacionesDeVidaSilvestreService.paisOrigen[(this.formMercancia.get('paisOrigen')?.value)-1].descripcion,
      paisProcedencia: this.autorizacionesDeVidaSilvestreService.paisProcedencia[(this.formMercancia.get('paisProcedencia')?.value)-1].descripcion,
    }
    this.tablaDatos.push(TABLA_ROW);
    this.formMercancia.reset();
    this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
  }
}
