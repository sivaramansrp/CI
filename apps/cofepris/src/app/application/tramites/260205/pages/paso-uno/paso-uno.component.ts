import { Component, OnDestroy } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { MateriasPrimasDestinadosService } from '../../services/material-primas-destinados.service';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDeDerechosContenedoraComponent } from "../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component";
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260205Query } from '../../estados/queries/tramite260205.query';
import { Tramite260205Store } from '../../estados/stores/tramite260205.store';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosComponent,
    PagoDeDerechosContenedoraComponent
],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy {
  /**
   * Índice numérico utilizado como referencia o posición actual.
   * Comienza en 1 por defecto.
   *
   * @type {number}
   */
  indice: number = 2;

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
   public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
   public esDatosRespuesta: boolean = false;

  /**
   * Constructor que inicializa el componente con las dependencias necesarias y configura
   * las suscripciones para manejar el índice de ruta previo y el estado de la consulta.
   * 
   * @param store - Almacén del estado para Tramite260205.
   * @param query - Consulta del estado de Tramite260205.
   * @param consultaQuery - Consulta del estado general (Consultaio).
   * @param materiasPrimasDestinadosService - Servicio para manejar materias primas destinadas.
  */
  constructor(
    protected store: Tramite260205Store,
    private query: Tramite260205Query,
    private consultaQuery: ConsultaioQuery,
    private materiasPrimasDestinadosService: MateriasPrimasDestinadosService
  ) {
    this.query.indicePrevioRuta$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((indice: number) => {
        if (indice) {
          this.indice = indice;
        }
      });
      this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$)).subscribe((seccionState) => {
        this.consultaState = seccionState;
        if (this.consultaState && this.consultaState.procedureId === '260205' &&
          this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      });  
  }

   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
   guardarDatosFormulario(): void {
    this.materiasPrimasDestinadosService
      .getTramiteDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.materiasPrimasDestinadosService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Limpia los recursos observables al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Establece el índice seleccionado en el store.
   *
   * @param i - El índice a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.store.setIndice(i);
  }
}
