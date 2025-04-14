/**
 * @component ImportadorEnDestinoComponent
 * @description Este componente es responsable de manejar el formulario del importador en destino.
 * Incluye un formulario para capturar los datos del importador y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup } from '@angular/forms';
 */

import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { 
  Catalogo, 
  SeccionLibQuery, 
  SeccionLibState, 
  SeccionLibStore 
} from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { delay } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';

import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { TextilesState } from '../../estados/elegibilidad-de-textiles.store';

import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';

import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

import { REG_X} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';

/**
 * @component ImportadorEnDestinoComponent
 * @description Este componente es responsable de manejar el formulario del importador en destino.
 * Incluye un formulario para capturar los datos del importador y funcionalidades adicionales.
 */
@Component({
  selector: 'app-importador-en-destino',
  templateUrl: './importador-en-destino.component.html',
  styleUrl: './importador-en-destino.component.scss'
})
export class ImportadorEnDestinoComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} importadorForm - El grupo de formularios para capturar los datos del importador.
   */
  importadorForm!: FormGroup;

  /**
   * @property {FormGroup} importadorEnDestino - El grupo de formularios para los datos del certificado de registro.
   */
  importadorEnDestino!: FormGroup;

  /**
   * @property {Catalogo[]} tipoData - Datos para el select de tipo de importador.
   */
  tipoData: Catalogo[] = [];

  /**
   * @property {Subject<void>} destroyNotifier$ - Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} importadorState - Estado actual del importador.
   */
  private importadorState!: TextilesState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store para manejar el estado de elegibilidad de textiles.
   * @param {ElegibilidadDeTextilesQuery} ElegibilidadDeTextilesQuery - Query para consultar el estado de elegibilidad de textiles.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar el estado de la sección.
   * @param {ElegibilidadTextilesService} ElegibilidadTextilesService - Servicio para manejar la lógica de elegibilidad de textiles.
   */
  constructor(
    private ElegibilidadTextilesService: ElegibilidadTextilesService,
    private readonly fb: FormBuilder,
    private readonly httpServicios: HttpClient,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method ngOnInit
   * @description Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();

    this.ElegibilidadDeTextilesQuery.selectTextile$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.importadorState = state as TextilesState;
        })
      )
      .subscribe();

    this.initActionFormBuild();
    this.obtenerListasDesplegables();

    this.seccionStore.establecerFormaValida([false]);

    this.importadorForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.importadorForm.valid) {
            this.ElegibilidadDeTextilesStore.setFormaValida([
              ...this.importadorState.formaValida,
              { id: 4, descripcion: 'TodoValido' },
            ]);
          }
          this.seccionStore.establecerSeccion([true]);
          this.seccionStore.establecerFormaValida([true]);
        })
      )
      .subscribe();
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos del importador.
   */
  initActionFormBuild(): void {
    this.importadorForm = this.fb.group({
      tipo: [this.importadorState.tipo, Validators.required],
      cantidadTotalImportador: [
        this.importadorState.cantidadTotalImportador,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      razonSocialImportador: [
        this.importadorState.razonSocialImportador,
        Validators.required,
      ],
      domicilio: [this.importadorState.domicilio, Validators.required],
      ciudadImportador: [
        this.importadorState.ciudadImportador,
        Validators.required,
      ],
      cpImportador: [
        this.importadorState.cpImportador,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      PaisImportador: [
        { value: this.importadorState.PaisImportador, disabled: true },
        Validators.required,
      ],
    });
  }

  /**
   * @method obtenerListasDesplegables
   * @description Obtiene las listas desplegables necesarias para el formulario.
   */
  obtenerListasDesplegables(): void {
    this.obtenerIngresoSelectList();
  }

  /**
   * @method obtenerIngresoSelectList
   * @description Obtiene la lista para el select de tipo de importador.
   */
  obtenerIngresoSelectList(): void {
    this.ElegibilidadTextilesService.obtenerMenuDesplegable('tipo.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.tipoData = data as Catalogo[];
      });
  }

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo.
   * @param {keyof ElegibilidadDeTextilesStore} metodoNombre - El método del store a invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ElegibilidadDeTextilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }

  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}