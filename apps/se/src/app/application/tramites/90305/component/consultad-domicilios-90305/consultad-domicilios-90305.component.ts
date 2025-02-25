import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { CatalogoSelectComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component";
import { Catalogo } from '@ng-mf/data-access-user';

import estado from "../../../../../../../../../libs/shared/theme/assets/json/90305/estado.json";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultad-domicilios-90305',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './consultad-domicilios-90305.component.html',
  styleUrl: './consultad-domicilios-90305.component.scss',
})
export class ConsultadDomicilios90305Component implements OnInit {
  estadoJson: Catalogo[] = estado;
  formConsulta! :FormGroup;
  constructor(private fb : FormBuilder){}
  ngOnInit():void{

  this.formConsulta = this.fb.group(
    {
      estadoControl:[{
        disabled:false
      },Validators.required]
     
    }
  )
  }
}
