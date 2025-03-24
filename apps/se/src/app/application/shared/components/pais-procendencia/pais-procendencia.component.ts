/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de países de procedencia en un trámite.
 * @module PaisProcendenciaComponent
 */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';



import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

/**
 * Componente para la gestión de la selección de países de procedencia.
 */
@Component({
  selector: 'app-pais-procendencia',
  standalone: true,
  imports: [
    TituloComponent,
    CrosslistComponent,
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './pais-procendencia.component.html',
  styleUrl: './pais-procendencia.component.scss',
})
export class PaisProcendenciaComponent implements OnInit {
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;
  @Input()paisProc: Catalogo[] = [];
  @Input()paisesPorBloque: Catalogo[] = [];
  @Input() selectRangoDias: string[] = [];
  @Output() bloqueCambiar = new EventEmitter<number>();
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string; metodoNombre: string }>();
  paisForm!: FormGroup;
  campoDeBotones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('t');
        }
      },
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('');
        }
      },
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('');
        }
      },
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('t');
        }
      },
    },
  ];
  constructor(
    private http: HttpClient, 
    private fb: FormBuilder) {
    // Constructor del componente
  }
  ngOnInit(): void {
    this.paisForm = this.fb.group({
      bloque: [''],
      usoEspecifico: ['', Validators.required],
      justificacionImportacionExportacion: ['', [Validators.required]],
      observaciones: [''],
    });
  }
  enCambioDeBloque(event: Event): void {
    const SELECTED_BLOQUE = Number((event.target as HTMLInputElement).value);
    this.bloqueCambiar.emit(SELECTED_BLOQUE);
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    this.setValoresStoreEvent.emit({ form, campo, metodoNombre });
  }
}