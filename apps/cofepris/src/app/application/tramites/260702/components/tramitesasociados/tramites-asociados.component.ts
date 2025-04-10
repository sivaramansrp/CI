import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { TramitesAsociados } from '../../models/destinatario.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-tramites-asociados',
  templateUrl: './tramites-asociados.component.html',
  styleUrls: ['./tramites-asociados.component.css'],
  standalone: true,
  imports: [TablaDinamicaComponent, TituloComponent],
})
export class TramitesAsociadosComponent implements OnInit, OnDestroy {
  /** Arreglo que contiene los datos de las filas de la tabla */
  tablaFilaDatos: TramitesAsociados[] = [];

  /** Variable que controla la visibilidad del modal */
  isModalVisible = false;

  /** Sujeto que se utiliza para manejar la destrucción de suscripciones */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Configuración de las columnas de la tabla para los trámites asociados */
  destinatarioConfiguracionTabla: ConfiguracionColumna<TramitesAsociados>[] = [
    {
      /** Configuración de la columna para el número */
      encabezado: 'No.',
      clave: (fila) => fila?.No,
      orden: 1,
    },
    {
      /** Configuración de la columna para el folio del trámite */
      encabezado: 'Folio tramite',
      clave: (fila) => fila?.folioTramite,
      orden: 2,
    },
    {
      /** Configuración de la columna para el tipo de trámite */
      encabezado: 'Tipo tramite',
      clave: (fila) => fila?.tipoTramite,
      orden: 3,
    },
    {
      /** Configuración de la columna para el estatus */
      encabezado: 'Estatus',
      clave: (fila) => fila?.estatus,
      orden: 4,
    },
    {
      /** Configuración de la columna para la fecha de alta del registro */
      encabezado: 'Fecha alta de registro',
      clave: (fila) => fila?.fechaaltaderegistro,
      orden: 5,
    },
  ];

  /**
   * Constructor de la clase
   * @param registrarsolicitudmcp Servicio para obtener los trámites asociados
   */
  constructor(private registrarsolicitudmcp: RegistrarSolicitudMcpService) {}

  /** Método que se ejecuta al inicializar el componente */
  ngOnInit(): void {
    this.getTramitesAsociados();
  }

  /** Método para obtener los trámites asociados desde el servicio */
  getTramitesAsociados(): void {
    this.registrarsolicitudmcp
      .getTramitesAsociados()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tablaFilaDatos = data as TramitesAsociados[];
      });
  }

  /** Método para mostrar el modal */
  showModal(): void {
    this.isModalVisible = true;
  }

  /** Método para ocultar el modal */
  hideModal(): void {
    this.isModalVisible = false;
  }

  /** Método que se ejecuta al destruir el componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
