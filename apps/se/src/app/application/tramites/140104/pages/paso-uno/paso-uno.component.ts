import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CuposDisponiblesCancelacion } from '../../models/cancelacion-de-certificados.model';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CancelacionDeCertificadosComponent} from '../../components/cancelacion-de-certificados/cancelacion-de-certificados.component';
import { ViewChild } from '@angular/core';
/**
 * Componente `PasoUnoComponent` que representa el primer paso del flujo de solicitud.
 * Controla el índice de la sección activa del formulario multipaso y gestiona
 * la visibilidad de secciones específicas como la búsqueda y la devolución de facturas.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña/paso actual.
   * Indica el paso activo en el proceso del formulario.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * Arreglo de objetos que representan las diferentes secciones del formulario.
   * Cada objeto contiene el índice, título y nombre del componente correspondiente.
   * Se utiliza para navegar entre los pasos del formulario.
   * 
   * @type {Array<{ index: number, title: string, component: string }>}
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Cancelación de Certificados de Cupo', component: 'cancelacion-de-solicitus' },
  ];

  /**
   * Indica si debe mostrarse la sección de búsqueda.
   * Controlado mediante un observable emitido por el servicio de mensajes.
   * @type {boolean}
   * @default false
   */
  public mostrarBusqueda: boolean = false;

  /**
   * Indica si debe mostrarse la sección de devolución de facturas.
   * @type {boolean}
   * @default false
   */
  public mostrarDevolverFacturas: boolean = false;

  /**
   * Almacena el estado de consulta actual.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si existen datos de respuesta del servidor para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Referencia al componente hijo SolicitanteComponent para acceso a sus métodos y propiedades */
  @ViewChild(CancelacionDeCertificadosComponent) cancelacionComp!: CancelacionDeCertificadosComponent;

  /**
   * Constructor del componente.
   * Inicializa el estado de validación del formulario y las secciones activas
   * a través del store `SeccionLibStore`, y obtiene el servicio de mensajes.
   * 
   * @param seccionStore Servicio que administra el estado de las secciones del formulario.
   * @param servicioDeMensajesService Servicio para la comunicación entre componentes mediante observables.
   * @param consultaQuery Servicio para consultar el estado de la solicitud.
   */
  constructor(
    private readonly seccionStore: SeccionLibStore,
    private servicioDeMensajesService: ServicioDeMensajesService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Establece el estado inicial de la forma como no válida.
    this.seccionStore.establecerFormaValida([false]);
    // Establece la primera sección como activa.
    this.seccionStore.establecerSeccion([false]);

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
    .subscribe();
    if (this.consultaState.update) {
      this.servicioDeMensajesService.establecerDatosDePermiso(true);
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Posteriormente reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.servicioDeMensajesService.getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          const DATOS = (resp.datos as CuposDisponiblesCancelacion[] || []).map(cancelacion => ({
            ...cancelacion,
            cupo: cancelacion.cupo ?? null,
            nombre_de_producto: cancelacion.nombre_de_producto ?? '',
            nombre_del_subproducto: cancelacion.nombre_del_subproducto ?? '',
            mecanismo_de_asignación: cancelacion.mecanismo_de_asignación ?? '',
            tipo_cupo: cancelacion.tipo_cupo ?? ''
          }));
          
          const CUPOS_DISPONIBLES_DATOS = {
            ...resp,
            datos: DATOS
          };
          this.servicioDeMensajesService.actualizarEstadoFormulario(CUPOS_DISPONIBLES_DATOS);
        }
      });
  }

  /**
   * Método que se ejecuta después de inicializar el componente.
   * Se suscribe a los observables `mensaje$` y `devolverFacturasMensaje$` para
   * controlar la visibilidad de las secciones correspondientes.
   */
  ngOnInit(): void {
    this.servicioDeMensajesService.mensaje$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((mensaje) => {
        this.mostrarBusqueda = mensaje;
      });

    this.servicioDeMensajesService.devolverFacturasMensaje$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((mensaje) => {
        this.mostrarDevolverFacturas = mensaje;
      });
  }
  /**
   * Valida todos los formularios del paso uno incluyendo solicitante, certificado, datos y destinatario
   * @returns true si todos los formularios son válidos, false en caso contrario
   */
  public validarFormularios(): boolean {
    let isValid = true;
    if (this.cancelacionComp?.cuposDisponiblesTabla) {
      if (this.cancelacionComp.cuposDisponiblesTabla.length===0) {
       
        isValid = false;
      }
    } else {
      isValid = false;
    }

   

    return isValid;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Envía valores `false` a los observables del servicio para limpiar el estado
   * y evitar efectos secundarios al desmontar el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.enviarDevolverFacturasMensaje(false);
  }

  /**
   * Permite seleccionar una pestaña/paso específico.
   * Actualiza el índice del paso actual para navegar entre secciones del formulario.
   * 
   * @param i Índice del paso seleccionado.
   */
  seleccionaPestana(i: number): void {
    this.indice = i;
  }
}
