/**
 * @component
 * @name RepresentacionComponent
 * @description RepresentacionComponent es un componente que maneja la selección de entidades federativas y representaciones federales.
 * @selector app-representacion
 * @standalone true
 * @imports TituloComponent, CatalogoSelectComponent, CommonModule, ReactiveFormsModule, AlertComponent
 * @templateUrl ./representacion.component.html
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { NeumaticosComercializarService } from './../../../tramites/130110/services/neumaticos-comercializar.service';
import { TEXTOS } from './../../../tramites/130110/enums/representacion-federal.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

@Component({
  selector: 'app-representacion',
  standalone: true,
  imports: [
    AlertComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './representacion.component.html',
})
export class RepresentacionComponent implements OnInit {
  @Input() entidadFederativa: Catalogo[] = [];
  @Input() representacionFederal: Catalogo[] = [];
  @Input() TEXTOS = TEXTOS;
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string; metodoNombre: string }>();
  frmRepresentacion!: FormGroup;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder,
    private neumaticosComercializarService: NeumaticosComercializarService) {
    // Constructor del componente
  }

  ngOnInit(): void {
    this.frmRepresentacion = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    this.setValoresStoreEvent.emit({ form, campo, metodoNombre });
  }
}

