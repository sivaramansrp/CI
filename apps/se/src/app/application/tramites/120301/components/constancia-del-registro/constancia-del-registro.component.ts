/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 *
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';

import radioOptionsData from '@libs/shared/theme/assets/json/120301/mostrar.json';

import { ConstanciaTramiteConfiguracion } from '@libs/shared/data-access-user/src/core/models/shared/acuse-y-resoluciones-folio-tramite.model';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaDinamicaComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { InputRadioComponent } from "@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { VALIDO } from '../../constantes/elegibilidad-de-textiles.enums';

import {
  ElegibilidadDeTextilesStore,
  TextilesState,
} from '../../estados/elegibilidad-de-textiles.store';

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
    InputRadioComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
  ],
})
export class ConstanciaDelRegistroComponent implements OnInit {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input()
  formularioDeshabilitado: boolean = false;
  /**
   * @property {FormGroup} fitosanitarioForm - El grupo de formularios para capturar los datos del certificado de registro.
   * @compodoc-field
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
   * @compodoc-field
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
   * @private
   * @compodoc-field
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} constanciaState - Estado actual de los textiles.
   * @private
   * @compodoc-field
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
   * Arreglo que almacena la configuración de la tabla de datos para constancias de trámite.
   *
   * @property {ConfiguracionColumna<ConstanciaTramiteConfiguracion>[]} configuracionTabla - Configuración de la tabla de datos.
   *
   */
  public configuracionTablaDatos: ConstanciaTramiteConfiguracion[] = [];

  /**
   * Arreglo que contiene los datos del catálogo de países.
   * @type {Catalogo[]}
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * @property {boolean} guardarBandera - Bandera para indicar si se deben guardar los datos.
   */
  public guardarBandera: boolean = false;

  /**
   * @property {EventEmitter<boolean>} mostrarTabs - Emite un valor booleano para mostrar las pestañas adicionales.
   */
  @Output() mostrarTabs: EventEmitter<boolean> = new EventEmitter<boolean>();

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
   * Configuración de las columnas de la tabla.
   */
  configuracionTabla: ConfiguracionColumna<ConstanciaTramiteConfiguracion>[] = [
    {
      encabezado: 'Numero de constancia de registro',
      clave: (artículo) => artículo.numeroDeConstancia,
      orden: 1,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (artículo) => artículo.fraccionArancelaria,
      orden: 2,
    },
    {
      encabezado: 'Clasificación del regimen',
      clave: (artículo) => artículo.clasificacionDelRegimen,
      orden: 3,
    },
    {
      encabezado: 'País destino/origen',
      clave: (artículo) => artículo.paisDestino,
      orden: 4,
    },
    {
      encabezado: 'Descripción de la categoría textil',
      clave: (artículo) => artículo.categoriaTextil,
      orden: 5,
    },
    {
      encabezado: 'Fecha inicio vigencia',
      clave: (artículo) => artículo.fechaInicioVigencia,
      orden: 6,
    },
    {
      encabezado: 'Fecha fin vigencia',
      clave: (artículo) => artículo.fechaFinVigencia,
      orden: 7,
    },
  ];

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

    this.ElegibilidadTextilesService.obtenerListaPaises()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

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

