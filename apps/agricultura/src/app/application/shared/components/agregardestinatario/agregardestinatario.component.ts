import { Catalogo, CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OPCION_DE_BOTON_DE_RADIO } from '../../constantes/tercerosrelacionados.enum';
import { RadioOpcion } from '../../../tramites/220201/models/220201/certificado-zoosanitario.model';
import { TituloComponent } from "../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

@Component({
  selector: 'app-agregardestinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent,
    InputRadioComponent,CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './agregardestinatario.component.html',
  styleUrl: './agregardestinatario.component.scss',
})
export class AgregardestinatarioComponent implements OnInit {
      /**
         * Indica si el formulario debe mostrarse en modo solo lectura.
         *
         * @type {boolean}
         * @default false
         * @see https://compodoc.app/
         *
         * @description
         * Cuando es verdadero, el formulario se presenta únicamente para visualización,
         * deshabilitando la edición de los campos.
         */
        @Input() esFormularioSoloLectura:boolean = false;
/**
   * Opciones para el botón de radio.
   * @property {RadioOpcion[]} opcionDeBotonDeRadio
   */
  opcionDeBotonDeRadio: RadioOpcion[] = OPCION_DE_BOTON_DE_RADIO;
  /**
   * Configuración para el select de veterinario.--220201
   * @property {Catalogo[]} veterinario
   */
  pairsCatalog: Catalogo[] = [];
  estadoCatalog: Catalogo[] = [];
  municipioCatalog: Catalogo[] = [];
  coloniaCatalog:Catalogo[]=[];

  destinatarioForm!: FormGroup;
  constructor(public fb: FormBuilder){}
  ngOnInit(): void {
     this.destinatarioForm = this.fb.group({
      tipoMercancia: ['yes', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: [''],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correo: ['']
    });
  }
}
