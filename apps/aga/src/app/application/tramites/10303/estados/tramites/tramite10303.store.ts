import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 10303
 * @returns Solicitud10303
 */
export interface RegistroDeDonacion10303State {
    seleccionadaManifiesto: boolean[];
    aduana: string;
    seleccionadaBasicoRequerimiento: boolean[];

    numeroConsecutivo: string;
    destinoDonacion: string;
    posibleFraccion: string;
    descripcionFraccion: string;
    solicitudDeInspeccion: string;
    justificacionMerca: string;
    descripcionMercanciaOtro: string;
    tipoDeMercancia: string;
    cantidadUMC: string;
    cantidadUMT: string;
    unidadMedida: string;
    UMT: string;
    paisProcedenciaOtro: string;
    condicionMercancia: string;

    fechaCaducidad: string;
    ingredienteActivo: string;
    tipoMedicamento: string;
    presentacionFarma: string;
    paisOrigenMedicamento: string;
    paisProcedenciaMedicamento: string;

    razonSocial: string;
    calleDonante: string;
    numExteriorLabel: string;
    numInteriorDonante: string;
    pais: string;
    codigoPostal: string;
    informacionExtra: string;
    coloniaDonante: string;
    correoElectronicoDonante: string;
    telefonoDonante: string;
    cveDocumentoResidencia: string;

    rfcFabricante: string;
    nombreFabricante: string;
    calleFabricante: string;
    numExteriorFabricante: string;
    numInteriorFabricante: string;
    estadoFabricante: string;
    coloniaFabricante: string;
    codigoPostalFabricante: string;
    cvePaisFabricante: string;

    rfcRepLegalAutorizado: string;
    nombreRepLegalAutorizado: string;
    calleRepLegalAutorizado: string;
    numExteriorRepLegalAutorizado: string;
    numInteriorRepLegalAutorizado: string;
    estadoRepLegalAutorizado: string;
    coloniaRepLegalAutorizado: string;
    codigoPostalRepLegalAutorizado: string;
    cvePaisRepLegalAutorizado: string;
    correoElectronicoRepLegalAutorizado: string;
    telefonoRepLegalAutorizado: string;

    rfcRepLegalDonatario: string;
    nombreRepLegalDonatario: string;
    calleRepLegalDonatario: string;
    numExteriorRepLegalDonatario: string;
    numInteriorRepLegalDonatario: string;
    estadoRepLegalDonatario: string;
    coloniaRepLegalDonatario: string;
    codigoPostalRepLegalDonatario: string;
    cvePaisRepLegalDonatario: string;
    correoElectronicoRepLegalDonatario: string;
    telefonoRepLegalDonatario: string;

    rfcPersonaAutorizada: string;
    nombrePersonaAutorizada: string;
    callePersonaAutorizada: string;
    numExteriorPersonaAutorizada: string;
    numInteriorPersonaAutorizada: string;
    estadoPersonaAutorizada: string;
    coloniaPersonaAutorizada: string;
    codigoPostalPersonaAutorizada: string;
    cvePaisPersonaAutorizada: string;
    correoElectronicoPersonaAutorizada: string;
    telefonoPersonaAutorizada: string;

    rfcDonatario: string;
    nombreDonatario: string;
    calleDonatario: string;
    numExteriorDonatario: string;
    numInteriorDonatario: string;
    estadoDonatario: string;
    coloniaDonatario: string;
    codigoPostalDonatario: string;
    cvePaisDonatario: string;
    correoElectronicoDonatario: string;
    telefonoDonatario: string;
}

