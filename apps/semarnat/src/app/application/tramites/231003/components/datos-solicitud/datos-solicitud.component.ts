import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule,
        CatalogoSelectComponent,
        TituloComponent,
        ReactiveFormsModule,],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit{

  solicitudForm!: FormGroup;

    aduanas!: Catalogo[];
  


  constructor(public fb: FormBuilder) {
    // Constructor logic if needed
  }

  // Add any methods or properties needed for the component here

  ngOnInit():void{
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
      }),
    });
  }

  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get('datosdelForm')?.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

}
