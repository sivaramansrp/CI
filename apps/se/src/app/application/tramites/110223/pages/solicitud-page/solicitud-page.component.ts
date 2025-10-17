import { AlertComponent, BtnContinuarComponent, DatosPasos, esValidObject, getValidDatos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Tramite110223Store, TramiteState } from '../../estados/Tramite110223.store';
import { CommonModule } from '@angular/common';
import { ERROR_FORMA_ALERT } from '../../../110204/constantes/modificacion.enum';
import { PASOS } from '../../enums/constantes-alertas.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoFirmaComponent } from '@libs/shared/data-access-user/src/';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110223Query } from '../../query/tramite110223.query';
import { Payload } from '../../enums/texto.enum';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { CertificadosOrigenService } from '../../services/certificado-origen.service';
// Ensure PasoDosComponent and PasoUnoComponent are standalone components or declared in an NgModule

/**
 * TEXTO DE ALERTA PARA TERCEROS.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'La solicitud ha quedado registrada con el número temporal 202757598. Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone:true,
  imports: [
    WizardComponent,
    CommonModule,
    BtnContinuarComponent,
    FormsModule,
    PasoDosComponent,
    PasoUnoComponent, 
    ReactiveFormsModule,
    AlertComponent,
    PasoFirmaComponent
  ]
})
export class SolicitudPageComponent {
      /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   * const isValid = this.pasoUnoComponent.validateForms();
   * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
   */
    @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
    esFormaValido: boolean = false;
  /**
   * Texto de alerta para terceros.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
      /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
    public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Estado del trámite.
   * @type {TramiteState}
   */
  solicitudState!: TramiteState;

    /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

    /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;
  
  /**
   * Constructor del componente.
   * @param store - El store del trámite.
   * @param query - La consulta del trámite.
   */
  constructor( private store: Tramite110223Store,
        private query: Tramite110223Query,
        public certificadoService: CertificadosOrigenService){
  this.query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });

  }

  /**
   * Construye un arreglo de mercancías seleccionadas a partir de los datos proporcionados.
   * @param arr Arreglo de objetos con los datos de las mercancías seleccionadas.
   * @returns Arreglo de objetos con la estructura requerida para las mercancías seleccionadas.
   * */
  buildMercanciaSeleccionadas(arr: any[]): any[] {
    return arr.map((item: any) => ({
      id: item.id,
      fraccion_arancelaria: item.fraccionArancelaria,
      tipo_factura: item.tipoFactura,
      num_factura: item.numeroFactura,
      complemento_descripcion: item.complementoDescripcion,
      fecha_factura: item.fechaFactura,
      cantidad: item.cantidad,
      umc: item.umc,
      valor_mercancia: item.valorMercancia,
    }));
  }

  /**
   * Guarda los datos proporcionados en el parámetro `item` construyendo un objeto payload y enviándolo al servicio backend.
   * El payload incluye información del solicitante, certificado, destinatario y detalles del certificado.
   *
   * @param item - Objeto que contiene todos los datos necesarios para el payload, incluyendo información del certificado, destinatario y detalles adicionales.
   *
   * @remarks
   * Este método muestra el payload construido en la consola y está diseñado para enviarlo al backend mediante `registroService.guardarDatosPost`.
   * La llamada al servicio actualmente está comentada.
   */
  // guardar(item: any): void {
  guardar(item: TramiteState): Promise<Payload> {
    const MERCANCIA_SELECCIONADAS = this.buildMercanciaSeleccionadas(
      item.mercanciaTabla
    );
    const PAYLOAD = {
      rfc_solicitante: 'AAL0409235E6',
      idSolicitud: this.solicitudState.idSolicitud,
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'ACEROS ALVARADO S.A. DE C.V.',
        actividad_economica: 'Fabricación de productos de hierro y acero',
        correo_electronico: 'contacto@acerosalvarado.com',
        domicilio: {
          pais: 'México',
          codigo_postal: '06700',
          estado: 'Ciudad de México',
          municipio_alcaldia: 'Cuauhtémoc',
          localidad: 'Centro',
          colonia: 'Roma Norte',
          calle: 'Av. Insurgentes Sur',
          numero_exterior: '123',
          numero_interior: 'Piso 5, Oficina A',
          lada: '',
          telefono: '123456',
        },
      },
      certificado: {
        tratado_acuerdo: item.formCertificado['entidadFederativa'],
        pais_bloque: item.formCertificado['bloque'],
        fraccion_arancelaria: item.formCertificado['fraccionArancelariaForm'],
        nombre_comercial: item.formCertificado['nombreComercialForm'],
        registro_producto: item.formCertificado['numeroDeRegistroProductoForm'],
        fecha_inicio: item.formCertificado['fechaInicioInput'],
        fecha_fin: item.formCertificado['fechaFinalInput'],
        realizo_tercer_operador: {
          tercer_operador: item.formCertificado['si'],
          nombre: item.formCertificado['nombres'],
          primer_apellido: item.formCertificado['primerApellido'],
          segundo_apellido: item.formCertificado['segundoApellido'],
          numero_registro_fiscal:
            item.formCertificado['numeroDeRegistroFiscal'],
          razon_social: item.formCertificado['razonSocial'],
        },
        domicilio_tercer_operador: {
          pais: item.formCertificado['pais'],
          ciudad: item.formCertificado['ciudad'],
          calle: item.formCertificado['calle'],
          numero_letra: item.formCertificado['numeroLetra'],
          telefono: item.formCertificado['telefono'],
          correo_electronico: item.formCertificado['correo'],
        },
        mercancias_seleccionadas: item.mercanciaTabla.map((m: Mercancia) => ({
          id: m.id,
          fraccion_arancelaria: m.fraccionArancelaria,
          tipo_factura: m.tipoFactura,
          num_factura: m.numeroFactura,
          complemento_descripcion: m.complementoDescripcion,
          fecha_factura: m.fechaFactura,
          cantidad: m.cantidad,
          umc: m.umc,
          valor_mercancia: m.valorMercancia,
        })),
      },
      // destinatario: {
      //   nombre: item.formDatosDelDestinatario['nombres'],
      //   primer_apellido: item.formDatosDelDestinatario['primerApellido'],
      //   segundo_apellido: item.formDatosDelDestinatario['segundoApellido'],
      //   numero_registro_fiscal:
      //     item.formDatosDelDestinatario['numeroDeRegistroFiscal'],
      //   razon_social: item.formDatosDelDestinatario['razonSocial'],
      //   domicilio: {
      //     ciudad_poblacion_estado_provincia: item.formDestinatario['ciudad'],
      //     calle: item.formDestinatario['calle'],
      //     numero_letra: item.formDestinatario['numeroLetra'],
      //     lada: item.formDestinatario['lada'],
      //     telefono: item.formDestinatario['telefono'],
      //     fax: item.formDestinatario['fax'],
      //     correo_electronico: item.formDestinatario['correoElectronico'],
      //     pais_destino: item.formDestinatario['paisDestino'],
      //   },
      //   generalesRepresentanteLegal: {
      //     lugarRegistro: item.formExportor['lugar'],
      //     nombre: item.formExportor['exportador'],
      //     razonSocial: item.formExportor['nombres'],
      //     puesto: item.formExportor['puesto'],
      //     telefono: item.formExportor['telefono'],
      //     correoElectronico: item.formExportor['correoElectronico'],
      //   },
      //   medio_transporte: item.formDatosDelDestinatario['medioTransporte'],
      // },
      datos_del_certificado: {
        observaciones: item.formDatosCertificado['observacionesDates'],
        idioma: item.formDatosCertificado['idiomaDates'],
        representacion_federal: {
          entidad_federativa:
            item.formDatosCertificado['EntidadFederativaDates'],
          representacion_federal:
            item.formDatosCertificado['representacionFederalDates'],
        },
      },
      historico: {
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
          },
        ],
        ProductoresPorExportadorSeleccionados: [
          {
            nombreCompleto: '',
            rfc: '',
            direccionCompleta: '',
            correoElectronico: '',
            telefono: '',
            fax: '',
          },
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
    };

    return new Promise((resolve, reject) => {
      this.certificadoService.postSolicitud(PAYLOAD).subscribe(
        (response) => {
          if (esValidObject(response) && esValidObject(response.datos)) {
            if (getValidDatos(response.datos?.id_solicitud)) {
              this.store.setIdSolicitud(
                response.datos?.id_solicitud || 0
              );
              this.pasoNavegarPor({ accion: 'cont', valor: 2 });
            } else {
              this.store.setIdSolicitud(0);
            }
          }
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Navega a través de los pasos del asistente según la acción del botón.
   * @param e Objeto que contiene la acción y el valor del índice al que se desea navegar.
   */
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
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */
getValorIndice(e: AccionBoton): void {
  this.esFormaValido = false;

  // Validar formularios antes de continuar desde el paso uno
  if (this.indice === 1 && e.accion === 'cont') {
    const IS_VALID = this.validarTodosFormulariosPasoUno();
    if (!IS_VALID) {
      this.esFormaValido = true;
      return; // Si no es válido, no avanza de página
    }
  }

  // Calcular el nuevo índice basado en la acción
  let indiceActualizado = e.valor;
  if (e.accion === 'cont') {
    indiceActualizado = e.valor + 1;
  } else if (e.accion === 'ant') {
    indiceActualizado = e.valor - 1;
  }

  // Validar que el nuevo índice esté dentro de los límites permitidos
  if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {
    // Actualizar el índice y datosPasos
    this.indice = indiceActualizado;
    this.datosPasos.indice = indiceActualizado;

    if (e.accion === 'cont') {
      this.wizardComponent.siguiente();
    } else if (e.accion === 'ant') {
      this.wizardComponent.atras();
    }
  }
}
/**
 * @descripcion
 * Valida todos los formularios contenidos en el componente `pasoUnoComponent`.
 * 
 * - Si el componente no está inicializado (`pasoUnoComponent` es `null` o `undefined`), 
 *   se asume que no hay formularios por validar y retorna `true`.
 * - Si existe, ejecuta la función `validarFormularios()` del componente 
 *   y retorna `false` en caso de que alguno no sea válido.
 *
 * @returns {boolean}  
 * Retorna `true` si todos los formularios son válidos o si el componente no existe,  
 * de lo contrario retorna `false`.
 *
 * @ejemplo
 * ```ts
 * const esValido = this.validarTodosFormulariosPasoUno();
 * if (!esValido) {
 *   console.warn('El paso uno tiene formularios inválidos');
 * }
 * ```
 */
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
}
