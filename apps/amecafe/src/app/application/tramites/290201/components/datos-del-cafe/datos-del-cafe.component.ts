/**
 * Componente `DatosDelCafeComponent`
 * Este componente es responsable de gestionar los datos relacionados con el café en un formulario interactivo.
 * Permite al usuario agregar, editar, eliminar y visualizar datos en una tabla.
 */
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

import { AcuseComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
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
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, TableComponent, AcuseComponent, DatosDeLaSolicitudComponent,TablaDinamicaComponent],
  templateUrl: './datos-del-cafe.component.html',
  styleUrl: './datos-del-cafe.component.scss',
})
export class DatosDelCafeComponent implements OnDestroy, OnInit {
  /**
   * Observable para gestionar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Notificador para cancelar suscripciones activas al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

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
    labelNombre: 'Utilizo cafe como materia prima importada para elaborar este producto?',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "País de importación".
   */
  public paisdeimportacionData: CatalogosSelect = {
    labelNombre: 'Pais de importacion',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "Fracción arancelaria".
   */
  public fraccionarancelariaData: CatalogosSelect = {
    labelNombre: 'Fraccion arancelaria',
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
    labelNombre: 'EI cafe tiene caracteristicas especiales?',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Datos del catálogo para el campo "País de transbordo".
   */
  public paisdetransbordoData: CatalogosSelect = {
    labelNombre: 'Pais de transbordo',
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
   * Contiene los datos de la fila seleccionada en la tabla.
   */
  selectedRow: any = null;

  /**
   * Contiene los índices de las filas seleccionadas en la tabla.
   */
  selectedRows: Set<number> = new Set();

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
    private cdr: ChangeDetectorRef
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
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;
  
 
// cuerpoTabla: InstrumentoCupoTPLForm[] = [];
//     { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },

  configuracionColumnasoli: ConfiguracionColumna<FilaData>[] = [
    {
      encabezado: 'Envasado',
      clave: (fila) => fila.datosDelTramiteRealizar.envasadoen,
      orden: 1,
    },
    {
      encabezado: 'Utilizo cafe como materia prima?',
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
      encabezado: 'Pais',
      clave: (fila) => fila.datosDelTramiteRealizar.paisdeimportacion,
      orden: 5,
    },
    {
      encabezado: 'Fraccion arancelaria',
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
      encabezado: 'Pais',
      clave: (fila) => fila.datosDelTramiteRealizar.lote,
      orden: 11,
    },
    {
      encabezado: 'Otras marcas',
      clave: (fila) => fila.datosDelTramiteRealizar.otrasmarcas,
      orden: 12,
    },
{
      encabezado: 'EI cafe tiene caracteristicas especiales?',
      clave: (fila) => fila.datosDelTramiteRealizar.elcafe,
      orden: 13,
    },
    {
      encabezado: 'Fecha de exportacion',
      clave: (fila) => fila.datosDelTramiteRealizar.fechaexportacion,
      orden: 14,
    },
    {
      encabezado: 'Pais de transbordo',
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
   * Crea el formulario reactivo con los campos necesarios y sus validaciones.
   */
  createForm() {
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
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          console.log('seccionState:', seccionState);
          this.dataCafeState = seccionState;
        }),
      )
      .subscribe();

    this.createForm();
  }

  /**
   * Obtiene los datos del catálogo "Envasado".
   */
  getEnvasadoenData() {
    this.registrarsolicitud.getEnvasadoenData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.envasadoenData.catalogos = data as Catalogo[];
      });
  }

