export interface BodyValidarPedimento {
    aduana: number;
    patente: number;
    pedimento: number;
}

export interface ValidarPedimentoResponse {
    codigo: string;
    mensaje: string;
    datos: DatosPedimento;
}

interface DatosPedimento {
    respuesta_compleja_estado: RespuestaComplejaEstado;
    resultado: number;
    descripcion: string
}

interface RespuestaComplejaEstado {
    detalle_pedimento: DetallePedimento;
}


interface EstadoPedimento {
    estado: number;
    descripcion_estado: string;
    sub_estado: number;
    descripcion_sub_estado: string;
    secuencia: number;
    factura: string;
    cantidad: string;
    valor: string;
}

interface DetallePedimento extends EstadoPedimento {
    estado_pedimento: EstadoPedimento[];
    verificador: Verificador[];
}

interface Verificador {
    nombre_verificador: string;
    apelllido_paterno_verificador: string;
    apelllido_materno_verificador: string;

}