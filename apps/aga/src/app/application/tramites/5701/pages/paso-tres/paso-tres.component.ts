import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteFolioStore } from '@ng-mf/data-access-user';
import { FirmaElectronicaService } from '@libs/shared/data-access-user/src/core/services/shared/firma-electronica/firma-electronica.service';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { CadenaOriginalRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/cadena-original-request.model';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  isLoading = false;
  cadenaOriginal?: string;
  datosTramite!: CadenaOriginalRequest;

  constructor(
    private router: Router,
    private tramiteFolioServices: TramiteFolioService,
    private tramiteStore: TramiteFolioStore,
    private firmaService: FirmaElectronicaService,)
  // eslint-disable-next-line no-empty-function
  {

  }

  ngOnInit() {

    this.datosTramite = {
      id_solicitud: 24,
      num_folio_tramite: 'FOLIO-TEST-001',
      boolean_extranjero: false,
      documento_requerido: [
        {
          nombre: 'Martin',
          id: '1',
          id_documento_seleccionado: 1,
          id_tipo_Documento: '1',
          hash_documento: '1234567890ABCDEF',
          sello_documento: '',
          cve_persona: 9007199254740991,
          regla_anexada: true,
          num_anexo_documento: 'string'
        }
      ],
      solicitante: {
        id_domicilio: 42,
        nombre: 'Maria',
        apellido_paterno: 'Chávez',
        apellido_materno: 'Martínez',
        razon_social: 'INTEGRADORA DE URBANIZACIONES SIGNUM, S DE RL DE CV',
        rfc: 'SAAA980822LP1',
        curp: 'SAAA980822LP112',
        cve_usuario: '42',
        descripcion_giro: 'Descripción del giro',
        numero_identificacion_fiscal: '2',
        nss: '123029102',
        correo_electronico: 'luz.arellano@sat.gob.mx'
      },
      cve_rol_capturista: 'CapturistaGubernamental',
      cve_usuario_capturista: 'Gubernamental',
      fecha_firma: '2025-04-15T10:00:00Z'
    };

    this.firmaService.obtenerCadenaOriginal(this.datosTramite).subscribe({
      next: (resp) => {
        this.cadenaOriginal = resp.datos;
      },
      error: (err) => {
        console.error('Error al obtener cadena original:', err);
      }
    });
  }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - Objeto con firma, serialNumber, rfc.
   */
  obtieneFirma(ev: { firma: string; serialNumber: string; rfc: string }): void {
    if (ev && ev.firma && this.cadenaOriginal) {

      const payload: FirmarRequest = {
        id_solicitud: this.datosTramite.id_solicitud,
        cadena_original: btoa(this.cadenaOriginal),
        cert_serial_number: ev.serialNumber,
        cve_usuario: this.datosTramite.solicitante.cve_usuario,
        fec_firma: new Date().toISOString(),
        cve_rol: this.datosTramite.cve_rol_capturista,
        sello: ev.firma,
        fecha_fin_vigencia: new Date().toISOString(),
        documentos_requeridos: []
      };

      this.firmaService.enviarFirma(payload).subscribe({
        next: (resp) => {
          
          this.tramiteFolioServices
            .obtenerTramite(this.datosTramite.id_solicitud)
            .pipe(
              map((tramite) => {
                this.tramiteStore.establecerTramite(tramite.data, ev.firma);
                this.router.navigate(['servicios-extraordinarios/acuse']);
              }),
              catchError((_error) => {
                return _error;
              })
            )
            .subscribe();
        },
        error: (err) => {
          alert('Error al enviar la firma: ' + (err?.mensaje || err));
        }
      });
    }
  }
}

