import { CategoriaMensaje, DocumentoService, FirmaElectronicaComponent, Notificacion,NotificacionesComponent, TramiteFolioStore, base64ToHex, encodeToISO88591Hex, formatFecha } from "@ng-mf/data-access-user";
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, of, switchMap, takeUntil, tap } from 'rxjs';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { GenerarCadenaResponse } from '../../../120301/models/request/generar-cadena-request.model';
import { Router } from '@angular/router';

import { FirmaService } from "../../services/firma.service";
import { Firmar130120Request } from "../../models/request/firma-request.model";
import { FirmarRequest } from "@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model";

/**
 * Componente para el paso cuatro del trámite.
 *
 * Este componente representa el cuarto paso del flujo del trámite,
 * integrando el componente de Firma Electrónica para la validación y envío de la información.
 *
 * @componente
 * @selector app-paso-cuatro
 * @template ./paso-cuatro.component.html
 * @estilo ./paso-cuatro.component.scss
 * @standalone
 * @importa FirmaElectronicaComponent
 *
 * @notas
 * Este paso es fundamental para la validación final mediante firma electrónica.
 */
@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrl: './paso-cuatro.component.scss',
  standalone: true,
  imports: [FirmaElectronicaComponent, NotificacionesComponent],
})
export class PasoCuatroComponent implements OnInit, OnDestroy {

  @Input() idSolicitud!: number;
  /**
   
URL del procedimiento actual utilizada para la navegación entre pasos del trámite.
Se usa para:
Construir la ruta de navegación al acuse de recibo después de la firma exitosa
Reemplazar la URL actual con la del siguiente paso en el flujo
Mantener la coherencia en la navegación del proceso de trámite
@example
```html
<paso-firma procedureUrl="solicitud-11201"></paso-firma>
```
*/@Input() procedureUrl: string = '';
  /**
     
  Código numérico que identifica el tipo de procedimiento o trámite.
  Este valor se utiliza para:
  Determinar el endpoint específico en las llamadas al servicio
  Configurar el comportamiento del proceso de firma según el tipo de trámite
  Validar permisos y reglas de negocio específicas del procedimiento
  @example
  ```html
  <paso-firma [procedure]="11201"></paso-firma>
  ```*/
  @Input() procedure: number = 0;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   * Se utiliza para completar el observable cuando el componente se destruye.
   */
  private destroy$ = new Subject<void>();

  /**
  * URL del servicio o endpoint al que se realizará la solicitud relacionada con la firma.
  * Puede ser utilizado para enviar la firma generada o para obtener la cadena original.
  */
  url: string = '';

  /**
  * Cadena original generada a partir de los datos del trámite.
  * Esta cadena será firmada con el certificado digital y la llave privada proporcionados.
  */
  cadenaOriginal?: string;

  /**
   * Folio del trámite que se está procesando.
   * Este folio es único para cada trámite y se utiliza para identificarlo en el sistema.
   */
  folio!: string;

  /**
   * Objeto que contiene los datos necesarios para generar la cadena original.
   * Este objeto es enviado al servicio de firma electrónica para obtener la cadena original.
   */
  datosCadena!: GenerarCadenaResponse;


  /**
   * Notificación que se muestra al usuario en caso de error o éxito en el proceso de firma.
   * Incluye información sobre el tipo de notificación, categoría, título y mensaje.
   */
  nuevaNotificacion!: Notificacion;



