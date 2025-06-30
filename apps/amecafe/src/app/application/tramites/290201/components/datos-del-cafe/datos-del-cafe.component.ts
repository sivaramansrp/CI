/**
 * Componente `DatosDelCafeComponent`
 * Este componente es responsable de gestionar los datos relacionados con el café en un formulario interactivo.
 * Permite al usuario agregar, editar, eliminar y visualizar datos en una tabla.
 */
import { CommonModule } from '@angular/common';

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject,map, takeUntil } from 'rxjs';

import { AcuseComponent, ConsultaioQuery, ConsultaioState, InputFecha, InputFechaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Catalogo, CatalogosSelect, ConfiguracionColumna, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@libs/shared/data-access-user/src';

import { DatosDeLaSolicitudComponent } from '../datos-de-la-solicitud/datos-de-la-solicitud.component';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';

import { Solicitud290201State, Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { FilaData } from '../../models/fila-model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
@Component({
  selector: 'app-datos-del-cafe',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, TableComponent, AcuseComponent, DatosDeLaSolicitudComponent,TablaDinamicaComponent,InputFechaComponent],
  templateUrl: './datos-del-cafe.component.html',
  styleUrl: './datos-del-cafe.component.css',
})
export class DatosDelCafeComponent implements OnDestroy, OnInit {
  /**
   * Observable para gestionar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Datos que se muestran en la tabla.
   */
  tableData: FilaData[] = [];

  /**
   * Formulario reactivo para gestionar los datos del café.
   */
  dataCafeForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public dataCafeState!: Solicitud290201State;

  /**
   * Datos del catálogo para el campo "Envasado".
   */
  public envasadoenData: CatalogosSelect = {
    labelNombre: 'Envasado',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "¿Utilizó café como materia prima importada?".
   */
  public utilizoCafeComoData: CatalogosSelect = {
    labelNombre: 'Utilizó cafe como materia prima importada para elaborar este producto?',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "País de importación".
   */
  public paisdeimportacionData: CatalogosSelect = {
    labelNombre: 'País de importación',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "Fracción arancelaria".
   */
  public fraccionarancelariaData: CatalogosSelect = {
    labelNombre: 'Fracción arancelaria',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "Unidad de medida".
   */
  public unidaddemedidaData: CatalogosSelect = {
    labelNombre: 'Unidad de medida',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "Dólar".
   */
  public dolarData: CatalogosSelect = {
    labelNombre: ' ',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "¿El café tiene características especiales?".
   */
  public elcafeData: CatalogosSelect = {
    labelNombre: 'El café tiene características especiales?',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "País de transbordo".
   */
  public paisdetransbordoData: CatalogosSelect = {
    labelNombre: 'País de transbordo',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "Medio de transporte".
   */
  public mediodetransporteData: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Indica si el formulario es visible o no.
   */
  esFormularioVisible: boolean = false;

  /**
   * Contiene los índices de las filas seleccionadas en la tabla.
   */
  selectedRows: Set<number> = new Set();

 /**
 * @property {ConsultaioState} consultaDatos
 * @description Representa el estado de la consulta actual.
 */

consultaDatos!: ConsultaioState;
    /**
     * @property {boolean} soloLectura
     * @description Indica si el formulario o los campos están en modo de solo lectura.
     * @default false
     */
    esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param registrarsolicitud Servicio para obtener datos de los catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param solicitud290201Store Almacén para gestionar el estado de la solicitud.
   * @param solicitud290201Query Consulta para obtener el estado de la solicitud.
   */
  constructor(
    private registrarsolicitud: RegistrarSolicitudService,
    private fb: FormBuilder,
    private solicitud290201Store: Solicitud290201Store,
    private solicitud290201Query: Solicitud290201Query,
    private cdr: ChangeDetectorRef,
    private consultaioQuery: ConsultaioQuery,
    
  ) {
    this.getEnvasadoenData();
    this.getUtilicoCafeComoData();
    this.getPaisDeImportacionData();
    this.getFraccionArancelariaData();
    this.getUnidadDeMedidaData();
    this.getDollarData();
    this.getElcafeData();
    this.getPaisDeTransbordoData();
    this.getMediaDeTransporte();
  }
  /**
   * Tipo de selección para la tabla de mercancías.
   * Utiliza `TablaSeleccion.CHECKBOX` para permitir la selección múltiple.
   */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla `configuracionColumnasoli`.
 */

  configuracionColumnasoli: ConfiguracionColumna<FilaData>[] = [
    {
      encabezado: 'Envasado',
      clave: (fila) => fila.datosDelTramiteRealizar.envasadoen,
      orden: 1,
    },
    {
      encabezado: 'Utilizó café como materia prima?',
      clave: (fila) => fila.datosDelTramiteRealizar.utilizoCafeComo,
      orden: 2,
    },
    {
      encabezado: 'Cantidad utilizada',
      clave: (fila) => fila.datosDelTramiteRealizar.cantidadutilizada,
      orden: 3,
    },
    {
      encabezado: 'No.pedimento',
      clave: (fila) => fila.datosDelTramiteRealizar.numerodepedimento,
      orden: 4,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila.datosDelTramiteRealizar.paisdeimportacion,
      orden: 5,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (fila) => fila.datosDelTramiteRealizar.fraccionarancelaria,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (fila) => fila.datosDelTramiteRealizar.cantidad,
      orden: 7,
    },
    {
      encabezado: 'Precio aplicable',
      clave: (fila) => fila.datosDelTramiteRealizar.unidaddemedida,
      orden: 8,
    },
    {
      encabezado: 'Moneda',
      clave: (fila) => fila.datosDelTramiteRealizar.precioapplicable,
      orden: 9,
    },
    {
      encabezado: 'Lote',
      clave: (fila) => fila.datosDelTramiteRealizar.dolar,
      orden: 10,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila.datosDelTramiteRealizar.lote,
      orden: 11,
    },
    {
      encabezado: 'Otras marcas',
      clave: (fila) => fila.datosDelTramiteRealizar.otrasmarcas,
      orden: 12,
    },
{
      encabezado: 'El café  tiene características especiales?',
      clave: (fila) => fila.datosDelTramiteRealizar.elcafe,
      orden: 13,
    },
    {
      encabezado: 'Fecha de exportación',
      clave: (fila) => fila.datosDelTramiteRealizar.fechaexportacion,
      orden: 14,
    },
    {
      encabezado: 'País de transbordo',
      clave: (fila) => fila.datosDelTramiteRealizar.paisdetransbordo,
      orden: 15,
    },
    {
      encabezado: 'Medio de transporte',
      clave: (fila) => fila.datosDelTramiteRealizar.mediodetransporte,
      orden: 16,
    },
    {
      encabezado: 'Identificador transporte',
      clave: (fila) => fila.datosDelTramiteRealizar.Identificadordel,
      orden: 17,
    },
    {
      encabezado: 'Observaciones',
      clave: (fila) => fila.datosDelTramiteRealizar.observaciones,
      orden: 18,
    },
  ];
  /**
   * Configuración de las columnas de la tabla `configuracionColumnasoli`.
   */
  fechaexportacion: InputFecha = {
    labelNombre: 'Fecha de pago*:',
    required: false,
    habilitado: true,
  };

  /**
   * Método para cambiar la fecha final del formulario.
   * @param nuevo_valor Nuevo valor de la fecha de exportación.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosDelTramiteRealizar.patchValue({
      fechaexportacion: nuevo_valor,
    });
    this.solicitud290201Store.setFechaexportacion(nuevo_valor);
  }
  /**
   * Crea el formulario reactivo con los campos necesarios y sus validaciones.
   */
  createForm(): void {
    this.dataCafeForm = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        envasadoen: [this.dataCafeState?.envasadoen, Validators.required],
        utilizoCafeComo: [this.dataCafeState?.utilizoCafeComo, Validators.required],
        cantidadutilizada: [this.dataCafeState?.cantidadutilizada, Validators.required],
        numerodepedimento: [this.dataCafeState?.numerodepedimento, Validators.required],
        paisdeimportacion: [this.dataCafeState?.paisdeimportacion, Validators.required],
        fraccionarancelaria: [this.dataCafeState?.fraccionarancelaria, Validators.required],
        cantidad: [this.dataCafeState?.cantidad, Validators.required],
        unidaddemedida: [this.dataCafeState?.unidaddemedida, Validators.required],
        precioapplicable: [this.dataCafeState?.precioapplicable, Validators.required],
        dolar: [this.dataCafeState?.dolar, Validators.required],
        lote: [this.dataCafeState?.lote, Validators.required],
        otrasmarcas: [this.dataCafeState?.otrasmarcas, Validators.required],
        elcafe: [this.dataCafeState?.elcafe, Validators.required],
        fechaexportacion: [this.dataCafeState?.fechaexportacion, Validators.required],
        paisdetransbordo: [this.dataCafeState?.paisdetransbordo, Validators.required],
        mediodetransporte: [this.dataCafeState?.mediodetransporte, Validators.required],
        Identificadordel: [this.dataCafeState?.Identificadordel, Validators.required],
        observaciones: [this.dataCafeState?.observaciones, Validators.required],
      }),
    });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.solicitud290201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.dataCafeState = seccionState;
        }),
      )
      .subscribe();
      
    this.createForm();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
      this.inicializarEstadoFormulario();
  }
 
  /**
   * Obtiene los datos del catálogo "Envasado".
   */
  getEnvasadoenData():void {
    this.registrarsolicitud.getEnvasadoenData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.envasadoenData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "¿Utilizó café como materia prima importada?".
   */
  getUtilicoCafeComoData(): void {
    this.registrarsolicitud.getUtilicoCafeComoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.utilizoCafeComoData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "País de importación".
   */

  getPaisDeImportacionData(): void {
    this.registrarsolicitud.getPaisDeImportacionData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisdeimportacionData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "Fracción arancelaria".
   */
  getFraccionArancelariaData(): void {
    this.registrarsolicitud.getFraccionArancelariaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.fraccionarancelariaData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "Unidad de medida".
   */
  getUnidadDeMedidaData(): void {
    this.registrarsolicitud.getUnidadDeMedidaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.unidaddemedidaData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "Dólar".
   */
  getDollarData(): void {
    this.registrarsolicitud.getDollarData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.dolarData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "¿El café tiene características especiales?".
   */
  getElcafeData(): void {
    this.registrarsolicitud.getUtilicoCafeComoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.elcafeData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "País de transbordo".
   */
  getPaisDeTransbordoData(): void {
    this.registrarsolicitud.getPaisDeImportacionData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisdetransbordoData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo "Medio de transporte".
   */
  getMediaDeTransporte(): void {
    this.registrarsolicitud.getMediaDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.mediodetransporteData.catalogos = data as Catalogo[];
      });
  }
/**
 * Este método se ejecuta al enviar el formulario. Su propósito es procesar los datos ingresados
 * en el formulario, transformarlos según los catálogos correspondientes y agregarlos a la tabla de datos.
 */
  onSubmit(): void {
    this.esFormularioVisible = false;

    const FORM_DATA = { ...this.dataCafeForm.value };

    FORM_DATA.datosDelTramiteRealizar.envasadoen = this.envasadoenData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.envasadoen),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.utilizoCafeComo = this.utilizoCafeComoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.utilizoCafeComo),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.paisdeimportacion = this.paisdeimportacionData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.paisdeimportacion),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.fraccionarancelaria = this.fraccionarancelariaData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.fraccionarancelaria),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.unidaddemedida = this.unidaddemedidaData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.unidaddemedida),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.dolar = this.dolarData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.dolar),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.elcafe = this.elcafeData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.elcafe),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.paisdetransbordo = this.paisdetransbordoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.paisdetransbordo),
    )?.descripcion;

    FORM_DATA.datosDelTramiteRealizar.mediodetransporte = this.mediodetransporteData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.mediodetransporte),
    )?.descripcion;

    this.tableData.push(FORM_DATA);
    
  }

