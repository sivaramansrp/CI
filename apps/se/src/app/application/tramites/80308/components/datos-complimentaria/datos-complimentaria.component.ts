import {
  CONFIGURACION_ACCIONISTAS,
  CONFIGURACION_ANEXOS_IMMEX,
  CONFIGURACION_FEDERETARIOS,
  CONFIGURACION_OPERACIONES,
  CONFIGURACION_SERVICIOS,
} from '../../constantes/modificacion.enum';
import {
  Complimentaria,
  DatosDelModificacion,
  DatosDelModificaciondos,
  DatosImmex,
  Federetarios,
  Operacions,
} from '../../models/plantas-consulta.model';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { DatosCertificacionComponent } from '../datos-certificacion/datos-certificacion.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-complimentaria',
  templateUrl: './datos-complimentaria.component.html',
  styleUrl: './datos-complimentaria.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    DatosCertificacionComponent,
    TablaDinamicaComponent,
  ],
  providers: [ModificacionSolicitudeService, ToastrService],
})
export class DatosComplimentariaComponent implements OnDestroy {
  /**
   * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
   * Esto ayuda a prevenir fugas de memoria al completar las suscripciones al destruir el componente.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla para los accionistas (Complimentaria).
   * @type {ConfiguracionColumna<Complimentaria>[]}
   */
  configuracionTabla: ConfiguracionColumna<Complimentaria>[] =
    CONFIGURACION_ACCIONISTAS;

  /**
   * Configuración de las columnas de la tabla para los federetarios.
   * @type {ConfiguracionColumna<Federetarios>[]}
   */
  configuracionFederetios: ConfiguracionColumna<Federetarios>[] =
    CONFIGURACION_FEDERETARIOS;

/**
       * Configuración de las columnas de la tabla para los anexos de importación.
       * @type {ConfiguracionColumna<DatosImmex>[]}
       */
      configuracionTablaImmex: ConfiguracionColumna<DatosImmex>[] =
        CONFIGURACION_ANEXOS_IMMEX;
  /**
   * Datos de los federetarios obtenidos desde el servicio.
   * @type {Federetarios[]}
   */
  datosFederetarios: Federetarios[] = [];

  /**
   * Datos de las operaciones obtenidos desde el servicio.
   * @type {Operacions[]}
   */
  datosOperacions: Operacions[] = [];

  /**
   * Datos de la complimentaria obtenidos desde el servicio.
   * @type {Complimentaria[]}
   */
  datosComplimentaria: Complimentaria[] = [];

   /**
   * Datos de los anexos de fracción obtenidos desde el servicio.
   * @type {FracciónArancelaria[]}
   */
  datosImmex: DatosImmex[] = [];


  
      /**
     * Datos de las operaciones obtenidos desde el servicio.
     * @type {Operacions[]}
     */
    datosPlanta: Operacions[] = [];

     /**
       * Arreglo que contiene los datos de modificación relacionados con los servicios.
       * 
       * @type {DatosDelModificacion[]}
       */
      datosServicios: DatosDelModificacion[] = [];

        /**
         * Configuración de las columnas de la tabla para las operaciones.
         * @type {ConfiguracionColumna<Operacions>[]}
         */
        configuracionOperacion: ConfiguracionColumna<Operacions>[] =
          CONFIGURACION_OPERACIONES;

           /**
             * Configuración de las columnas para los datos de modificación.
             * 
             * Esta propiedad utiliza una configuración predefinida (`CONFIGURACION_SERVICIOS`)
             * para definir las columnas que se mostrarán en el componente. 
             * Cada columna está configurada utilizando el tipo `ConfiguracionColumna<DatosDelModificacion>`.
             */
            configuracionServicios: ConfiguracionColumna<DatosDelModificacion>[] =
              CONFIGURACION_SERVICIOS;

  constructor(
    public modificionService: ModificacionSolicitudeService,
    private toastr: ToastrService
  ) {
    this.obtenerFederetarios(); // Carga los federetarios.
    this.obtenerOperacions(); // Carga las operaciones.
    this.obtenerComplimentaria(); // Carga los datos de complimentaria.
    this.obtenerImmexdata(); // Carga los datos de anexos.
    this.obtenerServicios(); // Carga los datos de servicios.
  }


  /**
   * Método que obtiene los datos de complimentaria desde el servicio.
   * Asigna los datos obtenidos a la variable `datosComplimentaria`.
   */
  obtenerComplimentaria(): void {
    this.modificionService
      .obtenerComplimentaria() // Llama al servicio para obtener los datos de complimentaria.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Complimentaria[]) => {
          this.datosComplimentaria = [...data]; // Almacena los datos de complimentaria.
        },
        () => {
          this.toastr.error('Error al cargar los datos de complimentaria'); // Manejo de errores.
        }
      );
  }

  /**
   * Método que obtiene los datos de federetarios desde el servicio.
   * Asigna los datos obtenidos a la variable `datosFederetarios`.
   */
  obtenerFederetarios(): void {
    this.modificionService
      .obtenerFederetarios() // Llama al servicio para obtener los datos de federetarios.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Federetarios[]) => {
          this.datosFederetarios = [...data]; // Almacena los datos de federetarios.
        },
        () => {
          this.toastr.error('Error al cargar los federetarios'); // Manejo de errores.
        }
      );
  }

  /**
   * Método que obtiene los datos de operaciones desde el servicio.
   * Asigna los datos obtenidos a la variable `datosOperacions`.
   */
  obtenerOperacions(): void {
    this.modificionService
      .obtenerOperacion() // Llama al servicio para obtener los datos de operaciones.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Operacions[]) => {
          this.datosOperacions = [...data]; // Almacena los datos de operaciones.
        },
        () => {
          this.toastr.error('Error al cargar las operaciones'); // Manejo de errores.
        }
      );
  }

   /**
   * Método que obtiene los anexos complementarios desde el servicio.
   * Asigna los datos a las variables `datosAnexo` y `datosImportacion`.
   */
  obtenerImmexdata(): void {
    this.modificionService
      .obtenerImmex() // Llama al servicio para obtener los anexos.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: DatosImmex[]) => {
          this.datosImmex = [...data]; // Almacena los datos de anexos complementarios.
        },
        () => {
          this.toastr.error('Error al cargar los anexos'); // Manejo de errores.
        }
      );
  }

  /**
     * Obtiene los servicios relacionados con la solicitud actual.
     * 
     * Este método realiza una llamada al servicio `solicitudService` para obtener
     * los datos de las operaciones y los almacena en la propiedad `datosServicios`.
     * Además, gestiona la suscripción para que se cancele automáticamente cuando
     * el componente se destruya, evitando posibles fugas de memoria.
     * 
     * En caso de error durante la obtención de los datos, se muestra un mensaje
     * de error al usuario utilizando el servicio `toastr`.
     * 
     * @returns {void} Este método no devuelve ningún valor.
     */
    obtenerServicios(): void {
      this.modificionService.obtenerServicios().pipe(takeUntil(this.destroyNotifier$)).subscribe((data: DatosDelModificaciondos[]) => {
            this.datosServicios = [...data]; // Almacena los datos de operaciones.
          },
          () => {
            this.toastr.error('Error al cargar las operaciones'); // Manejo de errores.
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
