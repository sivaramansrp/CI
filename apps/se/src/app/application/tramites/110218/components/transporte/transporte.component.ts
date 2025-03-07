import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent {
   detallestransporte : FormGroup ;
  
    constructor(private fb: FormBuilder) { 
      this.detallestransporte = this.fb.group({
        puertodeEmbarque: [""],
        puertodeDesembarque: [""],
        puertodeTránsito: [""],
        nombredelaEmbarcación: [""],
        númerodeVuelo: [""],
      })
    }
}
