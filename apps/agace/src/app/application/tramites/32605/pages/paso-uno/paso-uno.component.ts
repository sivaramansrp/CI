import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Component} from '@angular/core';
import { ImportadorExportadorComponent } from '../../components/importador-exportador/importador-exportador.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que representa el primer paso de un trámite.
 * Maneja la visualización y activación de diferentes secciones (tabs) según el tipo de endoso.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   */
  indice: number = 1;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  @ViewChild('importadorExportadorRef')importadorExportadorComponent!: ImportadorExportadorComponent;

  constructor(private consultaQuery: ConsultaioQuery, public solicitudService: SolicitudService) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
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
    this.solicitudService
      .obtenerDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitudService.actualizarEstado(resp);
        }
      });
  }

  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

    /**
   * Método que se ejecuta cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

/**
 * Valida los formularios del componente según la pestaña activa.
 * Si la pestaña activa es la 4, verifica que todos los formularios del componente
 * ImportadorExportadorComponent estén completos y válidos.
 */
public validarFormularios(): boolean {
  let esValido = true;

  if (this.indice === 4) {
    if (this.importadorExportadorComponent && this.esDatosRespuesta) {
      const FORMULARIOS_VALIDOS = this.importadorExportadorComponent.validarFormulariosCompletos();
      if (!FORMULARIOS_VALIDOS) {
        esValido = false;
      }
    }
  }

  return esValido;
}

/**
 * Obtiene la validación total de los formularios según la pestaña activa.
 * Si la pestaña activa es la 4, verifica si todos los formularios del componente
 * ImportadorExportadorComponent son válidos.
 */
public obtenerValidacionTotalFormularios(): { tab4Valid: boolean } {
  const PESTANA4_VALIDA = this.importadorExportadorComponent && this.esDatosRespuesta ? 
    this.importadorExportadorComponent.validezTodosFormularios() : true;

  return { 
    tab4Valid: PESTANA4_VALIDA
  };
}
}
