import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { InputCheckComponent } from '../../../../shared/components/input-check/input-check.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { InputHoraComponent } from '../../../../shared/components/input-hora/input-hora.component';
import radio_si_no from '../../../../../assets/json/31601/radio_si_no.json'
import table from '../../../../../assets/json/31601/table.json'
import tableDetos from '../../../../../assets/json/31601/table-datos.json'
import mockData from '../../../../../assets/json/31601/mockdata-capturar.json'
import dropDown from '../../../../../assets/json/31601/catalog-select-tipo.json'


import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'app-capturar-ivaeieps',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent, TableComponent, InputHoraComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule, InputCheckComponent, InputRadioComponent],
  templateUrl: './capturar-ivaeieps.component.html',
  styleUrl: './capturar-ivaeieps.component.scss'
})


export class CapturarIvaeiepsComponent {
  ivaForm!: FormGroup;
  formularioDePago!: FormGroup;
  showContent = false;
  valorSeleccionado = 'Si';
  predeterminadoSeleccionar = 'Si';
  showModal = false;

  radioBtn = radio_si_no;
  destinatarioHeaderData = table;
  datosDeLe = tableDetos;
  tipoDe: Catalogo[] = dropDown.tipoDe;

  constructor(private fb: FormBuilder,private validacionesService:ValidacionesFormularioService) { }

  ngOnInit(): void {
    this.inicializarForms();
    this.poblarPagoForm(mockData);
  }

   inicializarForms(): void {
    this.ivaForm = this.fb.group({
      empleados: [false],
      infraestructura: [false],
      monto: [false],
      antiguedad: [false],
      tipoDe: [''],
      valorPesos: [''],
      descripcion: [''],
      rfc: ['', [Validators.required,Validators.pattern(this.validacionesService.rfcPattern),]],
      denominacion: [{ value: '', disabled: true }],
      domicilio: [{ value: '', disabled: true }]
    });

    this.formularioDePago = this.fb.group({
      claveReferencia: [{ value: '', disabled: true }],
      numeroOperacion: [''],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.maxLength(50)],
      banco: ['', Validators.required],
      llavePago: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      fechaPago: [{ value: '', disabled: true }],
      importePago: [{ value: '', disabled: true }]
    });
  }

   poblarPagoForm(data: any): void {
    this.formularioDePago.patchValue({
      claveReferencia: data.claveReferencia,
      numeroOperacion: data.numeroOperacion,
      cadenaDependencia: data.cadenaDependencia,
      banco: data.tipoDe,
      llavePago: data.llavePago,
      fechaPago: data.fechaPago,
      importePago: data.importePago
    });
  }

  cambioDeValor(value: any): void {
    this.valorSeleccionado = value;
  }

  cambioDeValorIndique(value: any): void {
    this.predeterminadoSeleccionar = value;
  }

  agregarDatos(): void {
    if (this.ivaForm.valid) {
      const { rfc, denominacion, domicilio } = this.ivaForm.value;
      this.destinatarioHeaderData.tableBody[0].tbodyData.push([ rfc, denominacion, domicilio]);
      this.ivaForm.reset();
    }
  }

  alternarContenido(): void {
    this.showContent = !this.showContent;
  }

  tipoDeInver(): void {
    this.ivaForm.get('tipoDe')?.setValue(this.tipoDe);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  getControlError(controlName: string): string | null {
    const control = this.ivaForm.get(controlName);
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) {
        return 'This field is required';
      } else if (control.errors?.['pattern']) {
        return 'Invalid RFC format';
      }
    }
    return null;
  }

  get rfc() {
    return this.ivaForm.get('rfc');
  }

}
