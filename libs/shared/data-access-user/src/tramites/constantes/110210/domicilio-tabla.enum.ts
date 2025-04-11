interface DomicilioTabla {
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
        clave: (ele: DomicilioTabla) => ele.numeroDeOrden,
        orden: 1
    },
    {
        encabezado: 'Fracción arancelaria',
        clave: (ele: DomicilioTabla) => ele.fraccionArancelaria,
        orden: 2
    },
    {
        encabezado: 'Nombre técnico',
        clave: (ele: DomicilioTabla) => ele.nombreTecnico,
        orden: 3
    },
    {
        encabezado: 'Nombre comercial',
        clave: (ele: DomicilioTabla) => ele.nombreComercial,
        orden: 4
    },
    {
        encabezado: 'Nombre en Inglés',
        clave: (ele: DomicilioTabla) => ele.nombreEnIngles,
        orden: 5
    },
    {
        encabezado: 'Marca',
        clave: (ele: DomicilioTabla) => ele.marca,
        orden: 6
    },
    {
        encabezado: 'Complemento de la Descripción',
        clave: (ele: DomicilioTabla) => ele.complementoDeLaDescripcion,
        orden: 7
    },
    {
        encabezado: 'Cantidad a exportar',
        clave: (ele: DomicilioTabla) => ele.cantidadAExportar,
        orden: 8
    },
    {
        encabezado: 'Unidad de medida de comercialización',
        clave: (ele: DomicilioTabla) => ele.unidadDeMedidaDeComercializacion,
        orden: 9
    },
    {
        encabezado: 'Valor de la mercancía',
        clave: (ele: DomicilioTabla) => ele.valorDeLaMercancia,
        orden: 10
    },
    {
        encabezado: 'Número de factura',
        clave: (ele: DomicilioTabla) => ele.numeroDeFactura,
        orden: 11
    },
    {
        encabezado: 'Fecha de Factura',
        clave: (ele: DomicilioTabla) => ele.fechaDeFactura,
        orden: 12
    },
    {
        encabezado: 'Norma',
        clave: (ele: DomicilioTabla) => ele.norma,
        orden: 13
    }
];