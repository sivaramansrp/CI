/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnDestroy, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioOpcion } from '../../models/radio.model';
import { Catalogo, CatalogosSelect, ConfiguracionColumna, InputFecha, InputRadioComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudMCPModule } from '../../registrar-solicitud-mcp.module';
import { ReplaySubject, takeUntil } from 'rxjs';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FilaData, FilaData2, ListaClave } from '../../models/fila-modal';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TEXTOS } from '../../constants/constantes.enum';
import { FECHAINICIAL,FECHAFINAL } from '../../models/destinatario.model';
import { CrosslistComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { InputFechaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { Modal } from 'bootstrap';
import { MercanciaCrossList,CrossList,CrossListLable } from '../../models/mercancia.model';
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent,TituloComponent,CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,InputFechaComponent,CrosslistComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.css'],
})
export class DatosdelasolicitudComponent implements OnInit,OnDestroy {
  dataDeLaSolicitudForm!: FormGroup;
  TEXTOS = TEXTOS;
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  clavaScianForm!: FormGroup;
  public showClavaScianForm: boolean = false; 
  habilitarEstado: boolean = true;
  hercelosSeleccionados!: string;
  selectedMercanciasDatos: FilaData2[] = [];
  public mercanciasConfiguracionTabla: FilaData2[] = [];
  public listaClaveTabla: ListaClave[] = [];
  paisOrigen = false;
  paisOrigenCrossList: CrossList = {} as CrossList;
  paisProcedencisCrossList: CrossList = {} as CrossList;
  paisProcedencisColapsable = false;
  @ViewChild('modalAlerta') modalElement!: ElementRef;
  fechaInicialInput: InputFecha = FECHAINICIAL;
  fechaFinalInput: InputFecha = FECHAFINAL;
  editingRowIndex: number | null = null;
//   fechaInicialInput = { habilitado: true }; // Example InputFecha object
// fechaFinalInput = { habilitado: true }; 
  
usoEspecifico = false;
usoEspecificoCrossList: CrossList = {} as CrossList;
  
fechaInicialSeleccionada: string = '';
fechaFinalSeleccionada: string = '';
  opcionDeBotonDeRadio = [
    { label: 'Prórroga', value: 'prorroga' },
    { label: 'Modificación', value: 'modificacion' },
    { label: 'Modificación y prórroga', value: 'modificacion_prorroga' },
  ];
  public estadoData: CatalogosSelect = {
    labelNombre: 'Estado',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public claveScianData: CatalogosSelect = {
    labelNombre: 'Cave S.C.I.A.N.*:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public descripcionDelScianData: CatalogosSelect = {
    labelNombre: 'Descripcion del S.C.I.A.N',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public regimenalqueData: CatalogosSelect = {
    labelNombre: 'Régimen al que se destinarán la mercancías',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public aduanaData: CatalogosSelect = {
    labelNombre: 'Aduana',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public delProducto: CatalogosSelect = {
    labelNombre: 'Clasificacion del producto*:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public especificarData: CatalogosSelect = {
    labelNombre: 'Especificar clasificación del producto:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public tipoProductoData: CatalogosSelect = {
    labelNombre: 'Tipo de producto*:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;
   tableData: FilaData[] = []; 
   selectedRows: Set<number> = new Set();
   

// tableData: any = [];
hacerlosRadioOptions = [
  { label: 'No', value: 'no' },
  { label: 'Sí', value: 'si' },
];
  selectedRow: any;

  constructor(private fb: FormBuilder, private registrarsolicitudmcp: RegistrarSolicitudMcpService, private cdr: ChangeDetectorRef) {}

  configuracionColumnasoli: ConfiguracionColumna<FilaData>[] = [
    {
      encabezado: 'Clave S.C.I.A.N.',
      clave: (fila) => fila.claveScianG.claveScian,
      orden: 1,
    },
    {
      encabezado: 'Description del S.C.I.A.N',
      clave: (fila) => fila.claveScianG.descripcionDelScian,
      orden: 2,
    },

]

mercanciasDatos : ConfiguracionColumna<FilaData2>[] = [
  {
    encabezado: 'Clasificación del producto',
    clave: (fila) => fila.clasificaionProductos,
    orden: 1,
  },
  {
    encabezado: 'Especificar Clasificación del producto',
    clave: (fila) => fila.especificarProducto,
    orden: 2,
  },
  {
    encabezado: 'Denominación específico del producto',
    clave: (fila) => fila.denominacionEspecifica,
    orden: 3,
  },
  {
    encabezado: 'Marca',
    clave: (fila) => fila.marca,
    orden: 4,
  },
  {
    encabezado: 'Tipo de producto',
    clave: (fila) => fila.tipoProducto,
    orden: 5,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (fila) => fila.fraccionArancelaria,
    orden: 6,
  },
  {
    encabezado: 'Descripción de la fracción arancelaria',
    clave: (fila) => fila.descripcionFraccionArancelaria,
    orden: 7,
  },
  {
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (fila) => fila.UMC,
    orden: 8,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (fila) => fila.cantidadUMC,
    orden: 9,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (fila) => fila.UMT,
    orden: 10,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (fila) => fila.cantidadUMT,
    orden: 11,
  },
  {
    encabezado: 'País de origen',
    clave: (fila) => fila.paisDeOrigen,
    orden: 12,
  },
  {
    encabezado: 'País de procedencia',
    clave: (fila) => fila.paisDeProcedencia,
    orden: 13,
  },
  
  {
    encabezado: 'Uso específico',
    clave: (fila) => fila.usoEspecifico,
    orden: 14,
  },
];
public listaClave: ConfiguracionColumna<ListaClave>[] = [
  {
    encabezado: 'Clave de los lotes',
    clave: (fila) => fila.claveDeLosLotes,
    orden: 1,
  },
  {
    encabezado: 'Fecha de fabricación',
    clave: (fila) => fila.fechaDeFabricacion,
    orden: 2,
  },
  {
    encabezado: 'Fecha de caducidad',
    clave: (fila) => fila.fechaDeCaducidad,
    orden: 3,
  },
];

  ngOnInit(): void {
    this.dataDeLaSolicitudForm = this.fb.group({
      claveDeLosLotes: ['', Validators.required],
      fechaDeFabricacion: ['', Validators.required],
      fechaDeCaducidad: ['', Validators.required],
    });
   
    // this.dataDeLaSolicitudForm.get('fechaDeFabricacion')?.valueChanges.subscribe((value) => {
    //   console.log('Fecha de Fabricación changed:', value);
    //   this.fechaInicialSeleccionada = value; // Store the selected date
    // });
  
    // // Subscribe to value changes for fechaDeCaducidad
    // this.dataDeLaSolicitudForm.get('fechaDeCaducidad')?.valueChanges.subscribe((value) => {
    //   console.log('Fecha de Caducidad changed:', value);
    //   this.fechaFinalSeleccionada = value; // Store the selected date
    // });
    this.getEstadosData();
    this.getClaveScianData();
    this.createclaveScianForm();
    this.getClaveDescripcionDelData();
    this.getRegimenalqueData();
    this.getAduanaData();
    this. getMercanciasData();
    this.getEspificarData();
    this.getClasificacionDelProductoData();
    this.getTipoProductoData();
    this.getListaClaveData();
    this.getMercanciaCrosslistData();
  }
  createclaveScianForm(){
    this.clavaScianForm = this.fb.group({
      claveScianG: this.fb.group({
        claveScian: ['', Validators.required],
        descripcionDelScian:['', Validators.required]
      }),
  });
  }
  getMercanciaCrosslistData(): void {
    this.registrarsolicitudmcp
      .getMercanciaCrosslistData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: MercanciaCrossList[]) => {
          console.log('API Response:', respuesta); // Log the response
          if (respuesta.length > 0) {
            const firstItem = respuesta[0];
            this.paisOrigenCrossList = firstItem.paisOrigenCrossList;
            this.paisProcedencisCrossList = firstItem.paisProcedencisCrossList;
            this.usoEspecificoCrossList = firstItem.usoEspecificoCrossList;
          } else {
            console.warn('Empty response received for MercanciaCrosslistData');
          }
        },
        error: (err) => {
          console.error('Error fetching MercanciaCrosslistData:', err);
        },
      });
  }
  // onFechaDeFabricacionChange(event: string): void {
  //   this.fechaInicialSeleccionada = event; // Update the selected date
  //   this.dataDeLaSolicitudForm.get('fechaDeFabricacion')?.setValue(event);
  // }
  
  // onFechaDeCaducidadChange(event: string): void {
  //   this.fechaFinalSeleccionada = event; // Update the selected date
  //   this.dataDeLaSolicitudForm.get('fechaDeCaducidad')?.setValue(event);
  // }
  paisOrigenColapsable(): void {
    this.paisOrigen = !this.paisOrigen;
  }
  paisProcedencis_colapsable(): void {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }
  usoEspecificoColapsable(): void {
    this.usoEspecifico = !this.usoEspecifico;
  }
  
  getEstadosData() {
    this.registrarsolicitudmcp.getEstadosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.estadoData.catalogos = data as Catalogo[];
      });
  }
  getClaveScianData() {
    this.registrarsolicitudmcp.getClaveScianData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.claveScianData.catalogos = data as Catalogo[];
      });
  }
  getClaveDescripcionDelData(){
    this.registrarsolicitudmcp.getClaveDescripcionDelData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.descripcionDelScianData.catalogos = data as Catalogo[];
      });
  }
  getRegimenalqueData(){
    this.registrarsolicitudmcp.getRegimenalqueData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.regimenalqueData.catalogos = data as Catalogo[];
      });
  }
  getAduanaData(){
    this.registrarsolicitudmcp.getAduanaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaData.catalogos = data as Catalogo[];
      });
  }
  aceptar(): void {
    this.dataDeLaSolicitudForm.enable();
    // Habilitar todos los campos en el formulario Domicilio del Establecimiento
    this.dataDeLaSolicitudForm.enable();
    this.habilitarEstado = false;
  }

  getMercanciasData(){
    this.registrarsolicitudmcp.getMercanciasData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.mercanciasConfiguracionTabla = data as unknown as FilaData2[];
      });
  }
  getClasificacionDelProductoData(){
    this.registrarsolicitudmcp.getClasificacionDelProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.delProducto.catalogos = data as Catalogo[];
    });
  }
  getEspificarData(){
    this.registrarsolicitudmcp.getEspificarData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.especificarData.catalogos = data as Catalogo[];
    });
  }
  getTipoProductoData(){
    this.registrarsolicitudmcp.getTipoProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.tipoProductoData.catalogos = data as Catalogo[];
    });
  }
  getListaClaveData(){
    this.registrarsolicitudmcp.getListaClaveData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.listaClaveTabla = data as unknown as ListaClave[];
    });
  }

  seleccionarEstablecimiento(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  
  
  onSubmit() {
    const formData = { ...this.clavaScianForm.value };
    console.log('Form Data:', formData);
  
    formData.claveScianG.claveScian = this.claveScianData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.claveScianG.claveScian)
    )?.descripcion || 'Not Found';
  
    formData.claveScianG.descripcionDelScian = this.descripcionDelScianData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.claveScianG.descripcionDelScian)
    )?.descripcion || 'Not Found';
  
    console.log('Processed Form Data:', formData);
  
    this.tableData.push(formData);
    this.showClavaScianForm = false;
      this.clavaScianForm.reset(); 
    
  }
  
  // onSelectedRowsChange(selectedRows: FilaData[]): void {
  //   this.selectedRows = new Set(selectedRows.map((row) => row.id)); // Update selected rows
  //   // this.esFormularioVisible = false;
  // }
  // onSelectedRowsChanges(selectedRows: ListaClave[]): void {
  //   this.selectedRows = new Set(selectedRows.map((row) => row.id)); // Update selected rows
  //   // this.esFormularioVisible = false;
  // }
  onSelectedRows(selectedRows: FilaData[] | ListaClave[]): void {
    console.log('Selected rows:', selectedRows);
  
    if (selectedRows.length > 0 && 'claveDeLosLotes' in selectedRows[0]) {
      // Handle ListaClave[]
      this.selectedRows = new Set((selectedRows as ListaClave[]).map((row) => Number(row.claveDeLosLotes)));
    } else if (selectedRows.length > 0 && 'id' in selectedRows[0]) {
      // Handle FilaData[]
      this.selectedRows = new Set((selectedRows as FilaData[]).map((row) => row.id));
    } else {
      console.error('Selected rows do not contain expected properties.');
    }
  
    console.log('Updated selectedRows:', Array.from(this.selectedRows));
  }
  onEliminar(){
    if (!this.selectedRows || this.selectedRows.size === 0) {
      // Trigger the modal if no row is selected
      const modalElement = document.getElementById('seleccionaRegistroModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    } else {
      // Show the confirmation modal if rows are selected
    const modalElement = document.getElementById('confirmarEliminarModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
    }
  }
  
 
  confirmarEliminar() {
    // Delete the selected rows
    this.listaClaveTabla = this.listaClaveTabla.filter(
      (row) => !this.selectedRows.has(Number(row.claveDeLosLotes))
    );
      this.selectedRows.clear(); // Clear the selection after deletion
  
    // Close the confirmation modal
    const modalElement = document.getElementById('confirmarEliminarModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }
    console.log('Deleting selected rows:', Array.from(this.selectedRows));
    console.log('Before deletion, listaClaveTabla:', this.listaClaveTabla);
    console.log('After deletion, listaClaveTabla:', this.listaClaveTabla);
    console.log("Updated Table Data:", this.tableData);
  }
  onLimpiar() {
    this.clavaScianForm.reset();
  }
  onAgregar(){
    this.showClavaScianForm = true; // Show the form when "Agregar" is clicked
  }
  onDelete() {
    console.log("Deleting selected rows...");
    this.tableData = this.tableData.filter((row) => !this.selectedRows.has(row.id));
    this.selectedRows.clear(); // Clear the selection after deletion
    console.log("Updated Table Data:", this.tableData);
  }
  onCancelar() {
    this.showClavaScianForm = false; // Hide the form without submitting
    this.clavaScianForm.reset(); // Reset the form
  }
  agregarMercanciaGrid(): void {
    if (this.modalElement) {
     const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
     MODAL_INSTANCE.show();
   }
 }
 onAgregarListaClave() {
  console.log('onAgregarListaClave triggered');
  
  console.log('onAgregarListaClave triggered');
  console.log('Form Value:', this.dataDeLaSolicitudForm.value);

  const claveDeLosLotes = this.dataDeLaSolicitudForm.get('claveDeLosLotes')?.value || '';
  const fechaDeFabricacion = this.dataDeLaSolicitudForm.get('fechaDeFabricacion')?.value || '';
  const fechaDeCaducidad = this.dataDeLaSolicitudForm.get('fechaDeCaducidad')?.value || '';

  console.log('Form Value:', this.dataDeLaSolicitudForm.value);
  console.log('claveDeLosLotes:', claveDeLosLotes);
  console.log('fechaDeFabricacion:', fechaDeFabricacion);
  console.log('fechaDeCaducidad:', fechaDeCaducidad);

  // Validate form values
  if (!claveDeLosLotes || !fechaDeFabricacion || !fechaDeCaducidad) {
    console.error('One or more fields are empty. Please fill out all fields.');
    return;
  }

  if (this.editingRowIndex !== null) {
    this.listaClaveTabla[this.editingRowIndex] = {
      ...this.listaClaveTabla[this.editingRowIndex],
      claveDeLosLotes,
      fechaDeFabricacion,
      fechaDeCaducidad,
    };
    this.editingRowIndex = null;
  } else {
    const newId = this.listaClaveTabla.length > 0 
      ? Math.max(...this.listaClaveTabla.map(row => row.id)) + 1 
      : 1;

    const newRow: ListaClave = {
      id: newId,
      claveDeLosLotes,
      fechaDeFabricacion,
      fechaDeCaducidad,
    };

    this.listaClaveTabla.push(newRow);
  }

  this.dataDeLaSolicitudForm.reset();

  console.log('Updated listaClaveTabla:', this.listaClaveTabla);

}

 
// onModificar(rowIndex: number): void {
//   // const row = this.listaClaveTabla[rowIndex];
//   // this.editingRowIndex = rowIndex; // Track the row being edited

//   // // Populate the form with the row's data
//   // this.dataDeLaSolicitudForm.patchValue({
//   //   claveDeLosLotes: row.claveDeLosLotes || '',
//   //   fechaDeFabricacion: row.fechaDeFabricacion || '',
//   //   fechaDeCaducidad: row.fechaDeCaducidad || '',
//   // });
//   // console.log('Form Value:', this.dataDeLaSolicitudForm.value);
//   // console.log('listaClaveTabla Before:', this.listaClaveTabla);
//   // console.log('Editing row:', row);
// }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
