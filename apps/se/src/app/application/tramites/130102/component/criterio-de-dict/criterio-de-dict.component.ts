/**
 * CriterioDeDictComponent es un componente que maneja la selección de solicitudes de mercancía.
 * @packageDocumentation
 * @module CriterioDeDictComponent
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import SolicitudMercanciaValues from 'libs/shared/theme/assets/json/130102/solicitud_mercancia.json';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * CriterioDeDictComponent es un componente que maneja la selección de solicitudes de mercancía.
 */
@Component({
  selector: 'app-criterio-de-dict',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './criterio-de-dict.component.html',
  styleUrl: './criterio-de-dict.component.scss',
})
export class CriterioDeDictComponent implements OnInit {
  /**
   * Configuración del formulario de criterio de dictamen.
   */
  frmCriterioDictamen!: FormGroup;

  /**
   * Solicitudes de mercancía disponibles.
   * @type {Catalogo[]} - Las solicitudes de mercancía disponibles.
   */
  solicitudMercanciaLista: Catalogo[] = SolicitudMercanciaValues;

  /**
   * Solicitud de mercancía seleccionada.
   */
  seleccionadaSolicitudMercancia: Catalogo = { id: 0, descripcion: '' };

  /**
   * Inicializa el componente CriterioDeDict.
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @returns void
   * @description Inicializa el componente CriterioDeDict.
   */
  constructor(private fb: FormBuilder) {
    //
  }

  /**
   * Maneja la selección de una solicitud de mercancía.
   * @param e - La solicitud de mercancía seleccionada.
   */
  fetchSolicitudMercancia(e: Catalogo): void {
    this.seleccionadaSolicitudMercancia = e;
  }

  /**
   * Obtiene las solicitudes de mercancía.
   * @returns void
   * @description Obtiene las solicitudes de mercancía.
   */
  ngOnInit(): void {
    this.frmCriterioDictamen = this.fb.group({
      solicitudMercancia: ['', Validators.required],
    });
  }
}
