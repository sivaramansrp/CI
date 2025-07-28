import {
  CargarDatosIniciales,
  CarrosDeFerrocarril,
  DatosDeMercancias,
  HistorialInspeccionFisica,
} from '../../models/solicitud-pantallas.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteARealizarComponent } from '../../shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { Solicitud } from '../../../220503/models/solicitud-pantallas.model';
import { SolicitudDatosTabComponent } from '../../shared/solicitud-datos/solicitud-datos.component';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';

@Component({
  selector: 'app-solicitud-datos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitudDatosTabComponent,
    DatosDelTramiteARealizarComponent,
    ResponsableInspeccionEnPuntoComponent,
    MedioTransporteComponent,
  ],
  templateUrl: './SolicitudDatos.component.html',
})
export class SolicitudDatosComponent implements OnInit, OnDestroy {
  /** Grupo de formularios para manejar formularios reactivos.*/
  form: FormGroup;
  /** Encabezados y datos para mostrar información de mercancías. */
  hMercanciaTabla: string[] = [];

  /** Datos de mercancías para mostrar en la tabla. */
  dMercanciaBody: DatosDeMercancias[] = [];

  /** Encabezados y datos para mostrar información de solicitud */
  hSolicitud: string[] = [];

  /** Datos de solicitud para mostrar en la tabla */
  dSolicitud: Solicitud[] = [];

  /** Información del catálogo para la selección del medio de transporte. */
  mediodetransporte: CatalogosSelect = {} as CatalogosSelect;

  /** Matriz para contener datos para cada fila de la tabla */
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  /** Datos de vagones e historial de inspección física. */
  hCarroFerrocarril: string[] = [];

  /** Datos de vagones e historial de inspección física. */
  dCarrosDeFerrocarril: CarrosDeFerrocarril[] = [];

  /** Encabezados y datos para mostrar información de historial de inspección física. */
  hHistorialinspeccion: string[] = [];

  /** Datos de historial de inspección física para mostrar en la tabla. */
  dHistorialInspecciones: HistorialInspeccionFisica[] = [];

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  public destroyed$ = new Subject<void>();

  @ViewChild('datosDelTramiteARealizarRef') datosDelTramiteARealizar!: DatosDelTramiteARealizarComponent;

  @ViewChild('solicitudDatosTabRef') revisionDocumental!: SolicitudDatosTabComponent;

  @ViewChild('responsableInspeccionEnPuntoRef') responsableInspeccionEnPunto!: ResponsableInspeccionEnPuntoComponent;

  @ViewChild('medioTransporteRef') medioTransporte!: MedioTransporteComponent;

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
    this.solicitudService
      .getData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: CargarDatosIniciales) => {
          this.hHistorialinspeccion = data.hHistorialinspeccion;
          this.dHistorialInspecciones = data.dHistorialInspecciones;
          this.dCarrosDeFerrocarril = data.dCarrosDeFerrocarril;
          this.hCarroFerrocarril = data.hCarroFerrocarril;
          this.hSolicitud = data.hSolicitud;
          this.dSolicitud = data.dSolicitud;
          this.hMercanciaTabla = data.hMerchandise;
          this.dMercanciaBody = data.dMercancia;
          this.mediodetransporte = data.medioDeTransporte;
        },
      });
  }

  validarFormularios(): boolean {
   let isValid = true;
   isValid = this.datosDelTramiteARealizar.validarFormularios() && this.responsableInspeccionEnPunto.validarFormularios() && this.medioTransporte.validarFormularios();
   return isValid;
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe el componente de todos los observables.
   * @returns {void}
   * */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
