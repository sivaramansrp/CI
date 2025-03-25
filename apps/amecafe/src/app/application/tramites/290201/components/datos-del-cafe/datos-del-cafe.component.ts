import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Catalogo, CatalogosSelect, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-del-cafe',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './datos-del-cafe.component.html',
  styleUrl: './datos-del-cafe.component.css',
})
export class DatosDelCafeComponent {

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
    
    
  
  constructor(
      private registrarsolicitud: RegistrarSolicitudService,
      private fb: FormBuilder,
    ){
      this.dataCafeForm = this.fb.group({
        envasadoen: ['', Validators.required],
        utilizoCafeComo:['',Validators.required],
              domicilio:['',Validators.required],
              paisData:['',Validators.required],
              codigopostal:['',Validators.required],
              telefono:['',Validators.required],
              correoelectronica:['',Validators.required]
      
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
}
