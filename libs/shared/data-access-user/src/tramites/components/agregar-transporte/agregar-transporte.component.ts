import * as CONSTANTES from '../../constantes/formularios-transportes.enums';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HEADER_TABLA_AEREO, HEADER_TABLA_CARRETERO, HEADER_TABLA_FERROVIARIO, HEADER_TABLA_MARITIMO, HEADER_TABLA_OTRO, HEADER_TABLA_PEATONAL, LABEL_HORA_ARRIBO, } from '../../../core/enums/transporte-componente.enums';
import { ItemTransporte, TransporteAereo, TransporteCarretero, TransporteFerroviario, TransporteMaritimo, TransporteOtro, TransportePeatonal } from '../../../core/models/shared/agregar-trasnporte.model';

import { CampoForm } from '../../../core/models/shared/forms-model';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { CatalogosService } from '../../../core/services/shared/catalogos/catalogos.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';
import { InputHoraComponent } from '../input-hora/input-hora.component';
@Component({
  selector: 'lib-agregar-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputHoraComponent,
  ],
  templateUrl: './agregar-transporte.component.html',
  styleUrl: './agregar-transporte.component.scss',
})
export class AgregarTransporteComponent implements OnInit, OnChanges {
  @Input() tipo!: string;
  @Input() tablaTransporte!: any[];
  @Output() datosTabla: EventEmitter<any[]> = new EventEmitter<(TransporteAereo | TransporteCarretero | TransporteFerroviario | TransporteMaritimo | TransporteOtro | TransportePeatonal)[]>();
  @ViewChild('agregarTransporte') agregarTransporte!: ElementRef;
  @ViewChild('btnCerrarModal') btnCerrarModal!: ElementRef;

  readonly HEADER_TABLA_FERROVIARIO: ItemTransporte[] = HEADER_TABLA_FERROVIARIO;
  readonly HEADER_TABLA_CARRETERO: ItemTransporte[] = HEADER_TABLA_CARRETERO;
  readonly HEADER_TABLA_PEATONAL: ItemTransporte[] = HEADER_TABLA_PEATONAL
  readonly HEADER_TABLA_OTRO: ItemTransporte[] = HEADER_TABLA_OTRO;
  readonly HEADER_TABLA_AEREO: ItemTransporte[] = HEADER_TABLA_AEREO;
  readonly HEADER_TABLA_MARITIMO: ItemTransporte[] = HEADER_TABLA_MARITIMO;
  readonly LABEL_HORA_ARRIBO: string = LABEL_HORA_ARRIBO;

  tituloModal!: string;
  mensajeModal!: string;

  datosTiposTransporte!: CatalogosSelect;

  FormTransporte!: FormGroup;
  tipoTransporteSeleccionado!: Catalogo;
  camposFormulario!: CampoForm[];
  headerTabla!: ItemTransporte[];

  bodyTabla: any[] = [];

  carreteroForma!: FormGroup;
  ferroviarioForma!: FormGroup;
  peatonalForma!: FormGroup;
  otroForma!: FormGroup;
  maritimoForma!: FormGroup;
  aereoForma!: FormGroup;

  formaSeleccionada!: string;

  public observaciones: FormControl = new FormControl('', [Validators.maxLength(500)]);
  anios!: number[];

  private destroyNotifier$: Subject<void> = new Subject();


