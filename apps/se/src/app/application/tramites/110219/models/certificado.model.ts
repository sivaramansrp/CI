export interface ColumnasTabla {
    numeroCertificado: string,
    pais: string,
    tratado: string,
    fechaExpedicion: string,
    fechaVencimiento: string
   
}

export interface MercanciaCertificado {
    numeroOrden: string,
    fraccionArancelaria: string,
    nombreTecnico: string,
    nombreComercial: string,
    nombreIngles: string,
    complementoDescripcion: string,
    numeroCertificado: string,
    pais: string,
    tratado: string,
    fechaExpedicion: string,
    fechaVencimiento: string
}

export interface ProductoresAsociados {
    nombreProductor: string,
    numeroRegistroFiscal: string,
    direccion: string,
    correoElectronico: string,
    telefono: string,
    razonSocial: string,
}