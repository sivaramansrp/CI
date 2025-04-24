import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { FORMULARIO_DOMICILIO_FISCAL } from '../../enums/retorno-importacion-temporal.enum';

import { ModeloDeFormaDinamica, TituloComponent} from '@ng-mf/data-access-user';
@Component({
  selector: 'app-domicilio-fiscal',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, TituloComponent],
  templateUrl: './domicilio-fiscal.component.html',
  styleUrl: './domicilio-fiscal.component.scss',
})
export class DomicilioFiscalComponent implements OnInit {
  domicilioFiscalFormulario!: FormGroup;



  formularioDomicilioFiscal: ModeloDeFormaDinamica[] = FORMULARIO_DOMICILIO_FISCAL;


  constructor(private fb: FormBuilder){
      
      //
    }

    ngOnInit(): void {
      this.inicializarFormulario();
    
      
     
    }

    inicializarFormulario(): void {
      this.domicilioFiscalFormulario = this.fb.group({
        });
    }

}
