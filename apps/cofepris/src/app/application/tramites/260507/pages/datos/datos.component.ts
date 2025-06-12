import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { FormularioDinamico } from '@ng-mf/data-access-user';
// import { ImportacionPlafestService } from '../../services/importacion-plafest.service';



/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``
})
export class DatosComponent implements OnInit, OnDestroy {

   /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;
  /** 
   * Configuración del formulario para la persona moral 
   */
  persona: FormularioDinamico[] = [];

  /** 
   * Configuración del formulario para el domicilio fiscal 
   */
  domicilioFiscal: FormularioDinamico[] = [];

 /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * Estado actual de la consulta obtenido desde el store.
 *
 * Esta propiedad almacena el estado completo de la consulta (`ConsultaioState`), 
 * el cual es actualizado mediante la suscripción al observable `selectConsultaioState$`
 * del servicio `ConsultaioQuery`. Se utiliza para determinar si se deben cargar datos
 * adicionales o mostrar información de respuesta en el formulario.
 *
 * @type {ConsultaioState}
 * @memberof PasoUnoComponent
 */
  public consultaState!: ConsultaioState;

  /**
   * Actualiza el índice de la pestaña seleccionada.
   *
   * Este método recibe un número que representa el índice de la pestaña a activar
   * y actualiza la propiedad "indice" con dicho valor.
   *
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   * @memberof PasoUnoComponent
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }


  /**
 * Constructor del componente PasoUnoComponent.
 *
 * Inyecta los servicios necesarios para la gestión de permisos de hidrocarburos, 
 * la manipulación de datos del trámite y la consulta del estado desde el store.
 * La inicialización específica se realiza en los métodos del ciclo de vida del componente.
 *
 * @param {ImportacionPlafestService} importacionPlafestSvc Servicio para operaciones de permisos de hidrocarburos.
 * @param {Solocitud260507Service} solocitud260507Service Servicio para manipulación de datos del trámite 260507.
 * @param {ConsultaioQuery} consultaQuery Servicio para consultar el estado de la solicitud desde el store.
 * @memberof PasoUnoComponent
 */
  constructor(
    private solocitud260507Service: Solocitud260507Service,
    private consultaQuery: ConsultaioQuery
  ) { }

  /**
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 *
 * Se suscribe al observable `selectConsultaioState$` del servicio `ConsultaioQuery` para obtener el estado actual de la consulta
 * y actualizar la propiedad `consultaState`. Dependiendo del valor de `update` en el estado, decide si cargar los datos del formulario
 * o mostrar la información de respuesta.
 *
 * @memberof PasoUnoComponent
 */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud260507Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud260507Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Se utiliza para liberar recursos y evitar fugas de memoria, completando el Subject destroyNotifier$.
   * Esto asegura que todas las suscripciones que dependen de este Subject se cancelen correctamente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}