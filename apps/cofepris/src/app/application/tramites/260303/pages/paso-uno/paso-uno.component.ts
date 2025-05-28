import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import {Subject,forkJoin,map,takeUntil } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Solicitud260303State } from '../../../../estados/tramites/260303/tramite260303.store';
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
  public consultaState!:ConsultaioState;

  constructor(private consultaQuery: ConsultaioQuery,private certificadosLicenciasPermisosService: CertificadosLicenciasPermisosService){}

    ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Obtiene los datos necesarios del servidor y actualiza el estado del formulario.
   * Utiliza forkJoin para realizar múltiples peticiones en paralelo y unifica las respuestas.
   */
  guardarDatosFormulario(): void {
    forkJoin({
      // Solicita los datos del estado
      estado: this.certificadosLicenciasPermisosService.getEstadoDatos(),
      // Solicita los datos de SCIAN
      scian: this.certificadosLicenciasPermisosService.getScianDatos(),
      // Solicita los datos de clave
      clave: this.certificadosLicenciasPermisosService.getClaveDatos(),
      // Solicita los datos de régimen
      regimen: this.certificadosLicenciasPermisosService.getRegimenDatos(),
      // Solicita los datos de mercancías
      mercancias: this.certificadosLicenciasPermisosService.getMercanciasDatos(),
      // Solicita los datos del tipo de producto
      tipoProducto: this.certificadosLicenciasPermisosService.getTipoDeProductoDatos(),
      // Solicita los datos del país de procedencia
      paisProcedencia: this.certificadosLicenciasPermisosService.getPaisDeProcedenciaDatos(),
      // Solicita los datos del fabricante
      fabricante: this.certificadosLicenciasPermisosService.getFabricanteDatos(),
      // Solicita los datos del facturador
      facturador: this.certificadosLicenciasPermisosService.getFacturadorDatos(),
      // Solicita los datos del proveedor
      proveedor: this.certificadosLicenciasPermisosService.getProveedorDatos(),
      // Solicita los datos del certificado
      certificado: this.certificadosLicenciasPermisosService.getCertificadoDatos(),
      // Solicita otros datos adicionales
      otros: this.certificadosLicenciasPermisosService.getOtrosDatos(),
      // Solicita los datos del banco
      banco: this.certificadosLicenciasPermisosService.getBancoDatos(),
      // Solicita los datos del tipo de documento
      tipoDocumento: this.certificadosLicenciasPermisosService.getTipoDeDocumentoDatos()
    })
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respCombinado) => {
        if (respCombinado) {
          // Indica que los datos de respuesta están disponibles
          this.esDatosRespuesta = true;

          // Unifica todas las respuestas en un solo objeto de estado
          const RESPUESTA_UNIFICADA: Solicitud260303State = {
            ...respCombinado.estado,
            ...respCombinado.scian,
            ...respCombinado.clave,
            ...respCombinado.regimen,
            ...respCombinado.mercancias,
            ...respCombinado.tipoProducto,
            ...respCombinado.paisProcedencia,
            ...respCombinado.fabricante,
            ...respCombinado.facturador,
            ...respCombinado.proveedor,
            ...respCombinado.certificado,
            ...respCombinado.otros,
            ...respCombinado.banco,
            ...respCombinado.tipoDocumento
          };

          // Actualiza el estado del formulario con los datos unificados
          this.certificadosLicenciasPermisosService.actualizarEstadoFormulario(RESPUESTA_UNIFICADA);
        }
      });
  }



}