export function createInitialState(): RegistroDeDonacion10303State {
    return {
        seleccionadaManifiesto: [false, false, false, false, false],
        aduana: '',
        seleccionadaBasicoRequerimiento: [false, false, false, false, false, false],

        numeroConsecutivo: '1',
        destinoDonacion: '',
        posibleFraccion: '',
        descripcionFraccion: '',
        solicitudDeInspeccion: '',
        justificacionMerca: '',
        descripcionMercanciaOtro: '',
        tipoDeMercancia: '',
        cantidadUMC: '',
        cantidadUMT: '',
        unidadMedida: '',
        UMT: '',
        paisProcedenciaOtro: '',
        condicionMercancia: '',

        fechaCaducidad: '',
        ingredienteActivo: '',
        tipoMedicamento: '',
        presentacionFarma: '',
        paisOrigenMedicamento: '',
        paisProcedenciaMedicamento: '',

        razonSocial: '',
        calleDonante: '',
        numExteriorLabel: '',
        numInteriorDonante: '',
        pais: '',
        codigoPostal: '',
        informacionExtra: '',
        coloniaDonante: '',
        correoElectronicoDonante: '',
        telefonoDonante: '',
        cveDocumentoResidencia: '',

        rfcFabricante: '',
        nombreFabricante: '',
        calleFabricante: '',
        numExteriorFabricante: '',
        numInteriorFabricante: '',
        estadoFabricante: '',
        coloniaFabricante: '',
        codigoPostalFabricante: '',
        cvePaisFabricante: '',

        rfcRepLegalAutorizado: '',
        nombreRepLegalAutorizado: '',
        calleRepLegalAutorizado: '',
        numExteriorRepLegalAutorizado: '',
        numInteriorRepLegalAutorizado: '',
        estadoRepLegalAutorizado: '',
        coloniaRepLegalAutorizado: '',
        codigoPostalRepLegalAutorizado: '',
        cvePaisRepLegalAutorizado: '',
        correoElectronicoRepLegalAutorizado: '',
        telefonoRepLegalAutorizado: '',

        rfcRepLegalDonatario: '',
        nombreRepLegalDonatario: '',
        calleRepLegalDonatario: '',
        numExteriorRepLegalDonatario: '',
        numInteriorRepLegalDonatario: '',
        estadoRepLegalDonatario: '',
        coloniaRepLegalDonatario: '',
        codigoPostalRepLegalDonatario: '',
        cvePaisRepLegalDonatario: '',
        correoElectronicoRepLegalDonatario: '',
        telefonoRepLegalDonatario: '',

        rfcPersonaAutorizada: '',
        nombrePersonaAutorizada: '',
        callePersonaAutorizada: '',
        numExteriorPersonaAutorizada: '',
        numInteriorPersonaAutorizada: '',
        estadoPersonaAutorizada: '',
        coloniaPersonaAutorizada: '',
        codigoPostalPersonaAutorizada: '',
        cvePaisPersonaAutorizada: '',
        correoElectronicoPersonaAutorizada: '',
        telefonoPersonaAutorizada: '',

        rfcDonatario: '',
        nombreDonatario: '',
        calleDonatario: '',
        numExteriorDonatario: '',
        numInteriorDonatario: '',
        estadoDonatario: '',
        coloniaDonatario: '',
        codigoPostalDonatario: '',
        cvePaisDonatario: '',
        correoElectronicoDonatario: '',
        telefonoDonatario: '',
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite10303', resettable: true })
export class Tramite10303Store extends Store<RegistroDeDonacion10303State> {
    constructor() {
        super(createInitialState());
    }

    public setSeleccionadaManifiesto(seleccionadaManifiesto: []): void {
        this.update((state) => ({
            ...state,
            seleccionadaManifiesto
        }));
    }

    public setAduana(aduana: string): void {
        this.update((state) => ({
            ...state,
            aduana,
        }));
    }

    public setSeleccionadaBasicoRequerimiento(seleccionadaBasicoRequerimiento: []): void {
        this.update((state) => ({
            ...state,
            seleccionadaBasicoRequerimiento: seleccionadaBasicoRequerimiento,
        }));
    }

    public setNumeroConsecutivo(numeroConsecutivo: string): void {
        this.update((state) => ({
            ...state,
            numeroConsecutivo,
        }));
    }

    public setDestinoDonacion(destinoDonacion: string): void {
        this.update((state) => ({
            ...state,
            destinoDonacion,
        }));
    }

    public setPosibleFraccion(posibleFraccion: string): void {
        this.update((state) => ({
            ...state,
            posibleFraccion,
        }));
    }

    public setDescripcionFraccion(descripcionFraccion: string): void {
        this.update((state) => ({
            ...state,
            descripcionFraccion,
        }));
    }

    public setJustificacionMerca(justificacionMerca: string): void {
        this.update((state) => ({
            ...state,
            justificacionMerca,
        }));
    }

    public setDescripcionMercanciaOtro(descripcionMercanciaOtro: string): void {
        this.update((state) => ({
            ...state,
            descripcionMercanciaOtro,
        }));
    }

    public setTipoDeMercancia(tipoDeMercancia: string): void {
        this.update((state) => ({
            ...state,
            tipoDeMercancia,
        }));
    }

    public setCantidadUMC(cantidadUMC: string): void {
        this.update((state) => ({
            ...state,
            cantidadUMC,
        }));
    }

    public setCantidadUMT(cantidadUMT: string): void {
        this.update((state) => ({
            ...state,
            cantidadUMT,
        }));
    }

    public setUnidadMedida(unidadMedida: string): void {
        this.update((state) => ({
            ...state,
            unidadMedida,
        }));
    }

    public setUMT(UMT: string): void {
        this.update((state) => ({
            ...state,
            UMT,
        }));
    }

    public setPaisProcedenciaOtro(paisProcedenciaOtro: string): void {
        this.update((state) => ({
            ...state,
            paisProcedenciaOtro,
        }));
    }

    public setCondicionMercancia(condicionMercancia: string): void {
        this.update((state) => ({
            ...state,
            condicionMercancia,
        }));
    }

    public setIngredienteActivo(ingredienteActivo: string): void {
        this.update((state) => ({
            ...state,
            ingredienteActivo,
        }));
    }

    public setTipoMedicamento(tipoMedicamento: string): void {
        this.update((state) => ({
            ...state,
            tipoMedicamento,
        }));
    }

    public setPresentacionFarma(presentacionFarma: string): void {
        this.update((state) => ({
            ...state,
            presentacionFarma,
        }));
    }

    public setPaisOrigenMedicamento(paisOrigenMedicamento: string): void {
        this.update((state) => ({
            ...state,
            paisOrigenMedicamento,
        }));
    }

    public setPaisProcedenciaMedicamento(paisProcedenciaMedicamento: string): void {
        this.update((state) => ({
            ...state,
            paisProcedenciaMedicamento,
        }));
    }

    public setFechaCaducidad(fechaCaducidad: string): void {
        this.update((state) => ({
            ...state,
            fechaCaducidad,
        }));
    }

    public setSolicitudDeInspeccion(solicitudDeInspeccion: string): void {
        this.update((state) => ({
            ...state,
            solicitudDeInspeccion,
        }));
    }

    public setRazonSocial(razonSocial: string): void {
        this.update((state) => ({
            ...state,
            razonSocial,
        }));
    }

    public setCalleDonante(calleDonante: string): void {
        this.update((state) => ({
            ...state,
            calleDonante,
        }));
    }

    public setNumExteriorLabel(numExteriorLabel: string): void {
        this.update((state) => ({
            ...state,
            numExteriorLabel,
        }));
    }

    public setNumInteriorDonante(numInteriorDonante: string): void {
        this.update((state) => ({
            ...state,
            numInteriorDonante,
        }));
    }

    public setPais(pais: string): void {
        this.update((state) => ({
            ...state,
            pais,
        }));
    }

    public setCodigoPostal(codigoPostal: string): void {
        this.update((state) => ({
            ...state,
            codigoPostal,
        }));
    }

    public setInformacionExtra(informacionExtra: string): void {
        this.update((state) => ({
            ...state,
            informacionExtra,
        }));
    }

    public setColoniaDonante(coloniaDonante: string): void {
        this.update((state) => ({
            ...state,
            coloniaDonante,
        }));
    }

    public setCorreoElectronicoDonante(correoElectronicoDonante: string): void {
        this.update((state) => ({
            ...state,
            correoElectronicoDonante,
        }));
    }

    public setTelefonoDonante(telefonoDonante: string): void {
        this.update((state) => ({
            ...state,
            telefonoDonante,
        }));
    }

    public setDocumentoResidencia(cveDocumentoResidencia: string): void {
        this.update((state) => ({
            ...state,
            cveDocumentoResidencia,
        }));
    }

    public setRfcFabricante(rfcFabricante: string): void {
        this.update((state) => ({
            ...state,
            rfcFabricante,
        }));
    }

    public setNombreFabricante(nombreFabricante: string): void {
        this.update((state) => ({
            ...state,
            nombreFabricante,
        }));
    }

    public setCalleFabricante(calleFabricante: string): void {
        this.update((state) => ({
            ...state,
            calleFabricante,
        }));
    }

    public setNumExteriorFabricante(numExteriorFabricante: string): void {
        this.update((state) => ({
            ...state,
            numExteriorFabricante,
        }));
    }

    public setNumInteriorFabricante(numInteriorFabricante: string): void {
        this.update((state) => ({
            ...state,
            numInteriorFabricante,
        }));
    }

    public setEstadoFabricante(estadoFabricante: string): void {
        this.update((state) => ({
            ...state,
            estadoFabricante,
        }));
    }

    public setColoniaFabricante(coloniaFabricante: string): void {
        this.update((state) => ({
            ...state,
            coloniaFabricante,
        }));
    }

    public setCodigoPostalFabricante(codigoPostalFabricante: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalFabricante,
        }));
    }

    public setCvePaisFabricante(cvePaisFabricante: string): void {
        this.update((state) => ({
            ...state,
            cvePaisFabricante,
        }));
    }

    public setRfcRepLegalAutorizado(rfcRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            rfcRepLegalAutorizado,
        }));
    }

    public setNombreRepLegalAutorizado(nombreRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            nombreRepLegalAutorizado,
        }));
    }

    public setCalleRepLegalAutorizado(calleRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            calleRepLegalAutorizado,
        }));
    }

    public setNumExteriorRepLegalAutorizado(numExteriorRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            numExteriorRepLegalAutorizado,
        }));
    }

    public setNumInteriorRepLegalAutorizado(numInteriorRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            numInteriorRepLegalAutorizado,
        }));
    }

    public setEstadoRepLegalAutorizado(estadoRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            estadoRepLegalAutorizado,
        }));
    }

    public setColoniaRepLegalAutorizado(coloniaRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            coloniaRepLegalAutorizado,
        }));
    }

    public setCodigoPostalRepLegalAutorizado(codigoPostalRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalRepLegalAutorizado,
        }));
    }

    public setCvePaisRepLegalAutorizado(cvePaisRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            cvePaisRepLegalAutorizado,
        }));
    }

    public setCorreoElectronicoRepLegalAutorizado(correoElectronicoRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            correoElectronicoRepLegalAutorizado,
        }));
    }

    public setTelefonoRepLegalAutorizado(telefonoRepLegalAutorizado: string): void {
        this.update((state) => ({
            ...state,
            telefonoRepLegalAutorizado,
        }));
    }

    public setRfcRepLegalDonatario(rfcRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            rfcRepLegalDonatario,
        }));
    }

    public setNombreRepLegalDonatario(nombreRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            nombreRepLegalDonatario,
        }));
    }

    public setCalleRepLegalDonatario(calleRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            calleRepLegalDonatario,
        }));
    }

    public setNumExteriorRepLegalDonatario(numExteriorRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            numExteriorRepLegalDonatario,
        }));
    }

    public setNumInteriorRepLegalDonatario(numInteriorRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            numInteriorRepLegalDonatario,
        }));
    }

    public setEstadoRepLegalDonatario(estadoRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            estadoRepLegalDonatario,
        }));
    }

    public setColoniaRepLegalDonatario(coloniaRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            coloniaRepLegalDonatario,
        }));
    }

    public setCodigoPostalRepLegalDonatario(codigoPostalRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalRepLegalDonatario,
        }));
    }

    public setCvePaisRepLegalDonatario(cvePaisRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            cvePaisRepLegalDonatario,
        }));
    }

    public setCorreoElectronicoRepLegalDonatario(correoElectronicoRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            correoElectronicoRepLegalDonatario,
        }));
    }

    public setTelefonoRepLegalDonatario(telefonoRepLegalDonatario: string): void {
        this.update((state) => ({
            ...state,
            telefonoRepLegalDonatario,
        }));
    }

    public setRfcPersonaAutorizada(rfcPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            rfcPersonaAutorizada,
        }));
    }

    public setNombrePersonaAutorizada(nombrePersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            nombrePersonaAutorizada,
        }));
    }

    public setCallePersonaAutorizada(callePersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            callePersonaAutorizada,
        }));
    }

    public setNumExteriorPersonaAutorizada(numExteriorPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            numExteriorPersonaAutorizada,
        }));
    }

    public setNumInteriorPersonaAutorizada(numInteriorPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            numInteriorPersonaAutorizada,
        }));
    }

    public setEstadoPersonaAutorizada(estadoPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            estadoPersonaAutorizada,
        }));
    }

    public setColoniaPersonaAutorizada(coloniaPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            coloniaPersonaAutorizada,
        }));
    }

    public setCodigoPostalPersonaAutorizada(codigoPostalPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalPersonaAutorizada,
        }));
    }

    public setCvePaisPersonaAutorizada(cvePaisPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            cvePaisPersonaAutorizada,
        }));
    }

    public setCorreoElectronicoPersonaAutorizada(correoElectronicoPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            correoElectronicoPersonaAutorizada,
        }));
    }

    public setTelefonoPersonaAutorizada(telefonoPersonaAutorizada: string): void {
        this.update((state) => ({
            ...state,
            telefonoPersonaAutorizada,
        }));
    }

    public setRfcDonatario(rfcDonatario: string): void {
        this.update((state) => ({
            ...state,
            rfcDonatario,
        }));
    }

    public setNombreDonatario(nombreDonatario: string): void {
        this.update((state) => ({
            ...state,
            nombreDonatario,
        }));
    }

    public setCalleDonatario(calleDonatario: string): void {
        this.update((state) => ({
            ...state,
            calleDonatario,
        }));
    }

    public setNumExteriorDonatario(numExteriorDonatario: string): void {
        this.update((state) => ({
            ...state,
            numExteriorDonatario,
        }));
    }

    public setNumInteriorDonatario(numInteriorDonatario: string): void {
        this.update((state) => ({
            ...state,
            numInteriorDonatario,
        }));
    }

    public setEstadoDonatario(estadoDonatario: string): void {
        this.update((state) => ({
            ...state,
            estadoDonatario,
        }));
    }

    public setColoniaDonatario(coloniaDonatario: string): void {
        this.update((state) => ({
            ...state,
            coloniaDonatario,
        }));
    }

    public setCodigoPostalDonatario(codigoPostalDonatario: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalDonatario,
        }));
    }

    public setCvePaisDonatario(cvePaisDonatario: string): void {
        this.update((state) => ({
            ...state,
            cvePaisDonatario,
        }));
    }

    public setCorreoElectronicoDonatario(correoElectronicoDonatario: string): void {
        this.update((state) => ({
            ...state,
            correoElectronicoDonatario,
        }));
    }

    public setTelefonoDonatario(telefonoDonatario: string): void {
        this.update((state) => ({
            ...state,
            telefonoDonatario,
        }));
    }

    /**
       * Limpia los datos de la solicitud
       */
    public limpiarSolicitud(): void {
        this.reset();
    }
}