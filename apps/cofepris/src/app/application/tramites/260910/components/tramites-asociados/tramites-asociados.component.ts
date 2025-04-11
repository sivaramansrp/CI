import { Asociados } from '../../models/asociados.model';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { takeUntil } from 'rxjs';

/**
 * Componente TramitesAsociadosComponent.
 * Gestiona la información relacionada con Tramites Asociados en el flujo de la solicitud.
 */
@Component({
  selector: 'app-tramites-asociados',
  templateUrl: './tramites-asociados.component.html',
  styleUrl: './tramites-asociados.component.scss',
})
export class TramitesAsociadosComponent implements OnDestroy {

  /**
   * Configuración de la tabla de selección para Tramites Asociados.
   */
  tramitesAsociadosTabla = TablaSeleccion.UNDEFINED;
  
  /**
   * Configuración de las columnas de la tabla para Tramites Asociados.
   * Define los encabezados, claves y el orden de las columnas.
   */
  tramitesAsociadosConfiguracionTabla: ConfiguracionColumna<Asociados>[] = [
    {
      encabezado: 'Folio Trámite',
      clave: (item: Asociados) => item.folioTramite,
      orden: 1
    },
    {
      encabezado: 'Tipo Trámite',
      clave: (item: Asociados) => item.tipoTramite,
      orden: 2
    },
    {
      encabezado: 'Estatus',
      clave: (item: Asociados) => item.estatus,
      orden: 3
    },
    {
      encabezado: 'Fecha Alta De Registro',
      clave: (item: Asociados) => item.fechaAltaDeRegistro,
      orden: 4
    }
  ];

  /**
   * Datos de los Asociados.
   */
  tramitesAsociadosDatos: Asociados[] = [];

  /**
   * Controlador para manejar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();



  /**
   * Constructor del componente.
   * Inicializa los servicios y obtiene las listas de destinatarios y fabricantes.
   * @param solicitudDatosService - Servicio para manejar datos de la solicitud.
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService
  ) {
    this.obtenerTramitesAsociadosListo();
  }

  /**
   * Obtiene la lista de Tramites Asociados disponibles desde el servicio
   * y actualiza los datos en el estado almacenado.
   */
  obtenerTramitesAsociadosListo(): void {
    this.solicitudDatosService
      .obtenerTramitesAsociadosListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Asociados[]) => {
          this.tramitesAsociadosDatos = respuesta;
        },
      });
  }

 
  /**
   * Método del ciclo de vida de Angular.
   * Se ejecuta cuando el componente se destruye.
   * Libera los recursos relacionados con las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
