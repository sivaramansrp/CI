import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { CatalogosSelect, DatosPasos } from '../../../../core/models/shared/components.model';
import { ServiciosPantallasService } from '../../../../core/services/220471/servicios-pantallas.service';
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { AgregarArchivoComponent } from '../../../../shared/components/agregar-archivo/agregar-archivo.component';

@Component({
  selector: 'app-datos-del',
  templateUrl: './datos-del.component.html',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent,
    BtnContinuarComponent,
    AgregarArchivoComponent
  ],
  styleUrl: './datos-del.component.scss'
})
export class DatosDelComponent {
  unidadExpedidora!: FormGroup;
  radioBoton: string[] = ['Oficina Estatal/OISA', 'OSIA (solo perros y gatos)', 'oficina central'];
  mercanciasData: any
  
  dropdownConfigs: CatalogosSelect[] = [
    { labelNombre: 'Delegaciones estatales SAGARPA', 
      required: true, 
      catalogos: [{ id: 1, descripcion: 'Option 1' }, 
        { id: 2, descripcion: 'Option 2' }, 
        { id: 3, descripcion: 'Option 3' }], 
      primerOpcion: '' 
    },
    { labelNombre: 'OSIA', 
      required: true, 
      catalogos: [{ id: 1, descripcion: 'Option 1' }, 
        { id: 2, descripcion: 'Option 2' }, 
        { id: 3, descripcion: 'Option 3' }], 
        primerOpcion: '' },
    { labelNombre: 'oficina centra', 
      required: true, 
      catalogos: [{ id: 1, descripcion: 'Option 1' }, 
        { id: 2, descripcion: 'Option 2' }, 
        { id: 3, descripcion: 'Option 3' }], 
        primerOpcion: '' 
      },
    { labelNombre: 'Distrito desarrollo rural (DDR)', 
      required: false,
       catalogos: [{ id: 1, descripcion: 'Option 1' },
         { id: 2, descripcion: 'Option 2' }, 
         { id: 3, descripcion: 'Option 3' }],
          primerOpcion: '' 
        },
  ];

  constructor(private fb: FormBuilder, private serviciosPantallasService: ServiciosPantallasService) { }

  ngOnInit() {
    this.initForm();
    this.serviciosPantallasService.fetchMercanciasData().subscribe((data) => {
      this.mercanciasData = data;
      console.log(this.mercanciasData)
      }); 
  }

  initForm(): void {
    this.unidadExpedidora = this.fb.group({
      unidad: ['', Validators.required]
    });
  }

  onSelectionChange(value: string) {
  }

  seleccionar() {

  }  

  tableColumns = [
    'No. partida',
    'Fracción arancelaria',
    'Descripción de la fracción',
    'Unidad de medida de tarifa (UMT)',
    'Cantidad (UMT)',
    'Unidad de medida de comercialización (UMC)',
    'Cantidad (UMC)'
  ];

  handleGuardar() {
  
  }

  handleContinuar(event: any) {
   
  
  }

  cargarArchivo(): void {
    console.log('Carga por archivo clicked');

  }

  agregar(): void {
    console.log('Agregar clicked');
  
  }
}
