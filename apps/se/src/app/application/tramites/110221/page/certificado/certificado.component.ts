/**
 * @component CertificadoComponent
 * @descripcion
 * Componente responsable de manejar el flujo de pasos para el trámite de certificado zoosanitario para importación.
 * Permite la navegación entre los pasos del wizard, controla el índice actual, y gestiona la validación de las secciones.
 * Además, expone los textos y títulos relevantes para la interfaz y utiliza el componente Wizard para la navegación.
 *
 * @import { Component, ViewChild } from '@angular/core';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 * @import { DatosPasos } from '@ng-mf/data-access-user';
 * @import { PASOS } from '../../constantes/peru-certificado.module';
 */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, doDeepCopy, esValidObject, getValidDatos, JSONResponse, SeccionLibStore } from '@ng-mf/data-access-user';
import { Subject, take, takeUntil } from 'rxjs';
import { AccionBoton } from '../../models/peru-certificado.model';
import { ERROR_FORMA_ALERT } from '@ng-mf/data-access-user';
import { PASOS, Payload } from '../../constantes/peru-certificado.model';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110221Query } from '../../estados/tramite110221.query';

import { Tramite110221State, Tramite110221Store } from '../../estados/tramite110221.store';
import { WizardComponent } from '@ng-mf/data-access-user';

import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';

/**
 * @component CertificadoComponent
 * @description
 * Componente responsable de manejar el flujo de pasos para el trámite de certificado zoosanitario para importación.
 * Permite la navegación entre los pasos del wizard, controla el índice actual, y gestiona la validación de las secciones.
 * Además, expone los textos y títulos relevantes para la interfaz y utiliza el componente Wizard para la navegación.
 *
 * @import { Component, ViewChild } from '@angular/core';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 * @import { DatosPasos } from '@ng-mf/data-access-user';
 * @import { PASOS } from '../../constantes/peru-certificado.module';
 */
@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.scss',
})
export class CertificadoComponent {
  esFormaValido: boolean = false;
  /**
   * Array de pasos del wizard.
   * @type {Array<ListaPasoWizard>}
   */
  pasos = PASOS;

  /**
   * El título del mensaje mostrado en la vista.
   * @type {string | null}
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

    /**
 * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
 * const isValid = this.pasoUnoComponent.validateForms();
 * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
 */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;


  /**
   * El índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de los pasos del wizard, incluyendo textos de botones y número de pasos.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  destroyNotifier$: Subject<void> = new Subject();
    /**
 * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Estado actual de la solicitud, obtenido del store.
   * @type {Tramite110221State}
   */
  solicitudState!: Tramite110221State;

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * Inyecta los servicios necesarios y suscribe a la validación de la forma para actualizar el estado de la sección.
   * @param seccionStore Servicio para manejar el estado de la sección.
   * @param tramiteQuery Query para consultar el estado del trámite.
   */
  constructor(private tramiteStore: Tramite110221Store, 
      private certificadoService: ValidarInicialmenteCertificadoService,
      private tramiteQuery: Tramite110221Query) {
    this.tramiteQuery.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });

  }

  /**
   * Maneja la acción del botón y determina la navegación (siguiente o anterior) en el wizard.
   * @param {AccionBoton} e - Objeto de acción que contiene la acción y el valor a manejar.
   */
getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    if (this.indice === 1 && e.accion === 'cont') {
      this.datosPasos.indice = 1;
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return;
      }
      this.obtenerDatosDelStore();
    } else if (e.valor > 0 && e.valor <= this.pasos.length) {
      this.pasoNavegarPor(e);
    }
  }
   pasoNavegarPor(e: AccionBoton): void {
    this.indice = e.valor;
    this.datosPasos.indice = e.valor;
    if (e.valor > 0 && e.valor < 5) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
/**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.certificadoService
      .getAllState()
      .pipe(take(1))
      .subscribe((data) => {
        this.guardar(data);
      });
  }
   private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }
  guardar(item: Tramite110221State): Promise<JSONResponse> {
  console.log('item', item);

  const MERCANCIA_SELECCIONADAS = this.certificadoService.buildMercanciaSeleccionadas(item.mercanciaTabla);

  const PAYLOAD = {
    rfc_solicitante: 'AAL0409235E6',
    idSolicitud: this.solicitudState.idSolicitud || 0,
    solicitante: {
      rfc: "AAL0409235E6",
      nombre: "ACEROS ALVARADO S.A. DE C.V.",
      actividad_economica: "Fabricación de productos de hierro y acero",
      correo_electronico: "contacto@acerosalvarado.com",
      domicilio: {
        pais: "México",
        codigo_postal: "06700",
        estado: "Ciudad de México",
        municipio_alcaldia: "Cuauhtémoc",
        localidad: "Centro",
        colonia: "Roma Norte",
        calle: "Av. Insurgentes Sur",
        numero_exterior: "123",
        numero_interior: "Piso 5, Oficina A",
        lada: "",
        telefono: "123456"
      }
    },
    certificado: {
      tratado_acuerdo: item.formCertificado['entidadFederativa'],
      pais_bloque: item.formCertificado['bloque'],
      fraccion_arancelaria: item.formCertificado['fraccionArancelaria'],
      nombre_comercial: item.formCertificado['nombreComercial'],
      fecha_inicio: item.formCertificado['fechaInicio'],
      fecha_fin: item.formCertificado['fechaFin'],
      registro_producto: item.formCertificado['registroProducto'],
       blnPeriodo: item.formCertificado['rangoDeFecha'],
      realizo_tercer_operador: {
        tercer_operador: item.formCertificado['si'],
        nombre: item.formCertificado['nombres'],
        primer_apellido: item.formCertificado['primerApellido'],
        segundo_apellido: item.formCertificado['segundoApellido'],
        numero_registro_fiscal: item.formCertificado['numeroDeRegistroFiscal'],
        razon_social: item.formCertificado['razonSocial']
      },
      domicilio_tercer_operador: {
        pais: item.formCertificado['pais'],
        ciudad: item.formCertificado['ciudad'],
        calle: item.formCertificado['calle'],
        numero_letra: item.formCertificado['numeroLetra'],
        lada: item.formCertificado['lada'],
        telefono: item.formCertificado['telefono'],
        fax: item.formCertificado['fax'],
        correo_electronico: item.formCertificado['correo']
      },
      mercancias_seleccionadas: MERCANCIA_SELECCIONADAS
    },
    
    historico:{
      datosConfidencialesProductor: true,
      productorMismoExportador: true,
      productoresPorExportador: [
        {
        nombreCompleto: '',
         rfc: '',
         direccionCompleta: '',
        correoElectronico: '',
        telefono: '',
        fax: '',    

      }
      ],
      ProductoresPorExportadorSeleccionados: [
        {
          nombreCompleto: '',
          rfc: '',
          direccionCompleta: '',
          correoElectronico: '',
          telefono: '',
          fax: '',
        }
      ],
      mercanciasProductor: [
          {
            fraccionArancelaria: '',
            cantidadComercial: '',
            descUnidadMedidaComercial: '',
            valorTransaccional: '',
            descFactura: '',
            numeroFactura: '',
            complementoDescripcion: '',
            fechaFactura: '',
            rfcProductor: '',
          },
        ],

    },
    destinatario: {
        nombre: item.formDestinatario['nombre'],
        numero_registro_fiscal: item.formDestinatario['numeroFiscal'],
        domicilio: {
          calle: item.formDestinatario['calle'],
          numero_letra: item.formDestinatario['numeroLetra'],
          ciudad_poblacion_estado_provincia: item.formDestinatario['ciudad'],
          pais_destino: item.formDestinatario['nacion'],
          correo_electronico: item.formDestinatario['correoElectronico'],
          telefono: item.formDestinatario['telefono'],
          fax: item.formDestinatario['fax'],
           pais: item.formCertificado['pais'],

        },
        lugar: item.grupoRepresentativo['lugar'],
        legal_de_exportador: item.grupoRepresentativo['nombre'],
        empresa: item.grupoRepresentativo['empresa'],
        cargo: item.grupoRepresentativo['cargo'],
        registro_fiscal: item.grupoRepresentativo['registroFiscal'],
        correo_electronico: item.grupoRepresentativo['correo'],
        telefono: item.grupoRepresentativo['telefono'],
        fax: item.grupoRepresentativo['fax'],
        pais_destino: item.formDestinatario['nacion'],

      },
      datos_del_certificado: {
      observaciones: item.formDatosCertificado['observacionesDates'],
      representacion_federal: {
        entidad_federativa: item.formDatosCertificado['EntidadFederativaDates'],
        representacion_federal: item.formDatosCertificado['representacionFederalDates']
      }
    },
  };

  console.log(PAYLOAD, 'PAYLOAD');

return new Promise((resolve, reject) => {
      this.certificadoService.guardarDatosPost(PAYLOAD).subscribe(
        (response) => {
          if (esValidObject(response) && esValidObject(response['datos'])) {
            const DATOS = response['datos'] as { idSolicitud?: number };
            if (getValidDatos(DATOS.idSolicitud)) {
              this.tramiteStore.setIdSolicitud(DATOS.idSolicitud ?? 0);
              this.pasoNavegarPor({ accion: 'cont', valor: 2 });
            } else {
              this.tramiteStore.setIdSolicitud(0);
            }
          }
          resolve({
            id: response['id'] ?? 0,
            descripcion: response['descripcion'] ?? '',
            codigo: response['codigo'] ?? '',
            data: response['data'] ?? response['datos'] ?? null,
            ...response,
          } as JSONResponse);
        },
        (error) => {
          reject(error);
          // this.toastr.error('Error al buscar Mercancia');
        }
      );
    });
}
}