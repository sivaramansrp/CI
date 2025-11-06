import {
  CONFIGURACION_EMPRESAS_SUBMANUFACTURERAS,
  CONFIGURACION_FEDERATARIOS,
  CONFIGURACION_FEDERATARIOS_DOMICILIO,
  CONFIGURACION_PLANTAS_MANUFACTURERAS
} from '../../constants/complementaria.enum';
import { Complimentaria, Empresas, Plantas } from '../../../../shared/models/complementaria.model';
import { Component, OnDestroy } from '@angular/core';
import {
  Federatario,
  FederatarioRealizaranLasOperaciones,
  ServicioImmex,
} from '../../models/complementaria.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementariaComponent } from '../../../../shared/components/complementaria/complementaria.component';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';

/**
 * Decorador `@Component` utilizado para definir un componente en Angular.
 * 
 * Este decorador configura las propiedades esenciales del componente, como su selector,
 * la plantilla HTML, los estilos y los módulos que se importan para su funcionamiento.
 * 
 * @property {string} selector - Nombre del selector que se utiliza para instanciar este componente en una plantilla HTML.
 * @property {boolean} standalone - Indica si el componente es independiente y no requiere ser declarado en un módulo.
 * @property {Array<any>} imports - Lista de módulos y componentes que se importan para ser utilizados dentro de este componente.
 * @property {string} templateUrl - Ruta relativa al archivo HTML que define la estructura visual del componente.
 * @property {string} styleUrl - Ruta relativa al archivo SCSS que define los estilos del componente.
 */
@Component({
  selector: 'app-complementario',
  standalone: true,
  imports: [CommonModule, ComplementariaComponent],
  templateUrl: './complementaria.component.html',
  styleUrl: './complementaria.component.scss',
})
export class ComplementarioComponent implements OnDestroy {
  /**
   * Arreglo que almacena los datos de los accionistas relacionados con el contribuyente.
   * 
   * Este arreglo contiene objetos de tipo `DatosContribuyente` que representan la información
   * detallada de cada accionista. Se utiliza para gestionar y mostrar los datos de los accionistas
   * en la tabla correspondiente dentro del componente.
   */
  public accionistasTablaDatos: Complimentaria[] = [];

  /**
   * Configuración de la tabla de federatarios.
   * 
   * Esta propiedad define la configuración de las columnas para la tabla
   * de federatarios utilizando el tipo `ConfiguracionColumna<Federatario>[]`.
   * La configuración se obtiene de la constante `CONFIGURACION_FEDERATARIOS`.
   * 
   * @type {ConfiguracionColumna<Federatario>[]}
   */
  public configuracionFederatariosTabla: ConfiguracionColumna<Federatario>[] =
    CONFIGURACION_FEDERATARIOS;

  /**
   * Arreglo que almacena los datos de los federatarios.
   * 
   * Este arreglo contiene objetos de tipo `Federatario` que representan
   * información relacionada con los federatarios. Se utiliza para gestionar
   * y mostrar los datos en la tabla correspondiente dentro del componente.
   */
  public federatariosTablaDatos: Federatario[] = [];

  /**
   * Configuración de las columnas para la lista de federatarios que realizarán las operaciones
   * en las plantas IMMEX. Esta configuración se utiliza para definir las propiedades y 
   * características de las columnas en la tabla correspondiente.
   * 
   * @type {ConfiguracionColumna<FederatarioRealizaranLasOperaciones>[]} 
   * Arreglo que contiene la configuración de las columnas.
   */
  public configuracionPlantasIMMEX: ConfiguracionColumna<FederatarioRealizaranLasOperaciones>[] =
    CONFIGURACION_FEDERATARIOS_DOMICILIO;

  /**
   * Arreglo que almacena los datos relacionados con las plantas IMMEX 
   * y las operaciones realizadas por los fedatarios. 
   * 
   * Este arreglo se utiliza para gestionar y manipular la información 
   * de las plantas IMMEX dentro del componente.
   */
  public plantasIMMEXDatos: FederatarioRealizaranLasOperaciones[] = [];

  /**
   * Configuración de columnas para la tabla de empresas submanufactureras.
   * Define cómo se mostrarán los datos en la tabla dinámica.
   */
  public configuracionEmpresasSubmanufacturerasTabla: ConfiguracionColumna<Empresas>[] =
    CONFIGURACION_EMPRESAS_SUBMANUFACTURERAS;

  /**
   * Arreglo que contiene los datos que se mostrarán en la tabla de empresas submanufactureras.
   */
  public empresasSubmanufacturerasTablaDatos: Empresas[] =
    [];

  /**
   * Configuración de columnas para la tabla de plantas manufactureras.
   */
  public configuracionPlantasManufacturerasTabla: ConfiguracionColumna<Plantas>[] =
    CONFIGURACION_PLANTAS_MANUFACTURERAS;

  /**
   * Datos que se mostrarán en la tabla de plantas manufactureras.
   */
  public plantasManufacturerasTablaDatos: Plantas[] = [];

  /**
   * Arreglo que almacena los datos de los servicios IMMEX.
   * 
   * Este arreglo contiene objetos de tipo `ServicioImmex` que representan
   * los servicios relacionados con el programa IMMEX. Se utiliza para
   * gestionar y mostrar la información correspondiente en la tabla de datos.
   */
  public serviciosImmexTablaDatos: ServicioImmex[] = [];

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de la clase `ComplementariaComponent`.
   * 
   * Este constructor inicializa el componente y utiliza el servicio 
   * `ModificacionProgramaImmexBajaSubmanufactureraService` para obtener datos 
   * desde varias URLs específicas. Los datos obtenidos se asignan a diferentes 
   * propiedades del componente.
   * 
   * @param modificacionProgramaImmexBajaSubmanufactureraService - Servicio utilizado 
   * para realizar solicitudes HTTP y obtener datos relacionados con accionistas, 
   * federatarios, plantas IMMEX, empresas submanufactureras, plantas manufactureras 
   * y servicios IMMEX.
   */
  constructor(
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService,
    public tramite80303Querry: Tramite80303Query
  ) {
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'accionistasTablaDatos',
      '/80303/accionistasTablaDatos.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'federatariosTablaDatos',
      '/80303/federatariosTablaDatos.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'plantasIMMEXDatos',
      '/80303/plantasIMMEXDatos.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'empresasSubmanufacturerasTablaDatos',
      '/80303/empresasSubmanufacturerasTablaDatos.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'plantasManufacturerasTablaDatos',
      '/80303/plantasManufacturerasTablaDatos.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'serviciosImmexTablaDatos',
      '/80303/serviciosImmexTablaDatos.json'
    );

    this.tramite80303Querry.selectTramiteState$.pipe(takeUntil(this.destroyNotifier$)).subscribe(state => {
      this.accionistasTablaDatos = state.accionistasTablaDatos;
      this.federatariosTablaDatos = state.federatariosTablaDatos;
      this.plantasIMMEXDatos = state.plantasIMMEXDatos;
      this.empresasSubmanufacturerasTablaDatos = state.empresasSubmanufacturerasTablaDatos;
      this.plantasManufacturerasTablaDatos = state.plantasManufacturerasTablaDatos;
      this.serviciosImmexTablaDatos = state.serviciosImmexTablaDatos;
    });
  }

  /**
* Método que se ejecuta cuando el componente es destruido.
* Notifica a todos los observables que deben completarse y limpia las suscripciones.
*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}