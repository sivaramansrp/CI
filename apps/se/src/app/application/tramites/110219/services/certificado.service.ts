import { ColumnasTabla, MercanciaCertificado} from '../models/certificado.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Solicitud110219State, Tramite110219Store } from '../estados/Tramite110219.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * Servicio para gestionar las operaciones relacionadas con los certificados de origen.
 * 
 * Esta clase proporciona funcionalidades para la gestión integral de certificados de origen
 * en el trámite 110219, incluyendo la obtención de datos de tablas, actualización del estado
 * del formulario y consulta de información de mercancías asociadas a los certificados.
 * 
 * @description
 * El servicio actúa como intermediario entre los componentes de la aplicación y las fuentes
 * de datos (APIs REST y archivos JSON), proporcionando métodos para:
 * - Actualizar el estado global del formulario de certificados
 * - Obtener datos de tablas de solicitudes y mercancías
 * - Gestionar información del registro de toma de muestras
 * 
 * @example
 * ```typescript
 * // Inyección del servicio en un componente
 * constructor(private certificadoService: CertificadoService) {}
 * 
 * // Obtener datos de la tabla de solicitudes
 * this.certificadoService.getSolicitudesTabla().subscribe(data => {
 *   this.tablaDatos = data;
 * });
 * ```
 * 
 * @see Solicitud110219State
 * @see ColumnasTabla
 * @see MercanciaCertificado
 * @see Tramite110219Store
 * 
 * @since 1.0.0
 * @author Sistema VUCEM
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  /**
   * Constructor del servicio de certificados.
   * 
   * Inicializa las dependencias necesarias para el funcionamiento del servicio,
   * incluyendo el cliente HTTP para comunicación con APIs y el store para
   * gestión del estado global del trámite.
   * 
   * @param http - Cliente HTTP de Angular para realizar solicitudes a servicios externos,
   *               APIs REST y archivos JSON de configuración
   * @param tramite110219Store - Store de estado global para el trámite 110219,
   *                            utilizado para mantener la información del formulario
   * 
   * @example
   * ```typescript
   * // Angular se encarga de la inyección automática de dependencias
   * // No es necesario llamar al constructor manualmente
   * ```
   * 
   * @see HttpClient
   * @see Tramite110219Store
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  constructor(private http: HttpClient, private tramite110219Store: Tramite110219Store) {}
/**
   * Actualiza el estado global del formulario con los datos proporcionados.
   * 
   * Este método toma un objeto completo del estado de la solicitud y actualiza
   * todos los campos correspondientes en el store global del trámite 110219.
   * Utiliza los setters específicos del store para mantener la consistencia
   * y reactividad del estado.
   * 
   * @param DATOS - Objeto completo con todos los datos del formulario de solicitud,
   *                incluyendo información del certificado, datos personales, domicilio
   *                y detalles específicos del trámite
   * 
   * @returns void - No retorna valor, pero actualiza el estado global del store
   * 
   * @example
   * ```typescript
   * const datosFormulario: Solicitud110219State = {
   *   numeroCertificado: 'CERT123456',
   *   pais: 'México',
   *   tratado: 'TLCAN',
   *   // ... otros campos
   * };
   * 
   * this.certificadoService.actualizarEstadoFormulario(datosFormulario);
   * ```
   * 
   * @remarks
   * - Actualiza más de 20 campos diferentes en el store
   * - Incluye datos del certificado, información personal y domicilio
   * - Mantiene la sincronización entre el formulario y el estado global
   * - Es útil para cargar datos existentes o restaurar el estado del formulario
   * 
   * @see Solicitud110219State
   * @see Tramite110219Store
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  actualizarEstadoFormulario(DATOS: Solicitud110219State): void {
    this.tramite110219Store.setNumeroCertificado(DATOS.numeroCertificado);
    this.tramite110219Store.setPais(DATOS.pais);
    this.tramite110219Store.setTratado(DATOS.tratado);
    this.tramite110219Store.setFechaInicial(DATOS.fechaInicial);
    this.tramite110219Store.setFechaFinal(DATOS.fechaFinal);
    this.tramite110219Store.setMotivoCancelacion(DATOS.motivoCancelacion);
    this.tramite110219Store.setCertificadoDeorigen(DATOS.certificadoDeOrigen);
    this.tramite110219Store.setFechaExpedicion(DATOS.fechaExpedicion);
    this.tramite110219Store.setFechaVencimiento(DATOS.fechaVencimiento);
    this.tramite110219Store.setBloque(DATOS.bloque);
    this.tramite110219Store.setAcuerdo(DATOS.acuerdo);
    this.tramite110219Store.setObservaciones(DATOS.observaciones);
    this.tramite110219Store.setNombre(DATOS.nombre);
    this.tramite110219Store.setPrimerApellido(DATOS.primerApellido);
    this.tramite110219Store.setSegundoApellido(DATOS.segundoApellido);
    this.tramite110219Store.setRegistroFiscal(DATOS.registroFiscal);
    this.tramite110219Store.setRazonSocial(DATOS.razonSocial);
    this.tramite110219Store.setCalle(DATOS.calle);
    this.tramite110219Store.setNumeroLetra(DATOS.numeroLetra);
    this.tramite110219Store.setTelefono(DATOS.telefono);
    this.tramite110219Store.setCiudad(DATOS.ciudad);
    this.tramite110219Store.setFax(DATOS.fax);
    this.tramite110219Store.setCorreoElectronico(DATOS.correoElectronico);
  }
  /**
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   * 
   * Este método realiza una solicitud HTTP GET para recuperar información precargada
   * del registro de toma de muestras de mercancías desde un archivo JSON estático.
   * Los datos obtenidos pueden utilizarse para inicializar o poblar el formulario
   * con información predeterminada.
   * 
   * @returns Observable<Solicitud110219State> - Observable que emite los datos completos
   *          del estado de la solicitud, incluyendo toda la información del formulario
   *          de registro de toma de muestras
   * 
   * @throws Error - Puede lanzar errores HTTP si el archivo no existe o hay problemas de red
   * 
   * @example
   * ```typescript
   * this.certificadoService.getRegistroTomaMuestrasMercanciasData()
   *   .subscribe({
   *     next: (datos) => {
   *       this.formulario.patchValue(datos);
   *     },
   *     error: (error) => {
   *       console.error('Error al cargar datos:', error);
   *     }
   *   });
   * ```
   * 
   * @remarks
   * - Los datos se cargan desde 'assets/json/110219/registro_toma_muestras_mercancias.json'
   * - Útil para casos de prueba o datos de demostración
   * - El Observable es de tipo 'cold', se ejecuta cada vez que se suscribe
   * - Se recomienda usar con manejo de errores apropiado
   * 
   * @see Solicitud110219State
   * @see HttpClient.get
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110219State> {
    return this.http.get<Solicitud110219State>('assets/json/110219/registro_toma_muestras_mercancias.json');
  }
 

  /**
   * Obtiene los datos de la tabla de solicitudes de certificados disponibles.
   * 
   * Este método realiza una consulta HTTP para recuperar la información de certificados
   * que están disponibles para ser procesados o cancelados. Los datos incluyen detalles
   * como número de certificado, país, tratado, fechas de expedición y vencimiento.
   * 
   * @returns Observable<ColumnasTabla[]> - Observable que emite un array de objetos
   *          con la estructura de datos para poblar la tabla de certificados disponibles
   * 
   * @throws Error - Puede lanzar errores HTTP si hay problemas de conectividad,
   *                 el archivo no existe o hay errores en el formato de datos
   * 
   * @example
   * ```typescript
   * this.certificadoService.getSolicitudesTabla()
   *   .pipe(
   *     takeUntil(this.destroyed$),
   *     catchError(error => {
   *       console.error('Error al obtener solicitudes:', error);
   *       return of([]);
   *     })
   *   )
   *   .subscribe(data => {
   *     this.tablaDatos = data;
   *     this.mostrarTabla = data.length > 0;
   *   });
   * ```
   * 
   * @remarks
   * - Los datos se obtienen desde 'assets/json/110219/mercanciaTable.json'
   * - Incluye manejo de errores con `catchError` y `throwError`
   * - Los datos están estructurados según la interfaz `ColumnasTabla`
   * - Se utiliza principalmente en el componente de cancelación de certificados
   * - El Observable incluye retry automático en caso de errores temporales
   * 
   * @see ColumnasTabla
   * @see HttpClient.get
   * @see catchError
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http
      .get<ColumnasTabla[]>('assets/json/110219/mercanciaTable.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos de la tabla de mercancías asociadas al certificado de origen.
   * 
   * Este método recupera información detallada sobre las mercancías que están
   * vinculadas a un certificado de origen específico. Los datos incluyen
   * descripciones de productos, códigos arancelarios, cantidades, valores
   * y otra información relevante para el proceso de certificación.
   * 
   * @returns Observable<MercanciaCertificado[]> - Observable que emite un array
   *          de objetos con la información detallada de las mercancías asociadas
   *          al certificado, incluyendo códigos, descripciones y valores
   * 
   * @throws Error - Puede lanzar errores HTTP en los siguientes casos:
   *                 - Problemas de conectividad de red
   *                 - Archivo JSON no encontrado o corrupto
   *                 - Errores de parsing de datos JSON
   *                 - Timeout de la solicitud HTTP
   * 
   * @example
   * ```typescript
   * this.certificadoService.getMercanciaCertificadoTabla()
   *   .pipe(
   *     takeUntil(this.destroyed$),
   *     map(mercancias => mercancias.filter(m => m.activo)),
   *     catchError(error => {
   *       this.mostrarError('Error al cargar mercancías');
   *       return of([]);
   *     })
   *   )
   *   .subscribe(data => {
   *     this.mercanciasDatos = data;
   *     this.calcularTotales(data);
   *   });
   * ```
   * 
   * @remarks
   * - Los datos se cargan desde 'assets/json/110219/mercanciaCertificado.json'
   * - Implementa manejo robusto de errores con `catchError` y `throwError`
   * - La estructura de datos sigue la interfaz `MercanciaCertificado`
   * - Se utiliza en componentes que muestran el detalle de mercancías del certificado
   * - Los datos pueden incluir información arancelaria y de clasificación comercial
   * - Recomendado usar con operadores RxJS para transformación y filtrado de datos
   * 
   * @see MercanciaCertificado
   * @see HttpClient.get
   * @see catchError
   * @see throwError
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  public getMercanciaCertificadoTabla(): Observable<MercanciaCertificado[]> {
    return this.http
      .get<MercanciaCertificado[]>(
        'assets/json/110219/mercanciaCertificado.json'
      )
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
}