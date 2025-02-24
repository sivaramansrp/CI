/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import DomiciliosDePlantasTabla from 'libs/shared/theme/assets/json/90201/domicilios-de-plantas-tabla.json';

@Component({
  selector: 'app-domicilios-de-plantas',
  standalone: true,
  imports: [CommonModule,TableComponent,ReactiveFormsModule],
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrl: './domicilios-de-plantas.component.css',
})
export class DomiciliosDePlantasComponent {


  public formDomiciliosDePlantas!: FormGroup;
  public tableHeader = DomiciliosDePlantasTabla.tableHeader;
  public cuerpoTabla = DomiciliosDePlantasTabla.tableBody;


  constructor(private fb: FormBuilder) {
    this.establecerFormDomiciliosDePlantas();
  }

  public establecerFormDomiciliosDePlantas() {
    this.formDomiciliosDePlantas = this.fb.group({
      representacionFederal: [{value: '',disabled: true}],
      actividadProductiva: [{value: '',disabled: true}]
    });
  }



}
