import { CargarDatosIniciales } from '../../../../core/models/220502/solicitud-pantallas.model';
import { CarrosDeFerrocarril } from '../../../../core/models/220502/solicitud-pantallas.model';
import { CarrosDeFerrocarrilComponent } from '../../shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeMercancias } from '../../../../core/models/220502/solicitud-pantallas.model';
import { DatoseDelTramiteARealizerComponent } from '../../shared/datose-del-tramite-a-realizer/datose-del-tramite-a-realizer.component';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HistorialInspeccionFisica } from '../../../../core/models/220502/solicitud-pantallas.model';
import { HistorialInspeccionFisicaComponent } from '../../shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { Solicitud } from '../../../../core/models/220502/solicitud-pantallas.model';
import { SolicitudDatosComponent } from '../../shared/solicitud-datos/solicitud-datos.component';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';
/**
 * Componente para gestionar la solicitud de trámite.
 */
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
/** Componente para gestionar la solicitud de trámite */
export class SolicitudComponent implements OnInit {
  /** Grupo de formularios para manejar formularios reactivos.*/
  form: FormGroup;

  /** Encabezados y datos para mostrar información de mercancías. */
  hMercanciaTabla: string[];

  /** Datos de mercancías para mostrar en la tabla. */
  dMercanciaBody: DatosDeMercancias[];

  /** Encabezados y datos para mostrar información de solicitud */
  hSolicitud: string[];

  /** Datos de solicitud para mostrar en la tabla */
  dSolicitud: Solicitud[];

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

   /** Matriz para contener datos para cada fila de la tabla */
  tableData = {
    tableBody: [],
    tableHeader: [],
  }

  /** Datos de vagones e historial de inspección física. */
  hCarroFerrocarril: string[];

  /** Datos de vagones e historial de inspección física. */
  dCarrosDeFerrocarril: CarrosDeFerrocarril[];

  /** Encabezados y datos para mostrar información de historial de inspección física. */
  hHistorialinspeccion: string[];

  /** Datos de historial de inspección física para mostrar en la tabla. */
  dHistorialInspecciones: HistorialInspeccionFisica[];

  /** Constructor para inyectar dependencias */
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService /**Servicio para obtener datos de solicitud */
  ) {
    this.form = this.fb.group(
      {}
    ); /** Inicializar un grupo de formulario vacío y obtener datos de formulario utilizando formGroupName de un componente secundario. */
  }

  /** Gancho de ciclo de vida para cargar datos iniciales cuando se inicializa el componente */
  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  /**
   * Método para buscar y cargar datos iniciales del servicio.
   */
  cargarDatosIniciales(): void {
    this.solicitudService.getData().subscribe({
      next: (data: CargarDatosIniciales) => {
        this.hHistorialinspeccion = data.hHistorialinspeccion;
        this.dHistorialInspecciones = data.dHistorialInspecciones;
        this.dCarrosDeFerrocarril = data.dCarrosDeFerrocarril;
        this.hCarroFerrocarril = data.hCarroFerrocarril;
        this.hSolicitud = data.hSolicitud;
        this.dSolicitud = data.dSolicitud;
        this.hMercanciaTabla = data.hMerchandise;
        this.dMercanciaBody = data.dMercancia;
      }
    });
  }
}
