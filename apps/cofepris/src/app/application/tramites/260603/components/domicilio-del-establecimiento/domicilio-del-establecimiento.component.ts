/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable sort-imports */
import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Catalogo ,CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DatosService } from '../../services/datos.service';
import { TablaDinamicaComponent , TablaSeleccion} from '@libs/shared/data-access-user/src';
import { ScianData } from '../../models/datos-modificacion.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { SCIAN_DATA } from '../../constantes/datos-scian.enum';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { PreOperativo } from '../../models/datos-modificacion.model';
// import { DATOS_PRODUCTO } from '../../constantes/datos-scian.enum';
// import { DatosProducto } from '../../models/datos-modificacion.model';

@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {
  domicilioForm!: FormGroup;
  claveScianForm!: FormGroup;
  estadoData:Catalogo[] = [];
  claveScian:Catalogo[] = [];
  radioOptions: PreOperativo[] = [];
  descripcionScian:Catalogo[] = [];
  private destroy$ = new Subject<void>();
  /** Enum para la selección de tablas */
  TablaSeleccion = TablaSeleccion;
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;

  //configuracionTablaProducto: ConfiguracionColumna<DatosProducto>[] = DATOS_PRODUCTO;
  datosData: ScianData [] = [];
   /**
   * Variable que controla la visibilidad del modal.
   */
   public modal: string = 'modal';
     /**
      * Referencia al elemento de cierre del modal.
      */
     @ViewChild('closeModal') closeModal!: ElementRef;
  constructor(private fb: FormBuilder, private datosService: DatosService
  ) {
    //constructor
  }

  ngOnInit(): void {
    this.domicilioForm = this.fb.group({
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required ],
      lada: [''],
      telefono: [''],
      aviso: [''],
      noLicenciaSanitaria: ['', Validators.required],
      regimenDestinado: ['', Validators.required],
      aduanas: ['', Validators.required],
      clasificacionProducto: ['', Validators.required],
      especificarClasificacion: ['', Validators.required],
      marcaComercial: ['', Validators.required],
      denominacionComun: ['', Validators.required],
    });


    this.cargarEstadoData();
    this.cargardatostabla();
    this.obtenerDatosClave();
    this.obtenerDatosDescripcion();
    this.obtenerDatosPreOperativo();
  } 

  cargarEstadoData(): void {
    this.datosService.obtenerEstadoData()
      .pipe(takeUntil(this.destroy$))
        .subscribe((resp:Catalogo[]) => { 
        this.estadoData = resp;
      });
  }

  cargardatostabla(): void {
    this.datosService
      .obternerDatosData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.datosData = resp;
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

  /**
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
public mostrarModeloClave() {
  this.modal = 'show'; // Muestra el modal
  this.claveScianForm = this.fb.group({
    claveScian: ['', Validators.required],
    descripcionScian: ['', Validators.required],
  });
}
  /*
    * Método del ciclo de vida de Angular - destruye el componente
  */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
