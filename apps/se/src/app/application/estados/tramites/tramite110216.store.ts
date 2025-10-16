import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../shared/models/modificacion.enum';

import {
  DisponiblesTabla,
  GrupoDeDirecciones,
  GrupoDeDomicilio,
  GrupoDeTransporte,
  GrupoOperador,
  GrupoRepresentativo,
  GrupoTratado,
  HistoricoColumnas,
  MercanciaTabla,
  SeleccionadasTabla,
} from '../../tramites/110216/models/certificado-origen.model';

/**
 * Interfaz que representa la estructura del estado de un trámite 110216.
 * Este estado contiene formularios, catálogos, listas, valores seleccionados y otros datos requeridos.
 */
export interface Tramite110216State {
  observaciones: string;
  idioma: string;
  entidadFederativa: string;
  representacionFederal: string;
  formDatosProductor: { [key: string]: string | number | boolean | null };
  formHistorico: { [key: string]: undefined };
  grupoDeTransporte: GrupoDeTransporte;
  grupoReceptor: string;
  grupoRepresentativo: {
    nombreRepresentante?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    numeroFiscal?: string;
    razonSocial?: string;
    pais?: string;
    entidadFederativa?: string;
    domicilio?: string;
    telefono?: string;
    email?: string;
    datosConfidenciales?: boolean;
    productorMismoExportador?: boolean;
  } & GrupoRepresentativo;
  grupoDeDirecciones: {
    ciudad: string;
    numeroLetra: string | number;
    lada: string | number;
    telefono: string | number;
    fax: string | number | null;
    correoElectronico: string;
    calle?: string;
    numeroExterior?: string;
    numeroInterior?: string;
    colonia?: string;
    localidad?: string;
    municipio?: string;
    estado?: string;
    pais?: string;
    cp?: string;
  };
  pestanaActiva: number;
  idSolicitud: number | null;
  idiomaDatos: Catalogo[];
  idiomaDatosSeleccion: Catalogo;
  representacionFederalSeleccion: Catalogo;
  entidadFederativaDatos: Catalogo[];
  representacionFederalDatos: Catalogo[];
  altaPlanta: Catalogo[];
  estado: Catalogo;
  factura: Catalogo[];
  facturas: Catalogo;
  umc: Catalogo;
  umcs: Catalogo[];
  paisBloques: Catalogo[];
  paisBloque: Catalogo;
  formCertificado: { [key: string]: undefined | boolean | string | number | object };
  formDatosCertificado: { [key: string]: unknown };
  mercanciaForm: { [key: string]: undefined | boolean | string | number | object };
  buscarMercancia: Mercancia[];
  formaValida: { [key: string]: boolean };
  mercanciaTabla: Mercancia[];
  
    nombre: string;
    apellidoPrimer: string;
    apellidoSegundo: string;
    numeroFiscal: string;
    razonSocial: string;

  /**
   * @property {Object} formulario - Otros datos de formularios auxiliares.
   * @description
   * Contiene otros datos relevantes para el trámite, como datos confidenciales del productor y si el productor es el mismo exportador.
   */
  formulario: { [key: string]: unknown };

  /**
   * @property {Object} datosProductorFormulario - Datos adicionales del productor.
   * @description
   * Contiene campos adicionales para el formulario del productor, como número de registro fiscal y fax.
   */
  datosProductorFormulario: { [key: string]: unknown };

  formValidity?: {
    datosCertificado?: boolean;
    destinatario?: boolean;
    histProductores?: boolean;
    certificadoOrigen?: boolean;
  };

  agregarProductoresExportador: HistoricoColumnas[];

  /**
   * @property {HistoricoColumnas[]} productoresExportador
   * @description Lista de productores asociados al exportador.
   */
  productoresExportador: HistoricoColumnas[];

  mercanciaProductores: MercanciaTabla[];
}

/**
 * Estado inicial que se utiliza para crear el store con valores por defecto.
 */