    if (this.formularioDeshabilitado) {
      this.fitosanitarioForm.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos del certificado de registro.
   */
  initActionFormBuild(): void {
    this.fitosanitarioForm = this.fb.group({
      flexRadioRegistro: [
        this.constanciaState.flexRadioRegistro
          ? this.constanciaState.flexRadioRegistro
          : 'Todos',
      ],
      anoDeLaConstancia: [
        this.constanciaState.anoDeLaConstancia,
        Validators.required,
      ],
      numeroDeLaConstancia: [
        this.constanciaState.numeroDeLaConstancia,
        Validators.required,
      ],
      estado: [this.constanciaState.estado],
      representacionFederal: [this.constanciaState.representacionFederal],
      fraccionArancelaria: [this.constanciaState.fraccionArancelaria],
      descripcionProducto: [this.constanciaState.descripcionProducto],
      tratado: [this.constanciaState.tratado],
      subproducto: [this.constanciaState.subproducto],
      mecanismo: [this.constanciaState.mecanismo],
      typoCategoria: [this.constanciaState.typoCategoria],
      typoRegimen: [this.constanciaState.typoRegimen],
      descripcionCategoriaTextil: [
        this.constanciaState.descripcionCategoriaTextil,
      ],
      PaisDestino: [this.constanciaState.PaisDestino],
      unidadMedidaCategoriaTextil: [
        this.constanciaState.unidadMedidaCategoriaTextil,
      ],
      factorConversionCategoriaTextil: [
        this.constanciaState.factorConversionCategoriaTextil,
      ],
      fechaInicioVigencia: [this.constanciaState.fechaInicioVigencia],
      fechaFinVigencia: [this.constanciaState.fechaFinVigencia],
    });
    this.configuracionTablaDatos =
      this.constanciaState.datosTablaConstanciaDelRegistro;
    this.guardarBandera = this.constanciaState.guardarBandera;
    if (
      this.configuracionTablaDatos.length > 0 &&
      this.constanciaState.guardarBandera
    ) {
      Object.keys(this.fitosanitarioForm.controls).forEach((key) => {
        if (
          key !== 'anoDeLaConstancia' &&
          key !== 'numeroDeLaConstancia' &&
          key !== 'flexRadioRegistro'
        ) {
          this.fitosanitarioForm.get(key)?.disable();
        }
      });
    }
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
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }

  /**
   * @method onFilaClic
   * @description Maneja el evento de clic en una fila de la tabla. Actualiza los valores del formulario y los almacena en el store.
   * También deshabilita los campos del formulario una vez que se llenan con los valores seleccionados.
   * @param {ConstanciaTramiteConfiguracion} fila - Datos de la fila seleccionada en la tabla.
   */
  onFilaClic(fila: ConstanciaTramiteConfiguracion): void {
    if (!fila) {
      return;
    }
    const ANO_DE_LA_CONSTANCIA =
      this.fitosanitarioForm.get('anoDeLaConstancia')?.value;
    const NUMERO_DE_LA_CONSTANCIA = this.fitosanitarioForm.get(
      'numeroDeLaConstancia'
    )?.value;
    const FORM_VALUES = {
      anoDeLaConstancia: ANO_DE_LA_CONSTANCIA ? ANO_DE_LA_CONSTANCIA : '',
      numeroDeLaConstancia: NUMERO_DE_LA_CONSTANCIA
        ? NUMERO_DE_LA_CONSTANCIA
        : '',
      estado: fila.estado || '',
      representacionFederal: fila.representacionFederal || '',
      fraccionArancelaria: fila.fraccionArancelaria || '',
      descripcionProducto: fila.descripcionProducto || '',
      tratado: fila.tratado || '',
      subproducto: fila.subproducto || '',
      mecanismo: fila.mecanismo || '',
      typoCategoria: fila.typoCategoria || '',
      typoRegimen: fila.typoRegimen || '',
      descripcionCategoriaTextil: fila.descripcionCategoriaTextil || '',
      PaisDestino: fila.PaisDestino || '',
      unidadMedidaCategoriaTextil: fila.unidadMedidaCategoriaTextil || '',
      factorConversionCategoriaTextil:
        fila.factorConversionCategoriaTextil || '',
      fechaInicioVigencia: fila.fechaInicioVigencia || '',
      fechaFinVigencia: fila.fechaFinVigencia || '',
    };
    this.fitosanitarioForm.patchValue(FORM_VALUES);
    Object.keys(FORM_VALUES).forEach((key) => {
      if (this.fitosanitarioForm.get(key)) {
        if (key !== 'anoDeLaConstancia' && key !== 'numeroDeLaConstancia') {
          this.fitosanitarioForm.get(key)?.disable();
        }
      }
    });
    this.ElegibilidadDeTextilesStore.update((state) => ({
      ...state,
      ...FORM_VALUES,
    }));
    this.guardarBandera = true;
    this.ElegibilidadDeTextilesStore.setguardarBandera(true);
  }

  /**
   * @method buscarEvaluar
   * @description Valida los campos 'anoDeLaConstancia' y 'numeroDeLaConstancia' del formulario fitosanitario.
   * Si alguno de los campos es inválido, marca los controles como tocados y detiene la ejecución.
   * Si ambos campos son válidos, recupera los datos asociados y actualiza el estado de la tienda
   * ElegibilidadDeTextilesStore con los valores actuales del formulario.
   * @returns {void}
   */
  buscarEvaluar(): void {
    const ANO_CONTROL = this.fitosanitarioForm.get('anoDeLaConstancia');
    const NUMEROCONTROL = this.fitosanitarioForm.get('numeroDeLaConstancia');
    ANO_CONTROL?.markAsTouched();
    NUMEROCONTROL?.markAsTouched();
    if (ANO_CONTROL?.invalid || NUMEROCONTROL?.invalid) {
      return;
    }
    this.recuperarDatosAsociadas();
    const ANO_DE_LA_CONSTANCIA =
      this.fitosanitarioForm.get('anoDeLaConstancia')?.value;
    const NUMERO_DE_LA_CONSTANCIA = this.fitosanitarioForm.get(
      'numeroDeLaConstancia'
    )?.value;
    const FORM_VALUES = {
      anoDeLaConstancia: ANO_DE_LA_CONSTANCIA ? ANO_DE_LA_CONSTANCIA : '',
      numeroDeLaConstancia: NUMERO_DE_LA_CONSTANCIA
        ? NUMERO_DE_LA_CONSTANCIA
        : '',
    };
    this.ElegibilidadDeTextilesStore.update((state) => ({
      ...state,
      ...FORM_VALUES,
    }));
  }

  /**
   * @method guardarEvaluate
   * @description Emite un evento para mostrar las pestañas (tabs) en la interfaz de usuario y realiza un scroll al inicio de la página.
   * @returns {void}
   * @event mostrarTabs
   * @compodoc-method
   */
  guardarEvaluate(): void {
    this.mostrarTabs.emit(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Recupera los datos asociados para la tabla de constancia del registro.
   *
   * Utiliza el servicio `ElegibilidadTextilesService` para obtener los datos desde un archivo JSON,
   * filtra los datos utilizando el método `filtrarDatos`, y actualiza tanto la propiedad local
   * `configuracionTablaDatos` como el estado en el store `ElegibilidadDeTextilesStore`.
   *
   * En caso de error durante la obtención de los datos, se muestra un mensaje en la consola.
   *
   * @returns {void} No retorna ningún valor.
   */
  recuperarDatosAsociadas(): void {
    this.ElegibilidadTextilesService.obtenerTablaDatos<ConstanciaTramiteConfiguracion>(
      'constancia-del-registro-tabla-asociados.json'
    )
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((response) =>
          this.filtrarDatos(response as ConstanciaTramiteConfiguracion[])
        )
      )
      .subscribe({
        next: (filteredData) => {
          this.configuracionTablaDatos = filteredData;
          this.ElegibilidadDeTextilesStore.setdatosTablaConstanciaDelRegistro(
            filteredData
          );
        },
      });
  }

  /**
   * @function filtrarDatos
   * @description Filtra los datos de la tabla según el año de la constancia y el número de la constancia.
   * Obtiene los valores directamente del formulario.
   * @param {ConstanciaTramiteConfiguracion[]} datos - Datos a filtrar.
   * @returns {ConstanciaTramiteConfiguracion[]} Datos filtrados.
   */
  filtrarDatos(
    datos: ConstanciaTramiteConfiguracion[]
  ): ConstanciaTramiteConfiguracion[] {
    const ANO_DE_LA_CONSTANCIA =
      this.fitosanitarioForm.get('anoDeLaConstancia')?.value || '';
    const NUMERO_CONSTANCIA =
      this.fitosanitarioForm.get('numeroDeLaConstancia')?.value || '';

    return datos.filter((ITEM) => {
      const ANO_ITEM = new Date(ITEM.fechaInicioVigencia).getFullYear();
      const FILTRO_ANO = ANO_DE_LA_CONSTANCIA
        ? ANO_ITEM === parseInt(ANO_DE_LA_CONSTANCIA, 10)
        : true;
      const FILTRO_NUMERO = NUMERO_CONSTANCIA
        ? ITEM.numeroDeConstancia.toString() === NUMERO_CONSTANCIA.toString()
        : true;

      return FILTRO_ANO && FILTRO_NUMERO;
    });
  }
}
