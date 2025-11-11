import { Anexo, AnexoImportacion, ProductoExportacion } from '../../estados/models/plantas-consulta.model';
import { CONFIGURACION_ANEXOS_IMPORTACION, CONFIGURACION_ANEXOS_SENSIBLES, CONFIGURACION_ANEXOS_TABLA } from '../../constantes/modificacion.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, doDeepCopy, esValidArray, esValidObject } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudService } from '../../service/solicitud.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { Tramite80302Store } from '../../../../estados/tramites/tramite80302.store';

@Component({
  selector: 'app-datos-anexos',
  templateUrl: './datos-anexos.component.html',
  styleUrl: './datos-anexos.component.scss',
  standalone: true,
  imports: [TablaDinamicaComponent, TituloComponent],
})
export class DatosAnexosComponent implements OnInit, OnDestroy {
  /**
   * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
   * Esto evita fugas de memoria al completar las suscripciones al destruir el componente.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla para los anexos.
   * @type {ConfiguracionColumna<Anexo>[]}
   */
  configuracionTablaAnexo: ConfiguracionColumna<ProductoExportacion>[] =
    CONFIGURACION_ANEXOS_TABLA as ConfiguracionColumna<ProductoExportacion>[];

  /**
   * Configuración de las columnas de la tabla para los anexos de importación.
   * @type {ConfiguracionColumna<Anexo>[]}
   */
  configuracionTablaImportacion: ConfiguracionColumna<AnexoImportacion>[] =
    CONFIGURACION_ANEXOS_IMPORTACION as ConfiguracionColumna<AnexoImportacion>[];

    /**
   * Configuración de las columnas de la tabla para los anexos de importación.
   * @type {ConfiguracionColumna<Anexo>[]}
   */
  configuracionTablaSensibles: ConfiguracionColumna<Anexo>[] =
    CONFIGURACION_ANEXOS_SENSIBLES;

  /**
   * Datos de los anexos obtenidos desde el servicio.
   * @type {Anexo[]}
   */
  datosAnexo: ProductoExportacion[] = [];

  /**
   * Lista de anexos relacionados con la importación.
   * 
   * Esta propiedad almacena un arreglo de objetos de tipo `Anexo` que contienen
   * la información relevante sobre los documentos o archivos anexados para el proceso de importación.
   */
  datosImportacion: AnexoImportacion[] = [];

  /**
   * Lista de anexos que contienen datos sensibles.
   * 
   * @remarks
   * Esta propiedad almacena los objetos de tipo `Anexo` que han sido identificados como sensibles.
   * Se utiliza para gestionar y mostrar información que requiere un tratamiento especial debido a su naturaleza confidencial.
   */
  datosSensibles: Anexo[] = []; 

  /**
   * Constructor de la clase DatosAnexosComponent.
   * 
   * @param solicitudService Servicio para gestionar las solicitudes.
   * @param toastr Servicio para mostrar notificaciones al usuario.
   */
  constructor(
    public solicitudService: SolicitudService,
    private toastr: ToastrService,
    private tramite80302Store: Tramite80302Store,
  ) {
   
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a `obteneComplimentaria()` para cargar los anexos complementarios al iniciar el componente.
   */
  ngOnInit(): void {
     this.obteneComplimentaria(); // Carga los anexos complementarios.
     this.obtenerAnexoImportacion(); // Carga los anexos de importación.
  }

  /**
   * Método que obtiene los anexos complementarios desde el servicio.
   * Asigna los datos a las variables `datosAnexo` y `datosImportacion`.
   */
  obteneComplimentaria(): void {
    const PARAMS = { idSolicitud: `202767359,202767710` };
    this.solicitudService.obtenerAnexoExportacion(PARAMS)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data) => {
          if(esValidObject(data)) {
            const RESPONSE = doDeepCopy(data);
            if(esValidArray(RESPONSE.datos)) {
              this.datosAnexo = RESPONSE.datos.filter(
                (obj: ProductoExportacion) => Object.values(obj).some(value => value !== null)
              ); // Almacena los datos de operaciones.
              this.tramite80302Store.setDatosAnexo(this.datosAnexo);
            }
          }
        },
        () => {
          this.toastr.error('Error al cargar los anexos de exportación');
        }
      );
  }

  /**
   * Método que obtiene los anexos de importación desde el servicio.
   * Asigna los datos a la variable `datosImportacion`.
   */
  obtenerAnexoImportacion(): void {
    const PARAMS = { idSolicitud: `202767359,202767710` };
    this.solicitudService.obtenerAnexoImportacion(PARAMS)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data) => {
          if(esValidObject(data)) {
            const RESPONSE = doDeepCopy(data);
            if(esValidArray(RESPONSE.datos)) {
              this.datosImportacion = RESPONSE.datos.filter(
                (obj: AnexoImportacion) => Object.values(obj).some(value => value !== null)
              ); // Almacena los datos de operaciones.
              this.tramite80302Store.setDatosImportacion(this.datosImportacion);
            }
          }
        },
        () => {
          this.toastr.error('Error al cargar los anexos de importación');
        }
      );
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.complete(); // Finaliza el Subject para evitar fugas de memoria.
  }
}
