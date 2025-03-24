import { DatosDeTablaSeleccionados, TablaMercanciasDatos, TablaScianConfig, TablaSeleccion } from '../../../../shared/models/datos-solicitud.model';
import { PRODUCTO_TABLA, SCIAN_TABLA } from '../../../../shared/constantes/datos-solicitud.enum';
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

  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.seleccionadoScianDatos = event.scianSeleccionados;
    this.seleccionadoTablaMercanciasDatos = event.mercanciasSeleccionados;
  }
}
