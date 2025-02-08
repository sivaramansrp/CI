/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  cargarDatosIniciales,
  carrosDeFerrocarril,
  datosDeMercancias,
  historialInspeccionFisica,
  solicitud,
} from '../../../../core/models/220502/solicitud-pantallas.model';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { CarrosDeFerrocarrilComponent } from '../../shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { CommonModule } from '@angular/common';
import { DatoseDelTramiteARealizerComponent } from '../../shared/datose-del-tramite-a-realizer/datose-del-tramite-a-realizer.component';
import { HistorialInspeccionFisicaComponent } from '../../shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { SolicitudDatosComponent } from '../../shared/solicitud-datos/solicitud-datos.component';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HistorialInspeccionFisicaComponent,
    CarrosDeFerrocarrilComponent,
    SolicitudDatosComponent,
    ResponsableInspeccionEnPuntoComponent,
    DatoseDelTramiteARealizerComponent,
    MedioTransporteComponent,
  ],
  providers: [SolicitudPantallasService],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  /** Grupo de formularios para manejar formularios reactivos.*/
  form: FormGroup;

  /** Encabezados y datos para mostrar información de mercancías. */
  hMercanciaTabla: string[];
  dMercanciaBody: datosDeMercancias[];

  /** Encabezados y datos para mostrar información de solicitud */
  hSolicitud: string[];
  dSolicitud: solicitud[];

  /** Información del catálogo para la selección del medio de transporte. */
  mediodetransporte: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'transporte 1',
        tam: 'transporte 1',
        dpi: 'transporte 1',
      },
      {
        id: 2,
        descripcion: 'transporte 2',
        tam: 'transporte 2',
        dpi: 'transporte 2',
      },
      {
        id: 3,
        descripcion: 'transporte 3',
        tam: 'transporte 3',
        dpi: 'transporte 3',
      },
    ],
  };

  /** Datos de vagones e historial de inspección física. */
  hCarroFerrocarril: string[];
  dCarrosDeFerrocarril: carrosDeFerrocarril[];
  hHistorialinspeccion: string[];
  dHistorialInspecciones: historialInspeccionFisica[];

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService /**Servicio para obtener datos de solicitud */
  ) {
    this.form = this.fb.group(
      {}
    ); /** Inicializar un grupo de formulario vacío y obtener datos de formulario utilizando formGroupName de un componente secundario. */
  }

  /** Gancho de ciclo de vida para cargar datos iniciales cuando se inicializa el componente */
  ngOnInit() {
    this.cargarDatosIniciales();
  }

  /**
   * Método para buscar y cargar datos iniciales del servicio.
   */
  cargarDatosIniciales(): void {
    this.solicitudService.getData().subscribe({
      next: (data: cargarDatosIniciales) => {
        this.hHistorialinspeccion = data.hHistorialinspeccion;
        this.dHistorialInspecciones = data.dHistorialInspecciones;
        this.dCarrosDeFerrocarril = data.dCarrosDeFerrocarril;
        this.hCarroFerrocarril = data.hCarroFerrocarril;
        this.hSolicitud = data.hSolicitud;
        this.dSolicitud = data.dSolicitud;
        this.hMercanciaTabla = data.hMerchandise;
        this.dMercanciaBody = data.dMercancia;
      },
      error: () => {
        //console.error('Error al cargar datos iniciales:', err);
      },
    });
  }
}
