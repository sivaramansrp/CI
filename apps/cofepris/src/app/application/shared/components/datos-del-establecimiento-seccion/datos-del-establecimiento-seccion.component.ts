import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-datos-del-establecimiento-seccion',
  standalone: true,
  imports: [ CommonModule,
      TituloComponent,
      ReactiveFormsModule,
      FormsModule],
  templateUrl: './Datos-del-establecimiento-seccion.component.html',
  styleUrl: './Datos-del-establecimiento-seccion.component.scss',
})
export class DatosDelEstablecimientoSeccionComponent implements OnInit , AfterViewInit{
   @ViewChild('establecimientoModalButton', { static: false }) establecimientoModalButton!: ElementRef
  constructor(private fb: FormBuilder) {}
  detosEstablecimiento!: FormGroup;
  establecimientoModalInstance!: Modal;
  ngOnInit() {
     this.detosEstablecimiento = this.fb.group({
          establecimientoDenominacionRazonSocial: ['', Validators.required],
    
          establecimientoCorreoElectronico: ['', Validators.required],
        });
  }
   ngAfterViewInit(): void {
     
      if (this.establecimientoModalButton) {
        this.establecimientoModalInstance = new Modal(this.establecimientoModalButton.nativeElement);
      }
    }
  openEstablecimientoModal(): void {
    this.establecimientoModalInstance.show();
  }
}
