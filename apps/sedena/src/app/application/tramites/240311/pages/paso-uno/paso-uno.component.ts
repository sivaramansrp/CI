import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map , takeUntil } from 'rxjs';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';

/**
 * @title Paso Uno
 * @description Componente que representa el primer paso del flujo de solicitud. Contiene los datos del solicitante, datos del trámite, terceros relacionados y pago de derechos.
 * @summary Agrupa los subcomponentes necesarios para capturar la información inicial del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit {
   /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();
  /**
   * Estado de la consulta, que contiene información sobre el estado actual del formulario.
   */
  public consultaState!: ConsultaioState;
   /**
   * Índice utilizado para identificar la posición actual en un proceso o lista.
   * @type {number}
   */
   indice: number = 1;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

   /**
   * Constructor del componente.
   * Inicializa los servicios y dependencias necesarias.
   */
  constructor(
    public solicitudPermisoService: SolicitudPermisoService,
    private consultaQuery: ConsultaioQuery
  ) {
    
  }
  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.notificadorDestruccion$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
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
    this.solicitudPermisoService.getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitudPermisoService.actualizarEstadoFormulario(resp);
        }
      });
  }

   /**
    * Selecciona una pestaña específica.
    * @param i - El índice de la pestaña a seleccionar.
    */
   seleccionaTab(i:number): void {
     this.indice = i;
   }
}
