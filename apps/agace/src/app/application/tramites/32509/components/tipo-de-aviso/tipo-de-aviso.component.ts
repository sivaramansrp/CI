import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AVISO_OPCIONES } from '../../constantes/destruccion-o-donacion';

@Component({
  selector: 'app-tipo-de-aviso',
  templateUrl: './tipo-de-aviso.component.html',
  styleUrl: './tipo-de-aviso.component.css',
})
export class TipoDeAvisoComponent implements OnInit {

  avisoForm!: FormGroup;

  avisoOpciones = AVISO_OPCIONES;

  constructor(
    private readonly fb: FormBuilder, 
  ) {}

  ngOnInit(): void {
    this.initActionBuilder();
  }

  initActionBuilder(): void {
    this.avisoForm = this.fb.group({
      tipoDeAviso: [],
    });
  }
}
