import { ItemTransporte } from "../models/shared/agregar-trasnporte.model";

// export const HEADER_TABLA_FERROVIARIO = [
//     'Número BL',
//     'Tipo de Equipo',
//     'Iniciales Equipo',
//     'Número de Equipo',
//     'Observaciones'
// ];

// export const HEADER_TABLA_CARRETERO = [
//     'Empresa transportista',
//     'Número carta porte',
//     'Fecha carta porte',
//     'Marca',
//     'Modelo',
//     'Placas',
//     'Contenedor(es)',
//     'Observaciones'
// ];


// export const HEADER_TABLA_PEATONAL = [
//     'Empresa transportista',
//     'RFC empresa responsable',
//     'Nombre transportista',
//     'ID de gafete',
//     'Observaciones'
// ]

// export const HEADER_TABLA_OTRO = [
//     'Empresa transportista',
//     'Tipo de transporte',
//     'Datos de transporte',
//     'Observaciones'
// ]

export const HEADER_TABLA_MARITIMO = [
    'Guía BL',
    'Guía house',
    'Nombre del buque',
    'Contenesor(es)',
    'Observaciones'
]

export const HEADER_TABLA_AEREO = [
    'Arribo pendiente',
    'Guía master',
    'Guía house',
    'Fecha de arribo',
    'Hora de arribo',
    'Guía válida',
    'Observaciones'
]



export const HEADER_TABLA_CARRETERO: ItemTransporte[] = [
    {
        llave: 'empTransportista',
        valor: 'Empresa transportista'
    },
    {
        llave: 'numeroPorte',
        valor: 'Número carta porte'
    },
    {
        llave: 'fechaPorte',
        valor: 'Fecha carta porte'
    },
    {
        llave: 'marcaTransporte',
        valor: 'Marca'
    },
    {
        llave: 'modeloTransporte',
        valor: 'Modelo'
    },
    {
        llave: 'placasTransporte',
        valor: 'Placas'
    },
    {
        llave: 'contenedorTransporte',
        valor: 'Contenedor(es)'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
];

export const HEADER_TABLA_FERROVIARIO: ItemTransporte[] = [
    {
        llave: 'numeroBL',
        valor: 'Número BL'
    },
    {
        llave: 'tipoEquipo',
        valor: 'Tipo de Equipo'
    },
    {
        llave: 'inicialesEquipo',
        valor: 'Iniciales Equipo'
    },
    {
        llave: 'numeroEquipo',
        valor: 'Número de Equipo'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
];

export const HEADER_TABLA_PEATONAL: ItemTransporte[] = [
    {
        llave: 'rfcEmpresa',
        valor: 'Empresa transportista'
    },
    {
        llave: 'nombreTransportista',
        valor: 'Nombre transportista'
    },
    {
        llave: 'numGafete',
        valor: 'ID de gafete'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
]

export const HEADER_TABLA_OTRO: ItemTransporte[] = [
    {
        llave: 'empTransportista',
        valor: 'Empresa transportista'
    },
    {
        llave: 'tipoTransporteDes',
        valor: 'Tipo de transporte'
    },    
    {
        llave: 'datosTransporte',
        valor: 'Datos de transporte'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
]