export const INITIAL_STATE: Tramite110216State = {
  observaciones: '',
  idioma: '',
  entidadFederativa: '',
  representacionFederal: '',
  idSolicitud: 0,
  idiomaDatos: [],
  idiomaDatosSeleccion: { id: -1, descripcion: '' },
  representacionFederalSeleccion: { id: -1, descripcion: '' },
  entidadFederativaDatos: [],
  representacionFederalDatos: [],
  altaPlanta: [],
  estado: { id: -1, descripcion: '' },
  factura: [],
  facturas: { id: -1, descripcion: '' },
  umc: { id: -1, descripcion: '' },
  umcs: [],
  paisBloques: [],
  paisBloque: { id: -1, descripcion: '' },
  formCertificado: {
    entidadFederativa: '',
    tercerOperador: false,
    bloque: '',
    nombreComercialForm: '',
    registroProductoForm: '',
    fraccionArancelariaForm: '',
    fechaInicioInput: '',
    fechaFinalInput: '',
  },
  formDatosCertificado: {
    observacionesDates: '',
    idiomaDates: '',
    precisaDates: '',
    EntidadFederativaDates: '',
    representacionFederalDates: '',
  },
  mercanciaForm: {
    fraccionNaladi: '',
    fraccionNaladiSa93: '',
    fraccionNaladiSa96: '',
    fraccionNaladiSa02: '',
    nombreTecnico: '',
    nombreComercial: '',
    normaOrigen: '',
    id: '',
    cantidad: '',
    umc: '',
    tipoFactura: '',
    valorMercancia: '',
    fechaFinalInput: '',
    numeroFactura: '',
    nalad: '',
    complementoClasificacion: '',
  },
  buscarMercancia: [],
  formaValida: {},
  mercanciaTabla: [],
  pestanaActiva: 0,
  grupoReceptor: '',
  grupoDeDirecciones: {} as GrupoDeDirecciones,

  grupoRepresentativo: {} as GrupoRepresentativo,
  formDatosProductor: {},
  formHistorico: {},
  grupoDeTransporte: {} as GrupoDeTransporte,

  nombre: '',
  apellidoPrimer: '',
  apellidoSegundo: '',
  numeroFiscal: '',
  razonSocial: '',

  formulario:{
    datosConfidencialesProductor: '',
    productorMismoExportador: '',
  },
  datosProductorFormulario: {
    numeroRegistroFiscal: '',
    fax: '',      
  },
  formValidity: {},
  agregarProductoresExportador: [],
  productoresExportador: [],
  mercanciaProductores: [],
};

