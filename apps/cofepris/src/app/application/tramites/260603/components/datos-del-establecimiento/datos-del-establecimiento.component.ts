/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonModule } from '@angular/common';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-del-establecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './datos-del-establecimiento.component.html',
  styleUrl: './datos-del-establecimiento.component.scss',
})
export class DatosDelEstablecimientoComponent implements OnInit{
  datosDelForm!: FormGroup;
   /**
   * Variable que controla la visibilidad del modal.
   */
   public modal: string = 'modal';

  /**
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;
  constructor(private fb: FormBuilder) {
    //constructor
  }
  ngOnInit(): void {
    this.datosDelForm = this.fb.group({
      denominacion: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
}
/**
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
public abrirModal() {
  this.modal = 'show'; // Muestra el modal
}
}
