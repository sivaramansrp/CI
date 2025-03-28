import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HEADER_TABLA_AEREO, HEADER_TABLA_CARRETERO, HEADER_TABLA_FERROVIARIO, HEADER_TABLA_MARITIMO, HEADER_TABLA_OTRO, HEADER_TABLA_PEATONAL, LABEL_HORA_ARRIBO, } from '../../../core/enums/transporte-componente.enum';
import { ItemTransporte, TransporteAereo, TransporteCarretero, TransporteFerroviario, TransporteMaritimo, TransporteOtro, TransportePeatonal } from '../../../core/models/shared/agregar-transporte.model';

import { CampoForm } from '../../../core/models/shared/forms-model';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { InputHoraComponent } from '../input-hora/input-hora.component';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';
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
export class AgregarTransporteComponent implements OnChanges {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  constructor(
    private fb: FormBuilder,
  ) {
    // El contructor inyecta las depencias que se utilizan en este componente
  }

  /**
   * Detecta y maneja los cambios en las propiedades de entrada del componente.
   * 
   * @param changes - Objeto que contiene los cambios en las propiedades de entrada.
   *                  'tipo': Actualiza el encabezado de la tabla según el tipo.
   *                  'tablaTransporte': Actualiza el cuerpo de la tabla con los datos proporcionados.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo'] && changes['tipo'].currentValue) {
      this.headerTabla = this.tipoTabla();
    }

    if (changes['tablaTransporte'] && changes['tablaTransporte'].currentValue) {
      this.bodyTabla = this.tablaTransporte;
    }
  }

  /**
   * Crea y configura el formulario reactivo para los datos del transporte carretero.
   * Define los campos con sus valores iniciales y validaciones correspondientes.
   * @returns void
   */
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

  /**
 * Crea y configura el formulario reactivo para los datos del transporte carretero.
 * Define los campos con sus valores iniciales y validaciones correspondientes.
 * @returns void
 */
  crearFerroviarioForm(): void {
    this.ferroviarioForma = this.fb.group({
      numeroBL: ['', [Validators.maxLength(25)]],
      tipoEquipo: [-1],
      inicialesEquipo: ['', [Validators.maxLength(10)]],
      numeroEquipo: ['', [Validators.maxLength(15)]],
    });
  }

  /**
 * Crea y configura el formulario reactivo para los datos del transporte peatonal.
 * Define los campos con sus valores iniciales y validaciones correspondientes.
 * @returns void
 */
  crearPeatonalForm(): void {
    this.peatonalForma = this.fb.group({
      rfcEmpresa: ['', [Validators.maxLength(13)]],
      empTransportista: ['', [Validators.maxLength(80)]],
      nombreTransportista: ['', [Validators.maxLength(100)]],
      numGafete: ['', [Validators.maxLength(20)]],
    });
  }

  /**
 * Crea y configura el formulario reactivo para los datos del transporte otro.
 * Define los campos con sus valores iniciales y validaciones correspondientes.
 * @returns void
 */
  crearOtroForm(): void {
    this.otroForma = this.fb.group({
      tipoTransporteDes: ['', [Validators.maxLength(100)]],
      empTransportista: ['', [Validators.maxLength(80)]],
      datosTransporte: ['', [Validators.maxLength(250)]],
    });
  }

  /**
 * Crea y configura el formulario reactivo para los datos del transporte áereo.
 * Define los campos con sus valores iniciales y validaciones correspondientes.
 * @returns void
 */
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

  /**
 * Crea y configura el formulario reactivo para los datos del transporte marítimo.
 * Define los campos con sus valores iniciales y validaciones correspondientes.
 * @returns void
 */
  crearMaritimoForm(): void {
    this.maritimoForma = this.fb.group({
      guiaBLMaritimo: ['', [Validators.maxLength(15)]],
      guiaHouseMaritimo: ['', [Validators.maxLength(15)]],
      nombreBuqueMaritimo: ['', [Validators.maxLength(70)]],
      contenedorMaritimo: ['', Validators.maxLength(600)],
    });
  }


  /**
   * Determina el tipo de tabla y configura el formulario correspondiente según el tipo de transporte.
   * 
   * @returns {ItemTransporte[]} Encabezados de la tabla correspondientes al tipo de transporte seleccionado.
   */
  tipoTabla(): ItemTransporte[] {
    switch (parseInt(this.tipo, 10)) {
      case 1:
        this.formaSeleccionada = 'carreteroForma';
        this.anios = AgregarTransporteComponent.obtenerAniosModelo();
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
* @returns {void}
*/
  abrirModal(): void {
    const MODAL_AGREGA = new Modal(this.agregarTransporte.nativeElement);
    MODAL_AGREGA.show();
  }

  /**
  * Cierra el modal.
  * @returns {void}
  */
  cerrarModal(): void {
    this.btnCerrarModal.nativeElement.click();
    this.tituloModal = '';
    this.mensajeModal = '';
  }

  /**
   * Restablece el formulario carretero a su estado inicial.
   * @returns {void}
   */
  limpiarFormulario(): void {
    this.carreteroForma.reset();
  }


  /**
   * Agrega un tipo de transporte a la tabla según el tipo seleccionado.
   * 
   * @returns {void} No retorna ningún valor.
   */
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

  /**
   * Selecciona o deselecciona todos los checkboxes con la clase 'check-transporte'.
   * 
   * @param event - Evento que contiene el estado del checkbox principal.
   * @returns void
   */
  static seleccionarTodos(event: Event): void {
    const CHECKBOXES = document.querySelectorAll('.check-transporte');
    CHECKBOXES.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = (event.target as HTMLInputElement).checked;
    });
  }

  /**
   * Genera un arreglo con los años desde 1980 hasta el año actual.
   *
   * @returns {number[]} Arreglo de números representando los años.
   */
  static obtenerAniosModelo(): number[] {
    const ANIO_ACTUAL = new Date().getFullYear();
    const ANIOS: number[] = [];
    for (let i = 1980; i <= ANIO_ACTUAL; i++) {
      ANIOS.push(i);
    }
    return ANIOS;
  }

  /**
   * Emite los datos de transporte a la tabla.
   *
   * @returns {void} No retorna ningún valor.
   */
  enviarTransporteTabla(): void {
    this.datosTabla.emit(this.bodyTabla);
  }
}