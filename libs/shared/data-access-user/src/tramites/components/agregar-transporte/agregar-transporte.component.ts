import * as CONSTANTES from '../../constantes/formularios-transportes.enums';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { HEADER_TABLA_FERROVIARIO, HEADER_TABLA_CARRETERO, HEADER_TABLA_PEATONAL, HEADER_TABLA_OTRO } from '../../../core/enums/transporte-componente.enums';
import { CampoForm } from '../../../core/models/shared/forms-model';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { CatalogosService } from '../../../core/services/shared/catalogos/catalogos.service';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from '../input-fecha/input-fecha.component';
import { Modal } from 'bootstrap';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
@Component({
  selector: 'lib-agregar-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent,
    InputFechaComponent,
  ],
  templateUrl: './agregar-transporte.component.html',
  styleUrl: './agregar-transporte.component.scss',
})
export class AgregarTransporteComponent implements OnInit, OnChanges {
  @Input() tipo!: string;
  @ViewChild('agregarTransporte') agregarTransporte!: ElementRef;
  @ViewChild('btnCerrarModal') btnCerrarModal!: ElementRef;

  readonly HEADER_TABLA_FERROVIARIO = HEADER_TABLA_FERROVIARIO;
  readonly HEADER_TABLA_CARRETERO = HEADER_TABLA_CARRETERO;
  readonly HEADER_TABLA_PEATONAL = HEADER_TABLA_PEATONAL
  readonly HEADER_TABLA_OTRO = HEADER_TABLA_OTRO;

  tituloModal!: string;
  mensajeModal!: string;

  datosTiposTransporte!: CatalogosSelect;

  FormTransporte!: FormGroup;
  tipoTransporteSeleccionado!: Catalogo;
  camposFormulario!: CampoForm[];
  headerTabla!: string[];

  carreteroForma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private catalogosServices: CatalogosService
  ) { }

  ngOnInit(): void {
    this.crearCarreteroForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo'] && changes['tipo'].currentValue) {
      console.log('Tipo de transporte', this.tipo);
      this.headerTabla = this.tipoTabla();

    }
  }

  crearCarreteroForm(): void {
    this.carreteroForma = this.fb.group({
      empresaTransportista: [],
      numeroCartaPorte: [],
      fechaCartaPorte: [],
      marca: [],
      modelo: [],
      placas: [],
      contenedores: [],
    });
  }

  tipoTabla(): string[] {
    switch (parseInt(this.tipo, 10)) {
      case 1:
        return this.HEADER_TABLA_CARRETERO;
      case 2:
        return this.HEADER_TABLA_FERROVIARIO;
      case 5:
        return this.HEADER_TABLA_PEATONAL;
      default:
        return this.HEADER_TABLA_OTRO;

    }
  }







  agregarCamposAlForm(campos: CampoForm[]) {
    campos.forEach((campo: CampoForm) => {
      this.FormTransporte.addControl(campo.campo, this.fb.control(''));
    });

    // Tipo de trasporte
    // 1 - Carretero
    // 2 - Ferroviario
    // 3 - Aereo
    // 4 - Maritimo
    // 5 - Peatonal
    // 6 - Otro
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
    // this.btnCerrarModal.nativeElement.click();
    const MODAL_AGREGA = new Modal(this.agregarTransporte.nativeElement);
    MODAL_AGREGA.hide();
    
    this.tituloModal = '';
    this.mensajeModal = '';
  }

  limpiarFormulario(): void {}

  agregarTipoTransporte(): void {
    console.log('Agregando transporte');
    
  }

}