/**
 * @class Tramite110216Store
 * @description
 * Store que administra el estado global del trámite 110216 utilizando Akita.
 * Este store encapsula todos los datos y formularios necesarios para la gestión
 * de un trámite, tales como catálogos, formularios, validaciones y mercancías.
 *
 * Cada método `set` permite actualizar secciones específicas del estado de forma inmutable.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-110216', resettable: true })
export class Tramite110216Store extends Store<Tramite110216State> {
  constructor() {
    super(INITIAL_STATE);
  }

 

  public setFormHistorico(values: { [key: string]: undefined }): void {
    this.update((state) => ({ ...state, formHistorico: { ...state.formHistorico, ...values } }));
  }

  public setAgregarFormDatosProductor(values: { [key: string]: string | number | boolean | null }): void {
    this.update((state) => ({ ...state, formDatosProductor: { ...state.formDatosProductor, ...values } }));
  }

  public setObservaciones(observaciones: string): void {
    this.update((state) => ({ ...state, observaciones }));
  }

  public setIdioma(idioma: string): void {
    this.update((state) => ({ ...state, idioma }));
  }

  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({ ...state, pasoActivo }));
  }

  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({ ...state, representacionFederal }));
  }

  public setGrupoReceptor(grupoReceptor: string): void {
    this.update((state) => ({ ...state, grupoReceptor }));
  }

  public setGrupoDeDirecciones(grupoDeDirecciones: GrupoDeDirecciones): void {
    this.update((state) => ({ ...state, grupoDeDirecciones }));
  }

  public setGrupoRepresentativo(grupoRepresentativo: GrupoRepresentativo): void {
    this.update((state) => ({ ...state, grupoRepresentativo }));
  }

  public setGrupoDeTransporte(grupoDeTransporte: GrupoDeTransporte): void {
    this.update((state) => ({ ...state, grupoDeTransporte }));
  }

  public setTercerOperador(tercerOperador: boolean): void {
    this.update((state) => ({ ...state, tercerOperador }));
  }

  public setGrupoOperador(grupoOperador: GrupoOperador): void {
    this.update((state) => ({ ...state, grupoOperador }));
  }

  public setGrupoTratado(grupoTratado: GrupoTratado): void {
    this.update((state) => ({ ...state, grupoTratado }));
  }

  public setGrupoDeDomicilio(grupoDeDomicilio: GrupoDeDomicilio): void {
    this.update((state) => ({ ...state, grupoDeDomicilio }));
  }

  public setMercanciaTablaDatos(mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[]): void {
    this.update((state) => ({ ...state, mercanciaSeleccionadasTablaDatos }));
  }

  public setMercanciaDisponsiblesTablaDatos(mercanciaDisponsiblesTablaDatos: DisponiblesTabla[]): void {
    this.update((state) => ({ ...state, mercanciaDisponsiblesTablaDatos }));
  }

  public setDatosConfidencialesProductor(datosConfidencialesProductor: boolean): void {
    this.update((state) => ({ ...state, datosConfidencialesProductor }));
  }

  public setProductorMismoExportador(productorMismoExportador: boolean): void {
    this.update((state) => ({ ...state, productorMismoExportador }));
  }

  public setProductoresExportador(productoresExportador: HistoricoColumnas[]): void {
    this.update((state) => ({ ...state, productoresExportador }));
  }

  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({ ...state, pestanaActiva }));
  }

  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({ ...state, idSolicitud }));
  }

  public setEstado(estado: Catalogo): void {
    this.update((state) => ({ ...state, estado }));
  }

  public setFactura(factura: Catalogo[]): void {
    this.update((state) => ({ ...state, factura }));
  }

  public setUmc(umcs: Catalogo[]): void {
    this.update((state) => ({ ...state, umcs }));
  }

  public setBloque(paisBloques: Catalogo[]): void {
    this.update((state) => ({ ...state, paisBloques }));
  }

  public setAltaPlanta(altaPlanta: Catalogo[]): void {
    this.update((state) => ({ ...state, altaPlanta }));
  }

  public setFormValida(formaValida: { [key: string]: boolean }): void {
    const IS_VALID = { ...this.getValue().formaValida, ...formaValida };
    this.update({ formaValida: IS_VALID });
  }

  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({ ...state, entidadFederativa }));
  }

  public setFormDatosCertificado(values: { [key: string]: unknown }): void {
    this.update((state) => ({
      formDatosCertificado: {
        ...state.formDatosCertificado,
        ...values,
      },
    }));
  }

  public setFormCertificado(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formCertificado: {
        ...state.formCertificado,
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

  public setFormMercancia(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      mercanciaForm: {
        ...state.mercanciaForm,
        ...values,
      },
    }));
  }

  public setBuscarMercancia(buscarMercancia: Mercancia[]): void {
    this.update((state) => ({ ...state, buscarMercancia }));
  }

  public setMercanciaTabla(mercanciaTabla: Mercancia[]): void {
    this.update((state) => {
      const LISTAEXISTENTE = state.mercanciaTabla || [];
      const NUEVOARTICULO = { ...mercanciaTabla[0] };

      if (NUEVOARTICULO.id === 0) {
        NUEVOARTICULO.id = (LISTAEXISTENTE.length || 0) + 1;
        const UPDATEDLIST = [...LISTAEXISTENTE, NUEVOARTICULO];
        return { ...state, mercanciaTabla: UPDATEDLIST };
      }

      const UPDATEDLIST = LISTAEXISTENTE.map((ITEM) =>
        ITEM.id === NUEVOARTICULO.id ? { ...ITEM, ...NUEVOARTICULO } : ITEM
      );
      return { ...state, mercanciaTabla: UPDATEDLIST };
    });
  }
public setGrupoReceptorNombre(nombre: string): void {
  this.update((state) => ({ ...state, nombre }));
}

public setGrupoReceptorApellidoPrimer(apellidoPrimer: string): void {
  this.update((state) => ({ ...state, apellidoPrimer }));
}

public setGrupoReceptorApellidoSegundo(apellidoSegundo: string): void {
  this.update((state) => ({ ...state, apellidoSegundo }));
}

public setGrupoReceptorNumeroFiscal(numeroFiscal: string): void {
  this.update((state) => ({ ...state, numeroFiscal }));
}

public setGrupoReceptorRazonSocial(razonSocial: string): void {
  this.update((state) => ({ ...state, razonSocial }));
}

public setGrupoDeDireccionesCiudad(ciudad: string): void {
  this.update((state) => ({
    ...state,
    grupoDeDirecciones: { ...state.grupoDeDirecciones, ciudad },
  }));
}

public setGrupoDeDireccionesCalle(calle: string): void {
  this.update((state) => ({
    ...state,
    grupoDeDirecciones: { ...state.grupoDeDirecciones, calle },
  }));
}

public setGrupoDeDireccionesNumeroLetra(numeroLetra: string): void {
  this.update((state) => ({
    ...state,
    grupoDeDirecciones: { ...state.grupoDeDirecciones, numeroLetra },
  }));
}

public setGrupoDeDireccionesLada(lada: string): void {
  this.update((state) => ({
    ...state,
    grupoDeDirecciones: { ...state.grupoDeDirecciones, lada },
  }));
}

public setGrupoDeDireccionesTelefono(telefono: string): void {
  this.update((state) => ({
    ...state,
    grupoDeDirecciones: { ...state.grupoDeDirecciones, telefono },
  }));
}

public setGrupoDeDireccionesFax(fax: string): void {
  this.update((state) => ({
    ...state,
    grupoDeDirecciones: { ...state.grupoDeDirecciones, fax },
  }));
}

public setGrupoDeDireccionesCorreoElectronico(correoElectronico: string): void {
  this.update((state) => ({
    ...state,
    grupoDeDirecciones: { ...state.grupoDeDirecciones, correoElectronico },
  }));
}
  public setIdiomaDatos(idiomaDatos: Catalogo[]): void {
    this.update((state) => ({ ...state, idiomaDatos }));
  }

  public setIdiomaSeleccion(idiomaDatosSeleccion: Catalogo): void {
    this.update((state) => ({ ...state, idiomaDatosSeleccion }));
  }

  public setRepresentacionFederalDatos(representacionFederalDatos: Catalogo[]): void {
    this.update((state) => ({ ...state, representacionFederalDatos }));
  }

  public setEntidadFederativaDatos(entidadFederativaDatos: Catalogo[]): void {
    this.update((state) => ({ ...state, entidadFederativaDatos }));
  }
  public setNombre(nombre: string): void {
    this.update((state) => ({ ...state, nombre }));
  }
  public setApellidoPrimer(apellidoPrimer: string): void {
    this.update((state) => ({ ...state, apellidoPrimer }));
  }
  public setApellidoSegundo(apellidoSegundo: string): void {
    this.update((state) => ({ ...state, apellidoSegundo }));
  }
  public setNumeroFiscal(numeroFiscal: string): void {
    this.update((state) => ({ ...state, numeroFiscal }));
  }
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({ ...state, razonSocial }));
  }
  public setGrupoRepresentativoTelefono(telefono: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, telefono },
  }));
}
public setGrupoRepresentativoLugar(lugar: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, lugar },
  }));
}

public setGrupoRepresentativoNombreExportador(nombreExportador: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, nombreExportador },
  }));
}

public setGrupoRepresentativoEmpresa(empresa: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, empresa },
  }));
}

public setGrupoRepresentativoCargo(cargo: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, cargo },
  }));
}

public setGrupoRepresentativoLada(lada: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, lada },
  }));
}
public setGrupoRepresentativoFax(fax: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, fax },
  }));
}

public setGrupoRepresentativoCorreoElectronico(correoElectronico: string): void {
  this.update((state) => ({
    ...state,
    grupoRepresentativo: { ...state.grupoRepresentativo, correoElectronico },
  }));
}
// Correctly defined methods in Tramite110216Store
public setGrupoDeTransportePuertoEmbarque(puertoEmbarque: string): void {
  this.update((state) => ({
    ...state,
    grupoDeTransporte: { ...state.grupoDeTransporte, puertoEmbarque },
  }));
}

public setGrupoDeTransportePuertoDesembarque(puertoDesembarque: string): void {
  this.update((state) => ({
    ...state,
    grupoDeTransporte: { ...state.grupoDeTransporte, puertoDesembarque },
  }));
}

public setGrupoDeTransportePuertoTransito(puertoTransito: string): void {
  this.update((state) => ({
    ...state,
    grupoDeTransporte: { ...state.grupoDeTransporte, puertoTransito },
  }));
}

public setGrupoDeTransporteNombreEmbarcacion(nombreEmbarcacion: string): void {
  this.update((state) => ({
    ...state,
    grupoDeTransporte: { ...state.grupoDeTransporte, nombreEmbarcacion },
  }));
}

public setGrupoDeTransporteNumeroVuelo(numeroVuelo: string): void {
  this.update((state) => ({
    ...state,
    grupoDeTransporte: { ...state.grupoDeTransporte, numeroVuelo },
  }));
}

/**
   * Establece los representacionFederalSeleccion de países en el almacén.
   *
   * @param {Catalogo} representacionFederalSeleccion - Un array de objetos `Catalogo` que representa los representacionFederalSeleccion de países.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  setRepresentacionFederalDatosSeleccion(
    representacionFederalSeleccion: Catalogo
  ): void {
    this.update((state) => ({
      ...state,
      representacionFederalSeleccion,
    }));
  }

  /**
   * Agrega un productor exportador al arreglo correspondiente en el estado del trámite.
   * @param productor Objeto de tipo HistoricoColumnas que representa al productor a agregar.
   */
  setAgregarProductoresExportador(productor: HistoricoColumnas): void {
    this.update((state) => ({
      ...state,
      agregarProductoresExportador: [
        ...state.agregarProductoresExportador,
        {...productor},
      ],
      }));
  }

  /**
   * Actualiza la lista de mercancías asociadas a los productores en el estado del trámite.
   * @param mercancia Arreglo de objetos de tipo MercanciaTabla a asignar.
   */
  setMercanciaProductores(mercancia: MercanciaTabla[]): void {
    this.update((state) => ({
      ...state,
      mercanciaProductores: mercancia,
    }));
  }
}



