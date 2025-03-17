/**
 * @component
 * @name RepresentacionComponent
 * @description RepresentacionComponent es un componente que maneja la selección de entidades federativas y representaciones federales.
 * @selector app-representacion
 * @standalone true
 * @imports TituloComponent, CatalogoSelectComponent, CommonModule, ReactiveFormsModule, AlertComponent
 * @templateUrl ./representacion.component.html
 */
import { Component, OnInit } from '@angular/core';
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
import EntidadFederativaOptions from '@libs/shared/theme/assets/json/130109/entidad-federativa.json';
import RepresentacionFederalOptions from '@libs/shared/theme/assets/json/130109/representacion-federal.json';
import { TEXTOS } from '../../enum/representacion-federal.enum';
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
  /**
   * @property {FormGroup} frmRepresentacion - Formulario reactivo para la selección de entidad federativa y representación federal.
   */
  frmRepresentacion!: FormGroup;

  /**
   * @property {Catalogo[]} entidadFederativa - Lista de opciones de entidades federativas.
   */
  entidadFederativa: Catalogo[] = EntidadFederativaOptions;

  /**
   * @property {Catalogo[]} representacionFederal - Lista de opciones de representaciones federales.
   */
  representacionFederal: Catalogo[] = RepresentacionFederalOptions;

  /**
   * @property {any} TEXTOS - Textos utilizados en el componente.
   */
  public TEXTOS = TEXTOS;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    //
  }

  ngOnInit(): void {
    this.frmRepresentacion = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
  }

  /**
   * @method fetchEntidadFederativa
   * @description Obtiene las opciones de entidades federativas desde un archivo JSON.
   */
  fetchEntidadFederativa(): void {
    this.http
      .get<Catalogo[]>('/assets/json/130109/entidad-federativa.json')
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * @method fetchRepresentacionFederal
   * @description Obtiene las opciones de representaciones federales desde un archivo JSON.
   */
  fetchRepresentacionFederal(): void {
    this.http
      .get<Catalogo[]>('/assets/json/130109/representacion-federal.json')
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }
}

