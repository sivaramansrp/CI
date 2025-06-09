import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OperacionService } from '../../services/operacion.service';
import { OperacionesDeComercioExteriorComponent } from '../../components/operaciones-de-comercio-exterior/operaciones-de-comercio-exterior.component';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OperacionesDeComercioExteriorComponent,
    SolicitanteComponent
  ]
})
export class PasoUnoComponent implements OnInit{
    /**
   * Índice de la pestaña seleccionada.
   * Este índice indica cuál pestaña está actualmente seleccionada en el formulario.
   * 
   * @property {number} indice - El índice de la pestaña seleccionada.
   * @default 1
   */
    indice: number = 1;
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState; 
  esDatosRespuesta:boolean = false;
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
      { index: 2, title: 'Operaciones de Comercio Exterior', component: 'app-operaciones-de-comercio-exterior' }
    ];
  constructor(private consultaQuery: ConsultaioQuery, private readonly operacionService: OperacionService){

  }
  ngOnInit(): void {
        this.guardarDatosFormulario();
    // this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
    //       this.consultaState = seccionState;
    //   })).subscribe();
    // if(this.consultaState.update) {
    //   this.guardarDatosFormulario();
    // } else {
    //   this.esDatosRespuesta = true;
    // }

  }

  
guardarDatosFormulario(): void {
    this.operacionService
      .getRegistroTomaMuestrasMercanciasData('finalDataToSend.json').pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.operacionService.actualizarEstadoFormulario(resp);
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
}
