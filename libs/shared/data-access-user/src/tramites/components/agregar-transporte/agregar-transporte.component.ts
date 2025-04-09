import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HEADER_TABLA_AEREO, HEADER_TABLA_CARRETERO, HEADER_TABLA_FERROVIARIO, HEADER_TABLA_MARITIMO, HEADER_TABLA_OTRO, HEADER_TABLA_PEATONAL, LABEL_HORA_ARRIBO, } from '../../../core/enums/transporte-componente.enums';
import { ItemTransporte, TransporteAereo, TransporteCarretero, TransporteFerroviario, TransporteMaritimo, TransporteOtro, TransportePeatonal } from '../../../core/models/shared/agregar-trasnporte.model';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { InputCheckComponent } from '../input-check/input-check.component';
import { InputHoraComponent } from '../input-hora/input-hora.component';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'lib-agregar-transporte',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    CommonModule,
    InputCheckComponent,
    ReactiveFormsModule,
    InputHoraComponent,
  ],
  templateUrl: './agregar-transporte.component.html',
  styleUrl: './agregar-transporte.component.scss',
})
export class AgregarTransporteComponent implements OnChanges {

  /**
   * Tipo de trasnporte seleccionado.
   * @type {string}
   */
  @Input() tipo!: string;

  /**
   * Datos de la tabla de transporte.
   * @type {any[]}
   */
  @Input() tablaTransporte!: any[];

  /**
   * Emisor de eventos para enviar los datos de la tabla.
   */
  @Output() datosTabla: EventEmitter<any[]> = new EventEmitter<(TransporteAereo | TransporteCarretero | TransporteFerroviario | TransporteMaritimo | TransporteOtro | TransportePeatonal)[]>();

  @ViewChild('agregarTransporte') agregarTransporte!: ElementRef;
  @ViewChild('btnCerrarModal') btnCerrarModal!: ElementRef;

  /**
   * Cabecera de la tabla para el transporte ferroviario.
   */
  readonly HEADER_TABLA_FERROVIARIO: ItemTransporte[] = HEADER_TABLA_FERROVIARIO;

  /**
   * Cabecera de la tabla para el transporte carretero.
   */
  readonly HEADER_TABLA_CARRETERO: ItemTransporte[] = HEADER_TABLA_CARRETERO;

  /**
   * Cabecera de la tabla para el transporte peatonal.
   */
  readonly HEADER_TABLA_PEATONAL: ItemTransporte[] = HEADER_TABLA_PEATONAL

  /**
   * Cabecera de la tabla para el transporte otro.
   */
  readonly HEADER_TABLA_OTRO: ItemTransporte[] = HEADER_TABLA_OTRO;

  /**
   * Cabecera de la tabla para el transporte aereo.
   */
  readonly HEADER_TABLA_AEREO: ItemTransporte[] = HEADER_TABLA_AEREO;

  /**
   * Cabecera de la tabla para el transporte maritimo.
   */
  readonly HEADER_TABLA_MARITIMO: ItemTransporte[] = HEADER_TABLA_MARITIMO;

  /**
   * Etiqueta para la hora de arribo.
   */
  readonly LABEL_HORA_ARRIBO: string = LABEL_HORA_ARRIBO;

  tituloModal!: string;
  mensajeModal!: string;

  /**
   * Cabecera de la tabla.
   */
  headerTabla!: ItemTransporte[];

  /**
   * Contenido de la tabla.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyTabla: any[] = [];

  /**
   * Formulario para el transporte carretero.
   */
  carreteroForma!: FormGroup;

  /**
   * Formulario para el transporte ferroviario.
   */
  ferroviarioForma!: FormGroup;

  /**
   * Formulario para el transporte peatonal.
   */
  peatonalForma!: FormGroup;

  /**
   * Formulario para el transporte otro.
   */
  otroForma!: FormGroup;

  /**
   * Formulario para el transporte maritimo.
   */
  maritimoForma!: FormGroup;

  /**
   * Formulario para el transporte aereo.
   */
  aereoForma!: FormGroup;

  /**
   * Forma seleccionada para el transporte.
   */
  formaSeleccionada!: string;

  /**
   * Control para las observaciones.
   */
  public observaciones: FormControl = new FormControl('', [Validators.maxLength(500)]);
  anios!: Catalogo[];

  
  private destroyNotifier$: Subject<void> = new Subject();


  constructor(
    private fb: FormBuilder,
  ) { }

  /**
   * Detecta cambios en las propiedades de entrada y actualiza los datos de la tabla según el tipo y la información de transporte.
   * @param changes - Cambios detectados en las propiedades de entrada del componente.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo'] && changes['tipo'].currentValue) {
      this.headerTabla = this.tipoTabla();

    }

    if (changes['tablaTransporte'] && changes['tablaTransporte'].currentValue) {
      this.bodyTabla = this.tablaTransporte;
    }
  }

  // #Seccion de creacion de formularios
  /**
   * Crea el formulario de transporte carretero.
   * @returns {void} No retorna ningún valor.
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
   * Crea el formulario de transporte ferroviario.
   * @returns {void} No retorna ningún valor.
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
   * Crea el formulario de transporte peatonal.
   * @returns {void} No retorna ningún valor.
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
   * Crea el formulario de transporte otro.
   * @returns {void} No retorna ningún valor.
   */
  crearOtroForm(): void {
    this.otroForma = this.fb.group({
      tipoTransporteDes: ['', [Validators.maxLength(100)]],
      empTransportista: ['', [Validators.maxLength(80)]],
      datosTransporte: ['', [Validators.maxLength(250)]],
    });
  }

  /**
   * Crea el formulario de transporte aereo.
   * @returns {void} No retorna ningún valor.
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
   * Crea el formulario de transporte maritimo.
   * @returns {void} No retorna ningún valor.
   */
  crearMaritimoForm(): void {
    this.maritimoForma = this.fb.group({
      guiaBLMaritimo: ['', [Validators.maxLength(15)]],
      guiaHouseMaritimo: ['', [Validators.maxLength(15)]],
      nombreBuqueMaritimo: ['', [Validators.maxLength(70)]],
      contenedorMaritimo: ['', Validators.maxLength(600)],
    });
  }
  // #Termina seccion de creacion de formularios

  /**
   * Crea un nuevo formulario de transporte, dependiendo del tipo de transporte seleccionado.
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
    this.tituloModal = '';
    this.mensajeModal = '';
  }

  /**
   * Limpia el formulario actual.
   */
  limpiarFormulario(): void {
    this.carreteroForma.reset();

  }

  /**
   * Crea la tabla y agrega un elemento, según el tipo de transporte seleccionado.    
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
   * Selecciona todos los elementos de la tabla.
   * @param {Event} event - El evento del checkbox de seleccionar todos.
   */
  // eslint-disable-next-line class-methods-use-this
  seleccionarTodos(event: Event): void {
    const CHECKBOXES = document.querySelectorAll('.check-transporte');
    CHECKBOXES.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = (event.target as HTMLInputElement).checked;
    });
  }

  /**
   * @description Esta función genera un array de años desde 1980 hasta el año actual.
   * @returns {Catalogo[]} - Devuelve un array de años desde 1980 hasta el año actual.
   */
  static obtenerAniosModelo(): Catalogo[] {
    const ANIO_ACTUAL = new Date().getFullYear();
    const ANIOS: Catalogo[] = [];
    for (let i = 1980; i <= ANIO_ACTUAL; i++) {
      const ANIO: Catalogo = {
        id: i,
        descripcion: i.toString(),
      }

      ANIOS.push(ANIO);
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
