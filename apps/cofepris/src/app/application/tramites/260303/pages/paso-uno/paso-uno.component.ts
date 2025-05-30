import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import {Subject,map,takeUntil } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
/**
 * PasoUnoComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit {

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la consulta obtenido del store. */
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente.
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param certificadosLicenciasPermisosService Servicio para manejar los datos del formulario de certificados, licencias y permisos.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private certificadosLicenciasPermisosService: CertificadosLicenciasPermisosService
  ) {}

    /**
     * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Se suscribe al estado de consulta y actualiza la variable local.
     * Si el estado indica que hay una actualización, guarda los datos del formulario.
     * De lo contrario, marca que ya existen datos de respuesta.
     */
    ngOnInit(): void {
      this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
        // Actualiza el estado local con el valor obtenido del store
        this.consultaState = seccionState;
        })
      )
      .subscribe();
      // Verifica si se debe actualizar el formulario o solo mostrar los datos existentes
      if (this.consultaState.update) {
      this.guardarDatosFormulario();
      } else {
      this.esDatosRespuesta = true;
      }
    }


  /**
   * Método para guardar los datos del formulario.
   * Obtiene los datos del formulario desde el servicio y actualiza el estado si la respuesta es válida.
   */
  guardarDatosFormulario(): void {
    this.certificadosLicenciasPermisosService
      .getFormularioData().pipe(
        takeUntil(this.destroyNotifier$) // Cancela la suscripción al destruir el componente
      )
      .subscribe((resp) => {
        if (resp) {
          // Si la respuesta existe, marca que hay datos de respuesta y actualiza el estado del formulario
          this.esDatosRespuesta = true;
          this.certificadosLicenciasPermisosService.actualizarEstadoFormulario(resp);
        }
      });
  }


}
