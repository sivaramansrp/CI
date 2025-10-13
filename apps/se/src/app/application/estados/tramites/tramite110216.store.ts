import { AgregarDatosProductorFormulario, DisponiblesTabla, FormularioMercancia, GrupoDeDomicilio, GrupoTratado, HistoricoColumnas, SeleccionadasTabla } from '../../tramites/110216/models/certificado-origen.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { GrupoDeDirecciones } from '../../tramites/110216/models/certificado-origen.model';
import { GrupoDeTransporte } from '../../tramites/110216/models/certificado-origen.model';
import { GrupoOperador } from '../../tramites/110216/models/certificado-origen.model';
import { GrupoReceptor } from '../../tramites/110216/models/certificado-origen.model';
import { GrupoRepresentativo } from '../../tramites/110216/models/certificado-origen.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
/**
 * Interfaz que define el estado inicial del trámite 110216.
 * 
 * Esta interfaz contiene todas las propiedades necesarias para gestionar el estado
 * del trámite, incluyendo datos del productor, receptor, transporte, mercancía, entre otros.
 */
export interface Tramite110216State {
  /** ID de la solicitud */
  idSolicitud: number | null;

  /**
   * Observaciones generales del trámite.
   */
  observaciones: string;

  /**
   * Idioma seleccionado para el trámite.
   */
  idioma: string | null;
  /**
   * Entidad federativa seleccionada.
   */
  entidadFederativa: string | null;

  /**
   * Representación federal seleccionada.
   */
  representacionFederal: string | null;

  /**
   * Indica si los datos del productor son confidenciales.
   */
  datosConfidencialesProductor: boolean;

  /**
   * Indica si el productor es el mismo que el exportador.
   */
  productorMismoExportador: boolean;

  /**
   * Datos del formulario para agregar un productor.
   */
  agregarDatosProductorFormulario: AgregarDatosProductorFormulario;

  /**
   * Información del receptor.
   */
  grupoReceptor: GrupoReceptor;

  /**
   * Información de las direcciones del receptor.
   */
  grupoDeDirecciones: GrupoDeDirecciones;

  /**
   * Información representativa del trámite.
   */
  grupoRepresentativo: GrupoRepresentativo;

  /**
   * Información del transporte utilizado.
   */
  grupoDeTransporte: GrupoDeTransporte;

  /**
   * Paso activo en el flujo del trámite.
   */
  pasoActivo: number;

  /**
   * Pestaña activa en el flujo del trámite.
   */
  pestanaActiva: number;

  /**
   * Indica si hay un tercer operador involucrado.
   */
  tercerOperador: boolean;

  /**
   * Información del operador.
   */
  grupoOperador: GrupoOperador;

  /**
   * Información del domicilio.
   */
  grupoDeDomicilio: GrupoDeDomicilio;

  /**
   * Información del tratado comercial.
   */
  grupoTratado: GrupoTratado;

  /**
   * Información del formulario de mercancía.
   */
  formularioMercancia: FormularioMercancia;

  /**
   * @property {Object} formulario - Otros datos de formularios auxiliares.
   * @description
   * Contiene otros datos relevantes para el trámite, como datos confidenciales del productor y si el productor es el mismo exportador.
   */
  formulario: { [key: string]: unknown};

  /**
   * @property {Object} datosProductorFormulario - Datos adicionales del productor.
   * @description
   * Contiene campos adicionales para el formulario del productor, como número de registro fiscal y fax.
   */
  datosProductorFormulario: { [key: string]: unknown};

  /**
   * @property {HistoricoColumnas[]} productoresExportador
   * @description Lista de productores asociados al exportador.
   */
  productoresExportador: HistoricoColumnas[];
  /**
     * @property {SeleccionadasTabla[]} mercanciaSeleccionadasTablaDatos
     * @description Lista de mercancías seleccionadas para ser mostradas en la tabla de datos.
     * 
     * Contiene los datos de las mercancías que han sido seleccionadas por el usuario durante el trámite.
     */
  mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[];
  /**
   * @property {DisponiblesTabla[]} mercanciaDisponsiblesTablaDatos
   * @description Lista de mercancías disponibles para ser mostradas en la tabla de datos.
   * 
   * Contiene los datos de las mercancías que están disponibles para ser seleccionadas por el usuario durante el trámite.
   */
  mercanciaDisponsiblesTablaDatos: DisponiblesTabla[];

  formValidity?: {
    datosCertificado?: boolean;
    destinatario?: boolean;
    histProductores?: boolean;
    certificadoOrigen?: boolean;
  };
}

