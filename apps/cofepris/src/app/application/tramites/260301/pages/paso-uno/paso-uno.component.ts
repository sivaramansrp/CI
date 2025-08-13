import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user'
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { ImportacionMateriasPrimasService } from '../../service/importacion-materias-primas.service';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260301Query } from '../../estados/tramite260301Query.query';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';




@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
  standalone: true,
  imports: [SolicitanteComponent, ContenedorDeDatosSolicitudComponent, TercerosRelacionadosVistaComponent,PagoDeDerechosContenedoraComponent, ReactiveFormsModule, CommonModule ],
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
     * Esta variable se utiliza para almacenar el índice del subtítulo.
     */
    public consultaState!: ConsultaioState;
  

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * @constructor
   * @desc Constructor necesario para inyectar las dependencias requeridas por el componente.
   * 
   * @param tramite260301Query Consulta el estado y los datos relacionados con el trámite 260301.
   * @param tramite260301Store Maneja el estado global del trámite 260301.
   * @param consultaQuery Servicio para consultar información adicional relacionada.
   * @param importacionMateriasPrimasService Servicio para gestionar la importación de materias primas.
   *
   */
  constructor(
    private tramite260301Query: Tramite260301Query,
    private tramite260301Store: Tramite260301Store,
    private consultaQuery: ConsultaioQuery,
    private importacionMateriasPrimasService: ImportacionMateriasPrimasService
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
          })).subscribe();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al flujo de datos `getTabSeleccionado$` para obtener el índice de la pestaña seleccionada
   * y actualizar el valor de `indice`. Se utiliza `takeUntil` para desuscribirse cuando el componente se destruya.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    if (this.consultaState && this.consultaState.procedureId === '260301' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
      this.tramite260301Query.getTabSeleccionado$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((tab) => {
          this.indice = tab;
        });

      // this.consultaQuery.selectConsultaioState$
      // .pipe(takeUntil(this.destroyNotifier$))
      // .subscribe((seccionState) => {
      //   if(seccionState.update){
      //     this.formularioDeshabilitado = false;
      //       this.guardarDatosFormulario();
      //   }
      //   if (seccionState.readonly) {
      //     this.formularioDeshabilitado = true;
      //   }
      // });
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
    this.importacionMateriasPrimasService
      .getAcuiculturaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.importacionMateriasPrimasService.actualizarEstadoFormulario(resp);
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
      this.tramite260301Store.updateTabSeleccionado(i);
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
