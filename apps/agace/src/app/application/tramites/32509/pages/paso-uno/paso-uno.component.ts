import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AvisoDeMercanciaService } from '../../components/service/aviso-de-mercancia';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user'
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TipoDeAvisoComponent } from '../../components/tipo-de-aviso/tipo-de-aviso.component';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [ SolicitanteComponent, TipoDeAvisoComponent, CommonModule]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * @descripcion
   * Subject utilizado para notificar y completar las suscripciones activas al destruir el componente,
   * evitando fugas de memoria.
   * Se utiliza junto con el operador `takeUntil`.
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @descripcion
   * Indica si el formulario debe estar deshabilitado (solo lectura).
   * Cuando es verdadero, los controles del formulario estarán deshabilitados y no se podrán editar.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @constructor
   * @param exportaccionAcuicolaService Servicio para gestionar operaciones relacionadas con la exportación acuícola.
   * @param consultaQuery Servicio para realizar consultas relacionadas con el trámite actual.
   * 
   * @description
   * Constructor de la clase. Inicializa los servicios necesarios para el componente, pero no realiza ninguna acción adicional en este caso.
   */
  constructor(private avisoDeMercanciaService: AvisoDeMercanciaService, private consultaQuery: ConsultaioQuery) {
  }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

   /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Realiza la suscripción al estado de consulta para habilitar o deshabilitar el formulario según corresponda.
   */
  ngOnInit(): void {

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
    this.avisoDeMercanciaService
      .getAcuiculturaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.avisoDeMercanciaService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela suscripciones activas mediante `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
