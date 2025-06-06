import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


/**
 * @class PasoUnoComponent
 * @description Componente que representa el paso uno del trámite 420102.
 * Este paso incluye la funcionalidad para gestionar la información del solicitante
 * y concluir la relación asociada al trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {

  /**
   * @property {number} indice
   * @description Índice actual del paso seleccionado.
   */
  indice: number = 1;

  /**
   * Indica si los datos de respuesta están disponibles.
   * Valor inicial: false.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado de la consulta actual.
   * Este estado se obtiene a través de ConsultaioQuery.
   */
  public consultaState!: ConsultaioState;

  /**
   * @description Constructor del componente.
   * Inicializa el componente y establece el índice de la pestaña seleccionada.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * Subject para notificar la destrucción del componente.
   * Se utiliza para limpiar suscripciones y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description Constructor que inicializa el store de la sección.
   * @param {SeccionLibStore} seccionStore - Servicio para manejar el estado de la sección.
   */
  constructor(
    private seccionStore: SeccionLibStore,
    public consultaQuery: ConsultaioQuery,
    public concluirRelacionService:ConcluirRelacionService
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de consulta y actualiza el estado del componente según sea necesario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.subscribe((seccionState) => {
      this.consultaState = seccionState;
      if (this.consultaState.update) {
        this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
    });
  }

  /**
   * Guarda los datos del formulario utilizando el servicio de ampliación de servicios.
   */
  guardarDatosFormulario(): void {
    this.concluirRelacionService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        console.log('Respuesta del servicio:', resp);
        
        if (resp) {
          console.log('Datos del formulario guardados:', resp);
          
          this.esDatosRespuesta = true;
          this.concluirRelacionService.actualizarEstadoFormulario(resp);
          
        }
      });
  }

  /**
   * @method seleccionaTab
   * @description Método para seleccionar una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}