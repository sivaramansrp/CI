import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OPCION_DE_BOTON_DE_RADIO } from '../../constantes/tercerosrelacionados.enum';
import { RadioOpcion } from '../../../tramites/220201/models/220201/certificado-zoosanitario.model';
import { TercerosrelacionadosService } from '../services/tercerosrelacionados/tercerosrelacionados.service';
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
export class AgregardestinatarioComponent implements OnInit,AfterViewInit {
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
  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   */
  private destroyNotifier$ = new Subject<void>();
  destinatarioForm!: FormGroup;
  constructor(public fb: FormBuilder,public tercerosrelacionadosService: TercerosrelacionadosService){}
  ngOnInit(): void {
     this.destinatarioForm = this.fb.group({
      tipoMercancia: ['yes', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: ['', Validators.required],
      pais: ['1', Validators.required],
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
  ngAfterViewInit(): void {
    this.pairsCatalogChange();
    this.estadoCatalogChange();
    this.municipioCatalogChange();  
    this.coloniaCatalogChange();
  }
  pairsCatalogChange():void {
       this.tercerosrelacionadosService.obtenerSelectorList('paisprocedencia.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
          this.pairsCatalog = data;
        })
  }
  estadoCatalogChange():void {
    this.tercerosrelacionadosService.obtenerSelectorList('estados.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.estadoCatalog = data;
    })
  }
  municipioCatalogChange():void {
    this.tercerosrelacionadosService.obtenerSelectorList('municipios.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.municipioCatalog = data;
    })
  }
  coloniaCatalogChange():void {
    this.tercerosrelacionadosService.obtenerSelectorList('colonias.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.coloniaCatalog = data;
    })
  }
}
