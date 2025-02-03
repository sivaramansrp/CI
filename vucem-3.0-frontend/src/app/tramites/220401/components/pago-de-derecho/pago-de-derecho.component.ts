

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';

import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';

@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,SelectCatalogosComponent,FormsModule],
  styleUrl: './pago-de-derecho.component.scss',
  standalone: true,
})
export class PagoDeDerechoComponent {
  FormSolicitud!: FormGroup;
  
  answer: string = '';
  
  public mercancia!: CatalogosSelect;

  constructor(private fb: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getMercancia();
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: ['No', Validators.required],
        nombreImportExport: ['', Validators.required],
        rfcImportExport: ['', Validators.required],
        cadenaDependencia: ['', Validators.required],
        banco: ['', Validators.required],
        llaveDePago: ['', Validators.required],
        fechaPago: [' ', Validators.required],
        importePago: ['', Validators.required],
      }),
    });
  // Trigger the logic when the form is initialized
  this.updateFormFieldsBasedOnExentoDePago('No');

  // Listen for changes in the 'exentoDePago' field
  this.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.valueChanges.subscribe((value) => {
    this.updateFormFieldsBasedOnExentoDePago(value);
  });
}


    

  
  updateFormFieldsBasedOnExentoDePago(value: string): void {
    if (value === 'No') {
      
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.setValue('454000554');
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue('0001012A0000EX');
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.setValue('594.0');
  
    
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
    } else {
     
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.reset();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.reset();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.reset();
  
      
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.llaveDePago')?.disable();
    }
  }
  
  public getMercancia() { 
    this.mercancia = { 
      labelNombre: 'Mercancía',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Opción 1',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        }
      ],
    }
  }
  validarFormulario() {
    if (this.FormSolicitud.valid) {
     
      console.log(this.FormSolicitud.value);
    }
  }
  public docSeleccionado(e: any) {
    console.log(e);
  }

}
