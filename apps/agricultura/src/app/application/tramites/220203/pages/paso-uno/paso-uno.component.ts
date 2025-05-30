import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, SolicitanteComponent, TercerosComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionComponent } from '../../components/datos-para-movilizacion/datos-para-movilizacion.component';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TercerospageComponent } from '../../components/tercerospage/tercerospage.component';




@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    SolicitanteComponent, TercerospageComponent, ReactiveFormsModule, DatosDeLaSolicitudComponent, DatosParaMovilizacionComponent, PagoDeDerechosComponent, CommonModule
  ]
})
export class PasoUnoComponent implements OnInit {
  /**
    * Índice de la pestaña seleccionada.
    * @property {number} indice - Índice de la pestaña actualmente seleccionada.
    * @default 1
    */
  indice: number = 1;

  /**
   * Lista de secciones del formulario.
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * - Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceror-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];

  
  /**
 * @descripcion
 * Subject utilizado para notificar y completar las suscripciones activas al destruir el componente,
 * evitando fugas de memoria.
 * Se utiliza junto con el operador `takeUntil`.
 * @private
 */
private destroyNotifier$ = new Subject<void>();


  /**
   * @constructor
   * @param importacionDeAcuiculturaService Servicio para gestionar operaciones relacionadas con la importación de acuicultura.
   * 
   * @description
   * Inyecta el servicio `ImportacionDeAcuiculturaService` para manejar la lógica de negocio relacionada con los trámites de importación de acuicultura en el componente.
   */
  constructor(private importacionDeAcuiculturaService: ImportacionDeAcuiculturaService, private consultaQuery: ConsultaioQuery) {

  }

  /**
  * Cambia el índice de la pestaña seleccionada.
  * @method seleccionaTab
  * @param {number} i - El índice de la pestaña a seleccionar.
  */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se puede inicializar datos o suscribirse a servicios necesarios para el componente.
   */
  ngOnInit(): void {

    this.consultaQuery.selectConsultaioState$
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((seccionState) => {
      if(seccionState.update){
              this.guardarDatosFormulario();
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
  this.importacionDeAcuiculturaService
    .getAcuiculturaData().pipe(
      takeUntil(this.destroyNotifier$)
    )
    .subscribe((resp) => {
      if (resp) {
        this.importacionDeAcuiculturaService.actualizarEstadoFormulario(resp);
      }
    });
}

}
