import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { ExportacionMateriasPrimasService } from '../../service/exportacion-materias-primas.service';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';

/**
 * Componente PasoUnoComponent
 * 
 * Este componente maneja el primer paso del trámite 260302 para la exportación de materias primas.
 * Implementa las interfaces OnInit y OnDestroy para gestionar correctamente el ciclo de vida del componente.
 * Se encarga de la gestión de pestañas, carga de datos del formulario y manejo del estado de consulta.
 * 
 * @implements {OnInit} - Interface que define el método ngOnInit para la inicialización del componente
 * @implements {OnDestroy} - Interface que define el método ngOnDestroy para la limpieza de recursos
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {

  /**
   * Estado actual de la consulta que almacena información sobre el trámite en curso.
   * Esta propiedad contiene el estado completo de la consulta incluyendo el ID del procedimiento,
   * información de actualización y otros datos relevantes para el trámite 260302.
   * 
   * @type {ConsultaioState}
   * @public
   */
  public consultaState!: ConsultaioState;

  /**
   * Indicador booleano que determina si los datos mostrados provienen de una respuesta del servidor.
   * Cuando es true, indica que el formulario ha sido poblado con datos recuperados del backend.
   * Cuando es false, indica que el formulario está en su estado inicial sin datos del servidor.
   * 
   * @type {boolean}
   * @public
   * @default false
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Índice numérico que identifica la pestaña actualmente seleccionada en la interfaz.
   * Se utiliza para controlar qué sección del formulario está visible y activa.
   * Puede ser undefined durante la inicialización del componente.
   * 
   * @type {number | undefined}
   * @public
   * @default 1
   */
  indice: number | undefined = 1;

  /**
   * Subject utilizado como notificador para gestionar la destrucción de observables.
   * Este Subject emite una señal cuando el componente es destruido, permitiendo que
   * todos los observables suscritos se desuscriban automáticamente para evitar fugas de memoria.
   * Es una práctica recomendada para el manejo adecuado de suscripciones en Angular.
   * 
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoUnoComponent.
   * 
   * Inicializa todas las dependencias necesarias para el funcionamiento del componente
   * y establece la suscripción al estado de consulta para monitorear cambios en el trámite.
   * Cuando detecta que el procedureId es '260302' y hay una actualización pendiente,
   * automáticamente carga los datos del formulario desde el servidor.
   * 
   * @param {Tramite260302Query} tramite260302Query - Servicio de consulta para obtener datos del trámite 260302
   * @param {Tramite260302Store} tramite260302Store - Store para gestionar el estado del trámite 260302
   * @param {ConsultaioQuery} consultaQuery - Servicio de consulta para obtener el estado general de consultas
   * @param {ExportacionMateriasPrimasService} exportacionMateriasPrimasServiceService - Servicio para operaciones relacionadas con exportación de materias primas
   */
  constructor(
    private tramite260302Query:Tramite260302Query,
    private tramite260302Store: Tramite260302Store,
    private consultaQuery: ConsultaioQuery,
    private exportacionMateriasPrimasServiceService: ExportacionMateriasPrimasService,    
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$)).subscribe((seccionState) => {
      this.consultaState = seccionState;
      if (this.consultaState && this.consultaState.procedureId === '260302' &&
        this.consultaState.update) {
        this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
    }); 
  }

  /**
   * Método para cargar y guardar los datos del formulario desde el servidor.
   * 
   * Este método se ejecuta cuando se detecta que hay una actualización pendiente para el trámite 260302.
   * Realiza una petición al servicio de exportación de materias primas para obtener los datos del trámite,
   * y si la respuesta es exitosa, actualiza el estado del formulario y marca que los datos provienen del servidor.
   * Utiliza el patrón takeUntil para asegurar que la suscripción se cancele cuando el componente sea destruido.
   * 
   * @returns {void} No retorna ningún valor
   */
  guardarDatosFormulario(): void {
   this.exportacionMateriasPrimasServiceService
     .getTramiteDatos().pipe(
       takeUntil(this.destroyNotifier$)
     )
     .subscribe((resp) => {
       if(resp){
       this.esDatosRespuesta = true;
       this.exportacionMateriasPrimasServiceService.actualizarEstadoFormulario(resp);
       }
     });
 }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de la inicialización del componente.
   * 
   * Se suscribe al observable `getTabSeleccionado$` del query del trámite 260302 para monitorear
   * cambios en la pestaña seleccionada. Cuando se detecta un cambio, actualiza la propiedad `indice`
   * con el nuevo valor de la pestaña seleccionada. La suscripción se gestiona correctamente utilizando
   * el operador `takeUntil` para evitar fugas de memoria cuando el componente sea destruido.
   * 
   * @implements {OnInit}
   * @returns {void} No retorna ningún valor
   */
  ngOnInit(): void {
      this.tramite260302Query.getTabSeleccionado$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((tab) => {
          this.indice = tab;
        });
  }

  /**
   * Método para seleccionar y activar una pestaña específica en la interfaz.
   * 
   * Este método recibe un índice numérico que representa la pestaña que se desea activar.
   * Actualiza el estado global del trámite a través del store, lo que provoca que todos los
   * componentes suscritos al estado de la pestaña seleccionada reciban la actualización.
   * Es el método principal para la navegación entre diferentes secciones del formulario.
   * 
   * @param {number} i - El índice de la pestaña que se desea seleccionar (debe ser un número entero positivo)
   * @returns {void} No retorna ningún valor
   */
  seleccionaTab(i: number): void {
      this.tramite260302Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta inmediatamente antes de la destrucción del componente.
   * 
   * Este método es fundamental para la gestión adecuada de la memoria y recursos del componente.
   * Emite una señal a través del Subject `destroyNotifier$` para notificar a todas las suscripciones
   * activas que deben cancelarse, y luego completa el Subject para liberar completamente los recursos.
   * Esta implementación previene fugas de memoria que podrían ocurrir si las suscripciones permanecieran
   * activas después de la destrucción del componente.
   * 
   * @implements {OnDestroy}
   * @returns {void} No retorna ningún valor
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
