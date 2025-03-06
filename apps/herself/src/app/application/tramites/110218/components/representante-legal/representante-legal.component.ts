import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent {
  datosdelexportador : FormGroup ;
    
      constructor(private fb: FormBuilder) { 
        this.datosdelexportador = this.fb.group({
          nombredelRepresentante: [""],
          empresa: [""],
          cargo: [""],
          teléfono: [""],
          fax: [""],
          correoElectrónico: [""],
        })
      }
}
