import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { ExportacionMedicamentosContenganService } from '../../service/exportacion-medicamentos-contengan.service';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';

/**
 * @component
 * @name PasoUnoComponent
 * @description
 * Componente principal para el paso uno del trámite 260304.
 * Gestiona la visualización y manipulación de los datos del solicitante, terceros relacionados,
 * pago de derechos y datos de la solicitud. Permite la selección de pestañas y controla el estado
 * de solo lectura del formulario según el estado de la solicitud.
 * 
 * @author
 * Equipo de desarrollo Cofepris
 * 
 * @version
 * 1.0.0
 * 
 * @example
 * <app-paso-uno></app-paso-uno>
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [ SolicitanteComponent, ContenedorDeDatosSolicitudComponent, TercerosRelacionadosVistaComponent, PagoDeDerechosContenedoraComponent, ReactiveFormsModule, FormsModule, CommonModule ]
})
export class PasoUnoComponent implements OnDestroy, OnInit {
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
   * @descripcion
   * Indica si el formulario debe estar deshabilitado (solo lectura).
   * Cuando es verdadero, los controles del formulario estarán deshabilitados y no se podrán editar.
   * @type {boolean}
   */
  formularioDeshabilitado: boolean = false;

  /**
   * Constructor del componente.
   * Inyecta los servicios y stores necesarios para la gestión del estado y la obtención de datos.
   * 
   * @param tramite260304Query Consulta el estado del trámite 260304.
   * @param tramite260304Store Store para actualizar el estado del trámite 260304.
   * @param consultaQuery Consulta el estado general de la solicitud.
   * @param exportacionMedicamentosContenganService Servicio para obtener y actualizar datos de acuicultura.
   */
  constructor(
    private tramite260304Query:Tramite260304Query,
    private tramite260304Store: Tramite260304Store,
    private consultaQuery: ConsultaioQuery,
    private exportacionMedicamentosContenganService: ExportacionMedicamentosContenganService
  ) {
    // Constructor necesario para inyectar el store del trámite
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al flujo de datos `getTabSeleccionado$` para obtener el índice de la pestaña seleccionada
   * y actualizar el valor de `indice`. Se utiliza `takeUntil` para desuscribirse cuando el componente se destruya.
   * 
   * También se suscribe al estado de consulta para habilitar o deshabilitar el formulario según corresponda.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
      this.tramite260304Query.getTabSeleccionado$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((tab) => {
          this.indice = tab;
        });

      this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((seccionState) => {
        if(seccionState.update){
          this.formularioDeshabilitado = false;
            this.guardarDatosFormulario();
        }
        if (seccionState.readonly) {
          this.formularioDeshabilitado = true;
        }
      });
  }

  /**
   * @descripcion
   * Obtiene los datos de acuicultura y actualiza el estado del formulario.
   * 
   * @remarks
   * Realiza una suscripción al observable que retorna los datos de acuicultura.
   * Utiliza `takeUntil` para evitar fugas de memoria al destruir el componente.
   * Si la respuesta es válida, actualiza el estado del formulario con los datos recibidos.
   */
  guardarDatosFormulario(): void {
    this.exportacionMedicamentosContenganService
      .getAcuiculturaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.exportacionMedicamentosContenganService.actualizarEstadoFormulario(resp);
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
      this.tramite260304Store.updateTabSeleccionado(i);
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
