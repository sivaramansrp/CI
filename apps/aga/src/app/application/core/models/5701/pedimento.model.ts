export interface BodyEstadoPedimento {
    aduana: number;
    patente: number;
    pedimento: number;
}

export interface EstadoPedimentoResponse {
    codigo: string;
    mensaje: string;
    datos: EstadoPedimento;
}

interface EstadoPedimento {
    patente: number;
    pedimento: number;
    aduana: number;
    estado_pedimento: string;
    sub_estado_pedimento: string;
    pedimento_validado: string;
}
