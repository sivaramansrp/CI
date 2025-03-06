import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.scss',
})
export class DestinatarioComponent {

  datosdeldestinatario : FormGroup ;
  domiciliodeldestinatario : FormGroup ;
  
    constructor(private fb: FormBuilder) { 
      this.datosdeldestinatario = this.fb.group({
        nombre: [""],
        primerApellido: [""],
        segundoApellido: [""],
        paísDestino: [""],
        númeroderegistroFiscal: [""],
        razónSocial: [""],
      })
      this.domiciliodeldestinatario = this.fb.group({
        calle: [""],
        númeroLetra: [""],
        ciudad: [""],
        correoElectrónico: [""],
        fax: [""],
        teléfono: [""],
      })
    }
  
}
