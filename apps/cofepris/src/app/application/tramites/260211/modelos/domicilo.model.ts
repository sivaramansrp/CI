export interface nicoInfo {
    clave_Scian: string;
    descripcion_Scian : string;
}

export const NICO_TABLA = [
    {
      encabezado: 'Clave S.C.I.A.N.',
      clave: (ele: nicoInfo) => ele.clave_Scian,
      orden: 1
    },
    {
      encabezado: 'Descripción del S.C.I.A.N.',
      clave: (ele: nicoInfo) => ele.descripcion_Scian,
      orden: 2
    }
  ]

export interface mercanciasInfo{
    clasificacion:string,
    especificar:string,
    denominacionEspecifica:string,
    denominacionDistintiva:string,
    denominacionComun: string,
    formaFarmaceutica:string,
    estadoFisico:string,
    fraccionArancelaria:string,
    descripcionFraccion:string,
    unidad:string,
    cantidadUMC:string,
    unidadUMT:string,
    cantidadUMT:string,
    presentacion:string,
    numeroRegistro:string,
    paisDeOrigen:string,
    paisDeProcedencia:string,
    tipoProducto:string,
    usoEspecifico:string,
    fechaCaducidad:string
}

export const MERCANCIAS_DATA = [
    {
        encabezado: 'Clasificación del producto',
        clave: (ele: mercanciasInfo) => ele.clasificacion,
        orden: 1
    },
    {
        encabezado: 'Especificar clasificación del producto',
        clave: (ele: mercanciasInfo) => ele.especificar,
        orden: 2
    },
    {
        encabezado: 'Denominación específica del producto',
        clave: (ele: mercanciasInfo) => ele.denominacionEspecifica,
        orden: 3
    },
    {
        encabezado: 'Denominación distintiva',
        clave: (ele: mercanciasInfo) => ele.denominacionDistintiva,
        orden: 4
    },
    {
        encabezado: 'Denominación común, nombre común o nombre científico',
        clave: (ele: mercanciasInfo) => ele.denominacionComun,
        orden: 5
    },
    {
        encabezado: 'Forma farmacéutica',
        clave: (ele: mercanciasInfo) => ele.formaFarmaceutica,
        orden: 6
    },
    {
        encabezado: 'Estado físico',
        clave: (ele: mercanciasInfo) => ele.estadoFisico,
        orden: 7
    },
    {
        encabezado: 'Fracción arancelaria',
        clave: (ele: mercanciasInfo) => ele.fraccionArancelaria,
        orden: 8
    },
    {
        encabezado: 'Descripción de la fracción',
        clave: (ele: mercanciasInfo) => ele.descripcionFraccion,
        orden: 9
    },
    {
        encabezado: 'Unidad de medida de comercialización (UMC)',
        clave: (ele: mercanciasInfo) => ele.unidad,
        orden: 10
    },
    {
        encabezado: 'Cantidad UMC',
        clave: (ele: mercanciasInfo) => ele.cantidadUMC,
        orden: 11
    },
    {
        encabezado: 'Unidad de medida de tarifa (UMT)',
        clave: (ele: mercanciasInfo) => ele.unidadUMT,
        orden: 12
    },
    {
        encabezado: 'Cantidad UMT',
        clave: (ele: mercanciasInfo) => ele.cantidadUMT,
        orden: 13
    },
    {
        encabezado: 'Presentación',
        clave: (ele: mercanciasInfo) => ele.presentacion,
        orden: 14
    },
    {
        encabezado: 'Número de registro sanitario',
        clave: (ele: mercanciasInfo) => ele.numeroRegistro,
        orden: 15
    },
    {
        encabezado: 'País de orígen',
        clave: (ele: mercanciasInfo) => ele.paisDeOrigen,
        orden: 16
    },
    {
        encabezado: 'País de procedencia',
        clave: (ele: mercanciasInfo) => ele.paisDeProcedencia,
        orden: 17
    },
    {
        encabezado: 'Tipo producto',
        clave: (ele: mercanciasInfo) => ele.tipoProducto,
        orden: 18
    },
    {
        encabezado: 'Uso específico',
        clave: (ele: mercanciasInfo) => ele.usoEspecifico,
        orden: 19
    },
    {
        encabezado: 'Fecha de caducidad',
        clave: (ele: mercanciasInfo) => ele.fechaCaducidad,
        orden: 20
    },
]