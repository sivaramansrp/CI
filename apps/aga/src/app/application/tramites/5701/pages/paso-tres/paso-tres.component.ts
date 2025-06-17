import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadenaOriginalRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/cadena-original-request.model';
import { FirmaElectronicaService } from '@libs/shared/data-access-user/src/core/services/shared/firma-electronica/firma-electronica.service';
import { base64ToHex, encodeToISO88591Hex } from '@libs/shared/data-access-user/src/core/utils/utilerias';
import { TramiteFolioService, TramiteFolioStore } from '@ng-mf/data-access-user';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { Tramite5701Store } from '../../../../core/estados/tramites/tramite5701.store';
import { BaseResponse } from '../../../../core/models/5701/base-response.model';
import { FirmarRequest } from '../../../../core/models/5701/firmar-request-model';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { DocumentosService } from '../../../../core/services/5701/documentos/documentos.service';



@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent implements OnInit {
  /**
   * @description URL de la aplicación, se utiliza para redirigir al usuario al acuse del trámite.
   */
  url: string = '';
  datosTramite!: CadenaOriginalRequest;
  cadenaOriginal?: string;
  datosFirmaReales?: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  };

  /**
   * @description Constructor del componente PasoTresComponent.
   * @param router - Inyecta el servicio Router para la navegación.
   * @param tramiteFolioServices - Inyecta el servicio TramiteFolioService para obtener los datos del trámite.
   * @param tramiteStore - Inyecta el store TramiteFolioStore para manejar el estado del trámite.
   */
  constructor(
    private router: Router,
    private tramiteFolioServices: TramiteFolioService,
    private tramiteStore: TramiteFolioStore,
    private firmaService: DocumentosService,
    private firma: FirmaElectronicaService,
    private tramite5701Query: Tramite5701Query,
    private tramite5701Store: Tramite5701Store
  ) { }

  /**
   * Método de ciclo de vida de Angular que se llama una vez que el componente ha sido inicializado.
   * En este método, se obtiene la URL actual del router, se separa en partes y se construye la URL base
   */
  ngOnInit(): void {
    const URL_ACTUAL = this.router.url;
    const URL_SEPARADA = URL_ACTUAL.split('/');
    this.url = URL_SEPARADA.slice(0, 3).join('/');
     this.onObtenerCadenaOriginal();
  }

  onObtenerCadenaOriginal(): void {
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

    this.firma.obtenerCadenaOriginal(this.datosTramite).subscribe({
      next: (resp) => {
        this.cadenaOriginal = resp.datos;
      },
      error: (err) => {
        console.error('Error al obtener cadena original:', err);
      }
    });
  }

  /**
   * Maneja el evento de firma y obtiene los datos de la firma.
   * @param datos - Objeto que contiene la firma, número de serie del certificado y RFC.
   */
  onDatosFirma(datos: { firma: string; certSerialNumber: string; rfc: string, fechaFin: string }): void {
    this.datosFirmaReales = datos;
    this.obtieneFirma(datos.firma);
  }

  
  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(firma: string): void {
    if (!this.cadenaOriginal || !this.datosFirmaReales) {
      console.error('Faltan datos para completar la firma');
      return;
    }

    /** Funcines de conversión usadas de la utilería */
    const cadenaHex = encodeToISO88591Hex(this.cadenaOriginal);
    const firmaHex = base64ToHex(firma);


    const ID_SOLICITUD = this.tramite5701Query.getValue().idSolicitud;
    const PAYLOAD: FirmarRequest = {
      id_solicitud: Number(ID_SOLICITUD),
      cadena_original: cadenaHex,
      cert_serial_number: this.datosFirmaReales.certSerialNumber,
      clave_usuario: this.datosFirmaReales.rfc,
      fecha_firma: new Date().toISOString(),
      clave_rol: 'Solicitante',
      sello: firmaHex,
      fecha_fin_vigencia: this.datosFirmaReales.fechaFin,
      documentos_requeridos: [
        {
          id_documento_seleccionado: 2,
          hash_documento:
            '38656330353332373039613434623662366339313236393033393631343734346535613836633964',
          sello_documento:
            '3d785a782a37f150e5005a59f8f5d57f0b55024aadf83f04227b76603967a53e1e6dced585e45cae9d0c68f971d2f2f9a110e0f0629cc7b6580dae5ed277d77614d53e530006499cb10ac6dcfdf5c1f4ec82e4ea64629c2e376fe33233d7bacac273d042c14c85c83eed5daed3b840afd1c3639f0a2d20381d4303aebef5ab28',
        },
      ],
    };

    this.firmaService
      .enviarFirma(PAYLOAD)
      .pipe(
        tap((response: BaseResponse<string>) => {
          if (response.datos) {
            this.tramite5701Store.setFolioFirma(response.datos);
          }
        }),
        switchMap(() => this.tramiteFolioServices.obtenerTramite(19)),
        switchMap((tramite) => {
          this.tramiteStore.establecerTramite(tramite.data, firma);
          return this.tramiteFolioServices.generarFolio().pipe(
            map((tramiteConFolio) => {
              const NUM_ALEATORIO = Math.floor(Math.random() * 90) + 10;
              return `${tramiteConFolio.datos}${NUM_ALEATORIO}`;
            })
          );
        }),
        tap((folioCompleto) => {
          this.tramiteStore.establecerTramite(folioCompleto, firma);
          this.router.navigate([`${this.url}/acuse`], { queryParams: { solicitud: ID_SOLICITUD } });
        }),
        catchError((error) => {
          console.error('Error en el proceso de firma:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}

