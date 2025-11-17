import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { LicitacionesResponse } from '../../models/solicitud.model';
/**
 * Creacion del estado inicial para la interfaz de tramite 
 * @returns Solicitud120501
 */
export interface Solicitud120501State {
  idSolicitud: number;
  entidadFederativa: string;
  representacionFederal: string;
  numeraDelicitacion: string;
  fechaDelEventoDelicitacion: string;
  descripcionDelProducto: string;
  unidadTarifaria: string;
  regimenAduanero: string;
  fraccionArancelaria: string;
  fechaDeiniciodeVigenciadelCupo:string,
  fechaDefindeVigenciadelCupo:string,
  obserVaciones:string,
  bloqueComercial:string,
  paises:string,
  montoadJudicado:string,
  montoDisponible:string,
  montoMaximo:string,
  rfc:string,
  adquirienteMontoDisponible:string,
  montoRecibir:string,
  rfc1:string,
  licitacionesDatos:LicitacionesResponse
}

export function createInitialState(): Solicitud120501State {
  return{
      idSolicitud: 0,
      entidadFederativa:'',
      representacionFederal:'',
      numeraDelicitacion: '',
      fechaDelEventoDelicitacion: '',
      descripcionDelProducto: '', 
      unidadTarifaria: '',
      regimenAduanero: '',
      fraccionArancelaria: '',
      fechaDeiniciodeVigenciadelCupo:'',
      fechaDefindeVigenciadelCupo:'',
      obserVaciones:'',
      bloqueComercial:'',
      paises:'',
      montoadJudicado:'',
      montoDisponible:'',
      montoMaximo:'',
      rfc:'',
      adquirienteMontoDisponible:'',
      montoRecibir:'',
      rfc1:'',
      licitacionesDatos:{
        idSolicitud: 0,
        fechaCreacion: "",
        fechaInicioTramite: "",
        fechaEstatus: "",
        fechaActualizacion: "",
        costo: 0,
        estadoSolicitud: "",
        cveRolCapturista: "",
        cveUsuarioCapturista: "",
        idPersonaSolicitante: 0,
        idPeticionWs: 0,
        blnDepuracionDocProcesada: false,
        certificadoSerialNumber: "",
        idTipoTramite: 0,
        cveUnidadAdministrativa: "",
        numeroFolioTramiteOriginal: "",
        esNuevo: false,
        certSerialNumber: "",
        certificado: "",
        idPersonaSolicitud: 0,
        solicitante: "",
        clave: "",
        unidadAdministrativaRepresentacionFederal: "",
        numFolioTramite: "",
        tramite: "",
        representanteLegalCapturistaGubernamental: "",
        discriminatorValue: "",
        documentosRequeridos: "",
        listaDocumentos: "",
        programaEconomia: "",
        fraccionesAnexoDos: "",
        fraccionesAnexoTres: "",
        tipoEmpresaRECIF: "",
        actividadEconomica: "",
        actividadProductiva: "",
        actividadProductivaProsec: "",
        ambito: "",
        numeroPermiso: "",
        nomOficialAutorizado: "",
        actividadEconomicaPreponderante: "",
        empresaControladora: "",
        mercanciaPatrimonio: "",
        cveRegimen: "",
        regimen: "",
        empresaMismoGrupo: "",
        tipoRegimen: "",
        tipoSolicitudPexim: "",
        tipoCaat: "",
        programaAutorizadoEconomia: "",
        descripcionOtroTipoDePropietarioAeronave: "",
        tratado: "",
        importeValorComercial: 0,
        fechaEmbarque: "",
        fechaArribo: "",
        fechaOperacion: "",
        idNormaOficial: 0,
        normaAplicable: "",
        claveTipoCertificado: "",
        booleanGenerico: false,
        claveAduana: "",
        ideGenerica1: "",
        registroAutomatizado: false,
        ideGenerica2: "",
        ideGenerica3: "",
        descripcion: "",
        descripcionClobGenerica1: "",
        descripcionClobGenerica2: "",
        descripcionSistemasMedicion: "",
        booleanIMMEX: false,
        periodoDictaminacion: "",
        motivo: "",
        numAutorizacion: "",
        domicilio: "",
        denominacionExposicion: "",
        descripcionGenerica2: "",
        fechaIniExposicion: "",
        fechaFinExposicion: "",
        consolidacionCargas: "",
        tipoTransito: "",
        tipoProgFomExp: "",
        idAsignacion: 0,
        observaciones: "",
        fechaPropuestaVisita: "",
        clavePais: "",
        tienePrioridad: false,
        numeroProgramaImmex: "",
        informacionConfidencial: "",
        clavePermisoSedena: "",
        numeroPermisoCNSNS: "",
        actividadEnDestino: "",
        locacion: "",
        idFraccionGob: 0,
        idFolioExternoOriginal: "",
        descripcionEspecificaciones: "",
        coordenadasGeograficas: "",
        justificacionTecnica: "",
        numeroRegistro: "",
        plazo: "",
        descripcionLugarEmbarque: "",
        establecimientoTIF: "",
        capacidadAlmacenamiento: "",
        licitacionPublica: {
            idLicitacion: 0,
            anio: 0,
            cantidadMaxima: 0,
            fechaLimiteCalificacion: "",
            fechaConcurso: "",
            fechaInicioVigencia: "",
            fechaFinVigencia: "",
            fundamento: "",
            ideTipoConstancia: "",
            ideTipoLicitacion: "",
            numeroLicitacion: "",
            idMecanismoAsignacion: 0
        },
        asignacion: "",
        participante: {
            idLicitacionPublica: 0,
            rfcParticipante:"" ,
            rfc: "",
            montoAdjudicado: 0,
            ganador: false,
            tipoParticipante: "",
            licitacionPublica: "",
            montoDisponible:0
        },
        montosCertificado: "",
        idLicitacion: 522,
        montoTransferir: 0,
        maximoTransferir: 0,
        fechaEncabezado:"" ,
        participantesLicitacion: [],
        fraccionArancelaria: [],
        tipoTramite: {
            vigencia: "",
            idTipoTramite: 120501,
            servicio: "",
            descripcionServicio: "",
            subservicio: "",
            descripcionSubservicio: "",
            modalidad: "",
            descripcionModalidad: "",
            flujo: "",
            descripcionFlujo: "",
            nivelServicio: "",
            nombreServicioAxway: "",
            nombreMensajeAxway: "",
            urlAxway: "",
            cveUnidadAdmResponsable: "",
            fechaCaptura: "",
            dependencia: "",
            declaraciones: "",
            documentos: "",
            nombre: "",
            blnReplicaInfo: false,
            blnAutomatico: false,
            claveModulo: 0,
            requiereVerificacion: "",
            asignado: "",
            suplencia: "",
            nivelRol: "",
            listTipoTramite: [],
            descripcionCorta: "",
            context: "",
            actionSSO: ""
        },
        entidadFederativa: ""
    }
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120501', resettable: true })
export class Tramite120501Store extends Store<Solicitud120501State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores parciales para actualizar el estado.
   */
  public actualizarEstado(valores: Partial<Solicitud120501State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
  

  /**
   * Resetea el store a su estado inicial.
   * No recibe parámetros.
   * @return void
   */
  public resetearStore(): void {
    this.reset();
  }
}
