/* eslint-disable sort-imports */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {

  modalRef?: BsModalRef;
  public esModalCerrado: boolean = false;
  public denominacionForm!: FormGroup;


constructor(
  private modalService: BsModalService,
  private fb: FormBuilder,
) {

}

ngOnInit(): void {
  this.getDenominacionForm();
}



  public seleccionar(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.esModalCerrado = true;
  }

  public cerrar():void {
    this.modalRef?.hide();
    this.denominacionForm.get('denominacionRazon')?.enable();   
  }

  public getDenominacionForm(): void {
    this.denominacionForm = this.fb.group({
      denominacionRazon: [{value: '',disabled: true}]
    })
  }
}
