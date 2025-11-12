import { AfterViewInit, Component, OnChanges, OnDestroy, Input, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';

import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';


/**
 * Componente para el paso uno del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  
    /**
      * @property {ContenedorDeDatosSolicitudComponent} contenedorDeDatosSolicitudComponent
      * @description
      * Referencia al componente hijo `ContenedorDeDatosSolicitudComponent` obtenida
      * mediante el decorador `@ViewChild`.
      */
  
    @ViewChild(ContenedorDeDatosSolicitudComponent)
    contenedorDeDatosSolicitudComponent!: ContenedorDeDatosSolicitudComponent;

     /**
       * @property {TercerosRelacionadosVistaComponent} tercerosRelacionadosVistaComponent
       * @description
       * Referencia al componente hijo `TercerosRelacionadosVistaComponent` obtenida
       * mediante el decorador `@ViewChild`.
       */
      @ViewChild(TercerosRelacionadosVistaComponent)
      tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;

   /**
     * @property {PagoDeDerechosContenedoraComponent} pagoDeDerechosContenedoraComponent
     * @description
     * Referencia al componente hijo `PagoDeDerechosContenedoraComponent` obtenida
     * mediante el decorador `@ViewChild`.
     */
  
    @ViewChild(PagoDeDerechosContenedoraComponent)
    pagoDeDerechosContenedoraComponent!: PagoDeDerechosContenedoraComponent;

  /**
   * Estado actual de la consulta para el componente.
   * 
   * Esta propiedad almacena la información relacionada con el estado de la consulta
   * en el flujo del trámite. Utiliza el tipo `ConsultaioState` para definir la estructura
   * de los datos gestionados.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Indicador que recibe la confirmación de continuar sin pago de derechos.
   * Cuando este valor cambia (no es la primera asignación) el componente
   * seleccionará la pestaña indicada (comportamiento coherente con 260218).
   */
  @Input() confirmarSinPagoDeDerechos: number = 0;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoUno.
   * 
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param serviciosPermisoSanitarioService Servicio para gestionar los permisos sanitarios.
   * 
   * Al inicializar, se suscribe al observable del estado de la consulta y actualiza la propiedad `consultaState`.
   * Si el estado indica que se debe actualizar (`update`), guarda los datos del formulario.
   * En caso contrario, establece la bandera `esDatosRespuesta` en verdadero.
   */
  constructor(private consultaQuery: ConsultaioQuery, private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
  }

  ngOnInit(): void {
    if (this.consultaState && this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

 /**
   * Valida los datos del paso uno del formulario.
   * @returns {boolean} True si la validación es exitosa, false en caso contrario.
   */
  validarPasoUno(): boolean {
    /* eslint-disable no-console */
    console.debug('[PasoUno] validarPasoUno called');
    const ES_TAB_VALIDO = this.contenedorDeDatosSolicitudComponent?.validarContenedor() ?? false;
    const ES_TERCEROS_VALIDO = this.tercerosRelacionadosVistaComponent?.validarContenedor() ?? false;
    const ES_PAGO_VALIDO = this.pagoDeDerechosContenedoraComponent?.validarContenedor() ?? false;
  const RESULTADO = (ES_TAB_VALIDO && ES_TERCEROS_VALIDO) ? true : false;
  console.debug('[PasoUno] validarPasoUno result=', { ES_TAB_VALIDO, ES_TERCEROS_VALIDO, ES_PAGO_VALIDO, RESULTADO });
  /* eslint-enable no-console */
  return RESULTADO;
  }

  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormulario(): void {
    this.serviciosPermisoSanitarioService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.serviciosPermisoSanitarioService.actualizarEstadoTramite260215(resp);
        }
      });
  }



  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    if (this.solicitante) {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    }
  }

  /**
   * Índice del tab seleccionado.
   */
  indice: number = 1;

  /**
   * Método para seleccionar un tab.
   * @param i Índice del tab.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

/**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Se ejecuta cuando cambian los inputs del componente.
   * Si el valor de `confirmarSinPagoDeDerechos` cambia y no es la primera vez,
   * delega en `seleccionaTab` para moverse a la pestaña indicada.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['confirmarSinPagoDeDerechos'] && !changes['confirmarSinPagoDeDerechos'].firstChange) {
      const NUEVO = changes['confirmarSinPagoDeDerechos'].currentValue as number;
      if (NUEVO) {
        this.seleccionaTab(NUEVO);
      }
    }
  }
}
