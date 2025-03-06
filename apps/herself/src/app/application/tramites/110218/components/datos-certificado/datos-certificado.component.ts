import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
})
export class DatosCertificadoComponent {
  datosdelcertificado : FormGroup ;

  constructor(private fb: FormBuilder) { 
    this.datosdelcertificado = this.fb.group({
      lugar: [""],
      observaciones: [""],
      
    })
  }
  
}
