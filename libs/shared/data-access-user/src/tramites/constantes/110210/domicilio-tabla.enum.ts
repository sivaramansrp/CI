export interface DomicilioTabla {
    numeroDeOrden: string;
    fraccionArancelaria: string;
    nombreTecnico: string;
    nombreComercial: string;
    nombreEnIngles: string;
    marca: string;
    complementoDeLaDescripcion: string;
    cantidadAExportar: string;
    unidadDeMedidaDeComercializacion: string;
    valorDeLaMercancia: string;
    numeroDeFactura: string;
    fechaDeFactura: string;
    norma: string;
}

export const DOMICILIO_TABLA_COLUMNAS = [
    {
        encabezado: 'Número de orden',
        clave: (ele: DomicilioTabla): string => ele.numeroDeOrden,
        orden: 1
    },
    {
        encabezado: 'Fracción arancelaria',
        clave: (ele: DomicilioTabla): string => ele.fraccionArancelaria,
        orden: 2
    },
    {
        encabezado: 'Nombre técnico',
        clave: (ele: DomicilioTabla): string => ele.nombreTecnico,
        orden: 3
    },
    {
        encabezado: 'Nombre comercial',
        clave: (ele: DomicilioTabla): string => ele.nombreComercial,
        orden: 4
    },
    {
        encabezado: 'Nombre en Inglés',
        clave: (ele: DomicilioTabla): string => ele.nombreEnIngles,
        orden: 5
    },
    {
        encabezado: 'Marca',
        clave: (ele: DomicilioTabla): string => ele.marca,
        orden: 6
    },
    {
        encabezado: 'Complemento de la Descripción',
        clave: (ele: DomicilioTabla): string => ele.complementoDeLaDescripcion,
        orden: 7
    },
    {
        encabezado: 'Cantidad a exportar',
        clave: (ele: DomicilioTabla): string => ele.cantidadAExportar,
        orden: 8
    },
    {
        encabezado: 'Unidad de medida de comercialización',
        clave: (ele: DomicilioTabla): string => ele.unidadDeMedidaDeComercializacion,
        orden: 9
    },
    {
        encabezado: 'Valor de la mercancía',
        clave: (ele: DomicilioTabla): string => ele.valorDeLaMercancia,
        orden: 10
    },
    {
        encabezado: 'Número de factura',
        clave: (ele: DomicilioTabla): string => ele.numeroDeFactura,
        orden: 11
    },
    {
        encabezado: 'Fecha de Factura',
        clave: (ele: DomicilioTabla): string => ele.fechaDeFactura,
        orden: 12
    },
    {
        encabezado: 'Norma',
        clave: (ele: DomicilioTabla): string => ele.norma,
        orden: 13
    }
];