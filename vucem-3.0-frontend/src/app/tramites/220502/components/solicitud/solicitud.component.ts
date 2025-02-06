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
  Solicitud,
} from '../../../../core/models/220502/solicitud-pantallas.model';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { HistorialInspeccionFisicaComponent } from '../../shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { CarrosDeFerrocarrilComponent } from '../../shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { SolicitudDatosComponent } from '../../shared/solicitud-datos/solicitud-datos.component';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports:[    
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    HistorialInspeccionFisicaComponent,
    CarrosDeFerrocarrilComponent,
    SolicitudDatosComponent
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
  mediodetransporte!: CatalogosSelect;
  datosMercancia: DatosMercancia[];
  hCarroFerrocarril: string[];
  carrosDeFerrocarrilPager: CarroFerrocarril[];
  hHistorialinspeccion: string[];
  dHistorialInspecciones: InspeccionFisica[];
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService
  ) {
    this.form = this.fb.group({
      identificaciontransporte: new FormControl('', [Validators.required]),
      mediodetransporte: new FormControl('', [Validators.required]),
      totalDeGuiasCubiertos: new FormControl('', [Validators.required]),
    });
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
          this.datosMercancia = data.datosMercancia;
          this.hMercancia = data.hTabla;
          this.hCarroFerrocarril = data.hCarroFerrocarril;
          this.hSolicitud = data.hSolicitud;
          this.dSolicitud = data.dSolicitud;
        }
      );
  }

  alternarSeleccionarTodo(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.datosMercancia.forEach((item) => (item.selected = checked));
  }
}
