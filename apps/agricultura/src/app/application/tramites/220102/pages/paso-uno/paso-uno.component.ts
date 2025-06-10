import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosMercanciaComponent } from '../../components/datos-mercancia/datos-mercancia.component';
import { DatosMercanciaService } from '../../services/datos-mercancia/datos-mercancia.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente que representa la primera sección de un formulario paso a paso.
 * Este componente se encarga de gestionar el estado y la navegación entre las pestañas del formulario.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
  standalone:true,
  imports:[FormsModule, ReactiveFormsModule,SolicitanteComponent,DatosMercanciaComponent,CommonModule]
})
export class PasoUnoComponent implements OnInit,OnDestroy {
  /**
   * @private
   * @property {Subject<void>} destroyNotifier$
   * @description Subject para notificar la destrucción del componente y desuscribir observables.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Índice de la pestaña seleccionada.
   * Este índice indica cuál pestaña está actualmente seleccionada en el formulario.
   * 
   * @property {number} indice - El índice de la pestaña seleccionada.
   * @default 1
   */
  indice: number = 1;

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
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' }
  ];
/**
 * @descripcion
 * Constructor del componente. Inyecta el servicio DatosMercanciaService para obtener los datos de mercancía.
 * 
 * @param datosMercanciaService Servicio encargado de obtener los datos de mercancía desde una fuente externa.
 */
constructor(private readonly datosMercanciaService: DatosMercanciaService) {
}

/**
 * @descripcion
 * Ciclo de vida de Angular que se ejecuta al inicializar el componente.
 * Llama al servicio para obtener los datos de mercancía y los muestra por consola.
 */
ngOnInit(): void {
  this.datosMercanciaService.obtenerDatosMercancia()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(data => {
      if(data){
      this.datosMercanciaService.actualizarFormularioMovilizacion(data?.datos)
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
  }

  /**
   * @inheritdoc
   * 
   * @description
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Se utiliza para emitir una notificación y completar el observable `destroyNotifier$`, 
   * permitiendo limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
