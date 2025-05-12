export interface TransporteCarretero {
    empTransportista: string;
    numeroPorte: string;
    fechaPorte: string;
    marcaTransporte: string;
    modeloTransporte: string;
    placasTransporte: string;
    contenedorTransporte: string;
    observaciones: string;
}

export interface TransporteFerroviario {
    numeroBL: string;
    tipoEquipo: string;
    inicialesEquipo: string;
    numeroEquipo: string;
    observaciones: string;
}

export interface TransportePeatonal {
    empTransportista: string;
    rfcEmpresa: string;
    nombreTransportista: string;
    numGafete: string;
    observaciones: string;
}

export interface TransporteOtro {
    tipoTransporteDes: string;
    empTransportista: string;
    datosTransporte: string;
    observaciones: string;
}

export interface TransporteAereo {
    arriboPendienteAereo: string;
    guiaMasterAereo: string;
    guiaHouseAereo: string;
    fechaArriboAereo: string;
    horaArriboAereo: string;
    guiaValida: string;
    observaciones: string;
}

export interface TransporteMaritimo {
    guiaBLMaritimo: string;
    guiaHouseMaritimo: string;
    nombreBuqueMaritimo: string;
    contenedorMaritimo: string;
    observaciones: string;
}

export interface ItemTransporte {
    llave: keyof TransporteCarretero | keyof TransporteFerroviario | keyof TransportePeatonal | keyof TransporteOtro | keyof TransporteAereo | keyof TransporteMaritimo;
    valor: string;
}