import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { ImportacionRetornoSanitarioService } from '../../service/importacion-retorno-sanitario.service';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vistas/terceros-relacionados-vista.component';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';


/**
 * Componente PasoUnoComponent
 * 
 * Este componente gestiona el primer paso del trámite 260103, permitiendo la selección de pestañas,
 * la carga de datos desde el servidor y la actualización del estado del formulario.
 * Utiliza servicios y stores para manejar el estado y la lógica de negocio relacionada con el trámite.
 *
 * @author
 * @version 1.0
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit,OnChanges {
   @Input() confirmarSinPagoDeDerechos: number = 0;
    /**
       * @property {ContenedorDeDatosSolicitudComponent} contenedorDeDatosSolicitudComponent
       * @description
       * Referencia al componente hijo `ContenedorDeDatosSolicitudComponent` obtenida
       * mediante el decorador `@ViewChild`.
       *
       * Esta propiedad permite invocar métodos públicos del contenedor y acceder
       * a sus propiedades, por ejemplo para delegar la validación del formulario
       * interno (`validarContenedor()`).
       *
       * > Nota: Angular inicializa esta referencia después de que la vista
       * ha sido cargada, comúnmente en el ciclo de vida `ngAfterViewInit`.
       */
      @ViewChild(ContenedorDeDatosSolicitudComponent)
      contenedorDeDatosSolicitudComponent!: ContenedorDeDatosSolicitudComponent;
  
      @ViewChild(PagoDeDerechosContenedoraComponent)
      pagoDeDerechosContenedoraComponent!: PagoDeDerechosContenedoraComponent;
  
      @ViewChild(TercerosRelacionadosVistaComponent)
      tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;
  /**
   * Índice utilizado para realizar selecciones o identificaciones de elementos. 
   * Puede ser un número o estar indefinido.
   * @type {number | undefined}
   */
  indice: number | undefined = 1;

  /**
   * Notificador para gestionar la destrucción de observables y evitar fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * Esta variable se utiliza para almacenar el índice del subtítulo.
 */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;


  /**
   * Constructor del componente PasoUnoComponent.
   * 
   * @param tramite260103Query Consulta el estado del trámite 260103.
   * @param tramite260103Store Maneja el estado del store para el trámite 260103.
   * @param consultaQuery Consulta el estado general del usuario.
   * @param importacionRetornoSanitarioService Servicio para manejar datos de importación y retorno sanitario.
   */
  constructor(
    private tramite260103Query: Tramite260103Query,
    private tramite260103Store: Tramite260103Store,
    private consultaQuery: ConsultaioQuery,
    private importacionRetornoSanitarioService: ImportacionRetornoSanitarioService
  ) {
   this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$)).subscribe((seccionState) => {
        this.consultaState = seccionState;
        if (this.consultaState && this.consultaState.procedureId === '260103' &&
          this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      });  
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al flujo de datos `getTabSeleccionado$` para obtener el índice de la pestaña seleccionada
   * y actualizar el valor de `indice`. Se utiliza `takeUntil` para desuscribirse cuando el componente se destruya.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
      this.tramite260103Query.getTabSeleccionado$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((tab) => {
          this.indice = tab;
        });
  }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['confirmarSinPagoDeDerechos'] && !changes['confirmarSinPagoDeDerechos'].firstChange) {
        const CONFIRMAR_VALOR = changes['confirmarSinPagoDeDerechos'].currentValue;
        if (CONFIRMAR_VALOR) {
          this.seleccionaTab(CONFIRMAR_VALOR);
        }
      }
    }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.importacionRetornoSanitarioService
      .getTramiteDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.importacionRetornoSanitarioService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Método para seleccionar una pestaña. Actualiza el estado de la pestaña seleccionada en el store.
   * 
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
      this.tramite260103Store.updateTabSeleccionado(i);
  }
  /**
   * @description
   * Método que se encarga de validar el primer paso del flujo.
   *
   * Invoca al método `validarContenedor()` del componente hijo
   * `ContenedorDeDatosSolicitudComponent` para comprobar si los
   * datos del formulario son correctos.
   *
   * En caso de que el componente hijo no esté disponible o
   * retorne `null/undefined`, se devuelve `false` por defecto.
   *
   * @returns {boolean}
   * - `true`: si el contenedor y su formulario interno son válidos.
   * - `false`: si el contenedor no es válido o no está disponible.
   */
   validarPasoUno(): boolean {
    const ES_TAB_VALIDO = this.contenedorDeDatosSolicitudComponent?.validarContenedor() ?? false;
    const ES_TERCEROS_VALIDO = this.tercerosRelacionadosVistaComponent.validarContenedor() ?? false;
    const ES_PAGO_VALIDO = this.pagoDeDerechosContenedoraComponent.validarContenedor() ?? false;
    return (
      (ES_TAB_VALIDO && ES_TERCEROS_VALIDO && ES_PAGO_VALIDO) ? true : false

    );
  }
  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
