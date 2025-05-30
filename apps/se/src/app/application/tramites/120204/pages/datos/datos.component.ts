import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, map, takeUntil } from 'rxjs';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { ExpedicionCertificadoService } from '../../services/expedicion-certificado.service';
// Importación del componente Solicitante desde la librería compartida
/**
 * Componente DatosComponent.
 * 
 * Este componente se encarga de gestionar la lógica relacionada con los datos
 * en la página correspondiente. Incluye funcionalidades para interactuar con
 * componentes hijos y manejar la selección de pestañas.
 */
@Component({
  selector: 'app-datos', // Selector del componente
  templateUrl: './datos.component.html' // Ruta del archivo HTML asociado al componente
})
export class DatosComponent implements OnInit, OnDestroy{
  /**
   * Índice del subtítulo actual.
   * 
   * Esta variable se utiliza para almacenar el índice de la pestaña seleccionada.
   * Por defecto, se inicializa con el valor 1.
   */
  public indice: number = 1;
  
  /**
   * Estado actual de la consulta para el componente.
   * 
   * @type {ConsultaioState}
   * @public
   */
  public consultaState!:ConsultaioState;

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * 
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones a observables y evitar fugas de memoria.
   * 
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();


  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  
   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 


/**
 * Constructor de la clase DatosComponent.
 * 
 * @param consultaQuery Servicio para realizar consultas relacionadas con el trámite.
 * @param consultaStore Almacén para gestionar el estado de las consultas de trámite.
 * @param productoresService Servicio para la expansión y gestión de productores.
 * @param tramiteStore Almacén específico para el manejo del estado del trámite 120204.
 * 
 * Al inicializar el componente, se establece la consulta inicial en el store de consultas
 * con los parámetros correspondientes al trámite 120204.
 */
constructor(private consultaQuery: ConsultaioQuery,private expedicionService: ExpedicionCertificadoService) {
  }

   /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Suscribe al observable `selectConsultaioState$` para obtener el estado de la consulta y actualizar la propiedad `consultaState`.
   * - Dependiendo del valor de `consultaState.update`, decide si guardar los datos del formulario o mostrar los datos de respuesta.
   * 
   * @returns {void}
   */
   ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState.readonly;

      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Guarda los datos del formulario obteniendo la información de los productores.
   * 
   * Este método realiza una solicitud al servicio `productoresService` para obtener
   * los datos de expansión de productores. Si la respuesta es válida, actualiza
   * el estado interno del componente y almacena los datos relevantes en el store
   * de trámites.
   * 
   * @remarks
   * Utiliza el operador `takeUntil` para cancelar la suscripción cuando el componente
   * se destruye, evitando fugas de memoria.
   * 
   * @returns {void} No retorna ningún valor.
   */
  guardarDatosFormulario(): void {
    this.expedicionService
      .getExpedienteCertificado().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.expedicionService.setDatosFormulario(resp);
        }
      });
  }

  /**
   * Método para seleccionar una pestaña específica.
   * 
   * Este método actualiza el índice de la pestaña seleccionada, permitiendo
   * cambiar entre diferentes vistas o secciones de la interfaz.
   * 
   * @param i - Índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Emite una notificación y completa el observable `destroyNotifier$` para limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
