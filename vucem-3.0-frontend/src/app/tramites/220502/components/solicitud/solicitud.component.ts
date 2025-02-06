import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CarroFerrocarril,
  DatosMercancia,
  InspeccionFisica,
  mercanciaTablaData,
  Solicitud,
} from '../../../../core/models/220502/solicitud-pantallas.model';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { HistorialInspeccionFisicaComponent } from '../../shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { CarrosDeFerrocarrilComponent } from '../../shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { SolicitudDatosComponent } from '../../shared/solicitud-datos/solicitud-datos.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { DatoseDelTramiteARealizerComponent } from '../../shared/datose-del-tramite-a-realizer/datose-del-tramite-a-realizer.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports:[    
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    HistorialInspeccionFisicaComponent,
    CarrosDeFerrocarrilComponent,
    SolicitudDatosComponent,
    ResponsableInspeccionEnPuntoComponent,
    DatoseDelTramiteARealizerComponent,
    MedioTransporteComponent
  ],
  providers:[
    SolicitudPantallasService, 
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  form: FormGroup;
  hMercancia!: string[];
  hSolicitud: string[];
  dSolicitud: Solicitud[];
  mediodetransporte: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'abc',
        tam: 'abc',
        dpi: 'abc',
      },
      {
        id: 2,
        descripcion: 'cde',
        tam: 'cde',
        dpi: 'cde',
      },
      {
        id: 3,
        descripcion: 'xyz',
        tam: 'xyz',
        dpi: 'xyz',
      },
    ],
  };;
  datosMercancia: DatosMercancia[];
  hCarroFerrocarril: string[];
  carrosDeFerrocarrilPager: CarroFerrocarril[];
  hHistorialinspeccion: string[];
  dHistorialInspecciones: InspeccionFisica[];
  mercanciaTableData: mercanciaTablaData;
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.solicitudService
      .getData()
      .subscribe(
        (data: {
          dSolicitud: Solicitud[];
          hSolicitud: string[];
          hCarroFerrocarril: string[];
          hTabla: string[];
          hHistorialinspeccion: string[];
          inspecciones: InspeccionFisica[];
          carrosDeFerrocarrilPager: CarroFerrocarril[];
          datosMercancia: DatosMercancia[];
        }) => {
          this.hHistorialinspeccion = data.hHistorialinspeccion;
          this.dHistorialInspecciones = data.inspecciones;
          this.carrosDeFerrocarrilPager = data.carrosDeFerrocarrilPager;
          // this.datosMercancia = data.datosMercancia;
          // this.hMercancia = data.hTabla;
          this.hCarroFerrocarril = data.hCarroFerrocarril;
          this.hSolicitud = data.hSolicitud;
          this.dSolicitud = data.dSolicitud;
          this.mercanciaTableData = {
            hMercanciaTabla :data.hTabla,
            dMercanciaBody:data.datosMercancia
          }
        }
      );
  }

  alternarSeleccionarTodo(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.datosMercancia.forEach((item) => (item.selected = checked));
  }

  submitForm(){
    console.log(this.form.value)
  }
}