  getUtilicoCafeComoData() {
    this.registrarsolicitud.getUtilicoCafeComoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.utilizoCafeComoData.catalogos = data as Catalogo[];
      });
  }

  getPaisDeImportacionData() {
    this.registrarsolicitud.getPaisDeImportacionData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisdeimportacionData.catalogos = data as Catalogo[];
      });
  }

  getFraccionArancelariaData() {
    this.registrarsolicitud.getFraccionArancelariaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.fraccionarancelariaData.catalogos = data as Catalogo[];
      });
  }

  getUnidadDeMedidaData() {
    this.registrarsolicitud.getUnidadDeMedidaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.unidaddemedidaData.catalogos = data as Catalogo[];
      });
  }

  getDollarData() {
    this.registrarsolicitud.getDollarData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.dolarData.catalogos = data as Catalogo[];
      });
  }

  getElcafeData() {
    this.registrarsolicitud.getUtilicoCafeComoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.elcafeData.catalogos = data as Catalogo[];
      });
  }

  getPaisDeTransbordoData() {
    this.registrarsolicitud.getPaisDeImportacionData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisdetransbordoData.catalogos = data as Catalogo[];
      });
  }

  getMediaDeTransporte() {
    this.registrarsolicitud.getMediaDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.mediodetransporteData.catalogos = data as Catalogo[];
      });
  }

  onSubmit() {
    this.esFormularioVisible = false;

    const formData = { ...this.dataCafeForm.value };

    formData.datosDelTramiteRealizar.envasadoen = this.envasadoenData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.envasadoen),
    )?.descripcion;

    formData.datosDelTramiteRealizar.utilizoCafeComo = this.utilizoCafeComoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.utilizoCafeComo),
    )?.descripcion;

    formData.datosDelTramiteRealizar.paisdeimportacion = this.paisdeimportacionData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.paisdeimportacion),
    )?.descripcion;

    formData.datosDelTramiteRealizar.fraccionarancelaria = this.fraccionarancelariaData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.fraccionarancelaria),
    )?.descripcion;

    formData.datosDelTramiteRealizar.unidaddemedida = this.unidaddemedidaData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.unidaddemedida),
    )?.descripcion;

    formData.datosDelTramiteRealizar.dolar = this.dolarData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.dolar),
    )?.descripcion;

    formData.datosDelTramiteRealizar.elcafe = this.elcafeData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.elcafe),
    )?.descripcion;

    formData.datosDelTramiteRealizar.paisdetransbordo = this.paisdetransbordoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.paisdetransbordo),
    )?.descripcion;

    formData.datosDelTramiteRealizar.mediodetransporte = this.mediodetransporteData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.mediodetransporte),
    )?.descripcion;

    this.tableData.push(formData);
    
  }
transformedData = this.tableData.map(row => ({
envasadoen: row['datosDelTramiteRealizar'].envasadoen,
utilizoCafeComo: row['datosDelTramiteRealizar'].utilizoCafeComo,
cantidadutilizada: row['datosDelTramiteRealizar'].cantidadutilizada,
numerodepedimento: row['datosDelTramiteRealizar'].numerodepedimento,
paisdeimportacion: row['datosDelTramiteRealizar'].paisdeimportacion,
fraccionarancelaria: row['datosDelTramiteRealizar'].fraccionarancelaria,
cantidad: row['datosDelTramiteRealizar'].cantidad,
unidaddemedida: row['datosDelTramiteRealizar'].unidaddemedida,
precioapplicable: row['datosDelTramiteRealizar'].precioapplicable,
dolar: row['datosDelTramiteRealizar'].dolar,
lote: row['datosDelTramiteRealizar'].lote,
otrasmarcas: row['datosDelTramiteRealizar'].otrasmarcas,
elcafe: row['datosDelTramiteRealizar'].elcafe,
fechaexportacion: row['datosDelTramiteRealizar'].fechaexportacion,
paisdetransbordo: row['datosDelTramiteRealizar'].paisdetransbordo,
mediodetransporte: row['datosDelTramiteRealizar'].mediodetransporte,
Identificadordel: row['datosDelTramiteRealizar'].Identificadordel,
observaciones: (row as any).datosDelTramiteRealizar.observaciones

}));


  onAgregar() {
    this.esFormularioVisible = true;
  }
  
  onRowClick(rowData: any) {
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

  onCheckboxClick(event: Event, row: FilaData): void {
    // event.stopPropagation();
    this.esFormularioVisible = false;
    if (this.selectedRows.has(row.id)) {
      this.selectedRows.delete(row.id);
    } else {
      this.selectedRows.add(row.id);
    }
    console.log('Selected Rows:', Array.from(this.selectedRows)); // Debug log
    
  }
  

  onDeleteSelectedRows(): void {
    this.tableData = this.tableData.filter(row => !this.selectedRows.has(row.id)); // Filtra las filas no seleccionadas
    this.selectedRows.clear();
    this.dataCafeForm.reset();
    
  }

  get datosDelTramiteRealizar(): FormGroup {
    return this.dataCafeForm.get('datosDelTramiteRealizar') as FormGroup;
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud290201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud290201Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}



