import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EstablecimientoService } from '../../services/establecimiento/establecimiento.service';

import { Subject, takeUntil } from 'rxjs';
import { ScianModel } from '../../models/datos-de-la-solicitud.model';

import { Modal } from 'bootstrap';

@Component({
  selector: 'app-domicillio-del-establecimiento-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    FormsModule,
    CatalogoSelectComponent,
     TablaDinamicaComponent,
    
  ],
  templateUrl: './domicillio-del-establecimiento-seccion.component.html',
  styleUrl: './domicillio-del-establecimiento-seccion.component.scss',
})
export class DomicillioDelEstablecimientoSeccionComponent
  implements OnInit, OnDestroy , AfterViewInit
{
  @ViewChild('establecimientoModal', { static: false }) establecimientoModal!: ElementRef;
  scianForm!: FormGroup;
   TablaSeleccion = TablaSeleccion;
    
  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService
  ) {}

  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  modalInstance!: Modal;
  regimenQueDestinara: Catalogo[] = [];
  aduanaDeSalida: Catalogo[] = [];
  domicilioEstablecimiento!: FormGroup;
  estadoJson: Catalogo[] = [];
  personaparas: ScianModel[] = [];
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
    ngAfterViewInit(): void {
      if (this.establecimientoModal) {
        this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
      }}
      
  ngOnInit(): void {
    this.loadAduanaDeSalida();
    this.loadRegimen();
    this.loadEstado();
    this.loadScian();
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
      avisoDeFuncionamiento: [false],
    });
    this.scianForm = this.fb.group({
      scian: ['', Validators.required],
      descripcionScian: ['', Validators.required],
  
      
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
  loadAduanaDeSalida(): void {
    this.establecimientoService
      .getAduanaDeSalidaData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.aduanaDeSalida = resp;
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
  loadScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }
  openScianModal(): void {

    this.modalInstance.show();
  
}
closeScianModal(): void {
 
    this.modalInstance.hide();
  
}
limpiarScianForm(): void {
  this.scianForm.reset();
}
guardarScian(): void {
  if (this.scianForm.valid) {
    const SCIAN_DATA: ScianModel = {
      claveScian: this.scianForm.get('scian')?.value,
      descripcionScian: this.scianForm.get('descripcionScian')?.value,
    };

    // Add the new data to the table
    this.personaparas.push(SCIAN_DATA);

    // Reset the form
    this.scianForm.reset();

    // Close the modal
    this.closeScianModal();
  } else {
    console.log('Form is invalid');
  }
}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
