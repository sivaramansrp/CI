import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 260601
 * @returns AvisoSanitario260601
 */
export interface AvisoSanitarioState {
    RFCResponsableSanitario: string;
    razonSocial: string;
    correoElectronico: string;
    codigoPostal: string;
    cveEstado: string;
    descripcionMunicipio: string;
    informacionExtra: string;
    descripcionColonia: string;
    calle: string;
    lada: number | null;
    telefono: number | null;
    cveSCIAN: string;
    cveSCIANDescripcion: string;
    avisoFuncionamiento: boolean;
    cveRegimenes: string;
    cveAduanas: string;
    cveProductoClasificacion: string;
    cveEspecificoProductoClasifi: string;
    nombreProducto: string;
    marca: string;
    cveTipoProducto: string;
    fraccionArancelaria: string;
    fraccionArancelariaDescripcion: string;
    modelo: string;
    productoDescripcion: string;
    cvePaisDestino: string;
    seleccionadaManifiesto: boolean[];
    informacionConfidencial: string;
    rfc: string;
    nombreOrazonsocial: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
}

export function createInitialState(): AvisoSanitarioState {
    return {
        RFCResponsableSanitario: '',
        razonSocial: '',
        correoElectronico: '',
        codigoPostal: '',
        cveEstado: '',
        descripcionMunicipio: '',
        informacionExtra: '',
        descripcionColonia: '',
        calle: '',
        lada: null,
        telefono: null,
        cveSCIAN: '',
        cveSCIANDescripcion: '',
        avisoFuncionamiento: false,
        cveRegimenes: '',
        cveAduanas: '',
        cveProductoClasificacion: '',
        cveEspecificoProductoClasifi: '',
        nombreProducto: '',
        marca: '',
        cveTipoProducto: '',
        fraccionArancelaria: '',
        fraccionArancelariaDescripcion: '',
        modelo: '',
        productoDescripcion: '',
        cvePaisDestino: '',
        seleccionadaManifiesto: [false],
        informacionConfidencial: '',
        rfc: '',
        nombreOrazonsocial: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
    }
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite260601', resettable: true })
export class Tramite260601Store extends Store<AvisoSanitarioState> {
    constructor() {
        super(createInitialState());
    }

    public setRFCResponsableSanitario(RFCResponsableSanitario: string): void {
        this.update((state) => ({
            ...state,
            RFCResponsableSanitario
        }));
    }

    public setRazonSocial(razonSocial: string): void {
        this.update((state) => ({
            ...state,
            razonSocial,
        }));
    }

    public setCorreoElectronico(correoElectronico: string): void {
        this.update((state) => ({
            ...state,
            correoElectronico,
        }));
    }

    public setCodigoPostal(codigoPostal: string): void {
        this.update((state) => ({
            ...state,
            codigoPostal,
        }));
    }

    public setEstado(cveEstado: string): void {
        this.update((state) => ({
            ...state,
            cveEstado,
        }));
    }

    public setDescripcionMunicipio(descripcionMunicipio: string): void {
        this.update((state) => ({
            ...state,
            descripcionMunicipio
        }));
    }

    public setInformacionExtra(informacionExtra: string): void {
        this.update((state) => ({
            ...state,
            informacionExtra
        }));
    }

    public setDescripcionColonia(descripcionColonia: string): void {
        this.update((state) => ({
            ...state,
            descripcionColonia
        }));
    }

    public setCalle(calle: string): void {
        this.update((state) => ({
            ...state,
            calle
        }));
    }

    public setLada(lada: number): void {
        this.update((state) => ({
            ...state,
            lada,
        }));
    }

    public setTelefono(telefono: number): void {
        this.update((state) => ({
            ...state,
            telefono,
        }));
    }

    public setClaveScian(cveSCIAN: string): void {
        this.update((state) => ({
            ...state,
            cveSCIAN,
        }));
    }

    public setDescripcionScian(cveSCIANDescripcion: string): void {
        this.update((state) => ({
            ...state,
            cveSCIANDescripcion,
        }));
    }

    public setAvisoFuncionamiento(avisoFuncionamiento: boolean): void {
        this.update((state) => ({
            ...state,
            avisoFuncionamiento,
        }));
    }

    public setCveRegimenes(cveRegimenes: string): void {
        this.update((state) => ({
            ...state,
            cveRegimenes,
        }));
    }

    public setCveAduanas(cveAduanas: string): void {
        this.update((state) => ({
            ...state,
            cveAduanas,
        }));
    }

    public setProductoClasificacion(cveProductoClasificacion: string): void {
        this.update((state) => ({
            ...state,
            cveProductoClasificacion,
        }));
    }

    public setEspecificoProductoClasificacion(cveEspecificoProductoClasifi: string): void {
        this.update((state) => ({
            ...state,
            cveEspecificoProductoClasifi,
        }));
    }

    public seNombreProducto(nombreProducto: string): void {
        this.update((state) => ({
            ...state,
            nombreProducto,
        }));
    }

    public setMarca(marca: string): void {
        this.update((state) => ({
            ...state,
            marca,
        }));
    }

    public setTipoProducto(cveTipoProducto: string): void {
        this.update((state) => ({
            ...state,
            cveTipoProducto,
        }));
    }

    public setFraccionArancelaria(fraccionArancelaria: string): void {
        this.update((state) => ({
            ...state,
            fraccionArancelaria,
        }));
    }

    public setFraccionArancelariaDescripcion(fraccionArancelariaDescripcion: string): void {
        this.update((state) => ({
            ...state,
            fraccionArancelariaDescripcion,
        }));
    }

    public setModelo(modelo: string): void {
        this.update((state) => ({
            ...state,
            modelo,
        }));
    }

    public setProductoDescripcion(productoDescripcion: string): void {
        this.update((state) => ({
            ...state,
            productoDescripcion,
        }));
    }

    public setPaisDestino(cvePaisDestino: string): void {
        this.update((state) => ({
            ...state,
            cvePaisDestino,
        }));
    }

    public setSeleccionadaManifiesto(seleccionadaManifiesto: []): void {
        this.update((state) => ({
            ...state,
            seleccionadaManifiesto
        }));
    }

    public setInformacionConfidencial(informacionConfidencial: string): void {
        this.update((state) => ({
            ...state,
            informacionConfidencial,
        }));
    }

    public setRfc(rfc: string): void {
        this.update((state) => ({
            ...state,
            rfc,
        }));
    }

    public setNombreOrazonsocial(nombreOrazonsocial: string): void {
        this.update((state) => ({
            ...state,
            nombreOrazonsocial,
        }));
    }

    public setApellidoPaterno(apellidoPaterno: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaterno,
        }));
    }

    public setApellidoMaterno(apellidoMaterno: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaterno,
        }));
    }
}