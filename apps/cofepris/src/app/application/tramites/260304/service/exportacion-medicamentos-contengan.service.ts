import { Tramite260304State, Tramite260304Store } from '../estados/tramite260304Store.store';
import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con la exportación de medicamentos
 * que contienen sustancias controladas (trámite 260304).
 * 
 * Este servicio maneja:
 * - Obtención de datos desde archivos JSON
 * - Actualización del estado del formulario en el store
 * - Gestión de facturadores y otros datos relacionados
 * 
 * @author Sistema VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 */
@Injectable({
  providedIn: 'root',
})
export class ExportacionMedicamentosContenganService {

  /**
   * Ruta base para los archivos JSON utilizados en el trámite 260304.
   * 
   * Esta propiedad almacena la ruta relativa al directorio que contiene
   * todos los archivos JSON necesarios para el funcionamiento del trámite
   * de exportación de medicamentos que contienen sustancias controladas.
   * 
   * @type {string}
   * @private
   * @readonly
   * @example 'assets/json/260304/'
   */
  private jsonUrl = 'assets/json/260304/';
  
  /**
   * Constructor del servicio ExportacionMedicamentosContenganService.
   * 
   * Inicializa el servicio con las dependencias necesarias para realizar
   * operaciones HTTP y gestionar el estado del formulario del trámite 260304.
   * 
   * @param {HttpClient} httpServicios - Cliente HTTP de Angular para realizar peticiones
   * @param {Tramite260304Store} store - Store para gestionar el estado del trámite 260304
   * 
   * @memberof ExportacionMedicamentosContenganService
   * @constructor
   */
  constructor(public httpServicios: HttpClient, public store: Tramite260304Store) {
    // Constructor necesario para inyectar las dependencias del servicio
  }

  /**
   * Obtiene los datos de otros facturadores desde un archivo JSON.
   * 
   * Este método realiza una petición HTTP GET para obtener información
   * de facturadores adicionales desde el archivo 'buscar-otros.json'.
   * La información obtenida puede incluir datos de contacto, direcciones
   * y otros detalles relevantes para el proceso de facturación.
   * 
   * @returns {Observable<Facturador>} Observable que emite los datos del facturador
   * @throws {Error} Error HTTP si la petición falla o el archivo no existe
   * 
   * @example
   * ```typescript
   * this.service.obtenerOstro().subscribe({
   *   next: (facturador) => console.log('Facturador:', facturador),
   *   error: (error) => console.error('Error:', error)
   * });
   * ```
   * 
   * @memberof ExportacionMedicamentosContenganService
   * @public
   */
  obtenerOstro(): Observable<Facturador> {
    return this.httpServicios.get<Facturador>(
      this.jsonUrl + 'buscar-otros.json'
    );
  }

  /**
   * Obtiene los datos del formulario del trámite 260304 desde un archivo JSON.
   * 
   * Este método carga la configuración inicial y los datos del formulario
   * para el trámite de exportación de medicamentos que contienen sustancias
   * controladas desde el archivo 'forma.json'. Los datos incluyen configuraciones
   * de campos, validaciones, opciones predeterminadas y estructura del formulario.
   * 
   * @returns {Observable<Tramite260304State>} Observable que emite el estado completo del trámite
   * @throws {Error} Error HTTP si la petición falla o el archivo no existe
   * 
   * @example
   * ```typescript
   * this.service.getAcuiculturaData().subscribe({
   *   next: (datos) => {
   *     console.log('Datos del formulario:', datos);
   *     this.actualizarEstadoFormulario(datos);
   *   },
   *   error: (error) => console.error('Error al cargar datos:', error)
   * });
   * ```
   * 
   * @memberof ExportacionMedicamentosContenganService
   * @public
   */
  public getAcuiculturaData(): Observable<Tramite260304State> {
    return this.httpServicios.get<Tramite260304State>('assets/json/260304/forma.json');
  }

  /**
   * Actualiza el estado completo del formulario en el store del trámite 260304.
   * 
   * Este método recibe un objeto con el estado completo del formulario y actualiza
   * cada sección del store correspondiente. Gestiona todas las configuraciones
   * del formulario incluyendo datos de destinatarios, mercancías, pagos de derechos,
   * selecciones de otros datos y configuraciones SCIAN.
   * 
   * Las actualizaciones incluyen:
   * - Configuración de opciones de datos
   * - Datos de tabla de destinatarios
   * - Datos de tabla de otros
   * - Selecciones de otros datos y destinatarios
   * - Configuración de datos SCIAN
   * - Configuración de tabla de mercancías
   * - Información de pago de derechos
   * - Pestaña seleccionada actualmente
   * 
   * @param {Tramite260304State} DATOS - Objeto que contiene el estado completo del trámite
   * @param {any} DATOS.opcionConfigDatos - Configuración de opciones de datos
   * @param {any[]} DATOS.destinatarioTableDatos - Datos de la tabla de destinatarios
   * @param {any[]} DATOS.otrosTablaDatos - Datos de la tabla de otros
   * @param {any[]} [DATOS.seleccionadoOtrosDatos] - Datos seleccionados de otros (opcional)
   * @param {any[]} [DATOS.seleccionadoDestinatarioDatos] - Datos seleccionados de destinatarios (opcional)
   * @param {any} DATOS.scianConfigDatos - Configuración de datos SCIAN
   * @param {any} DATOS.tablaMercanciasConfigDatos - Configuración de tabla de mercancías
   * @param {any} DATOS.pagoDerechos - Información de pago de derechos
   * @param {number} [DATOS.tabSeleccionado] - Índice de la pestaña seleccionada (por defecto 0)
   * 
   * @returns {void} No retorna ningún valor
   * 
   * @example
   * ```typescript
   * const estadoFormulario: Tramite260304State = {
   *   opcionConfigDatos: {...},
   *   destinatarioTableDatos: [...],
   *   otrosTablaDatos: [...],
   *   seleccionadoOtrosDatos: [...],
   *   seleccionadoDestinatarioDatos: [...],
   *   scianConfigDatos: {...},
   *   tablaMercanciasConfigDatos: {...},
   *   pagoDerechos: {...},
   *   tabSeleccionado: 1
   * };
   * 
   * this.service.actualizarEstadoFormulario(estadoFormulario);
   * ```
   * 
   * @memberof ExportacionMedicamentosContenganService
   * @public
   */
  public actualizarEstadoFormulario(DATOS: Tramite260304State): void {
    this.store.update((state) => {
     return {
       ...state, ...DATOS
     }
   });
  }
}
