import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import seleccionarOpciones from '@libs/shared/theme/assets/json/5601/selector-5601.json'

@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit {

  formulario!: FormGroup;

  aduanas!: Catalogo[];

  seccionAduanera!: Catalogo[];

  tipoOperacion!: Catalogo[];

  mostrarFechaOperacion: boolean = false;

  constructor(private fb: FormBuilder) {
    this.aduanas = seleccionarOpciones?.aduanas;
    this.seccionAduanera = seleccionarOpciones?.seccionAduanera;
    this.tipoOperacion = seleccionarOpciones?.tipoOperacion;
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      aduana: [null, Validators.required],
      seccionAduanera: [null, Validators.required],
      tipoOperacion: [null, Validators.required],
      fechaOperacion: [null]
    });
  }

  alCambiarTipoOperacion(): void {
    this.mostrarFechaOperacion=true
  }

}
