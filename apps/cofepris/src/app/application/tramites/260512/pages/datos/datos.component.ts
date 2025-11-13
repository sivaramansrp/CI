import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionVisibilidad, DEFAULT_CONFIGURACION_VISIBILIDAD } from '../../constantes/constante260512.enum';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosDeLaComponent } from '../../../../shared/components/datos-solicitud/datos-solicitud.component';
import { DatosDomicilioLegalState } from '../../../../shared/estados/stores/datos-domicilio-legal.store';
import { SolicitudService } from '../../../../shared/services/solicitud.service';
import { SolicitudState } from '../../../../shared/estados/stores/aviso-calidad.store';
import { ViewChild } from '@angular/core';


/**
 * @component DatosComponent
 * @description
 * Componente principal para gestionar la selección de subtítulos en la página de datos del trámite 260512.
 * Permite cambiar entre diferentes secciones o pestañas utilizando un índice que representa el subtítulo seleccionado.
 * Además, maneja la obtención y actualización de datos del formulario y la limpieza de recursos al destruirse.
 * 
 * @selector app-datos
 * @templateUrl ./datos.component.html
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {

  /**
   * @property indice
   * @description
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
  public indice: number = 1;

  /**
   * @property destroyNotifier$
   * @description
   * Subject utilizado para notificar la destrucción del componente y cancelar suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property consultaState
   * @description
   * Estado actual de la consulta, obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * @property esDatosRespuesta
   * @description
   * Indica si se han recibido datos de respuesta del servidor para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * @property solicitudState
   * @description
   * Estado de la solicitud, utilizado para manejar información relacionada con la solicitud actual.
   */
  public solicitudState!: SolicitudState;

  /**
   * @property DatosDomicilioLegalState
   * @description
   * Estado de los datos del domicilio legal, utilizado para manejar información relacionada con el domicilio legal.
   */
  public DatosDomicilioLegalState!: DatosDomicilioLegalState;

  idProcedimiento:number = 260512;

  @ViewChild(DatosDeLaComponent)
    datosDeLaComponent!: DatosDeLaComponent;

   /**
     * Indica si se debe mostrar la sección de Aviso de Licencia
     */
    isAvisoLicenciaVisible: boolean = true;
  
    /**
     * Indica si se debe mostrar la sección de Aduanas de Entrada
     */
    isAduanasEntradaVisible: boolean = true;
  
    /**
     * Configuración de visibilidad utilizada para determinar qué elementos
     * deben ser visibles en el componente. Se inicializa con la configuración
     * predeterminada definida en `DEFAULT_CONFIGURACION_VISIBILIDAD`.
     */
    configuracionVisibilidad: ConfiguracionVisibilidad = DEFAULT_CONFIGURACION_VISIBILIDAD

  /**
   * @constructor
   * @description
   * Constructor del componente. Inyecta los servicios necesarios para la gestión de la solicitud y la consulta.
   * @param solicitudService Servicio para operaciones relacionadas con la solicitud.
   * @param consultaQuery Query para acceder al estado de la consulta.
   */
  constructor(
    private solicitudService: SolicitudService,
    private consultaQuery: ConsultaioQuery,
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la consulta y decide si se deben guardar los datos del formulario o mostrar los datos de respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
        if (this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      })
    ).subscribe();

  }

  /**
   * @method guardarDatosFormulario
   * @description
   * Método encargado de obtener los datos del formulario desde el servicio y actualizar el estado correspondiente.
   * Si se reciben datos, se actualiza el estado del formulario y se marca que hay datos de respuesta.
   */
  guardarDatosFormulario(): void {
    this.solicitudService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitudService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @method seleccionaTab
   * @description
   * Método para cambiar el índice del subtítulo seleccionado.
   * @param i - Índice del nuevo subtítulo seleccionado.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  validarClickDeBoton(): boolean {
    return this.datosDeLaComponent.validarClickDeBoton();
  }

  validOnButtonClick():boolean{
    let isValid = false;
    if(this.validarClickDeBoton()){
          isValid = true;
        }
        else{
          isValid = false;
        }
        return isValid;
      }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Notifica y completa el subject para cancelar todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  obtenerValorCheckboxAviso(): boolean {
  return this.datosDeLaComponent?.obtenerValorCheckboxAviso() ?? false;
}
}