  constructor(
    private fb: FormBuilder,
    private catalogosServices: CatalogosService,

  ) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo'] && changes['tipo'].currentValue) {
      this.headerTabla = this.tipoTabla();

    }

    if (changes['tablaTransporte'] && changes['tablaTransporte'].currentValue) {
      this.bodyTabla = this.tablaTransporte;
    }
  }

  // Crea formularios 

  crearCarreteroForm(): void {
    this.carreteroForma = this.fb.group({
      empTransportista: ['', [Validators.maxLength(80)]],
      numeroPorte: ['', [Validators.maxLength(50)]],
      fechaPorte: ['', [Validators.maxLength(10)]],
      marcaTransporte: ['', [Validators.maxLength(70)]],
      modeloTransporte: [-1],
      placasTransporte: ['', [Validators.maxLength(150)]],
      contenedorTransporte: ['', [Validators.maxLength(150)]],
    });
  }

  crearFerroviarioForm(): void {
    this.ferroviarioForma = this.fb.group({
      numeroBL: ['', [Validators.maxLength(25)]],
      tipoEquipo: [-1],
      inicialesEquipo: ['', [Validators.maxLength(10)]],
      numeroEquipo: ['', [Validators.maxLength(15)]],
    });

  }

  crearPeatonalForm(): void {
    this.peatonalForma = this.fb.group({
      rfcEmpresa: ['', [Validators.maxLength(13)]],
      empTransportista: ['', [Validators.maxLength(80)]],
      nombreTransportista: ['', [Validators.maxLength(100)]],
      numGafete: ['', [Validators.maxLength(20)]],
    });
  }

  crearOtroForm(): void {
    this.otroForma = this.fb.group({
      tipoTransporteDes: ['', [Validators.maxLength(100)]],
      empTransportista: ['', [Validators.maxLength(80)]],
      datosTransporte: ['', [Validators.maxLength(250)]],
    });
  }

  crearAereoForm(): void {
    this.aereoForma = this.fb.group({
      arriboPendienteAereo: [''],
      guiaMasterAereo: ['', [Validators.maxLength(12)]],
      guiaHouseAereo: ['', [Validators.maxLength(25)]],
      fechaArriboAereo: ['', [Validators.maxLength(15)]],
      horaArriboAereo: ['', [Validators.maxLength(5)]],
      guiaValida: [{ value: '', disabled: true }],
    });
  }

  crearMaritimoForm(): void {
    this.maritimoForma = this.fb.group({
      guiaBLMaritimo: ['', [Validators.maxLength(15)]],
      guiaHouseMaritimo: ['', [Validators.maxLength(15)]],
      nombreBuqueMaritimo: ['', [Validators.maxLength(70)]],
      contenedorMaritimo: ['', Validators.maxLength(600)],
    });
  }




  // ----------------------------------------------------------------------------------------------

  tipoTabla(): ItemTransporte[] {
    switch (parseInt(this.tipo, 10)) {
      case 1:
        this.formaSeleccionada = 'carreteroForma';
        this.anios = this.obtenerAniosModelo();
        this.crearCarreteroForm();
        return this.HEADER_TABLA_CARRETERO;
      case 2:
        this.crearFerroviarioForm();
        return this.HEADER_TABLA_FERROVIARIO;
      case 3:
        this.crearAereoForm();
        return this.HEADER_TABLA_AEREO;
        break;
      case 4:
        this.crearMaritimoForm();
        return this.HEADER_TABLA_MARITIMO;
        break;
      case 5:
        this.crearPeatonalForm();
        return this.HEADER_TABLA_PEATONAL;
      default:
        this.crearOtroForm();
        return this.HEADER_TABLA_OTRO;

    }
  }


  /**
* Abre el modal para eliminar un documento.
* @param {number} i - El índice del documento.
*/
  abrirModal(): void {
    const MODAL_AGREGA = new Modal(this.agregarTransporte.nativeElement);
    MODAL_AGREGA.show();
  }

  /**
  * Cierra el modal.
  */
  cerrarModal(): void {
    this.btnCerrarModal.nativeElement.click();
    // const MODAL_AGREGA = new Modal(this.agregarTransporte.nativeElement);
    // MODAL_AGREGA.hide();

    this.tituloModal = '';
    this.mensajeModal = '';
  }

  limpiarFormulario(): void {
    this.carreteroForma.reset();

  }

  agregarTipoTransporte(): void {
    switch (parseInt(this.tipo, 10)) {
      case 1: {
        const TRANSPORTE: TransporteCarretero = this.carreteroForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;

        this.bodyTabla.push(TRANSPORTE);

        break;
      }

      case 2: {
        const TRANSPORTE: TransporteFerroviario = this.ferroviarioForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        break;
      }

      case 3: {
        const TRANSPORTE: TransporteAereo = this.aereoForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        break;
      }

      case 4: {
        const TRANSPORTE: TransporteMaritimo = this.maritimoForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        break;
      }


      case 5: {
        const TRANSPORTE: TransportePeatonal = this.peatonalForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        break;
      }

      default: {
        const TRANSPORTE: TransporteOtro = this.otroForma.value;
        TRANSPORTE.observaciones = this.observaciones.value;
        this.bodyTabla.push(TRANSPORTE);
        break;
      }
    }
    
    this.enviarTransporteTabla()
    this.cerrarModal();
  }

  seleccionarTodos(event: Event): void {
    console.log(event);

  }

  obtenerAniosModelo(): number[] {
    const ANIO_ACTUAL = new Date().getFullYear();
    const ANIOS: number[] = [];
    for (let i = 1980; i <= ANIO_ACTUAL; i++) {
      ANIOS.push(i);
    }
    return ANIOS;
  }

  enviarTransporteTabla(): void {
    this.datosTabla.emit(this.bodyTabla);
  }


}
