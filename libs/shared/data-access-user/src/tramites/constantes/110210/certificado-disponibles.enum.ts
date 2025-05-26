
export interface CertificadoDisponibles {
    numeroDeCertificado: number;
    fechaExpedicion: string;
    fechaVencimiento: string;
}

export const CERTIFICADO_DISPONIBLES_COLUMNAS = [
    {
        encabezado: 'Numero de certificado',
        clave: (ele: CertificadoDisponibles ): number => ele.numeroDeCertificado,
        orden: 1
    },
    {
        encabezado: 'Fecha expedicion',
        clave: (ele: CertificadoDisponibles ): string => ele.fechaExpedicion,
        orden: 2
    },
    {
        encabezado: 'Fecha vencimiento',
        clave: (ele: CertificadoDisponibles ): string => ele.fechaVencimiento,
        orden: 3
    }
]
    
