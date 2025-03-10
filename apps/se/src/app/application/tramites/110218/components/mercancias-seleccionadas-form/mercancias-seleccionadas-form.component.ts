import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-mercancias-seleccionadas-form',
  standalone: true,
  imports: [CommonModule,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './mercancias-seleccionadas-form.component.html',
  styleUrl: './mercancias-seleccionadas-form.component.scss',
})
export class MercanciasSeleccionadasFormComponent {
  unidaddeMedidadeComercializacionOptions: Catalogo[] = [];
  tipodeFacturaOptions: Catalogo[] = [];
  modifydatosdelcertificado: FormGroup;

  constructor(private fb: FormBuilder ){
    this.modifydatosdelcertificado = this.fb.group({
      nombreComercial: [""],
      nombreenIngles:[""],
      complementoDelaDescripcion:[""],
      marca:[""],
      valorMercancia:[""],
      cantidad:[""],
      unidaddeMedidadeComercializacion:[""],
      numerodeFactura:[""],
      tipodeFactura:[""],
      fechadelaFactura:[""]

    })
  }
}
