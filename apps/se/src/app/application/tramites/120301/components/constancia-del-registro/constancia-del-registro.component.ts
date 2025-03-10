/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */
import { Component, OnInit } from '@angular/core';
import { ElegibilidadDeTextilesStore, TextilesState } from '../../estados/elegibilidad-de-textiles.store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConstanciaDelRegistroService } from '../../services/constancia-del-registro/constancia-del-registro.service';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
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

  private constanciaState!: TextilesState;

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

  /**
   * @property {Array} federal - Array de datos de federal para mostrar en la tabla.
   */
  federal: any[] = [];
  constructor(
    private fb: FormBuilder,
    private constanciaDelRegistroService: ConstanciaDelRegistroService,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) { }

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
    this.fetchData();
    this.initActionFormBuild();
    
  }

  initActionFormBuild(): void {
    this.fitosanitarioForm = this.fb.group({
      flexRadioRegistro: ['Datos'],
      estado: [''],
      representacionFederal: [''],
      fraccionArancelaria: [''],
      descripcionProducto: [''],
      tratado: [''],
      subproducto: [''],
      mecanismo: [''],
      typoCategoria: [''],
      typoRegimen: [''],
      descripcionCategoriaTextil: [''],
      PaisDestino: [''],
      unidadMedidaCategoriaTextil: [''],
      factorConversionCategoriaTextil: [''],
      fechaInicioVigencia: [''],
      fechaFinVigencia: ['']
    });
  }
  fetchData(): void {
    this.constanciaDelRegistroService.getFederal().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.federal)) {

          this.federal = response.federal.map((item: any) => {
            var data = {
              tbodyData: item.tbodyData
            }
            return data;
          }
          );

          this.federal = [...this.federal]

        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.federal = [];
        }
      },
      error: (error: any) => {
        console.error('Error al recuperar los datos:', error);
        this.federal = [];
      }
    });
  }

  onValueChange(newValue: any) {
    this.selectedValue = newValue;
  }

  setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof ElegibilidadDeTextilesStore
    ): void {
      const VALOR = form.get(campo)?.value;
      console.log(VALOR);
      (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: any) => void)(
        VALOR
      );
    }

}