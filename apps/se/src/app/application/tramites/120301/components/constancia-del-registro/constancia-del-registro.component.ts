/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */
import { Component, OnInit } from '@angular/core';
import { ElegibilidadDeTextilesStore, TextilesState, createInitialState } from '../../estados/elegibilidad-de-textiles.store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service'
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import radioOptionsData from '@libs/shared/theme/assets/json/120301/mostrar.json';
@Component({
  selector: 'app-constancia-del-registro',
  templateUrl: './constancia-del-registro.component.html',
  styleUrl: './constancia-del-registro.component.scss',
  standalone: true,
  imports: [
    TableComponent,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent
  ]
})
export class ConstanciaDelRegistroComponent implements OnInit {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos del certificado de registro.
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

  radioOptions = radioOptionsData;

  selectedValue: string | number = '';

  private destroyNotifier$: Subject<void> = new Subject();

  private constanciaState: TextilesState = createInitialState();

  private seccionState!: SeccionLibState

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

  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private ElegibilidadTextilesService: ElegibilidadTextilesService,
  ) { 
    // Constructor logic can be added here if needed
  }
  
  ngOnInit(): void {
    this.initActionFormBuild();
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

      this.seccionStore.establecerFormaValida([false]);

    if(this.constanciaState.formaValida && this.constanciaState.formaValida[0] && this.constanciaState.formaValida[0].descripcion === 'AllValida'){
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true])
    }
    else{
      this.seccionStore.establecerFormaValida([false]);
    }
    
  }

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
      fechaFinVigencia: [this.constanciaState.fechaFinVigencia]
    });
  }

  onValueChange(newValue: number|string) {
    this.selectedValue = newValue;
  }

  setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof ElegibilidadDeTextilesStore
    ): void {
      const VALOR = form.get(campo)?.value;
      console.log(VALOR);
      (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
        VALOR
      );
    }

}