/**
 * Función que crea el estado inicial del trámite 110216.
 * 
 * @returns {Tramite110216State} El estado inicial del trámite.
 */
export function createInitialState(): Tramite110216State {
  return {
    idSolicitud: 0,
    observaciones: '',
    pasoActivo: 1,
    pestanaActiva: 1,
    idioma: null,
    entidadFederativa: null,
    representacionFederal: null,
    datosConfidencialesProductor: false,
    productorMismoExportador: false,
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: ''
    },
    grupoReceptor: {
      nombre: '',
      apellidoPrimer: '',
      apellidoSegundo: '',
      numeroFiscal: '',
      razonSocial: '',
    },
    grupoDeDirecciones: {
      ciudad: '',
      calle: '',
      numeroLetra: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    grupoRepresentativo: {
      lugar: '',
      nombreExportador: '',
      empresa: '',
      cargo: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    grupoDeTransporte: {
      puertoEmbarque: '',
      puertoDesembarque: '',
      puertoTransito: '',
      nombreEmbarcacion: '',
      numeroVuelo: '',
    },
    tercerOperador: false,
    grupoOperador: {
      nombre: '',
      apellidoPrimer: '',
      apellidoSegundo: '',
      numeroFiscal: '',
      razonSocial: '',
    },
    grupoDeDomicilio: {
      pais: '',
      ciudad: '',
      calle: '',
      numeroLetra: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    grupoTratado: {
      tratado: '',
      pais: '',
      fraccionArancelaria: '',
      numeroRegistro: '',
      nombreComercial: '',
      fechaFinalInput: '',
      fechaInicialInput: '',
    },
    formularioMercancia: {
      fraccionMercanciaArancelaria: '',
      nombreTecnico: '',
      nombreComercialDelaMercancia: '',
      criterioParaConferir: '',
      nombreEnIngles: '',
      otrasInstancias: '',
      cantidad: '',
      pais: '',
      valorDelaMercancia: '',
      complementoDescripcion: '',
      tipoFactura: '',
      fecha: '',
      numeroFactura: '',
    },
    productoresExportador: [],
    mercanciaSeleccionadasTablaDatos: [],
    mercanciaDisponsiblesTablaDatos: [],
    formulario:{
      datosConfidencialesProductor: '',
      productorMismoExportador: '',
    },
    datosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: '',      
    },
    formValidity: {},
  };
}
/**
 * Servicio para gestionar el estado del trámite 110216.
 * 
 * Este servicio utiliza Akita para manejar el estado del trámite, permitiendo
 * actualizaciones y consultas de las propiedades definidas en el estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110216', resettable: true })
export class Tramite110216Store extends Store<Tramite110216State> {
  /**
 * Constructor de la clase Tramite110216Store.
 * 
 * Inicializa el estado del trámite utilizando la función `createInitialState`.
 */
  constructor() {
    super(createInitialState());
  }
  /**
   * Guarda el ID de la solicitud en el estado.
   *
   * @param idSolicitud - El ID de la solicitud que se va a guardar.
   */
  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }
  /**
   * Actualiza el paso activo en el flujo del trámite.
   * 
   * Este método permite establecer el paso actual en el flujo del trámite.
   * 
   * @param {number} pasoActivo - El número del paso activo a establecer.
   */
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }

  /**
   * Actualiza la pestaña activa en el flujo del trámite.
   * 
   * Este método permite establecer la pestaña activa en el flujo del trámite.
   * 
   * @param {number} pestanaActiva - El número de la pestaña activa a establecer.
   */
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }

  /**
   * Actualiza las observaciones generales del trámite.
   * 
   * Este método permite establecer las observaciones relacionadas con el trámite.
   * 
   * @param {string} observaciones - Las observaciones a establecer.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  /**
   * Actualiza el idioma seleccionado para el trámite.
   * 
   * Este método permite establecer el idioma seleccionado en el trámite.
   * 
   * @param {Catalogo} idioma - El idioma a establecer.
   */
  public setIdioma(idioma: string): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }

  /**
   * Actualiza la entidad federativa seleccionada para el trámite.
   * 
   * Este método permite establecer la entidad federativa seleccionada en el trámite.
   * 
   * @param {Catalogo} entidadFederativa - La entidad federativa a establecer.
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * Actualiza la representación federal seleccionada para el trámite.
   * 
   * Este método permite establecer la representación federal seleccionada en el trámite.
   * 
   * @param {Catalogo} representacionFederal - La representación federal a establecer.
   */
  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }

  /**
   * Actualiza si los datos del productor son confidenciales.
   * 
   * Este método permite establecer si los datos del productor son confidenciales.
   * 
   * @param {boolean} datosConfidencialesProductor - Valor booleano que indica si los datos son confidenciales.
   */
  public setDatosConfidencialesProductor(datosConfidencialesProductor: boolean): void {
    this.update((state) => ({
      ...state,
      datosConfidencialesProductor,
    }));
  }

  /**
   * Actualiza si el productor es el mismo que el exportador.
   * 
   * Este método permite establecer si el productor es el mismo que el exportador.
   * 
   * @param {boolean} productorMismoExportador - Valor booleano que indica si el productor es el mismo que el exportador.
   */
  public setProductorMismoExportador(productorMismoExportador: boolean): void {
    this.update((state) => ({
      ...state,
      productorMismoExportador,
    }));
  }
  /**
 * Actualiza el fax del productor en el formulario de agregar datos.
 * 
 * Este método permite establecer el valor del fax en el formulario de agregar datos del productor.
 * 
 * @param {string} fax - El número de fax a establecer.
 */
  public setAgregarDatosProductorFax(fax: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: { ...state.agregarDatosProductorFormulario, fax },
    }));
  }

  /**
   * Actualiza el número de registro fiscal del productor en el formulario de agregar datos.
   * 
   * Este método permite establecer el número de registro fiscal en el formulario de agregar datos del productor.
   * 
   * @param {string} numeroRegistroFiscal - El número de registro fiscal a establecer.
   */
  public setAgregarDatosProductorNumeroRegistroFiscal(numeroRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: { ...state.agregarDatosProductorFormulario, numeroRegistroFiscal },
    }));
  }

  /**
   * Actualiza el nombre del receptor en el grupo receptor.
   * 
   * Este método permite establecer el nombre del receptor en el grupo receptor.
   * 
   * @param {string} nombre - El nombre del receptor a establecer.
   */
  public setGrupoReceptorNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, nombre },
    }));
  }

  /**
   * Actualiza el primer apellido del receptor en el grupo receptor.
   * 
   * Este método permite establecer el primer apellido del receptor en el grupo receptor.
   * 
   * @param {string} apellidoPrimer - El primer apellido del receptor a establecer.
   */
  public setGrupoReceptorApellidoPrimer(apellidoPrimer: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, apellidoPrimer },
    }));
  }

  /**
   * Actualiza el segundo apellido del receptor en el grupo receptor.
   * 
   * Este método permite establecer el segundo apellido del receptor en el grupo receptor.
   * 
   * @param {string} apellidoSegundo - El segundo apellido del receptor a establecer.
   */
  public setGrupoReceptorApellidoSegundo(apellidoSegundo: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, apellidoSegundo },
    }));
  }

  /**
   * Actualiza el número fiscal del receptor en el grupo receptor.
   * 
   * Este método permite establecer el número fiscal del receptor en el grupo receptor.
   * 
   * @param {string} numeroFiscal - El número fiscal del receptor a establecer.
   */
  public setGrupoReceptorNumeroFiscal(numeroFiscal: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, numeroFiscal },
    }));
  }

  /**
   * Actualiza la razón social del receptor en el grupo receptor.
   * 
   * Este método permite establecer la razón social del receptor en el grupo receptor.
   * 
   * @param {string} razonSocial - La razón social del receptor a establecer.
   */
  public setGrupoReceptorRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, razonSocial },
    }));
  }

  /**
   * Actualiza la ciudad en el grupo de direcciones.
   * 
   * Este método permite establecer la ciudad en el grupo de direcciones del receptor.
   * 
   * @param {string} ciudad - La ciudad a establecer.
   */
  public setGrupoDeDireccionesCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, ciudad },
    }));
  }
  /**
 * Actualiza la calle en el grupo de direcciones.
 * 
 * Este método permite establecer la calle en el grupo de direcciones del receptor.
 * 
 * @param {string} calle - La calle a establecer.
 */
  public setGrupoDeDireccionesCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, calle },
    }));
  }

  /**
   * Actualiza el número o letra en el grupo de direcciones.
   * 
   * Este método permite establecer el número o letra en el grupo de direcciones del receptor.
   * 
   * @param {string} numeroLetra - El número o letra a establecer.
   */
  public setGrupoDeDireccionesNumeroLetra(numeroLetra: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, numeroLetra },
    }));
  }

  /**
   * Actualiza la lada en el grupo de direcciones.
   * 
   * Este método permite establecer la lada en el grupo de direcciones del receptor.
   * 
   * @param {string} lada - La lada a establecer.
   */
  public setGrupoDeDireccionesLada(lada: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, lada },
    }));
  }

  /**
   * Actualiza el teléfono en el grupo de direcciones.
   * 
   * Este método permite establecer el teléfono en el grupo de direcciones del receptor.
   * 
   * @param {string} telefono - El teléfono a establecer.
   */
  public setGrupoDeDireccionesTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, telefono },
    }));
  }

  /**
   * Actualiza el fax en el grupo de direcciones.
   * 
   * Este método permite establecer el fax en el grupo de direcciones del receptor.
   * 
   * @param {string} fax - El fax a establecer.
   */
  public setGrupoDeDireccionesFax(fax: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, fax },
    }));
  }

  /**
   * Actualiza el correo electrónico en el grupo de direcciones.
   * 
   * Este método permite establecer el correo electrónico en el grupo de direcciones del receptor.
   * 
   * @param {string} correoElectronico - El correo electrónico a establecer.
   */
  public setGrupoDeDireccionesCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, correoElectronico },
    }));
  }

  /**
   * Actualiza el lugar en el grupo representativo.
   * 
   * Este método permite establecer el lugar en el grupo representativo del trámite.
   * 
   * @param {string} lugar - El lugar a establecer.
   */
  public setGrupoRepresentativoLugar(lugar: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, lugar },
    }));
  }

  /**
   * Actualiza el nombre del exportador en el grupo representativo.
   * 
   * Este método permite establecer el nombre del exportador en el grupo representativo del trámite.
   * 
   * @param {string} nombreExportador - El nombre del exportador a establecer.
   */
  public setGrupoRepresentativoNombreExportador(nombreExportador: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, nombreExportador },
    }));
  }

  /**
   * Actualiza la empresa en el grupo representativo.
   * 
   * Este método permite establecer la empresa en el grupo representativo del trámite.
   * 
   * @param {string} empresa - La empresa a establecer.
   */
  public setGrupoRepresentativoEmpresa(empresa: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, empresa },
    }));
  }
  /**
 * Actualiza el cargo en el grupo representativo.
 * 
 * Este método permite establecer el cargo en el grupo representativo del trámite.
 * 
 * @param {string} cargo - El cargo a establecer.
 */
  public setGrupoRepresentativoCargo(cargo: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, cargo },
    }));
  }

  /**
   * Actualiza la lada en el grupo representativo.
   * 
   * Este método permite establecer la lada en el grupo representativo del trámite.
   * 
   * @param {string} lada - La lada a establecer.
   */
  public setGrupoRepresentativoLada(lada: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, lada },
    }));
  }

  /**
   * Actualiza el teléfono en el grupo representativo.
   * 
   * Este método permite establecer el teléfono en el grupo representativo del trámite.
   * 
   * @param {string} telefono - El teléfono a establecer.
   */
  public setGrupoRepresentativoTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, telefono },
    }));
  }

  /**
   * Actualiza el fax en el grupo representativo.
   * 
   * Este método permite establecer el fax en el grupo representativo del trámite.
   * 
   * @param {string} fax - El fax a establecer.
   */
  public setGrupoRepresentativoFax(fax: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, fax },
    }));
  }

  /**
   * Actualiza el correo electrónico en el grupo representativo.
   * 
   * Este método permite establecer el correo electrónico en el grupo representativo del trámite.
   * 
   * @param {string} correoElectronico - El correo electrónico a establecer.
   */
  public setGrupoRepresentativoCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, correoElectronico },
    }));
  }

  /**
   * Actualiza el puerto de embarque en el grupo de transporte.
   * 
   * Este método permite establecer el puerto de embarque en el grupo de transporte del trámite.
   * 
   * @param {string} puertoEmbarque - El puerto de embarque a establecer.
   */
  public setgrupoDeTransportePuertoEmbarque(puertoEmbarque: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, puertoEmbarque },
    }));
  }

  /**
   * Actualiza el puerto de desembarque en el grupo de transporte.
   * 
   * Este método permite establecer el puerto de desembarque en el grupo de transporte del trámite.
   * 
   * @param {string} puertoDesembarque - El puerto de desembarque a establecer.
   */
  public setgrupoDeTransportePuertoDesembarque(puertoDesembarque: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, puertoDesembarque },
    }));
  }

  /**
   * Actualiza el puerto de tránsito en el grupo de transporte.
   * 
   * Este método permite establecer el puerto de tránsito en el grupo de transporte del trámite.
   * 
   * @param {string} puertoTransito - El puerto de tránsito a establecer.
   */
  public setgrupoDeTransportePuertoTransito(puertoTransito: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, puertoTransito },
    }));
  }

  /**
   * Actualiza el nombre de la embarcación en el grupo de transporte.
   * 
   * Este método permite establecer el nombre de la embarcación en el grupo de transporte del trámite.
   * 
   * @param {string} nombreEmbarcacion - El nombre de la embarcación a establecer.
   */
  public setgrupoDeTransporteNombreEmbarcacion(nombreEmbarcacion: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, nombreEmbarcacion },
    }));
  }

  /**
   * Actualiza el número de vuelo en el grupo de transporte.
   * 
   * Este método permite establecer el número de vuelo en el grupo de transporte del trámite.
   * 
   * @param {string} numeroVuelo - El número de vuelo a establecer.
   */
  public setgrupoDeTransporteNumeroVuelo(numeroVuelo: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, numeroVuelo },
    }));
  }

  /**
   * Actualiza si hay un tercer operador involucrado.
   * 
   * Este método permite establecer si hay un tercer operador involucrado en el trámite.
   * 
   * @param {boolean} tercerOperador - Valor booleano que indica si hay un tercer operador.
   */
  public setTercerOperador(tercerOperador: boolean): void {
    this.update((state) => ({
      ...state,
      tercerOperador,
    }));
  }

  /**
   * Actualiza el nombre del operador en el grupo operador.
   * 
   * Este método permite establecer el nombre del operador en el grupo operador del trámite.
   * 
   * @param {string} nombre - El nombre del operador a establecer.
   */
  public setGrupoOperadorNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, nombre },
    }));
  }

  /**
   * Actualiza el primer apellido del operador en el grupo operador.
   * 
   * Este método permite establecer el primer apellido del operador en el grupo operador del trámite.
   * 
   * @param {string} apellidoPrimer - El primer apellido del operador a establecer.
   */
  public setGrupoOperadorApellidoPrimer(apellidoPrimer: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, apellidoPrimer },
    }));
  }
  /**
 * Actualiza el segundo apellido del operador en el grupo operador.
 * 
 * Este método permite establecer el segundo apellido del operador en el grupo operador del trámite.
 * 
 * @param {string} apellidoSegundo - El segundo apellido del operador a establecer.
 */
  public setGrupoOperadorSegundo(apellidoSegundo: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, apellidoSegundo },
    }));
  }

  /**
   * Actualiza el número fiscal del operador en el grupo operador.
   * 
   * Este método permite establecer el número fiscal del operador en el grupo operador del trámite.
   * 
   * @param {string} numeroFiscal - El número fiscal del operador a establecer.
   */
  public setGrupoOperadorNumeroFiscal(numeroFiscal: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, numeroFiscal },
    }));
  }

  /**
   * Actualiza la razón social del operador en el grupo operador.
   * 
   * Este método permite establecer la razón social del operador en el grupo operador del trámite.
   * 
   * @param {string} razonSocial - La razón social del operador a establecer.
   */
  public setGrupoOperadorRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, razonSocial },
    }));
  }

  /**
   * Actualiza el país en el grupo de domicilio.
   * 
   * Este método permite establecer el país en el grupo de domicilio del trámite.
   * 
   * @param {string} pais - El país a establecer.
   */
  public setGrupoDeDomicilioPais(pais: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, pais },
    }));
  }

  /**
   * Actualiza la ciudad en el grupo de domicilio.
   * 
   * Este método permite establecer la ciudad en el grupo de domicilio del trámite.
   * 
   * @param {string} ciudad - La ciudad a establecer.
   */
  public setGrupoDeDomicilioCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, ciudad },
    }));
  }

  /**
   * Actualiza la calle en el grupo de domicilio.
   * 
   * Este método permite establecer la calle en el grupo de domicilio del trámite.
   * 
   * @param {string} calle - La calle a establecer.
   */
  public setGrupoDeDomicilioCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, calle },
    }));
  }

  /**
   * Actualiza el número o letra en el grupo de domicilio.
   * 
   * Este método permite establecer el número o letra en el grupo de domicilio del trámite.
   * 
   * @param {string} numeroLetra - El número o letra a establecer.
   */
  public setGrupoDeDomicilioNumeroLetra(numeroLetra: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, numeroLetra },
    }));
  }

  /**
   * Actualiza la lada en el grupo de domicilio.
   * 
   * Este método permite establecer la lada en el grupo de domicilio del trámite.
   * 
   * @param {string} lada - La lada a establecer.
   */
  public setGrupoDeDomicilioLada(lada: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, lada },
    }));
  }

  /**
   * Actualiza el teléfono en el grupo de domicilio.
   * 
   * Este método permite establecer el teléfono en el grupo de domicilio del trámite.
   * 
   * @param {string} telefono - El teléfono a establecer.
   */
  public setGrupoDeDomicilioTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, telefono },
    }));
  }

  /**
   * Actualiza el fax en el grupo de domicilio.
   * 
   * Este método permite establecer el fax en el grupo de domicilio del trámite.
   * 
   * @param {string} fax - El fax a establecer.
   */
  public setGrupoDeDomicilioFax(fax: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, fax },
    }));
  }

  /**
   * Actualiza el correo electrónico en el grupo de domicilio.
   * 
   * Este método permite establecer el correo electrónico en el grupo de domicilio del trámite.
   * 
   * @param {string} correoElectronico - El correo electrónico a establecer.
   */
  public setGrupoDeDomicilioCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, correoElectronico },
    }));
  }

  /**
   * Actualiza todo el grupo de domicilio.
   * 
   * Este método permite establecer todos los valores del grupo de domicilio del trámite.
   * 
   * @param {GrupoDeDomicilio} grupoDeDomicilio - El objeto que contiene los valores del grupo de domicilio a establecer.
   */
  public setGrupoDeDomicilio(grupoDeDomicilio: GrupoDeDomicilio): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio,
    }));
  }

  /**
 * Actualiza el tratado en el grupo tratado.
 * 
 * Este método permite establecer el tratado en el grupo tratado del trámite.
 * 
 * @param {string} tratado - El tratado a establecer.
 */
  public setGrupoTratadoTratado(tratado: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, tratado },
    }));
  }

  /**
   * Actualiza el país en el grupo tratado.
   * 
   * Este método permite establecer el país en el grupo tratado del trámite.
   * 
   * @param {string} pais - El país a establecer.
   */
  public setGrupoTratadoPais(pais: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, pais },
    }));
  }

  /**
   * Actualiza todo el grupo tratado.
   * 
   * Este método permite establecer todos los valores del grupo tratado del trámite.
   * 
   * @param {GrupoTratado} grupoTratado - El objeto que contiene los valores del grupo tratado a establecer.
   */
  public setGrupoTratado(grupoTratado: GrupoTratado): void {
    this.update((state) => ({
      ...state,
      grupoTratado,
    }));
  }

  /**
   * Actualiza la fracción arancelaria en el grupo tratado.
   * 
   * Este método permite establecer la fracción arancelaria en el grupo tratado del trámite.
   * 
   * @param {string} fraccionArancelaria - La fracción arancelaria a establecer.
   */
  public setGrupoTratadoFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, fraccionArancelaria },
    }));
  }

  /**
   * Actualiza el número de registro en el grupo tratado.
   * 
   * Este método permite establecer el número de registro en el grupo tratado del trámite.
   * 
   * @param {string} numeroRegistro - El número de registro a establecer.
   */
  public setGrupoTratadoNumeroRegistro(numeroRegistro: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, numeroRegistro },
    }));
  }

  /**
   * Actualiza el nombre comercial en el grupo tratado.
   * 
   * Este método permite establecer el nombre comercial en el grupo tratado del trámite.
   * 
   * @param {string} nombreComercial - El nombre comercial a establecer.
   */
  public setGrupoTratadoNombreComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, nombreComercial },
    }));
  }

  /**
   * Actualiza la fecha final en el grupo tratado.
   * 
   * Este método permite establecer la fecha final en el grupo tratado del trámite.
   * 
   * @param {string} fechaFinalInput - La fecha final a establecer.
   */
  public setGrupoTratadoFechaFinalInput(fechaFinalInput: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, fechaFinalInput },
    }));
  }

  /**
   * Actualiza la fecha inicial en el grupo tratado.
   * 
   * Este método permite establecer la fecha inicial en el grupo tratado del trámite.
   * 
   * @param {string} fechaInicialInput - La fecha inicial a establecer.
   */
  public setGrupoTratadoFechaInicialInput(fechaInicialInput: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, fechaInicialInput },
    }));
  }

  /**
   * Actualiza la fracción arancelaria de la mercancía en el formulario de mercancía.
   * 
   * Este método permite establecer la fracción arancelaria de la mercancía en el formulario.
   * 
   * @param {string} fraccionMercanciaArancelaria - La fracción arancelaria de la mercancía a establecer.
   */
  public setFraccionMercanciaArancelaria(fraccionMercanciaArancelaria: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, fraccionMercanciaArancelaria },
    }));
  }

  /**
   * Actualiza el nombre comercial de la mercancía en el formulario de mercancía.
   * 
   * Este método permite establecer el nombre comercial de la mercancía en el formulario.
   * 
   * @param {string} nombreComercialDelaMercancia - El nombre comercial de la mercancía a establecer.
   */
  public setNombreComercialDelaMercancia(nombreComercialDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, nombreComercialDelaMercancia },
    }));
  }

  /**
   * Actualiza el nombre técnico de la mercancía en el formulario de mercancía.
   * 
   * Este método permite establecer el nombre técnico de la mercancía en el formulario.
   * 
   * @param {string} nombreTecnico - El nombre técnico de la mercancía a establecer.
   */
  public setNombreTecnico(nombreTecnico: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, nombreTecnico },
    }));
  }

  /**
   * Actualiza el nombre en inglés de la mercancía en el formulario de mercancía.
   * 
   * Este método permite establecer el nombre en inglés de la mercancía en el formulario.
   * 
   * @param {string} nombreEnIngles - El nombre en inglés de la mercancía a establecer.
   */
  public setNombreEnIngles(nombreEnIngles: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, nombreEnIngles },
    }));
  }

  /**
   * Actualiza las otras instancias relacionadas con la mercancía en el formulario de mercancía.
   * 
   * Este método permite establecer las otras instancias relacionadas con la mercancía en el formulario.
   * 
   * @param {string} otrasInstancias - Las otras instancias a establecer.
   */
  public setOtrasInstancias(otrasInstancias: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, otrasInstancias },
    }));
  }

  /**
   * Actualiza el criterio para conferir en el formulario de mercancía.
   * 
   * Este método permite establecer el criterio para conferir en el formulario de mercancía.
   * 
   * @param {string} criterioParaConferir - El criterio para conferir a establecer.
   */
  public setCriterioParaConferir(criterioParaConferir: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, criterioParaConferir },
    }));
  }

  /**
   * Actualiza la cantidad de la mercancía en el formulario de mercancía.
   * 
   * Este método permite establecer la cantidad de la mercancía en el formulario.
   * 
   * @param {string} cantidad - La cantidad de la mercancía a establecer.
   */
  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, cantidad },
    }));
  }

  /**
 * Actualiza el valor de la mercancía en el formulario de mercancía.
 * 
 * Este método permite establecer el valor de la mercancía en el formulario.
 * 
 * @param {string} valorDelaMercancia - El valor de la mercancía a establecer.
 */
  public setValorDelaMercancia(valorDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, valorDelaMercancia },
    }));
  }

  /**
   * Actualiza el complemento de la descripción en el formulario de mercancía.
   * 
   * Este método permite establecer el complemento de la descripción de la mercancía en el formulario.
   * 
   * @param {string} complementoDescripcion - El complemento de la descripción a establecer.
   */
  public setComplementoDelaDescripcion(complementoDescripcion: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, complementoDescripcion },
    }));
  }

  /**
   * Actualiza el número de factura en el formulario de mercancía.
   * 
   * Este método permite establecer el número de factura en el formulario.
   * 
   * @param {string} numeroFactura - El número de factura a establecer.
   */
  public setNumeroFactura(numeroFactura: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, numeroFactura },
    }));
  }

  /**
   * Actualiza el tipo de factura en el formulario de mercancía.
   * 
   * Este método permite establecer el tipo de factura en el formulario.
   * 
   * @param {string} tipoFactura - El tipo de factura a establecer.
   */
  public setTipoFactura(tipoFactura: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, tipoFactura },
    }));
  }

  /**
   * Actualiza la fecha en el formulario de mercancía.
   * 
   * Este método permite establecer la fecha en el formulario.
   * 
   * @param {string} fecha - La fecha a establecer.
   */
  public setFecha(fecha: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, fecha },
    }));
  }

  /**
   * Actualiza el país en el formulario de mercancía.
   * 
   * Este método permite establecer el país relacionado con la mercancía en el formulario.
   * 
   * @param {string} pais - El país a establecer.
   */
  public setPais(pais: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, pais },
    }));
  }
  /**
   * @method setGrupoReceptor
   * @description Actualiza la información del receptor en el estado del trámite.
   * 
   * Este método permite establecer los datos del receptor en el grupo receptor del estado.
   * 
   * @param {GrupoReceptor} grupoReceptor - Objeto que contiene la información del receptor a actualizar.
   * 
   * @returns {void}
   */
  public setGrupoReceptor(grupoReceptor: GrupoReceptor): void {
    this.update((state) => ({
      ...state,
      grupoReceptor,
    }));
  }
  /**
  * @method setGrupoDeDirecciones
  * @description Actualiza la información de las direcciones del receptor en el estado del trámite.
  * 
  * Este método permite establecer los datos del grupo de direcciones en el estado del trámite.
  * 
  * @param {GrupoDeDirecciones} grupoDeDirecciones - Objeto que contiene la información de las direcciones a actualizar.
  * 
  * @returns {void}
  */
  public setGrupoDeDirecciones(grupoDeDirecciones: GrupoDeDirecciones): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones,
    }));
  }
  /**
   * @method setGrupoRepresentativo
   * @description Actualiza la información representativa del trámite en el estado.
   * 
   * Este método permite establecer los datos del grupo representativo en el estado del trámite.
   * 
   * @param {GrupoRepresentativo} grupoRepresentativo - Objeto que contiene la información representativa a actualizar.
   * 
   * @returns {void}
   */
  public setGrupoRepresentativo(grupoRepresentativo: GrupoRepresentativo): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo,
    }));
  }
  /**
   * Actualiza la información del transporte utilizado en el estado del trámite.
   * 
   * Este método permite establecer los datos del grupo de transporte en el estado del trámite.
   * 
   * @param {GrupoDeTransporte} grupoDeTransporte - Objeto que contiene la información del transporte a actualizar.
   */
  public setGrupoDeTransporte(grupoDeTransporte: GrupoDeTransporte): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte,
    }));
  }
  /**
   * @method setProductoresExportador
   * @description Actualiza la lista de productores asociados al exportador en el estado del trámite.
   * 
   * Este método permite establecer los datos de los productores asociados al exportador.
   * 
   * @param {HistoricoColumnas[]} productoresExportador - Lista de productores asociados al exportador.
   * 
   * @returns {void}
   */
  public setProductoresExportador(productoresExportador: HistoricoColumnas[]): void {
    this.update((state) => ({
      ...state,
      productoresExportador,
    }));
  }
  /**
     * @method setGrupoOperador
     * @description Actualiza la información del operador en el estado del trámite.
     * 
     * Este método permite establecer los datos del operador en el grupo operador del estado.
     * 
     * @param {GrupoOperador} grupoOperador - Objeto que contiene la información del operador a actualizar.
     * 
     * @returns {void}
     */
  public setGrupoOperador(grupoOperador: GrupoOperador): void {
    this.update((state) => ({
      ...state,
      grupoOperador,
    }));
  }
  /**
   * @method setMercanciaTablaDatos
   * @description Actualiza la lista de mercancías seleccionadas en la tabla de datos del estado del trámite.
   * 
   * Este método permite establecer las mercancías seleccionadas por el usuario en la tabla de datos.
   * 
   * @param {SeleccionadasTabla[]} mercanciaSeleccionadasTablaDatos - Lista de mercancías seleccionadas a actualizar en el estado.
   * 
   * @returns {void}
   */
  public setMercanciaTablaDatos(mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[]): void {
    this.update((state) => ({
      ...state,
      mercanciaSeleccionadasTablaDatos,
    }));
  }
  /**
   * @method setMercanciaDisponsiblesTablaDatos
   * @description Actualiza la lista de mercancías disponibles en la tabla de datos del estado del trámite.
   * 
   * Este método permite establecer las mercancías disponibles para ser seleccionadas por el usuario en la tabla de datos.
   * 
   * @param {DisponiblesTabla[]} mercanciaDisponsiblesTablaDatos - Lista de mercancías disponibles a actualizar en el estado.
   * 
   * @returns {void}
   */
  public setMercanciaDisponsiblesTablaDatos(mercanciaDisponsiblesTablaDatos: DisponiblesTabla[]): void {
    this.update((state) => ({
      ...state,
      mercanciaDisponsiblesTablaDatos,
    }));
  }

  /**
   * @descripcion
   * Actualiza los datos del formulario de productor.
   * @param values - Valores a actualizar en el formulario.
   */
  setAgregarFormDatosProductor(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      datosProductorFormulario: {
        ...state.datosProductorFormulario,
        ...values,
      },
    }));
  }

  /**
   * @descripcion
   * Actualiza los datos del formulario histórico.
   * @param values - Valores a actualizar en el formulario.
   */
  setFormHistorico(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      formulario: {
        ...state.formulario,
        ...values,
      },
    }));
  }

  /**
 * Actualiza el estado de validez de un formulario específico dentro del trámite.
 * @param formName Nombre del formulario a actualizar.
 * @param isValid Indica si el formulario es válido o no.
 */
  setFormValidity(formName: string, isValid: boolean): void {
    this.update((state) => ({
      ...state,
      formValidity: {
        ...state.formValidity,
        [formName]: isValid,
      },
    }));
  }
}
