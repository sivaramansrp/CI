/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VALIDO } from '../../constantes/elegibilidad-de-textiles.enums';

import radioOptionsData from '@libs/shared/theme/assets/json/120301/mostrar.json';

import { InputRadioComponent } from '@ng-mf/data-access-user';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { TextilesState } from '../../estados/elegibilidad-de-textiles.store';

import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';

import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';


/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 */
@Component({
  selector: 'app-constancia-del-registro',
  templateUrl: './constancia-del-registro.component.html',
  styleUrl: './constancia-del-registro.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent
  ]
})
export class ConstanciaDelRegistroComponent implements OnInit {
  /**
   * @property {FormGroup} fitosanitarioForm - El grupo de formularios para capturar los datos del certificado de registro.
   */
  fitosanitarioForm!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para los datos del certificado de registro.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {any} radioOptions - Opciones de radio cargadas desde un archivo JSON.
   */
  radioOptions = radioOptionsData;

  /**
   * @property {string | number} selectedValue - Valor seleccionado en las opciones de radio.
   */
  selectedValue: string | number = '';

  /**
   * @property {Subject<void>} destroyNotifier$ - Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} constanciaState - Estado actual de los textiles.
   */
  private constanciaState!: TextilesState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
   */
  tableColumns = [
    'Número de constancia de registro',
    'Fracción arancelaria',
    'Clasificación del regimen',
    'País destino/origen',
    'Fecha inicio vigencia',
    'Fecha fin vigencia',
  ];

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store para manejar el estado de elegibilidad de textiles.
   * @param {ElegibilidadDeTextilesQuery} ElegibilidadDeTextilesQuery - Query para consultar el estado de elegibilidad de textiles.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar el estado de la sección.
   * @param {ElegibilidadTextilesService} ElegibilidadTextilesService - Servicio para manejar la lógica de elegibilidad de textiles.
   */
  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private ElegibilidadTextilesService: ElegibilidadTextilesService
  ) {
    // Lógica del constructor si es necesario
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
          this.constanciaState = state as TextilesState;
        })
      )
      .subscribe();

    this.initActionFormBuild();

    this.seccionStore.establecerFormaValida([false]);

    if (
      this.constanciaState.formaValida &&
      this.constanciaState.formaValida[0] &&
      this.constanciaState.formaValida[0].descripcion === VALIDO
    ) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    } else {
      this.seccionStore.establecerFormaValida([false]);
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos del certificado de registro.
   */
  initActionFormBuild(): void {
    this.fitosanitarioForm = this.fb.group({
      flexRadioRegistro: ['Todos'],
      estado: [this.constanciaState.estado],
      representacionFederal: [this.constanciaState.representacionFederal],
      fraccionArancelaria: [this.constanciaState.fraccionArancelaria],
      descripcionProducto: [this.constanciaState.descripcionProducto],
      tratado: [this.constanciaState.tratado],
      subproducto: [this.constanciaState.subproducto],
      mecanismo: [this.constanciaState.mecanismo],
      typoCategoria: [this.constanciaState.typoCategoria],
      typoRegimen: [this.constanciaState.typoRegimen],
      descripcionCategoriaTextil: [this.constanciaState.descripcionCategoriaTextil],
      PaisDestino: [this.constanciaState.PaisDestino],
      unidadMedidaCategoriaTextil: [this.constanciaState.unidadMedidaCategoriaTextil],
      factorConversionCategoriaTextil: [this.constanciaState.factorConversionCategoriaTextil],
      fechaInicioVigencia: [this.constanciaState.fechaInicioVigencia],
      fechaFinVigencia: [this.constanciaState.fechaFinVigencia],
    });
  }

  /**
   * @method onValueChange
   * @description Maneja el cambio de valor en las opciones de radio.
   * @param {string | number} newValue - Nuevo valor seleccionado.
   */
  onValueChange(newValue: number | string): void {
    this.selectedValue = newValue;
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
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(VALOR);
  }
}