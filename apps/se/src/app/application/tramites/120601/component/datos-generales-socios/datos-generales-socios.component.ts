import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent, TituloComponent } from '@ng-mf/data-access-user';
// eslint-disable-next-line sort-imports
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-generales-socios',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TituloComponent,BtnContinuarComponent,InputRadioComponent,AlertComponent,TableComponent],
  templateUrl: './datos-generales-socios.component.html',
  styleUrl: './datos-generales-socios.component.scss',
})
export class DatosGeneralesSociosComponent implements OnInit {

  FormSolicitud!: FormGroup;
    pasos: ListaPasosWizard[] = PASOS;
      indice: number = 1;
   datosPasos: DatosPasos = {
     nroPasos: this.pasos.length,
     indice: this.indice,
     txtBtnAnt: 'Anterior',
     txtBtnSig: 'Continuar',
   };
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: ['No', Validators.required],
        exentoDePagos: ['No', Validators.required],
      }),
  });
}

}