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
import { Catalogo, CatalogosSelect, ConfiguracionColumna, InputRadioComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudMCPModule } from '../../registrar-solicitud-mcp.module';
import { ReplaySubject, takeUntil } from 'rxjs';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FilaData, FilaData2 } from '../../models/fila-modal';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent,TituloComponent,CatalogoSelectComponent,TablaDinamicaComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.css'],
})
export class DatosdelasolicitudComponent implements OnInit,OnDestroy {
  dataDeLaSolicitudForm!: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  clavaScianForm!: FormGroup;
  public showClavaScianForm: boolean = false; 
  habilitarEstado: boolean = true;
  @ViewChild('modalAlerta') modalElement!: ElementRef;

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
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;
   tableData: FilaData[] = []; 
   selectedRows: Set<number> = new Set();

// tableData: any = [];

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
// configuracionColumnasoli2 : ConfiguracionColumna<FilaData2>[] = [
//   {
//     encabezado: 'Clasificación del producto',
//     clave: (fila) => fila.clasificaionProductos,
//     orden: 1,
//   },
//   {
//     encabezado: 'Especificar Clasificación del producto',
//     clave: (fila) => fila.especificarProducto,
//     orden: 2,
//   },
//   {
//     encabezado: 'Denominación específico del producto',
//     clave: (fila) => fila.denominacionEspecifica,
//     orden: 3,
//   },
//   {
//     encabezado: 'Marca',
//     clave: (fila) => fila.marca,
//     orden: 4,
//   },
//   {
//     encabezado: 'Fracción arancelaria',
//     clave: (fila) => fila.fraccionArancelaria,
//     orden: 5,
//   },
//   {
//     encabezado: 'Descripción de la fracción arancelaria',
//     clave: (fila) => fila.descripcionFraccionArancelaria,
//     orden: 6,
//   },
//   {
//     encabezado: 'Unidad de medida de comercialización (UMC)',
//     clave: (fila) => fila.umc,
//     orden: 7,
//   },
//   {
//     encabezado: 'Cantidad UMC',
//     clave: (fila) => fila.cantidadUMC,
//     orden: 8,
//   },
//   {
//     encabezado: 'Unidad de medida de tarifa (UMT)',
//     clave: (fila) => fila.umt,
//     orden: 9,
//   },
//   {
//     encabezado: 'Cantidad UMT',
//     clave: (fila) => fila.cantidadUMT,
//     orden: 10,
//   },
//   {
//     encabezado: 'País de origen',
//     clave: (fila) => fila.paisDeOrigen,
//     orden: 11,
//   },
//   {
//     encabezado: 'País de procedencia',
//     clave: (fila) => fila.paisDeProcedencia,
//     orden: 12,
//   },
//   {
//     encabezado: 'Tipo de producto',
//     clave: (fila) => fila.tipoProducto,
//     orden: 13,
//   },
//   {
//     encabezado: 'Uso específico',
//     clave: (fila) => fila.usoEspecifico,
//     orden: 14,
//   },
// ];

  ngOnInit(): void {
    this.dataDeLaSolicitudForm = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        justification: [''],
      }),
    });
    this.getEstadosData();
    this.getClaveScianData();
    this.createclaveScianForm();
    this.getClaveDescripcionDelData();
    this.getRegimenalqueData();
    this.getAduanaData();
  }
  createclaveScianForm(){
    this.clavaScianForm = this.fb.group({
      claveScianG: this.fb.group({
        claveScian: ['', Validators.required],
        descripcionDelScian:['', Validators.required]
      }),
  });
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
  onSelectedRowsChange(selectedRows: FilaData[]): void {
    this.selectedRows = new Set(selectedRows.map((row) => row.id)); // Update selected rows
    // this.esFormularioVisible = false;
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
 
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