  /**
 * Objeto que contiene los datos reales de la firma electrónica generada después del proceso de firma.
 * Incluye:
 * - firma: Cadena de la firma generada (en base64).
 * - certSerialNumber: Número de serie del certificado digital.
 * - rfc: RFC extraído del certificado.
 * - fechaFin: Fecha de vencimiento del certificado.
 */
  datosFirmaReales!: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  };



  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(
    private router: Router,
    private firmarService: FirmaService,
    private documentoService: DocumentoService,
    private tramiteStore: TramiteFolioStore,) { }

  ngOnInit(): void {

    // Obtener la cadena original del trámite
    this.obtenerCadenaOriginal();
  }

  /**
    * Método para obtener la cadena original del trámite.
    * Este método se encarga de llamar al servicio correspondiente para generar la cadena original.
    */
  obtenerCadenaOriginal(): void {
    const PAYLOAD: GenerarCadenaResponse = {
      num_folio_tramite: null,
      boolean_extranjero: true,
      solicitante: {
        rfc: "AAL0409235E6",
        certificado_serial_number: "string"
      },
       documento_requerido: [
      {
        "id_documento_seleccionado": 2,
        "hash_documento": "38656330353332373039613434623662366339313236393033393631343734346535613836633964",
        "sello_documento": "3d785a782a37f150e5005a59f8f5d57f0b55024aadf83f04227b76603967a53e1e6dced585e45cae9d0c68f971d2f2f9a110e0f0629cc7b6580dae5ed277d77614d53e530006499cb10ac6dcfdf5c1f4ec82e4ea64629c2e376fe33233d7bacac273d042c14c85c83eed5daed3b840afd1c3639f0a2d20381d4303aebef5ab28"
      }
     ],
      cve_rol_capturista: "CapturistaGubernamental",
      cve_usuario_capturista: "Gubernamental",
      fecha_firma: "2025-07-01 20:01:25"
    };
    this.firmarService.postGenerarCadena(this.idSolicitud, PAYLOAD).subscribe({
      next: (resp) => {
        if (resp.codigo !== '00') {
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: resp.error || 'Error al generar la cadena original.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
          return;
        }
        this.cadenaOriginal = typeof resp.datos === 'string' ? resp.datos : undefined;
      },
      error: (error) => {
        console.error('Error al iniciar trámite:', error);
        const MENSAJE = error?.error?.error || 'Error inesperado al iniciar trámite.';
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'error',
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        }
      }
    });
  }

  /**
 * Maneja el evento de firma y obtiene los datos de la firma.
 * @param datos - Objeto que contiene la firma, número de serie del certificado y RFC.
 */
  datosFirma(datos: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  }): void {
    this.datosFirmaReales = datos;
    this.obtieneFirma(datos.firma);
  }

  /**
     * Método para obtener la firma del documento.
     * Este método se encarga de enviar la solicitud de firma al servicio correspondiente.
     * @param firma - La firma en formato base64 que se desea procesar.
     */
  obtieneFirma(firma: string): void {
    if (!this.cadenaOriginal || !this.datosFirmaReales) {
      console.error('Faltan datos para completar la firma');
      this.nuevaNotificacion = {
        tipoNotificacion: 'toastr',
        categoria: CategoriaMensaje.ERROR,
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Faltan datos para completar la firma.',
        cerrar: false,
        txtBtnAceptar: '',
        txtBtnCancelar: '',
      };
      return;
    }

    const CADENAHEX = encodeToISO88591Hex(this.cadenaOriginal);
    const FIRMAHEX = base64ToHex(firma);

    this.documentoService
      .obtenerDatosFirma<FirmarRequest>()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((response) => {
          const PAYLOAD: Firmar130120Request = {
            cadena_original: CADENAHEX,
            cert_serial_number: this.datosFirmaReales.certSerialNumber,
            clave_usuario: this.datosFirmaReales.rfc,
            fecha_firma: formatFecha(new Date()),
            clave_rol: 'Solicitante',
            sello: FIRMAHEX,
            fecha_fin_vigencia: formatFecha(this.datosFirmaReales.fechaFin),
            documentos_requeridos: response.datos?.documentos_requeridos || [],
          };

          return this.firmarService.postFirma(this.idSolicitud, PAYLOAD);
        }),
        tap((firmaResponse: BaseResponse<string>) => {
          // Validar si la firma fue exitosa
          if (firmaResponse.codigo !== '00' || !firmaResponse.datos) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: 'Error al firmar la solicitud',
              mensaje: firmaResponse.mensaje || firmaResponse.error || 'Ocurrió un error al procesar la firma.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
            throw new Error('Firma no exitosa');
          }

          // Éxito: guardar folio
          this.folio = firmaResponse.datos;
        }),
        tap(() => {
          // Solo se ejecuta si todo fue exitoso
          this.tramiteStore.establecerTramite(
            this.folio,
            firma,
            this.idSolicitud ?? 0,
            this.procedure
          );
         console.log('Estado actual del store:', this.tramiteStore.getValue());
         this.router.navigate([this.router.url.replace(this.procedureUrl, 'acuse')]);
        }),
        catchError((error) => {
          console.error('Error en el proceso de firma:', error);
          if (!this.nuevaNotificacion) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: 'Error inesperado',
              mensaje: error?.error.error || 'Ocurrió un error al procesar la firma.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
          return of(null); // Evita que se propague y corte el flujo sin redirigir
        })
      )
      .subscribe();
  }


  /**
 * Método para obtener la cadena original del trámite.
 * Este método se encarga de llamar al servicio correspondiente para obtener la cadena original.
 */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}