/**
 * Este método se utiliza para mostrar el formulario al usuario.
 */
  onAgregar(): void {
    this.esFormularioVisible = true;
  }
  /**
   * Este método se ejecuta cuando el usuario selecciona una fila de la tabla. Su propósito es
 */
  onRowClick(rowData: FilaData): void {
    this.dataCafeForm.patchValue({
      envasadoen: this.envasadoenData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.envasadoen,
      )?.id || '',
      utilizoCafeComo: this.utilizoCafeComoData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.utilizoCafeComo,
      )?.id || '',
      paisdeimportacion: this.paisdeimportacionData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.paisdeimportacion,
      )?.id || '',
      fraccionarancelaria: this.fraccionarancelariaData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.fraccionarancelaria,
      )?.id || '',
      unidaddemedida: this.unidaddemedidaData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.unidaddemedida,
      )?.id || '',
      dolar: this.dolarData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.dolar,
      )?.id || '',
      elcafe: this.elcafeData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.elcafe,
      )?.id || '',
      paisdetransbordo: this.paisdetransbordoData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.paisdetransbordo,
      )?.id || '',
      mediodetransporte: this.mediodetransporteData.catalogos.find(
        (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.mediodetransporte,
      )?.id || '',
    });

    this.esFormularioVisible = true;
  }
 /**
  * Este método se utiliza para eliminar las filas seleccionadas de la tabla.
  *  */ 
  onDeleteSelectedRows(): void {
    if (this.selectedRows && this.selectedRows.size > 0) {
      this.tableData = this.tableData.filter(row => !this.selectedRows.has(row.id));
      this.selectedRows.clear();
      this.dataCafeForm.reset();
      this.esFormularioVisible = false;
    }
    
  }
  /**
   * 
   * @param selectedRows Este método se utiliza para actualizar las filas seleccionadas en la tabla.
   */
  onSelectedRowsChange(selectedRows: FilaData[]): void {
    this.selectedRows = new Set(selectedRows.map(row => row.id)); // Update selected rows
    this.esFormularioVisible = false;
  }
  get datosDelTramiteRealizar(): FormGroup {
    return this.dataCafeForm.get('datosDelTramiteRealizar') as FormGroup;
  }

  /**
   * Este método se utiliza para inicializar el estado del formulario según si es de solo lectura o no.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.dataCafeForm?.disable();
    }
    else {
      this.dataCafeForm?.enable();
    }
}
  /**
   * Este método se utiliza para actualizar un valor específico en el store de la solicitud.
   * @param form 
   * @param campo 
   * @param metodoNombre 
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud290201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud290201Store[metodoNombre] as (value: string | number | boolean | null) => void)(VALOR);
  }
/**
 * Este método forma parte del ciclo de vida de los componentes en Angular y se ejecuta
 * cuando el componente está a punto de ser destruido.
 */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}



