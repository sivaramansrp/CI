import { CONFIGURACION_CONTRIBUYENTES_ACCIONISTAS, CONFIGURACION_EMPRESAS_SUBMANUFACTURERAS, CONFIGURACION_FEDERATARIOS, CONFIGURACION_FEDERATARIOS_DOMICILIO, CONFIGURACION_PLANTAS_MANUFACTURERAS, CONFIGURACION_SERVICIOS_IMMEX } from '../../constants/complementaria.enum';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DatosContribuyente, DatosEmpresaSubmanufacturera, DatosPlantaManufacturera, Federatario, FederatarioRealizaranLasOperaciones, ServicioImmex } from '../../models/complementaria.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../service/modificacion-programa-immex-baja-submanufacturera.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-complementaria',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './complementaria.component.html',
  styleUrl: './complementaria.component.scss',
})
export class ComplementariaComponent {
  public certificacionSAT$ = signal('Sí');
  
  /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  public tablaSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;

  public configuracionAccionistasTabla: ConfiguracionColumna<DatosContribuyente>[] = CONFIGURACION_CONTRIBUYENTES_ACCIONISTAS;

  public accionistasTablaDatos: DatosContribuyente[] = [];

  public accionistasTablaSeleccionada: DatosContribuyente[] = [];


  public configuracionFederatariosTabla: ConfiguracionColumna<Federatario>[] = CONFIGURACION_FEDERATARIOS;

  public federatariosTablaDatos: Federatario[] = [];

  public federatariosTablaSeleccionada: Federatario[] = [];


  public configuracionPlantasIMMEX: ConfiguracionColumna<FederatarioRealizaranLasOperaciones>[] = CONFIGURACION_FEDERATARIOS_DOMICILIO;

  public plantasIMMEXDatos: FederatarioRealizaranLasOperaciones[] = [];

  public plantasIMMEXSeleccionada: FederatarioRealizaranLasOperaciones[] = [];

  /**
 * Configuración de columnas para la tabla de empresas submanufactureras.
 * Define cómo se mostrarán los datos en la tabla dinámica.
 */
public configuracionEmpresasSubmanufacturerasTabla: ConfiguracionColumna<DatosEmpresaSubmanufacturera>[] = CONFIGURACION_EMPRESAS_SUBMANUFACTURERAS;

/**
 * Arreglo que contiene los datos que se mostrarán en la tabla de empresas submanufactureras.
 */
public empresasSubmanufacturerasTablaDatos: DatosEmpresaSubmanufacturera[] = [];

/**
 * Arreglo que almacena las filas seleccionadas por el usuario desde la tabla dinámica.
 * Se actualiza cada vez que el usuario selecciona una fila.
 */
public empresasSubmanufacturerasTablaSeleccionada: DatosEmpresaSubmanufacturera[] = [];

/**
 * Configuración de columnas para la tabla de plantas manufactureras.
 */
public configuracionPlantasManufacturerasTabla: ConfiguracionColumna<DatosPlantaManufacturera>[] = CONFIGURACION_PLANTAS_MANUFACTURERAS;

/**
 * Datos que se mostrarán en la tabla de plantas manufactureras.
 */
public plantasManufacturerasTablaDatos: DatosPlantaManufacturera[] = [];

/**
 * Filas seleccionadas por el usuario en la tabla de plantas manufactureras.
 */
public plantasManufacturerasTablaSeleccionada: DatosPlantaManufacturera[] = [];

public configuracionServiciosImmexTabla: ConfiguracionColumna<ServicioImmex>[] = CONFIGURACION_SERVICIOS_IMMEX;

public serviciosImmexTablaDatos: ServicioImmex[] = [];

public serviciosImmexTablaSeleccionada: ServicioImmex[] = [];

  constructor(public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService) {
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(this, 'accionistasTablaDatos', '/80303/accionistasTablaDatos.json');
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(this, 'federatariosTablaDatos', '/80303/federatariosTablaDatos.json');
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(this, 'plantasIMMEXDatos', '/80303/plantasIMMEXDatos.json');
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(this, 'empresasSubmanufacturerasTablaDatos', '/80303/empresasSubmanufacturerasTablaDatos.json');
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(this, 'plantasManufacturerasTablaDatos', '/80303/plantasManufacturerasTablaDatos.json');
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(this, 'serviciosImmexTablaDatos', '/80303/serviciosImmexTablaDatos.json');


  }


  onInputChange(event: Event): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    if (INPUT_ELEMENT) {
      this.certificacionSAT$.set(INPUT_ELEMENT.value);
    }
  }
}
