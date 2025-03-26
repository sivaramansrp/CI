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
import { ScianModel } from '../../models/datos-de-la-solicitud.model';
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
  modalInstance!: Modal;
  scianForm!: FormGroup;

  personaparas: ScianModel[] = [];
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
  }
  ngOnInit(): void {
    this.loadEstado();
    this.loadScian();
    this.loadRegimen();
    this.loadAduanaDeSalida();
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
    if (this.establecimientoModal) {
      this.modalInstance.hide();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
