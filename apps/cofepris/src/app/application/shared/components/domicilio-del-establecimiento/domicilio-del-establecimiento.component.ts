/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable sort-imports */
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DatosService } from '../../../shared/services/datos.service';
import { TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ScianData } from '../../../shared/models/datos-modificacion.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { SCIAN_DATA } from '../../constantes/datos-scian.enum';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { PreOperativo } from '../../../shared/models/datos-modificacion.model';
import { DATOS_PRODUCTO } from '../../constantes/datos-scian.enum';
import { DatosProducto } from '../../../shared/models/datos-modificacion.model';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { CROSLISTA_DE_PAISES } from '../../constantes/datos-producto.enum';
import { CrossListLable } from '@libs/shared/data-access-user/src';
import { Solicitud260603State, Tramite260603Store } from '../../../shared/estados/stores/tramites260603.store';

import { Tramite260603Query } from '../../../shared/estados/queries/tramites260603.query';

import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, InputRadioComponent, CrosslistComponent],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrls: ['./domicilio-del-establecimiento.component.scss'],
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {
  @ViewChild(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  public solicitudState!: Solicitud260603State;
  private destroyNotifier$: Subject<void> = new Subject();
  domicilioForm!: FormGroup;
  claveScianForm!: FormGroup;
  DatosMercanciaForm!: FormGroup;
  estadoData: Catalogo[] = [];
  claveScian: Catalogo[] = [];
  radioOptions: PreOperativo[] = [];
  descripcionScian: Catalogo[] = [];
  clasificacionProducto: Catalogo[] = [];
  private destroy$ = new Subject<void>();
  /** Enum para la selección de tablas */
  TablaSeleccion = TablaSeleccion;
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;
  datosData: ScianData[] = [];
  colapsable: boolean = false;
  /**
   * Lista de países para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;
  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico:',
    derecha: 'Uso específico seleccionado*:',
  };

  /**
   * Botones de acción para gestionar listas de países en la primera sección.
   */
  paisDeProcedenciaBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: (): void => this.crossList.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: (): void => this.crossList.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: (): void => this.crossList.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: (): void => this.crossList.toArray()[0].quitar('t') },
  ];

  configuracionTablaProductoDatos: ConfiguracionColumna<DatosProducto>[] = DATOS_PRODUCTO.map(col => ({
    ...col,
    clave: (item: DatosProducto) => {
      const VALUE = col.clave(item);
      return VALUE instanceof Date ? VALUE.toISOString() : VALUE;
    }
  }));
  datosProducto: DatosProducto[] = [];
  /**
   * Variable que controla la visibilidad del modal.
   */
  public modal: string = 'modal';
  /**
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private fb: FormBuilder,
    private datosService: DatosService,
    private tramite260603Store: Tramite260603Store,
    private tramite260603Query: Tramite260603Query
  ) {
    //constructor
  }

  ngOnInit(): void {
      this.tramite260603Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {  
            this.solicitudState = seccionState;
          })
        )
        .subscribe();

    this.domicilioForm = this.fb.group({
      codigoPostal: [this.solicitudState?.codigoPostal, [Validators.maxLength(12)]],
      estado: [this.solicitudState?.estado, Validators.required],
      municipio: [this.solicitudState?.municipio, Validators.required],
      localidad: [this.solicitudState?.localidad, [Validators.maxLength(120)]],
      colonia: [this.solicitudState?.colonia, [Validators.maxLength(120)]],
      calle: [this.solicitudState?.calle, [Validators.required, Validators.maxLength(300)]],
      lada: [this.solicitudState?.lada, [Validators.maxLength(5)]],
      telefono: [this.solicitudState?.telefono, [Validators.maxLength(24)]],
      scian: [this.solicitudState?.scian],
      aviso: [this.solicitudState?.aviso],
      noLicenciaSanitaria: [this.solicitudState?.noLicenciaSanitaria, Validators.required],
      regimenDestinado: [this.solicitudState?.regimenDestinado, Validators.required],
      aduana: [this.solicitudState?.aduana, Validators.required],
      datosProducto: [this.solicitudState?.datosProducto, Validators.required],
      autorizacionIVAIEPS: [this.solicitudState?.autorizacionIVAIEPS, Validators.required],
    });

    this.claveScianForm = this.fb.group({
      claveScian: [this.solicitudState?.claveScian, Validators.required],
      descripcionScian: [this.solicitudState?.descripcionScian, Validators.required],
    });

    this.DatosMercanciaForm = this.fb.group({
      clasificacionProducto: [this.solicitudState?.clasificacionProducto, Validators.required],
      especificarClasificacion: [this.solicitudState?.especificarClasificacion, Validators.required],
      marcaComercial: [this.solicitudState?.marcaComercial, Validators.required],
      denominacionGenerica: [this.solicitudState?.denominacionGenerica, Validators.required],
      tipoProducto: [this.solicitudState?.tipoProducto, Validators.required],
      estadoFisico: [this.solicitudState?.estadoFisico, Validators.required],
      fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
      descripcionFraccionArancelaria: [{value: this.solicitudState?.descripcionFraccionArancelaria, disabled: true}, Validators.required],
      cantidadUMC: [this.solicitudState?.cantidadUMC, Validators.required],
      umc: [this.solicitudState?.umc, Validators.required],
      porcentajeConcentracion: [this.solicitudState?.porcentajeConcentracion, Validators.required],
      valorComercial: [this.solicitudState?.valorComercial, Validators.required],
      fechaMovimiento: [{value: this.solicitudState?.fechaMovimiento, disabled: true}, Validators.required],
      presentacionFarmaceutica: [this.solicitudState?.presentacionFarmaceutica, Validators.required],
      paisDestino: [this.solicitudState?.paisDestino, Validators.required],
      paisProcedencia: [this.solicitudState?.paisProcedencia, Validators.required],
    });

    this.cargarEstadoData();
    this.cargarDatosTabla();
    this.cargarDatosProductoTabla();
    this.obtenerDatosClave();
    this.obtenerDatosDescripcion();
    this.obtenerDatosPreOperativo();
    this.obtenerclassificacionProductos();
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260603Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260603Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  toggleNoLicenciaSanitaria(event: any): void {
    const noLicenciaSanitaria = this.domicilioForm.get('noLicenciaSanitaria');

    if (event.target.checked) {
      noLicenciaSanitaria?.disable();
    }
    else{
      noLicenciaSanitaria?.enable();
    }
  }
  cargarEstadoData(): void {
    this.datosService.obtenerEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estadoData = resp;
      });
  }

  cargarDatosTabla(): void {
    this.datosService
      .obternerDatosData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.datosData = resp;
      });
  }

  cargarDatosProductoTabla(): void {
    this.datosService
      .obtenerDatosProducto()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.datosProducto = resp;
      });
  }

  obtenerDatosClave(): void {
    this.datosService
      .obtenerClaveScian()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.claveScian = resp;
      });
  }
  obtenerDatosDescripcion(): void {
    this.datosService
      .obtenerDescripcionScian()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.descripcionScian = resp;
      });
  }

  obtenerDatosPreOperativo(): void {
    this.datosService
      .obtenerPreOperativo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.radioOptions = resp;
      });
  }

  obtenerclassificacionProductos(): void {
    this.datosService
      .obtenerClasificationProductos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.clasificacionProducto = resp;
      });
  }

  public mostrarModeloClave() {
    this.modal = 'show'; // Muestra el modal
  }

  public datosDelProducto() {
    this.modal = 'show'; 
  }

  /*
   * Método del ciclo de vida de Angular - destruye el componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
