import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import seleccionarOpciones from '@libs/shared/theme/assets/json/5601/selector-5601.json'

@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule,TituloComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit {

  formulario!: FormGroup;

  formularioMercancia!: FormGroup;

  formularioLogistica!: FormGroup;

  formularioUbicacionMercancia!: FormGroup;

  aduanas!: Catalogo[];

  seccionAduanera!: Catalogo[];

  tipoOperacion!: Catalogo[];

  tipoMoneda!: Catalogo[];

  mostrarFechaOperacion: boolean = false;

  constructor(private fb: FormBuilder) {
    this.aduanas = seleccionarOpciones?.aduanas;
    this.seccionAduanera = seleccionarOpciones?.seccionAduanera;
    this.tipoOperacion = seleccionarOpciones?.tipoOperacion;
    this.tipoMoneda = seleccionarOpciones?.tipoMoneda;
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      aduana: [null, Validators.required],
      seccionAduanera: [null, Validators.required],
      tipoOperacion: [null, Validators.required],
      fechaOperacion: [null],
      motivoDespachoDomicilio: [null],
      observaciones: [null]
    });

    this.formularioMercancia = this.fb.group({
      especificacionesMercancia: [null, Validators.required],
      descripcionMercancia: [null, Validators.required],
      tipoMoneda: [null, Validators.required],
      valorMercancia: [null, Validators.required],
    });

    this.formularioLogistica = this.fb.group({
      esquemasControlSeguridad: [null, Validators.required],
      distanciaRutaTiempos: [null, Validators.required],
    });

    this.formularioUbicacionMercancia = this.fb.group({
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      distanciaAduana: [null, Validators.required],
      referencias: [null, Validators.required],
    });
  }

  alCambiarTipoOperacion(): void {
    this.mostrarFechaOperacion=true
  }

}
