/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fabricante-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './fabricante-modal.component.html',
  styleUrl: './fabricante-modal.component.scss',
})
export class FabricanteModalComponent implements OnInit {

  titulo: string;
  public paisCatalogo!: Catalogo[];
  public tercerosRelacionadosForm!: FormGroup;
  
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) {
    this.titulo = '';
  }

  ngOnInit(): void {
    this.cerrarTercerosRelacionadosForm();
  }

  public cerrarTercerosRelacionadosForm(): void {
    this.tercerosRelacionadosForm = this.fb.group({
      denominacionSocial: [''],
      terceroNombre: [''],
      nacional: [''],
      extranjero: [''],
      fisica: [''],
      moral: [''],
      noContribuyente: [''],
      rfc: [''],
      curp: [''],
      razonSocial: [''],
      pais: [''],
      estado: [''],
      codigoPostal: [''],
      calle: [''],
      numeroExterior: [''],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['']
    });
  }
  
}
