import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfiguracionColumna, ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { map, Subject, takeUntil } from 'rxjs';
import { CONFIGURACIONCOLUMNA } from '../../constantes/cancelacion-peticion.enum';
import { CancelacionPeticionService } from '../../services/cancelacion-peticion.service';
import { TramiteAsociados } from '../../../../shared/models/tramite-asociados.model';

/**
 * @component
 * @name PasoUnoComponent
 * @description
 * Componente que muestra la primera pestaña.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})

export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * compo doc
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
  indice: number = 1;

  /**
   * Configuración de las columnas de la tabla para mostrar los trámites asociados.
   */
  configuracionTabla: ConfiguracionColumna<TramiteAsociados>[] =
    CONFIGURACIONCOLUMNA;

  /**
   * Lista de trámites asociados que se mostrarán en la tabla.
   */
  tramiteAsociados!: TramiteAsociados[];

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Estado de la consulta actual. */
  public consultaState!:ConsultaioState;

  /**
   * compo doc
   * Emisor de eventos que notifica el cambio de pestaña.
   * Emite un número correspondiente al índice de la pestaña seleccionada.
   * 
   * @type {EventEmitter<number>}
   * @memberof PasoUnoComponent
   */
  @Output() pestanaCambiado = new EventEmitter<number>();

  /**
   * compo doc
   * Constructor del componente.
   * Inicializa el servicio de cancelación de petición.
   *
   * @param cancelacionPeticionService - Servicio para gestionar la cancelación de la petición.
   */
  constructor(
    private cancelacionPeticionService: CancelacionPeticionService,
    private consultaQuery: ConsultaioQuery
  ) {
    //no hacer nada
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Se suscribe a los cambios en los trámites asociados y actualiza la lista de trámites.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.cancelacionPeticionService
      .obtenerTramitesAsociados()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((tramiteAsociados) => {
        this.tramiteAsociados = tramiteAsociados;
      });
    
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.notificadorDestruccion$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.cancelacionPeticionService
    .obtenerCancelacionPeticion()
    .pipe(takeUntil(this.notificadorDestruccion$))
    .subscribe((cancelacionPeticion) => {
      this.esDatosRespuesta = true;
      this.cancelacionPeticionService.actualizarEstadoFormulario(cancelacionPeticion);
    });
  }

  /**
   * compo doc
   * Método para cambiar el índice del subtítulo seleccionado.
   *
   * @param i - Índice del nuevo subtítulo seleccionado.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
