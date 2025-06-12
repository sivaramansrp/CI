import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AgregarDestinatarioService } from '../../service/agregar-destinatario.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user'
import { DatosDelTramiteContenedoraComponent } from '../../components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { PagoDeDerechocComponent } from '../../components/pago-de-derechoc/pago-de-derechoc.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosContenedoraComponent } from '../../components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';
import { Tramite240112Query } from '../../estados/tramite240112Query.query';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [SolicitanteComponent, TercerosRelacionadosContenedoraComponent, DatosDelTramiteContenedoraComponent, PagoDeDerechocComponent,ReactiveFormsModule, FormsModule, CommonModule]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
   /**
   * Índice de la pestaña seleccionada.
   * Este índice indica cuál pestaña está actualmente seleccionada en el formulario.
   * 
   * @property {number} indice - El índice de la pestaña seleccionada.
   * @default 1
   */
   indice: number = 1;
   /**
      * @property destroyNotifier$
      * @description Observable que notifica para cancelar suscripciones activas cuando el componente se destruye.
      * Ayuda a prevenir fugas de memoria.
      * @type {Subject<void>}
      */
     private destroyNotifier$: Subject<void> = new Subject();

    /**
     * @descripcion
     * Indica si el formulario debe estar deshabilitado (solo lectura).
     * Cuando es verdadero, los controles del formulario estarán deshabilitados y no se podrán editar.
     */
    formularioDeshabilitado: boolean = false;
   

   /**
    * Lista de las secciones del formulario, cada sección tiene su índice, título y componente asociado.
    * Esta lista define el flujo y los pasos del formulario.
    * 
    * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
    * - Lista de objetos que representan cada sección del formulario.
    * - Cada objeto contiene:
    *    - `index`: El índice de la sección.
    *    - `title`: El título de la sección.
    *    - `component`: El componente que se muestra en esa sección.
    */
   seccionesDeLaSolicitud = [
     { index: 1, title: 'Solicitante', component: 'solicitante' },
     { index: 2, title: 'Datos del trámite', component: 'datos-de-tramite' },
     { index: 3, title: 'Terceros relacionados', component: 'terceros-relacionados' },
     { index: 4, title: 'Pago de derechos', component: 'pago-de-derechos' }
   ];
     /**
      * Inicializa el componente con las consultas y el store necesarios para la gestión del estado.
      *
      * @param tramite240112Query Consulta para acceder al estado del trámite.
      * @param tramite240112Store Store para actualizar el estado del trámite.
      */
     constructor(
       private tramite240112Query: Tramite240112Query,
       private tramite240112Store: Tramite240112Store,
       private consultaQuery: ConsultaioQuery,
       private agregarDestinatarioService: AgregarDestinatarioService
     ) {}
  ngOnInit(): void {
     this.tramite240112Query.getTabSeleccionado$
       .pipe(takeUntil(this.destroyNotifier$))
       .subscribe((tab) => {
         this.indice = tab ?? 1; 
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
    this.agregarDestinatarioService
      .getAcuiculturaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.agregarDestinatarioService.actualizarEstadoFormulario(resp);
        }
      });
  }

   /**
    * Método que cambia el índice de la pestaña seleccionada en función del valor recibido.
    * Este método se utiliza para navegar entre las diferentes pestañas del formulario.
    * 
    * @method seleccionaTab
    * @param {number} i - El índice de la pestaña que se desea seleccionar.
    * 
    * @returns {void} No retorna nada. Solo actualiza el valor del índice de la pestaña.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
     this.tramite240112Store.updateTabSeleccionado(i);
   }
  /**
   * @override
   * @method ngOnDestroy
   * @description Este método se ejecuta automáticamente cuando el componente se destruye. 
   * Se utiliza para realizar tareas de limpieza, como completar observables o liberar recursos.
   * 
   * @example
   * // Ejemplo de uso:
   * ngOnDestroy(): void {
   *   this.destroyNotifier$.next();
   *   this.destroyNotifier$.complete();
   * }
   * 
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
