import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputCheckComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { EstablecimientoService } from '../../services/establecimiento/establecimiento.service';
import { TablaDinamicaComponent } from '../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { DatosDeLaProductoModel, ScianModel } from '../../models/datos-de-la-solicitud.model';
import { Modal } from 'bootstrap';
import { DESPACHO_LDA } from '../../constantes/aviso-de-funcionamiento.enum';
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
  ],
  templateUrl: './establecimiento.component.html',
  styleUrl: './establecimiento.component.scss',
})
export class EstablecimientoComponent implements OnInit, OnDestroy , AfterViewInit {
  @ViewChild('establecimientoModal', { static: false }) establecimientoModal!: ElementRef;
  @ViewChild('datosMercanciaModal', { static: false }) datosMercanciaModal!: ElementRef;
  modalInstance!: Modal;
  datosModalInstance!: Modal;
  scianForm!: FormGroup;
  datosProductoForm!: FormGroup;
  datosMercanciaForm!: FormGroup;
  personaparas: ScianModel[] = [];
  propietarioData : DatosDeLaProductoModel[] = [];
  /** Configuración de columnas para la tabla dinámica */
  scianJson: Catalogo[] = [];
  configuracionTabla: ConfiguracionColumna<ScianModel>[] = [
    {
      encabezado: 'Clave S.C.I.A.N.',
      clave: (item: ScianModel) => item.claveScian,
      orden: 1,
    },
    {
      encabezado: 'Descripción del S.C.I.A.N.',
      clave: (item: ScianModel) => item.descripcionScian,
      orden: 2,
    },
  ];

  
  configuracionTablaDatosProducto: ConfiguracionColumna<DatosDeLaProductoModel>[] = [
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
    }


  ];
  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  TablaSeleccion = TablaSeleccion;
  estadoJson: Catalogo[] = [];
  regimenQueDestinara: Catalogo[] = [];
  aduanaDeSalida: Catalogo[] = [];
  detosEstablecimiento!: FormGroup;
  domicilioEstablecimiento!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService
  ) {
    //constructor
  }
  ngAfterViewInit(): void {
    if (this.establecimientoModal) {
      this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
    }
    if (this.datosMercanciaModal) {
      this.datosModalInstance = new Modal(this.datosMercanciaModal.nativeElement);
    }
  }
  ngOnInit(): void {
    this.loadEstado();
    this.loadScian();
    this.loadRegimen();
    this.loadAduanaDeSalida();
    this.datosMercanciaForm = this.fb.group({
      nombreEspecifico: ['', Validators.required],
    });
    this.scianForm = this.fb.group({
      scian: ['', Validators.required],
      descripcionScian: ['', Validators.required],
  
      
    });
    this.detosEstablecimiento = this.fb.group({
      establecimientoDenominacionRazonSocial: ['', Validators.required],

      establecimientoCorreoElectronico: ['', Validators.required],
    });
    this.domicilioEstablecimiento = this.fb.group({
      establecimientoDomicilioEstado: ['', Validators.required],
      establecimientoDomicilioCodigoPostal: ['', Validators.required],
      establecimientoMunicipioYAlcaldia: ['', Validators.required],
      establecimientoDomicilioLocalidad: ['', Validators.required],
      establecimientoDomicilioColonia: ['', Validators.required],
      establecimientoDomicilioCalle: ['', Validators.required],
      establecimientoDomicilioTelefono: ['', Validators.required],
      establecimientoDomicilioLada: ['', Validators.required],
      nombreDelProfesionalResponsable: [''],
      rfcDelProfesionalResponsable: [''],
      noDeLicenciaSanitaria: [''],
      regimenAlQueSeDestinaraLaMercancía: [''],
      aduanaDeSalida: [''],
      avisoDeFuncionamiento :[false],
    });
  }
 

  loadEstado(): void {
    this.establecimientoService
      .getEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estadoJson = resp;
      });
  }
  loadRegimen(): void {
    this.establecimientoService
      .getRegimenData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.regimenQueDestinara = resp;
      });
  }
  loadScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }
  loadAduanaDeSalida(): void {
    this.establecimientoService
      .getAduanaDeSalidaData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.aduanaDeSalida = resp;
      });
  }
  openScianModal(): void {

      this.modalInstance.show();
    
  }
  closeScianModal(): void {
   
      this.modalInstance.hide();
    
  }
  openDatosMercanciaModal(): void {
    this.datosModalInstance.show();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
