/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de solicitudes y tipos de documentos en un trámite.
 * @module DetosDelTramiteComponent
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ProductoOption,
  ProductoResponse,
} from '../../enum/vehiculos-adaptados.enum';
import { map, takeUntil } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from '@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';
import { Tramite130109Store } from '../../estados/tramites/tramites130109.store';
import { VehiculosUsadosAdaptadosService } from '../../services/vehiculos-usados-adaptados.service';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130109/regimen-mercancia-select.json';

/**
 * Componente para la gestión de solicitudes y tipos de documentos en un trámite.
 * @component
 * @example
 * <app-detos-del-tramite></app-detos-del-tramite>
 */
@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  formDelTramite!: FormGroup;

  /**
   * Opciones disponibles para la solicitud.
   */
  opcionDeSolicitud: ProductoOption[] = [];

  /**
   * Lista de tipos de documentos disponibles.
   */
  tiposDocumentosArray: Catalogo[] = [];

  /**
   * Valor seleccionado actualmente.
   */
  selectedValue: string | number = 'Inicial';

  /**
   * Valor predeterminado en la selección.
   */
  predeterminadoSeleccionar: string = 'Inicial';
  /**
   * Observable utilizado para gestionar la destrucción del componente y evitar fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyed$: Subject<void> = new Subject();

  /**
   * Lista de catálogos para el régimen de destino de la mercancía.
   * @public
   * @type {Catalogo[]}
   */
  public listaDeRegimenDestinoMercancia!: Catalogo[];

  /**
   * Lista de catálogos para la clasificación del régimen.
   * @public
   * @type {Catalogo[]}
   */
  public listaClasificacionDelRegimen!: Catalogo[];
  /**
   * Constructor del componente.
   * @param {HttpClient} http - Servicio para realizar peticiones HTTP.
   * @param {FormBuilder} fb - Utilidad para la construcción de formularios reactivos.
   */
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private tramite130109Store: Tramite130109Store,
    private tramite130109Query: Tramite130109Query,
    private vehiculosUsadosAdaptadosService: VehiculosUsadosAdaptadosService
  ) {
    //constructor
  }

  /**
   * Inicializa el componente, configura el formulario y obtiene datos iniciales.
   */
  ngOnInit(): void {
    this.formDelTramite = this.fb.group({
      solicitud: [''],
      tipoDocumento: [''],
      regimenDestinoMercancia: ['', [Validators.required]],
      clasificacionDelRegimen: ['', [Validators.required]],
    });
    this.fetchSolicitudeOptions();
    this.fetchListaDeRegimenDestinoMercancia();
    this.fetchClasificacionDelRegimen();
    this.tramite130109Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formDelTramite.patchValue({
            regimenDestinoMercancia: seccionState.regimenDestinoMercancia,
            clasificacionDelRegimen: seccionState.clasificacionDelRegimen,
          });
        })
      )
      .subscribe();
  }

  /**
   * Maneja los cambios en la opción seleccionada.
   *
   * Este método se activa cuando el usuario cambia el valor en el campo correspondiente.
   *
   * @param {string | number} value - El nuevo valor seleccionado.
   *
   * Este método es para el control de radio de solicitud.
   */
  sobreLaSeleccionDeLaolSicitud(value: string | number): void {
    this.selectedValue = value;
  }

  /**
   * Obtiene la lista de opciones de solicitud desde el servicio de vehículos usados adaptados.
   * @method
   */
  fetchSolicitudeOptions(): void {
    this.vehiculosUsadosAdaptadosService
      .getSolicitudeOptions()
      .subscribe((data) => {
        this.opcionDeSolicitud = data.options;
        this.predeterminadoSeleccionar = data.defaultSelect;
      });
  }

  /**
   * Obtiene la lista de clasificación del régimen desde el servicio de vehículos usados adaptados.
   * @method
   */
  fetchClasificacionDelRegimen(): void {
    this.vehiculosUsadosAdaptadosService
      .getClasificacionDelRegimen()
      .subscribe((data) => {
        this.listaClasificacionDelRegimen = data;
      });
  }

  /**
   * Obtiene la lista de régimen de destino de la mercancía desde el servicio de vehículos usados adaptados.
   * @method
   */
  fetchListaDeRegimenDestinoMercancia(): void {
    this.vehiculosUsadosAdaptadosService
      .getListaDeRegimenDestinoMercancia()
      .subscribe((data) => {
        this.listaDeRegimenDestinoMercancia = data;
      });
  }
  /**
   * @nombre setValoresStore
   * @descripción Este método establece los valores en el store de Tramite130109.
   * @param {FormGroup} formDelTramite - El formulario del cual se obtendrá el valor.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite130109Store} metodoNombre - El nombre del método en el store que se llamará.
   * @returns {void}
   */
  setValoresStore(
    formDelTramite: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130109Store
  ): void {
    const VALOR = formDelTramite.get(campo)?.value;
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
