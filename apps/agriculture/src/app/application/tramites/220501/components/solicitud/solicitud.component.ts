import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CargarDatosIniciales } from '../../../220502/models/solicitud-pantallas.model';
import { CarrosDeFerrocarril } from '../../../220502/models/solicitud-pantallas.model';
import { HistorialInspeccionFisica } from '../../../220502/models/solicitud-pantallas.model';
import { Solicitud } from '../../../220502/models/solicitud-pantallas.model'
import { SolicitudPantallasService } from '../../../220502/services/solicitud-pantallas.service';
import { TEXTOS } from '../../constantes/texto-enum';
import { CommonModule } from '@angular/common';
import { SolicitudDatosComponent } from '../../../220502/shared/solicitud-datos/solicitud-datos.component';
import { DatosDelTramiteARealizarComponent } from '../../../220502/shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../../220502/shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { MedioTransporteComponent } from '../../../220502/shared/medio-transporte/medio-transporte.component';
import { CarrosDeFerrocarrilComponent } from '../../../220502/shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { HistorialInspeccionFisicaComponent } from '../../../220502/shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SolicitudDatosComponent, DatosDelTramiteARealizarComponent,ResponsableInspeccionEnPuntoComponent,
    MedioTransporteComponent, CarrosDeFerrocarrilComponent,HistorialInspeccionFisicaComponent
  ],
})
export class SolicitudComponent implements OnInit {
  /**
   * Constantes de texto.
   */
  TEXTOS = TEXTOS;

  /**
   * Formulario para los datos de la solicitud.
   */
  form!: FormGroup;

  /**
   * Historial de solicitudes.
   */
  hSolicitud: string[] = [];

  /**
   * Datos de las solicitudes.
   */
  dSolicitud: Solicitud[] = [];

  /**
   * Rango de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * Formulario de datos de la solicitud.
   */
  datosDelaSolicitud!: FormGroup;

  /**
   * Lista de solicitudes.
   */
  solicitudes: Solicitud[] = [];

  /**
   * Lista de identificadores de carros de ferrocarril.
   */
  hCarroFerrocarril: string[] = [];

  /**
   * Lista de objetos que representan los carros de ferrocarril.
   */
  dCarrosDeFerrocarril: CarrosDeFerrocarril[] = [];

  /**
   * Lista de identificadores del historial de inspección.
   */
  hHistorialinspeccion: string[] = [];

  /**
   * Lista de objetos que representan el historial de inspecciones físicas.
   */
  dHistorialInspecciones: HistorialInspeccionFisica[] = [];

  /**
   * Indica si se debe mostrar la sección.
   */
  mostrarSeccion: boolean = true;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param solicitudService Servicio para gestionar las pantallas de solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService
  ) {
    this.crearFormulario();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  /**
   * Método para crear el formulario de la solicitud.
   */
  crearFormulario(): void {
    this.form = this.fb.group({});
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
      }
    });
  }

  /**
   * Método para manejar el evento de selección de transporte.
   * @param value Valor booleano que indica si se debe mostrar la sección.
   */
  onTransporteSeleccionado(value: boolean): void {
    this.mostrarSeccion = value;
  }
}
