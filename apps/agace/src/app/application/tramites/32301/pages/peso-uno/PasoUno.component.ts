import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { AdicionFraccionComponent } from '../../components/adicionFraccion/adicionFraccion.component';
import { AdicionProcesosComponent } from '../../components/adicionProcesos/adicionProcesos.component';
import { CommonModule } from '@angular/common';
import { FusionOEscisionComponent } from '../../components/fusionOEscision/fusionOEscision.component';
import { ModificacionGoceInmuebleComponent } from '../../components/modificacionGoceInmueble/modificacionGoceInmueble.component';
import { ModificacionSociosComponent } from '../../components/modificacionSocios/modificacionSocios.component';
import { ProveedorExtranjeroComponent } from '../../components/proveedorExtranjero/proveedorExtranjero.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Solicitud32301Service } from '../../services/solicitud32301.service';
import { TipoDeAvisoComponent } from '../../components/tipoDeAviso/tipoDeAviso.component';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
/**
 * Interfaz que define las propiedades relacionadas con los tipos de aviso que se seleccionan en el formulario
 * */
export interface TipoDevAviso {
  foreignClientsSuppliers: boolean; // Indica si se selecciona el tipo 'Clientes/proveedores extranjeros'
  nationalSuppliers: boolean; // Indica si se selecciona el tipo 'Proveedores nacionales'
  modificationsMembers: boolean; // Indica si se selecciona 'Modificaciones de miembros'
  changesToLegalDocuments: boolean; // Indica si se seleccionan 'Cambios a documentos legales'
  mergerOrSplitNotice: boolean; // Indica si se selecciona 'Aviso de fusión o escisión'
  additionFractions: boolean; // Indica si se selecciona 'Adición de fracciones'
}

@Component({
  selector: 'app-paso-uno', // Selector del componente para el paso 1
  standalone: true, // El componente es autónomo y no depende de otros módulos
  styleUrls: ['./PasoUno.component.scss'], // Ruta al archivo de estilos
  imports: [
    CommonModule,
    SolicitanteComponent,
    TipoDeAvisoComponent,
    ProveedorExtranjeroComponent,
    ModificacionSociosComponent,
    ModificacionGoceInmuebleComponent,
    FusionOEscisionComponent,
    AdicionFraccionComponent,
    AdicionProcesosComponent,
  ], // Importación de los componentes utilizados
  templateUrl: './PasoUno.component.html', // Ruta al archivo HTML
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  indice: number = 1; // Índice que determina qué sección está activa en el paso
    isActive: boolean = false; // Indica si el componente está activo

  // Objeto que almacena los valores seleccionados para los tipos de aviso
  datosInputCheck: TipoDevAviso = {
    foreignClientsSuppliers: false,
    nationalSuppliers: false,
    modificationsMembers: false,
    changesToLegalDocuments: false,
    mergerOrSplitNotice: false,
    additionFractions: false,
  };
  /**
   * Estado actual de la consulta para el componente.
   *
   * @type {ConsultaioState}
   * @public
   */
  public consultaState!: ConsultaioState;

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   *
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones a observables y evitar fugas de memoria.
   *
   * @private
   */
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Sujeto utilizado para notificar la destrucción del componente.
   *
   * Se emplea en combinación con `takeUntil` para cancelar suscripciones activas
   * y evitar fugas de memoria cuando el componente se destruye.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  @Output() tabSelected = new EventEmitter<number>();
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solicitudService: Solicitud32301Service,
    private Tramite32301Query: Tramite32301Query,
     private Tramite32301Store: Tramite32301Store,
  ) {
    // Inicializa el estado de la consulta
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * Se suscribe al observable `selectConsultaioState$` para obtener el estado actual de la consulta.
   *
   * - Asigna el estado recibido a `consultaState`.
   * - Si el estado indica que se debe actualizar (`update` es verdadero), se llama a `guardarDatosFormulario()`.
   * - En caso contrario, se activa la bandera `esDatosRespuesta`.
   */
  ngOnInit(): void {
   
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

     // Suscripción a los cambios del estado del proveedor extranjero
        this.Tramite32301Query.select()
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((state) => {
           this.datosInputCheck = state.tipoDevAviso;
          });
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
    this.solicitudService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitudService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Método que selecciona la pestaña activa basada en el índice proporcionado.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i; // Actualiza el índice para cambiar la pestaña activa
    this.tabSelected.emit(this.indice); 
    if (this.indice === 3 || this.indice === 4 || this.indice === 5 || this.indice === 6 || this.indice === 7) {
      this.isActive = true; 
      this.Tramite32301Store.setIsActive(true);
    }
    else{
        this.Tramite32301Store.setIsActive(false);
    }
  }

  /**
   * Método que actualiza los valores de 'datosInputCheck' cuando se seleccionan diferentes opciones en el formulario.
   * @param event Los valores seleccionados por el usuario para los tipos de aviso.
   */
  getValoreEnable(event: TipoDevAviso): void {
    this.datosInputCheck = event; // Actualiza los valores con la selección actual
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
