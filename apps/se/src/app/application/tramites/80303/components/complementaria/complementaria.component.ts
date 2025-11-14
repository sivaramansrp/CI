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
  ServiciosImmex,
} from '../../models/complementaria.model';

import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementariaComponent } from '../../../../shared/components/complementaria/complementaria.component';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';

import { Operacions } from '../../../80302/estados/models/plantas-consulta.model';

import { CONFIGURACION_OPERACIONES } from '../../../80302/constantes/modificacion.enum';

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
   * Configuración de las columnas de la tabla para las operaciones.
   * @type {ConfiguracionColumna<Operacions>[]}
   */
  configuracionOperacion: ConfiguracionColumna<Operacions>[] =
    CONFIGURACION_OPERACIONES;
/**
   * Datos de las operaciones obtenidos desde el servicio.
   * @type {Operacions[]}
   */
  datosOperacions: Operacions[] = [];
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
  public serviciosImmexTablaDatos: ServiciosImmex[] = [];

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  certificacionSAT: string = '';

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
     this.fetchAccionistasTablaDatos(); // Fetch accionistas data dynamically
      this.fetchFederatariosTablaDatos(); // Fetch federatarios data dynamically
     this.fetchPlantasIMMEXDatos(); // Fetch plantas IMMEX data dynamically
    this.fetchDatosCertificacionSAT('AAL0409235E6');
     this.fetchEmpresasSubmanufacturerasTablaDatos('202734892'); 

      this.fetchPlantasManufacturerasTablaDatos('202734892,202734901'); 
  
  this.fetchServiciosImmexTablaDatos();

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
 * Fetches data for `plantasManufacturerasTablaDatos` using the API.
 * @param idSolicitud - Comma-separated IDs for the API query.
 */
fetchPlantasManufacturerasTablaDatos(idSolicitud: string): void {
  this.modificacionProgramaImmexBajaSubmanufactureraService
    .consultarPlantasSubmanufactureras(idSolicitud)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(
      (response) => {
        if (response && response.codigo === '00' && response.datos) {
          this.plantasManufacturerasTablaDatos = response.datos; // Assign the `datos` array to the table data
          console.log('Plantas Manufactureras Datos:', this.plantasManufacturerasTablaDatos);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching Plantas Manufactureras Datos:', error);
      }
    );
}
/**
 * Fetches data for `empresasSubmanufacturerasTablaDatos` using the API.
 * @param idSolicitud - The ID for the API query.
 */
fetchEmpresasSubmanufacturerasTablaDatos(idSolicitud: string): void {
  this.modificacionProgramaImmexBajaSubmanufactureraService
    .buscarEmpresaSubmanufacturera(idSolicitud)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(
      (response) => {
        if (response && response.codigo === '00' && response.datos) {
          this.empresasSubmanufacturerasTablaDatos = response.datos; // Assign the `datos` array to the table data
          console.log('Empresas Submanufactureras Datos:', this.empresasSubmanufacturerasTablaDatos);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching Empresas Submanufactureras Datos:', error);
      }
    );
}
fetchServiciosImmexTablaDatos(): void {
  // Construct the payload with the required structure
  const body = {
    idSolicitud: ["3198492", "3198493"], // Array of IDs as required by the API
  };

  // Log the payload for debugging
  console.log('Payload for consultarServiciosImmex:', body);

  // Make the API call
  this.modificacionProgramaImmexBajaSubmanufactureraService
    .consultarServiciosImmex(body)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(
      (response) => {
        if (response && response.codigo === '00' && response.datos) {
          this.serviciosImmexTablaDatos = response.datos; // Assign the `datos` array to the table data
          console.log('Servicios IMMEX Datos:', this.serviciosImmexTablaDatos);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching Servicios IMMEX Datos:', error);
        console.error('Error Details:', error.error); // Log the error details from the API
      }
    );
}
/**
 * Fetches data for `accionistasTablaDatos` using the API.
 */
fetchAccionistasTablaDatos(): void {
  const body = {
    idSolicitud: [202734900, 202734904], // Updated array of IDs
  };

  this.modificacionProgramaImmexBajaSubmanufactureraService
    .buscarSocioAccionista(body)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(
      (response) => {
        if (response && response.codigo === '00' && response.datos) {
          this.accionistasTablaDatos = response.datos; // Assign the `datos` array to the table data
          console.log('Accionistas Tabla Datos:', this.accionistasTablaDatos);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching Accionistas Tabla Datos:', error);
      }
    );
}
/**
 * Fetches data for `federatariosTablaDatos` using the API.
 */
fetchFederatariosTablaDatos(): void {
  const body = {
    idSolicitud: [202734900, 202734904], // Example payload with IDs
  };

  this.modificacionProgramaImmexBajaSubmanufactureraService
    .buscarNotariosConsulta(body)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(
      (response) => {
        if (response && response.codigo === '00' && response.datos) {
          this.federatariosTablaDatos = response.datos; // Assign the `datos` array to the table data
          console.log('Federatarios Tabla Datos:', this.federatariosTablaDatos);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching Federatarios Tabla Datos:', error);
      }
    );
}
/**
 * Fetches data for `plantasIMMEXDatos` using the API.
 */
fetchPlantasIMMEXDatos(): void {
  const body = {
    idSolicitud: [202734892, 202734901], // Example payload with IDs
  };

  this.modificacionProgramaImmexBajaSubmanufactureraService
    .consultarPlantas(body)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(
      (response) => {
        if (response && response.codigo === '00' && response.datos) {
          this.datosOperacions = response.datos; // Assign the `datos` array to the table data
          console.log('Plantas IMMEX Datos:', this.datosOperacions);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching Plantas IMMEX Datos:', error);
      }
    );
}
fetchDatosCertificacionSAT(rfc: string): void {
    this.modificacionProgramaImmexBajaSubmanufactureraService.buscarDatosCertificacionSAT(rfc).subscribe(
      (response) => {

        this.certificacionSAT = response; // Assign the fetched data
        console.log('datosCertificacionSAT:', this.certificacionSAT);
      },
      (error) => {
        console.error('Error fetching datosCertificacionSAT:', error);
      }
    );
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