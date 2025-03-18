/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @component
 * @name PartidasDeLaComponent
 * @description Este componente se utiliza para gestionar las partidas de una tabla dinámica. Proporciona funcionalidades para editar partidas, calcular totales y gestionar la selección de filas.
 * @selector app-partidas-de-la
 * @standalone true
 * @imports CommonModule, ReactiveFormsModule, TituloComponent, UppercaseDirective, AlertComponent, TableComponent, CatalogoSelectComponent, TablaDinamicaComponent
 * @templateUrl ./partidas-de-la.component.html
 * @styleUrl ./partidas-de-la.component.scss
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130109/partidas-de-la.json';
import { Router } from '@angular/router';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';
import { Tramite130109Store } from '../../estados/tramites/tramites130109.store';
import { UppercaseDirective } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    TableComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss',
})
export class PartidasDeLaComponent implements OnInit {
  /**
   * @property {any} filaSeleccionada
   * @description Fila seleccionada de la tabla.
   */
  filaSeleccionada: any = null;

  /**
   * @property {Subject<void>} destroyed$
   * @description Sujeto utilizado para gestionar el ciclo de vida del componente y liberar recursos.
   */
  private destroyed$: Subject<void> = new Subject();
  /**
   * @property {boolean} mostrarTabla
   * @description Indica si la tabla debe mostrarse en el componente.
   */
  mostrarTabla = false;
  /**
   * @property {FormGroup} form
   * @description Formulario reactivo utilizado para gestionar los datos de las partidas de mercancía.
   */
  form!: FormGroup;

  /**
   * @property {FormGroup} formForTotalCount
   * @description Formulario reactivo utilizado para gestionar los totales de cantidad y valor en USD.
   */
  formForTotalCount!: FormGroup;

  /**
   * @property {any} TEXTOS
   * @description Constantes de texto utilizadas en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * @property {ConfiguracionColumna<any>[]} tableHeaderData
   * @description Encabezados de la tabla.
   */
  tableHeaderData: ConfiguracionColumna<any>[] = [];

  /**
   * @property {any[]} tableBodyData
   * @description Datos del cuerpo de la tabla.
   */

  tableBodyData: any[] = [];
  /**
   * @property {TablaSeleccion} CHECKBOX
   * @description Tipo de selección de la tabla.
   */
  CHECKBOX = TablaSeleccion.CHECKBOX;

  /**
   * @property {any} getEstablecimientoTableData
   * @description Datos del establecimiento provenientes de un archivo JSON.
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * Constructor
   * @param {FormBuilder} fb - Servicio de creación de formularios
   * @param {Router} router - Angular router
   * @param {HttpClient} http - HTTP client service
   * @param {Tramite130109Store} tramite130109Store - State management store
   * @param {Tramite130109Query} tramite130109Query - Query service
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tramite130109Store: Tramite130109Store,
    private tramite130109Query: Tramite130109Query
  ) {
    // Constructor necesario para la inyección de dependencias
  }

  /**
   * @method ngOnInit
   * @description Ciclo de vida de Angular que inicializa el formulario, obtiene los datos de la tabla y calcula los totales.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.formularioTotalCount();
    this.getEstablecimiento();
    this.calculateTotals();

    this.tramite130109Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.form.patchValue({
            cantidad: seccionState.cantidad,
            valorPartidaUSD: seccionState.valorPartidaUSD,
            descripcion: seccionState.descripcion,
          });
        })
      )
      .subscribe();
  }

  /**
   * @method crearFormulario
   * @description Crea el formulario reactivo para gestionar los datos de las partidas.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
        ],
      ],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      valorPartidaUSD: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  /**
   * @method calculateTotals
   * @description Calcula los totales de cantidad y valor en USD basándose en los datos de la tabla.
   */
  calculateTotals(): void {
    const CANTIDAD_TOTAL = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[0]),
      0
    );
    const VALOR_TOTAL_USD = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[5]),
      0
    );
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['cantidadTotal'].setValue(CANTIDAD_TOTAL);
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTAL_USD);
  }

  /**
   * @method formularioTotalCount
   * @description Crea el formulario reactivo para gestionar los totales.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }
  /**
   * @method getEstablecimiento
   * @description Carga los datos de establecimiento en la tabla desde un archivo JSON.
   */
  public getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map(
      (header, index) => ({
        encabezado: header,
        clave: (fila: any): string => fila.tbodyData[index],
        orden: index,
      })
    );

    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * @method handleListaDeFilaSeleccionada
   * @description Maneja la selección de múltiples filas en la tabla.
   * @param {any[]} filasSeleccionadas Lista de filas seleccionadas.
   */
  handleListaDeFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas[0]
      : null;
    if (this.filaSeleccionada) {
      this.tramite130109Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * Método para validar el formulario al hacer clic en el botón
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      /*eslint-disable-next-line no-console*/
      console.log(
        'El formulario tiene errores. Corríjalos antes de continuar.'
      );
    } else {
      /*eslint-disable-next-line no-console*/
      console.log('Formulario enviado con éxito', this.form.value);
      this.mostrarTabla = true;
    }
  }

  /**
   * Método para verificar si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Navega a la página de carga de archivo.
   */
  navigateToCargarArchivo(): void {
    this.router.navigate(['/pago/importacion/carger-archivo']);
  }

  /**
   * @method navegarParaModificarPartida
   * @description Navega a la página de modificación de partida con la fila seleccionada.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.router.navigate(['/pago/importacion/modificar-partida'], {
        state: { filaSeleccionada: this.filaSeleccionada },
      });
    }
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130109Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130109Store[metodoNombre] as (value: any) => void)(VALOR);
  }
}
