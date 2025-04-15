import { TipoDevAviso, ProveedorExtranjero, ModificacionSocios, ModificacionGoceInmueble, PersonaFusionEscisionDTO, CargaTipo,FechasSeleccionadas,  DatosDomicilioLugar, DatosEmpresa, DatosMercanciaSubmanufactura, DatosQuienRecibe, FormularioGrupo } from '../models/avisomodify.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Catalogo {
  id: number;
  descripcion: string;
}

export const INITIAL_STATE: FormularioGrupo = {
  tipoDevAviso : {
  modalidadCertificacion: '',
  foreignClientsSuppliers: false,
  nationalSuppliers: false,
  modificationsMembers:false,
  changesToLegalDocuments: false,
  mergerOrSplitNotice: false,
  additionFractions: false,
  acepto253:false,
  },
  proveedorExtranjero:{
    archivoExtranjero:null,
    registrosProveedoresExtranjeros:''
  },
  modificacionSocios:{
    ensucarácterde:1,
    obligadoaTributarenMéxico:true,
    nacionalidad:1,
    registroFederaldeContribuyentes:null,
    rfc:'',
    nombreCompleto:''
  },
  modificacionGoceInmueble:{
     idAviInmueble:'',
     direccion: '',
     codigoPostal:'',
     cveEntidad: '',
     cveMunicipio: '',
    cveTipoDoc: '',
    fechaInicioAnterior: '',
    fechaFinAnterior: '',
    fechaInicioActual: '',
    fechaFinActual:'',
    rfcPartesC: '',
    rfcPartesCons: '',
    nombrePartesCons: '',
    caracterDeCons: '',
    observaciones: ''
  },
  personaFusionEscisionDTO:{
    rfc: '',
    razonSocial: '',
    numFolioTramite: '',
    fechaInicioVigencia: '',
    fechaFinVigencia: ''
  },
  fechasSeleccionadas:{
    fechasSeleccionadas:''
  },

    datosEmpresa: {
        numeroPrograma: '',
        anoPrograma: '',
        mesCorrespondeAviso: '',
        anoCorrespondeAviso: '',
    },
    cargaTipo: {
        cargaTipo: '',
    },
    datosQuienRecibe: {
        rfc: '',
        numberProgramaQr: '',
        anoProgramaQr: '',
    },
    datosDomicilioLugar: {
        nombreComercial: '',
        entidadFederativa: '',
        alcaldiaMunicipio: '',
        colonias: '',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        codigoPostal: '',
    },
    datosMercanciaSubmanufactura: {
        fracArancelaria: '',
        nico: '',
        unidadMedida: '',
        cantidad: '',
        valorUsd: '',
        descripcionMercancia: '',
    },
};

/**
 * Tramite entity store
 *
 * @export
 * @class TramiteStore
 * @extends {Store<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-32301', resettable: true })
export class Tramite32301Store extends Store<FormularioGrupo> {
  constructor() {
    super(INITIAL_STATE);
  }
  
  setModalidadCertificacion(EV: String): void {

    this.update((state) => ({
      ...state,
      modalidadCertificacion: EV
    }));
  }

  setforeignClientsSuppliers(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      foreignClientsSuppliers: tipoDevAviso
    }));
  }

  setNationalSuppliers(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      nationalSuppliers: tipoDevAviso
    }));
  }
  setModificationsMembers(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      modificationsMembers: tipoDevAviso
    }));
  }

    setChangesToLegalDocuments(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      changesToLegalDocuments: tipoDevAviso
    }));
  }
  setMergerOrSplitNotice(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      mergerOrSplitNotice: tipoDevAviso
    }));
  }
  setAdditionFractions(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      additionFractions: tipoDevAviso
    }));
  }

  setAcepto253(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      acepto253: tipoDevAviso
    }));
  }

  setArchivoExtranjero(proveedorExtranjero: ProveedorExtranjero): void {
    this.update((state) => ({
      ...state,
      archivoExtranjero: proveedorExtranjero
    }));
  }

  setRegistrosProveedoresExtranjeros(proveedorExtranjero: ProveedorExtranjero): void {
    this.update((state) => ({
      ...state,
      registrosProveedoresExtranjeros: proveedorExtranjero.registrosProveedoresExtranjeros
    }));
  }
  

  setSnsucarácterde(ensucarácterde: Number): void {
    this.update((state) => ({
      ...state,
      modificacionSocios:{
        ...state.modificacionSocios,
        ensucarácterde
      }
    }));
  }

  setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        rfc
      }
    }));
  }

  setObligadoaTributarenMéxico(obligadoaTributarenMéxico: boolean): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        obligadoaTributarenMéxico
      }
    }));
  }

  setNacionalidad(nacionalidad: Number): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        nacionalidad
      }
    }));
  }
  
  setRegistroFederaldeContribuyentes(registroFederaldeContribuyentes: Number): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        registroFederaldeContribuyentes
      }
    }));
  }
  
  setModificacionGoceInmueble(modificacionGoceInmueble: ModificacionGoceInmueble): void {
    this.update((state) => ({
      modificacionGoceInmueble
    }))
  }

  SetpersonaFusionEscisionDTO(personaFusionEscisionDTO:PersonaFusionEscisionDTO):void{
    this.update((state) => ({
      personaFusionEscisionDTO
    }))
  }

  setNombreCompleto(nombreCompleto: string): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        nombreCompleto
      }
    }));
  }
  
  // public setFechasSeleccionadas(fechasSeleccionadas: FechasSeleccionadas[]) {
  //   this.update((state) => ({
  //     ...state,
  //     fechasSeleccionadas,
  //   }));
  // }

  /**
   * Establece los datos de modificación en el estado.
   * 
   * @param {DatosEmpresa} datosEmpresa - Los datos de modificación que se van a establecer en el estado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosEmpresa(datosEmpresa: DatosEmpresa): void {
    this.update((state) => ({
      ...state,
      datosEmpresa,
    }));
  }

  /**
   * Establece el CargaTipo en el almacén.
   * 
   * @param {CargaTipo} cargaTipo - El CargaTipo que se va a establecer en el almacén.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setCargaTipo(cargaTipo: CargaTipo): void {
    this.update((state) => ({
      ...state,
      cargaTipo,
    }));
  }

  /**
   * Establece el alta de DatosQuienRecibe en el almacén.
   * 
   * @param {DatosQuienRecibe} datosQuienRecibe - Representa las DatosQuienRecibe a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosQuienRecibe(datosQuienRecibe: DatosQuienRecibe): void {
    this.update((state) => ({
      ...state,
      datosQuienRecibe,
    }));
  }

  /**
   * Establece el alta de datosDomicilioLugar en el almacén.
   * 
   * @param {datosDomicilioLugar} datosDomicilioLugar - Representa las datosDomicilioLugar a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosDomicilioLugar(datosDomicilioLugar: DatosDomicilioLugar): void {
    this.update((state) => ({
      ...state,
      datosDomicilioLugar,
    }));
  }

  /**
   * Establece el alta de datosMercanciaSubmanufactura en el almacén.
   * 
   * @param {DatosMercanciaSubmanufactura} datosMercanciaSubmanufactura - Representa las datosMercanciaSubmanufactura a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDatosMercanciaSubmanufactura(datosMercanciaSubmanufactura: DatosMercanciaSubmanufactura): void {
    this.update((state) => ({
      ...state,
      datosMercanciaSubmanufactura,
    }));
  }

  /**
   * @description Resets the store to its initial state.
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}