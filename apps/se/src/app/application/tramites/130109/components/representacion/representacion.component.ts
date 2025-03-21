/**
 * @component
 * @name RepresentacionComponent
 * @description RepresentacionComponent es un componente que maneja la selección de entidades federativas y representaciones federales.
 * @selector app-representacion
 * @standalone true
 * @imports TituloComponent, CatalogoSelectComponent, CommonModule, ReactiveFormsModule, AlertComponent
 * @templateUrl ./representacion.component.html
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, takeUntil } from 'rxjs';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../enum/representacion-federal.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';
import { Tramite130109Store } from '../../estados/tramites/tramites130109.store';
import { VehiculosUsadosAdaptadosService } from '../../services/vehiculos-usados-adaptados.service';

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
  styleUrl: './representacion.component.scss',
})
export class RepresentacionComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} frmRepresentacion - Formulario reactivo para la selección de entidad federativa y representación federal.
   */
  frmRepresentacion!: FormGroup;

  /**
   * @property {Catalogo[]} entidadFederativa - Lista de opciones de entidades federativas.
   */
  public entidadFederativa!: Catalogo[];
  /**
   * @property {Catalogo[]} representacionFederal - Lista de opciones de representaciones federales.
   */
  public representacionFederal!: Catalogo[];
  /**
   * @property {any} TEXTOS - Textos utilizados en el componente.
   */
  public TEXTOS = TEXTOS;
  /**
   * Observable utilizado para gestionar la destrucción del componente y evitar fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyed$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private tramite130109Store: Tramite130109Store,
    private tramite130109Query: Tramite130109Query,
    private vehiculosUsadosAdaptadosService: VehiculosUsadosAdaptadosService
  ) {
    //
  }

  ngOnInit(): void {
    this.frmRepresentacion = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.tramite130109Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.frmRepresentacion.patchValue({
            entidad: seccionState.entidad,
            representacion: seccionState.representacion,
          });
        })
      )
      .subscribe();
  }

  /**
   * @method fetchEntidadFederativa
   * @description Obtiene las opciones de entidades federativas desde un archivo JSON.
   */
  fetchEntidadFederativa(): void {
    this.vehiculosUsadosAdaptadosService
      .getEntidadFederativa()
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * @method fetchRepresentacionFederal
   * @description Obtiene las opciones de representaciones federales desde un archivo JSON.
   */
  fetchRepresentacionFederal(): void {
    this.vehiculosUsadosAdaptadosService
      .getRepresentacionFederal()
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de Tramite130109.
   * @param {FormGroup} frmRepresentacion - Formulario reactivo.
   * @param {string} campo - Nombre del campo.
   * @param {keyof Tramite130109Store} metodoNombre - Nombre del método en el store.
   */
  setValoresStore(
    frmRepresentacion: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130109Store
  ): void {
    const VALOR = frmRepresentacion.get(campo)?.value;
    (this.tramite130109Store[metodoNombre] as (value: string | number) => void)(
      VALOR
    );
  }
  /**
   * Método que se ejecuta cuando el componente se destruye.
   * Este método emite un valor a `destroyed$` y completa el observable para evitar fugas de memoria.
   * @method
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
