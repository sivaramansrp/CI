import {
  CONFIGURACION_CONTRIBUYENTES_ACCIONISTAS,
  CONFIGURACION_EMPRESAS_SUBMANUFACTURERAS,
  CONFIGURACION_FEDERATARIOS,
  CONFIGURACION_FEDERATARIOS_DOMICILIO,
  CONFIGURACION_PLANTAS_MANUFACTURERAS,
  CONFIGURACION_SERVICIOS_IMMEX,
} from '../../constants/complementaria.enum';
import { Component, OnDestroy } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  DatosContribuyente,
  DatosEmpresaSubmanufacturera,
  DatosPlantaManufacturera,
  Federatario,
  FederatarioRealizaranLasOperaciones,
  ServicioImmex,
} from '../../models/complementaria.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';
import { signal } from '@angular/core';

@Component({
  selector: 'app-complementaria',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './complementaria.component.html',
  styleUrl: './complementaria.component.scss',
})
export class ComplementariaComponent implements OnDestroy {
  /**
   * Señal que representa el estado de certificación SAT.
   * 
   * @type {Signal<string>}
   * @valor Inicialmente configurado con el valor 'Sí'.
   * 
   * Esta señal se utiliza para indicar si la certificación SAT está activa o no.
   */
  public certificacionSAT$ = signal('Sí');

  /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  public tablaSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * Configuración de la tabla para los accionistas.
   * 
   * Esta propiedad define la configuración de las columnas para mostrar
   * los datos de los contribuyentes accionistas en la tabla. Utiliza
   * una estructura de configuración predefinida que se encuentra en
   * `CONFIGURACION_CONTRIBUYENTES_ACCIONISTAS`.
   * 
   * @type {ConfiguracionColumna<DatosContribuyente>[]} 
   */
  public configuracionAccionistasTabla: ConfiguracionColumna<DatosContribuyente>[] =
    CONFIGURACION_CONTRIBUYENTES_ACCIONISTAS;

  /**
   * Arreglo que almacena los datos de los accionistas relacionados con el contribuyente.
   * 
   * Este arreglo contiene objetos de tipo `DatosContribuyente` que representan la información
   * detallada de cada accionista. Se utiliza para gestionar y mostrar los datos de los accionistas
   * en la tabla correspondiente dentro del componente.
   */
  public accionistasTablaDatos: DatosContribuyente[] = [];

  /**
   * Arreglo que almacena los datos seleccionados de los accionistas en la tabla.
   * 
   * Este arreglo contiene objetos de tipo `DatosContribuyente` que representan
   * la información de los accionistas seleccionados por el usuario en la interfaz.
   */
  public accionistasTablaSeleccionada: DatosContribuyente[] = [];

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
   * Arreglo que almacena los federatarios seleccionados en la tabla.
   * 
   * Este arreglo se utiliza para gestionar los federatarios que han sido seleccionados
   * por el usuario en la interfaz de usuario. Cada elemento del arreglo es una instancia
   * de la clase `Federatario`.
   */
  public federatariosTablaSeleccionada: Federatario[] = [];

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
   * Arreglo que almacena las plantas IMMEX seleccionadas para realizar operaciones.
   * 
   * Cada elemento del arreglo es de tipo `FederatarioRealizaranLasOperaciones`, 
   * que representa la información de las plantas seleccionadas.
   * 
   * Este arreglo se utiliza para gestionar y procesar las plantas IMMEX 
   * asociadas a las operaciones complementarias dentro del componente.
   */
  public plantasIMMEXSeleccionada: FederatarioRealizaranLasOperaciones[] = [];

  /**
   * Configuración de columnas para la tabla de empresas submanufactureras.
   * Define cómo se mostrarán los datos en la tabla dinámica.
   */
  public configuracionEmpresasSubmanufacturerasTabla: ConfiguracionColumna<DatosEmpresaSubmanufacturera>[] =
    CONFIGURACION_EMPRESAS_SUBMANUFACTURERAS;

  /**
   * Arreglo que contiene los datos que se mostrarán en la tabla de empresas submanufactureras.
   */
  public empresasSubmanufacturerasTablaDatos: DatosEmpresaSubmanufacturera[] =
    [];

  /**
   * Arreglo que almacena las filas seleccionadas por el usuario desde la tabla dinámica.
   * Se actualiza cada vez que el usuario selecciona una fila.
   */
  public empresasSubmanufacturerasTablaSeleccionada: DatosEmpresaSubmanufacturera[] =
    [];

  /**
   * Configuración de columnas para la tabla de plantas manufactureras.
   */
  public configuracionPlantasManufacturerasTabla: ConfiguracionColumna<DatosPlantaManufacturera>[] =
    CONFIGURACION_PLANTAS_MANUFACTURERAS;

  /**
   * Datos que se mostrarán en la tabla de plantas manufactureras.
   */
  public plantasManufacturerasTablaDatos: DatosPlantaManufacturera[] = [];

  /**
   * Filas seleccionadas por el usuario en la tabla de plantas manufactureras.
   */
  public plantasManufacturerasTablaSeleccionada: DatosPlantaManufacturera[] =
    [];

  /**
   * Configuración de la tabla para los servicios IMMEX.
   * 
   * Esta propiedad define la configuración de las columnas para la tabla
   * que muestra los servicios IMMEX. Utiliza un arreglo de objetos de tipo
   * `ConfiguracionColumna<ServicioImmex>` que se inicializa con la constante
   * `CONFIGURACION_SERVICIOS_IMMEX`.
   */
  public configuracionServiciosImmexTabla: ConfiguracionColumna<ServicioImmex>[] =
    CONFIGURACION_SERVICIOS_IMMEX;

  /**
   * Arreglo que almacena los datos de los servicios IMMEX.
   * 
   * Este arreglo contiene objetos de tipo `ServicioImmex` que representan
   * los servicios relacionados con el programa IMMEX. Se utiliza para
   * gestionar y mostrar la información correspondiente en la tabla de datos.
   */
  public serviciosImmexTablaDatos: ServicioImmex[] = [];

  /**
   * Arreglo que almacena los servicios seleccionados de tipo Immex en la tabla.
   * 
   * Este arreglo se utiliza para gestionar los servicios Immex que han sido seleccionados
   * por el usuario en la interfaz de usuario. Cada elemento del arreglo es una instancia
   * de la clase `ServicioImmex`.
   */
  public serviciosImmexTablaSeleccionada: ServicioImmex[] = [];

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

  onInputChange(event: Event): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    if (INPUT_ELEMENT) {
      this.certificacionSAT$.set(INPUT_ELEMENT.value);
    }
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
