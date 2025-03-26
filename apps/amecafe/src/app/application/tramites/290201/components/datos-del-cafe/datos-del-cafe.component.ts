import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Catalogo, CatalogosSelect, ConfiguracionColumna, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, Validators } from '@angular/forms';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { AcuseComponent } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from '../datos-de-la-solicitud/datos-de-la-solicitud.component';
@Component({
  selector: 'app-datos-del-cafe',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent,TableComponent,AcuseComponent,DatosDeLaSolicitudComponent],
  templateUrl: './datos-del-cafe.component.html',
  styleUrl: './datos-del-cafe.component.scss',
})
export class DatosDelCafeComponent {
  tableData: any[] = []; 
  dataCafeForm!: FormGroup;
  public envasadoenData: CatalogosSelect = {
      labelNombre: 'Envasado',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public utilizoCafeComoData: CatalogosSelect = {
      labelNombre: 'Utilizo cafe como materia prima importada para elaborar este producto?',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public paisdeimportacionData: CatalogosSelect = {
      labelNombre: 'Pais de importacion',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public fraccionarancelariaData: CatalogosSelect = {
      labelNombre: 'Fraccion arancelaria',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public unidaddemedidaData: CatalogosSelect = {
      labelNombre: 'Unidad de medida',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public dolarData: CatalogosSelect = {
      labelNombre: ' ',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public elcafeData: CatalogosSelect = {
      labelNombre: 'EI cafe tiene caracteristicas especiales?',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public paisdetransbordoData: CatalogosSelect = {
      labelNombre: 'Pais de transbordo',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public mediodetransporteData: CatalogosSelect = {
      labelNombre: 'Medio de transporte',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
  

    isFormVisible: boolean = false; // Variable to toggle form visibility
    selectedRow: any = null;
    selectedRows: Set<number> = new Set();


  constructor(
      private registrarsolicitud: RegistrarSolicitudService,
      private fb: FormBuilder,
    ){
      this.dataCafeForm = this.fb.group({
        envasadoen: ['', Validators.required],
        utilizoCafeComo:['',Validators.required],
        cantidadutilizada:['',Validators.required],
        numerodepedimento:['',Validators.required],
        paisdeimportacion:['',Validators.required],
        fraccionarancelaria:['',Validators.required],
        cantidad:['',Validators.required],
        unidaddemedida: ['', Validators.required],
        precioapplicable:['',Validators.required],
        dolar:['',Validators.required],
        lote:['',Validators.required],
        otrasmarcas:['',Validators.required],
        elcafe:['',Validators.required],
        fechaexportacion:['',Validators.required],
        paisdetransbordo:['',Validators.required],
        mediodetransporte:['',Validators.required],
        Identificadordel:['',Validators.required],
        observaciones:['',Validators.required]
      
            })
    }

    ngOnInit(): void {
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

    getEnvasadoenData(){
        this.registrarsolicitud.getEnvasadoenData().subscribe((data) => {
          console.log('Catalogo Data:', data)
          this.envasadoenData.catalogos = data as Catalogo[];
        })
      }
      getUtilicoCafeComoData(){
        this.registrarsolicitud.getUtilicoCafeComoData().subscribe((data) => {
          this.utilizoCafeComoData.catalogos = data as Catalogo[];
        })
      }
      getPaisDeImportacionData(){
        this.registrarsolicitud.getPaisDeImportacionData().subscribe((data) => {
          this.paisdeimportacionData.catalogos = data as Catalogo[];
        })
      }
      getFraccionArancelariaData(){
        this.registrarsolicitud.getFraccionArancelariaData().subscribe((data) => {
          this.fraccionarancelariaData.catalogos = data as Catalogo[];
        })
      }

      getUnidadDeMedidaData(){
        this.registrarsolicitud.getUnidadDeMedidaData().subscribe((data) => {
          this.unidaddemedidaData.catalogos = data as Catalogo[];
        })
      }
      getDollarData(){
        this.registrarsolicitud.getDollarData().subscribe((data) => {
          this.dolarData.catalogos = data as Catalogo[];
        })
      }
      getElcafeData(){
        this.registrarsolicitud.getUtilicoCafeComoData().subscribe((data) => {
          this.elcafeData.catalogos = data as Catalogo[];
        })
      }

      getPaisDeTransbordoData(){
        this.registrarsolicitud.getPaisDeImportacionData().subscribe((data) => {
          this.paisdetransbordoData.catalogos = data as Catalogo[];
        })
      }
      getMediaDeTransporte(){
        this.registrarsolicitud.getMediaDeTransporte().subscribe((data) => {
          this.mediodetransporteData.catalogos = data as Catalogo[];
        })
      }

    
      onSubmit(){
        this.isFormVisible = false; // Toggle the form visibility

        const formData = {...this.dataCafeForm.value };
        // Map the ID to its corresponding value
        formData.envasadoen = this.envasadoenData.catalogos.find(
          (item: Catalogo) => String(item.id) === formData.envasadoen
        )?.descripcion; // Replace 'id' with the correct property from Catalogo
          // Map other catalog fields similarly if needed
      formData.utilizoCafeComo = this.utilizoCafeComoData.catalogos.find(
       (item: Catalogo) => String(item.id) === formData.utilizoCafeComo
      )?.descripcion;

      formData.paisdeimportacion = this.paisdeimportacionData.catalogos.find(
       (item: Catalogo) => String(item.id) === formData.paisdeimportacion
     )?.descripcion;
     formData.fraccionarancelaria = this.fraccionarancelariaData.catalogos.find(
      (item: Catalogo) => String(item.id) === formData.fraccionarancelaria
     )?.descripcion;

     formData.unidaddemedida = this.unidaddemedidaData.catalogos.find(
      (item: Catalogo) => String(item.id) === formData.unidaddemedida
     )?.descripcion;

     formData.dolar = this.dolarData.catalogos.find(
      (item: Catalogo) => String(item.id) === formData.dolar
     )?.descripcion;

    formData.elcafe = this.elcafeData.catalogos.find(
      (item: Catalogo) => String(item.id) === formData.elcafe
    )?.descripcion;

    formData.paisdetransbordo = this.paisdetransbordoData.catalogos.find(
      (item: Catalogo) => String(item.id) === formData.paisdetransbordo
    )?.descripcion;

    formData.mediodetransporte = this.mediodetransporteData.catalogos.find(
     (item: Catalogo) => String(item.id) === formData.mediodetransporte
    )?.descripcion;

    this.tableData.push(formData);
        // Replace the ID with the value
        console.log('Form Data:', formData);
      }

      onAgregar(){
        if (this.dataCafeForm.valid) {
          // Push form data to the table data array
          // this.tableData.push(this.dataCafeForm.value);
    
          // Reset the form
          // this.dataCafeForm.reset();
    
          // Hide the form
          
        }
        this.isFormVisible = true;
      }
      onRowClick(rowData: any) {
        this.dataCafeForm.patchValue({
            envasadoen: this.envasadoenData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.envasadoen
            )?.id || '',
            utilizoCafeComo: this.utilizoCafeComoData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.utilizoCafeComo
            )?.id || '',
            paisdeimportacion: this.paisdeimportacionData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.paisdeimportacion
            )?.id || '',
            fraccionarancelaria: this.fraccionarancelariaData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.fraccionarancelaria
            )?.id || '',
            unidaddemedida: this.unidaddemedidaData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.unidaddemedida
            )?.id || '',
            dolar: this.dolarData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.dolar
            )?.id || '',
            elcafe: this.elcafeData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.elcafe
            )?.id || '',
            paisdetransbordo: this.paisdetransbordoData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.paisdetransbordo
            )?.id || '',
            mediodetransporte: this.mediodetransporteData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.mediodetransporte
            )?.id || '',
            // Map other non-catalog fields directly
            cantidadutilizada: rowData.cantidadutilizada || '',
            numerodepedimento: rowData.numerodepedimento || '',
            cantidad: rowData.cantidad || '',
            precioapplicable: rowData.precioapplicable || '',
            lote: rowData.lote || '',
            otrasmarcas: rowData.otrasmarcas || '',
            fechaexportacion: rowData.fechaexportacion || '',
            Identificadordel: rowData.Identificadordel || '',
            observaciones: rowData.observaciones || ''
        });
    
        this.isFormVisible = true;
    }

      onCheckboxClick(event: Event, index: number): void {
        event.stopPropagation(); // Prevent row click event
    
        if (this.selectedRows.has(index)) {
          this.selectedRows.delete(index); // Deselect row
        } else {
          this.selectedRows.add(index); // Select row
        }
      }
      onDeleteSelectedRows(): void {
        // Filter out rows that are not selected
        this.tableData = this.tableData.filter((_, index) => !this.selectedRows.has(index));
    
        // Clear the selected rows
        this.selectedRows.clear();
        this.dataCafeForm.reset();
       this.isFormVisible = false;
      }
      
    }



