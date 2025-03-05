import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tratados',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
})
export class TratadosComponent {

  detallesdeltransporte : FormGroup ;

  constructor(private fb: FormBuilder) { 
    this.detallesdeltransporte = this.fb.group({
      tratadoAcuerdo: [""],
      paísBloque: [""],
      paísdeOrigen: [""],
      paísDestino: [""],
      fechadeExpedición: [""],
      fechadeVencimiento: [""],
    })
  }

}
