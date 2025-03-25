import { DatosDeTablaSeleccionados, TablaMercanciasDatos, TablaOpcionConfig, TablaScianConfig, TablaSeleccion } from '../../../../shared/models/datos-solicitud.model';
import { OPCION_TABLA, PRODUCTO_TABLA, SCIAN_TABLA, TABLA_OPCION_DATA } from '../../../../shared/constantes/datos-solicitud.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';

@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent {  

  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: TABLA_OPCION_DATA,
  }
  public scianConfig = {
     tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
        configuracionTabla: SCIAN_TABLA,
        datos: [],
  }
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA,
    datos: [],
  }

  public opcionConfigDatos:TablaOpcionConfig[] = [];
  public seleccionadoopcionDatos:TablaOpcionConfig[] = [];

public scianConfigDatos:TablaScianConfig[] = [];
public seleccionadoScianDatos:TablaScianConfig[] = [];

public tablaMercanciasConfigDatos:TablaMercanciasDatos[] = [];
public seleccionadoTablaMercanciasDatos:TablaMercanciasDatos[] = [];

  scianSeleccionado(event: TablaScianConfig[]): void {
    this.scianConfigDatos = event;
  }

  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.tablaMercanciasConfigDatos = event;
  }

  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.opcionConfigDatos = event;
  }

  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.seleccionadoScianDatos = event.scianSeleccionados;
    this.seleccionadoTablaMercanciasDatos = event.mercanciasSeleccionados;
    this.seleccionadoopcionDatos = event.opcionSeleccionados;

  }

}
