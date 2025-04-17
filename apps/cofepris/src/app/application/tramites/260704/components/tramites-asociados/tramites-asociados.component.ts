import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Asociados } from '../../models/consulta.model';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../service/consulta.service';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { DESTINATARIO_TABLA } from '../../constantes/consulta.enum';

/**
 * Componente para mostrar y administrar los trámites asociados.
 *
 * Este componente se encarga de obtener y mostrar la tabla de trámites asociados,
 * utilizando el servicio de consulta para cargar los datos y definiendo la configuración
 * de las columnas para la tabla.
 */
@Component({
  selector: 'app-tramites-asociados',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent],
  templateUrl: './tramites-asociados.component.html',
  styleUrls: ['./tramites-asociados.component.css']
})
export class TramitesAsociadosComponent implements OnInit, OnDestroy {

  /**
   * Subject que emite un valor cuando el componente se destruye.
   * Se utiliza para cancelar suscripciones y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Datos de los trámites asociados (destinatarios) que se mostrarán en la tabla.
   */
  public datosDestinatario: Asociados[] = [];

  /**
   * Constante que representa el tipo de selección de la tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas para la tabla de trámites asociados.
   */
  destinatarioConfiguracionTabla = DESTINATARIO_TABLA;

  /**
   * Constructor del componente.
   * Inyecta el servicio ConsultaService para obtener los datos de la tabla de trámites.
   * @param consulta Servicio para realizar consultas.
   */
  constructor(private consulta: ConsultaService) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   *
   * Se encarga de llamar a la función para obtener la tabla de trámites asociados.
   */
  ngOnInit(): void {
    this.obtenerTablaTramites();
  }

  /**
   * Obtiene los datos de la tabla de trámites asociados mediante el servicio ConsultaService.
   *
   * Los datos obtenidos se asignan a la propiedad 'datosDestinatario'.
   */
  public obtenerTablaTramites(): void {
    this.consulta
      .obtenerTablaTramites()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.datosDestinatario = data;
      });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   *
   * Emite un valor para finalizar las suscripciones y prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
