/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import EntidadFederativaOptions from 'libs/shared/theme/assets/json/130102/entidad_federativa.json';
import RepresentacionFederalOptions from 'libs/shared/theme/assets/json/130102/representacion_federal.json';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';


import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs'; 
import { FormularioRegistroService } from '../../services/octava-temporal.service';

/**
 * RepresentacionComponent es un componente que maneja la selección de entidades federativas y representaciones federales.
 */
@Component({
  selector: 'app-representacion',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './representacion.component.html',
})
export class RepresentacionComponent implements OnInit {
  /**
   * Configuración del formulario de representación.
   * @type {FormGroup}
   */
  frmRepresentacion!: FormGroup;

  /**
   * Entidades federativas disponibles.
   * @type {Catalogo[]} - Las entidades federativas disponibles.
   */
  entidadFederativaLista: Catalogo[] = EntidadFederativaOptions;

  /**
   * Representaciones federales disponibles.
   * @type {Catalogo[]} - Las representaciones federales disponibles.
   */
  representacionFederalLista: Catalogo[] = RepresentacionFederalOptions;

  /**
   * Representación federal seleccionada.
   * @type {Catalogo}
   */
  seleccionadaEntidadFederativa: Catalogo = { id: 0, descripcion: '' };

  /**
   * Representación federal seleccionada.
   * @type {Catalogo}
   */
  seleccionadaRepresentacionFederal: Catalogo = { id: 0, descripcion: '' };

  public solicitudState!: Solicitud130102State;
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Inicializa el componente RepresentacionComponent.
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @returns void
   */
  constructor(private fb: FormBuilder,
    private tramite130102Store: Tramite130102Store,
    private tramite130102Query: Tramite130102Query,
    private formularioRegistroService: FormularioRegistroService
  ) {
    //constructor
  }

  /**
   * Maneja la selección de una entidad federativa.
   * @param e - La entidad federativa seleccionada.
   * @returns void
   */
  entidadFederativaSeleccion(e: Catalogo): void {
    this.seleccionadaEntidadFederativa = e;
  }

  /**
   * Maneja la selección de una representación federal.
   * @param r - La representación federal seleccionada.
   * @returns void
   */
  representacionFederalSeleccion(r: Catalogo): void {
    this.seleccionadaRepresentacionFederal = r;
  }

  /**
   * Obtiene las entidades federativas y representaciones federales.
   * @returns void
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

    this.frmRepresentacion = this.fb.group({
      entidad: [ this.solicitudState?.entidad , Validators.required],
      representacion: [ this.solicitudState?.representacion , Validators.required],
    });
    this.formularioRegistroService.registrarFormulario('frmRepresentacion', this.frmRepresentacion);
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
    (this.tramite130102Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  /**
   * Obtiene las opciones de entidades federativas.
   * @returns void
   */
  fetchEntidadFederativa(e: Catalogo): void {
    this.seleccionadaEntidadFederativa = e;
  }

  /**
   * Obtiene las opciones de representaciones federales.
   * @returns void
   */
  fetchRepresentacionFederal(r: Catalogo): void {
    this.seleccionadaRepresentacionFederal = r;
  }
}
