import { Component, ElementRef, ViewChild } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { InputCheck } from '../../../../core/models/shared/components.model';
import { InputCheckComponent } from '../../../../shared/components/input-check/input-check.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { InputHoraComponent } from '../../../../shared/components/input-hora/input-hora.component';
import radio_si_no  from '../../../../../assets/json/31601/radio_si_no.json'
import table  from '../../../../../assets/json/31601/table.json'
import tableDetos  from '../../../../../assets/json/31601/table-datos.json'
import mockData  from '../../../../../assets/json/31601/mockdata-capturar.json'


import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-capturar-ivaeieps',
  standalone: true,
  imports: [TituloComponent,SelectCatalogosComponent,TableComponent,InputHoraComponent,ReactiveFormsModule,CatalogoSelectComponent, CommonModule,InputCheckComponent,InputRadioComponent],
  templateUrl: './capturar-ivaeieps.component.html',
  styleUrl: './capturar-ivaeieps.component.scss'
})


export class CapturarIvaeiepsComponent {
  ivaForm: FormGroup;
  paymentForm: FormGroup;
  showContent:boolean;
  selectedValue: any = 'Si';
  defaultSelect:any ='Si';

  radioBtn = radio_si_no;
  destinatarioHeaderData = table;
  datosDeLe = tableDetos;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setPaymentFormValues(mockData);
  }

  initializeForm(): void {
    this.ivaForm = this.fb.group({
      empleados: new FormControl(false),
      infraestructura:new FormControl(false),
      monto: new FormControl(false),
      antiguedad: new FormControl(false),
      tipoDe: [''],
      valorPesos: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      descripcion: ['', Validators.required],
      rfc: ['',[ Validators.required,Validators.pattern('^[A-Za-z0-9]{12}$')]],
      denominacion: [{ value: '', disabled: true }],
      domicilio: [{ value: '', disabled: true }],
     
    });

    this.paymentForm = this.fb.group({
      claveReferencia: [{ value: '', disabled: true }],
      numeroOperacion: [''],
      cadenaDependencia: [{ value: '', disabled: true }],
      tipoDe: [''],
      llavePago: [''],
      fechaPago: [{ value: '', disabled: true }],
      importePago: [{ value: '', disabled: true }]
    });
  
  }

  setPaymentFormValues(mockData: any): void {
    this.paymentForm.get('claveReferencia')?.setValue(mockData.claveReferencia);
    this.paymentForm.get('numeroOperacion')?.setValue(mockData.numeroOperacion);
    this.paymentForm.get('cadenaDependencia')?.setValue(mockData.cadenaDependencia);
    this.paymentForm.get('tipoDe')?.setValue(mockData.tipoDe);
    this.paymentForm.get('llavePago')?.setValue(mockData.llavePago);
    this.paymentForm.get('fechaPago')?.setValue(mockData.fechaPago);
    this.paymentForm.get('importePago')?.setValue(mockData.importePago);
  }
  
  
  

  onValueChange(_e:any){
    this.selectedValue = _e
  }

  onValueChangeIndique(_e:any){
    this.defaultSelect = _e
  }


  agregarDatos() {
    const { tipoDe, valorPesos, descripcion } = this.ivaForm.controls;
      if (tipoDe.valid && valorPesos.valid && descripcion.valid) {
      this.datosDeLe.tableBody[0].tbodyData.push({
        tipoDe: tipoDe.value,
        descripcion: descripcion.value,
        valorPesos: valorPesos.value
      });
  
      this.ivaForm.reset();
    }
  }
  
  toggleContent(): void {
    this.showContent = !this.showContent;
  }


  tipoDe: Catalogo[] = [
    { id: 1, descripcion: 'Inversión A' },
    { id: 2, descripcion: 'Inversión B' },
    { id: 3, descripcion: 'Inversión C' }
  ];
  
  tipoDeInver(selectedId?: number) {
    const selectedItem = this.tipoDe.find(item => item.id === selectedId);
    if (selectedItem) {
      this.ivaForm.get('tipoDe')?.setValue(selectedItem.descripcion);
    }
  }
  

 showModal = false;  


 openModal() {
   this.showModal = true;  
 }


 closeModal() {
   this.showModal = false;  
 }


 saveChanges() {
   this.closeModal(); 
 }

 clear(){

 }
 accept(){

 }
 closeModel(){

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

