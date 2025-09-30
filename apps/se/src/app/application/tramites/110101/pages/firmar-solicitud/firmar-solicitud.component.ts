import { Subject, catchError, map, takeUntil } from 'rxjs';

import { CategoriaMensaje, Notificacion } from '@libs/shared/data-access-user/src';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';

import { Component, OnInit } from '@angular/core';
import { GenerarCadenaOrigRequest } from '../../models/request/generar-cadena-original-request.model';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { SolicitudService } from '../../services/solicitud.service';
import { TramiteStore } from '../../../../estados/tramite.store';

/**
 * **Componente para firmar una solicitud**  
 *
 * - Representa la interfaz de usuario para el proceso de firma de una solicitud.  
 * - Utiliza el selector `'app-firmar-solicitud'` para ser invocado en otras partes de la aplicación.  
 * - Su estructura de presentación se define en el archivo `firmar-solicitud.component.html`.  
 */
@Component({
  selector: 'app-firmar-solicitud',
  templateUrl: './firmar-solicitud.component.html',
})

export class FirmarSolicitudComponent implements OnInit {

  /**
   * **Subject para manejar la destrucción del componente**
   * 
   * Este `Subject` se utiliza para cancelar suscripciones y evitar 
   * fugas de memoria cuando el componente es destruido.
   * Se usa comúnmente en el operador `takeUntil` dentro de los observables.
   */
  private destroy$ = new Subject<void>();

  /**
   * Notificación actual que se muestra en el componente.
   *
   * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
   * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
   */
  public nuevaNotificacion!: Notificacion ;
  
  /**
     * Constructor del componente.
     * @param router - El enrutador.
     * @param TramiteFolioServices - Los servicios extraordinarios.
     * @param TramiteAgaceStore - El almacén de trámites.
     */
  constructor(
    private router: Router,
    private TramiteFolioServices: ServiciosPantallaService,
    private TramiteAgaceStore: TramiteStore,
    private solicitudService: SolicitudService
  ) {
    // Constructor
  }

  ngOnInit(): void {
      this.generarCadenaOriginal();
  }
  
  /**
   * @method generarCadenaOriginal
   * @description
   * Genera la cadena original para la solicitud actual, contruyendo un payload con la información necesaria
   * y realizando una petición al servicio correspondiente.
   * Maneja la respuesta mostrando notificaciones al usuario en caso de error.
   * 
   */
  generarCadenaOriginal(): void {
  const PAYLOAD: GenerarCadenaOrigRequest = {

  num_folio_tramite: "TRM-2025-000123",
  boolean_extranjero: false,

  documento_requerido: [
    {
      id_documento_seleccionado: "DOC-001"
    },
    {
      id_documento_seleccionado: "DOC-002"
    }
  ],

  /** Datos del solicitante */
  solicitante: {
    rfc: "AGCB950101HDF",
    curp: "AGCB950101HDFRNN07",
    nombre: "Brandon",
    apellidoMaterno: "Castañeda",
    apellidoPaterno: "Aguiñaga",
    correoElectronico: "brandon.aguiñaga@example.com",
    actividadEconomicaPreponderante: "Servicios de software"
  },

  cve_rol_capturista: "ROL_ADMIN",
  cve_usuario_capturista: "USR12345",
  fecha_firma: "2025-09-29T15:45:00Z"
};

this.solicitudService.postGenerarCadenaOriginal(PAYLOAD)
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: (response) => {
      if (response.codigo === CodigoRespuesta.EXITO) {
        
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: CategoriaMensaje.ERROR,
          modo: 'action',
          titulo: response.error || 'Error en la validacion para generar la cadena original.',
          mensaje: response.causa || response.mensaje || 'Error en la validacion para generar la cadena original.',
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
      }
    },
    error: (error) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const MENSAJE = error?.error?.error || 'Error en la validacion para generar la cadena original.';
      this.nuevaNotificacion = {
        tipoNotificacion: 'toastr',
        categoria: CategoriaMensaje.ERROR,
        modo: 'action',
        titulo: '',
        mensaje: MENSAJE,
        cerrar: false,
        txtBtnAceptar: '',
        txtBtnCancelar: '',
      };
    }
  });

}


  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.TramiteFolioServices
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.TramiteAgaceStore.establecerTramite(tramite.data, FIRMA);
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            return _error;
          })
        )
        .subscribe();
    }
  }
}
