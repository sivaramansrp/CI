import { Catalogo, CatalogoSelectComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import SolicitudeJson from '@libs/shared/theme/assets/json/231003/solicitud.json';

@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule, TableComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit {

  solicitudForm!: FormGroup;

  aduanas!: Catalogo[];

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  constructor(public fb: FormBuilder) {
    // Constructor logic if needed
  }

  // Add any methods or properties needed for the component here

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
      }),
    });
    this.aduanas = SolicitudeJson.Immex;
    this.establecimientoHeaderData = SolicitudeJson.table[0]?.encabezadoDeTabla || [];
    this.establecimientoBodyData = SolicitudeJson.table[0]?.cuerpoTabla || [];

  }

  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get('datosdelForm')?.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

}
