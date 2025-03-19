import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from "@ng-mf/data-access-user";



@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrl: './datos-de-la-mercancia.component.scss',
})
export class DatosDeLaMercanciaComponent {

  datosDeLaMercanciaForm!: FormGroup;


  constructor(private fb:FormBuilder)
  {
    this.datosDeLaMercanciaForm = this.fb.group({
      descripcion:['',[Validators.required,Validators.pattern(/^(?!\s)(.*\S)?$/)]],
      fraccionArancelaria: ['',Validators.required],
      umt: [{ value: '', disabled: true }],
      cantidad: ['',[Validators.required,Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)]],
      valorFacturaUSD: ['', [Validators.required,Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)]],
      paisOrigen: ['', Validators.required],
      paisExportador: ['', Validators.required],
      numeroFactura: ['', [Validators.required,Validators.pattern(/^[A-Za-z0-9Ññ]+$/)]],
      fechaExpedicionFactura: ['', Validators.required],
      observaciones: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)]
    });
  }
}
