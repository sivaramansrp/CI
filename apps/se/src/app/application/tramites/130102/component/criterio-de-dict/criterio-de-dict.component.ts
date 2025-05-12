/* eslint-disable @nx/enforce-module-boundaries */
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

import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs';
import { FormularioRegistroService } from '../../services/octava-temporal.service';

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

  
  public solicitudState!: Solicitud130102State;
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Inicializa el componente CriterioDeDict.
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @returns void
   * @description Inicializa el componente CriterioDeDict.
   */
  constructor(private fb: FormBuilder,
    private tramite130102Store: Tramite130102Store,
    private tramite130102Query: Tramite130102Query,
    private formularioRegistroService: FormularioRegistroService
  ) {
    //constructor
  }

  /**
   * Maneja la selección de una solicitud de mercancía.
   * @param e - La solicitud de mercancía seleccionada.
   */
  fetchSolicitudMercancia(e: Catalogo): void {
    this.seleccionadaSolicitudMercancia = e;
  }

    /**
   * Asigna un valor del formulario al store.
   *
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Campo del formulario a obtener.
   * @param {keyof Tramite130102Store} metodoNombre - Método del store donde se guardará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130102Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene las solicitudes de mercancía.
   * @returns void
   * @description Obtiene las solicitudes de mercancía.
   */
  ngOnInit(): void {

   this.tramite130102Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => { 
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.frmCriterioDictamen = this.fb.group({
      solicitudMercancia: [this.solicitudState?.solicitudMercancia, Validators.required],
    });

    this.formularioRegistroService.registrarFormulario('frmCriterioDictamen', this.frmCriterioDictamen);
  }
}
