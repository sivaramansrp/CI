/**
 * Componente `DatosDelCafeComponent`
 * Este componente es responsable de gestionar los datos relacionados con el café en un formulario interactivo.
 * Permite al usuario agregar, editar, eliminar y visualizar datos en una tabla.
 */
import { CommonModule } from '@angular/common';

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject,debounceTime,map, takeUntil } from 'rxjs';

import { AcuseComponent, ConsultaioQuery, ConsultaioState, InputFecha, InputFechaComponent, REGEX_7_ENTEROS_3_DECIMALES, REGEX_SOLO_DIGITOS, REGEX_SOLO_NUMEROS, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Catalogo, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@libs/shared/data-access-user/src';

import { DatosDeLaSolicitudComponent } from '../datos-de-la-solicitud/datos-de-la-solicitud.component';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';

import { Solicitud290201State, Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { FilaData } from '../../models/fila-model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';

import { Modal } from 'bootstrap';

import { CATALOGOS, CONFIGURACION_COLUMNAS_SOLI } from '../../constants/tabla-enum';
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
   * Modal para la confirmación de eliminación.
   */
  public envasadoenData = { ...CATALOGOS.ENVASADO };

/**
 * Datos del catálogo para el campo "¿Utilizó café como materia prima importada?".
 */
public utilizoCafeComoData = { ...CATALOGOS.UTILIZO_CAFE_COMO };

/**
 * Datos del catálogo para el campo "País de importación".
 */
public paisdeimportacionData = { ...CATALOGOS.PAIS_DE_IMPORTACION };

/**
 * Datos del catálogo para el campo "Fracción arancelaria".
 */
public fraccionarancelariaData = { ...CATALOGOS.FRACCION_ARANCELARIA };

/**
 * Datos del catálogo para el campo "Unidad de medida".
 */
public unidaddemedidaData = { ...CATALOGOS.UNIDAD_DE_MEDIDA };

/**
 * Datos del catálogo para el campo "Dólar".
 */
public dolarData = { ...CATALOGOS.DOLAR };

/**
 * Datos del catálogo para el campo "¿El café tiene características especiales?".
 */
public elcafeData = { ...CATALOGOS.EL_CAFE };

/**
 * Datos del catálogo para el campo "País de transbordo".
 */
public paisdetransbordoData = { ...CATALOGOS.PAIS_DE_TRANSBORDO };

/**
 * Datos del catálogo para el campo "Medio de transporte".
 */
public mediodetransporteData = { ...CATALOGOS.MEDIO_DE_TRANSPORTE };

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
 * @property {boolean} esFormularioSoloLectura
 * @description Indica si el formulario está en modo de solo lectura.
 * @default false
 */
esFormularioSoloLectura: boolean = false;

/**
 * @property {boolean} isUtilizoCafeComoSi
 * @description Indica si se seleccionó "Sí" en el campo "¿Utilizó café como materia prima importada?".
 * @default false
 */
isUtilizoCafeComoSi: boolean = false;

/**
 * @property {boolean} isElCafeSi
 * @description Indica si se seleccionó "Sí" en el campo "¿El café tiene características especiales?".
 * @default false
 */
isElCafeSi: boolean = false;
    

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

  configuracionColumnasoli = CONFIGURACION_COLUMNAS_SOLI;

  /**
   * Configuración de las columnas de la tabla `configuracionColumnasoli`.
   */
  fechaexportacion: InputFecha = {
    labelNombre: 'Fecha exportación*:',
    required: false,
    habilitado: true,
  };
  /**
 * @property {boolean} isEditMode
 * @description Indica si el formulario está en modo de edición.
 * Cuando es `true`, el formulario permite editar una fila existente en la tabla.
 * @default false
 */
isEditMode: boolean = false;

/**
 * @property {number | null} editingRowId
 * @description Almacena el ID de la fila que se está editando actualmente.
 * Si es `null`, no hay ninguna fila en modo de edición.
 * @default null
 */
editingRowId: number | null = null;



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
        cantidadutilizada: [{ value: this.dataCafeState?.cantidadutilizada, disabled: true }, [Validators.required,Validators.pattern(REGEX_SOLO_DIGITOS)]],
        numerodepedimento: [{ value: this.dataCafeState?.numerodepedimento, disabled: true }, Validators.required],
        paisdeimportacion: [{ value: this.dataCafeState?.paisdeimportacion, disabled: true }, Validators.required],
        fraccionarancelaria: [{ value: this.dataCafeState?.fraccionarancelaria, disabled: true }, Validators.required],
        cantidad: [this.dataCafeState?.cantidad, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
        unidaddemedida: [this.dataCafeState?.unidaddemedida, Validators.required],
        precioapplicable: [this.dataCafeState?.precioapplicable, Validators.pattern(REGEX_7_ENTEROS_3_DECIMALES)],
        dolar: [this.dataCafeState?.dolar, Validators.required],
        lote: [this.dataCafeState?.lote,[
          Validators.required,
          Validators.pattern(REGEX_SOLO_NUMEROS) 
        ]],
        otrasmarcas: [this.dataCafeState?.otrasmarcas, [Validators.required,Validators.pattern(/^\d+$/)]],
        otros: [false],
        otrasCaracteristicas:['',Validators.required],
        elcafe: [this.dataCafeState?.elcafe, Validators.required],
        fechaexportacion: [this.dataCafeState?.fechaexportacion || '', Validators.required],
        paisdetransbordo: [this.dataCafeState?.paisdetransbordo, Validators.required],
        mediodetransporte: [this.dataCafeState?.mediodetransporte, Validators.required],
        Identificadordel: [this.dataCafeState?.Identificadordel,[
          Validators.required,
          Validators.maxLength(5) 
        ]],
        observaciones: [this.dataCafeState?.observaciones, [Validators.required, Validators.maxLength(250)]],
        calidadEspecial: [''],
        cafePractices: [''],
        avesMigratorias: [''],
        codigoComunidad: [''],
        comercioJusto: [''],
        euregap: [''],
        rainforestAlliance: [''],
        sistemaQ: [''],
        tasqNespresso: [''],
        utzCertified: [''],
      },
      { validators: DatosDelCafeComponent.cantidadUtilizadaValidator } 
  ),
      
    });
    this.dataCafeForm.get('datosDelTramiteRealizar.elcafe')?.valueChanges.subscribe((value) => {
      if (value === 1) { 
        this.dataCafeForm.get('datosDelTramiteRealizar.calidadEspecial')?.setValidators(Validators.required);
        this.dataCafeForm.get('datosDelTramiteRealizar.cafePractices')?.setValidators(Validators.required);
      } else {
        this.dataCafeForm.get('datosDelTramiteRealizar.calidadEspecial')?.clearValidators();
        this.dataCafeForm.get('datosDelTramiteRealizar.cafePractices')?.clearValidators();
      }
    
      this.dataCafeForm.get('datosDelTramiteRealizar.calidadEspecial')?.updateValueAndValidity();
      this.dataCafeForm.get('datosDelTramiteRealizar.cafePractices')?.updateValueAndValidity();
    });
    this.dataCafeForm.get('datosDelTramiteRealizar.utilizoCafeComo')?.valueChanges.subscribe((value) => {
      if (typeof value === 'number') {
        this.isUtilizoCafeComoSi = value === 1; 
      } else if (typeof value === 'string') {
        this.isUtilizoCafeComoSi = value === '1'; 
      } else if (typeof value === 'object' && value?.id) {
        this.isUtilizoCafeComoSi = value.id === 1; 
      } else {
        this.isUtilizoCafeComoSi = false; 
      }
    });
    this.dataCafeForm.get('datosDelTramiteRealizar.elcafe')?.valueChanges.subscribe((value) => {
      if (typeof value === 'number') {
        this.isElCafeSi = value === 1; 
      } else if (typeof value === 'string') {
        this.isElCafeSi = value === '1'; 
      } else if (typeof value === 'object' && value?.id) {
        this.isElCafeSi = value.id === 1; 
      } else {
        this.isElCafeSi = false; 
      }
    });
   
    this.dataCafeForm.get('datosDelTramiteRealizar.cantidadutilizada')?.valueChanges
    .pipe(debounceTime(300), takeUntil(this.destroyed$))
    .subscribe(() => {
      this.dataCafeForm.get('datosDelTramiteRealizar')?.updateValueAndValidity();
    });
  
  this.dataCafeForm.get('datosDelTramiteRealizar.cantidad')?.valueChanges
    .pipe(debounceTime(300), takeUntil(this.destroyed$))
    .subscribe(() => {
      this.dataCafeForm.get('datosDelTramiteRealizar')?.updateValueAndValidity();
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
enEnviar(): void {

  const OTRAS_CARACTERISTICAS_CONTROL = this.dataCafeForm.get('datosDelTramiteRealizar.otrasCaracteristicas');
  if (OTRAS_CARACTERISTICAS_CONTROL?.invalid || !OTRAS_CARACTERISTICAS_CONTROL?.value) {
    OTRAS_CARACTERISTICAS_CONTROL?.markAsTouched(); 
    const MODAL_ELEMENT = document.getElementById('datosCafeModal');
    if (MODAL_ELEMENT) {
      const MODAL_INSTANCE = Modal.getInstance(MODAL_ELEMENT) || new Modal(MODAL_ELEMENT);
      MODAL_INSTANCE.show();
    }
    return; 
  }

  if (this.dataCafeForm.invalid) {
    this.dataCafeForm.markAllAsTouched();
    return;
  }

  const FORM_DATA = { id: this.editingRowId || this.tableData.length + 1, ...this.dataCafeForm.value };

  FORM_DATA.datosDelTramiteRealizar.envasadoen = this.envasadoenData.catalogos.find(
    (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.envasadoen),
  )?.descripcion;

  FORM_DATA.datosDelTramiteRealizar.utilizoCafeComo = this.utilizoCafeComoData.catalogos.find(
    (item: Catalogo) => String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.utilizoCafeComo),
  )?.descripcion;


  if (!this.isEditMode) {
    FORM_DATA.id = this.tableData.length > 0 ? Math.max(...this.tableData.map(row => row.id)) + 1 : 1;
  }

  if (this.isEditMode && this.editingRowId !== null) {
    const INDEX = this.tableData.findIndex((row) => row.id === this.editingRowId);

    if (INDEX !== -1) {
      this.tableData[INDEX] = FORM_DATA;
    }
  } else {
    this.tableData = [...this.tableData, FORM_DATA];   
  }


  this.isEditMode = false;
  this.editingRowId = null;
  this.dataCafeForm.reset(
    {
      datosDelTramiteRealizar: {
        envasadoen: '',
        utilizoCafeComo: '',
      }
    },
    { emitEvent: false }
  );

  this.esFormularioVisible = false;
  const MODAL_ELEMENT = document.getElementById('datosCafeModal');

  if (MODAL_ELEMENT) {
    const MODAL_INSTANCE = Modal.getInstance(MODAL_ELEMENT) || new Modal(MODAL_ELEMENT);
    if (MODAL_INSTANCE) {
      MODAL_INSTANCE.hide(); 
      
    }

    const BACKDROP_ELEMENTS = document.querySelectorAll('.modal-backdrop');
    BACKDROP_ELEMENTS.forEach((backdrop) => backdrop.remove());
  }
  
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
  onRowClick( rowData: FilaData): void {
    this.isEditMode = true; 
    this.editingRowId = rowData.id;
   
    if (!rowData.datosDelTramiteRealizar) {
      console.error('Row data is missing datosDelTramiteRealizar:', rowData);
      return;
    }
    const TARGET = event?.target as HTMLElement;
    if (TARGET.tagName === 'INPUT' && TARGET.getAttribute('type') === 'checkbox') {
      return; 
    }
  
    if (this.selectedRows.has(rowData.id)) {
      return;
    }
 
    this.dataCafeForm.patchValue({
      datosDelTramiteRealizar: {
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
    }
    });
    this.esFormularioVisible = true;

    const MODAL_ELEMENT = document.getElementById('datosCafeModal');
    if (MODAL_ELEMENT) {
      const MODAL_INSTANCE = new Modal(MODAL_ELEMENT); 
      MODAL_INSTANCE.show();
    }
  }
 /**
  * Este método se utiliza para eliminar las filas seleccionadas de la tabla.
  *  */ 
 onDeleteSelectedRows(): void {
  if (this.selectedRows.size > 0) {
    this.tableData = this.tableData.filter(
      (row: { id: number }) => !this.selectedRows.has(row.id)
    );
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
    
    this.selectedRows = new Set(selectedRows.map((row) => row.id)); 
    this.esFormularioVisible = false; 
    
    const MODAL_ELEMENT = document.getElementById('datosCafeModal');
    if (MODAL_ELEMENT) {
        const MODAL_INSTANCE = Modal.getInstance(MODAL_ELEMENT);
        if (MODAL_INSTANCE) {
            MODAL_INSTANCE.hide();
        }
    }
  }

  
/**
 * Getter para verificar si el campo 'Identificadordel' es inválido y ha sido tocado.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'Identificadordel' es inválido y ha sido tocado, de lo contrario, devuelve `false`.
 */
get isIdentificadorDelInvalid(): boolean {
  return (
    (this.dataCafeForm.get('datosDelTramiteRealizar.Identificadordel')?.invalid ?? false) &&
    (this.dataCafeForm.get('datosDelTramiteRealizar.Identificadordel')?.touched ?? false)
  );
}


/**
 * Getter para verificar si el campo 'precioapplicable' es inválido y ha sido tocado.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'precioapplicable' es inválido y ha sido tocado, de lo contrario, devuelve `false`.
 */
get esPrecioAplicableInvalido(): boolean {
  return (
    (this.dataCafeForm.get('datosDelTramiteRealizar.precioapplicable')?.invalid ?? false) &&
    (this.dataCafeForm.get('datosDelTramiteRealizar.precioapplicable')?.touched ?? false)
  );
}
/**
 * Getter para verificar si el campo 'cantidad' es inválido y ha sido tocado.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'cantidad' es inválido y ha sido tocado, de lo contrario, devuelve `false`.
 */
get isCantidadInvalid(): boolean {
  return (
    (this.dataCafeForm.get('datosDelTramiteRealizar.cantidad')?.invalid ?? false) &&
    (this.dataCafeForm.get('datosDelTramiteRealizar.cantidad')?.touched ?? false)
  );
}
/** Getter para verificar si el campo 'cantidadutilizada' es inválido y ha sido tocado.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'cantidadutilizada' es inválido y ha sido tocado, de lo contrario, devuelve `false`.
 */
get isCantidadUtilizadaInvalid(): boolean {
  return (
    (this.dataCafeForm.get('datosDelTramiteRealizar.cantidadutilizada')?.invalid ?? false) &&
    (this.dataCafeForm.get('datosDelTramiteRealizar.cantidadutilizada')?.touched ?? false)
  );
}

/**
 * Getter to check if the 'otrasCaracteristicas' field is required and has been touched.
 * 
 * @returns {boolean} Returns `true` if the 'otrasCaracteristicas' field is required and touched, otherwise `false`.
 */
get isOtrasCaracteristicasRequired(): boolean {
  return (
    (this.dataCafeForm.get('datosDelTramiteRealizar.otrasCaracteristicas')?.touched ?? false)&&
    (this.dataCafeForm.get('datosDelTramiteRealizar.otrasCaracteristicas')?.hasError('required') ?? false)
  );
 
}
/**
 * Getter para verificar si el campo 'lote' es inválido y ha sido tocado.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'lote' es inválido y ha sido tocado, de lo contrario, devuelve `false`.
 */
get isLoteInvalid(): boolean {
  return (
    (this.dataCafeForm.get('datosDelTramiteRealizar.lote')?.invalid ?? false) &&
    (this.dataCafeForm.get('datosDelTramiteRealizar.lote')?.touched ?? false)
  );
}
/**
 * Getter to check if the 'cantidad' field has a 'pattern' error.
 * 
 * @returns {boolean} Returns `true` if the 'cantidad' field has a 'pattern' error, otherwise `false`.
 */
get isCantidadPatternInvalid(): boolean {
  return this.dataCafeForm.get('datosDelTramiteRealizar.cantidad')?.errors?.['pattern'] ?? false;
}
/** Getter to check if the 'cantidadutilizada' field has a 'pattern' error.
 * 
 * @returns {boolean} Returns `true` if the 'cantidadutilizada' field has a 'pattern' error, otherwise `false`.
 */
get isCantidadUtilizadaPatternInvalid(): boolean {
  return this.dataCafeForm.get('datosDelTramiteRealizar.cantidadutilizada')?.errors?.['pattern'] ?? false;
}
/**
 * Getter para verificar si el campo 'precioapplicable' tiene un error de patrón.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'precioapplicable' tiene un error de patrón, de lo contrario, devuelve `false`.
 */
get isPrecioApplicablePatternInvalid(): boolean {
  return this.dataCafeForm.get('datosDelTramiteRealizar.precioapplicable')?.errors?.['pattern'] ?? false;
}

/**
 * Getter para verificar si el campo 'lote' tiene un error de patrón.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'lote' tiene un error de patrón, de lo contrario, devuelve `false`.
 */
get isLotePatternInvalid(): boolean {
  return this.dataCafeForm.get('datosDelTramiteRealizar.lote')?.errors?.['pattern'] ?? false;
}

/**
 * Getter para verificar si el campo 'Identificadordel' tiene un error de longitud máxima.
 * 
 * @returns {boolean} Devuelve `true` si el campo 'Identificadordel' tiene un error de longitud máxima, de lo contrario, devuelve `false`.
 */
get isIdentificadorDelPatternInvalid(): boolean {
  return this.dataCafeForm.get('datosDelTramiteRealizar.Identificadordel')?.errors?.['maxlength'] ?? false;
}
/**
 * Getter to check if the 'observaciones' field has a 'maxlength' error.
 * 
 * @returns {boolean} Returns `true` if the 'observaciones' field has a 'maxlength' error, otherwise `false`.
 */
get isObservacionesMaxLengthExceeded(): boolean {
  return this.dataCafeForm.get('datosDelTramiteRealizar.observaciones')?.hasError('maxlength') ?? false;
}

  /**
 * Getter para acceder al grupo de formularios 'datosDelTramiteRealizar'.
 * 
 * @returns {FormGroup} El grupo de formularios 'datosDelTramiteRealizar' dentro del formulario principal.
 */
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
 * Validador estático para verificar que la cantidad utilizada no exceda la cantidad disponible.
 * 
 * @param {AbstractControl} group - Grupo de controles del formulario que contiene los campos `cantidadutilizada` y `cantidad`.
 * @returns { { [key: string]: boolean } | null } - Devuelve un objeto con la clave `cantidadUtilizadaExceeds` si la cantidad utilizada excede la cantidad disponible, o `null` si es válido.
 */
static cantidadUtilizadaValidator(group: AbstractControl): { [key: string]: unknown } | null {
  const CANTIDAD_UTILIZADA = group.get('cantidadutilizada')?.value;
  const CANTIDAD = group.get('cantidad')?.value;


  if (
    CANTIDAD_UTILIZADA !== null &&
    CANTIDAD !== null &&
    !isNaN(CANTIDAD_UTILIZADA) &&
    !isNaN(CANTIDAD) &&
    CANTIDAD_UTILIZADA > CANTIDAD
  ) {
    return { cantidadUtilizadaExceeds: true };
  }
  return null;
}
/**
 * Getter para verificar si la cantidad utilizada excede la cantidad disponible.
 * 
 * @returns {boolean} Devuelve `true` si el validador `cantidadUtilizadaExceeds` está presente en el grupo de formularios
 * `datosDelTramiteRealizar` y el campo `cantidadutilizada` ha sido tocado. De lo contrario, devuelve `false`.
 */
get esCantidadUtilizadaExcede(): boolean {
  return (
    this.dataCafeForm.get('datosDelTramiteRealizar')?.errors?.['cantidadUtilizadaExceeds'] &&
    this.dataCafeForm.get('datosDelTramiteRealizar.cantidadutilizada')?.touched
  );
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



